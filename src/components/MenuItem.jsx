import { useState } from 'react'
import { useCart } from '../context/CartContext.jsx'
import Button from './ui/Button.jsx'
import { formatPrice } from './ui/formatPrice.js'
import TandirLogo from '../assets/TandirLogo.jsx'

/**
 * MenuItem — карточка одного блюда.
 *
 * Пропсы: item (объект из data/menu.js).
 * Hover-эффекты (класс group на корне + group-hover:* у детей):
 *   - карточка приподнимается и получает оранжевую тень;
 *   - фото плавно увеличивается;
 *   - снизу «выезжает» цветная полоска.
 */
export default function MenuItem({ item }) {
  const { items, addItem } = useCart()
  const [imgFailed, setImgFailed] = useState(false)
  const [justAdded, setJustAdded] = useState(false)

  // Сколько штук этого блюда уже в корзине (для бейджа на кнопке)
  const qtyInCart = items.find((i) => i.id === item.id)?.qty ?? 0

  const handleAdd = () => {
    addItem(item)
    // Короткий визуальный отклик «Добавлено!»
    setJustAdded(true)
    setTimeout(() => setJustAdded(false), 900)
  }

  return (
    <article
      className="group relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-md ring-1 ring-slate-200
        transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-2xl hover:shadow-thunder-orange/25 hover:ring-thunder-orange/50"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-thunder-blue to-thunder-navy">
        {imgFailed ? (
          // Запасной вариант, если картинка по ссылке не загрузилась
          <div className="flex h-full items-center justify-center">
            <TandirLogo size={96} className="opacity-80" />
          </div>
        ) : (
          <img
            src={item.image}
            alt={item.name}
            loading="lazy"
            onError={() => setImgFailed(true)}
            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
          />
        )}
        {item.tag && (
          <span className="absolute left-3 top-3 rounded-full bg-thunder-sun px-3 py-1 text-xs font-bold uppercase text-thunder-navy shadow">
            {item.tag}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-bold text-thunder-navy transition-colors group-hover:text-thunder-orange">
          {item.name}
        </h3>
        <p className="mt-2 flex-1 text-sm text-slate-600">{item.description}</p>

        <div className="mt-4 flex items-center justify-between gap-3">
          <span className="text-xl font-extrabold text-thunder-blue">{formatPrice(item.price)}</span>
          <Button onClick={handleAdd} aria-label={`Добавить «${item.name}» в корзину`}>
            {justAdded ? 'Добавлено!' : 'В корзину'}
            {qtyInCart > 0 && (
              <span className="rounded-full bg-white/25 px-2 text-xs">{qtyInCart}</span>
            )}
          </Button>
        </div>
      </div>

      {/* Декоративная полоска, выезжающая при наведении */}
      <span className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-thunder-blue to-thunder-orange transition-transform duration-300 group-hover:scale-x-100" />
    </article>
  )
}
