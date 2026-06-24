import React from 'react'
import { Separator } from '@/components/ui/separator'

export default function Footer({ onKitchen }) {
  return (
    <footer className="px-6 pt-16 pb-10 max-w-5xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
        <div>
          <div className="font-serif text-xl text-foreground mb-4 leading-none">
            Good <span className="text-primary">Eats</span>
          </div>
          <p className="text-[0.83rem] text-muted-foreground leading-[1.75] max-w-[220px]">
            A wood-fired restaurant in the heart of the city. Open for dinner, Tuesday through Sunday.
          </p>
        </div>

        <div>
          <h4 className="text-[0.68rem] font-semibold tracking-[0.13em] uppercase text-primary mb-4">Hours</h4>
          <p className="text-[0.84rem] text-muted-foreground leading-[1.85]">
            Tue &ndash; Thu: 5 &ndash; 10 PM<br />
            Fri &ndash; Sat: 5 &ndash; 11 PM<br />
            Sun: 4 &ndash; 9 PM<br />
            Mon: Closed
          </p>
        </div>

        <div>
          <h4 className="text-[0.68rem] font-semibold tracking-[0.13em] uppercase text-primary mb-4">Find us</h4>
          <p className="text-[0.84rem] text-muted-foreground leading-[1.85]">
            42 Ember Lane<br />
            Toronto, ON M5V 1A1
          </p>
          <p className="text-[0.84rem] text-muted-foreground leading-[1.85] mt-3">
            <a href="tel:+14165550199" className="hover:text-foreground transition-colors">(416) 555-0199</a><br />
            <a href="mailto:hello@goodeatsTO.ca" className="hover:text-foreground transition-colors">hello@goodeatsTO.ca</a>
          </p>
        </div>
      </div>

      <Separator className="mb-6" />

      <div className="flex flex-col sm:flex-row justify-between items-center gap-3 text-[0.76rem] text-muted-foreground/50">
        <span>&copy; 2026 Good Eats Restaurant</span>
        <span>
          Designed &amp; Managed by{' '}
          <a
            href="https://omnigriddigital.ca"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-muted-foreground transition-colors underline underline-offset-2"
          >
            Omnigrid Digital
          </a>
        </span>
      </div>
    </footer>
  )
}
