import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { CreateCategoryUseCase } from 'src/modules/categories/application/usecases/create-category.usecase';
import { CreateCategoryDTO } from '../dtos/create-category.dto';
import { DeleteCategoryByIdUseCase } from 'src/modules/categories/application/usecases/delete-category.usecase';
import { GetCategoryByIdUseCase } from 'src/modules/categories/application/usecases/get-category.usecase';
import { UpdateCategoryByIdUseCase } from 'src/modules/categories/application/usecases/update-cateogory-id';
import { FindAllCategoriesUseCase } from 'src/modules/categories/application/usecases/find-all-categories.usecase';
import { UpdateCategoryByIdDTO } from '../dtos';

@Controller('categories')
export class CategoriesController {
  constructor(
    private readonly createCategoryUseCase: CreateCategoryUseCase,
    private readonly deleteCategoryByIdUseCase: DeleteCategoryByIdUseCase,
    private readonly getCategoryByIdUseCase: GetCategoryByIdUseCase,
    private readonly updateCategoryByIdUseCase: UpdateCategoryByIdUseCase,
    private readonly findAllCategoriesUseCase: FindAllCategoriesUseCase,
  ) {}

  @Post()
  createCategory(@Body() dto: CreateCategoryDTO) {
    try {
      return this.createCategoryUseCase.execute(dto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  deleteCategoryById(@Param('id') id: string) {
    try {
      return this.deleteCategoryByIdUseCase.execute({ id });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  findAllCategories() {
    try {
      return this.findAllCategoriesUseCase.execute();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get(':id')
  getCategoryById(@Param('id') id: string) {
    try {
      return this.getCategoryByIdUseCase.execute({ id });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Patch(':id')
  updateCategoryById(
    @Param('id') id: string,
    @Body() dto: UpdateCategoryByIdDTO,
  ) {
    try {
      return this.updateCategoryByIdUseCase.execute(dto.id, dto.dto);
    } catch (error) {
      console.log(
        'CATCH :::: updateCategoryById Controller UseCase ::::',
        error,
      );
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
