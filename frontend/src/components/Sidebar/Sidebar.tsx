"use client";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
} from "@mui/material";
import { Inventory, Category, ShoppingCart, Dashboard, Menu } from "@mui/icons-material";
import Link from "next/link";
import { useEffect, useState } from "react";
import MenuIcon from '@mui/icons-material/Menu';

const drawerWidth = 240;

const menuItems = [
  { text: "Dashboard", icon: <Dashboard />, path: "/" },
  { text: "Products", icon: <Inventory />, path: "/products" },
  { text: "Categories", icon: <Category />, path: "/categories" },
  { text: "Orders", icon: <ShoppingCart />, path: "/orders" },
];

export default function Sidebar() {
  const [isMobile, setIsMobile] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {

    const handleResize = () => {
      if (window.innerWidth <= 900) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
        setIsOpen(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {/* Menu Permanente para Desktop */}
      {!isMobile && (
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
      )}

      {/* Menu Toggle para Mobile */}
      {isMobile && (
        <>
          <IconButton
            onClick={toggleDrawer}
            sx={{
              position: "absolute",
              top: 0,
              left: 10,
              zIndex: 2,
            }}
          >
            <MenuIcon color="primary" fontSize="large"/>
          </IconButton>

          <Drawer
            sx={{
              "& .MuiDrawer-paper": {
                width: drawerWidth,
                boxSizing: "border-box",
              },
            }}
            variant="temporary"
            anchor="left"
            open={isOpen}
            onClose={toggleDrawer}
          >
            <List>
              {menuItems.map((item) => (
                <ListItem
                  key={item.text}
                  component={Link}
                  href={item.path}
                  onClick={toggleDrawer} // Fecha o menu após clicar
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItem>
              ))}
            </List>
          </Drawer>
        </>
      )}
    </>
  );
}
