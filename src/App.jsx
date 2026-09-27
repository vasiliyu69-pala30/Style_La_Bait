import { useCallback, useEffect, useState } from 'react'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import Menu from './components/Menu.jsx'
import Cart from './components/Cart.jsx'
import OrderSuccessModal from './components/OrderSuccessModal.jsx'
import Footer from './components/Footer.jsx'
import PhotoEditor from './components/PhotoEditor.jsx'
import { useHashRoute } from './hooks/useHashRoute.js'

/**
 * App — корневой компонент-«дирижёр». Собирает страницу из секций
 * и хранит локальное UI-состояние, которое не нужно остальному приложению:
 * данные последнего оформленного заказа для модального окна.
 *
 * Роутинг: '/photos' → фото-редактор, всё остальное → главная страница.
 */
export default function App() {
  const [lastOrder, setLastOrder] = useState(null)
  const route = useHashRoute()

  // При смене страницы прокручиваем к нужному месту. Браузер сам делает это для
  // якорей (#menu), но только если секция уже есть на странице. Когда мы приходим
  // с фото-редактора, главная ещё не отрисована — поэтому доскролливаем вручную.
  useEffect(() => {
    const target = route === '/' && document.getElementById(window.location.hash.slice(1))
    if (target) target.scrollIntoView()
    else window.scrollTo(0, 0)
  }, [route])

  // Mock-оформление: в реальном проекте здесь был бы POST-запрос на сервер.
  const handleCheckout = useCallback(({ count, total }) => {
    const id = String(Date.now()).slice(-5) // псевдо-номер заказа
    setLastOrder({ id, count, total })
  }, [])

  const closeModal = useCallback(() => setLastOrder(null), [])

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {route === '/photos' ? (
          <PhotoEditor />
        ) : (
          <>
            <Hero />
            <Menu />
          </>
        )}
      </main>
      <Footer />

      {/* Оверлеи живут на верхнем уровне, чтобы перекрывать всю страницу */}
      <Cart onCheckout={handleCheckout} />
      <OrderSuccessModal order={lastOrder} onClose={closeModal} />
    </div>
  )
}
