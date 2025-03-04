import { Drawer, List, ListItem, ListItemIcon, ListItemText } from "@mui/material"
import { Inventory, Category, ShoppingCart, Dashboard } from "@mui/icons-material"
import Link from "next/link"

const drawerWidth = 240

const menuItems = [
  { text: "Dashboard", icon: <Dashboard />, path: "/" },
  { text: "Products", icon: <Inventory />, path: "/products" },
  { text: "Categories", icon: <Category />, path: "/categories" },
  { text: "Orders", icon: <ShoppingCart />, path: "/orders" },
]

export default function Sidebar() {
  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} component={Link} href={item.path}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  )
}

