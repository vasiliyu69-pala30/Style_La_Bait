# 🏀 Oklahoma City Tandir

Учебный MVP ресторана узбекской кухни в стиле **OKC Thunder**.
Стек: **React 19 + Vite + Tailwind CSS v4**. Бэкенда нет: корзина хранится в `localStorage`.

## Запуск

```bash
npm install
npm run dev      # сервер разработки → http://localhost:5173
npm run build    # production-сборка в dist/
npm run preview  # посмотреть собранную версию
npm run lint     # проверка ESLint
```

## Структура

```
src/
├── main.jsx                  # точка входа: монтирует <App/> внутри <CartProvider>
├── App.jsx                   # компоновка страницы + mock-оформление заказа
├── index.css                 # Tailwind + фирменные цвета и анимации (@theme)
├── assets/TandirLogo.jsx     # SVG-логотип «лепёшка-мяч» кодом
├── context/
│   ├── cartReducer.js        # чистая логика корзины (легко перенести в Redux/Zustand)
│   └── CartContext.jsx       # провайдер + хук useCart() — публичный API корзины
├── hooks/useLocalStorage.js  # useState, который сохраняется в localStorage
├── data/menu.js              # хардкод-меню (8 позиций) + контракт MenuItem
└── components/
    ├── Header.jsx  Hero.jsx  Menu.jsx  MenuItem.jsx  Footer.jsx
    ├── Cart.jsx               # выдвижная панель корзины
    ├── OrderSuccessModal.jsx  # анимированное окно «Заказ принят»
    └── ui/Button.jsx  ui/formatPrice.js
```

## Как течут данные

1. `MenuItem` вызывает `addItem(item)` из `useCart()`.
2. `CartContext` прогоняет действие через `cartReducer` → новое состояние.
3. `useLocalStorage` записывает состояние в `localStorage` (ключ `okc-tandir:cart:v1`).
4. `Header` (счётчик) и `Cart` (список, сумма) перерисовываются автоматически.

Чтобы подключить бэкенд, достаточно изменить `CartContext.jsx` и `data/menu.js`:
компоненты работают только через контракт `useCart()` и форму `MenuItem`.

## Картинки

Фото берутся по открытым URL с CDN Unsplash (`images.unsplash.com`), без API-ключей.
Если картинка не загрузилась, карточка показывает SVG-логотип вместо «битой» иконки.
