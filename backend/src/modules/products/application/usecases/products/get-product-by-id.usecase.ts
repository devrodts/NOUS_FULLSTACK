import { Injectable } from '@nestjs/common';
import { ProductsService } from '../../services/products/products.service';
import { GetProductByIdDTO } from 'src/modules/products/domain/interface/dtos/products/get-product-by-id.dto';

@Injectable()
export class GetProductByIdUseCase {
  constructor(private readonly productsService: ProductsService) {}

  async execute(dto: GetProductByIdDTO) {
    try {
      const product = await this.productsService.getProductById(dto);
      if (!product) {
        console.log('Product not found :::::', product);
        return null;
      }
      return product;
    } catch (error) {
      console.log('GetProductByIdUseCase :::::', error);
      throw error;
    }
  }
}
