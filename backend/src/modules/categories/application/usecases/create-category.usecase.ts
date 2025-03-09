import { Injectable } from '@nestjs/common';
import { CategoriesService } from '../services/categories.service';
import { CreateCategoryDTO } from '../../domain/interface/dtos/create-category.dto';

@Injectable()
export class CreateCategoryUseCase {
  constructor(private readonly categoriesService: CategoriesService) {}

  async execute(dto: CreateCategoryDTO) {
    return this.categoriesService.createCategory(dto);
  }
}
