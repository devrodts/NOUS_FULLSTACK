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
  name: string,
 }
const { id, name } = useParams()

const isMobile = useDeviceType();
const router = useRouter();
const [formData, setFormData] = useState<formData>({
  id: "",
  name: "",
})

useEffect(() => {
  (async () => {
    const response = await fetch(`http://localhost:3000/categories/${id}`)
    console.log(response)
    const data = await response.json()
    setFormData({
     id: data.id,
     name: data.name,
    })
  })()  
}, [id])

const handleSubmit = async () => {
  try {
    const response = await fetch(`http://localhost:3000/categories/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    })

    const data = await response.json()
    if(response.ok){  
      console.log(data)
      router.push(`/categories/`)
    } else {
      console.error(data)
    }
  } catch (error) {
    console.error(error)
  }
}

  
  return(
    <>
      <h1 style={isMobile ? { marginTop: "60px", marginLeft: "15px" } : {}}>Editar Categoria</h1>
     <div style={isMobile ? {
      ...mobileMainSyle,
      display: "flex",
      flexDirection: "column",
      gap: "20px"
     } : desktopMainSyle}>
     <TextField
        label="Id da categoria"
        name="id"
        placeholder={id as string}
        value={formData.id}
        onChange={(e) => setFormData(prev => ({ ...prev, id: e.target.value }))}
      />
      <TextField
        label="Nome da categoria"
        name="name"
        placeholder={name as string}
        value={formData.name}
        type="text"
        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
      />
      <Button variant="contained" color="primary" onClick={handleSubmit}>Update</Button>
     </div>
    </>
  )
}

