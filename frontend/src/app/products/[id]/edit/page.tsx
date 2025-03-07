"use client"

import { useParams } from "next/navigation"
import { Box, Button, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react"


export default function ProductPage() {


 type formData = {
  name: string,
  price: number | string,
  stock: number | string,
  description: string,
  image: string,
 }
const { id, name, price, stock, description, image } = useParams()

const [formData, setFormData] = useState<formData>({
  name: "",
  price: 0,
  stock: 0,
  description: "",
  image: "",
})

useEffect(() => {
  (async () => {
    const response = await fetch(`http://localhost:3000/products/${id}`)
    console.log(response)
    const data = await response.json()
    setFormData({
      name: data.name || "",
      price: data.price || 0,
      stock: data.stock || 0,
      description: data.description || "",
      image: data.image || "",
    })
  })()  
}, [id])

const handleSubmit = async () => {
  try {
    const response = await fetch(`http://localhost:3000/products/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    })
    const data = await response.json()
    console.log(data)
  } catch (error) {
    console.error(error)
  }
}
  
  return(
    <>
      <h1>Edit Product</h1>
     <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
     <TextField
        label="Name"
        name="name"
        placeholder={name as string}
        value={formData.name}
        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
      />
      <TextField
        label="Price"
        name="price"
        placeholder={price as string}
        value={formData.price}
        type="text"
        onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
        onBlur={(e) => setFormData(prev => ({ ...prev, price: parseFloat(e.target.value) }))}
      />
      <TextField
        label="Stock"
        name="stock"
        placeholder={stock as string}
        value={formData.stock}
        type="text"
        onChange={(e) => setFormData(prev => ({ ...prev, stock: e.target.value }))}
        onBlur={(e) => setFormData(prev => ({ ...prev, stock: parseFloat(e.target.value) }))}
      />
      <TextField
        label="Description"
        name="description"
        placeholder={description as string}
        value={formData.description}
        onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
      />

      <Button variant="contained" color="primary" onClick={handleSubmit}>Update</Button>
     </Box>
      {/* <h2>{id}</h2> */}
    </>
  )
}

