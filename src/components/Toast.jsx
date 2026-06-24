import React from 'react'

export default function Toast({ msg, show }) {
  return (
    <div
      className={`fixed bottom-8 left-1/2 z-[500] pointer-events-none
        px-5 py-3 rounded border border-border bg-muted
        text-[0.84rem] font-medium whitespace-nowrap
        transition-all duration-300
        ${show ? '-translate-x-1/2 translate-y-0 opacity-100' : '-translate-x-1/2 translate-y-20 opacity-0'}`}
      style={{ borderLeft: '3px solid hsl(38 53% 55%)' }}
    >
      {msg}
    </div>
  )
}
