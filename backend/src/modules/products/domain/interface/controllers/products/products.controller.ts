import {
   Controller,
  Post, 
  Body, 
  Get, 
  Delete,
  Param,
  Put,
} from '@nestjs/common';

import { ProductsService } from 'src/modules/products/application/services/products/products.service';

import { CreateProductDTO } from '../../dtos/products/create-product.dto';

import { CreateProductUseCase } from 'src/modules/products/application/usecases/products/create-product.usecase';
import { DeleteProductDTO } from '../../dtos/products/delete-product.dto';
import { DeleteProductUseCase, GetProductByIdUseCase } from 'src/modules/products/application/usecases/products';
import { GetProductByIdDTO } from '../../dtos/products';
import { UpdateProductByIdUseCase } from 'src/modules/products/application/usecases/products/update-product-by-id.usecase';


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
  async deleteProductById(@Param('id') dto: DeleteProductDTO){
    try{
      const product = await this.deleteProductUseCase.execute({id: dto.id})
      if(!product){
        console.log("Product not found :::::", product)
        return null;
      }
      return product;
    }catch(error){
        console.log("deletePoductById Controller ::::::: Catch", error)
        throw error;
    }
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateProductDto: Partial<CreateProductDTO>) {
    try{
      const product = await this.updateProductByIdUseCase.execute({id, ...updateProductDto})
      if(!product){
        console.log("Product not found :::::", product)
        return null;
      }
      return product;
    }catch(error){
      console.log("updateProductById Controller :::::::", error)
      throw error;
    }
  }
}
