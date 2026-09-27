import { useState } from 'react'
import { HERO_IMAGE, MENU } from '../data/menu.js'
import { usePhotos } from '../context/PhotosContext.jsx'
import { checkImageUrl, fileToCompressedDataUrl } from '../utils/imageTools.js'
import Button from './ui/Button.jsx'
import TandirLogo from '../assets/TandirLogo.jsx'

/**
 * PhotoEditor — страница #/photos для замены фотографий на сайте.
 *
 * Список «слотов» строится из тех же данных, что и главная страница,
 * поэтому новое блюдо в data/menu.js автоматически появится и здесь.
 */
const SLOTS = [
  { id: 'hero', name: 'Фон главного экрана', image: HERO_IMAGE },
  ...MENU.map(({ id, name, image }) => ({ id, name, image })),
]

export default function PhotoEditor() {
  const { overrides, resetAll } = usePhotos()
  const changedCount = Object.keys(overrides).length

  return (
    <section className="mx-auto max-w-5xl px-4 py-12">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-display text-4xl tracking-wide text-thunder-navy sm:text-5xl">
            ФОТО <span className="text-thunder-orange">РЕДАКТОР</span>
          </h1>
          <p className="mt-2 max-w-xl text-slate-600">
            Вставьте ссылку на картинку или загрузите фото с компьютера. Изменения сразу
            появятся на сайте, но сохраняются только в этом браузере.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <a
            href="#top"
            className="inline-flex items-center rounded-full px-5 py-2.5 font-semibold text-thunder-blue ring-2 ring-thunder-blue
              transition-all duration-200 hover:-translate-y-0.5 hover:bg-thunder-blue hover:text-white"
          >
            ← На сайт
          </a>
          <Button
            variant="secondary"
            disabled={changedCount === 0}
            onClick={() => window.confirm('Вернуть все исходные фотографии?') && resetAll()}
          >
            Сбросить всё ({changedCount})
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {SLOTS.map((slot) => (
          <PhotoSlot key={slot.id} slot={slot} />
        ))}
      </div>
    </section>
  )
}

/**
 * PhotoSlot — карточка одной фотографии: превью + ссылка + загрузка файла.
 * Локальное состояние (текст поля, ошибка, «идёт загрузка») живёт здесь,
 * а в глобальный контекст попадает только готовый результат.
 */
function PhotoSlot({ slot }) {
  const { overrides, getPhoto, setPhoto, resetPhoto } = usePhotos()
  const [url, setUrl] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const [failedSrc, setFailedSrc] = useState(null)

  const src = getPhoto(slot.id, slot.image)
  const isChanged = slot.id in overrides

  // Общая обёртка: включает «загрузку», ловит ошибки и показывает их пользователю.
  const run = async (task) => {
    setError('')
    setBusy(true)
    try {
      setPhoto(slot.id, await task())
      setUrl('')
    } catch (e) {
      setError(
        e.name === 'QuotaExceededError'
          ? 'Место в браузере закончилось. Сбросьте часть фото или используйте ссылки.'
          : e.message,
      )
    } finally {
      setBusy(false)
    }
  }

  const handleUrlSubmit = (e) => {
    e.preventDefault() // иначе форма перезагрузит страницу
    const trimmed = url.trim()
    if (!/^https?:\/\//.test(trimmed)) {
      setError('Ссылка должна начинаться с http:// или https://')
      return
    }
    run(() => checkImageUrl(trimmed))
  }

  const handleFile = (e) => {
    const file = e.target.files?.[0]
    e.target.value = '' // чтобы можно было выбрать тот же файл повторно
    if (file) run(() => fileToCompressedDataUrl(file))
  }

  return (
    <article className="overflow-hidden rounded-2xl bg-white shadow-md ring-1 ring-slate-200 transition-shadow duration-300 hover:shadow-xl">
      <div className="relative aspect-video bg-gradient-to-br from-thunder-blue to-thunder-navy">
        {failedSrc === src ? (
          <div className="flex h-full items-center justify-center">
            <TandirLogo size={72} className="opacity-80" />
          </div>
        ) : (
          <img src={src} alt={slot.name} onError={() => setFailedSrc(src)} className="h-full w-full object-cover" />
        )}
        {isChanged && (
          <span className="absolute left-3 top-3 rounded-full bg-thunder-sun px-3 py-1 text-xs font-bold uppercase text-thunder-navy shadow">
            Изменено
          </span>
        )}
      </div>

      <div className="space-y-3 p-5">
        <h2 className="font-bold text-thunder-navy">{slot.name}</h2>

        <form onSubmit={handleUrlSubmit} className="flex gap-2">
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://…/photo.jpg"
            aria-label={`Ссылка на новое фото: ${slot.name}`}
            className="min-w-0 flex-1 rounded-full border border-slate-300 px-4 py-2 text-sm outline-none transition
              focus:border-thunder-blue focus:ring-4 focus:ring-thunder-blue/20"
          />
          <Button type="submit" variant="secondary" disabled={busy || !url.trim()} className="px-4 py-2 text-sm">
            Применить
          </Button>
        </form>

        <div className="flex flex-wrap items-center gap-3">
          {/* Настоящий input type="file" спрятан, а label выглядит как кнопка */}
          <label
            className={`inline-flex cursor-pointer items-center rounded-full bg-thunder-orange px-4 py-2 text-sm font-semibold text-white shadow-md
              transition-all duration-200 hover:-translate-y-0.5 hover:scale-105 hover:bg-orange-600
              ${busy ? 'pointer-events-none opacity-50' : ''}`}
          >
            {busy ? 'Загрузка…' : 'Загрузить файл'}
            <input type="file" accept="image/*" onChange={handleFile} className="sr-only" />
          </label>
          {isChanged && (
            <button
              type="button"
              onClick={() => {
                setError('')
                resetPhoto(slot.id)
              }}
              className="cursor-pointer text-sm text-slate-500 underline-offset-2 transition-colors hover:text-thunder-orange hover:underline"
            >
              Вернуть исходное
            </button>
          )}
        </div>

        {error && (
          <p role="alert" className="animate-fade-in rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </p>
        )}
      </div>
    </article>
  )
}
