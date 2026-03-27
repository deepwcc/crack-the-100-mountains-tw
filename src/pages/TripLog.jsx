import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { v4 as uuidv4 } from 'uuid'
import { alertReadiness } from '../utils/elevationCalc'
import Badge from '../components/ui/Badge'
import { PlusIcon, ArrowRightIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline'

export default function TripLog({ trips, onNavigate, onAddTrip }) {
  const [showForm, setShowForm] = useState(false)
  const [sortField, setSortField] = useState('date')
  const [sortDir, setSortDir] = useState('desc')

  const { register, handleSubmit, reset, formState: { errors } } = useForm()

  const sorted = [...trips].sort((a, b) => {
    let av = a[sortField], bv = b[sortField]
    if (sortField === 'date') {
      av = new Date(av); bv = new Date(bv)
    }
    if (av < bv) return sortDir === 'asc' ? -1 : 1
    if (av > bv) return sortDir === 'asc' ? 1 : -1
    return 0
  })

  function toggleSort(field) {
    if (sortField === field) {
      setSortDir(d => d === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDir('desc')
    }
  }

  function onSubmit(data) {
    const trip = {
      id: uuidv4(),
      name: data.name,
      date: data.date,
      distance_km: parseFloat(data.distance_km) || 0,
      gain_m: parseInt(data.gain_m) || 0,
      loss_m: parseInt(data.loss_m) || 0,
      duration_h: parseFloat(data.duration_h) || 0,
      avg_hr: parseInt(data.avg_hr) || 0,
      avg_pace: parseFloat(data.avg_pace) || 0,
      hr_zones: { z1: 0, z2: 0, z3: 0, z4: 0, z5: 0 },
      calories: parseInt(data.calories) || 0,
      water_ml: parseInt(data.water_ml) || 0,
      weather: data.weather || '',
      estimated_h: parseFloat(data.estimated_h) || 0,
      gear_ids: [],
      gpx_points: null,
      lessons: '',
      notes: data.notes || '',
    }
    onAddTrip(trip)
    reset()
    setShowForm(false)
  }

  const SortIcon = ({ field }) => {
    if (sortField !== field) return <span className="text-gray-700 ml-1">↕</span>
    return <span className="text-cyan-400 ml-1">{sortDir === 'asc' ? '↑' : '↓'}</span>
  }

  return (
    <div className="p-6 flex flex-col gap-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-100">Trip Log</h1>
          <p className="text-sm text-gray-400 mt-1">{trips.length} expedition{trips.length !== 1 ? 's' : ''} recorded</p>
        </div>
        <button
          onClick={() => setShowForm(v => !v)}
          className="flex items-center gap-2 bg-cyan-600 hover:bg-cyan-500 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors"
        >
          <PlusIcon className="w-4 h-4" />
          New Trip
        </button>
      </div>

      {/* New trip form */}
      {showForm && (
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
          <h2 className="text-base font-semibold text-gray-100 mb-5">Log New Trip</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="flex flex-col gap-1 sm:col-span-2 lg:col-span-1">
              <label className="text-xs text-gray-400">Mountain Name *</label>
              <input
                {...register('name', { required: true })}
                placeholder="e.g. 玉山主峰"
                className="bg-gray-800 border border-gray-700 text-gray-100 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-cyan-500 transition-colors"
              />
              {errors.name && <span className="text-xs text-red-400">Required</span>}
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs text-gray-400">Date *</label>
              <input
                type="date"
                {...register('date', { required: true })}
                className="bg-gray-800 border border-gray-700 text-gray-100 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-cyan-500 transition-colors"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs text-gray-400">Distance (km)</label>
              <input
                type="number" step="0.1"
                {...register('distance_km')}
                placeholder="22.3"
                className="bg-gray-800 border border-gray-700 text-gray-100 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-cyan-500 transition-colors"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs text-gray-400">Elevation Gain (m)</label>
              <input
                type="number"
                {...register('gain_m')}
                placeholder="1400"
                className="bg-gray-800 border border-gray-700 text-gray-100 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-cyan-500 transition-colors"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs text-gray-400">Elevation Loss (m)</label>
              <input
                type="number"
                {...register('loss_m')}
                placeholder="1400"
                className="bg-gray-800 border border-gray-700 text-gray-100 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-cyan-500 transition-colors"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs text-gray-400">Duration (h)</label>
              <input
                type="number" step="0.1"
                {...register('duration_h')}
                placeholder="9.5"
                className="bg-gray-800 border border-gray-700 text-gray-100 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-cyan-500 transition-colors"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs text-gray-400">Estimated Duration (h)</label>
              <input
                type="number" step="0.1"
                {...register('estimated_h')}
                placeholder="8.0"
                className="bg-gray-800 border border-gray-700 text-gray-100 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-cyan-500 transition-colors"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs text-gray-400">Avg Heart Rate (bpm)</label>
              <input
                type="number"
                {...register('avg_hr')}
                placeholder="148"
                className="bg-gray-800 border border-gray-700 text-gray-100 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-cyan-500 transition-colors"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs text-gray-400">Avg Pace (km/h)</label>
              <input
                type="number" step="0.1"
                {...register('avg_pace')}
                placeholder="2.3"
                className="bg-gray-800 border border-gray-700 text-gray-100 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-cyan-500 transition-colors"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs text-gray-400">Calories</label>
              <input
                type="number"
                {...register('calories')}
                placeholder="2800"
                className="bg-gray-800 border border-gray-700 text-gray-100 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-cyan-500 transition-colors"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs text-gray-400">Water (ml)</label>
              <input
                type="number"
                {...register('water_ml')}
                placeholder="3200"
                className="bg-gray-800 border border-gray-700 text-gray-100 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-cyan-500 transition-colors"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs text-gray-400">Weather</label>
              <input
                {...register('weather')}
                placeholder="Partly Cloudy, -3°C at summit"
                className="bg-gray-800 border border-gray-700 text-gray-100 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-cyan-500 transition-colors"
              />
            </div>
            <div className="flex flex-col gap-1 sm:col-span-2 lg:col-span-3">
              <label className="text-xs text-gray-400">Notes</label>
              <textarea
                {...register('notes')}
                rows={2}
                placeholder="Summit conditions, observations..."
                className="bg-gray-800 border border-gray-700 text-gray-100 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-cyan-500 transition-colors resize-none"
              />
            </div>
            <div className="flex gap-3 sm:col-span-2 lg:col-span-3 pt-2">
              <button
                type="submit"
                className="bg-cyan-600 hover:bg-cyan-500 text-white px-5 py-2 rounded-xl text-sm font-medium transition-colors"
              >
                Save Trip
              </button>
              <button
                type="button"
                onClick={() => { setShowForm(false); reset() }}
                className="bg-gray-800 hover:bg-gray-700 text-gray-300 px-5 py-2 rounded-xl text-sm font-medium transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Trips table */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
        {trips.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-gray-500 text-sm">No trips logged yet. Click "New Trip" to get started.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-800 bg-gray-900/80">
                  {[
                    { key: 'date', label: 'Date' },
                    { key: 'name', label: 'Mountain' },
                    { key: 'distance_km', label: 'Distance' },
                    { key: 'gain_m', label: 'Elev Gain' },
                    { key: 'avg_hr', label: 'Avg HR' },
                    { key: 'duration_h', label: 'Duration' },
                  ].map(col => (
                    <th
                      key={col.key}
                      className="text-left py-3 px-4 text-xs font-medium text-gray-400 cursor-pointer hover:text-gray-200 transition-colors select-none"
                      onClick={() => toggleSort(col.key)}
                    >
                      {col.label}
                      <SortIcon field={col.key} />
                    </th>
                  ))}
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-400">Alert</th>
                  <th className="py-3 px-4" />
                </tr>
              </thead>
              <tbody>
                {sorted.map(trip => {
                  const hasAlert = alertReadiness(trip.duration_h, trip.estimated_h)
                  return (
                    <tr
                      key={trip.id}
                      className="border-b border-gray-800/50 hover:bg-gray-800/30 transition-colors cursor-pointer"
                      onClick={() => onNavigate('tripdetail', trip.id)}
                    >
                      <td className="py-3 px-4 text-gray-400">{trip.date}</td>
                      <td className="py-3 px-4 font-medium text-gray-100">{trip.name}</td>
                      <td className="py-3 px-4 text-gray-300">{trip.distance_km} km</td>
                      <td className="py-3 px-4 text-gray-300">+{trip.gain_m}m</td>
                      <td className="py-3 px-4 text-gray-300">{trip.avg_hr || '—'} bpm</td>
                      <td className="py-3 px-4 text-gray-300">{trip.duration_h}h</td>
                      <td className="py-3 px-4">
                        {hasAlert && (
                          <span title="Duration exceeded estimate by >20%">
                            <ExclamationTriangleIcon className="w-4 h-4 text-orange-400" />
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        <ArrowRightIcon className="w-4 h-4 text-gray-600 hover:text-cyan-400 transition-colors" />
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
