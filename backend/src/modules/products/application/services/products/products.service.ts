import { Injectable } from '@nestjs/common';
import { ProductsRepository } from 'src/modules/products/domain/infra/repositories/products/products.repository';
import { CreateProductDTO } from 'src/modules/products/domain/interface/dtos/products/create-product.dto';
import { DeleteProductDTO } from 'src/modules/products/domain/interface/dtos/products/delete-product.dto';

@Injectable()
export class ProductsService {
  constructor(private readonly productsRepository: ProductsRepository) {}

  createProduct(dto: CreateProductDTO) {
    return this.productsRepository.createProduct(dto)
  }

  deleteProductById(dto: DeleteProductDTO){
    return this.productsRepository.deleteProductById(dto)
  }

  findAllProducts(){
    return this.productsRepository.findAllProducts();
  }

  getProductById(dto: DeleteProductDTO){
    return this.productsRepository.getProductById(dto);

  }
}
