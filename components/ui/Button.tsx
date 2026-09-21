import React from 'react'
import Link from 'next/link'
import clsx from 'clsx'

export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'inverse' | 'accent'
  /** For variant="secondary" placed on a dark (green) background, where the light-mode border/text would be unreadable. */
  onDark?: boolean
  size?: 'default' | 'small'
  href?: string
  arrow?: boolean
  children?: React.ReactNode
  className?: string
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  onClick?: React.MouseEventHandler<HTMLButtonElement>
}

const baseClasses =
  'inline-flex items-center justify-center gap-2 uppercase tracking-[.08em] font-semibold rounded-[6px] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sun-500 focus-visible:ring-offset-2 group'

const sizeClasses = {
  default: 'min-h-[48px] px-8 text-[13px]',
  small: 'min-h-[36px] px-4 text-[11px]',
}

const variantClasses = {
  primary:
    'bg-green-800 text-cream hover:bg-green-900 border border-transparent',
  secondary:
    'bg-transparent border border-green-800 text-green-800 hover:bg-green-800/5',
  inverse:
    'bg-cream text-green-900 hover:bg-cream/90 border border-transparent',
  accent:
    'bg-sun-500 text-green-950 hover:bg-sun-500/90 border border-transparent',
}

const secondaryOnDarkClasses =
  'bg-transparent border border-cream text-cream hover:bg-cream/10'

function ArrowIcon() {
  return (
    <span
      className="transition-transform duration-200 group-hover:translate-x-1"
      aria-hidden="true"
    >
      →
    </span>
  )
}

export default function Button({
  variant = 'primary',
  onDark = false,
  size = 'default',
  href,
  arrow,
  className,
  children,
  type = 'button',
  disabled,
  onClick,
}: ButtonProps) {
  const classes = clsx(
    baseClasses,
    sizeClasses[size],
    variant === 'secondary' && onDark ? secondaryOnDarkClasses : variantClasses[variant],
    disabled && 'opacity-50 cursor-not-allowed',
    className
  )

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
        {arrow && <ArrowIcon />}
      </Link>
    )
  }

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
      {arrow && <ArrowIcon />}
    </button>
  )
}
