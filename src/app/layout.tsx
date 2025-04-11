import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import ThemeProvider from "@/components/themeProvider"

// Configure Inter font with more robust options
const inter = Inter({ 
  subsets: ["latin"],
  display: "swap",
  fallback: ["system-ui", "Arial", "sans-serif"],
  preload: true,
  variable: "--font-inter",
})

export const metadata = {
  title: "FireflyOS - The Future of Computing",
  description: "A beautiful, fast, and secure operating system designed for modern computing needs.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}