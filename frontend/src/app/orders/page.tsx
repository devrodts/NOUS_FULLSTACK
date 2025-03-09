"use client"
import { useEffect } from "react"
import LinearLoading from "@/components/atoms/LinearLoading/LinearLoading"
import { mobileMainSyle, desktopMainSyle, pageMainLoadingStyle } from "@/constants/theme/theme_constants";
import useDeviceType from "@/hooks/useDeviceType";
import { useOrderContext } from "@/context/OrdersContext/OrderContext"
import getAllOrders from "@/context/OrdersContext/get-all-orders"
import OrderList from "@/components/organisms/OrderList/OrderList"
import { OrdersAction } from "@/context/OrdersContext/orderReducer";
export default function ProductsPage() {

  const { state, dispatch } = useOrderContext(); 
  const { orders, loading, error } = state;

  const isMobile = useDeviceType()

  useEffect(() => {
    getAllOrders(dispatch as React.Dispatch<OrdersAction>);
  }, []);
  

  if (loading) return (
    <>
    <div style={pageMainLoadingStyle}>
      <LinearLoading />
    </div>
    </>
  )
  
  if (error) return <div>{error}</div>; 

  return (
    <div style={isMobile ? mobileMainSyle : desktopMainSyle}>
      <OrderList orders={orders} />;
    </div>
  )
}
