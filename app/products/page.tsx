"use client"

import { FilterSidebar } from "@/components/filter-sidebar"
import { ProductCard } from "@/components/product-card"
import { ProductModal } from "@/components/product-modal"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { createClient } from "@/lib/supabase/client"
import type { Product } from "@/lib/types"
import { useLanguage } from "@/hooks/use-language"
import { Filter, Grid, List } from "lucide-react"
import { useEffect, useState } from "react"
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

  if (error) throw error
  return data as Product[]
}

export default function ProductsPage() {
  const { language } = useLanguage()
  const { data: allProducts, isLoading } = useSWR("all_products", fetcher)
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  // Filter states
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("newest")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])

  // Apply filters and sorting
  useEffect(() => {
    if (!allProducts) return

    let filtered = [...allProducts]

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description?.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Apply category filter
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((product) => product.category_id && selectedCategories.includes(product.category_id))
    }

    // Apply sorting
    switch (sortBy) {
      case "newest":
        filtered.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        break
      case "oldest":
        filtered.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())
        break
      case "price_low":
        filtered.sort((a, b) => (a.price || 0) - (b.price || 0))
        break
      case "price_high":
        filtered.sort((a, b) => (b.price || 0) - (a.price || 0))
        break
      case "name_asc":
        filtered.sort((a, b) => a.name.localeCompare(b.name))
        break
      case "name_desc":
        filtered.sort((a, b) => b.name.localeCompare(a.name))
        break
    }

    setFilteredProducts(filtered)
  }, [allProducts, searchTerm, sortBy, selectedCategories])

  const clearFilters = () => {
    setSearchTerm("")
    setSortBy("newest")
    setSelectedCategories([])
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/4">
            <div className="space-y-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-32 bg-muted animate-pulse rounded-lg" />
              ))}
            </div>
          </div>
          <div className="lg:w-3/4">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-96 bg-muted animate-pulse rounded-lg" />
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            {language === "id" ? "Katalog Produk" : "Product Catalog"}
          </h1>
          <p className="text-lg text-muted-foreground">
            {language === "id"
              ? "Jelajahi koleksi lengkap produk dan layanan kami"
              : "Explore our complete collection of products and services"}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Sidebar */}
          <div className="hidden lg:block lg:w-1/4">
            <div className="sticky top-24">
              <FilterSidebar
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                sortBy={sortBy}
                onSortChange={setSortBy}
                selectedCategories={selectedCategories}
                onCategoryChange={setSelectedCategories}
                onClearFilters={clearFilters}
              />
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            {/* Mobile Filter & View Controls */}
            <div className="flex items-center justify-between mb-6 lg:hidden">
              <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline">
                    <Filter className="h-4 w-4 mr-2" />
                    {language === "id" ? "Filter" : "Filter"}
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[300px] overflow-y-auto">
                  <div className="mt-6">
                    <FilterSidebar
                      searchTerm={searchTerm}
                      onSearchChange={setSearchTerm}
                      sortBy={sortBy}
                      onSortChange={setSortBy}
                      selectedCategories={selectedCategories}
                      onCategoryChange={setSelectedCategories}
                      onClearFilters={clearFilters}
                    />
                  </div>
                </SheetContent>
              </Sheet>

              <div className="flex items-center gap-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Results Count */}
            <div className="mb-6">
              <p className="text-sm text-muted-foreground">
                {language === "id"
                  ? `Menampilkan ${filteredProducts.length} dari ${allProducts?.length || 0} produk`
                  : `Showing ${filteredProducts.length} of ${allProducts?.length || 0} products`}
              </p>
            </div>

            {/* Products Grid */}
            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-lg text-muted-foreground mb-4">
                  {language === "id" ? "Tidak ada produk ditemukan" : "No products found"}
                </p>
                <Button onClick={clearFilters} variant="outline">
                  {language === "id" ? "Hapus Filter" : "Clear Filters"}
                </Button>
              </div>
            ) : (
              <div
                className={`grid gap-6 ${
                  viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-3" : "grid-cols-1"
                }`}
              >
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} onViewDetails={setSelectedProduct} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <ProductModal product={selectedProduct} isOpen={!!selectedProduct} onClose={() => setSelectedProduct(null)} />
    </>
  )
}
