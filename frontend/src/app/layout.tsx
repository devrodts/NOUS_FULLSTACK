"use client"
import type * as React from "react"
import ThemeRegistry from "@/components/ThemeRegistry/ThemeRegistry"
import Sidebar from "@/components/Sidebar/Sidebar"
import { ProductProvider } from "@/context/ProductContext/ProductContext"
import { useEffect } from "react"
import { useState } from "react"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 900)
    }
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  },[])

  const mobileMainSyle: React.CSSProperties = {
    maxWidth:"95vw",
    margin:"20px auto",
    paddingLeft: "10px",
    paddingRight: "10px",
  }

  const desktopMainSyle: React.CSSProperties = {  
    width:"80vw",
    margin: "20px auto"
  }
  
  return (
    <html lang="en">
      <body>
        <ProductProvider>
        <ThemeRegistry>
          <div style={{ display: "flex" }}>
            <Sidebar />
            <main style={isMobile ? mobileMainSyle : desktopMainSyle}>{children}</main>
          </div>
        </ThemeRegistry>
        </ProductProvider>
      </body>
    </html>
  )
}

