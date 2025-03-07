import {
   Controller,
  Post, 
  Body, 
  Get, 
  Delete,
  Param,
  Patch,
} from '@nestjs/common';

import { ProductsService } from 'src/modules/products/application/services/products/products.service';

import { CreateProductDTO } from '../../dtos/products/create-product.dto';

import { CreateProductUseCase } from 'src/modules/products/application/usecases/products/create-product.usecase';
import { DeleteProductUseCase, GetProductByIdUseCase } from 'src/modules/products/application/usecases/products';
import { UpdateProductByIdUseCase } from 'src/modules/products/application/usecases/products/update-product-by-id.usecase';
import { UpdateProductDTO } from '../../dtos/products';


@Controller('products')
export class ProductController {

  constructor(

    private readonly productsService: ProductsService,

    private readonly createProductUseCase: CreateProductUseCase,
    private readonly deleteProductUseCase:
    DeleteProductUseCase,
    private readonly getProductByIdUseCase: GetProductByIdUseCase,
    private readonly updateProductByIdUseCase: UpdateProductByIdUseCase
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

  @Get(':id') 
  async findProductById(@Param('id') id: string){
    try{
      const product = await this.getProductByIdUseCase.execute({id})
      if(!product){
        console.log("Product not found")
      }
      return product;
    }catch(e){
      console.log("Ocorreu um erro findProductById :::::: Controller Catch", e)
      throw e;
    }
  }


  @Get()
  async findAllProducts(){
    try{
      const result  = await this.productsService.findAllProducts()
      if(!result){
        console.log("failed to get results", result)
        return
      }
      return result

    }catch(error){
      console.log("findAllProducts CONTROLLER ::::::::",  error)
      throw error;
    }
  }

  @Delete(':id')
  async deleteProductById(@Param('id') id: string){
    try{
      const product = await this.deleteProductUseCase.execute({ id });
      if(!product){
        console.log("Product not found :::::", product)
        return null;
      }
      return product;
    }catch(error){
        console.log("deleteProductById Controller ::::::: Catch", error)
        throw error;
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDTO) {
    try {
      console.log("updateProductDto :::::", updateProductDto.name, updateProductDto.price)
      
      const product = await this.updateProductByIdUseCase.execute({ id, dto: updateProductDto });
      if (!product) {
        console.log("Product not found :::::", product);
        return null;
      }
      return product;
    } catch (error) {
      console.log("updateProductById Controller :::::::", error);
      throw error;
    }
  }
}
