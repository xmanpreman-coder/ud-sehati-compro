"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { createClient } from "@/lib/supabase/client"
import type { Job } from "@/lib/types"
import { useLanguage } from "@/hooks/use-language"
import { MapPin, ExternalLink, Briefcase } from "lucide-react"
import useSWR from "swr"

const fetcher = async () => {
  const supabase = createClient()
  const { data, error } = await supabase
    .from("jobs")
    .select("*")
    .eq("active", true)
    .order("created_at", { ascending: false })

  if (error) throw error
  return data as Job[]
}

export default function CareersPage() {
  const { language } = useLanguage()
  const { data: jobs, isLoading } = useSWR("jobs", fetcher)

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="h-8 bg-muted animate-pulse rounded mb-4" />
          <div className="h-4 bg-muted animate-pulse rounded w-2/3" />
        </div>
        <div className="space-y-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-48 bg-muted animate-pulse rounded-lg" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">{language === "id" ? "Karir" : "Careers"}</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          {language === "id"
            ? "Bergabunglah dengan tim kami dan kembangkan karir Anda bersama perusahaan yang inovatif"
            : "Join our team and develop your career with an innovative company"}
        </p>
      </div>

      {/* Why Join Us */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-center mb-8">
          {language === "id" ? "Mengapa Bergabung dengan Kami?" : "Why Join Us?"}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: language === "id" ? "Lingkungan Kerja Positif" : "Positive Work Environment",
              description:
                language === "id"
                  ? "Budaya kerja yang mendukung kolaborasi dan inovasi"
                  : "Work culture that supports collaboration and innovation",
            },
            {
              title: language === "id" ? "Pengembangan Karir" : "Career Development",
              description:
                language === "id"
                  ? "Peluang untuk belajar dan berkembang dengan pelatihan berkelanjutan"
                  : "Opportunities to learn and grow with continuous training",
            },
            {
              title: language === "id" ? "Benefit Kompetitif" : "Competitive Benefits",
              description:
                language === "id"
                  ? "Paket kompensasi dan benefit yang menarik"
                  : "Attractive compensation and benefits package",
            },
          ].map((benefit, index) => (
            <Card key={index} className="text-center">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-3">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Job Listings */}
      <div>
        <h2 className="text-2xl font-bold mb-8">{language === "id" ? "Lowongan Tersedia" : "Available Positions"}</h2>

        {!jobs || jobs.length === 0 ? (
          <div className="text-center py-12">
            <Briefcase className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <p className="text-lg text-muted-foreground mb-4">
              {language === "id" ? "Saat ini tidak ada lowongan tersedia" : "No positions available at the moment"}
            </p>
            <p className="text-muted-foreground">
              {language === "id"
                ? "Silakan periksa kembali nanti atau kirim CV Anda untuk posisi yang akan datang"
                : "Please check back later or send your CV for future opportunities"}
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {jobs.map((job) => (
              <Card key={job.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <CardTitle className="text-xl mb-2">{job.title}</CardTitle>
                      {job.location && (
                        <div className="flex items-center text-muted-foreground">
                          <MapPin className="h-4 w-4 mr-1" />
                          <span className="text-sm">{job.location}</span>
                        </div>
                      )}
                    </div>
                    <Badge variant="secondary" className="w-fit">
                      {language === "id" ? "Aktif" : "Active"}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent>
                  {job.description && (
                    <div className="mb-6">
                      <h4 className="font-medium mb-2">
                        {language === "id" ? "Deskripsi Pekerjaan" : "Job Description"}
                      </h4>
                      <p className="text-muted-foreground leading-relaxed">{job.description}</p>
                    </div>
                  )}

                  {job.apply_link && (
                    <Button onClick={() => window.open(job.apply_link, "_blank")}>
                      <ExternalLink className="h-4 w-4 mr-2" />
                      {language === "id" ? "Lamar Sekarang" : "Apply Now"}
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
