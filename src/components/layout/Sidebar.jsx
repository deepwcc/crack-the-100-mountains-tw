import {
  HomeIcon,
  MapIcon,
  ArchiveBoxIcon,
  ChartBarIcon,
  BeakerIcon,
} from '@heroicons/react/24/outline'

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: HomeIcon },
  { id: 'triplog', label: 'Trip Log', icon: MapIcon },
  { id: 'gearvault', label: 'Gear Vault', icon: ArchiveBoxIcon },
  { id: 'analytics', label: 'Analytics', icon: ChartBarIcon },
  { id: 'supply', label: 'Supply Planner', icon: BeakerIcon },
]

export default function Sidebar({ currentPage, onNavigate, tripCount, isOpen, onClose }) {
  const progress = Math.min(Math.round((tripCount / 100) * 100), 100)

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-30 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 h-full z-40 w-64 bg-gray-950 border-r border-gray-800
          flex flex-col transition-transform duration-300
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 lg:static lg:z-auto
        `}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-5 py-5 border-b border-gray-800">
          <span className="text-2xl">⛰️</span>
          <div>
            <h1 className="text-base font-bold text-gray-100 leading-tight">百岳日誌</h1>
            <p className="text-xs text-gray-500">Peak Logger</p>
          </div>
        </div>

        {/* Mountain progress */}
        <div className="px-5 py-4 border-b border-gray-800">
          <div className="flex justify-between items-center mb-1.5">
            <span className="text-xs text-gray-400">百岳進度</span>
            <span className="text-xs font-bold text-cyan-400">{tripCount} / 100</span>
          </div>
          <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-cyan-600 to-cyan-400 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-xs text-gray-600 mt-1">{100 - tripCount} peaks remaining</p>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 flex flex-col gap-1">
          {navItems.map(({ id, label, icon: Icon }) => {
            const active = currentPage === id || (id === 'triplog' && currentPage === 'tripdetail')
            return (
              <button
                key={id}
                onClick={() => { onNavigate(id); onClose?.() }}
                className={`
                  flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium w-full text-left
                  transition-all duration-150
                  ${active
                    ? 'bg-cyan-950 text-cyan-400 border border-cyan-800'
                    : 'text-gray-400 hover:text-gray-100 hover:bg-gray-800/60'
                  }
                `}
              >
                <Icon className="w-5 h-5 shrink-0" />
                {label}
              </button>
            )
          })}
        </nav>

        {/* Footer */}
        <div className="px-5 py-4 border-t border-gray-800">
          <p className="text-xs text-gray-600">v0.1.0 · Taiwan 100 Peaks</p>
        </div>
      </aside>
    </>
  )
}
