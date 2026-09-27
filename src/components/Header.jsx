import TandirLogo from '../assets/TandirLogo.jsx'
import { useCart } from '../context/CartContext.jsx'

/**
 * Header — «липкая» шапка: логотип, навигация и кнопка корзины со счётчиком.
 * Счётчик берётся из контекста — Header ничего не знает о том, как устроена корзина.
 */
export default function Header() {
  const { totalCount, openCart } = useCart()

  return (
    <header className="sticky top-0 z-30 border-b-4 border-thunder-orange bg-thunder-navy/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        {/* group — позволяет анимировать логотип при наведении на всю ссылку */}
        <a href="#top" className="group flex items-center gap-3">
          <TandirLogo size={44} className="transition-transform duration-500 group-hover:rotate-180" />
          <span className="font-display text-lg leading-none tracking-wide text-white sm:text-2xl">
            OKLAHOMA CITY <span className="text-thunder-sun">TANDIR</span>
          </span>
        </a>

        <nav className="flex items-center gap-2 sm:gap-6">
          <a
            href="#menu"
            className="hidden font-semibold text-white/80 transition-colors hover:text-thunder-sun sm:block"
          >
            Меню
          </a>
          <a
            href="#/photos"
            className="rounded-full px-3 py-1.5 text-sm font-semibold text-white/80 ring-1 ring-white/30 transition-all
              hover:bg-white/10 hover:text-thunder-sun sm:text-base"
          >
            Фото
          </a>
          <button
            type="button"
            onClick={openCart}
            aria-label={`Открыть корзину, товаров: ${totalCount}`}
            className="relative flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-thunder-blue text-white
              transition-all duration-200 hover:scale-110 hover:bg-thunder-orange hover:shadow-lg hover:shadow-thunder-orange/40"
          >
            <CartIcon />
            {totalCount > 0 && (
              // key={totalCount} перезапускает анимацию при каждом изменении числа
              <span
                key={totalCount}
                className="absolute -right-1 -top-1 flex h-5 min-w-5 animate-pop-in items-center justify-center rounded-full
                  bg-thunder-sun px-1 text-xs font-bold text-thunder-navy"
              >
                {totalCount}
              </span>
            )}
          </button>
        </nav>
      </div>
    </header>
  )
}

function CartIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="9" cy="21" r="1" />
      <circle cx="20" cy="21" r="1" />
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
    </svg>
  )
}
