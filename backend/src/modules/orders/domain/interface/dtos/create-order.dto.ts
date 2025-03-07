import { IsArray, IsDate, IsNotEmpty, IsMongoId, IsNumber } from "class-validator";

export class CreateOrderDto {

    @IsMongoId()
    @IsNotEmpty()
    id: string;

    @IsArray()
    @IsNotEmpty()
    productsIds?: string[];

    @IsNumber()
    @IsNotEmpty()
    total: number;

    @IsDate()
    @IsNotEmpty()
    date: Date;

    @IsDate()
    @IsNotEmpty()
    created_at: Date;

    @IsDate()
    @IsNotEmpty()
    updated_at: Date;
}