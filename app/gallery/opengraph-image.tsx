import { renderOgImage, ogImageSize, ogImageContentType } from '@/lib/og'

export const size = ogImageSize
export const contentType = ogImageContentType
export const alt = 'Gallery — Ecodite Foundation'

export default async function Image() {
  return renderOgImage({ eyebrow: 'Gallery', title: 'A glimpse of our work' })
}
