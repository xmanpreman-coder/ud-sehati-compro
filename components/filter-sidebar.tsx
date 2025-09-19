"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { createClient } from "@/lib/supabase/client"
import type { Category } from "@/lib/types"
import { useLanguage } from "@/hooks/use-language"
import { Search, X } from "lucide-react"
import useSWR from "swr"

interface FilterSidebarProps {
  searchTerm: string
  onSearchChange: (search: string) => void
  sortBy: string
  onSortChange: (sort: string) => void
  selectedCategories: string[]
  onCategoryChange: (categories: string[]) => void
  onClearFilters: () => void
}

const fetcher = async () => {
  const supabase = createClient()
  const { data, error } = await supabase.from("categories").select("*").order("name")

  if (error) throw error
  return data as Category[]
}

export function FilterSidebar({
  searchTerm,
  onSearchChange,
  sortBy,
  onSortChange,
  selectedCategories,
  onCategoryChange,
  onClearFilters,
}: FilterSidebarProps) {
  const { language } = useLanguage()
  const { data: categories } = useSWR("categories", fetcher)

  const sortOptions = [
    { value: "newest", label: language === "id" ? "Terbaru" : "Newest" },
    { value: "oldest", label: language === "id" ? "Terlama" : "Oldest" },
    { value: "price_low", label: language === "id" ? "Termurah" : "Lowest Price" },
    { value: "price_high", label: language === "id" ? "Termahal" : "Highest Price" },
    { value: "name_asc", label: "A-Z" },
    { value: "name_desc", label: "Z-A" },
  ]

  const handleCategoryToggle = (categoryId: string, checked: boolean) => {
    if (checked) {
      onCategoryChange([...selectedCategories, categoryId])
    } else {
      onCategoryChange(selectedCategories.filter((id) => id !== categoryId))
    }
  }

  return (
    <div className="space-y-6">
      {/* Search */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">{language === "id" ? "Pencarian" : "Search"}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder={language === "id" ? "Cari produk..." : "Search products..."}
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Sort */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">{language === "id" ? "Urutkan" : "Sort By"}</CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup value={sortBy} onValueChange={onSortChange}>
            {sortOptions.map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <RadioGroupItem value={option.value} id={option.value} />
                <Label htmlFor={option.value} className="text-sm">
                  {option.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Categories */}
      {categories && categories.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">{language === "id" ? "Kategori" : "Categories"}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {categories.map((category) => (
                <div key={category.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={category.id}
                    checked={selectedCategories.includes(category.id)}
                    onCheckedChange={(checked) => handleCategoryToggle(category.id, checked as boolean)}
                  />
                  <Label htmlFor={category.id} className="text-sm">
                    {category.name}
                  </Label>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Clear Filters */}
      <Button variant="outline" onClick={onClearFilters} className="w-full bg-transparent">
        <X className="h-4 w-4 mr-2" />
        {language === "id" ? "Hapus Filter" : "Clear Filters"}
      </Button>
    </div>
  )
}
