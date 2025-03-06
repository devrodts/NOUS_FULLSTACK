import { Injectable } from "@nestjs/common";
import { CategoriesRepository } from "../../domain/infra/repositories/categories.repository";
import { CreateCategoryDTO } from "../../domain/interface/dtos/create-category.dto";
import { DeleteCategoryDTO } from "../../domain/interface/dtos/delete-category.dto";
import { GetCategoryByIdDTO } from "../../domain/interface/dtos/get-category-by-id.dto";

@Injectable()
export class CategoriesService{
    
    constructor(private readonly categoriesRepository: CategoriesRepository){}

    async createCategory(dto: CreateCategoryDTO){
        try{
            return this.categoriesRepository.createCategory(dto);
        }catch(error){
            console.log("Create Category Service ::::::::::: ", error)
            throw error;
        }
    }

    async deleteCategoryById(dto: DeleteCategoryDTO){
        try{
            return this.categoriesRepository.deleteCategoryById(dto);
        }catch(error){
            console.log("Delete Category Service ::::::::::: ", error)
            throw error;
        }
    }

    async getCategoryById(dto: GetCategoryByIdDTO){
        try{
            return this.categoriesRepository.getCategoryById(dto);
        }catch(error){
            console.log("Get Category By ID Service ::::::::::: ", error)
            throw error;
        }
    }

    async findAllCategories(){
        try{
            return this.categoriesRepository.findAllCategories();
        }catch(error){
            console.log("Find All Categories Service ::::::::::: ", error)
            throw error;
        }
    }

    async updateCategoryById(id: string, dto: Partial<CreateCategoryDTO>){
        try{
            return this.categoriesRepository.updateCategoryById(id, dto);
        }catch(error){
            console.log("Update Category By ID Service ::::::::::: ", error)
            throw error;
        }
    }
}