import React, { useState, useEffect } from 'react'
import { Badge } from '@/components/ui/badge'

export default function Nav({ cartCount, onCartOpen, onKitchen, onHome }) {
  const [scrolled, setScrolled] = useState(false)
  const [mobOpen, setMobOpen] = useState(false)

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', h, { passive: true })
    return () => window.removeEventListener('scroll', h)
  }, [])

  const navLink = 'text-[0.75rem] font-medium tracking-[0.08em] uppercase text-muted-foreground hover:text-foreground transition-colors'

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 transition-all duration-300 ${
        scrolled ? 'py-3.5 bg-background/90 backdrop-blur-md border-b border-border' : 'py-5'
      }`}>
        <a href="#" onClick={(e) => { e.preventDefault(); onHome() }}
          className="font-serif text-xl text-foreground leading-none">
          Good <span className="text-primary">Eats</span>
        </a>

        <ul className="hidden md:flex items-center gap-8 list-none m-0 p-0">
          <li><a href="#menu"    className={navLink}>Menu</a></li>
          <li><a href="#reserve" className={navLink}>Reserve</a></li>
          <li>
            <a href="#" onClick={(e) => { e.preventDefault(); onKitchen() }} className={navLink}>
              Kitchen view
            </a>
          </li>
        </ul>

        <div className="flex items-center gap-3">
          <button
            onClick={onCartOpen}
            className="relative flex items-center gap-2 px-4 py-2 border border-border rounded text-[0.75rem] font-medium tracking-wide text-muted-foreground hover:border-primary hover:text-primary transition-all"
          >
            Order pickup
            {cartCount > 0 && (
              <Badge className="absolute -top-2 -right-2 w-5 h-5 p-0 flex items-center justify-center rounded-full text-[0.6rem]">
                {cartCount}
              </Badge>
            )}
          </button>

          <button
            className="md:hidden flex flex-col gap-[5px] p-1"
            onClick={() => setMobOpen(true)}
            aria-label="Open menu"
          >
            <span className="block w-[22px] h-px bg-foreground" />
            <span className="block w-[22px] h-px bg-foreground" />
            <span className="block w-[22px] h-px bg-foreground" />
          </button>
        </div>
      </nav>

      {mobOpen && (
        <div className="fixed inset-0 z-[99] bg-background flex flex-col items-center justify-center gap-10">
          <button
            onClick={() => setMobOpen(false)}
            className="absolute top-6 right-8 text-2xl text-muted-foreground hover:text-foreground"
            aria-label="Close menu"
          >
            ✕
          </button>
          {[
            { label: 'Menu',         href: '#menu',    action: null },
            { label: 'Reserve',      href: '#reserve', action: null },
            { label: 'Order pickup', href: '#',        action: onCartOpen },
            { label: 'Kitchen view', href: '#',        action: onKitchen },
          ].map(({ label, href, action }) => (
            <a
              key={label}
              href={href}
              onClick={(e) => { if (action) e.preventDefault(); setMobOpen(false); action?.() }}
              className="font-serif text-4xl font-light text-muted-foreground hover:text-foreground transition-colors"
            >
              {label}
            </a>
          ))}
        </div>
      )}
    </>
  )
}
