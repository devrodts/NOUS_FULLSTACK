"use client"

import { useParams } from "next/navigation"
import { Box, Button, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import useDeviceType from "@/hooks/useDeviceType"
import { mobileMainSyle, desktopMainSyle } from "@/constants/theme/theme_constants"
import { useRouter } from "next/navigation"
export default function ProductPage() {


 type formData = {
  id: string,
  total: number | string,
  status: string,
  productsIds: string[];
 }
const { id, total, status } = useParams()

const isMobile = useDeviceType();
const router = useRouter();
const [formData, setFormData] = useState<formData>({
  id: "",
  total: 0,
  productsIds: [],
  status: "",
})

useEffect(() => {
  (async () => {
    const response = await fetch(`http://localhost:3000/orders/${id}`)
    console.log(response)
    const data = await response.json()
    setFormData({
     id: data.id,
     total: data.total,
     status: data.status,
     productsIds: data.productsIds,
    })
  })()  
}, [id])

const handleSubmit = async () => {
  try {
    const response = await fetch(`http://localhost:3000/orders/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    })

    const data = await response.json()
    if(response.ok){  
      console.log(data)
      router.push(`/orders/`)
    } else {
      console.error(data)
    }
  } catch (error) {
    console.error(error)
  }
}

  
  return(
    <>
      <h1 style={isMobile ? { marginTop: "60px", marginLeft: "15px" } : {}}>Editar Ordem</h1>
     <div style={isMobile ? {
      ...mobileMainSyle,
      display: "flex",
      flexDirection: "column",
      gap: "20px"
     } : 
      {
        ...desktopMainSyle,
        display: "flex",
        maxWidth: "60vw",
        flexDirection: "column",
        gap: "20px",
      }
      }>
     <TextField
        label="Id da ordem"
        name="id"
        placeholder={id as string}
        value={formData.id}
        onChange={(e) => setFormData(prev => ({ ...prev, id: e.target.value }))}
      />
      <TextField
        label="Id de produtos"
        name="productsIds"
        placeholder={formData.productsIds}
        // placeholder={formData.productsIds.map((productId) => productId).join(", ")}
        value={formData.productsIds}
        type="text"
        // onChange={(e) => setFormData(prev => ({ ...prev, productsIds: [...prev.productsIds, e.target.value] }))}
      />
      <TextField
        label="Total"
        name="total"
        placeholder={total as string}
        value={formData.total}
        type="text"
        onChange={(e) => setFormData(prev => ({ ...prev, total: e.target.value }))}
        onBlur={(e) => setFormData(prev => ({ ...prev, total: parseFloat(e.target.value) }))}
      />
      <TextField
        label="Status"
        name="status"
        placeholder={status as string}
        value={formData.status}
        onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
      />

      <Button variant="contained" color="primary" onClick={handleSubmit}>Update</Button>
     </div>
    </>
  )
}

