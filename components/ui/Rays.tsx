'use client'

import React, { useEffect, useRef, useState, useMemo } from 'react'
import clsx from 'clsx'

export interface RaysProps extends React.SVGProps<SVGSVGElement> {
  opacity?: number
  scale?: number
  animate?: boolean
}

// Deterministic "random" lengths for each ray line
const RAY_LENGTHS = [52, 44, 58, 41, 55, 47, 60, 43, 56, 45, 53, 48, 57, 42, 54, 46]

const Rays: React.FC<RaysProps> = ({
  className,
  opacity = 0.08,
  scale = 1,
  animate = true,
  ...props
}) => {
  const ref = useRef<SVGSVGElement>(null)
  const [isRevealed, setIsRevealed] = useState(!animate)

  useEffect(() => {
    if (!animate) return

    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRevealed(true)
          observer.unobserve(el)
        }
      },
      { threshold: 0.1 }
    )

    observer.observe(el)

    return () => {
      observer.unobserve(el)
    }
  }, [animate])

  const numLines = 16
  const lines = useMemo(
    () =>
      Array.from({ length: numLines }).map((_, i) => {
        const angle = (i * 360) / numLines
        const length = RAY_LENGTHS[i]
        return { angle, length, index: i }
      }),
    []
  )

  return (
    <svg
      ref={ref}
      viewBox="0 0 100 100"
      className={clsx(
        'absolute inset-0 w-full h-full pointer-events-none',
        className
      )}
      style={{
        opacity,
        transform: `scale(${scale})`,
      }}
      aria-hidden="true"
      {...props}
    >
      {lines.map(({ angle, length, index }) => (
        <line
          key={index}
          x1="50"
          y1="50"
          x2="50"
          y2={50 - length}
          transform={`rotate(${angle} 50 50)`}
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          style={{
            strokeDasharray: '100',
            strokeDashoffset: isRevealed ? 0 : 100,
            transition: `stroke-dashoffset 600ms cubic-bezier(0.22, 1, 0.36, 1) ${index * 20}ms`,
          }}
        />
      ))}
    </svg>
  )
}

export default Rays
