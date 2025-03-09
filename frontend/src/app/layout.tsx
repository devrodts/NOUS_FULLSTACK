import type * as React from "react"
import ThemeRegistry from "@/components/templates/ThemeRegistry/ThemeRegistry"
import Sidebar from "@/components/organisms/Sidebar/Sidebar"
import { ProductProvider } from "@/context/ProductContext/ProductContext"
import { OrderProvider } from "@/context/OrdersContext/OrderContext"
export default function RootLayout({ children }: { children: React.ReactNode }) {

 

  return (
    <html lang="en">
      <body>
          <ProductProvider>
              <OrderProvider>
                <ThemeRegistry>
                    <Sidebar />
                    {children}
                </ThemeRegistry>
              </OrderProvider>
          </ProductProvider>
      </body>
    </html>
  )
}

