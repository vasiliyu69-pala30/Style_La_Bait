/** Форматирует число как цену в рублях: 1290 → «1 290 ₽». Единая точка для смены валюты. */
const formatter = new Intl.NumberFormat('ru-RU', {
  style: 'currency',
  currency: 'RUB',
  maximumFractionDigits: 0,
})

export const formatPrice = (value) => formatter.format(value)
