import Container from '@/components/ui/Container'
import Skeleton from '@/components/ui/Skeleton'

export default function Loading() {
  return (
    <div className="flex flex-col min-h-screen bg-cream">
      <section className="bg-green-800 py-16 md:py-24">
        <Container>
          <Skeleton className="h-6 w-32 mb-6 bg-white/10" />
          <Skeleton className="h-12 w-2/3 bg-white/10" />
        </Container>
      </section>
      <section className="py-16 md:py-24">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <Skeleton className="aspect-video" />
            <div className="flex flex-col gap-4 justify-center">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-4 w-5/6" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[0, 1, 2].map((i) => (
              <div key={i} className="flex flex-col gap-3">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-4 w-4/5" />
              </div>
            ))}
          </div>
        </Container>
      </section>
    </div>
  )
}
