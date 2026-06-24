import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function esc(str) {
  if (!str) return ''
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

export function fmt$(n) {
  return '$' + Number(n).toFixed(2)
}

export function fmtDate(s) {
  if (!s) return ''
  const [y, m, d] = s.split('-').map(Number)
  return new Date(y, m - 1, d).toLocaleDateString('en-CA', {
    weekday: 'long', month: 'long', day: 'numeric', year: 'numeric',
  })
}

export function fmtTime(s) {
  if (!s) return ''
  const [h, m] = s.split(':').map(Number)
  return `${h > 12 ? h - 12 : h || 12}:${String(m).padStart(2, '0')} ${h >= 12 ? 'PM' : 'AM'}`
}

export function relTime(iso) {
  const d = Math.floor((Date.now() - new Date(iso)) / 1000)
  if (d < 60)    return 'Just now'
  if (d < 3600)  return Math.floor(d / 60) + 'm ago'
  if (d < 86400) return Math.floor(d / 3600) + 'h ago'
  return Math.floor(d / 86400) + 'd ago'
}

export function phoneOK(v) {
  return v.replace(/\D/g, '').length >= 7
}

export function pickupSlots() {
  const now = new Date()
  now.setMinutes(now.getMinutes() + 20)
  const rem = 15 - (now.getMinutes() % 15)
  if (rem < 15) now.setMinutes(now.getMinutes() + rem)
  return Array.from({ length: 8 }, (_, i) => {
    const t = new Date(now.getTime() + i * 15 * 60000)
    const h = t.getHours(), m = t.getMinutes()
    const label = `${h > 12 ? h - 12 : h || 12}:${String(m).padStart(2, '0')} ${h >= 12 ? 'PM' : 'AM'}`
    const value = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`
    return { value, label }
  })
}

export function todayStr() {
  const t = new Date()
  return `${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, '0')}-${String(t.getDate()).padStart(2, '0')}`
}
