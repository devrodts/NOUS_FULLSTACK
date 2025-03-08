
import { SchemaFactory } from "@nestjs/mongoose";
import { IsArray, IsDate, IsMongoId, IsNotEmpty, IsNumber } from "class-validator";

export class Orders{
    @IsMongoId()
    @IsNotEmpty()
    id: string;

    @IsDate()
    @IsNotEmpty()
    date: Date;

    @IsArray()
    @IsNotEmpty()
    productsIds: string[];

    @IsNumber()
    @IsNotEmpty()
    total: number;

    @IsDate()
    @IsNotEmpty()
    created_at: Date;

    @IsDate()
    @IsNotEmpty()
    updated_at: Date;
}
export const OrdersSchema = SchemaFactory.createForClass(Orders);