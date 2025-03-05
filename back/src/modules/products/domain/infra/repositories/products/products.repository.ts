import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Product } from "src/modules/products/domain/entities/products/products.entity";
import { CreateProductDTO } from "src/modules/products/domain/interface/dtos/products/create-product.dto";

@Injectable()
export class ProductsRepository{
    constructor(@InjectModel(Product.name) private productModel: Model<Product>){}
    

    async createUser(dto: CreateProductDTO): Promise<Product>{

        try{
            const newProduct = new this.productModel(dto)
            return newProduct.save();
        }catch(error){
            console.log("Create User Repository ::::::::::: ", error)
            throw error;
        }

    }
    
}