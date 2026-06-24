import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { pushReservation } from '@/lib/storage'
import { phoneOK, todayStr } from '@/lib/utils'

const TIMES = [
  ['17:00','5:00 PM'],['17:30','5:30 PM'],['18:00','6:00 PM'],['18:30','6:30 PM'],
  ['19:00','7:00 PM'],['19:30','7:30 PM'],['20:00','8:00 PM'],['20:30','8:30 PM'],
  ['21:00','9:00 PM'],['21:30','9:30 PM'],
]

const inputCls = (err) =>
  `w-full bg-muted border rounded px-4 py-3 text-[0.88rem] text-foreground outline-none transition-colors appearance-none
   ${err ? 'border-destructive' : 'border-border focus:border-primary'}`

const selectCls = (err) =>
  inputCls(err) + ' bg-no-repeat bg-[right_1rem_center]'

export default function Reservation({ onSuccess }) {
  const [f, setF] = useState({ name:'', phone:'', date:'', time:'17:00', party:'2', email:'', notes:'' })
  const [err, setErr] = useState({})

  const up = (field) => (e) => setF(prev => ({ ...prev, [field]: e.target.value }))

  function validate() {
    const errs = {}
    if (!f.name.trim())   errs.name  = 'Please enter your name.'
    if (!phoneOK(f.phone)) errs.phone = 'Please enter a valid phone number (min 7 digits).'
    if (!f.date) {
      errs.date = 'Please select a date.'
    } else {
      const [y, m, d] = f.date.split('-').map(Number)
      const sel = new Date(y, m - 1, d)
      const today = new Date(); today.setHours(0, 0, 0, 0)
      if (sel < today) errs.date = 'Please select today or a future date.'
    }
    return errs
  }

  function handleSubmit(e) {
    e.preventDefault()
    const errs = validate()
    setErr(errs)
    if (Object.keys(errs).length) return

    const ref = 'GE-' + Math.floor(1000 + Math.random() * 9000)
    const res = { ref, ...f, createdAt: new Date().toISOString() }
    pushReservation(res)
    onSuccess(res)
    setF({ name:'', phone:'', date:'', time:'17:00', party:'2', email:'', notes:'' })
    setErr({})
  }

  const fg = (label, required, children) => (
    <div className="flex flex-col gap-1.5">
      <label className="text-[0.68rem] font-semibold tracking-[0.12em] uppercase text-muted-foreground">
        {label} {!required && <span className="opacity-50">(optional)</span>}
      </label>
      {children}
    </div>
  )

  return (
    <section id="reserve" className="py-24 px-6">
      <div className="max-w-2xl mx-auto">
        <span className="block text-[0.68rem] font-semibold tracking-[0.16em] uppercase text-primary mb-4">
          Secure your seat
        </span>
        <h2 className="font-serif text-[clamp(2rem,4vw,2.8rem)] font-light mb-10">Make a reservation</h2>

        <form onSubmit={handleSubmit} noValidate>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
            {fg('Full name', true,
              <>
                <input className={inputCls(err.name)} value={f.name} onChange={up('name')}
                  placeholder="Jane Smith" autoComplete="name" />
                {err.name && <p className="text-destructive text-xs mt-0.5">{err.name}</p>}
              </>
            )}
            {fg('Phone number', true,
              <>
                <input className={inputCls(err.phone)} value={f.phone} onChange={up('phone')}
                  placeholder="+1 (555) 000-0000" autoComplete="tel" type="tel" />
                {err.phone && <p className="text-destructive text-xs mt-0.5">{err.phone}</p>}
              </>
            )}
            {fg('Date', true,
              <>
                <input className={inputCls(err.date)} type="date" value={f.date} onChange={up('date')}
                  min={todayStr()}
                  style={{ colorScheme: 'dark' }} />
                {err.date && <p className="text-destructive text-xs mt-0.5">{err.date}</p>}
              </>
            )}
            {fg('Seating time', true,
              <select className={selectCls(false)} value={f.time} onChange={up('time')}
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%23cba14d' opacity='.55'/%3E%3C/svg%3E")` }}>
                {TIMES.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
              </select>
            )}
            {fg('Party size', true,
              <select className={selectCls(false)} value={f.party} onChange={up('party')}
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%23cba14d' opacity='.55'/%3E%3C/svg%3E")` }}>
                {[1,2,3,4,5,6].map(n => <option key={n} value={String(n)}>{n} guest{n !== 1 ? 's' : ''}</option>)}
                <option value="7+">7+ &mdash; please call us</option>
              </select>
            )}
            {fg('Email', false,
              <input className={inputCls(false)} type="email" value={f.email} onChange={up('email')}
                placeholder="jane@example.com" autoComplete="email" />
            )}
          </div>

          <div className="flex flex-col gap-1.5 mb-8">
            <label className="text-[0.68rem] font-semibold tracking-[0.12em] uppercase text-muted-foreground">
              Special requests <span className="opacity-50">(optional)</span>
            </label>
            <textarea
              className={inputCls(false) + ' resize-y min-h-[80px]'}
              value={f.notes} onChange={up('notes')}
              placeholder="Dietary requirements, occasion, seating preference…"
            />
          </div>

          <Button type="submit" size="lg">Confirm reservation</Button>
        </form>
      </div>
    </section>
  )
}
