import { renderOgImage, ogImageSize, ogImageContentType } from '@/lib/og'

export const size = ogImageSize
export const contentType = ogImageContentType
export const alt = 'Events — Ecodite Foundation'

export default async function Image() {
  return renderOgImage({ eyebrow: 'Events', title: 'Upcoming events and gatherings.' })
}
