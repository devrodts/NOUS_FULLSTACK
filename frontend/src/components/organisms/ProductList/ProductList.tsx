"use client"
import { ProductInterface } from "@/interfaces/product"
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Box, TextField, Divider } from "@mui/material"
import Link from "next/link"
import AddModal from "../../molecules/AddModal/AddModal"
import { useEffect, useState } from "react"
import FileUploadButton from "../../atoms/FileUploadButton/FileUploadButton"
import { getProducts } from "@/app/lib/api/products/get-products"
import deleteProductById from "@/context/ProductContext/delete-product-by-id"
import { useProductContext } from "@/context/ProductContext/ProductContext"
import LinearLoading from "../../atoms/LinearLoading/LinearLoading"
import ClearIcon from '@mui/icons-material/Clear';
import useDeviceType from '@/hooks/useDeviceType';
import Image from "next/image"
import SearchInput from "../../atoms/SearchInput/SearchInput"
import { desktopModalStyles, mobileModalStyles, searchInputStyle } from "@/constants/theme/theme_constants"
export default function ProductList({ products }: { products: ProductInterface[] }) {

    const { state, dispatch } = useProductContext();
    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)
    

    // const handleImageUpload = async(event: React.ChangeEvent<HTMLInputElement>) => {
    //   const file = event.target.files?.[0]
    //   if(file){
    //     const formData = new FormData()
    //     formData.append("image", file)
    //   }
    // }
    

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

    const handleDelete = async (id: string) => {
      await deleteProductById(id, dispatch);
    };

    const isMobile = useDeviceType();


    const titleMobileStyles: React.CSSProperties = {
      marginTop: "70px",
    
    }
  return (
    <>
      {state.loading && <>
        <LinearLoading/>
      </>}
    {!state.loading && <>
      <div>
        
      <h1 style={isMobile ? titleMobileStyles : {}}>Products</h1>
      <Button
        onClick={handleOpen}
        variant="contained"
        color="primary"
        style={{ marginBottom: "20px" }}    
      >
        Add New Product
      </Button>
      <SearchInput 
        placeholder="Search" 
      />
      <Divider style={{ marginBottom: "40px" }} />
      <AddModal 
        open={open} 
        onClose={handleClose} 
        onOpen={handleOpen}
      >
        <form onSubmit={handleSubmit}>
            <div 
                style={isMobile ? mobileModalStyles : desktopModalStyles}
            >
              <Box display="flex" flexDirection="column" gap={2} sx={{marginBottom:"2vh"}}>
              <div style={{position:"relative", display:"flex", justifyContent:"flex-end", cursor:"pointer"}}>
                  <ClearIcon onClick={handleClose} />
              </div>
              <TextField name="name" label="Name" />
              <TextField name="price" label="Price" />
              <TextField name="description" label="Description" />
              <TextField name="image" label="Image" />
              </Box>
              <Box display="flex" flexDirection="column" gap={2}>

              <FileUploadButton label="Upload Image" />

              <Button type="submit" variant="contained" color="primary">
                Add Product
              </Button>
              </Box>
            </div>
        </form>
      </AddModal>
      <TableContainer component={Paper} sx={{ marginTop: "20px" }}>
        <Table>
          <TableHead>
            <TableRow>
            <TableCell>Image</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  {product.imageUrl && <Image src={product.imageUrl} alt={product.name} width={100} height={100} />}
                </TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>${product.price.toFixed(2)}</TableCell>
                <TableCell>{product.description}</TableCell>
                <TableCell>
                  <Box display="flex" gap={2} sx={{flexDirection: isMobile ? "column" : "row"}}>
                  <Button
                    component={Link}
                    href={`/products/${product.id}/edit`}
                    variant="outlined"
                    size="small"
                    style={{ marginRight: "10px" }}
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleDelete(product.id)}
                    variant="outlined" color="secondary" size="small">
                    Delete
                  </Button>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
    </>}
    </>
  )
}

