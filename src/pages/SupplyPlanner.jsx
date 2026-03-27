import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { v4 as uuidv4 } from 'uuid'
import { caloricDensity, totalCalories, waterPerHour } from '../utils/supplyCalc'
import StatCard from '../components/ui/StatCard'
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline'

const DEFAULT_FOOD = [
  { id: 'f1', name: 'Pemmican Bar', kcal: 450, weight_g: 90, quantity: 1 },
  { id: 'f2', name: 'Trail Mix (nuts/seeds)', kcal: 600, weight_g: 100, quantity: 1 },
  { id: 'f3', name: 'Instant Ramen', kcal: 380, weight_g: 85, quantity: 1 },
  { id: 'f4', name: 'Olive Oil Packet', kcal: 120, weight_g: 14, quantity: 2 },
  { id: 'f5', name: 'Tortilla (flour)', kcal: 146, weight_g: 43, quantity: 2 },
]

export default function SupplyPlanner({ trips }) {
  const [trailDays, setTrailDays] = useState(3)
  const [dailyTarget, setDailyTarget] = useState(2800)
  const [foodItems, setFoodItems] = useState(DEFAULT_FOOD)
  const { register, handleSubmit, reset } = useForm()

  function addFoodItem(data) {
    const item = {
      id: uuidv4(),
      name: data.name,
      kcal: parseInt(data.kcal) || 0,
      weight_g: parseInt(data.weight_g) || 0,
      quantity: parseInt(data.quantity) || 1,
    }
    setFoodItems(prev => [...prev, item])
    reset()
  }

  function removeFoodItem(id) {
    setFoodItems(prev => prev.filter(f => f.id !== id))
  }

  function updateQty(id, qty) {
    setFoodItems(prev => prev.map(f => f.id === id ? { ...f, quantity: Math.max(0, qty) } : f))
  }

  const total = totalCalories(foodItems)
  const totalPerDay = Math.round(total / Math.max(trailDays, 1))
  const totalWeight = foodItems.reduce((s, f) => s + (f.weight_g || 0) * (f.quantity || 1), 0)
  const deficit = (dailyTarget * trailDays) - total

  // Water stats from trips
  const tripsWithWater = trips.filter(t => t.water_ml && t.duration_h)
  const avgWaterPH = tripsWithWater.length
    ? Math.round(tripsWithWater.reduce((s, t) => s + waterPerHour(t.water_ml, t.duration_h), 0) / tripsWithWater.length)
    : 400
  const projectedWater = Math.round(avgWaterPH * 8 * trailDays)

  return (
    <div className="p-6 flex flex-col gap-8 max-w-5xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-100">Supply Planner</h1>
        <p className="text-sm text-gray-400 mt-1">Plan caloric intake and water for your next expedition</p>
      </div>

      {/* Settings */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
        <h2 className="text-sm font-semibold text-gray-300 mb-4">Trip Parameters</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-xs text-gray-400">Trail Days</label>
            <input
              type="number"
              min={1}
              max={30}
              value={trailDays}
              onChange={e => setTrailDays(parseInt(e.target.value) || 1)}
              className="bg-gray-800 border border-gray-700 text-gray-100 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-cyan-500 transition-colors"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs text-gray-400">Daily Caloric Target (kcal)</label>
            <input
              type="number"
              min={1000}
              max={6000}
              value={dailyTarget}
              onChange={e => setDailyTarget(parseInt(e.target.value) || 2000)}
              className="bg-gray-800 border border-gray-700 text-gray-100 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-cyan-500 transition-colors"
            />
          </div>
        </div>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Calories" value={total} unit="kcal" accent="orange" />
        <StatCard label="Calories / Day" value={totalPerDay} unit="kcal/day" accent={totalPerDay >= dailyTarget ? 'green' : 'red'} />
        <StatCard label="Food Weight" value={totalWeight} unit="g" accent="cyan" />
        <StatCard
          label={deficit > 0 ? 'Caloric Deficit' : 'Caloric Surplus'}
          value={Math.abs(deficit)}
          unit="kcal"
          accent={deficit > 0 ? 'red' : 'green'}
        />
      </div>

      {/* Progress bar toward daily target */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-300">Progress toward target ({dailyTarget * trailDays} kcal for {trailDays} days)</span>
          <span className="text-sm font-bold text-cyan-400">{Math.min(100, Math.round((total / (dailyTarget * trailDays)) * 100))}%</span>
        </div>
        <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all ${deficit > 0 ? 'bg-orange-500' : 'bg-green-500'}`}
            style={{ width: `${Math.min(100, Math.round((total / (dailyTarget * trailDays)) * 100))}%` }}
          />
        </div>
      </div>

      {/* Food table */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-800 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-gray-300">Food Items</h2>
          <span className="text-xs text-gray-500">Items with &lt; 4.5 kcal/g highlighted in orange</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-400">Name</th>
                <th className="text-right py-3 px-4 text-xs font-medium text-gray-400">kcal</th>
                <th className="text-right py-3 px-4 text-xs font-medium text-gray-400">Weight (g)</th>
                <th className="text-right py-3 px-4 text-xs font-medium text-gray-400">kcal/g</th>
                <th className="text-center py-3 px-4 text-xs font-medium text-gray-400">Qty</th>
                <th className="text-right py-3 px-4 text-xs font-medium text-gray-400">Total kcal</th>
                <th className="py-3 px-4" />
              </tr>
            </thead>
            <tbody>
              {foodItems.map(item => {
                const density = caloricDensity(item.kcal, item.weight_g)
                const isLowDensity = density > 0 && density < 4.5
                return (
                  <tr
                    key={item.id}
                    className={`border-b border-gray-800/50 transition-colors ${isLowDensity ? 'bg-orange-950/20 hover:bg-orange-950/30' : 'hover:bg-gray-800/30'}`}
                  >
                    <td className="py-2 px-4 font-medium text-gray-100">{item.name}</td>
                    <td className="py-2 px-4 text-right text-gray-300">{item.kcal}</td>
                    <td className="py-2 px-4 text-right text-gray-300">{item.weight_g}</td>
                    <td className={`py-2 px-4 text-right font-medium ${isLowDensity ? 'text-orange-400' : 'text-green-400'}`}>
                      {density > 0 ? density : '—'}
                    </td>
                    <td className="py-2 px-4 text-center">
                      <input
                        type="number"
                        min={0}
                        max={99}
                        value={item.quantity}
                        onChange={e => updateQty(item.id, parseInt(e.target.value) || 0)}
                        className="w-16 bg-gray-800 border border-gray-700 text-gray-100 rounded-lg px-2 py-1 text-sm text-center focus:outline-none focus:border-cyan-500"
                      />
                    </td>
                    <td className="py-2 px-4 text-right text-cyan-400 font-medium">
                      {item.kcal * item.quantity}
                    </td>
                    <td className="py-2 px-4 text-right">
                      <button
                        onClick={() => removeFoodItem(item.id)}
                        className="p-1 text-gray-600 hover:text-red-400 transition-colors rounded"
                      >
                        <TrashIcon className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
            <tfoot>
              <tr className="border-t border-gray-700 bg-gray-800/30">
                <td colSpan={5} className="py-2 px-4 text-xs text-gray-400 font-medium">Total</td>
                <td className="py-2 px-4 text-right font-bold text-cyan-400">{total}</td>
                <td />
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* Add food form */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
        <h2 className="text-sm font-semibold text-gray-300 mb-4">Add Food Item</h2>
        <form onSubmit={handleSubmit(addFoodItem)} className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="flex flex-col gap-1 sm:col-span-2">
            <label className="text-xs text-gray-400">Name</label>
            <input
              {...register('name', { required: true })}
              placeholder="e.g. Energy Bar"
              className="bg-gray-800 border border-gray-700 text-gray-100 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-cyan-500 transition-colors"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs text-gray-400">kcal</label>
            <input
              type="number"
              {...register('kcal', { required: true })}
              placeholder="200"
              className="bg-gray-800 border border-gray-700 text-gray-100 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-cyan-500 transition-colors"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs text-gray-400">Weight (g)</label>
            <input
              type="number"
              {...register('weight_g', { required: true })}
              placeholder="45"
              className="bg-gray-800 border border-gray-700 text-gray-100 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-cyan-500 transition-colors"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs text-gray-400">Qty</label>
            <input
              type="number"
              {...register('quantity')}
              placeholder="1"
              defaultValue={1}
              className="bg-gray-800 border border-gray-700 text-gray-100 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-cyan-500 transition-colors"
            />
          </div>
          <div className="flex items-end sm:col-span-3">
            <button
              type="submit"
              className="flex items-center gap-2 bg-cyan-600 hover:bg-cyan-500 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors"
            >
              <PlusIcon className="w-4 h-4" />
              Add Item
            </button>
          </div>
        </form>
      </div>

      {/* Water analysis */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
        <h2 className="text-sm font-semibold text-gray-300 mb-4">Water Analysis (from Trip Data)</h2>
        {tripsWithWater.length === 0 ? (
          <p className="text-gray-500 text-sm">No trip water data found. Log trips with water consumption to see analysis.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-gray-800/50 rounded-xl p-4">
              <p className="text-xs text-gray-400 mb-1">Avg Water Rate</p>
              <p className="text-2xl font-bold text-cyan-400">{avgWaterPH}<span className="text-sm font-normal text-gray-400"> ml/h</span></p>
            </div>
            <div className="bg-gray-800/50 rounded-xl p-4">
              <p className="text-xs text-gray-400 mb-1">Projected ({trailDays}d × 8h)</p>
              <p className="text-2xl font-bold text-cyan-400">{(projectedWater / 1000).toFixed(1)}<span className="text-sm font-normal text-gray-400"> L</span></p>
            </div>
            <div className="bg-gray-800/50 rounded-xl p-4">
              <p className="text-xs text-gray-400 mb-1">BeFree Fills Needed</p>
              <p className="text-2xl font-bold text-cyan-400">{Math.ceil(projectedWater / 1000)}<span className="text-sm font-normal text-gray-400"> fills</span></p>
              <p className="text-xs text-gray-600 mt-1">@1L per fill</p>
            </div>
          </div>
        )}
        <div className="mt-4 p-3 bg-cyan-950/40 border border-cyan-900/50 rounded-xl">
          <p className="text-xs text-cyan-300 font-medium mb-1">BeFree Hydration Tips</p>
          <ul className="text-xs text-gray-400 space-y-1">
            <li>• Pre-filter with bandana in silty conditions to extend membrane life</li>
            <li>• Backflush daily to maintain flow rate above 3L/min</li>
            <li>• At high altitude (3500m+) increase intake to 500-600ml/h</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
