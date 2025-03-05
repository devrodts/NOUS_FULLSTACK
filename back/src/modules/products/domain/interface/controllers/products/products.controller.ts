import { Controller, Post, Body, Get, Delete } from '@nestjs/common';

import { ProductsService } from 'src/modules/products/application/services/products/products.service';

import { CreateProductDTO } from '../../dtos/products/create-product.dto';

import { CreateProductUseCase } from 'src/modules/products/application/usecases/products/create-product.usecase';
import { DeleteProductDTO } from '../../dtos/products/delete-product.dto';
import { DeleteProductUseCase } from 'src/modules/products/application/usecases/products';


@Controller('products')
export class ProductController {

  constructor(

    private readonly productsService: ProductsService,

    private readonly createProductUseCase: CreateProductUseCase,
    private readonly deleteProductUseCase:
    DeleteProductUseCase
  ) {}

  @Post()
  async create(@Body() createProductDto: CreateProductDTO) {
    try {
      const product = await this.createProductUseCase.execute(createProductDto);
      return product;
    } catch (error) {
      console.log("PRODUCT CONTROLLER CREATE USER USE CASE :::::")
      console.error("Erro ao criar produto: ", error);
      throw error;
    }
  }

  @Get()
  async findAllProducts(){
    return this.findAllProducts()
  }

  @Delete()
  async deleteProductById(@Body() deleteProductDTO: DeleteProductDTO){
    try{
      const product = await this.deleteProductUseCase.execute(deleteProductDTO)
      return product;
    }catch(error){
        console.log("deletePoductById Controller :::::::", error)
        throw error;
    }
  }

//   @Get()
//   findAll() {
//     return this.productsService.findAll();
//   }

//   @Get(':id')
//   findOne(@Param('id') id: string) {
//     return this.productsService.findById(id);
//   }

//   @Put(':id')
//   update(@Param('id') id: string, @Body() updateProductDto: Partial<CreateProductDto>) {
//     return this.productsService.update(id, updateProductDto);
//   }

//   @Delete(':id')
//   remove(@Param('id') id: string) {
//     return this.productsService.delete(id);
//   }
}
