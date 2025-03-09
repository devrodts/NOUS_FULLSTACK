import { Injectable } from '@nestjs/common';
import { CategoriesService } from '../services/categories.service';
import { GetCategoryByIdDTO } from '../../domain/interface/dtos/get-category-by-id.dto';
@Injectable()
export class GetCategoryByIdUseCase {
  constructor(private readonly categoriesService: CategoriesService) {}

  async execute(dto: GetCategoryByIdDTO) {
    return this.categoriesService.getCategoryById(dto);
  }
}
