"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { createClient } from "@/lib/supabase/client"
import { useLanguage } from "@/hooks/use-language"
import { useSettings } from "@/hooks/use-settings"
import { Send, MessageCircle } from "lucide-react"
import { useState } from "react"

export function ContactForm() {
  const { language } = useLanguage()
  const { getSettingValue } = useSettings()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Simpan ke database terlebih dahulu
      const supabase = createClient()
      const { error: dbError } = await supabase.from("contact_messages").insert([formData])

      if (dbError) {
        console.error("Database error:", dbError)
        throw new Error("Failed to save to database")
      }

      // Jika berhasil disimpan ke database, kirim ke WhatsApp
      const whatsappNumber = getSettingValue("whatsapp_number", language, "6281234567890")
      const whatsappMessage = language === "id" 
        ? `Halo, saya ${formData.name} (${formData.email}, ${formData.phone}). ${formData.message}`
        : `Hello, I'm ${formData.name} (${formData.email}, ${formData.phone}). ${formData.message}`
      
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`
      window.open(whatsappUrl, "_blank")

      toast({
        title: language === "id" ? "Pesan Berhasil Disimpan!" : "Message Successfully Saved!",
        description:
          language === "id"
            ? "Pesan telah disimpan ke database dan dikirim ke WhatsApp. Kami akan segera menghubungi Anda."
            : "Message has been saved to database and sent to WhatsApp. We will contact you soon.",
      })

      // Reset form setelah berhasil
      setFormData({ name: "", email: "", phone: "", message: "" })
    } catch (error) {
      console.error("Submit error:", error)
      toast({
        title: language === "id" ? "Gagal Mengirim" : "Failed to Send",
        description:
          language === "id"
            ? "Terjadi kesalahan saat mengirim pesan. Silakan coba lagi."
            : "An error occurred while sending the message. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{language === "id" ? "Kirim Pesan" : "Send Message"}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">{language === "id" ? "Nama" : "Name"}</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder={language === "id" ? "Masukkan nama Anda" : "Enter your name"}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder={language === "id" ? "Masukkan email Anda" : "Enter your email"}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">{language === "id" ? "Nomor Telepon" : "Phone Number"}</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                required
                placeholder={language === "id" ? "Masukkan nomor telepon Anda" : "Enter your phone number"}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">{language === "id" ? "Pesan" : "Message"}</Label>
            <Textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={5}
              placeholder={language === "id" ? "Tulis pesan Anda di sini..." : "Write your message here..."}
            />
          </div>
          <Button type="submit" disabled={isLoading} className="w-full bg-green-600 hover:bg-green-700">
            <MessageCircle className="h-4 w-4 mr-2" />
            {isLoading
              ? language === "id"
                ? "Menyimpan & Mengirim..."
                : "Saving & Sending..."
              : language === "id"
                ? "Kirim"
                : "Send"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
