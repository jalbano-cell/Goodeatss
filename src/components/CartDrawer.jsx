import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { pushOrder } from '@/lib/storage'
import { fmt$, phoneOK, pickupSlots } from '@/lib/utils'

const inputCls = (err) =>
  `w-full bg-background border rounded px-3.5 py-2.5 text-[0.86rem] text-foreground outline-none transition-colors appearance-none
   ${err ? 'border-destructive' : 'border-border focus:border-primary'}`

export default function CartDrawer({ open, cart, cartTotal, onClose, onQty, onOrderSuccess }) {
  const [showCo, setShowCo] = useState(false)
  const [cf, setCf] = useState({ name: '', phone: '', time: '' })
  const [cerr, setCerr] = useState({})

  const cup = (f) => (e) => setCf(p => ({ ...p, [f]: e.target.value }))

  function submitOrder() {
    const errs = {}
    if (!cf.name.trim())    errs.name  = 'Please enter your name.'
    if (!phoneOK(cf.phone)) errs.phone = 'Please enter a valid phone number.'
    setCerr(errs)
    if (Object.keys(errs).length) return

    const slots  = pickupSlots()
    const picked = cf.time || slots[0].value
    const label  = slots.find(s => s.value === picked)?.label || picked
    const num    = '#' + Math.floor(100 + Math.random() * 900)
    const order  = {
      num, name: cf.name, phone: cf.phone,
      pickupTime: picked, pickupLabel: label,
      items: cart.map(i => ({ name: i.name, qty: i.qty, price: i.price })),
      total: cartTotal,
      createdAt: new Date().toISOString(),
    }
    pushOrder(order)
    setCf({ name: '', phone: '', time: '' })
    setCerr({})
    setShowCo(false)
    onOrderSuccess(order)
  }

  const slots = pickupSlots()

  return (
    <>
      {/* Overlay */}
      {open && (
        <div className="fixed inset-0 bg-black/50 z-[200]" onClick={onClose} />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 bottom-0 z-[201] flex flex-col bg-muted border-l border-border transition-transform duration-[340ms] ease-[cubic-bezier(0.4,0,0.2,1)]
          w-full max-w-[420px] ${open ? 'translate-x-0' : 'translate-x-full'}`}
        role="dialog"
        aria-label="Your order"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-border flex-shrink-0">
          <h3 className="font-serif text-xl font-light">Your order</h3>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground text-xl transition-colors" aria-label="Close">
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          {cart.length === 0 ? (
            <div className="text-center py-14 text-muted-foreground">
              <div className="text-4xl mb-3">&#127859;</div>
              <p className="text-[0.88rem] leading-relaxed">
                Your order is empty.<br />Browse the menu to get started.
              </p>
            </div>
          ) : (
            cart.map(item => (
              <div key={item.id} className="flex items-center gap-4 py-4 border-b border-border last:border-0">
                <div className="flex-1 min-w-0">
                  <div className="text-[0.88rem] font-medium mb-0.5">{item.name}</div>
                  <div className="text-[0.8rem] text-primary">{fmt$(item.price * item.qty)}</div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={() => onQty(item.id, -1)}
                    className="w-7 h-7 border border-border rounded flex items-center justify-center text-muted-foreground hover:border-primary hover:text-primary transition-all"
                    aria-label="Remove one"
                  >&minus;</button>
                  <span className="text-[0.88rem] w-5 text-center">{item.qty}</span>
                  <button
                    onClick={() => onQty(item.id, 1)}
                    className="w-7 h-7 border border-border rounded flex items-center justify-center text-muted-foreground hover:border-primary hover:text-primary transition-all"
                    aria-label="Add one"
                  >+</button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="px-6 py-5 border-t border-border flex-shrink-0">
            <div className="flex justify-between items-center mb-5">
              <span className="text-[0.7rem] font-semibold tracking-[0.12em] uppercase text-muted-foreground">Total</span>
              <span className="font-serif text-[1.5rem] font-light text-primary">{fmt$(cartTotal)}</span>
            </div>

            {showCo ? (
              <div>
                <Separator className="mb-5" />
                <div className="flex flex-col gap-4 mb-4">
                  <div>
                    <label className="block text-[0.68rem] font-semibold tracking-[0.12em] uppercase text-muted-foreground mb-1.5">
                      Your name
                    </label>
                    <input className={inputCls(cerr.name)} value={cf.name} onChange={cup('name')}
                      placeholder="Jane Smith" autoComplete="name" />
                    {cerr.name && <p className="text-destructive text-xs mt-1">{cerr.name}</p>}
                  </div>
                  <div>
                    <label className="block text-[0.68rem] font-semibold tracking-[0.12em] uppercase text-muted-foreground mb-1.5">
                      Phone number
                    </label>
                    <input className={inputCls(cerr.phone)} value={cf.phone} onChange={cup('phone')}
                      placeholder="+1 (555) 000-0000" type="tel" autoComplete="tel" />
                    {cerr.phone && <p className="text-destructive text-xs mt-1">{cerr.phone}</p>}
                  </div>
                  <div>
                    <label className="block text-[0.68rem] font-semibold tracking-[0.12em] uppercase text-muted-foreground mb-1.5">
                      Pickup time
                    </label>
                    <select
                      className={inputCls(false)}
                      value={cf.time || slots[0].value}
                      onChange={cup('time')}
                      style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%23cba14d' opacity='.55'/%3E%3C/svg%3E")`,
                        backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', paddingRight: '2.5rem' }}
                    >
                      {slots.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
                    </select>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button variant="outline" className="flex-1" onClick={() => setShowCo(false)}>Back</Button>
                  <Button className="flex-[2]" onClick={submitOrder}>Place order</Button>
                </div>
              </div>
            ) : (
              <Button className="w-full" size="lg" onClick={() => setShowCo(true)}>
                Proceed to checkout
              </Button>
            )}
          </div>
        )}
      </div>
    </>
  )
}
