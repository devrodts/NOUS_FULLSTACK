import { ProductInterface } from "@/interfaces/product";
import { FailToGetProduct } from "./errors/fail-get-product";

export async function getProducts(): Promise<ProductInterface[]>{
    try{
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`)
        const data = await response.json()
        console.log(data)
        return data as ProductInterface[];
    } catch (error) {
        throw new FailToGetProduct("Failed to get products", error as Error)
    }
}