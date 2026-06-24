import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { getReservations, getOrders, clearAll } from '@/lib/storage'
import { fmtDate, fmtTime, fmt$, relTime } from '@/lib/utils'

function KField({ label, value }) {
  return (
    <div>
      <div className="text-[0.63rem] font-semibold tracking-[0.12em] uppercase text-muted-foreground/60 mb-0.5">{label}</div>
      <div className="text-[0.86rem]">{value}</div>
    </div>
  )
}

export default function Kitchen({ onBack }) {
  const [tab, setTab] = useState('orders')
  const [reservations, setReservations] = useState([])
  const [orders, setOrders] = useState([])

  useEffect(() => {
    setReservations(getReservations())
    setOrders(getOrders())
  }, [])

  function reset() {
    if (!confirm('Clear all reservations and orders? This cannot be undone.')) return
    clearAll()
    setReservations([])
    setOrders([])
  }

  return (
    <div className="min-h-screen px-6 py-24">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <span className="block text-[0.68rem] font-semibold tracking-[0.16em] uppercase text-primary mb-3">
              Staff view
            </span>
            <h1 className="font-serif text-[2.4rem] font-light">Kitchen dashboard</h1>
          </div>
          <div className="flex flex-col items-start sm:items-end gap-3">
            <div className="flex gap-6 text-[0.82rem] text-muted-foreground">
              <span>
                <Badge className="mr-1.5 font-serif text-[1rem] font-light px-0 py-0 bg-transparent text-primary border-0 tracking-normal normal-case">
                  {reservations.length}
                </Badge>
                reservations
              </span>
              <span>
                <Badge className="mr-1.5 font-serif text-[1rem] font-light px-0 py-0 bg-transparent text-primary border-0 tracking-normal normal-case">
                  {orders.length}
                </Badge>
                orders
              </span>
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={onBack}>Back to site</Button>
              <Button size="sm" variant="danger" onClick={reset}>Reset demo data</Button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-border mb-8">
          {['orders', 'reservations'].map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-6 py-3 text-[0.75rem] font-semibold tracking-[0.08em] uppercase transition-colors border-b-2 -mb-px
                ${tab === t ? 'text-primary border-primary' : 'text-muted-foreground border-transparent hover:text-foreground'}`}
            >
              {t === 'orders' ? 'Pickup orders' : 'Reservations'}
            </button>
          ))}
        </div>

        {/* Orders panel */}
        {tab === 'orders' && (
          <div>
            {orders.length === 0 ? (
              <div className="text-center py-20 text-muted-foreground">
                <div className="text-4xl mb-3">&#127859;</div>
                <p className="text-[0.88rem] leading-relaxed">
                  No pickup orders yet.<br />They&rsquo;ll appear here as they come in.
                </p>
              </div>
            ) : orders.map(o => (
              <Card key={o.num} className="mb-4">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-5">
                    <span className="font-serif text-[1.3rem] font-light text-primary">{o.num}</span>
                    <Badge variant="muted">{relTime(o.createdAt)}</Badge>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-5">
                    <KField label="Name"   value={o.name} />
                    <KField label="Phone"  value={o.phone} />
                    <KField label="Pickup" value={o.pickupLabel || fmtTime(o.pickupTime)} />
                    <KField label="Total"  value={fmt$(o.total)} />
                  </div>
                  <Separator className="mb-4" />
                  <p className="text-[0.84rem] text-muted-foreground leading-relaxed">
                    {o.items.map(i => (
                      <span key={i.name} className="mr-3">
                        <strong className="text-foreground font-medium">{i.qty}&times;</strong> {i.name}
                      </span>
                    ))}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Reservations panel */}
        {tab === 'reservations' && (
          <div>
            {reservations.length === 0 ? (
              <div className="text-center py-20 text-muted-foreground">
                <div className="text-4xl mb-3">&#128197;</div>
                <p className="text-[0.88rem] leading-relaxed">
                  No reservations yet.<br />New bookings will appear here.
                </p>
              </div>
            ) : reservations.map(r => (
              <Card key={r.ref} className="mb-4">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-5">
                    <span className="font-serif text-[1.3rem] font-light text-primary">{r.ref}</span>
                    <Badge variant="muted">{relTime(r.createdAt)}</Badge>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    <KField label="Name"  value={r.name} />
                    <KField label="Phone" value={r.phone} />
                    <KField label="Date"  value={fmtDate(r.date)} />
                    <KField label="Time"  value={fmtTime(r.time)} />
                    <KField label="Party" value={r.party === '7+' ? '7+ guests' : `${r.party} guest${r.party == 1 ? '' : 's'}`} />
                    {r.email && <KField label="Email" value={r.email} />}
                    {r.notes && (
                      <div className="col-span-2 sm:col-span-3">
                        <KField label="Notes" value={r.notes} />
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
