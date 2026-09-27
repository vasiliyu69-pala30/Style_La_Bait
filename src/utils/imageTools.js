/**
 * Утилиты для работы с картинками в браузере, без сервера.
 */

/**
 * Проверяет, что по ссылке действительно лежит картинка:
 * создаём объект Image и ждём событие load или error.
 * Это пример того, как «обернуть» колбэки в Promise.
 */
export function checkImageUrl(url) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(url)
    img.onerror = () => reject(new Error('По этой ссылке не удалось загрузить картинку'))
    img.src = url
  })
}

/**
 * Уменьшает выбранный файл и превращает его в строку data:image/jpeg;base64,...
 *
 * Зачем уменьшать: localStorage вмещает всего около 5 МБ,
 * а фото с телефона весит 3–10 МБ. После сжатия до 1000 px по ширине
 * картинка занимает около 100–200 КБ.
 */
export async function fileToCompressedDataUrl(file, maxWidth = 1000, quality = 0.8) {
  if (!file.type.startsWith('image/')) {
    throw new Error('Выберите файл-картинку (JPG, PNG, WebP…)')
  }

  // createImageBitmap декодирует файл в картинку, которую можно нарисовать на canvas
  const bitmap = await createImageBitmap(file)
  const scale = Math.min(1, maxWidth / bitmap.width)
  const canvas = document.createElement('canvas')
  canvas.width = Math.round(bitmap.width * scale)
  canvas.height = Math.round(bitmap.height * scale)
  canvas.getContext('2d').drawImage(bitmap, 0, 0, canvas.width, canvas.height)
  bitmap.close()

  return canvas.toDataURL('image/jpeg', quality)
}
