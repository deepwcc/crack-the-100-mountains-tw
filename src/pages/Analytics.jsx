import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip,
  ResponsiveContainer, ReferenceLine, Cell
} from 'recharts'
import FormulaBlock from '../components/ui/FormulaBlock'
import StatCard from '../components/ui/StatCard'
import { z2z3Ratio, computeZoneRatios } from '../utils/hrZones'
import { efficiencyIndex } from '../utils/elevationCalc'
import { waterPerHour } from '../utils/supplyCalc'

const DarkTooltip = ({ active, payload, label, unit }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm">
        <p className="text-gray-400 text-xs">{label}</p>
        <p className="font-semibold text-cyan-400">{payload[0].value}{unit}</p>
      </div>
    )
  }
  return null
}

export default function Analytics({ trips }) {
  const sorted = [...trips].sort((a, b) => new Date(a.date) - new Date(b.date))

  const hrData = sorted
    .filter(t => t.avg_hr)
    .map(t => ({ name: t.name.slice(0, 4), date: t.date, hr: t.avg_hr }))

  const z2Data = sorted
    .filter(t => t.hr_zones)
    .map(t => ({
      name: t.name.slice(0, 4),
      date: t.date,
      z2ratio: z2z3Ratio(t.hr_zones),
    }))

  const totalKm = trips.reduce((s, t) => s + (t.distance_km || 0), 0)
  const totalGain = trips.reduce((s, t) => s + (t.gain_m || 0), 0)
  const avgHR = trips.length
    ? Math.round(trips.filter(t => t.avg_hr).reduce((s, t) => s + t.avg_hr, 0) / trips.filter(t => t.avg_hr).length)
    : 0
  const avgZ23 = trips.length
    ? Math.round(trips.filter(t => t.hr_zones).reduce((s, t) => s + z2z3Ratio(t.hr_zones), 0) / trips.filter(t => t.hr_zones).length)
    : 0
  const avgEff = trips.length
    ? (trips.reduce((s, t) => s + efficiencyIndex(t.gain_m, t.duration_h, t.avg_hr), 0) / trips.length).toFixed(2)
    : 0
  const avgWaterPH = trips.filter(t => t.water_ml && t.duration_h).length
    ? Math.round(trips.filter(t => t.water_ml && t.duration_h).reduce((s, t) => s + waterPerHour(t.water_ml, t.duration_h), 0) / trips.filter(t => t.water_ml && t.duration_h).length)
    : 0

  return (
    <div className="p-6 flex flex-col gap-8 max-w-5xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-100">Analytics</h1>
        <p className="text-sm text-gray-400 mt-1">Performance metrics across {trips.length} expedition{trips.length !== 1 ? 's' : ''}</p>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Distance" value={totalKm.toFixed(1)} unit="km" accent="cyan" />
        <StatCard label="Total Elev Gain" value={`${(totalGain / 1000).toFixed(1)}`} unit="km" accent="green" />
        <StatCard label="Avg Heart Rate" value={avgHR || '—'} unit="bpm" accent="red" />
        <StatCard label="Avg Z2+Z3" value={`${avgZ23}%`} unit="" accent="orange" />
        <StatCard label="Avg Efficiency" value={avgEff} unit="m/(h·bpm)" accent="cyan" />
        <StatCard label="Avg Water Rate" value={avgWaterPH || '—'} unit="ml/h" accent="green" />
        <StatCard label="Trips Logged" value={trips.length} unit="/ 100" accent="orange" />
        <StatCard label="Avg Duration" value={trips.length ? (trips.reduce((s, t) => s + (t.duration_h || 0), 0) / trips.length).toFixed(1) : '—'} unit="h" accent="red" />
      </div>

      {/* HR over time */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
        <h2 className="text-sm font-semibold text-gray-300 mb-4">Average HR per Trip</h2>
        {hrData.length === 0 ? (
          <p className="text-gray-500 text-sm text-center py-8">No HR data available.</p>
        ) : (
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={hrData} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
              <XAxis dataKey="name" tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} domain={['auto', 'auto']} />
              <Tooltip content={<DarkTooltip unit=" bpm" />} />
              <ReferenceLine y={140} stroke="#64748b" strokeDasharray="4 4" />
              <Line
                type="monotone"
                dataKey="hr"
                stroke="#ef4444"
                strokeWidth={2}
                dot={{ fill: '#ef4444', r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Z2 ratio per trip */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-gray-300">Z2+Z3 Ratio per Trip</h2>
          <span className="text-xs text-green-400">Target: ≥ 60%</span>
        </div>
        {z2Data.length === 0 ? (
          <p className="text-gray-500 text-sm text-center py-8">No HR zone data available.</p>
        ) : (
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={z2Data} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
              <XAxis dataKey="name" tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} domain={[0, 100]} tickFormatter={v => `${v}%`} />
              <Tooltip content={<DarkTooltip unit="%" />} />
              <ReferenceLine y={60} stroke="#22c55e" strokeDasharray="4 4" label={{ value: '60% target', fill: '#22c55e', fontSize: 10, position: 'insideTopRight' }} />
              <Bar dataKey="z2ratio" radius={[4, 4, 0, 0]}>
                {z2Data.map((entry, i) => (
                  <Cell key={i} fill={entry.z2ratio >= 60 ? '#22c55e' : '#f97316'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* VO2 Max formula */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
        <h2 className="text-sm font-semibold text-gray-300 mb-1">VO₂ Max Estimate</h2>
        <p className="text-xs text-gray-500 mb-4">
          Astrand–Ryhming approximation using HR ratio (requires resting HR for accuracy).
        </p>
        <FormulaBlock
          formula={`\\dot{V}O_2\\text{max} \\approx 15 \\times \\frac{HR_{max}}{HR_{rest}}`}
          display={true}
        />
        <p className="text-xs text-gray-500 mt-3 text-center">
          Example: 15 × (185 / 55) ≈ 50.5 mL/(kg·min)
        </p>
      </div>

      {/* Zone performance table */}
      {trips.some(t => t.hr_zones) && (
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
          <h2 className="text-sm font-semibold text-gray-300 mb-4">Trip Performance Summary</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="text-left py-2 px-3 text-xs text-gray-400">Mountain</th>
                  <th className="text-left py-2 px-3 text-xs text-gray-400">Date</th>
                  <th className="text-right py-2 px-3 text-xs text-gray-400">Avg HR</th>
                  <th className="text-right py-2 px-3 text-xs text-gray-400">Z2+Z3 %</th>
                  <th className="text-right py-2 px-3 text-xs text-gray-400">Efficiency</th>
                  <th className="text-right py-2 px-3 text-xs text-gray-400">Pace (km/h)</th>
                </tr>
              </thead>
              <tbody>
                {sorted.map(trip => (
                  <tr key={trip.id} className="border-b border-gray-800/50 hover:bg-gray-800/30 transition-colors">
                    <td className="py-2 px-3 font-medium text-gray-100">{trip.name}</td>
                    <td className="py-2 px-3 text-gray-400">{trip.date}</td>
                    <td className="py-2 px-3 text-right text-gray-300">{trip.avg_hr || '—'}</td>
                    <td className="py-2 px-3 text-right">
                      {trip.hr_zones ? (
                        <span className={z2z3Ratio(trip.hr_zones) >= 60 ? 'text-green-400' : 'text-orange-400'}>
                          {z2z3Ratio(trip.hr_zones)}%
                        </span>
                      ) : '—'}
                    </td>
                    <td className="py-2 px-3 text-right text-cyan-400">
                      {efficiencyIndex(trip.gain_m, trip.duration_h, trip.avg_hr) || '—'}
                    </td>
                    <td className="py-2 px-3 text-right text-gray-300">{trip.avg_pace || '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
