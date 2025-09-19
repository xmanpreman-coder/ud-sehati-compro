"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

interface LanguageStore {
  language: "id" | "en"
  setLanguage: (lang: "id" | "en") => void
}

export const useLanguage = create<LanguageStore>()(
  persist(
    (set) => ({
      language: "id",
      setLanguage: (language) => set({ language }),
    }),
    {
      name: "language-storage",
    },
  ),
)
