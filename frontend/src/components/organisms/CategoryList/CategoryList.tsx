import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Divider } from "@mui/material"
import Link from "next/link"
import { CategoryInterface } from "@/interfaces/category.interface"
import useDeviceType from "@/hooks/useDeviceType"
import SearchInput from "@/components/atoms/SearchInput/SearchInput";

export default function CategoryList({ categories }: { categories: CategoryInterface[] }) {
  const isMobile = useDeviceType();


  return (
    <div>
      <h1 style={isMobile ? { marginTop: "60px" } : {}}>Categories</h1>
      <Button
        component={Link}
        href="/categories/new"
        variant="contained"
        color="primary"
        style={{ marginBottom: "30px" }}
      >
        Add New Category
      </Button>

      <SearchInput placeholder="Search your category..." />
      <Divider style={{ marginBottom: "40px" }} />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.map((category) => (
              <TableRow key={category._id}>
                <TableCell>{category.name}</TableCell>
                <TableCell>
                  <Button
                    component={Link}
                    href={`/categories/${category._id}`}
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

