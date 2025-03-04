"use client"

import { useParams } from "next/navigation"

export default function ProductPage() {

const { id } = useParams()

  return(
    <>
      <h1>Edit Product</h1>
      <h2>{id}</h2>
    </>
  )
}

