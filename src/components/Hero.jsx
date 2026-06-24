import React from 'react'
import { Button } from '@/components/ui/button'

export default function Hero({ onReserve, onOrder }) {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center text-center px-6 pt-36 pb-28 overflow-hidden"
      style={{
        backgroundImage: 'url(https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1920&q=80)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Dark forest-green tinted overlay */}
      <div className="absolute inset-0" style={{ background: 'rgba(10, 26, 20, 0.78)' }} />

      {/* Brass glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 55% at 50% 38%, rgba(203,161,77,0.07) 0%, transparent 70%)' }}
      />

      <div className="relative z-10">
        <span className="block text-[0.68rem] font-semibold tracking-[0.16em] uppercase text-primary mb-6 animate-fade-up-1">
          Est. 2019 &mdash; Open for Dinner
        </span>

        <h1 className="font-serif text-[clamp(3rem,8vw,6.5rem)] font-light leading-[1.04] tracking-tight mb-6 animate-fade-up-2">
          Food cooked with<br />
          <em className="text-primary not-italic italic">fire</em> &amp; intent.
        </h1>

        <p className="text-muted-foreground text-base max-w-sm mx-auto mb-10 leading-relaxed animate-fade-up-3">
          A wood-fired kitchen in the heart of the city. Seasonal ingredients, honest flavours, unhurried evenings.
        </p>

        <div className="flex gap-4 justify-center flex-wrap animate-fade-up-4">
          <Button size="lg" onClick={onReserve}>Reserve a table</Button>
          <Button size="lg" variant="outline" onClick={onOrder}>Order pickup</Button>
        </div>
      </div>

      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-16"
        style={{ background: 'linear-gradient(to bottom, transparent, hsl(38 53% 55% / 0.4))' }}
      />
    </section>
  )
}
