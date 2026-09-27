/* eslint-disable react-refresh/only-export-components -- провайдер и хук намеренно живут рядом */
import { createContext, useCallback, useContext, useMemo, useState } from 'react'

/**
 * PhotosContext — «замены» фотографий поверх исходных данных.
 *
 * Идея: исходные картинки лежат в data/menu.js и в Hero и не меняются.
 * Этот контекст хранит только переопределения вида { [id]: url }
 * и сохраняет их в localStorage. Компоненты спрашивают getPhoto(id, fallback):
 * если замена есть, они получают её, если нет — исходную картинку.
 *
 * Публичный контракт usePhotos():
 *   overrides                  { [id]: string } — все текущие замены
 *   getPhoto(id, fallback)     string           — картинка для показа
 *   setPhoto(id, url)          void, может бросить ошибку QuotaExceededError,
 *                                               если хранилище переполнено
 *   resetPhoto(id)             вернуть исходную картинку
 *   resetAll()                 сбросить все замены
 *
 * Важно: замены видны только в этом браузере. Чтобы их видели все посетители,
 * setPhoto нужно будет превратить в запрос к серверу — компоненты не изменятся.
 */
export const PHOTOS_STORAGE_KEY = 'okc-tandir:photos:v1'

const PhotosContext = createContext(null)

function readOverrides() {
  try {
    return JSON.parse(localStorage.getItem(PHOTOS_STORAGE_KEY)) ?? {}
  } catch {
    return {}
  }
}

export function PhotosProvider({ children }) {
  const [overrides, setOverrides] = useState(readOverrides)

  // В отличие от корзины, пишем в localStorage сразу и НЕ глотаем ошибку:
  // загруженные фото весят много, и пользователь должен узнать,
  // если место закончилось. Состояние меняем только после успешной записи.
  const persist = useCallback((next) => {
    localStorage.setItem(PHOTOS_STORAGE_KEY, JSON.stringify(next))
    setOverrides(next)
  }, [])

  const value = useMemo(
    () => ({
      overrides,
      getPhoto: (id, fallback) => overrides[id] ?? fallback,
      setPhoto: (id, url) => persist({ ...overrides, [id]: url }),
      resetPhoto: (id) => {
        const next = { ...overrides }
        delete next[id]
        persist(next)
      },
      resetAll: () => persist({}),
    }),
    [overrides, persist],
  )

  return <PhotosContext.Provider value={value}>{children}</PhotosContext.Provider>
}

export function usePhotos() {
  const ctx = useContext(PhotosContext)
  if (!ctx) throw new Error('usePhotos() должен вызываться внутри <PhotosProvider>')
  return ctx
}
