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
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <Skeleton className="lg:col-span-7 aspect-[4/5]" />
            <div className="lg:col-span-5 flex flex-col gap-8">
              <Skeleton className="aspect-[4/5]" />
              <Skeleton className="aspect-[4/5]" />
            </div>
          </div>
        </Container>
      </section>
    </div>
  )
}
