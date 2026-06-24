const RES_KEY   = 'goodeats:reservations'
const ORDER_KEY = 'goodeats:orders'
let _mem = {}

function sGet(key) {
  try {
    const raw = window.storage?.get ? window.storage.get(key) : null
    return raw ? JSON.parse(raw) : (_mem[key] || [])
  } catch (e) {
    return _mem[key] || []
  }
}

function sSet(key, val) {
  try {
    if (window.storage?.set) window.storage.set(key, JSON.stringify(val))
    _mem[key] = val
  } catch (e) {
    _mem[key] = val
  }
}

export const getReservations = () => sGet(RES_KEY)
export const getOrders       = () => sGet(ORDER_KEY)

export function pushReservation(r) {
  const a = getReservations()
  a.unshift(r)
  sSet(RES_KEY, a)
}

export function pushOrder(o) {
  const a = getOrders()
  a.unshift(o)
  sSet(ORDER_KEY, a)
}

export function clearAll() {
  sSet(RES_KEY, [])
  sSet(ORDER_KEY, [])
}
