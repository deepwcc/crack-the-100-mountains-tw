import { SunIcon, MoonIcon, Bars3Icon } from '@heroicons/react/24/outline'

export default function TopBar({ title, darkMode, toggleDark, onMenuClick }) {
  return (
    <header className="h-14 flex items-center justify-between px-4 border-b border-gray-800 bg-gray-950 sticky top-0 z-20">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-lg text-gray-400 hover:text-gray-100 hover:bg-gray-800 transition-colors"
          aria-label="Open menu"
        >
          <Bars3Icon className="w-5 h-5" />
        </button>
        <h2 className="text-sm font-semibold text-gray-100 truncate">{title}</h2>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={toggleDark}
          className="p-2 rounded-lg text-gray-400 hover:text-gray-100 hover:bg-gray-800 transition-colors"
          aria-label="Toggle dark mode"
        >
          {darkMode
            ? <SunIcon className="w-5 h-5" />
            : <MoonIcon className="w-5 h-5" />
          }
        </button>
      </div>
    </header>
  )
}
