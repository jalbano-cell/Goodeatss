import React, { useState, useCallback } from 'react'
import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import About from '@/components/About'
import MenuSection from '@/components/MenuSection'
import Reservation from '@/components/Reservation'
import PickupStrip from '@/components/PickupStrip'
import Footer from '@/components/Footer'
import CartDrawer from '@/components/CartDrawer'
import Kitchen from '@/components/Kitchen'
import Modal from '@/components/Modal'
import Toast from '@/components/Toast'
import { allItems } from '@/lib/menu'

export default function App() {
  const [view, setView] = useState('main')
  const [cart, setCart] = useState([])
  const [cartOpen, setCartOpen] = useState(false)
  const [modal, setModal] = useState(null)
  const [toast, setToast] = useState({ msg: '', show: false })

  const cartCount = cart.reduce((s, i) => s + i.qty, 0)
  const cartTotal = cart.reduce((s, i) => s + i.price * i.qty, 0)

  const showToast = useCallback((msg) => {
    setToast({ msg, show: true })
    setTimeout(() => setToast(t => ({ ...t, show: false })), 2600)
  }, [])

  const addToCart = useCallback((id) => {
    const item = allItems().find(i => i.id === id)
    if (!item) return
    setCart(prev => {
      const ex = prev.find(i => i.id === id)
      if (ex) return prev.map(i => i.id === id ? { ...i, qty: i.qty + 1 } : i)
      return [...prev, { id: item.id, name: item.name, price: item.price, qty: 1 }]
    })
    showToast(item.name + ' added to order')
  }, [showToast])

  const changeQty = useCallback((id, delta) => {
    setCart(prev => prev.map(i => i.id === id ? { ...i, qty: i.qty + delta } : i).filter(i => i.qty > 0))
  }, [])

  const showKitchen = () => { setView('kitchen'); window.scrollTo(0, 0) }
  const showMain    = () => { setView('main');    window.scrollTo(0, 0) }

  return (
    <>
      <Nav
        cartCount={cartCount}
        onCartOpen={() => setCartOpen(true)}
        onKitchen={showKitchen}
        onHome={showMain}
      />

      {view === 'main' && (
        <main>
          <Hero
            onReserve={() => document.getElementById('reserve')?.scrollIntoView({ behavior: 'smooth' })}
            onOrder={() => setCartOpen(true)}
          />
          <About />
          <MenuSection onAdd={addToCart} />
          <Reservation onSuccess={(data) => setModal({ type: 'res', data })} />
          <PickupStrip onOrder={() => setCartOpen(true)} />
          <Footer onKitchen={showKitchen} />
        </main>
      )}

      {view === 'kitchen' && <Kitchen onBack={showMain} />}

      <CartDrawer
        open={cartOpen}
        cart={cart}
        cartTotal={cartTotal}
        onClose={() => setCartOpen(false)}
        onQty={changeQty}
        onOrderSuccess={(data) => {
          setCart([])
          setCartOpen(false)
          setModal({ type: 'order', data })
        }}
      />

      {modal && <Modal type={modal.type} data={modal.data} onClose={() => setModal(null)} />}

      <Toast msg={toast.msg} show={toast.show} />
    </>
  )
}
