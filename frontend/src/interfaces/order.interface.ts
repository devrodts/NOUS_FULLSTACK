import { ProductInterface } from "./product";

export interface OrderInterface{
    id: string;
    total: number;
    createdAt: Date;
    updatedAt: Date;
    products: ProductInterface[];
}