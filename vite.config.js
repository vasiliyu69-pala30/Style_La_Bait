import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Vite собирает проект. Плагины:
//  - react()       — поддержка JSX и Fast Refresh (горячая перезагрузка компонентов);
//  - tailwindcss() — Tailwind CSS v4 без отдельного tailwind.config.js / postcss.config.js.
export default defineConfig({
  plugins: [react(), tailwindcss()],
})
