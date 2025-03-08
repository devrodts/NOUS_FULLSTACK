import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CategoriesService } from '../services/categories.service';
import { CreateCategoryDTO } from '../../domain/interface/dtos/create-category.dto';

@Injectable()
export class UpdateCategoryByIdUseCase {
  constructor(private readonly categoriesService: CategoriesService) {}

  async execute(id: string, dto: Partial<CreateCategoryDTO>) {
    try {
      return this.categoriesService.updateCategoryById(id, dto);
    } catch (error) {
      console.log('UpdateCategoryByIdUseCase :::::: CATCH', error);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
