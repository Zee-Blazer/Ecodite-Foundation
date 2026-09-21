import clsx from 'clsx'

export default function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={clsx('animate-pulse motion-reduce:animate-none bg-sage-100 rounded-[4px]', className)}
      aria-hidden="true"
    />
  )
}
