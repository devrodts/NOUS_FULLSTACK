import { Grid, Paper, Typography } from "@mui/material"

export default function Dashboard() {
  
  const kpis = [
    { title: "Total Orders", value: "1,234" },
    { title: "Average Order Value", value: "$89.99" },
    { title: "Total Revenue", value: "$111,054.66" },
  ]

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Grid container spacing={3}>
        {kpis.map((kpi) => (
          <Grid item xs={12} sm={4} key={kpi.title}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                height: 140,
              }}
            >
              <Typography component="h2" variant="h6" color="primary" gutterBottom>
                {kpi.title}
              </Typography>
              <Typography component="p" variant="h4">
                {kpi.value}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </div>
  )
}

