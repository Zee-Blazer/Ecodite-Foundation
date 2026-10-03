import { renderOgImage, ogImageSize, ogImageContentType } from '@/lib/og'

export const size = ogImageSize
export const contentType = ogImageContentType
export const alt = 'Ecodite Foundation — Learn, Create, Become.'

export default async function Image() {
  return renderOgImage({
    eyebrow: 'Ecodite Foundation',
    title: 'Learn, Create, Become.',
  })
}
