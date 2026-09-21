import Container from '@/components/ui/Container'
import Skeleton from '@/components/ui/Skeleton'

export default function Loading() {
  return (
    <div className="flex flex-col min-h-screen">
      <section className="bg-green-800 py-16 md:py-24">
        <Container>
          <Skeleton className="h-6 w-32 mb-6 bg-white/10" />
          <Skeleton className="h-12 w-2/3 bg-white/10" />
        </Container>
      </section>
      <section className="py-16 md:py-24">
        <Container width="reading">
          <Skeleton className="aspect-video mb-8" />
          <Skeleton className="h-4 w-full mb-3" />
          <Skeleton className="h-4 w-5/6 mb-3" />
          <Skeleton className="h-4 w-2/3" />
        </Container>
      </section>
    </div>
  )
}
