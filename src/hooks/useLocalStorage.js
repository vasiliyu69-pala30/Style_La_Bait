import { useEffect, useState } from 'react'

/**
 * useLocalStorage — как useState, но значение переживает перезагрузку страницы.
 *
 * Контракт:
 *   const [value, setValue] = useLocalStorage(key, initialValue)
 *   - value читается из localStorage один раз при первом рендере;
 *   - при каждом изменении value записывается обратно (JSON);
 *   - если localStorage недоступен (приватный режим, битый JSON) —
 *     хук молча использует initialValue, приложение не падает.
 */
export function useLocalStorage(key, initialValue) {
  // «Ленивая» инициализация: функция вызывается только при первом рендере,
  // поэтому мы не читаем localStorage на каждом ререндере.
  const [value, setValue] = useState(() => readStorage(key, initialValue))

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // Хранилище переполнено или запрещено — не критично для MVP.
    }
  }, [key, value])

  return [value, setValue]
}

/** Безопасно читает и парсит значение из localStorage. */
function readStorage(key, fallback) {
  try {
    const raw = window.localStorage.getItem(key)
    return raw === null ? fallback : JSON.parse(raw)
  } catch {
    return fallback
  }
}
