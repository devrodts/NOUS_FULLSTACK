import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from "@mui/material"
import Link from "next/link"
import { CategoryInterface } from "@/app/interfaces/category"
export default function CategoryList({ categories }: { categories: CategoryInterface[] }) {
  return (
    <div>
      <h1>Categories</h1>
      <Button
        component={Link}
        href="/categories/new"
        variant="contained"
        color="primary"
        style={{ marginBottom: "20px" }}
      >
        Add New Category
      </Button>
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

