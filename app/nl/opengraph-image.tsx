import { i18n } from '@/lib/i18n'
import { contentType, createImageResponse, size } from '@/lib/opengraph-renderer'

const t = i18n.nl

export { contentType, size }

export default async function Image() {
  return createImageResponse(t)
}
