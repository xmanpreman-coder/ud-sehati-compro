export interface Setting {
  id: string
  key: string
  value: string
  language: string
  created_at: string
  updated_at: string
}

export interface Banner {
  id: string
  title: string
  subtitle?: string
  image_url?: string
  active: boolean
  created_at: string
}

export interface About {
  id: string
  section: string
  language: string
  content: string
  created_at: string
}

export interface Category {
  id: string
  name: string
  slug: string
  created_at: string
}

export interface Product {
  id: string
  name: string
  description?: string
  price?: number
  category_id?: string
  image_url?: string
  whatsapp_link?: string
  active: boolean
  created_at: string
  category?: Category
  online_shops?: OnlineShop[]
}

export interface OnlineShop {
  id: string
  name: string
  url: string
  icon?: string
  active: boolean
  sort_order: number
  created_at: string
}

export interface CompanyValue {
  id: string
  title: string
  description: string
  icon?: string
  language: string
  sort_order: number
  active: boolean
  created_at: string
}

export interface AboutImage {
  id: string
  image_url: string
  alt_text?: string
  caption?: string
  section: string
  sort_order: number
  active: boolean
  created_at: string
}

export interface Job {
  id: string
  title: string
  description?: string
  location?: string
  apply_link?: string
  active: boolean
  created_at: string
}

export interface SocialLink {
  id: string
  platform: string
  url: string
  icon?: string
  active: boolean
  created_at: string
}

export interface ContactMessage {
  id: string
  name: string
  email: string
  message: string
  created_at: string
}
