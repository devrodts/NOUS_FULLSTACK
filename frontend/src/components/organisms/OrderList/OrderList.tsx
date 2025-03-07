"use client"

import { OrderInterface } from "@/interfaces/order.interface"
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from "@mui/material"
import Link from "next/link"
// import { useEffect } from "react";

export default function OrderList({ orders }: { orders: OrderInterface[] }) {

  // useEffect(() => {
  //   // console.log(orders);
  //   // if(orders.length === 0){
  //   //   router.push("/orders/new");
  //   // }
  // }, [orders]);
  return (
    <div>
      <h1>Orders</h1>
      <Button component={Link} href="/orders/new" variant="contained" color="primary" style={{ marginBottom: "20px" }}>
        Create New Order
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Order ID</TableCell>
              <TableCell>Customer</TableCell>
              <TableCell>Total</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order._id}>
                <TableCell>{order._id}</TableCell>
                <TableCell>${order.total.toFixed(2)}</TableCell>
                <TableCell>{order.products.map((product) => product.name).join(", ")}</TableCell>
                <TableCell>
                  <Button
                    component={Link}
                    href={`/orders/${order._id}/edit`}
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