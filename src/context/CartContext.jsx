/* eslint-disable react-refresh/only-export-components -- провайдер и хук намеренно живут рядом */
import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage.js'
import {
  CART_ACTIONS,
  CART_STORAGE_KEY,
  cartReducer,
  selectTotalCount,
  selectTotalPrice,
} from './cartReducer.js'

/**
 * CartContext — глобальное состояние корзины.
 *
 * Публичный контракт useCart() (на него опираются все UI-компоненты):
 *   items        CartItem[]         — позиции в корзине
 *   totalCount   number             — общее количество штук
 *   totalPrice   number             — итоговая сумма
 *   isOpen       boolean            — открыта ли выдвижная панель
 *   addItem(menuItem)               — +1 шт. (или добавить новую позицию)
 *   decrementItem(id)               — −1 шт.
 *   removeItem(id)                  — удалить позицию целиком
 *   clearCart()                     — очистить корзину
 *   openCart() / closeCart()        — управление панелью
 *
 * Если позже появится бэкенд (Node.js / Firebase), меняется только этот файл:
 * компоненты продолжают вызывать те же функции.
 */
const CartContext = createContext(null)

export function CartProvider({ children }) {
  // Состояние корзины хранится через useLocalStorage — он сам читает
  // сохранённые данные при старте и записывает каждое изменение.
  const [items, setItems] = useLocalStorage(CART_STORAGE_KEY, [])
  const [isOpen, setIsOpen] = useState(false)

  // Мини-аналог dispatch из useReducer: прогоняем текущее состояние через чистый reducer.
  // Функциональная форма setItems(prev => ...) гарантирует работу с актуальным состоянием.
  const dispatch = useCallback((action) => setItems((prev) => cartReducer(prev, action)), [setItems])

  // useMemo: объект value пересоздаётся только когда меняются items или isOpen,
  // иначе все подписчики контекста перерисовывались бы на каждый рендер провайдера.
  const value = useMemo(
    () => ({
      items,
      totalCount: selectTotalCount(items),
      totalPrice: selectTotalPrice(items),
      isOpen,
      addItem: (item) => dispatch({ type: CART_ACTIONS.ADD, item }),
      decrementItem: (id) => dispatch({ type: CART_ACTIONS.DECREMENT, id }),
      removeItem: (id) => dispatch({ type: CART_ACTIONS.REMOVE, id }),
      clearCart: () => dispatch({ type: CART_ACTIONS.CLEAR }),
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
    }),
    [items, isOpen, dispatch],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

/** Хук-обёртка: даёт доступ к корзине и падает с понятной ошибкой вне провайдера. */
export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart() должен вызываться внутри <CartProvider>')
  return ctx
}
