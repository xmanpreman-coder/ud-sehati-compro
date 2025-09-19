"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import type { Product } from "@/lib/types"
import { useLanguage } from "@/hooks/use-language"
import { Eye, ShoppingCart } from "lucide-react"
import Image from "next/image"

interface ProductCardProps {
  product: Product
  onViewDetails: (product: Product) => void
}

export function ProductCard({ product, onViewDetails }: ProductCardProps) {
  const { language } = useLanguage()

  const formatPrice = (price?: number) => {
    if (!price) return language === "id" ? "Hubungi Kami" : "Contact Us"
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price)
  }

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
      <CardHeader className="p-0">
        <div className="aspect-square overflow-hidden">
          <Image
            src={product.image_url || "/placeholder.svg?height=300&width=300"}
            alt={product.name}
            width={300}
            height={300}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-3 line-clamp-2">{product.name}</h3>
        <div className="flex items-center justify-between mb-4">
          <span className="text-xl font-bold text-green-600">{formatPrice(product.price)}</span>
        </div>
        <Button onClick={() => onViewDetails(product)} className="w-full text-sm sm:text-base">
          <Eye className="h-4 w-4 mr-2" />
          <span className="hidden sm:inline">{language === "id" ? "Lihat Detail" : "View Details"}</span>
          <span className="sm:hidden">{language === "id" ? "Detail" : "Detail"}</span>
        </Button>
      </CardContent>
    </Card>
  )
}
