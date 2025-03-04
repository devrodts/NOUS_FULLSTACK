"use client"
import { ProductInterface } from "@/app/interfaces/product"
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Typography, Box, TextField } from "@mui/material"
import Link from "next/link"
import AddModal from "../AddModal/AddModal"
import { useEffect, useState } from "react"
import FileUploadButton from "../atoms/FileUploadButton/FileUploadButton"
import { getProducts } from "@/app/lib/api/products/get-products"


export default function ProductList({ products }: { products: ProductInterface[] }) {

    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    const handleSubmit = async(event: React.FormEvent<HTMLFormElement>) => {
      
      event.preventDefault()
      const formData = new FormData(event.target as HTMLFormElement)
      const product = Object.fromEntries(formData)
      console.log(product)
    }

    useEffect(() => {
      (async () => {
        const response = await getProducts()
        return response;
      })();
    },[products])

  return (
    <div>
      <h1>Products</h1>
      <Button
        onClick={handleOpen}
        variant="contained"
        color="primary"
        style={{ marginBottom: "20px" }}    
      >
        Add New Product
      </Button>
      <AddModal open={open} onClose={handleClose} onOpen={handleOpen}>
        <form onSubmit={handleSubmit}>

            <Box 
                display="flex" 
                flexDirection="column" 
                gap={2}
                sx={{
                  width: "50vw",
                  maxWidth: "500px",
                  margin: "0 auto",
                  backgroundColor: "white",
                  border:"none",
                  padding: "20px",
                  borderRadius: "10px",
                  boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.1)",
                  marginTop: "10vh",
                }}
            >
              <TextField name="name" label="Name" />
              <TextField name="price" label="Price" />
              <TextField name="description" label="Description" />
              <TextField name="image" label="Image" />
              <FileUploadButton label="Upload Image" />

              <Button type="submit" variant="contained" color="primary">
                Add Product
              </Button>
            </Box>
        </form>
      </AddModal>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product._id}>
                <TableCell>{product.name}</TableCell>
                <TableCell>${product.price.toFixed(2)}</TableCell>
                <TableCell>{product.description}</TableCell>
                <TableCell>
                  <Button
                    component={Link}
                    href={`/products/${product._id}/edit`}
                    variant="outlined"
                    size="small"
                    style={{ marginRight: "10px" }}
                  >
                    Edit
                  </Button>
                  <Button variant="outlined" color="secondary" size="small">
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

