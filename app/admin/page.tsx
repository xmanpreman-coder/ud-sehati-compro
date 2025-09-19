"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { createClient } from "@/lib/supabase/client"
import { useLanguage } from "@/hooks/use-language"
import { Settings, ImageIcon, FileText, Package, Briefcase, MessageSquare } from "lucide-react"
import { useEffect, useState } from "react"

// Simple admin interface for content management
export default function AdminPage() {
  const { language } = useLanguage()
  const [stats, setStats] = useState({
    products: 0,
    jobs: 0,
    messages: 0,
    banners: 0,
  })

  // Fetch basic statistics
  useEffect(() => {
    const fetchStats = async () => {
      const supabase = createClient()

      const [productsRes, jobsRes, messagesRes, bannersRes] = await Promise.all([
        supabase.from("products").select("id", { count: "exact" }),
        supabase.from("jobs").select("id", { count: "exact" }),
        supabase.from("contact_messages").select("id", { count: "exact" }),
        supabase.from("banners").select("id", { count: "exact" }),
      ])

      setStats({
        products: productsRes.count || 0,
        jobs: jobsRes.count || 0,
        messages: messagesRes.count || 0,
        banners: bannersRes.count || 0,
      })
    }

    fetchStats()
  }, [])

  const adminSections = [
    {
      title: language === "id" ? "Pengaturan Situs" : "Site Settings",
      description: language === "id" ? "Kelola informasi dasar website" : "Manage basic website information",
      icon: Settings,
      color: "bg-blue-500",
      count: null,
    },
    {
      title: language === "id" ? "Banner" : "Banners",
      description: language === "id" ? "Kelola banner carousel homepage" : "Manage homepage carousel banners",
      icon: ImageIcon,
      color: "bg-green-500",
      count: stats.banners,
    },
    {
      title: language === "id" ? "Konten Halaman" : "Page Content",
      description: language === "id" ? "Edit konten About Us" : "Edit About Us content",
      icon: FileText,
      color: "bg-purple-500",
      count: null,
    },
    {
      title: language === "id" ? "Produk" : "Products",
      description: language === "id" ? "Kelola katalog produk" : "Manage product catalog",
      icon: Package,
      color: "bg-orange-500",
      count: stats.products,
    },
    {
      title: language === "id" ? "Lowongan Kerja" : "Job Listings",
      description: language === "id" ? "Kelola lowongan pekerjaan" : "Manage job listings",
      icon: Briefcase,
      color: "bg-indigo-500",
      count: stats.jobs,
    },
    {
      title: language === "id" ? "Pesan Kontak" : "Contact Messages",
      description: language === "id" ? "Lihat pesan dari pengunjung" : "View messages from visitors",
      icon: MessageSquare,
      color: "bg-red-500",
      count: stats.messages,
    },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">{language === "id" ? "Panel Admin" : "Admin Panel"}</h1>
        <p className="text-lg text-muted-foreground">
          {language === "id" ? "Kelola konten website Anda dari sini" : "Manage your website content from here"}
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{stats.products}</div>
            <div className="text-sm text-muted-foreground">{language === "id" ? "Produk" : "Products"}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{stats.jobs}</div>
            <div className="text-sm text-muted-foreground">{language === "id" ? "Lowongan" : "Jobs"}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">{stats.messages}</div>
            <div className="text-sm text-muted-foreground">{language === "id" ? "Pesan" : "Messages"}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">{stats.banners}</div>
            <div className="text-sm text-muted-foreground">{language === "id" ? "Banner" : "Banners"}</div>
          </CardContent>
        </Card>
      </div>

      {/* Admin Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {adminSections.map((section, index) => {
          const IconComponent = section.icon
          return (
            <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className={`p-3 rounded-full ${section.color}`}>
                    <IconComponent className="h-6 w-6 text-white" />
                  </div>
                  {section.count !== null && <Badge variant="secondary">{section.count}</Badge>}
                </div>
                <CardTitle className="text-lg">{section.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm mb-4">{section.description}</p>
                <Button variant="outline" size="sm" className="w-full bg-transparent">
                  {language === "id" ? "Kelola" : "Manage"}
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Quick Actions */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">{language === "id" ? "Aksi Cepat" : "Quick Actions"}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">{language === "id" ? "Backup Database" : "Database Backup"}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm mb-4">
                {language === "id" ? "Buat backup data untuk keamanan" : "Create data backup for security"}
              </p>
              <Button variant="outline" disabled>
                {language === "id" ? "Buat Backup" : "Create Backup"}
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">{language === "id" ? "Analitik Situs" : "Site Analytics"}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm mb-4">
                {language === "id" ? "Lihat statistik pengunjung website" : "View website visitor statistics"}
              </p>
              <Button variant="outline" disabled>
                {language === "id" ? "Lihat Analitik" : "View Analytics"}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Note */}
      <div className="mt-8 p-4 bg-muted/50 rounded-lg">
        <p className="text-sm text-muted-foreground">
          {language === "id"
            ? "💡 Catatan: Ini adalah panel admin dasar. Untuk fitur lengkap, Anda dapat mengembangkan lebih lanjut dengan sistem autentikasi yang proper."
            : "💡 Note: This is a basic admin panel. For full features, you can further develop with proper authentication system."}
        </p>
      </div>
    </div>
  )
}
