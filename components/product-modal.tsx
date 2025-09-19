"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import type { Product } from "@/lib/types"
import { useLanguage } from "@/hooks/use-language"
import { MessageCircle, ShoppingCart } from "lucide-react"
import Image from "next/image"
import { useSettings } from "@/hooks/use-settings"

interface ProductModalProps {
  product: Product | null
  isOpen: boolean
  onClose: () => void
}

export function ProductModal({ product, isOpen, onClose }: ProductModalProps) {
  const { language } = useLanguage()
  const { getSettingValue } = useSettings()

  if (!product) return null

  const formatPrice = (price?: number) => {
    if (!price) return language === "id" ? "Hubungi Kami" : "Contact Us"
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price)
  }

  const handleWhatsAppContact = () => {
    const whatsappNumber = getSettingValue("whatsapp_number", language, "6281234567890")
    const message = language === "id" 
      ? `Halo, saya tertarik dengan produk ${product.name}. Apakah masih tersedia?`
      : `Hello, I'm interested in the product ${product.name}. Is it still available?`
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-full max-w-3xl md:max-w-5xl lg:max-w-6xl max-h-[90vh] overflow-y-auto p-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          {/* Product Image */}
          <div className="aspect-square overflow-hidden">
            <Image
              src={product.image_url || "/placeholder.svg?height=600&width=600"}
              alt={product.name}
              width={600}
              height={600}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Product Details */}
          <div className="p-8 space-y-8">
            {/* Category Badge */}
            {product.category && (
              <Badge variant="secondary" className="w-fit bg-orange-100 text-orange-800">
                {product.category.name}
              </Badge>
            )}

            {/* Product Title */}
            <DialogTitle className="text-3xl font-bold">{product.name}</DialogTitle>

            {/* Description */}
            <p className="text-muted-foreground leading-relaxed text-lg">
              {product.description || "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore e."}
            </p>

            {/* Price */}
            <div className="text-4xl font-bold text-green-600">{formatPrice(product.price)}</div>

            {/* Action Buttons */}
            <div className="space-y-6">
              {/* WhatsApp Contact Button */}
              <Button
                size="lg"
                className="w-full bg-green-600 hover:bg-green-700 text-white text-lg py-6 whitespace-nowrap"
                onClick={handleWhatsAppContact}
              >
                <MessageCircle className="h-6 w-6 mr-3 flex-shrink-0" />
                <span className="truncate">{language === "id" ? "Hubungi untuk Pemesanan" : "Contact for Order"}</span>
              </Button>

              {/* Online Shop Button */}
              <Button
                size="lg"
                variant="outline"
                className="w-full bg-amber-600 hover:bg-amber-700 text-white border-amber-600 text-lg py-6 whitespace-nowrap"
                onClick={() => window.open("/online-shop", "_blank")}
              >
                <ShoppingCart className="h-6 w-6 mr-3 flex-shrink-0" />
                <span className="truncate">{language === "id" ? "Beli di Toko Online" : "Buy at Online Shop"}</span>
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
