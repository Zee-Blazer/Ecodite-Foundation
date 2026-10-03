'use client'

import React, { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'
import Logo from '../ui/Logo'
import Button from '../ui/Button'
import Container from '../ui/Container'
import MobileMenu from './MobileMenu'
import SearchTrigger from '../ui/SearchTrigger'
import type { NavItem, SocialLink } from '../../types/content'

export interface NavbarClientProps {
  navItems: NavItem[]
  socialLinks: SocialLink[]
}

export default function NavbarClient({
  navItems,
  socialLinks,
}: NavbarClientProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isTransparent, setIsTransparent] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  const checkTransparency = useCallback(() => {
    const hasHero = document.querySelector('[data-hero]')
    setIsTransparent(!!hasHero)
  }, [])

  useEffect(() => {
    // Defer the DOM check to after paint
    requestAnimationFrame(checkTransparency)

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [pathname, checkTransparency])

  const transparentState = isTransparent && !isScrolled && !isMobileMenuOpen

  return (
    <>
      <header
        role="banner"
        className={clsx(
          'fixed top-0 left-0 right-0 z-40 transition-all duration-200',
          transparentState
            ? 'bg-transparent text-cream'
            : 'bg-cream text-ink border-b border-line',
          isScrolled ? 'h-[64px]' : 'h-[80px]'
        )}
      >
        <Container
          width="wide"
          className="h-full flex items-center justify-between"
        >
          <Link href="/" className="flex-shrink-0" aria-label="Home">
            <Logo
              variant={transparentState ? 'light' : 'default'}
              size={isScrolled ? 'sm' : 'md'}
              className="hidden md:flex"
            />
            <Logo
              variant={transparentState ? 'light' : 'default'}
              size="sm"
              showWordmark={false}
              className="flex md:hidden"
            />
          </Link>

          <nav
            className="hidden lg:flex items-center gap-8 h-full"
            aria-label="Main Navigation"
          >
            {navItems.map((item) => {
              const isActive =
                pathname === item.href ||
                (pathname?.startsWith(item.href) && item.href !== '/')
              const hasChildren = item.children && item.children.length > 0

              if (hasChildren) {
                return (
                  <div key={item.label} className="relative group h-full flex items-center">
                    <Link
                      href={item.href}
                      className={clsx(
                        'text-[15px] font-medium transition-colors h-full flex items-center gap-1.5 border-b-2',
                        isActive
                          ? 'border-sun-500'
                          : 'border-transparent hover:border-sun-500/50'
                      )}
                    >
                      <span>{item.label}</span>
                      <svg
                        className="w-3.5 h-3.5 transition-transform duration-200 group-hover:rotate-180 opacity-70"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </Link>

                    {/* Dropdown Menu */}
                    <div className="absolute top-[calc(100%-2px)] left-0 min-w-[220px] py-2 bg-cream text-ink rounded-xl shadow-xl border border-line opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-200 z-50 before:content-[''] before:absolute before:-top-3 before:left-0 before:right-0 before:h-3">
                      {item.children!.map((child) => {
                        const isChildActive = pathname === child.href;
                        return (
                          <Link
                            key={child.label}
                            href={child.href}
                            className={clsx(
                              "block px-4 py-2.5 text-sm font-medium transition-colors",
                              isChildActive
                                ? "text-sun-700 bg-sage-100/80 font-semibold"
                                : "text-ink hover:text-sun-700 hover:bg-sage-100/60"
                            )}
                          >
                            {child.label}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                )
              }

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={clsx(
                    'text-[15px] font-medium transition-colors h-full flex items-center border-b-2',
                    isActive
                      ? 'border-sun-500'
                      : 'border-transparent hover:border-sun-500/50'
                  )}
                >
                  {item.label}
                </Link>
              )
            })}
          </nav>

          <div className="flex items-center gap-3">
            <SearchTrigger />

            <Button
              href="/donate"
              variant={transparentState ? 'inverse' : 'primary'}
              size="small"
              className="hidden sm:inline-flex"
            >
              DONATE
            </Button>

            <button
              className="lg:hidden p-2 -mr-2"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open Menu"
              aria-expanded={isMobileMenuOpen}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="6" x2="20" y2="6" />
                <line x1="4" y1="18" x2="20" y2="18" />
              </svg>
            </button>
          </div>
        </Container>
      </header>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        navItems={navItems}
        socialLinks={socialLinks}
      />
    </>
  )
}
