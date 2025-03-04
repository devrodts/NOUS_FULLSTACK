import OrderList from "@/components/OrderList/OrderList"
import { fetchFromAPI } from "@/app/lib/api"

export const revalidate = 60


async function getOrders() {
  try {
    return await fetchFromAPI("orders")
  } catch (error) {
    console.error('Failed to fetch orders ::: OrdersPage', error);
    return []
  }
}

export default async function OrdersPage() {
  const orders = await getOrders()
  return <OrderList orders={orders} />
}

