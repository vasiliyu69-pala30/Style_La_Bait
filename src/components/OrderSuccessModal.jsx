import { useEffect } from 'react'
import Button from './ui/Button.jsx'
import { formatPrice } from './ui/formatPrice.js'
import TandirLogo from '../assets/TandirLogo.jsx'

/**
 * OrderSuccessModal — mock-подтверждение заказа (настоящей отправки нет).
 *
 * Пропсы:
 *   order   { id, count, total } | null — если null, модалка не рендерится
 *   onClose () => void
 *
 * Анимации: окно «выпрыгивает» (animate-pop-in), лепёшка-мяч вращается,
 * а галочка «рисуется» за счёт анимации stroke-dashoffset (animate-draw-check).
 */
export default function OrderSuccessModal({ order, onClose }) {
  useEffect(() => {
    if (!order) return
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [order, onClose])

  if (!order) return null

  return (
    <div
      className="fixed inset-0 z-[60] flex animate-fade-in items-center justify-center bg-thunder-navy/70 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="order-success-title"
        // stopPropagation: клик внутри окна не должен закрывать модалку
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-sm animate-pop-in overflow-hidden rounded-3xl bg-white p-8 text-center shadow-2xl"
      >
        <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-thunder-blue via-thunder-sun to-thunder-orange" />

        <div className="relative mx-auto mb-4 h-24 w-24">
          <TandirLogo size={96} className="animate-spin-slow" />
          {/* Галочка поверх логотипа */}
          <svg viewBox="0 0 52 52" className="absolute inset-0 m-auto h-14 w-14 rounded-full bg-green-500 p-2 shadow-lg" aria-hidden="true">
            <path
              d="M14 27l8 8 16-16"
              fill="none"
              stroke="white"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="48"
              className="animate-draw-check"
            />
          </svg>
        </div>

        <h2 id="order-success-title" className="font-display text-3xl tracking-wide text-thunder-navy">
          SWISH! ЗАКАЗ ПРИНЯТ
        </h2>
        <p className="mt-3 text-slate-600">
          Заказ <span className="font-bold text-thunder-blue">#{order.id}</span> на{' '}
          <span className="font-bold">{formatPrice(order.total)}</span> ({order.count} шт.) уже летит в тандыр.
        </p>
        <p className="mt-1 text-sm text-slate-400">Примерное время: 25–35 минут</p>

        <Button variant="secondary" className="mt-6 w-full py-3" onClick={onClose}>
          Отлично!
        </Button>
      </div>
    </div>
  )
}
