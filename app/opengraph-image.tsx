import { renderOgImage, ogImageSize, ogImageContentType } from '@/lib/og'

export const size = ogImageSize
export const contentType = ogImageContentType
export const alt = 'Ecodite Foundation — Create. Learn. Become.'

export default async function Image() {
  return renderOgImage({
    eyebrow: 'Ecodite Foundation',
    title: 'Create. Learn. Become.',
  })
}
