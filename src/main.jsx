/**
 * Точка входа приложения.
 * Здесь React «монтируется» в <div id="root"> из index.html,
 * а всё дерево компонентов оборачивается в провайдеры контекстов:
 *   CartProvider   → useCart()   — корзина;
 *   PhotosProvider → usePhotos() — замены фотографий из фото-редактора.
 */
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { CartProvider } from './context/CartContext.jsx'
import { PhotosProvider } from './context/PhotosContext.jsx'
import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PhotosProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </PhotosProvider>
  </StrictMode>,
)
