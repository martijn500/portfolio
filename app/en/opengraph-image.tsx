import { i18n } from '@/lib/i18n'
import { createImageResponse, size as ogSize, contentType as ogContentType } from '@/lib/opengraph-renderer'

const t = i18n.en

export const alt = t.seo.title
export const size = ogSize
export const contentType = ogContentType

export default async function Image() {
  return createImageResponse(t)
}
