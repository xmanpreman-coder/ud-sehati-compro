"use client"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/client"
import type { Banner } from "@/lib/types"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import { useEffect, useState } from "react"
import useSWR from "swr"

const fetcher = async () => {
  const supabase = createClient()
  const { data, error } = await supabase
    .from("banners")
    .select("*")
    .eq("active", true)
    .order("created_at", { ascending: false })

  if (error) throw error
  return data as Banner[]
}

export function BannerCarousel() {
  const { data: banners } = useSWR("banners", fetcher)
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (!banners || banners.length <= 1) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [banners])

  if (!banners || banners.length === 0) {
    return (
      <div className="relative h-[400px] md:h-[500px] bg-muted dark:bg-muted/50 rounded-lg flex items-center justify-center">
        <p className="text-muted-foreground dark:text-muted-foreground">No banners available</p>
      </div>
    )
  }

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % banners.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + banners.length) % banners.length)
  }

  const currentBanner = banners[currentIndex]

  return (
    <div className="relative h-[400px] md:h-[500px] overflow-hidden rounded-lg">
      {/* Banner Image */}
      <div className="relative w-full h-full">
        <Image
          src={currentBanner.image_url || "/placeholder.svg?height=500&width=1200"}
          alt={currentBanner.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Banner Content */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center text-white dark:text-white max-w-4xl px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-balance drop-shadow-lg">{currentBanner.title}</h1>
          {currentBanner.subtitle && (
            <p className="text-lg md:text-xl mb-8 text-balance opacity-90 drop-shadow-md">{currentBanner.subtitle}</p>
          )}
        </div>
      </div>

      {/* Navigation Arrows */}
      {banners.length > 1 && (
        <>
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 dark:bg-white/20 dark:hover:bg-white/30 text-white dark:text-white"
            onClick={prevSlide}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 dark:bg-white/20 dark:hover:bg-white/30 text-white dark:text-white"
            onClick={nextSlide}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </>
      )}

      {/* Dots Indicator */}
      {banners.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
          {banners.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-all ${index === currentIndex ? "bg-white dark:bg-white" : "bg-white/50 dark:bg-white/50"}`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      )}
    </div>
  )
}
