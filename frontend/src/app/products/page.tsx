"use client"

import { useProductContext } from "@/context/ProductContext/ProductContext"
import { useEffect } from "react"
import ProductList from "@/components/organisms/ProductList/ProductList"
import getProducts from "@/context/ProductContext/get-all-products"
import LinearLoading from "@/components/atoms/LinearLoading/LinearLoading"
import { mobileMainSyle, desktopMainSyle } from "@/constants/theme/theme_constants";
import useDeviceType from "@/hooks/useDeviceType";

export default function ProductsPage() {
  const { state, dispatch } = useProductContext(); 
  const { products, loading, error } = state;

  const isMobile = useDeviceType()
  useEffect(() => {
    getProducts(dispatch);
  }, [dispatch]);

  if (loading) return (
    <>
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', marginTop: '50px' }}>
      <LinearLoading />
    </div>
    </>
  )
  
  if (error) return <div>{error}</div>; 

  return (
    <div style={isMobile ? mobileMainSyle : desktopMainSyle}>
      <ProductList products={products} />;
    </div>
  )
}
