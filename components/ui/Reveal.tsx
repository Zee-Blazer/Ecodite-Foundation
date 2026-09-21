'use client'

import React, { useEffect, useRef, useState } from 'react'
import clsx from 'clsx'

export interface RevealProps extends React.HTMLAttributes<HTMLDivElement> {
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right'
  stagger?: boolean
  once?: boolean
}

const Reveal: React.FC<RevealProps> = ({
  children,
  className,
  delay = 0,
  direction = 'up',
  stagger = false,
  once = true,
  ...props
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const [isRevealed, setIsRevealed] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRevealed(true)
          if (once) {
            observer.unobserve(el)
          }
        } else if (!once) {
          setIsRevealed(false)
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
      }
    )

    observer.observe(el)

    return () => {
      observer.unobserve(el)
    }
  }, [once])

  const transformClasses = {
    up: 'translate-y-6',
    down: '-translate-y-6',
    left: 'translate-x-6',
    right: '-translate-x-6',
  }

  return (
    <div
      ref={ref}
      className={clsx(
        'transition-all duration-600 ease-[cubic-bezier(0.25,1,0.5,1)] motion-reduce:transition-none motion-reduce:opacity-100 motion-reduce:transform-none',
        isRevealed
          ? 'opacity-100 translate-x-0 translate-y-0'
          : clsx('opacity-0', transformClasses[direction]),
        className
      )}
      style={{
        transitionDelay: `${delay}ms`,
      }}
      {...props}
    >
      {stagger
        ? React.Children.map(children, (child, index) => {
            if (React.isValidElement<{ style?: React.CSSProperties }>(child)) {
              return React.cloneElement(child, {
                style: {
                  ...(child.props.style || {}),
                  transitionDelay: `${delay + index * 80}ms`,
                },
              })
            }
            return child
          })
        : children}
    </div>
  )
}

export default Reveal
