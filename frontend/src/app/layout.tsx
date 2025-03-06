import type * as React from "react"
import ThemeRegistry from "@/components/ThemeRegistry/ThemeRegistry"
import Sidebar from "@/components/Sidebar/Sidebar"
import { ProductProvider } from "@/context/ProductContext/ProductContext"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ProductProvider>
        <ThemeRegistry>
          <div style={{ display: "flex" }}>
            <Sidebar />
            <main style={{ flexGrow: 1, padding: "20px" }}>{children}</main>
          </div>
        </ThemeRegistry>
        </ProductProvider>
      </body>
    </html>
  )
}

