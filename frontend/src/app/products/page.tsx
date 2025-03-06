"use client"

import { useProductContext } from "@/context/ProductContext/ProductContext"
import { useEffect } from "react"
import ProductList from "@/components/ProductList/ProductList"
import getProducts from "@/context/ProductContext/get-all-products"
import LinearLoading from "@/components/LinearLoading/LinearLoading"

export default function ProductsPage() {
  const { state, dispatch } = useProductContext(); 
  const { products, loading, error } = state;
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

  return <ProductList products={products} />;
}
