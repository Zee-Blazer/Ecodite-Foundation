import { renderOgImage, ogImageSize, ogImageContentType } from '@/lib/og'

export const size = ogImageSize
export const contentType = ogImageContentType
export const alt = 'Contact Ecodite Foundation'

export default async function Image() {
  return renderOgImage({ eyebrow: 'Contact', title: 'Get in touch with Ecodite Foundation.' })
}
