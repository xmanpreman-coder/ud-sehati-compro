"use client"

import { useSettings } from "@/hooks/use-settings"
import { useLanguage } from "@/hooks/use-language"
import { createClient } from "@/lib/supabase/client"
import type { SocialLink } from "@/lib/types"
import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react"
import Link from "next/link"
import useSWR from "swr"

const socialIcons = {
  facebook: Facebook,
  instagram: Instagram,
  linkedin: Linkedin,
  youtube: Youtube,
  tiktok: () => (
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43V7.56a8.16 8.16 0 0 0 4.77 1.52v-3.39a4.85 4.85 0 0 1-1-.05z" />
    </svg>
  ),
}

const fetcher = async () => {
  const supabase = createClient()
  const { data, error } = await supabase.from("social_links").select("*").eq("active", true).order("platform")

  if (error) throw error
  return data as SocialLink[]
}

export function Footer() {
  const { getSettingValue } = useSettings()
  const { language } = useLanguage()
  const { data: socialLinks } = useSWR("social_links", fetcher)

  const footerText = getSettingValue("footer_text", language, "© 2024 Company. All rights reserved.")
  const contactAddress = getSettingValue("contact_address", language, "")
  const contactEmail = getSettingValue("contact_email", language, "")
  const contactPhone = getSettingValue("contact_phone", language, "")

  return (
    <footer className="bg-muted/50 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">{language === "id" ? "Kontak Kami" : "Contact Us"}</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              {contactAddress && <p>{contactAddress}</p>}
              {contactEmail && <p>{contactEmail}</p>}
              {contactPhone && <p>{contactPhone}</p>}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">{language === "id" ? "Tautan Cepat" : "Quick Links"}</h3>
            <div className="space-y-2 text-sm">
              <Link href="/about" className="block hover:text-primary transition-colors">
                {language === "id" ? "Tentang Kami" : "About Us"}
              </Link>
              <Link href="/products" className="block hover:text-primary transition-colors">
                {language === "id" ? "Produk" : "Products"}
              </Link>
              <Link href="/careers" className="block hover:text-primary transition-colors">
                {language === "id" ? "Karir" : "Careers"}
              </Link>
              <Link href="/contact" className="block hover:text-primary transition-colors">
                {language === "id" ? "Kontak" : "Contact"}
              </Link>
            </div>
          </div>

         

          {/* Social Media */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">{language === "id" ? "Ikuti Kami" : "Follow Us"}</h3>
            <div className="flex space-x-4">
              {socialLinks?.map((social) => {
                const IconComponent = socialIcons[social.platform.toLowerCase() as keyof typeof socialIcons]
                if (!IconComponent) return null

                return (
                  <Link
                    key={social.id}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    <IconComponent />
                  </Link>
                )
              })}
            </div>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>{footerText}</p>
        </div>
      </div>
    </footer>
  )
}
