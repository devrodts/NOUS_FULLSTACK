import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CategoriesService } from "../services/categories.service";

@Injectable()
export class FindAllCategoriesUseCase{
    constructor(private readonly categoriesService: CategoriesService){}
    
    async execute(){
        try{
            return this.categoriesService.findAllCategories();
        }catch(error){
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }
}
    