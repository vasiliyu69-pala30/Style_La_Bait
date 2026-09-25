import TandirLogo from '../assets/TandirLogo.jsx'

/** Footer — статичный подвал с контактами. */
export default function Footer() {
  return (
    <footer className="bg-thunder-navy text-white/70">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 py-10 text-center sm:flex-row sm:justify-between sm:text-left">
        <div className="flex items-center gap-3">
          <TandirLogo size={36} />
          <p className="font-display tracking-wide text-white">OKLAHOMA CITY TANDIR</p>
        </div>
        <p className="text-sm">
          Ежедневно 11:00–23:00 · Оклахома-Сити, в двух кварталах от арены · +1 (405) 000-00-00
        </p>
        <p className="text-xs text-white/40">
          © {new Date().getFullYear()} Учебный проект. Не связан с NBA и OKC Thunder.
        </p>
      </div>
    </footer>
  )
}
