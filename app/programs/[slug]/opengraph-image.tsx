import { getProgramBySlug } from '@/lib/content'
import { renderOgImage, ogImageSize, ogImageContentType } from '@/lib/og'

export const size = ogImageSize
export const contentType = ogImageContentType

export default async function Image({ params }: { params: { slug: string } }) {
  const program = getProgramBySlug(params.slug)
  return renderOgImage({
    eyebrow: program ? program.category : 'Our programs',
    title: program ? program.title.value : 'Ecodite Foundation',
  })
}
