import { ProductInterface } from "../../interfaces/product"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3002"

export async function fetchFromAPI(endpoint: string) {
  console.log(`${API_URL}/${endpoint}`)
  const response = await fetch(`${API_URL}/${endpoint}`)
  if (!response.ok) {
    console.log(response)
    throw new Error(`API request failed: ${response.statusText}`)
  }
  return response.json()
}

export async function createProduct(product: ProductInterface) {
  const response = await fetch(`${API_URL}/products`, {
    method: "POST",
    body: JSON.stringify(product),
  })
  return response.json()
}


export async function getProducts() {
  console.log(API_URL)
  try{
    const response = await fetch(`${API_URL}/products`)
    return response.json()
  } catch (error) {
    console.error("Error getting products:", error)
    throw error
  }
}

export async function updateProduct(product: ProductInterface) {

  try{
    const response = await fetch(`${API_URL}/products/${product._id}`, {
      method: "PUT",
      body: JSON.stringify(product),
    })
    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`)
    }
    return response.json()
  } catch (error) {
    console.error("Error updating product:", error)
    throw error
  }
}
