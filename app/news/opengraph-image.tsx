import { renderOgImage, ogImageSize, ogImageContentType } from '@/lib/og'

export const size = ogImageSize
export const contentType = ogImageContentType
export const alt = 'News & Updates — Ecodite Foundation'

export default async function Image() {
  return renderOgImage({ eyebrow: 'News & updates', title: 'Stories from our work with young people.' })
}
