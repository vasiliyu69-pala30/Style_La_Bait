import TandirLogo from '../assets/TandirLogo.jsx'
import Button from './ui/Button.jsx'
import { useCart } from '../context/CartContext.jsx'
import { usePhotos } from '../context/PhotosContext.jsx'
import { HERO_IMAGE } from '../data/menu.js'

/**
 * Hero — первый экран. Фон: градиент из фирменных цветов + фото-подложка.
 * Декоративная лепёшка-мяч «подпрыгивает» (animate-bounce-ball из index.css).
 */
export default function Hero() {
  const { openCart } = useCart()
  const { getPhoto } = usePhotos()
  const heroSrc = getPhoto('hero', HERO_IMAGE) // замена из фото-редактора или исходное фото

  return (
    <section id="top" className="relative overflow-hidden bg-thunder-navy">
      {/* Фото-подложка; aria-hidden — это чистое оформление */}
      <img
        key={heroSrc} // новый src → новый <img>, иначе после ошибки он остался бы скрытым
        src={heroSrc}
        alt=""
        aria-hidden="true"
        // Если фото не загрузилось — просто прячем его, градиент останется
        onError={(e) => (e.currentTarget.style.display = 'none')}
        className="absolute inset-0 h-full w-full object-cover opacity-25"
      />
      {/* Градиент поверх фото — задаёт фирменное настроение и читаемость текста */}
      <div className="absolute inset-0 bg-gradient-to-br from-thunder-navy via-thunder-blue/80 to-thunder-orange/70" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:py-24 md:grid-cols-[1.4fr_1fr]">
        <div className="text-center md:text-left">
          <p className="mb-3 inline-block rounded-full bg-thunder-sun px-4 py-1 text-sm font-bold uppercase tracking-wider text-thunder-navy">
            Узбекская кухня · Дух OKC
          </p>
          <h1 className="font-display text-5xl leading-none tracking-wide text-white sm:text-7xl">
            ГРОМ <span className="text-thunder-sun">ИЗ ТАНДЫРА</span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lg text-white/85 md:mx-0">
            Плов, шашлык и горячая лепёшка — подаём быстрее, чем контратака Thunder.
            Собирайте свой стартовый состав прямо в корзину.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3 md:justify-start">
            {/* Ссылка, стилизованная под кнопку, — ведёт к якорю #menu */}
            <a
              href="#menu"
              className="inline-flex items-center rounded-full bg-thunder-orange px-6 py-3 font-semibold text-white shadow-md
                transition-all duration-200 hover:-translate-y-0.5 hover:scale-105 hover:bg-orange-600 hover:shadow-lg hover:shadow-thunder-orange/40"
            >
              Смотреть меню
            </a>
            <Button variant="ghost" className="px-6 py-3" onClick={openCart}>
              Моя корзина
            </Button>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="relative">
            <div className="animate-bounce-ball">
              <TandirLogo size={260} className="drop-shadow-2xl sm:h-[300px] sm:w-[300px]" />
            </div>
            {/* «Тень» под мячом */}
            <div className="mx-auto mt-4 h-4 w-40 rounded-full bg-black/30 blur-md" />
          </div>
        </div>
      </div>
    </section>
  )
}
