"use client"

import type React from "react"
import { useState } from "react"
import { TextField, Button, Box } from "@mui/material"

interface ProductFilterProps {
  onFilter: (searchTerm: string) => void
}

export default function ProductFilter({ onFilter }: ProductFilterProps) {
  const [searchTerm, setSearchTerm] = useState("")

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    onFilter(searchTerm)
  }

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mb: 2, display: "flex", gap: 2 }}>
      <TextField
        fullWidth
        variant="outlined"
        size="small"
        label="Search products"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        InputProps={{
          "aria-label": "Search products",
        }}
      />
      <Button type="submit" variant="contained" color="primary">
        Filter
      </Button>
    </Box>
  )
}

