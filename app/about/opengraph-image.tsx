import { renderOgImage, ogImageSize, ogImageContentType } from '@/lib/og'

export const size = ogImageSize
export const contentType = ogImageContentType
export const alt = 'About Ecodite Foundation'

export default async function Image() {
  return renderOgImage({ eyebrow: 'About us', title: 'Building people. Building possibilities.' })
}
