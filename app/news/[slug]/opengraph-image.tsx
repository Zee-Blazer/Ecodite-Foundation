import { getNewsBySlug } from '@/lib/content'
import { renderOgImage, ogImageSize, ogImageContentType } from '@/lib/og'

export const size = ogImageSize
export const contentType = ogImageContentType

export default async function Image({ params }: { params: { slug: string } }) {
  const article = getNewsBySlug(params.slug)
  return renderOgImage({
    eyebrow: article ? article.category : 'News & updates',
    title: article ? article.title.value : 'Ecodite Foundation',
  })
}
