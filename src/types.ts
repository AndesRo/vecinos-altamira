export interface ElectionInfo {
  id: number
  title: string
  intro: string
  date_text: string
  time_text: string
  place: string
  note: string
}

export interface Candidate {
  id: string
  name: string
  tagline: string | null
  summary: string
  highlights: string[]
  pdf_path: string | null
  sort_order: number
}

export interface NewsItem {
  id: string
  title: string
  summary: string
  body: string | null
  published_at: string
}

export interface DocItem {
  id: string
  title: string
  description: string | null
  category: string
  file_path: string
  created_at: string
}

export interface ContactItem {
  id: string
  label: string
  kind: 'phone' | 'email' | 'whatsapp'
  value: string
  note: string | null
  sort_order: number
}
