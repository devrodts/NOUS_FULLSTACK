import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Category, CategorySchema } from "./domain/entities/categories.entity";
import { CategoriesController } from "./domain/interface/controllers/categories.controller";
import { CategoriesService } from "./application/services/categories.service";
import { UpdateCategoryByIdUseCase, GetCategoryByIdUseCase, FindAllCategoriesUseCase, CreateCategoryUseCase, DeleteCategoryByIdUseCase} from "./application/usecases/index";
import { CategoriesRepository } from "./domain/infra/repositories/categories.repository";

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: Category.name,
                schema: CategorySchema
            }
        ])
    ],
    controllers: [
        CategoriesController
    ],
    providers: [
        CategoriesService,
        CategoriesRepository,
        CreateCategoryUseCase,
        DeleteCategoryByIdUseCase,
        GetCategoryByIdUseCase,
        UpdateCategoryByIdUseCase,
        FindAllCategoriesUseCase
    ],
    exports: [
        CategoriesRepository
    ]
})
export class CategoriesModule {}