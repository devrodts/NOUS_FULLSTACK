import type * as React from "react"
import ThemeRegistry from "@/components/templates/ThemeRegistry/ThemeRegistry"
import Sidebar from "@/components/organisms/Sidebar/Sidebar"
import { ProductProvider } from "@/context/ProductContext/ProductContext"

export default function RootLayout({ children }: { children: React.ReactNode }) {

 

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

