import { useEffect } from 'react'
import { useCart } from '../context/CartContext.jsx'
import Button from './ui/Button.jsx'
import { formatPrice } from './ui/formatPrice.js'

/**
 * Cart — выдвижная панель справа.
 *
 * Пропсы:
 *   onCheckout(orderSummary) — вызывается при нажатии «Оформить».
 *     Cart не знает, что будет дальше (модалка, запрос на сервер…) —
 *     это решает родитель. Так компонент остаётся переиспользуемым.
 *
 * Анимация: панель всегда в DOM, а видимость переключается классами
 * translate-x-full ↔ translate-x-0 с transition — так получается плавный «выезд».
 */
export default function Cart({ onCheckout }) {
  const { items, totalCount, totalPrice, isOpen, closeCart, addItem, decrementItem, removeItem, clearCart } =
    useCart()

  // Закрытие по Escape — стандарт доступности для диалоговых окон
  useEffect(() => {
    if (!isOpen) return
    const onKey = (e) => e.key === 'Escape' && closeCart()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey) // очистка при закрытии
  }, [isOpen, closeCart])

  const handleCheckout = () => {
    onCheckout({ count: totalCount, total: totalPrice })
    clearCart()
    closeCart()
  }

  return (
    <>
      {/* Затемнение фона; клик по нему закрывает корзину */}
      <div
        onClick={closeCart}
        aria-hidden="true"
        className={`fixed inset-0 z-40 bg-thunder-navy/60 backdrop-blur-sm transition-opacity duration-300
          ${isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Корзина"
        aria-hidden={!isOpen}
        inert={!isOpen}
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-white shadow-2xl
          transition-transform duration-300 ease-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex items-center justify-between bg-thunder-blue px-5 py-4 text-white">
          <h2 className="font-display text-2xl tracking-wide">ВАША КОРЗИНА</h2>
          <button
            type="button"
            onClick={closeCart}
            aria-label="Закрыть корзину"
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full text-2xl transition-all duration-200
              hover:rotate-90 hover:bg-white/20"
          >
            ×
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 p-8 text-center text-slate-500">
            <span className="text-5xl">🏀</span>
            <p className="font-semibold">Корзина пуста — мяч ещё не в игре.</p>
            <Button variant="secondary" onClick={closeCart}>
              К меню
            </Button>
          </div>
        ) : (
          <>
            <ul className="flex-1 divide-y divide-slate-100 overflow-y-auto px-5">
              {items.map((item) => (
                <li key={item.id} className="flex animate-fade-in items-center gap-3 py-4">
                  <img
                    src={item.image}
                    alt=""
                    // Фото недоступно → подставляем логотип (один раз, чтобы не зациклиться)
                    onError={(e) => {
                      e.currentTarget.onerror = null
                      e.currentTarget.src = '/favicon.svg'
                    }}
                    className="h-16 w-16 flex-none rounded-xl bg-thunder-blue/10 object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-semibold text-thunder-navy">{item.name}</p>
                    <p className="text-sm text-slate-500">{formatPrice(item.price)} × {item.qty}</p>
                    <div className="mt-2 flex items-center gap-2">
                      <QtyButton label={`Убрать одну «${item.name}»`} onClick={() => decrementItem(item.id)}>
                        −
                      </QtyButton>
                      <span className="w-6 text-center font-bold">{item.qty}</span>
                      <QtyButton label={`Добавить ещё «${item.name}»`} onClick={() => addItem(item)}>
                        +
                      </QtyButton>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className="font-bold text-thunder-blue">{formatPrice(item.price * item.qty)}</span>
                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      className="cursor-pointer text-xs text-slate-400 underline-offset-2 transition-colors hover:text-thunder-orange hover:underline"
                    >
                      Удалить
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <div className="border-t-4 border-thunder-orange bg-slate-50 px-5 py-5">
              <div className="mb-4 flex items-baseline justify-between">
                <span className="text-slate-600">Итого ({totalCount} шт.)</span>
                <span className="text-2xl font-extrabold text-thunder-navy">{formatPrice(totalPrice)}</span>
              </div>
              <Button className="w-full py-3 text-lg" onClick={handleCheckout}>
                Оформить заказ
              </Button>
              <button
                type="button"
                onClick={clearCart}
                className="mt-3 w-full cursor-pointer text-sm text-slate-400 transition-colors hover:text-thunder-orange"
              >
                Очистить корзину
              </button>
            </div>
          </>
        )}
      </aside>
    </>
  )
}

/** Маленькая круглая кнопка «+» / «−». */
function QtyButton({ label, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-thunder-blue/10 font-bold text-thunder-blue
        transition-all duration-150 hover:scale-110 hover:bg-thunder-orange hover:text-white active:scale-90"
    >
      {children}
    </button>
  )
}
