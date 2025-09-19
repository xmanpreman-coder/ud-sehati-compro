"use client"

import { ContactForm } from "@/components/contact-form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useSettings } from "@/hooks/use-settings"
import { useLanguage } from "@/hooks/use-language"
import { MapPin, Phone, Mail, MessageCircle, Instagram, Facebook, Twitter, Youtube, Linkedin } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import useSWR from "swr"

const socialMediaFetcher = async () => {
  const supabase = createClient()
  const { data, error } = await supabase
    .from("social_links")
    .select("*")
    .eq("active", true)
    .order("platform")

  if (error) throw error
  return data
}

const getSocialIcon = (platform: string) => {
  switch (platform.toLowerCase()) {
    case 'instagram':
      return Instagram
    case 'facebook':
      return Facebook
    case 'twitter':
      return Twitter
    case 'youtube':
      return Youtube
    case 'linkedin':
      return Linkedin
    default:
      return MessageCircle
  }
}

export default function ContactPage() {
  const { language } = useLanguage()
  const { getSettingValue } = useSettings()
  const { data: socialMedia } = useSWR("social-media", socialMediaFetcher)

  const contactInfo = [
    {
      icon: MapPin,
      title: language === "id" ? "Alamat" : "Address",
      value: getSettingValue("contact_address", language, ""),
    },
    {
      icon: Phone,
      title: language === "id" ? "Telepon" : "Phone",
      value: getSettingValue("contact_phone", language, ""),
    },
    {
      icon: Mail,
      title: "Email",
      value: getSettingValue("contact_email", language, ""),
    },
  ]

  const whatsappNumber = getSettingValue("whatsapp_number", language, "")
  const googleMapsEmbed = getSettingValue("google_maps_embed", language, "")

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">{language === "id" ? "Hubungi Kami" : "Contact Us"}</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          {language === "id"
            ? "Kami siap membantu Anda. Hubungi kami melalui berbagai cara di bawah ini"
            : "We're here to help you. Contact us through various ways below"}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Contact Form & Basic Info */}
        <div className="space-y-6">
          {/* Contact Form */}
          <ContactForm />

          {/* Contact Details */}
          <Card>
            <CardHeader>
              <CardTitle>{language === "id" ? "Informasi Kontak" : "Contact Information"}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {contactInfo.map((info, index) => {
                const IconComponent = info.icon
                return (
                  <div key={index} className="flex items-start gap-3">
                    <div className="flex-shrink-0 p-2 bg-primary/10 rounded-lg">
                      <IconComponent className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">{info.title}</h3>
                      <p className="text-muted-foreground">{info.value}</p>
                    </div>
                  </div>
                )
              })}
            </CardContent>
          </Card>

          {/* Business Hours */}
          <Card>
            <CardHeader>
              <CardTitle>{language === "id" ? "Jam Operasional" : "Business Hours"}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>{language === "id" ? "Senin - Jumat" : "Monday - Friday"}</span>
                  <span>09:00 - 18:00</span>
                </div>
                <div className="flex justify-between">
                  <span>{language === "id" ? "Sabtu" : "Saturday"}</span>
                  <span>09:00 - 15:00</span>
                </div>
                <div className="flex justify-between">
                  <span>{language === "id" ? "Minggu" : "Sunday"}</span>
                  <span className="text-muted-foreground">{language === "id" ? "Tutup" : "Closed"}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - WhatsApp & Social Media */}
        <div className="space-y-6">
          {/* WhatsApp */}
          {whatsappNumber && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5 text-green-600" />
                  WhatsApp
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  {language === "id"
                    ? "Hubungi kami langsung melalui WhatsApp untuk respon yang lebih cepat"
                    : "Contact us directly via WhatsApp for faster response"}
                </p>
                <Button
                  className="bg-green-600 hover:bg-green-700 w-full"
                  onClick={() =>
                    window.open(
                      `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                        language === "id"
                          ? "Halo, saya ingin bertanya tentang produk Anda"
                          : "Hello, I would like to inquire about your products",
                      )}`,
                      "_blank",
                    )
                  }
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  {language === "id" ? "Chat WhatsApp" : "Chat WhatsApp"}
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Social Media */}
          {socialMedia && socialMedia.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>{language === "id" ? "Sosial Media Kami" : "Our Social Media"}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  {language === "id"
                    ? "Ikuti kami di platform sosial media untuk update terbaru"
                    : "Follow us on social media platforms for the latest updates"}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {socialMedia.map((social) => {
                    const IconComponent = getSocialIcon(social.platform)
                    return (
                      <Button
                        key={social.id}
                        variant="outline"
                        className="justify-start h-12"
                        onClick={() => window.open(social.url, "_blank")}
                      >
                        <IconComponent className="h-5 w-5 mr-3 flex-shrink-0" />
                        <span className="truncate">{social.platform}</span>
                      </Button>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Google Maps */}
      {googleMapsEmbed && (
        <div className="mt-12">
          <Card>
            <CardHeader>
              <CardTitle>{language === "id" ? "Lokasi Kami" : "Our Location"}</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="aspect-video w-full">
                <iframe
                  src={googleMapsEmbed}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-b-lg"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
