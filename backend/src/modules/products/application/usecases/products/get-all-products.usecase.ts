import { Injectable } from '@nestjs/common';
import { ProductsService } from '../../services/products/products.service';

@Injectable()
export class GetAllProductsUseCase {
  constructor(private readonly productsService: ProductsService) {}
  async execute() {
    return await this.productsService.findAllProducts();
  }
}
