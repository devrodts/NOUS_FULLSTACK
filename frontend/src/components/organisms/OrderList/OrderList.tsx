"use client"

import { OrderInterface } from "@/interfaces/order.interface"
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from "@mui/material"
import Link from "next/link"
import useDeviceType from "@/hooks/useDeviceType"
import { mobileMainSyle, desktopMainSyle } from "@/constants/theme/theme_constants"

export default function OrderList({ orders }: { orders: OrderInterface[] }) {
  const isMobile = useDeviceType();

  const handleDelete = async (id: string) => {
    const response = await fetch(`http://localhost:3000/orders/${id}`, {
      method: "DELETE",
    })
    if (response.ok) {
      console.log("Order deleted successfully")
    } else {
      console.error("Failed to delete order")
    }
  }
  return (
    <div  style={isMobile ? mobileMainSyle : desktopMainSyle}>
      <h1 style={isMobile ? { marginTop: "60px" } : {}}>Orders</h1>
      <Button 
              component={Link} 
              href="/orders/new"
              variant="contained" 
              color="primary" 
              style={{ marginBottom: "20px", marginLeft: "10px" }}
      >
        Create New Order
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Order ID</TableCell>
              <TableCell>Total</TableCell>  
              <TableCell>Actions</TableCell>
              {/* <TableCell>Date</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell>${order.total}</TableCell>
                <TableCell>
                  <Button
                    component={Link}
                    href={`/orders/${order.id}/edit`}
                    variant="outlined"
                    size="small"
                    style={{ marginRight: "10px" }}
                  >
                    Edit
                  </Button>
                  <Button variant="outlined" color="secondary" size="small" onClick={() => handleDelete(order.id)}
                  > 
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