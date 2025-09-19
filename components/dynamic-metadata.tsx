"use client"

import { useSettings } from "@/hooks/use-settings"
import { useLanguage } from "@/hooks/use-language"
import { useEffect } from "react"

export function DynamicMetadata() {
  const { getSettingValue } = useSettings()
  const { language } = useLanguage()

  useEffect(() => {
    const companyName = getSettingValue("company_name", language, "UD. SEHATI")
    document.title = companyName
    // Dynamically set favicon from settings
    const logoUrl = getSettingValue("company_logo", language, "")
    if (logoUrl) {
      const ensureIcon = (rel: string, sizes?: string) => {
        let linkEl = document.querySelector<HTMLLinkElement>(`link[rel='${rel}']${sizes ? `[sizes='${sizes}']` : ""}`)
        if (!linkEl) {
          linkEl = document.createElement("link")
          linkEl.rel = rel as any
          if (sizes) linkEl.sizes = sizes
          document.head.appendChild(linkEl)
        }
        linkEl.href = logoUrl
        linkEl.type = "image/png"
      }

      // Common favicon links
      ensureIcon("icon")
      ensureIcon("shortcut icon")
      ensureIcon("apple-touch-icon")
    }
  }, [getSettingValue, language])

  return null
}
