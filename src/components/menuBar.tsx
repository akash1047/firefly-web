"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

const menuItems = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Features",
    href: "/#features",
  },
  {
    label: "About",
    href: "/#about",
  },
  {
    label: "Advanced",
    href: "/#advanced-features",
  },
  {
    label: "Customize",
    href: "/customize",
  },
]

export function MenuBar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const toggleMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  return (
    <>
      {/* Desktop Menu */}
      <div className="hidden md:flex items-center space-x-1">
        {menuItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="px-3 py-2 text-sm font-medium hover:text-amber-500 transition-colors"
          >
            {item.label}
          </Link>
        ))}
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleMenu}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="absolute top-16 left-0 right-0 bg-white dark:bg-card border-b z-50">
            <div className="container py-4">
              {menuItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="block py-2 hover:text-amber-500 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  )
}

