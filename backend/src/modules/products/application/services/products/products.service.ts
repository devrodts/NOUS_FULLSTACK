import { Injectable } from '@nestjs/common';
import { ProductsRepository } from 'src/modules/products/domain/infra/repositories/products/products.repository';
import { UpdateProductDTO } from 'src/modules/products/domain/interface/dtos/products';
import { CreateProductDTO } from 'src/modules/products/domain/interface/dtos/products/create-product.dto';
import { DeleteProductDTO } from 'src/modules/products/domain/interface/dtos/products/delete-product.dto';

@Injectable()
export class ProductsService {

  constructor(private readonly productsRepository: ProductsRepository) {}

  createProduct(dto: CreateProductDTO) {
    return this.productsRepository.createProduct(dto)
  }

  deleteProductById(dto: DeleteProductDTO){
    return this.productsRepository.deleteProductById({id: dto.id})
  }

  findAllProducts(){
    return this.productsRepository.findAllProducts();
  }

  getProductById(dto: DeleteProductDTO){
    return this.productsRepository.getProductById(dto);
  }

  updateProductById(id: string, dto: Partial<UpdateProductDTO>){
    return this.productsRepository.updateProductById(id, dto);
  }

  
}
