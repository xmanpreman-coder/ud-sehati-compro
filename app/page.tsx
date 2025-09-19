"use client"

import { BannerCarousel } from "@/components/banner-carousel"
import { FeaturedProducts } from "@/components/featured-products"
import { Suspense } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { createClient } from "@/lib/supabase/client"
import type { CompanyValue } from "@/lib/types"
import { useLanguage } from "@/hooks/use-language"
import { Target, Eye, Heart, Award, Handshake, Lightbulb, Users, Star, Zap } from "lucide-react"
import useSWR from "swr"

const valuesFetcher = async () => {
  const supabase = createClient()
  const { data, error } = await supabase
    .from("company_values")
    .select("*")
    .eq("active", true)
    .order("sort_order")

  if (error) {
    console.error("Error fetching company values:", error)
    throw error
  }
  return data as CompanyValue[]
}

// Helper to map icon string to component
const getIconComponent = (iconName?: string) => {
  switch (iconName) {
    case "award":
      return Award
    case "handshake":
      return Handshake
    case "lightbulb":
      return Lightbulb
    case "heart":
      return Heart
    case "users":
      return Users
    case "star":
      return Star
    case "zap":
      return Zap
    case "target":
      return Target
    case "eye":
      return Eye
    default:
      return Heart // A default icon
  }
}

export default function HomePage() {
  const { language } = useLanguage()
  const { data: valuesData, isLoading, error } = useSWR("company-values", valuesFetcher)

  const getValuesForLanguage = () => {
    if (!valuesData) {
      return []
    }
    return valuesData.filter((value) => value.language === language)
  }

  const values = getValuesForLanguage()

  // Fallback data if no database values
  const fallbackValues = language === "id" ? [
    {
      id: "fallback-1",
      title: "Kualitas Terbaik",
      description: "Kami berkomitmen untuk menghasilkan produk berkualitas tinggi dengan bahan baku lokal terbaik.",
      icon: "award"
    },
    {
      id: "fallback-2",
      title: "Kemitraan Berkelanjutan",
      description: "Membangun kemitraan yang adil dan berkelanjutan dengan petani dan pengrajin lokal.",
      icon: "handshake"
    },
    {
      id: "fallback-3",
      title: "Inovasi Tradisional",
      description: "Melestarikan resep dan teknik tradisional dengan sentuhan inovasi modern.",
      icon: "lightbulb"
    },
    {
      id: "fallback-4",
      title: "Pengalaman Pelanggan",
      description: "Memberikan pengalaman pelanggan yang tak terlupakan dalam setiap interaksi.",
      icon: "heart"
    }
  ] : [
    {
      id: "fallback-1",
      title: "Best Quality",
      description: "We are committed to producing high-quality products with the best local raw materials.",
      icon: "award"
    },
    {
      id: "fallback-2",
      title: "Sustainable Partnership",
      description: "Building fair and sustainable partnerships with local farmers and craftsmen.",
      icon: "handshake"
    },
    {
      id: "fallback-3",
      title: "Traditional Innovation",
      description: "Preserving traditional recipes and techniques with modern innovation touches.",
      icon: "lightbulb"
    },
    {
      id: "fallback-4",
      title: "Customer Experience",
      description: "Providing unforgettable customer experiences in every interaction.",
      icon: "heart"
    }
  ]

  const displayValues = !isLoading && (values.length > 0 ? values : fallbackValues)
  return (
    <div className="min-h-screen">
      {/* Hero Banner */}
      <section className="container mx-auto px-4 py-8">
        <Suspense fallback={<div className="h-[500px] bg-muted animate-pulse rounded-lg" />}>
          <BannerCarousel />
        </Suspense>
      </section>

      {/* Company Values Section */}
      {isLoading ? (
        <section className="py-12 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <Card key={i} className="text-center p-6 bg-muted animate-pulse">
                  <div className="flex justify-center mb-4">
                    <div className="h-12 w-12 bg-muted-foreground/20 rounded-full animate-pulse" />
                  </div>
                  <div className="h-5 bg-muted-foreground/20 rounded w-3/4 mx-auto mb-3 animate-pulse" />
                  <div className="h-8 bg-muted-foreground/20 rounded w-full mx-auto animate-pulse" />
                </Card>
              ))}
            </div>
          </div>
        </section>
      ) : (
        <section className="py-12 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">
                {language === "id" ? "Nilai-Nilai Kami" : "Our Values"}
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {language === "id" 
                  ? "Prinsip-prinsip yang menjadi fondasi dalam setiap langkah kami"
                  : "Principles that form the foundation in every step we take"
                }
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {displayValues && displayValues.map((value) => {
                const IconComponent = getIconComponent(value.icon)
                return (
                  <Card key={value.id} className="text-center hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="p-4 bg-primary/10 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                        <IconComponent className="h-8 w-8 text-primary" />
                      </div>
                      <h3 className="text-lg font-semibold mb-3">{value.title}</h3>
                      <p className="text-sm text-muted-foreground">{value.description}</p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* Featured Products */}
      <Suspense fallback={<div className="h-96 bg-muted animate-pulse" />}>
        <FeaturedProducts />
      </Suspense>
    </div>
  )
}
