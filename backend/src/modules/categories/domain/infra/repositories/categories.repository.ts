import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from 'src/modules/categories/domain/entities/categories.entity';
import { CreateCategoryDTO } from '../../interface/dtos/create-category.dto';
import { DeleteCategoryDTO } from '../../interface/dtos/delete-category.dto';
import { GetCategoryByIdDTO } from '../../interface/dtos/get-category-by-id.dto';
import { CreateProductDTO } from 'src/modules/products/domain/interface/dtos/products/create-product.dto';

@Injectable()
export class CategoriesRepository {
  private readonly logger = new Logger(CategoriesRepository.name);
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<Category>,
  ) {}

  async createCategory(dto: CreateCategoryDTO): Promise<Category> {
    try {
      const newCategory = new this.categoryModel(dto);
      return newCategory.save();
    } catch (error) {
      this.logger.error('Create Category Repository ::::::::::: ', error);
      throw error;
    }
  }

  async deleteCategoryById(dto: DeleteCategoryDTO) {

    this.logger.log('deleteCategoryById Repository :::::', dto);
    try {
      const category = await this.categoryModel.findOne({ id: dto.id });
      this.logger.log('category :::::', category);
      
      if (!category) {
        this.logger.log('Category not found :::::', category);
        return null;
      }

      await this.categoryModel.updateMany(
        {categoryId: {$in: [dto.id]}},
        {$pull: {categoryId: dto.id}}
      )
      const deletedCategory = await this.categoryModel.findOneAndDelete({
        id: dto.id,
      });
      
      if (!deletedCategory) {
        this.logger.log('deleteCategoryById REPOSITORY :::::', deletedCategory);
      }

      return deletedCategory;
    } catch (error) {
      this.logger.error(
        'Delete Category By ID CategoriesRepository ::::::::: ',
        error,
      );
      throw error;
    }
  }

  async findAllCategories() {
    try {
      return this.categoryModel.find();
    } catch (error) {
      this.logger.error('TRY findAllCategories Repository :::::::::::', error);
      throw error;
    }
  }

  async getCategoryById(dto: GetCategoryByIdDTO) {
    try {
      this.logger.log('getCategoryById Repository :::::', dto);
      const category = await this.categoryModel.findOne({ id: dto.id });
      if (!category) {
        this.logger.log('Category not found :::::', category);
        return null;
      }
      return category;
    } catch (error) {
      this.logger.error('getCategoryById Repository :::::', error);
      throw error;
    }
  }

  async updateCategoryById(id: string, dto: Partial<CreateCategoryDTO>) {
    try {
      const categoryEdited = await this.categoryModel.findByIdAndUpdate(
        id,
        dto,
        { new: true },
      );
      if (!categoryEdited) {
        this.logger.log('Category not found :::::', categoryEdited);
        return null;
      }
      return categoryEdited;
    } catch (error) {
      this.logger.error('updateCategoryById Repository :::::', error);
      throw error;
    }
  }

  async deleteMany() {
    return this.categoryModel.deleteMany({});
  }
  
}
