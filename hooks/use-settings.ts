"use client"

import { createClient } from "@/lib/supabase/client"
import type { Setting } from "@/lib/types"
import useSWR from "swr"

const fetcher = async (key: string) => {
  const supabase = createClient()
  const { data, error } = await supabase.from("settings").select("*").order("key")

  if (error) throw error
  return data as Setting[]
}

export function useSettings() {
  const { data, error, isLoading } = useSWR("settings", fetcher)

  const getSettingValue = (key: string, language = "id", fallback = "") => {
    if (!data) return fallback
    const setting = data.find((s) => s.key === key && s.language === language)
    return setting?.value || fallback
  }

  return {
    settings: data || [],
    getSettingValue,
    isLoading,
    error,
  }
}
