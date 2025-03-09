import { DashboardMetricsInterface } from "@/components/molecules/Dashboard/Dashboard";


const DashboardMetrics = ({maxOrderValue, avarageOrderValue, minOrderValue, totalOrders, totalRevenue} : DashboardMetricsInterface) => {
  return <div>
    {maxOrderValue}
    {avarageOrderValue}
    {minOrderValue}
    {totalOrders}
    {totalRevenue}
  </div>;
};

export default DashboardMetrics;

