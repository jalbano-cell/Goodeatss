import React from 'react'
import { Card } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

const STATS = [
  { n: '7',  l: 'Years open' },
  { n: '12', l: 'Dishes made daily' },
  { n: '4',  l: 'Wood species rotated' },
  { n: '1',  l: 'Kitchen, no shortcuts' },
]

export default function About() {
  return (
    <section className="py-28 px-6">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-20 items-center">
        <div>
          <span className="block text-[0.68rem] font-semibold tracking-[0.16em] uppercase text-primary mb-5">
            Our story
          </span>
          <h2 className="font-serif text-[clamp(1.8rem,3vw,2.6rem)] font-light leading-snug mb-5">
            Where the flame<br />does the talking.
          </h2>
          <Separator className="mb-5 w-12 bg-primary/30" />
          <p className="text-muted-foreground text-[0.93rem] leading-[1.8]">
            Good Eats started as a simple idea: cook beautiful ingredients over an open wood fire,
            pour good wine, and let people linger. No gimmicks&mdash;just a kitchen that takes its
            time, a room that feels warm, and dishes you&rsquo;ll think about tomorrow.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-px bg-border border border-border rounded overflow-hidden">
          {STATS.map(({ n, l }) => (
            <Card key={l} className="rounded-none border-0 text-center py-7 px-6">
              <div className="font-serif text-[2.5rem] font-light text-primary leading-none mb-2">{n}</div>
              <div className="text-[0.7rem] font-semibold tracking-[0.12em] uppercase text-muted-foreground">{l}</div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
