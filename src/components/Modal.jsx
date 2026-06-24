import React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { fmtDate, fmtTime } from '@/lib/utils'

function DetailRow({ label, value }) {
  return (
    <div className="flex justify-between text-[0.84rem] py-1.5">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium text-right max-w-[55%]">{value}</span>
    </div>
  )
}

export default function Modal({ type, data, onClose }) {
  if (!data) return null

  const isRes = type === 'res'

  return (
    <div
      className="fixed inset-0 z-[300] flex items-center justify-center p-6 bg-black/60"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="bg-muted border border-border rounded-md p-8 max-w-[440px] w-full text-center">
        {/* Icon */}
        <div className="w-12 h-12 mx-auto mb-5 border border-primary rounded-full flex items-center justify-center text-primary text-xl">
          ✓
        </div>

        <h3 className="font-serif text-[1.6rem] font-light mb-1">
          {isRes ? "You're booked." : 'Order received.'}
        </h3>

        <div className="font-serif text-[2rem] font-light text-primary my-4">
          {isRes ? data.ref : data.num}
        </div>

        {/* Details card */}
        <Card className="text-left mb-4">
          <CardContent className="p-5">
            {isRes ? (
              <>
                <DetailRow label="Name"  value={data.name} />
                <Separator className="my-1 opacity-50" />
                <DetailRow label="Date"  value={fmtDate(data.date)} />
                <Separator className="my-1 opacity-50" />
                <DetailRow label="Time"  value={fmtTime(data.time)} />
                <Separator className="my-1 opacity-50" />
                <DetailRow
                  label="Party"
                  value={data.party === '7+' ? '7+ guests' : `${data.party} guest${data.party == 1 ? '' : 's'}`}
                />
                {data.phone && (
                  <>
                    <Separator className="my-1 opacity-50" />
                    <DetailRow label="Phone" value={data.phone} />
                  </>
                )}
              </>
            ) : (
              <>
                <DetailRow label="Name"   value={data.name} />
                <Separator className="my-1 opacity-50" />
                <DetailRow label="Pickup" value={data.pickupLabel} />
                <Separator className="my-1 opacity-50" />
                <DetailRow label="Items"  value={`${data.items.length} item${data.items.length !== 1 ? 's' : ''}`} />
                <Separator className="my-1 opacity-50" />
                <DetailRow label="Total"  value={`$${data.total.toFixed(2)} — pay at counter`} />
              </>
            )}
          </CardContent>
        </Card>

        <p className="text-[0.78rem] text-muted-foreground leading-relaxed mb-6">
          {isRes
            ? 'A confirmation text will be sent to your phone shortly. See you soon!'
            : "Pay at the counter when you arrive. We'll have everything ready."}
        </p>

        <Button className="w-full" size="lg" onClick={onClose}>Done</Button>
      </div>
    </div>
  )
}
