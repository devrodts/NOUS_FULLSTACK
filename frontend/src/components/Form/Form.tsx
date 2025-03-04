import * as React from "react"
import { TextField, Button, Grid } from "@mui/material"

interface FormField {
  name: string
  label: string
  type: string
}

interface FormProps {
  fields: FormField[]
  onSubmit: (data: Record<string, string>) => void
}
export default function Form({ fields, onSubmit }: FormProps) {
  const [formData, setFormData] = React.useState<{ [key: string]: string }>({})

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    })
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        {fields.map((field) => (
          <Grid item xs={12} key={field.name}>
            <TextField
              fullWidth
              name={field.name}
              label={field.label}
              type={field.type}
              value={formData[field.name] || ""}
              onChange={handleChange}
            />
          </Grid>
        ))}
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </Grid>
      </Grid>
    </form>
  )
}

