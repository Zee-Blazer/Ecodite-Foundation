import { getEventBySlug } from '@/lib/content'
import { renderOgImage, ogImageSize, ogImageContentType } from '@/lib/og'

export const size = ogImageSize
export const contentType = ogImageContentType

export default async function Image({ params }: { params: { slug: string } }) {
  const event = getEventBySlug(params.slug)
  return renderOgImage({
    eyebrow: event ? event.location.value : 'Events',
    title: event ? event.title.value : 'Ecodite Foundation',
  })
}
