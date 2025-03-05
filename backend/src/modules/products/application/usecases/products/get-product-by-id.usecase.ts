import { Injectable } from "@nestjs/common";
import { ProductsService } from "../../services/products/products.service";
import { GetProductByIdDTO } from "src/modules/products/domain/interface/dtos/products/get-product-by-id.dto";

@Injectable()
export class GetProductByIdUseCase{
    constructor(
        private readonly productsService: ProductsService
    ){}

    async execute(dto: GetProductByIdDTO){
        return this.productsService.getProductById(dto)
    }
}