import { renderOgImage, ogImageSize, ogImageContentType } from '@/lib/og'

export const size = ogImageSize
export const contentType = ogImageContentType
export const alt = 'Support the future — Ecodite Foundation'

export default async function Image() {
  return renderOgImage({ eyebrow: 'Donate', title: 'Support the future.' })
}
