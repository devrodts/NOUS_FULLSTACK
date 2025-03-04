import CategoryList from "@/components/CategoryList/CategoryList"
import { fetchFromAPI } from "@/app/lib/api"

export const revalidate = 60

async function getCategories() {
  try {
    return await fetchFromAPI("categories")
  } catch (error) {
    console.error('Failed to fetch categories ::: CategoriesPage', error);
    return []
  }
}

export default async function CategoriesPage() {
  const categories = await getCategories()
  return <CategoryList categories={categories} />
}

