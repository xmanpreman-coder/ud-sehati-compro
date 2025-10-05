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

  return (
    <Card className="group flex flex-col overflow-hidden rounded-lg border transition-all duration-300 hover:shadow-lg">
      <CardHeader className="p-0">
        <div className="aspect-square overflow-hidden">
          <Image
            src={product.image_url || "/placeholder.svg?height=300&width=300"}
            alt={product.name}
            width={300}
            height={300}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col p-3 pt-2">
        <h3 className="font-semibold text-base line-clamp-2">{product.name}</h3>
        <div className="flex-grow" />
        <div className="mt-2 flex items-center justify-between">
          {product.price && product.price > 0 ? (
            <span className="text-base font-bold text-green-600">
              {new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
                minimumFractionDigits: 0,
              }).format(product.price)}
            </span>
          ) : null}
        </div>
        <Button onClick={() => onViewDetails(product)} className="w-full text-xs sm:text-sm mt-2">
          <Eye className="mr-2 h-4 w-4" />
          <span className="hidden sm:inline">{language === "id" ? "Lihat Detail" : "View Details"}</span>
          <span className="sm:hidden">{language === "id" ? "Detail" : "Detail"}</span>
        </Button>
      </CardContent>
    </Card>
  )
}
