"use client"
import useDeviceType from "@/hooks/useDeviceType"
import { mobileMainSyle, desktopMainSyle } from "@/constants/theme/theme_constants"
import DashboardMetrics from "@/components/organisms/DashboardMetrics/DashboardMetrics";

export interface DashboardMetricsInterface{
  totalOrders: number;
  totalRevenue: number;
  avarageOrderValue: number;
  minOrderValue: number;
  maxOrderValue: number;
}

export default function Dashboard() {
  const isMobile = useDeviceType();

  return (
   <>
    <section style={isMobile ? mobileMainSyle : desktopMainSyle}>
      <h1 style={isMobile ? { marginTop: "60px" } : {}}>Dashboard</h1>
        <DashboardMetrics maxOrderValue={100} avarageOrderValue={100} minOrderValue={100} totalOrders={100} totalRevenue={100} />
    </section>
   </>
  )
}

