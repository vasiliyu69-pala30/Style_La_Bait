import { useEffect, useState } from 'react'

/**
 * useHashRoute — самый простой роутер: страница определяется по части URL после #.
 *   https://site/#/photos → '/photos'
 *   https://site/ или https://site/#menu → '/' (якоря секций — это главная страница)
 *
 * Почему hash, а не react-router: не нужна библиотека и настройка сервера
 * (Vercel отдаёт index.html, а всё после # браузер на сервер вообще не отправляет).
 * Когда страниц станет больше, этот хук легко заменить на react-router.
 */
function currentRoute() {
  const hash = window.location.hash
  return hash.startsWith('#/') ? hash.slice(1) : '/'
}

export function useHashRoute() {
  const [route, setRoute] = useState(currentRoute)

  useEffect(() => {
    const onHashChange = () => setRoute(currentRoute())
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  return route
}
