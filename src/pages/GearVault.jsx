import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { v4 as uuidv4 } from 'uuid'
import Badge from '../components/ui/Badge'
import { PlusIcon } from '@heroicons/react/24/outline'

const CATEGORIES = ['pack', 'sleep', 'shelter', 'clothing', 'footwear', 'filter', 'navigation', 'medical', 'other']

const categoryColors = {
  pack: 'cyan',
  sleep: 'purple',
  shelter: 'orange',
  clothing: 'slate',
  footwear: 'yellow',
  filter: 'green',
  navigation: 'slate',
  medical: 'red',
  other: 'slate',
}

export default function GearVault({ gear, trips, onAddGear, onUpdateGear }) {
  const [filterCat, setFilterCat] = useState('all')
  const [showForm, setShowForm] = useState(false)
  const { register, handleSubmit, reset, formState: { errors } } = useForm()

  const filtered = filterCat === 'all'
    ? gear
    : gear.filter(g => g.category === filterCat)

  function tripCount(gearId) {
    return trips.filter(t => t.gear_ids && t.gear_ids.includes(gearId)).length
  }

  function onSubmit(data) {
    const item = {
      id: uuidv4(),
      name: data.name,
      category: data.category,
      weight_g: parseInt(data.weight_g) || null,
      clo: data.clo ? parseFloat(data.clo) : null,
      temp_rating: data.temp_rating !== '' ? parseInt(data.temp_rating) : null,
      notes: data.notes || '',
    }
    onAddGear(item)
    reset()
    setShowForm(false)
  }

  const totalWeight = filtered.reduce((s, g) => s + (g.weight_g || 0), 0)

  return (
    <div className="p-6 flex flex-col gap-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-100">Gear Vault</h1>
          <p className="text-sm text-gray-400 mt-1">{gear.length} items · {totalWeight}g shown</p>
        </div>
        <button
          onClick={() => setShowForm(v => !v)}
          className="flex items-center gap-2 bg-cyan-600 hover:bg-cyan-500 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors"
        >
          <PlusIcon className="w-4 h-4" />
          Add Gear
        </button>
      </div>

      {/* Category filter */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setFilterCat('all')}
          className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-colors ${
            filterCat === 'all' ? 'bg-cyan-950 text-cyan-400 border border-cyan-800' : 'bg-gray-800 text-gray-400 hover:text-gray-200 border border-gray-700'
          }`}
        >
          All ({gear.length})
        </button>
        {CATEGORIES.map(cat => {
          const count = gear.filter(g => g.category === cat).length
          if (count === 0) return null
          return (
            <button
              key={cat}
              onClick={() => setFilterCat(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-colors ${
                filterCat === cat ? 'bg-cyan-950 text-cyan-400 border border-cyan-800' : 'bg-gray-800 text-gray-400 hover:text-gray-200 border border-gray-700'
              }`}
            >
              {cat} ({count})
            </button>
          )
        })}
      </div>

      {/* Add gear form */}
      {showForm && (
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
          <h2 className="text-base font-semibold text-gray-100 mb-5">Add New Gear Item</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-xs text-gray-400">Name *</label>
              <input
                {...register('name', { required: true })}
                placeholder="e.g. Kakwa 55"
                className="bg-gray-800 border border-gray-700 text-gray-100 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-cyan-500 transition-colors"
              />
              {errors.name && <span className="text-xs text-red-400">Required</span>}
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs text-gray-400">Category *</label>
              <select
                {...register('category', { required: true })}
                className="bg-gray-800 border border-gray-700 text-gray-100 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-cyan-500 transition-colors"
              >
                <option value="">Select category</option>
                {CATEGORIES.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs text-gray-400">Weight (g)</label>
              <input
                type="number"
                {...register('weight_g')}
                placeholder="1100"
                className="bg-gray-800 border border-gray-700 text-gray-100 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-cyan-500 transition-colors"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs text-gray-400">CLO (insulation)</label>
              <input
                type="number" step="0.1"
                {...register('clo')}
                placeholder="4.5"
                className="bg-gray-800 border border-gray-700 text-gray-100 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-cyan-500 transition-colors"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs text-gray-400">Temp Rating (°C)</label>
              <input
                type="number"
                {...register('temp_rating')}
                placeholder="-5"
                className="bg-gray-800 border border-gray-700 text-gray-100 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-cyan-500 transition-colors"
              />
            </div>
            <div className="flex flex-col gap-1 sm:col-span-2 lg:col-span-3">
              <label className="text-xs text-gray-400">Notes</label>
              <textarea
                {...register('notes')}
                rows={2}
                placeholder="Performance notes, field observations..."
                className="bg-gray-800 border border-gray-700 text-gray-100 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-cyan-500 transition-colors resize-none"
              />
            </div>
            <div className="flex gap-3 sm:col-span-2 lg:col-span-3 pt-2">
              <button
                type="submit"
                className="bg-cyan-600 hover:bg-cyan-500 text-white px-5 py-2 rounded-xl text-sm font-medium transition-colors"
              >
                Save Item
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

      {/* Gear table */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
        {filtered.length === 0 ? (
          <div className="p-12 text-center text-gray-500 text-sm">
            No gear in this category.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-400">Name</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-400">Category</th>
                  <th className="text-right py-3 px-4 text-xs font-medium text-gray-400">Weight (g)</th>
                  <th className="text-right py-3 px-4 text-xs font-medium text-gray-400">CLO</th>
                  <th className="text-right py-3 px-4 text-xs font-medium text-gray-400">Temp (°C)</th>
                  <th className="text-right py-3 px-4 text-xs font-medium text-gray-400">Trips Used</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-400 hidden lg:table-cell">Notes</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(item => (
                  <tr key={item.id} className="border-b border-gray-800/50 hover:bg-gray-800/30 transition-colors">
                    <td className="py-3 px-4 font-medium text-gray-100">{item.name}</td>
                    <td className="py-3 px-4">
                      <Badge text={item.category} color={categoryColors[item.category] || 'slate'} />
                    </td>
                    <td className="py-3 px-4 text-right text-gray-300">{item.weight_g ?? '—'}</td>
                    <td className="py-3 px-4 text-right text-gray-300">{item.clo ?? '—'}</td>
                    <td className="py-3 px-4 text-right text-gray-300">
                      {item.temp_rating != null ? item.temp_rating : '—'}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span className="text-cyan-400 font-medium">{tripCount(item.id)}</span>
                    </td>
                    <td className="py-3 px-4 text-gray-400 text-xs max-w-xs truncate hidden lg:table-cell">
                      {item.notes || '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Weight summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {CATEGORIES.filter(c => gear.some(g => g.category === c)).map(cat => {
          const items = gear.filter(g => g.category === cat)
          const w = items.reduce((s, g) => s + (g.weight_g || 0), 0)
          return (
            <div key={cat} className="bg-gray-900 border border-gray-800 rounded-xl p-3">
              <p className="text-xs text-gray-400 capitalize">{cat}</p>
              <p className="text-lg font-bold text-gray-100 mt-1">{w}g</p>
              <p className="text-xs text-gray-500">{items.length} item{items.length !== 1 ? 's' : ''}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
