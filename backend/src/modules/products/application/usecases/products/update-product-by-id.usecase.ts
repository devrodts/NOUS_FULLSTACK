import { ProductsService } from "../../services/products/products.service";
import { UpdateProductDTO } from "src/modules/products/domain/interface/dtos/products/update-product.dto";
export class UpdateProductByIdUseCase{
    constructor(
        private readonly productsService: ProductsService
    ){}
    
    async execute(dto: UpdateProductDTO){
        try{
            const product = await this.productsService.updateProductById(dto.id, dto);
            if(!product){
                console.log("Product not found :::::", product)
                return null;
            }
            return product;
        }catch(error){
            console.log("UpdateProductByIdUseCase :::::", error)
            throw error;
        }
    }
}