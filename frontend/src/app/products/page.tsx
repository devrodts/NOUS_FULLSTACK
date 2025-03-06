"use client"

import { useProductContext } from "@/context/ProductContext/ProductContext"
import { useEffect } from "react"
import ProductList from "@/components/ProductList/ProductList"
import getProducts from "@/context/ProductContext/get-all-products"

export default function ProductsPage() {
  const { state, dispatch } = useProductContext(); 
  const { products, loading, error } = state;
  useEffect(() => {
    getProducts(dispatch);
  }, [dispatch]);

  if (loading) return <div>Carregando...</div>;

  if (error) return <div>{error}</div>; 

  return <ProductList products={products} />;
}
