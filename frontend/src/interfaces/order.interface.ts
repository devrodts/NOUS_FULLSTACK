import { ProductInterface } from "./product";

export interface OrderInterface{
    _id: string;
    total: number;
    createdAt: Date;
    updatedAt: Date;
    products: ProductInterface[];
}