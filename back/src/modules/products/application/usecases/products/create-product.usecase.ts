import { Injectable } from '@nestjs/common';
import { Product } from 'src/modules/products/domain/entities/products/products.entity';
import { ProductsRepository } from 'src/modules/products/domain/infra/repositories/products/products.repository';
import { CreateProductDTO } from 'src/modules/products/domain/interface/dtos/products/create-product.dto';


@Injectable()
export class CreateProductUseCase {
  constructor(private readonly productRepository: ProductsRepository) {}

  async execute(dto: CreateProductDTO): Promise<Product> {
    return this.productRepository.createUser(dto);
  }
}
