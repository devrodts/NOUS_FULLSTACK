import { Command } from 'commander';
import mongoose from 'mongoose';
import { faker } from '@faker-js/faker';


import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';

dotenv.config();

const program = new Command();

const CategorySchema = new mongoose.Schema({
  id: { type: String, default: () => new mongoose.Types.ObjectId().toString() },
  name: String,
  description: String
});

const ProductSchema = new mongoose.Schema({
  id: { type: String, default: () => new mongoose.Types.ObjectId().toString() },
  name: String,
  description: String,
  price: Number,
  categoryIds: [String],
  imageUrl: String,
  stock: Number
});

const OrderSchema = new mongoose.Schema({
  id: { type: String, default: () => new mongoose.Types.ObjectId().toString() },
  date: Date,
  productIds: [String],
  total: Number
});

const Category = mongoose.model('Category', CategorySchema);
const Product = mongoose.model('Product', ProductSchema);
const Order = mongoose.model('Order', OrderSchema);

program
  .version('1.0.0')
  .description('Seed database with test data')
  .option('-c, --categories <number>', 'Number of categories to create', '10')
  .option('-p, --products <number>', 'Number of products to create', '50')
  .option('-o, --orders <number>', 'Number of orders to create', '100')
  .option('-d, --delete', 'Delete existing data before seeding', false)
  .parse(process.argv);

const options = program.opts();

async function connectToDatabase() {
  const uri = process.env.MONGODB_URI || 'mongodb://root:example@localhost:27017/';
  
  try {
    await mongoose.connect(uri);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Failed to connect to MongoDB', error);
    process.exit(1);
  }
}

async function clearCollections() {
    
    if (options.delete) {
      console.log('Clearing existing data...');
      await Category.collection.dropIndex("id_1").catch(err => {
        if (err.codeName !== 'IndexNotFound') {
          console.error('Error dropping index:', err);
        }
      });
      await Category.deleteMany({});
      await Product.deleteMany({});
      await Order.deleteMany({});
      console.log('Collections cleared');
    }
  }

async function createCategories(count: number) {
  console.log(`Creating ${count} categories...`);
  const categories: any[] = [];
  
  for (let i = 0; i < count; i++) {
    const category = await Category.create({
      name: faker.commerce.department(),
      description: faker.commerce.productDescription()
    });
    categories.push(category);
  }
  
  console.log(`Created ${categories.length} categories`);
  return categories;
}

async function createProducts(count: number, categories: any[]) {
  console.log(`Creating ${count} products...`);
  const products: any[] = [];
  
  for (let i = 0; i < count; i++) {

    const numCategories = faker.number.int({ min: 1, max: 5 });
    const categoryIds = faker.helpers.arrayElements(
      categories.map(c => c.id.toString()),
      numCategories
    );
    
    const product = await Product.create({
      name: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      price: parseFloat(faker.commerce.price({ min: 1, max: 10})),
      categoryIds,
      imageUrl: faker.image.url(),
      stock: faker.number.int({ min: 0, max: 10})
    });
    
    products.push(product);
  }
  
  console.log(`Created ${products.length} products`);
  return products;
}

async function createOrders(count: number, products: any[]) {
  console.log(`Creating ${count} orders...`);
  const orders: any[] = [];
  
  const oneYearAgo = new Date();
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
  
  for (let i = 0; i < count; i++) {

    const numProducts = faker.number.int({ min: 1, max: 10 });
    const orderProducts = faker.helpers.arrayElements(products, numProducts);
    const productIds = orderProducts.map(p => p.id.toString());
    
    const total = orderProducts.reduce((sum, p) => sum + p.price, 0);
    
    const date = faker.date.between({ from: oneYearAgo, to: new Date() });
    
    const order = await Order.create({
      date,
      productIds,
      total
    });
    
    orders.push(order);
  }
  
  console.log(`Created ${orders.length} orders`);
  return orders;
}

async function main() {
  await connectToDatabase();
  await clearCollections();
  
  const categories = await createCategories(parseInt(options.categories));
  const products = await createProducts(parseInt(options.products), categories);
  const orders = await createOrders(parseInt(options.orders), products);
  
  console.log('\n=== Seeding Complete ===');
  console.log(`Created ${categories.length} categories`);
  console.log(`Created ${products.length} products`);
  console.log(`Created ${orders.length} orders`);
  
  await mongoose.disconnect();
  console.log('Disconnected from MongoDB');
}

main().catch(error => {
  console.error('Error seeding database', error);
  process.exit(1);
});