"use client"

import type React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useLanguage } from "@/hooks/use-language"
import { Shield, Lock } from "lucide-react"
import { useState } from "react"

interface AdminGuardProps {
  children: React.ReactNode
}

// Simple password protection for admin area
export function AdminGuard({ children }: AdminGuardProps) {
  const { language } = useLanguage()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Simple password check - in production, use proper authentication
    if (password === "admin123") {
      setIsAuthenticated(true)
      setError("")
    } else {
      setError(language === "id" ? "Password salah" : "Incorrect password")
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/30">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit">
              <Shield className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-2xl">{language === "id" ? "Akses Admin" : "Admin Access"}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">{language === "id" ? "Password" : "Password"}</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={language === "id" ? "Masukkan password admin" : "Enter admin password"}
                  required
                />
              </div>
              {error && <p className="text-sm text-red-500">{error}</p>}
              <Button type="submit" className="w-full">
                <Lock className="h-4 w-4 mr-2" />
                {language === "id" ? "Masuk" : "Login"}
              </Button>
            </form>
            <div className="mt-4 p-3 bg-muted rounded-lg">
              <p className="text-xs text-muted-foreground text-center">
                {language === "id" ? 'Demo: gunakan password "admin123"' : 'Demo: use password "admin123"'}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return <>{children}</>
}
