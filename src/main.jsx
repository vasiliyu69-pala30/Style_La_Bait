/**
 * Точка входа приложения.
 * Здесь React «монтируется» в <div id="root"> из index.html,
 * а всё дерево компонентов оборачивается в CartProvider —
 * так любой компонент получает доступ к корзине через useCart().
 */
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { CartProvider } from './context/CartContext.jsx'
import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CartProvider>
      <App />
    </CartProvider>
  </StrictMode>,
)
