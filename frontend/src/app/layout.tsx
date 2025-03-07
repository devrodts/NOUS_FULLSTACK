"use client"
import type * as React from "react"
import ThemeRegistry from "@/components/templates/ThemeRegistry/ThemeRegistry"
import Sidebar from "@/components/organisms/Sidebar/Sidebar"
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

 

  return (
    <html lang="en">
      <body>
        <ProductProvider>
        <ThemeRegistry>
            <Sidebar />
            {children}
        </ThemeRegistry>
        </ProductProvider>
      </body>
    </html>
  )
}

