"use client"

import { Button } from "@/components/ui/button"
import { ProductCard } from "@/components/product-card"
import { ProductModal } from "@/components/product-modal"
import { createClient } from "@/lib/supabase/client"
import type { Product } from "@/lib/types"
import { useLanguage } from "@/hooks/use-language"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import useSWR from "swr"

const fetcher = async () => {
  const supabase = createClient()
  const { data, error } = await supabase
    .from("products")
    .select(`
      *,
      category:categories(*)
    `)
    .eq("active", true)
    .order("created_at", { ascending: false })
    .limit(3)

  if (error) throw error
  return data as Product[]
}

export function FeaturedProducts() {
  const { language } = useLanguage()
  const { data: products, isLoading } = useSWR("featured_products", fetcher)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  if (isLoading) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {language === "id" ? "Produk Unggulan" : "Featured Products"}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-96 bg-muted animate-pulse rounded-lg" />
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (!products || products.length === 0) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {language === "id" ? "Produk Unggulan" : "Featured Products"}
            </h2>
            <p className="text-muted-foreground">
              {language === "id" ? "Belum ada produk tersedia" : "No products available"}
            </p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <>
      <section className="py-16 bg-muted/30 dark:bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance text-foreground dark:text-foreground">
              {language === "id" ? "Produk Unggulan" : "Featured Products"}
            </h2>
            <p className="text-lg text-muted-foreground dark:text-muted-foreground max-w-2xl mx-auto text-balance">
              {language === "id"
                ? "Temukan produk dan layanan terbaik kami yang telah dipercaya oleh ribuan pelanggan"
                : "Discover our best products and services trusted by thousands of customers"}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} onViewDetails={setSelectedProduct} />
            ))}
          </div>

          <div className="text-center">
            <Button asChild size="lg">
              <Link href="/products">
                {language === "id" ? "Lihat Semua Produk" : "View All Products"}
                <ArrowRight className="h-5 w-5 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <ProductModal product={selectedProduct} isOpen={!!selectedProduct} onClose={() => setSelectedProduct(null)} />
    </>
  )
}
