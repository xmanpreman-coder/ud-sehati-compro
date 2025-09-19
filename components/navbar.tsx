"use client"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useSettings } from "@/hooks/use-settings"
import { useLanguage } from "@/hooks/use-language"
import { LanguageSwitcher } from "./language-switcher"
import { ThemeToggle } from "./theme-toggle"
import { Menu, ChevronDown, ShoppingCart, Loader2, AlertCircle } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useState, useRef, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import type { OnlineShop } from "@/lib/types"
import useSWR from "swr"

const fetcher = async () => {
  const supabase = createClient()
  const { data, error } = await supabase
    .from("online_shops")
    .select("*")
    .eq("active", true)
    .order("sort_order")

  if (error) {
    console.error("Supabase error fetching online shops:", error)
    throw error
  }
  return data as OnlineShop[]
}

export function Navbar() {
  const { getSettingValue } = useSettings()
  const { language } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const { data: onlineShops, error, isLoading } = useSWR("online-shops", fetcher)

  const companyName = getSettingValue("company_name", language, "Company")
  const companyLogo = getSettingValue("company_logo", language, "/placeholder.svg?height=40&width=120")

  const navItems = [
    { href: "/", label: language === "id" ? "Beranda" : "Home" },
    { href: "/about", label: language === "id" ? "Tentang Kami" : "About Us" },
    { href: "/products", label: language === "id" ? "Katalog Produk" : "Products" },
    { href: "/contact", label: language === "id" ? "Kontak Kami" : "Contact" },
    { href: "/careers", label: language === "id" ? "Karir" : "Careers" },
  ]

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [dropdownRef])

  const renderOnlineShops = (isMobile = false) => {
    if (isLoading) {
      return (
        <div className="flex items-center space-x-2 justify-center p-2">
          <Loader2 className="h-4 w-4 animate-spin" />
          <span>{language === 'id' ? 'Memuat...' : 'Loading...'}</span>
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex items-center space-x-2 justify-center p-2 text-destructive">
          <AlertCircle className="h-4 w-4" />
          <span>{language === 'id' ? 'Gagal memuat' : 'Failed to load'}</span>
        </div>
      );
    }

    if (!onlineShops || onlineShops.length === 0) {
      return (
        <div className="p-2 text-center text-muted-foreground">
          {language === 'id' ? 'Toko tidak tersedia' : 'No shops available'}
        </div>
      );
    }

    return onlineShops.map((shop) => (
      <a
        key={shop.id}
        href={shop.url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center space-x-2 text-sm text-foreground hover:bg-muted px-4 py-2"
        onClick={() => {
          setIsOpen(false)
          setIsDropdownOpen(false)
        }}
      >
        {shop.image_url ? (
          <Image
            src={shop.image_url}
            alt={`${shop.name} logo`}
            width={16}
            height={16}
            className="h-4 w-4 object-contain"
          />
        ) : (
          <ShoppingCart className="h-4 w-4" />
        )}
        <span>{shop.name}</span>
      </a>
    ));
  }

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src={companyLogo || "/placeholder.svg"}
              alt={companyName}
              width={40}
              height={40}
              className="h-8 w-8"
            />
            <span className="text-xl font-bold text-primary">{companyName}</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.slice(0, 3).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                {item.label}
              </Link>
            ))}
            
            {/* Online Shop Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button 
                onClick={toggleDropdown} 
                className="flex items-center text-sm font-medium transition-colors hover:text-primary"
              >
                {language === "id" ? "Toko Online" : "Online Shop"} 
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              {isDropdownOpen && (
                <div className="absolute top-full mt-2 w-48 bg-background border rounded-md shadow-lg py-1 z-20">
                  {renderOnlineShops()}
                  {onlineShops && onlineShops.length > 0 && <div className="border-t my-1" />}
                  <Link 
                    href="/online-shop" 
                    className="block px-4 py-2 text-sm text-foreground hover:bg-muted" 
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    {language === "id" ? "Semua Toko Online" : "All Online Shops"}
                  </Link>
                </div>
              )}
            </div>
            
            {navItems.slice(3).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Theme & Language Controls */}
          <div className="flex items-center space-x-2">
            <ThemeToggle />
            <LanguageSwitcher />

            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="sm">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col space-y-4 mt-8">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-lg font-medium transition-colors hover:text-primary"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
                
                {/* Mobile Online Shop Section */}
                <div className="pt-4 border-t">
                  <h3 className="text-lg font-medium mb-3">
                    {language === "id" ? "Toko Online" : "Online Shop"}
                  </h3>
                  <div className="space-y-2">
                    {renderOnlineShops(true)}
                    <Link 
                      href="/online-shop" 
                      className="text-muted-foreground hover:text-primary" 
                      onClick={() => setIsOpen(false)}
                    >
                      {language === "id" ? "Semua Toko Online" : "All Online Shops"}
                    </Link>
                  </div>
                </div>
              </div>
            </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  )
}