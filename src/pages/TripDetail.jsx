import { useState } from 'react'
import StatCard from '../components/ui/StatCard'
import AlertBanner from '../components/ui/AlertBanner'
import FormulaBlock from '../components/ui/FormulaBlock'
import LessonsLearned from '../components/ui/LessonsLearned'
import HRZoneChart from '../components/charts/HRZoneChart'
import ElevationProfile from '../components/charts/ElevationProfile'
import PaceChart from '../components/charts/PaceChart'
import GpxMap from '../components/map/GpxMap'
import GearList from '../components/gear/GearList'
import { efficiencyIndex } from '../utils/elevationCalc'
import { z2z3Ratio, computeZoneRatios } from '../utils/hrZones'
import { waterPerHour } from '../utils/supplyCalc'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import Badge from '../components/ui/Badge'

const TABS = ['HR Zones', 'Elevation Profile', 'Pace']

export default function TripDetail({ trip, allGear, onUpdate, onBack }) {
  const [activeTab, setActiveTab] = useState('HR Zones')
  const [lessons, setLessons] = useState(trip?.lessons || '')

  if (!trip) {
    return (
      <div className="p-6 text-gray-400">
        Trip not found.{' '}
        <button onClick={onBack} className="text-cyan-400 hover:underline">Go back</button>
      </div>
    )
  }

  const efficiency = efficiencyIndex(trip.gain_m, trip.duration_h, trip.avg_hr)
  const z23 = trip.hr_zones ? z2z3Ratio(trip.hr_zones) : 0
  const wph = waterPerHour(trip.water_ml, trip.duration_h)

  function handleLessonsChange(val) {
    setLessons(val)
    onUpdate({ ...trip, lessons: val })
  }

  return (
    <div className="p-6 flex flex-col gap-6 max-w-6xl mx-auto">
      {/* Back + title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onBack}
          className="p-2 rounded-xl text-gray-400 hover:text-gray-100 hover:bg-gray-800 transition-colors"
        >
          <ArrowLeftIcon className="w-5 h-5" />
        </button>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-gray-100">{trip.name}</h1>
            <Badge text={trip.date} color="slate" />
          </div>
          {trip.weather && <p className="text-sm text-gray-400 mt-0.5">{trip.weather}</p>}
        </div>
      </div>

      {/* Alert banner */}
      <AlertBanner actual_h={trip.duration_h} estimated_h={trip.estimated_h} />

      {/* Map + Stats grid */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        {/* Map */}
        <div className="lg:col-span-3 min-h-[280px]">
          <GpxMap
            gpxPoints={trip.gpx_points}
            center={[23.47, 120.96]}
            zoom={8}
          />
        </div>

        {/* Stats */}
        <div className="lg:col-span-2 grid grid-cols-2 gap-3 content-start">
          <StatCard label="Distance" value={trip.distance_km} unit="km" accent="cyan" />
          <StatCard label="Elev Gain" value={`+${trip.gain_m}`} unit="m" accent="green" />
          <StatCard label="Duration" value={trip.duration_h} unit="h" accent="orange" />
          <StatCard label="Avg HR" value={trip.avg_hr || '—'} unit="bpm" accent="red" />
          <StatCard label="Efficiency Index" value={efficiency} unit="m/(h·bpm)" accent="cyan" />
          <StatCard label="Z2+Z3 Ratio" value={`${z23}%`} unit="" accent="green" />
          <StatCard label="Calories" value={trip.calories || '—'} unit="kcal" accent="orange" />
          <StatCard label="Water/hr" value={wph || '—'} unit="ml/h" accent="cyan" />
        </div>
      </div>

      {/* Efficiency formula */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Efficiency Index Formula</h3>
        <FormulaBlock
          formula={`E = \\frac{\\Delta Elev}{t \\times \\overline{HR}} = \\frac{${trip.gain_m}}{${trip.duration_h} \\times ${trip.avg_hr}} = ${efficiency}`}
          display={true}
        />
      </div>

      {/* Tabbed charts */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
        <div className="flex border-b border-gray-800">
          {TABS.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-3 text-sm font-medium transition-colors ${
                activeTab === tab
                  ? 'text-cyan-400 border-b-2 border-cyan-500'
                  : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="p-4">
          {activeTab === 'HR Zones' && <HRZoneChart hrZones={trip.hr_zones} />}
          {activeTab === 'Elevation Profile' && <ElevationProfile gpxPoints={trip.gpx_points} />}
          {activeTab === 'Pace' && <PaceChart trip={trip} />}
        </div>
      </div>

      {/* HR Zone ratios detail */}
      {trip.hr_zones && (
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Zone Distribution</h3>
          <div className="grid grid-cols-5 gap-2">
            {Object.entries(computeZoneRatios(trip.hr_zones)).map(([zone, pct]) => {
              const colors = { z1: 'slate', z2: 'green', z3: 'cyan', z4: 'orange', z5: 'red' }
              return (
                <div key={zone} className="flex flex-col items-center gap-1">
                  <Badge text={zone.toUpperCase()} color={colors[zone]} />
                  <span className="text-lg font-bold text-gray-100">{pct}%</span>
                  <span className="text-xs text-gray-500">{trip.hr_zones[zone]} min</span>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Gear list */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
        <GearList gearIds={trip.gear_ids} allGear={allGear} />
      </div>

      {/* Lessons Learned */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
        <LessonsLearned value={lessons} onChange={handleLessonsChange} />
      </div>

      {/* Trip notes */}
      {trip.notes && (
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Field Notes</h3>
          <p className="text-sm text-gray-300 whitespace-pre-wrap">{trip.notes}</p>
        </div>
      )}
    </div>
  )
}
