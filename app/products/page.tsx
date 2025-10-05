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
import { useEffect, useState, useMemo } from "react"
import useSWR from "swr"

const ITEMS_PER_PAGE = 20

const fetcher = async ([
  key,
  page,
  sortBy,
  searchTerm,
  selectedCategories,
]: [
  string,
  number,
  string,
  string,
  string[],
]) => {
  const supabase = createClient()
  const from = page * ITEMS_PER_PAGE
  const to = from + ITEMS_PER_PAGE - 1

  let query = supabase
    .from("products")
    .select(`
      *,
      category:categories(*)
    `, { count: 'exact' })
    .eq("active", true)

  // Apply search filter
  if (searchTerm) {
    query = query.or(`name.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`)
  }

  // Apply category filter
  if (selectedCategories.length > 0) {
    query = query.in("category_id", selectedCategories)
  }

  // Apply sorting
  switch (sortBy) {
    case "price_low":
      query = query.order("price", { ascending: true })
      break
    case "price_high":
      query = query.order("price", { ascending: false })
      break
    case "name_asc":
      query = query.order("name", { ascending: true })
      break
    case "name_desc":
      query = query.order("name", { ascending: false })
      break
    case "oldest":
      query = query.order("created_at", { ascending: true })
      break
    case "newest":
    default:
      query = query.order("created_at", { ascending: false })
      break
  }

  const { data, error, count } = await query.range(from, to)

  if (error) throw error
  return { data: data as Product[], count }
}

export default function ProductsPage() {
  const { language } = useLanguage()
  const [currentPage, setCurrentPage] = useState(0)
  const [sortBy, setSortBy] = useState("newest")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const { data, isLoading } = useSWR(
    ['products', currentPage, sortBy, searchTerm, selectedCategories],
    fetcher,
  )
  
  const allProducts = useMemo(() => data?.data || [], [data])
  const totalProducts = useMemo(() => data?.count || 0, [data])

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  useEffect(() => {
    setCurrentPage(0)
  }, [sortBy, searchTerm, selectedCategories])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0)
    }
  }, [currentPage])

  const clearFilters = () => {
    setSearchTerm("")
    setSortBy("newest")
    setSelectedCategories([])
  }
  
  const totalPages = Math.ceil(totalProducts / ITEMS_PER_PAGE)

  if (isLoading && allProducts.length === 0) {
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
            <div className="sticky top-24 max-h-[calc(100vh-7rem)] pr-4 overflow-y-auto">
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
                  ? `Menampilkan ${allProducts.length} dari ${totalProducts || 0} produk`
                  : `Showing ${allProducts.length} of ${totalProducts || 0} products`}
              </p>
            </div>

            {/* Products Grid */}
            {allProducts.length === 0 && !isLoading ? (
              <div className="text-center py-12">
                <p className="text-lg text-muted-foreground mb-4">
                  {language === "id" ? "Tidak ada produk ditemukan" : "No products found"}
                </p>
                <Button onClick={clearFilters} variant="outline">
                  {language === "id" ? "Hapus Filter" : "Clear Filters"}
                </Button>
              </div>
            ) : (
              <>
                <div
                  className={`grid gap-6 ${
                    viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5" : "grid-cols-1"
                  }`}
                >
                  {allProducts.map((product) => (
                    <ProductCard key={product.id} product={product} onViewDetails={setSelectedProduct} />
                  ))}
                </div>
                {/* Pagination Controls */}
                <div className="flex justify-center items-center mt-8 space-x-4">
                  <Button
                    onClick={() => setCurrentPage(p => Math.max(0, p - 1))}
                    disabled={currentPage === 0}
                  >
                    {language === "id" ? "Sebelumnya" : "Previous"}
                  </Button>
                  <span className="text-sm">
                    {language === "id" ? `Halaman ${currentPage + 1} dari ${totalPages}` : `Page ${currentPage + 1} of ${totalPages}`}
                  </span>
                  <Button
                    onClick={() => setCurrentPage(p => Math.min(totalPages - 1, p + 1))}
                    disabled={currentPage >= totalPages - 1}
                  >
                    {language === "id" ? "Berikutnya" : "Next"}
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <ProductModal product={selectedProduct} isOpen={!!selectedProduct} onClose={() => setSelectedProduct(null)} />
    </>
  )
}
