import { renderOgImage, ogImageSize, ogImageContentType } from '@/lib/og'

export const size = ogImageSize
export const contentType = ogImageContentType
export const alt = "Chairman's Corner — Ecodite Foundation"

export default async function Image() {
  return renderOgImage({ eyebrow: "Chairman's corner", title: 'Welcome to Ecodite Foundation' })
}
