import type React from "react"
import type { Metadata } from "next"
import Link from "next/link"
import { ThemeToggle } from "@/components/themeToggle"
import { MenuBar } from "@/components/menuBar"
import FooterSection  from "@/components/FooterSection"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

export const metadata: Metadata = {
  title: "Target Customization - Firefly OS",
  description: "Configure compilation settings for your target architecture",
}

export default function CustomizeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 w-full border-b bg-white/80 dark:bg-background/80 backdrop-blur-sm">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 min-h-screen  pl-8">
            <Link href="/" className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-full bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500"></div>
              <span className="inline-block font-bold">FireflyOS</span>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <MenuBar />
            <ThemeToggle />
            <div className="hidden sm:block">
              <Button asChild size="sm" className="bg-gradient-to-r from-orange-500 to-amber-500">
                <Link href="#download">
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <FooterSection />
    </div>
  )
}
