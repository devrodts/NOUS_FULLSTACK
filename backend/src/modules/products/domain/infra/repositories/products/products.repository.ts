import { Injectable, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Product } from "src/modules/products/domain/entities/products.entity";
import { CreateProductDTO } from "src/modules/products/domain/interface/dtos/products/create-product.dto";
import { DeleteProductDTO } from "../../../interface/dtos/products/delete-product.dto";
import { GetProductByIdDTO } from "../../../interface/dtos/products/get-product-by-id.dto";
import { UpdateProductDTO } from "../../../interface/dtos/products";

@Injectable()
export class ProductsRepository{
    constructor(@InjectModel(Product.name) private productModel: Model<Product>){}
    

    async createProduct(dto:CreateProductDTO): Promise<Product>{

        try{
            const newProduct = new this.productModel(dto)
            return newProduct.save();
        }catch(error){
            console.log("Create User Repository ::::::::::: ", error)
            throw error;
        }

    }

    async deleteProductById(dto: DeleteProductDTO){
        console.log("deleteProductById Repository :::::", dto)
        try{
            const product = await this.productModel.findOne({ id: dto.id });
            console.log("product :::::", product)

           if(!product){
                console.log("Product not found :::::", product)
                return null;
           }

           const deletedProduct = await this.productModel.findOneAndDelete({
            id: dto.id
        })
           if(!deletedProduct){
                console.log("deleteProductById REPOSITORY :::::", deletedProduct)
           }
           return deletedProduct;
        }catch(error){
            console.log("Delete Product By ID ProductsRepository ::::::::: ", error)
            throw error;
        }
    }

    async findAllProducts(){
        try{
            return this.productModel.find();
        }catch(error){
            console.log("TRY findAllPRoducts Repository :::::::::::", error)
            throw error;
        }     
    }

    async getProductById(dto: GetProductByIdDTO){
        try{
            console.log("getProductById Repository :::::", dto)
            const product = await this.productModel.findOne({ id: dto.id });
            if(!product){
                console.log("Product not found :::::", product)
                return null;
            }
            return product;
        }catch(error){
            console.log("getProductById Repository :::::", error)
            throw error;
        }
    }

    async updateProductById(id: string, dto: Partial<UpdateProductDTO>){
        try{
            const productToUpdate = await this.productModel.findOne({ id: id });

            if(!productToUpdate){
                console.log("Product not found :::::", productToUpdate)
                return null;
            }

            Logger.log("productToUpdate :::::", productToUpdate)
            Logger.log("dto :::::", dto)
            const updatedProduct = await this.productModel.updateOne({ id }, dto , { new: true });

            Logger.log("Atualizando produto com id:", id, "com dados:", dto);


            if(!updatedProduct){
                console.log("Product not updated :::::", updatedProduct)
                return null;
            }
            return updatedProduct;
            
        }catch(error){
            console.log("updateProductById Repository :::::", error)
            throw error;
        }
    }
}