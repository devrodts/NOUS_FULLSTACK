import { Command } from 'commander';
import { NestFactory } from '@nestjs/core';

import { AppModule } from '../../app.module';
import { Category } from 'src/modules/categories/domain/entities/categories.entity';

import { CategoriesRepository } from 'src/modules/categories/domain/infra/repositories/categories.repository';
import { ProductsRepository } from 'src/modules/products/domain/infra/repositories/products/products.repository';
import { OrdersRepository } from 'src/modules/orders/domain/infra/repositories/orders.repository';
import { Orders } from 'src/modules/orders/domain/entities/orders.entity';
import { Product } from 'src/modules/products/domain/entities/products.entity';

import { faker } from '@faker-js/faker';

const program = new Command();

program
  .version('1.0.0')
  .description('Seed database with test data')
  .option('-c, --categories <number>', 'Number of categories to create', '10')
  .option('-p, --products <number>', 'Number of products to create', '50')
  .option('-o, --orders <number>', 'Number of orders to create', '100')
  .option('-d, --delete', 'Delete existing data before seeding', false)
  .parse(process.argv);

const options = program.opts();

async function main(options) {
  const app = await NestFactory.createApplicationContext(AppModule);

  const categoriesRepository = app.get(CategoriesRepository);
  const productsRepository = app.get(ProductsRepository);
  const ordersRepository = app.get(OrdersRepository);

  console.log('Clearing existing data...');
  await categoriesRepository.deleteMany();
  await productsRepository.deleteMany();
  await ordersRepository.deleteMany();
  console.log('Collections cleared');

  console.log(`Creating ${options.categories} categories...`);
  const categories: Category[] = [];
  for (let i = 0; i < parseInt(options.categories); i++) {
    const category = await categoriesRepository.createCategory({
      id: faker.string.uuid(),
      name: faker.commerce.department(),
    });
    categories.push(category);
  }

  console.log(`Creating ${options.products} products...`);
  const products: Product[] = [];
  for (let i = 0; i < parseInt(options.products); i++) {
    const numCategories = faker.number.int({ min: 1, max: 5 });
    const categoryIds = faker.helpers.arrayElements(
      categories.map((c) => c.id.toString()),
      numCategories,
    );

    const product = await productsRepository.createProduct({
      name: faker.commerce.productName(),
      price: parseFloat(faker.commerce.price({ min: 1, max: 10 })),
      categoryIds,
      imageUrl: faker.image.url(),
      description: faker.commerce.productDescription(),
    });
    products.push(product);
  }

  console.log(`Creating ${options.orders} orders...`);
  const orders: Orders[] = [];
  const oneYearAgo = new Date();
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

  for (let i = 0; i < parseInt(options.orders); i++) {
    const numProducts = faker.number.int({ min: 1, max: 10 });
    const orderProducts = faker.helpers.arrayElements(products, numProducts);
    const productIds = orderProducts.map((p) => p.id.toString());

    const total = orderProducts.reduce((sum, p) => sum + p.price, 0);
    const date = faker.date.between({ from: oneYearAgo, to: new Date() });

    const order = await ordersRepository.createOrder({
      id: faker.string.uuid(),
      date,
      productsIds: productIds,
      total,
      created_at: new Date(),
      updated_at: new Date(),
    });
    orders.push(order);
  }

  console.log('\n=== Seeding Complete ===');
  console.log(`Created ${categories.length} categories`);
  console.log(`Created ${products.length} products`);
  console.log(`Created ${orders.length} orders`);

  await app.close();
}

main(options).catch((error) => {
  console.error('Error seeding database', error);
  process.exit(1);
});
