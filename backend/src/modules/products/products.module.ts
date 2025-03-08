import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './domain/entities/products.entity';
import { ProductController } from './domain/interface/controllers/products/products.controller';
import { ProductsRepository } from './domain/infra/repositories/products/products.repository';
import { CreateProductUseCase } from './application/usecases/products/create-product.usecase';
import { ProductsService } from './application/services/products/products.service';
import {
  DeleteProductUseCase,
  GetAllProductsUseCase,
  GetProductByIdUseCase,
  UpdateProductByIdUseCase,
} from './application/usecases/products';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
  ],
  controllers: [ProductController],
  providers: [
    ProductsRepository,
    DeleteProductUseCase,
    GetAllProductsUseCase,
    CreateProductUseCase,
    GetProductByIdUseCase,
    UpdateProductByIdUseCase,
    ProductsService,
  ],
  exports: [ProductsRepository],
})
export class ProductModule {}
