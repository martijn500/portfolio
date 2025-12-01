import { ImageResponse } from 'next/og'
import { i18n, type LangKey } from '@/lib/i18n'
import { createImageResponse } from '@/lib/opengraph-renderer'

export const runtime = 'edge'
export const alt = 'Martijn van der Wijst'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const validLang = (['en', 'nl'] as const).includes(lang as any) ? (lang as LangKey) : 'en'
  const t = i18n[validLang]
  
  // We need baseUrl. In Server Components we can use process.env.NEXT_PUBLIC_SITE_URL
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  
  return createImageResponse(t, baseUrl)
}
