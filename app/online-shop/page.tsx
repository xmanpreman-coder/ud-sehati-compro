"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { createClient } from "@/lib/supabase/client"
import type { OnlineShop } from "@/lib/types"
import { useLanguage } from "@/hooks/use-language"
import { ExternalLink, ShoppingCart, ArrowLeft } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import useSWR from "swr"

const fetcher = async () => {
  const supabase = createClient()
  const { data, error } = await supabase
    .from("online_shops")
    .select("*")
    .eq("active", true)
    .order("sort_order")

  if (error) throw error
  return data as OnlineShop[]
}

export default function OnlineShopPage() {
  const { language } = useLanguage()
  const { data: onlineShops, isLoading, error } = useSWR("online-shops", fetcher)

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="h-8 w-48 bg-muted animate-pulse rounded mb-4" />
          <div className="h-4 w-96 bg-muted animate-pulse rounded" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-64 bg-muted animate-pulse rounded-lg" />
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold mb-4">
            {language === "id" ? "Gagal Memuat Toko Online" : "Failed to Load Online Shops"}
          </h1>
          <p className="text-muted-foreground mb-6">
            {language === "id" 
              ? "Terjadi kesalahan saat memuat daftar toko online. Silakan coba lagi." 
              : "An error occurred while loading online shops. Please try again."}
          </p>
          <Button onClick={() => window.location.reload()}>
            {language === "id" ? "Coba Lagi" : "Try Again"}
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              {language === "id" ? "Kembali" : "Back"}
            </Link>
          </Button>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          {language === "id" ? "Semua Toko Online" : "All Online Shops"}
        </h1>
        <p className="text-lg text-muted-foreground">
          {language === "id"
            ? "Temukan produk kami di berbagai platform e-commerce terpercaya"
            : "Find our products on various trusted e-commerce platforms"}
        </p>
      </div>

      {/* Online Shops Grid */}
      {!onlineShops || onlineShops.length === 0 ? (
        <div className="text-center py-12">
          <ShoppingCart className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
          <h2 className="text-2xl font-bold mb-4">
            {language === "id" ? "Belum Ada Toko Online" : "No Online Shops Available"}
          </h2>
          <p className="text-muted-foreground">
            {language === "id" 
              ? "Toko online akan segera hadir. Pantau terus untuk update terbaru!" 
              : "Online shops will be available soon. Stay tuned for updates!"}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {onlineShops.map((shop) => (
            <Card key={shop.id} className="group hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 h-30 w-30 rounded-lg bg-muted flex items-center justify-center">
                  {shop.image_url ? (
                    <Image
                      src={shop.image_url}
                      alt={`${shop.name} logo`}
                      width={64}
                      height={64}
                      className="max-h-full max-w-full object-contain"
                    />
                  ) : (
                    <ShoppingCart className="h-8 w-8 text-muted-foreground" />
                  )}
                </div>
                <CardTitle className="text-xl">{shop.name}</CardTitle>
                <CardDescription>
                  {language === "id" ? "Klik untuk mengunjungi toko" : "Click to visit the shop"}
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <Button asChild className="w-full group-hover:bg-primary group-hover:text-primary-foreground">
                  <a
                    href={shop.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center"
                  >
                    {language === "id" ? "Kunjungi Toko" : "Visit Shop"}
                    <ExternalLink className="h-4 w-4 ml-2" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Call to Action */}
      <div className="mt-16 text-center bg-muted/30 rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-4">
          {language === "id" ? "Tidak Menemukan Yang Anda Cari?" : "Can't Find What You're Looking For?"}
        </h2>
        <p className="text-muted-foreground mb-6">
          {language === "id"
            ? "Hubungi kami langsung untuk informasi produk dan layanan terbaru"
            : "Contact us directly for the latest product and service information"}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg">
            <Link href="/contact">
              {language === "id" ? "Hubungi Kami" : "Contact Us"}
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/products">
              {language === "id" ? "Lihat Katalog Produk" : "View Product Catalog"}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}