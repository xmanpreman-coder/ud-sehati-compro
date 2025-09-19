"use client"

import { Card, CardContent } from "@/components/ui/card"
import { useLanguage } from "@/hooks/use-language"
import { createClient } from "@/lib/supabase/client"
import type { CompanyValue } from "@/lib/types"
import { Award, Handshake, Lightbulb, Heart, Star, Users, Zap } from "lucide-react"
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
    default:
      return Star // A default icon
  }
}

export function HeroStats() {
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
      description: "Komitmen pada produk unggulan dengan bahan baku lokal pilihan.",
      icon: "award"
    },
    {
      id: "fallback-2",
      title: "Kemitraan Adil",
      description: "Membangun hubungan yang saling menguntungkan dan berkelanjutan.",
      icon: "handshake"
    },
    {
      id: "fallback-3",
      title: "Inovasi & Tradisi",
      description: "Memadukan kearifan lokal dengan sentuhan inovasi modern.",
      icon: "lightbulb"
    },
    {
      id: "fallback-4",
      title: "Kepuasan Pelanggan",
      description: "Memberikan pengalaman terbaik yang melampaui harapan.",
      icon: "heart"
    }
  ] : [
    {
      id: "fallback-1",
      title: "Best Quality",
      description: "Commitment to superior products with selected local raw materials.",
      icon: "award"
    },
    {
      id: "fallback-2",
      title: "Fair Partnership",
      description: "Building mutually beneficial and sustainable relationships.",
      icon: "handshake"
    },
    {
      id: "fallback-3",
      title: "Innovation & Tradition",
      description: "Combining local wisdom with a touch of modern innovation.",
      icon: "lightbulb"
    },
    {
      id: "fallback-4",
      title: "Customer Satisfaction",
      description: "Providing the best experience that exceeds expectations.",
      icon: "heart"
    }
  ]

  const displayValues = !isLoading && (values.length > 0 ? values : fallbackValues)

  if (isLoading) {
    return (
      <section className="py-12 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <Card key={i} className="text-center p-6 bg-gray-50 dark:bg-gray-800/50">
                <div className="flex justify-center mb-4">
                  <div className="h-12 w-12 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse" />
                </div>
                <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mx-auto mb-3 animate-pulse" />
                <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-full mx-auto animate-pulse" />
              </Card>
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    // Render fallback values on error
    console.error("Failed to fetch company values, using fallback.", error)
  }

  return (
    <section className="py-12 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayValues && displayValues.map((value) => {
            const IconComponent = getIconComponent(value.icon)
            return (
              <Card key={value.id} className="text-center p-6 bg-gray-50 dark:bg-gray-800/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="flex justify-center mb-5">
                  <div className="p-4 bg-primary/10 text-primary rounded-full">
                    <IconComponent className="h-8 w-8" />
                  </div>
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{value.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{value.description}</p>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}