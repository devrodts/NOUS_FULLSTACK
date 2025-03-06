import { Injectable } from "@nestjs/common";
import { CategoriesService } from "../services/categories.service";
import { DeleteCategoryDTO } from "../../domain/interface/dtos/delete-category.dto";

@Injectable()
export class DeleteCategoryByIdUseCase{
    constructor(private readonly categoriesService: CategoriesService){}

    async execute(dto: DeleteCategoryDTO){
        return this.categoriesService.deleteCategoryById(dto);
    }
    
}
