import { MENU } from '../data/menu.js'
import MenuItem from './MenuItem.jsx'

/**
 * Menu — секция с адаптивной сеткой карточек.
 * Сетка: 1 колонка на телефоне → 2 на планшете → 3 на десктопе → 4 на широком.
 * Сюда можно добавить фильтры по категориям — данные уже вынесены в отдельный модуль.
 */
export default function Menu() {
  return (
    <section id="menu" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-16">
      <div className="mb-10 text-center">
        <h2 className="font-display text-4xl tracking-wide text-thunder-navy sm:text-5xl">
          СТАРТОВЫЙ <span className="text-thunder-orange">СОСТАВ</span>
        </h2>
        <p className="mt-3 text-slate-600">Выбирайте игроков вашей тарелки</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {MENU.map((item) => (
          // key — обязательный уникальный идентификатор для элементов списка
          <MenuItem key={item.id} item={item} />
        ))}
      </div>
    </section>
  )
}
