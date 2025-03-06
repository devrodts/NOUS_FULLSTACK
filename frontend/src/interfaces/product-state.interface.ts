import { ProductInterface } from "./product";

export interface ProductStateInterface{
    products: ProductInterface[];
    product: ProductInterface | null;
    loading: boolean;
    error: string | null;
}