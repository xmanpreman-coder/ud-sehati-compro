"use client"

import { Button } from "@/components/ui/button"
import { useTheme } from "@/hooks/use-theme"
import { Moon, Sun } from "lucide-react"
import { useEffect } from "react"

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove("light", "dark")
    root.classList.add(theme)
  }, [theme])

  return (
    <Button variant="ghost" size="sm" onClick={toggleTheme}>
      {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
    </Button>
  )
}
