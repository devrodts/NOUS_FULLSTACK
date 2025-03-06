import { ProductInterface } from "@/interfaces"
import { FailToAddProduct } from "./errors"

export async function addProduct(product: ProductInterface){
    const API_URL = process.env.NEXT_PUBLIC_API_URL
    try{
        const response = await fetch(`${API_URL}/products`, {
            method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(product)
        })
    return response.json()
    } catch (error) {
        throw new FailToAddProduct("Failed to add product", error as Error)
    }
}