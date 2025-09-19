"use client"

import { Card, CardContent } from "@/components/ui/card"
import { createClient } from "@/lib/supabase/client"
import type { About, CompanyValue, AboutImage } from "@/lib/types"
import { useLanguage } from "@/hooks/use-language"
import { Target, Eye, Heart, Check, Building } from "lucide-react"
import useSWR from "swr"
import Image from "next/image"

const aboutFetcher = async () => {
  const supabase = createClient()
  const { data, error } = await supabase.from("about").select("*").order("section")

  if (error) throw error
  return data as About[]
}

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

const imagesFetcher = async () => {
  const supabase = createClient()
  const { data, error } = await supabase
    .from("about_images")
    .select("*")
    .eq("active", true)
    .order("sort_order")

  if (error) throw error
  return data as AboutImage[]
}

export default function AboutPage() {
  const { language } = useLanguage()
  const { data: aboutData, isLoading: aboutLoading } = useSWR("about", aboutFetcher)
  const { data: valuesData, isLoading: valuesLoading, error: valuesError } = useSWR("company-values", valuesFetcher)
  const { data: imagesData, isLoading: imagesLoading } = useSWR("about-images", imagesFetcher)

  const getContent = (section: string) => {
    if (!aboutData) return ""
    const content = aboutData.find((item) => item.section === section && item.language === language)
    return content?.content || ""
  }

  const getValuesForLanguage = () => {
    if (!valuesData) {
      return []
    }
    return valuesData.filter((value) => value.language === language)
  }

  const getImageForSection = (section: string) => {
    if (!imagesData) return null
    return imagesData.find((image) => image.section === section)
  }

  if (aboutLoading || valuesLoading || imagesLoading) {
    return (
      <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="h-8 bg-muted animate-pulse rounded mb-4" />
          <div className="h-4 bg-muted animate-pulse rounded w-2/3" />
        </div>
        <div className="space-y-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-48 bg-muted animate-pulse rounded-lg" />
          ))}
          </div>
        </div>
      </div>
    )
  }


  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            {language === "id" ? "Tentang UD. SEHATI" : "About UD. SEHATI"}
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          {language === "id"
              ? "Perjalanan kami dalam membawa kekayaan lokal ke panggung dunia."
              : "Our journey in bringing local treasures to the world stage."
            }
        </p>
      </div>

        {/* Main Content Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-20">
          {/* Left Column - Story */}
          <div>
            <h2 className="text-2xl font-bold text-primary mb-6">
              {language === "id" ? "Cerita Kami" : "Our Story"}
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p className="text-justify">
                {getContent("description") || 
                  (language === "id" 
                    ? "UD. SEHATI lahir dari sebuah mimpi sederhana: untuk memperkenalkan kembali kekayaan cita rasa dan kerajinan tangan Indonesia yang otentik kepada masyarakat luas. Berawal dari dapur rumahan di Surabaya pada tahun 2010, kami memulai perjalanan dengan resep-resep warisan keluarga yang diolah menggunakan bahan-bahan segar langsung dari petani lokal."
                    : "UD. SEHATI was born from a simple dream: to reintroduce the authentic flavors and craftsmanship of Indonesia to the wider community. Starting from a home kitchen in Surabaya in 2010, we began our journey with family heritage recipes using fresh ingredients directly from local farmers."
                  )
                }
              </p>
              <p>
                {language === "id" 
                  ? "Kami percaya bahwa setiap produk memiliki cerita, dan di balik setiap gigitan atau sentuhan produk UD. SEHATI, ada kisah tentang kerja keras, dedikasi, dan semangat komunitas yang kami dukung. Semangat 'Sehati' menjadi landasan kami untuk tumbuh bersama, seirama dengan alam dan para mitra kami."
                  : "We believe that every product has a story, and behind every bite or touch of UD. SEHATI products, there is a story about hard work, dedication, and the community spirit we support. The 'Sehati' spirit becomes our foundation to grow together, in harmony with nature and our partners."
                }
              </p>
            </div>
          </div>

          {/* Right Column - Image */}
          <div className="relative">
            <div className="aspect-[4/3] relative rounded-lg overflow-hidden">
              {(() => {
                const storyImage = getImageForSection("story")
                return (
                  <Image
                    src={storyImage?.image_url || "/placeholder.jpg"}
                    alt={storyImage?.alt_text || (language === "id" ? "Dapur UD. SEHATI" : "UD. SEHATI Kitchen")}
                    fill
                    className="object-cover"
                  />
                )
              })()}
            </div>
          </div>
        </div>

        {/* Vision & Mission Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
          {/* Vision */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-primary/10 rounded-full">
                <Check className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-primary">
                {language === "id" ? "Visi Kami" : "Our Vision"}
              </h3>
                    </div>
            <div className="space-y-3">
              {(() => {
                const visionContent = getContent("vision") || 
                  (language === "id" 
                    ? "Menjadi pelopor produk UMKM Indonesia yang dikenal secara global karena kualitas, otentisitas, dan komitmennya terhadap pemberdayaan komunitas lokal."
                    : "To become a pioneer of Indonesian MSME products known globally for their quality, authenticity, and commitment to local community empowerment."
                  )
                
                // Split by line breaks and create bullet points
                const visionLines = visionContent.split('\n').filter(line => line.trim())
                
                return visionLines.map((line, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <p className="text-muted-foreground">{line.trim()}</p>
                  </div>
                ))
              })()}
            </div>
          </div>

          {/* Mission */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-primary/10 rounded-full">
                <Building className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-primary">
                {language === "id" ? "Misi Kami" : "Our Mission"}
              </h3>
            </div>
            <div className="space-y-3">
              {(() => {
                const missionContent = getContent("mission") || 
                  (language === "id" 
                    ? "Menghasilkan produk berkualitas tinggi dengan bahan baku lokal terbaik.\nMembangun kemitraan yang adil dan berkelanjutan dengan petani dan pengrajin.\nMelestarikan resep dan teknik tradisional dengan sentuhan inovasi modern.\nMemberikan pengalaman pelanggan yang tak terlupakan."
                    : "Producing high-quality products with the best local raw materials.\nBuilding fair and sustainable partnerships with farmers and craftsmen.\nPreserving traditional recipes and techniques with modern innovation touches.\nProviding unforgettable customer experiences."
                  )
                
                // Split by line breaks and create bullet points
                const missionLines = missionContent.split('\n').filter(line => line.trim())
                
                return missionLines.map((line, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <p className="text-muted-foreground">{line.trim()}</p>
                  </div>
                ))
              })()}
                  </div>
                </div>
      </div>

        {/* Company Values Section */}
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
          {(() => {
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
            
            const displayValues = values.length > 0 ? values : fallbackValues
            
            return displayValues.map((value) => {
              const IconComponent = value.icon ? 
                (value.icon === 'award' ? Heart :
                 value.icon === 'handshake' ? Target :
                 value.icon === 'lightbulb' ? Eye :
                 Heart) : Heart

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
            })
          })()}
        </div>
      </div>
    </div>
  )
}
