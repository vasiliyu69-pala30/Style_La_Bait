import { useId } from 'react'

/**
 * Логотип «Лепёшка-мяч» — чистый SVG-код, без файлов-картинок.
 *
 * Как устроен (слои снизу вверх):
 *  1. Толстый золотистый бортик лепёшки (внешний круг с радиальным градиентом).
 *  2. Тонкая середина — «дно» лепёшки чуть светлее.
 *  3. Швы баскетбольного мяча: вертикаль, горизонталь и две дуги по бокам.
 *  4. Узор «чекич» — наколы штампом в центре, как у настоящей узбекской нон.
 *
 * Пропсы: size (px) и className — чтобы переиспользовать логотип где угодно.
 */
export default function TandirLogo({ size = 48, className = '' }) {
  // useId даёт уникальный id для градиентов: на странице несколько логотипов,
  // а одинаковые id в SVG конфликтуют между собой.
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, '') // убираем спецсимволы, недопустимые в url(#id)
  const crustId = `crust-${uid}`
  const centerId = `center-${uid}`

  // Точки узора «чекич»: одна в центре + два кольца вокруг.
  const dots = [{ x: 50, y: 50 }]
  for (let i = 0; i < 6; i++) {
    const a = (i * Math.PI) / 3
    dots.push({ x: 50 + 8 * Math.cos(a), y: 50 + 8 * Math.sin(a) })
  }
  for (let i = 0; i < 12; i++) {
    const a = (i * Math.PI) / 6 + Math.PI / 12
    dots.push({ x: 50 + 15 * Math.cos(a), y: 50 + 15 * Math.sin(a) })
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      role="img"
      aria-label="Логотип Oklahoma City Tandir: лепёшка в виде баскетбольного мяча"
    >
      <defs>
        {/* Градиент «подрумяненной» корочки: светлее в центре, темнее к краю */}
        <radialGradient id={crustId} cx="45%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#fdbb30" />
          <stop offset="70%" stopColor="#f08a24" />
          <stop offset="100%" stopColor="#c2410c" />
        </radialGradient>
        <radialGradient id={centerId} cx="50%" cy="45%" r="55%">
          <stop offset="0%" stopColor="#f9dc9c" />
          <stop offset="100%" stopColor="#e9a94f" />
        </radialGradient>
      </defs>

      {/* 1. Бортик */}
      <circle cx="50" cy="50" r="47" fill={`url(#${crustId})`} stroke="#002d62" strokeWidth="3" />
      {/* 2. Середина лепёшки */}
      <circle cx="50" cy="50" r="26" fill={`url(#${centerId})`} stroke="#b45309" strokeWidth="1.5" />

      {/* 3. Швы мяча (синие — цвет Thunder) */}
      <g fill="none" stroke="#002d62" strokeWidth="2.5" strokeLinecap="round">
        <line x1="50" y1="3" x2="50" y2="97" />
        <line x1="3" y1="50" x2="97" y2="50" />
        <path d="M18 14 Q34 50 18 86" />
        <path d="M82 14 Q66 50 82 86" />
      </g>

      {/* 4. Узор «чекич» */}
      <g fill="#7c2d12" opacity="0.75">
        {dots.map((d, i) => (
          <circle key={i} cx={d.x} cy={d.y} r="1.6" />
        ))}
      </g>
    </svg>
  )
}
