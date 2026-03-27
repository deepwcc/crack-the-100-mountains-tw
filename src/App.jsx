import { useState, useEffect } from 'react'
import { useTrips } from './hooks/useTrips'
import { useGear } from './hooks/useGear'
import Sidebar from './components/layout/Sidebar'
import TopBar from './components/layout/TopBar'
import Dashboard from './pages/Dashboard'
import TripLog from './pages/TripLog'
import TripDetail from './pages/TripDetail'
import GearVault from './pages/GearVault'
import Analytics from './pages/Analytics'
import SupplyPlanner from './pages/SupplyPlanner'

const PAGE_TITLES = {
  dashboard: '百岳日誌 · Dashboard',
  triplog: 'Trip Log',
  tripdetail: 'Trip Detail',
  gearvault: 'Gear Vault',
  analytics: 'Analytics',
  supply: 'Supply Planner',
}

export default function App() {
  const { trips, addTrip, updateTrip, deleteTrip, getTrip } = useTrips()
  const { gear, addGear, updateGear, deleteGear } = useGear()

  const [currentPage, setCurrentPage] = useState('dashboard')
  const [selectedTripId, setSelectedTripId] = useState(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const [darkMode, setDarkMode] = useState(() => {
    try {
      const saved = localStorage.getItem('mtw_darkmode')
      return saved !== null ? JSON.parse(saved) : true
    } catch {
      return true
    }
  })

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    try {
      localStorage.setItem('mtw_darkmode', JSON.stringify(darkMode))
    } catch {}
  }, [darkMode])

  function navigate(page, tripId) {
    setCurrentPage(page)
    if (tripId) setSelectedTripId(tripId)
    setSidebarOpen(false)
  }

  const selectedTrip = selectedTripId ? getTrip(selectedTripId) : null

  function renderPage() {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard trips={trips} onNavigate={navigate} />
      case 'triplog':
        return (
          <TripLog
            trips={trips}
            onNavigate={navigate}
            onAddTrip={addTrip}
          />
        )
      case 'tripdetail':
        return (
          <TripDetail
            trip={selectedTrip}
            allGear={gear}
            onUpdate={updateTrip}
            onBack={() => navigate('triplog')}
          />
        )
      case 'gearvault':
        return (
          <GearVault
            gear={gear}
            trips={trips}
            onAddGear={addGear}
            onUpdateGear={updateGear}
          />
        )
      case 'analytics':
        return <Analytics trips={trips} />
      case 'supply':
        return <SupplyPlanner trips={trips} />
      default:
        return <Dashboard trips={trips} onNavigate={navigate} />
    }
  }

  return (
    <div className={`flex h-screen overflow-hidden bg-gray-950 ${darkMode ? 'dark' : ''}`}>
      {/* Sidebar */}
      <Sidebar
        currentPage={currentPage}
        onNavigate={navigate}
        tripCount={trips.length}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <TopBar
          title={PAGE_TITLES[currentPage] || '百岳日誌'}
          darkMode={darkMode}
          toggleDark={() => setDarkMode(v => !v)}
          onMenuClick={() => setSidebarOpen(v => !v)}
        />
        <main className="flex-1 overflow-y-auto">
          {renderPage()}
        </main>
      </div>
    </div>
  )
}
