import { renderOgImage, ogImageSize, ogImageContentType } from '@/lib/og'

export const size = ogImageSize
export const contentType = ogImageContentType
export const alt = 'Our Programs — Ecodite Foundation'

export default async function Image() {
  return renderOgImage({ eyebrow: 'Our programs', title: 'Creating pathways for learning, creativity and growth.' })
}
