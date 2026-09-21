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
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
              <Skeleton key={i} className="aspect-square" />
            ))}
          </div>
        </Container>
      </section>
    </div>
  )
}
