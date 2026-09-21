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
          <div className="flex flex-col divide-y divide-line border-t border-b border-line">
            {[0, 1, 2].map((i) => (
              <div key={i} className="flex items-center gap-6 py-6">
                <Skeleton className="h-14 w-16 shrink-0" />
                <Skeleton className="h-6 flex-1" />
                <Skeleton className="h-5 w-24 hidden md:block" />
              </div>
            ))}
          </div>
        </Container>
      </section>
    </div>
  )
}
