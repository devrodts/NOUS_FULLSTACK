import { Injectable } from '@nestjs/common';
import { ProductsRepository } from 'src/modules/products/domain/infra/repositories/products/products.repository';
import { CreateProductDTO } from 'src/modules/products/domain/interface/dtos/products/create-product.dto';

@Injectable()
export class ProductsService {
  constructor(private readonly productsRepository: ProductsRepository) {}

  createUser(dto: CreateProductDTO) {
    return this.productsRepository.createUser(dto);
  }

//   findAll() {
//     return this.productsRepository.findAllUsers();
//   }

//   findById(id: string) {
//     return this.productsRepository.findUserById(id);
//   }

//   update(id: string, dto: Partial<CreateProductDto>) {
//     return this.productsRepository.updateUserById(id, dto);
//   }

//   delete(id: string) {
//     return this.productsRepository.deleteUser(id);
//   }
}
