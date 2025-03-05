import {Injectable} from "@nestjs/common"
import { Product } from "src/modules/products/domain/entities/products.entity";
import { ProductsRepository } from "src/modules/products/domain/infra/repositories/products/products.repository";
import { DeleteProductDTO } from "src/modules/products/domain/interface/dtos/products/delete-product.dto";


@Injectable()
export class DeleteProductUseCase{
 
    constructor(
        private readonly productsRepository: ProductsRepository
    ){}

    async execute(dto: DeleteProductDTO): Promise<any>{
        try{
            const result = await this.productsRepository.deleteProductById(dto);
            if(!result){
                console.log("Failed to Delete The Product at Delete Product Use Case :::::", result)
            }
            return result;
        }catch(error){

        }
        return this.productsRepository.deleteProductById(dto);
    }
}
