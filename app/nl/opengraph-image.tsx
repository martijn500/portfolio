import { i18n } from '@/lib/i18n'
import { createImageResponse } from '@/lib/opengraph-renderer'
import { size, contentType } from '@/lib/opengraph-renderer'

const t = i18n.nl

export { size, contentType }

export default async function Image() {
  return createImageResponse(t)
}
