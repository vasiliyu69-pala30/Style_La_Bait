/**
 * Чистая бизнес-логика корзины — без React.
 *
 * Почему отдельный файл? Reducer — это обычная функция (state, action) => newState.
 * Её легко протестировать и без изменений перенести в Redux Toolkit / Zustand,
 * если приложение вырастет.
 *
 * Форма состояния (контракт хранилища):
 *   CartItem[] = [{ id: string, name: string, price: number, image: string, qty: number }]
 * Именно этот массив сохраняется в localStorage под ключом CART_STORAGE_KEY.
 */

export const CART_STORAGE_KEY = 'okc-tandir:cart:v1' // v1 — версия схемы на случай миграций

// Типы действий вынесены в константы, чтобы не ошибиться в строках.
export const CART_ACTIONS = {
  ADD: 'cart/add',
  DECREMENT: 'cart/decrement',
  REMOVE: 'cart/remove',
  CLEAR: 'cart/clear',
}

export function cartReducer(state, action) {
  switch (action.type) {
    case CART_ACTIONS.ADD: {
      const { id, name, price, image } = action.item
      const existing = state.find((i) => i.id === id)
      if (existing) {
        // Иммутабельность: создаём новый массив и новый объект, старый state не трогаем.
        return state.map((i) => (i.id === id ? { ...i, qty: i.qty + 1 } : i))
      }
      return [...state, { id, name, price, image, qty: 1 }]
    }
    case CART_ACTIONS.DECREMENT:
      return state
        .map((i) => (i.id === action.id ? { ...i, qty: i.qty - 1 } : i))
        .filter((i) => i.qty > 0) // количество 0 → позиция исчезает
    case CART_ACTIONS.REMOVE:
      return state.filter((i) => i.id !== action.id)
    case CART_ACTIONS.CLEAR:
      return []
    default:
      return state
  }
}

/** Производные значения считаем из state, а не храним отдельно — так они не рассинхронизируются. */
export const selectTotalCount = (items) => items.reduce((sum, i) => sum + i.qty, 0)
export const selectTotalPrice = (items) => items.reduce((sum, i) => sum + i.qty * i.price, 0)
