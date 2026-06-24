import React from 'react'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

const STEPS = [
  { title: 'Order online',       body: 'Browse our full menu and add what you\'d like. Drinks are dine-in only.' },
  { title: 'Pick a slot',        body: 'Choose from the next available 15-minute pickup windows.' },
  { title: 'Pay at the counter', body: 'Cash or card — we\'ll have everything ready when you arrive.' },
]

export default function PickupStrip({ onOrder }) {
  return (
    <>
      <Separator />
      <section className="bg-card py-20 px-6">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
          <div>
            <span className="block text-[0.68rem] font-semibold tracking-[0.16em] uppercase text-primary mb-4">
              Take it home
            </span>
            <h2 className="font-serif text-[clamp(1.7rem,3vw,2.3rem)] font-light leading-snug mb-4">
              Pickup orders, ready when you are.
            </h2>
            <p className="text-muted-foreground text-[0.91rem] leading-[1.75] mb-6">
              Browse the menu, build your order, and collect in as little as 20 minutes.
              Pay at the counter&mdash;no apps, no accounts.
            </p>
            <Button size="lg" onClick={onOrder}>Start your order</Button>
          </div>

          <div className="flex flex-col gap-5">
            {STEPS.map(({ title, body }) => (
              <div key={title} className="flex gap-3 items-start">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                <p className="text-[0.87rem] text-muted-foreground leading-relaxed">
                  <strong className="text-foreground font-medium">{title}</strong> &mdash; {body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
