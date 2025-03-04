import ProductList from "@/components/ProductList/ProductList"
import { fetchFromAPI } from "@/app/lib/api"

export const revalidate = 60

async function getProducts() {
  try {
    return await fetchFromAPI("products")
  } catch (error) {
    console.error('Failed to fetch products ::: ProductsPage', error);
    return []
  }
}

export default async function ProductsPage() {
  const products = await getProducts()
  return <ProductList products={products} />
}

