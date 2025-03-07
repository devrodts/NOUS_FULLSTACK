import { CreateProductDTO } from "src/modules/products/domain/interface/dtos/products/create-product.dto";
import { ProductsService } from "../../services/products/products.service";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { UpdateProductDTO } from "src/modules/products/domain/interface/dtos/products";

@Injectable()
export class UpdateProductByIdUseCase{
    constructor(
        private readonly productsService: ProductsService
    ){}
    
    async execute(data: { id: string; dto: Partial<UpdateProductDTO> }) {
        const { id, dto } = data;
        try {
          return this.productsService.updateProductById(id, dto);
        } catch (error) {
          console.log("UpdateProductByIdUseCase :::::: CATCH", error);
          throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
      }
}