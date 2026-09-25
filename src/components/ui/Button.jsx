/**
 * Button — переиспользуемая кнопка с вариантами оформления.
 *
 * Идея: стили описаны один раз здесь, а в остальном коде пишем
 * <Button variant="secondary">…</Button> вместо длинных строк классов.
 *
 * Hover-анимация: кнопка приподнимается (-translate-y-0.5), слегка
 * увеличивается и получает цветную тень. active: — эффект «нажатия».
 */
const VARIANTS = {
  primary:
    'bg-thunder-orange text-white shadow-md hover:bg-orange-600 hover:shadow-lg hover:shadow-thunder-orange/40',
  secondary:
    'bg-thunder-blue text-white shadow-md hover:bg-thunder-navy hover:shadow-lg hover:shadow-thunder-blue/40',
  ghost: 'bg-white/10 text-white ring-1 ring-white/40 hover:bg-white/20',
}

export default function Button({ variant = 'primary', className = '', children, ...props }) {
  return (
    <button
      type="button"
      className={`inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 font-semibold
        transition-all duration-200 ease-out hover:-translate-y-0.5 hover:scale-105
        active:translate-y-0 active:scale-95 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-thunder-sun/60
        disabled:pointer-events-none disabled:opacity-50 cursor-pointer
        ${VARIANTS[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
