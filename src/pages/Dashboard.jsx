import StatCard from '../components/ui/StatCard'
import { z2z3Ratio } from '../utils/hrZones'
import { ArrowRightIcon } from '@heroicons/react/24/outline'

export default function Dashboard({ trips, onNavigate }) {
  const totalKm = trips.reduce((s, t) => s + (t.distance_km || 0), 0)
  const totalGain = trips.reduce((s, t) => s + (t.gain_m || 0), 0)
  const avgZ23 = trips.length
    ? Math.round(
        trips.reduce((s, t) => s + (t.hr_zones ? z2z3Ratio(t.hr_zones) : 0), 0) / trips.length
      )
    : 0

  const recent = [...trips]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5)

  const progress = Math.min(Math.round((trips.length / 100) * 100), 100)

  return (
    <div className="p-6 flex flex-col gap-8 max-w-5xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-100">Dashboard</h1>
        <p className="text-sm text-gray-400 mt-1">Your Taiwan 100 Peaks expedition overview</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Peaks Logged" value={trips.length} unit="/ 100" accent="cyan" />
        <StatCard label="Total Distance" value={totalKm.toFixed(1)} unit="km" accent="green" />
        <StatCard label="Total Elev Gain" value={(totalGain / 1000).toFixed(1)} unit="km" accent="orange" />
        <StatCard label="Avg Z2+Z3 Ratio" value={`${avgZ23}%`} unit="" accent="red" />
      </div>

      {/* Progress bar */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-sm font-semibold text-gray-300">百岳進度 · Mountain Progress</h2>
          <span className="text-sm font-bold text-cyan-400">{trips.length} / 100 peaks</span>
        </div>
        <div className="h-3 bg-gray-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-cyan-700 via-cyan-500 to-cyan-400 rounded-full transition-all duration-700"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between mt-2">
          <span className="text-xs text-gray-600">Start</span>
          <span className="text-xs text-gray-500">{progress}% complete</span>
          <span className="text-xs text-gray-600">100 Peaks</span>
        </div>
      </div>

      {/* Recent trips */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-800">
          <h2 className="text-sm font-semibold text-gray-300">Recent Trips</h2>
          <button
            onClick={() => onNavigate('triplog')}
            className="flex items-center gap-1 text-xs text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            View all
            <ArrowRightIcon className="w-3.5 h-3.5" />
          </button>
        </div>
        {recent.length === 0 ? (
          <div className="px-5 py-8 text-center text-gray-500 text-sm">
            No trips logged yet.{' '}
            <button onClick={() => onNavigate('triplog')} className="text-cyan-400 hover:underline">
              Log your first trip →
            </button>
          </div>
        ) : (
          <div className="divide-y divide-gray-800/50">
            {recent.map(trip => (
              <button
                key={trip.id}
                onClick={() => onNavigate('tripdetail', trip.id)}
                className="w-full flex items-center justify-between px-5 py-3 hover:bg-gray-800/40 transition-colors text-left"
              >
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-100">{trip.name}</span>
                  <span className="text-xs text-gray-500">{trip.date}</span>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-400">
                  <span>{trip.distance_km} km</span>
                  <span className="text-gray-600">+{trip.gain_m}m</span>
                  <ArrowRightIcon className="w-4 h-4 text-gray-600" />
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Quick tips */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
        <h2 className="text-sm font-semibold text-gray-300 mb-3">Training Targets</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-gray-400">
          <div className="bg-gray-800/50 rounded-lg p-3">
            <p className="text-green-400 font-semibold mb-1">Z2 Aerobic Base</p>
            <p>Target 60-70% of training time in Z2 (120–139 bpm) for endurance adaptation.</p>
          </div>
          <div className="bg-gray-800/50 rounded-lg p-3">
            <p className="text-cyan-400 font-semibold mb-1">Efficiency Index</p>
            <p>Track elevation gain per (hour × avg HR). Higher = more efficient climbing.</p>
          </div>
          <div className="bg-gray-800/50 rounded-lg p-3">
            <p className="text-orange-400 font-semibold mb-1">Hydration Rate</p>
            <p>Aim for 400–600ml/h during sustained climbs above 3000m elevation.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
