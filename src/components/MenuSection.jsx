import React from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { MENU } from '@/lib/menu'

/* CSS variable overrides scoped to this section so all shadcn components
   automatically switch to the cream / warm-ink palette. */
const paperTheme = {
  /* fallback cream colour if the image fails to load */
  backgroundColor: '#f5eedb',
  backgroundImage:
    'url(https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?auto=format&fit=crop&w=1920&q=80)',
  backgroundSize: 'cover',
  backgroundPosition: 'center',

  /* re-skin shadcn colour tokens */
  '--foreground':           '20 40% 13%',   /* dark warm brown — item names */
  '--muted-foreground':     '28 28% 42%',   /* medium warm brown — descriptions */
  '--primary':              '40 72% 30%',   /* dark brass — prices, labels */
  '--primary-foreground':   '42 55% 94%',   /* cream — text on brass buttons */
  '--border':               '38 35% 72%',   /* warm tan — separators */
  '--card':                 '42 45% 97%',   /* near-white cream — card bg */
  '--card-foreground':      '20 40% 13%',
  '--muted':                '42 38% 93%',
  '--accent':               '42 38% 93%',
  '--accent-foreground':    '20 40% 13%',
  '--ring':                 '40 72% 30%',
}

export default function MenuSection({ onAdd }) {
  return (
    <section
      id="menu"
      className="relative py-24 px-6"
      style={paperTheme}
    >
      {/* Cream paper wash — lets texture peek through */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'rgba(245, 237, 215, 0.87)' }}
      />

      <div className="relative z-10">
        <div className="text-center max-w-md mx-auto mb-16">
          <span className="block text-[0.68rem] font-semibold tracking-[0.16em] uppercase text-primary mb-4">
            What we serve
          </span>
          <h2
            className="font-serif text-[clamp(2rem,4vw,3rem)] font-light"
            style={{ color: 'hsl(20 40% 13%)' }}
          >
            Tonight&rsquo;s menu
          </h2>
        </div>

        <div className="max-w-5xl mx-auto">
          {MENU.map((cat) => (
            <div key={cat.cat} className="mb-14">
              <div className="flex items-center gap-4 mb-6">
                <h3 className="font-serif text-[1.3rem] font-light italic text-primary whitespace-nowrap">
                  {cat.cat}
                </h3>
                <Separator className="flex-1" />
              </div>

              <div>
                {cat.items.map((item, ii) => (
                  <div key={item.id}>
                    <div className="flex items-start gap-6 py-5">
                      <div className="flex-1 min-w-0">
                        <div
                          className="text-[0.97rem] font-medium mb-1"
                          style={{ color: 'hsl(20 40% 13%)' }}
                        >
                          {item.name}
                        </div>
                        <div className="text-[0.81rem] text-muted-foreground leading-relaxed">
                          {item.desc}
                        </div>
                      </div>

                      <div className="flex flex-col items-end gap-2 flex-shrink-0">
                        <span className="font-serif text-[1.05rem] font-light text-primary">
                          ${item.price}
                        </span>
                        {item.orderable ? (
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-[0.68rem] h-7 px-3"
                            onClick={() => onAdd(item.id)}
                          >
                            Add
                          </Button>
                        ) : (
                          <Badge variant="muted">Dine-in only</Badge>
                        )}
                      </div>
                    </div>

                    {ii < cat.items.length - 1 && (
                      <Separator className="opacity-30" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
