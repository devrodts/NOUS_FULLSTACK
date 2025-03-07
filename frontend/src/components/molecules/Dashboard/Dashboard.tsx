"use client"
import { Grid, Paper, Typography } from "@mui/material"
import useDeviceType from "@/hooks/useDeviceType"
import { mobileMainSyle, desktopMainSyle } from "@/constants/theme/theme_constants"
export default function Dashboard() {
  
  const kpis = [
    { title: "Total Orders", value: "1,234" },
    { title: "Average Order Value", value: "$89.99" },
    { title: "Total Revenue", value: "$111,054.66" },
  ]

  const isMobile = useDeviceType();

  return (
    <section style={isMobile ? mobileMainSyle : desktopMainSyle}>
      <h1 style={isMobile ? { marginTop: "60px" } : {}}>Dashboard</h1>
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
      </section>
  )
}

