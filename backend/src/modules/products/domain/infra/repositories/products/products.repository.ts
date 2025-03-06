import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Product } from "src/modules/products/domain/entities/products.entity";
import { CreateProductDTO } from "src/modules/products/domain/interface/dtos/products/create-product.dto";
import { DeleteProductDTO } from "../../../interface/dtos/products/delete-product.dto";
import { GetProductByIdDTO } from "../../../interface/dtos/products/get-product-by-id.dto";

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

        try{
           const product = await this.productModel.findById(dto.id)
           const deletedProduct = await this.productModel.findByIdAndDelete(dto.id)
           
           console.log("deleteProductById REPOSITORY :::::", product)
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
            const product = await this.productModel.findById(dto.id);
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

    updateProductById(id: string, dto: Partial<CreateProductDTO>){
        try{
            return this.productModel.findByIdAndUpdate(id, dto, {new: true});
        }catch(error){
            console.log("updateProductById Repository :::::", error)
            throw error;
        }
    }
}