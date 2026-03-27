import { BarChart, Bar, XAxis, YAxis, Tooltip, Cell, ResponsiveContainer } from 'recharts'

const ZONE_COLORS = {
  Z1: '#64748b',
  Z2: '#22c55e',
  Z3: '#22d3ee',
  Z4: '#f97316',
  Z5: '#ef4444',
}

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm">
        <p className="font-semibold text-gray-100">{label}</p>
        <p className="text-gray-300">{payload[0].value} min</p>
      </div>
    )
  }
  return null
}

export default function HRZoneChart({ hrZones }) {
  if (!hrZones) return (
    <div className="flex items-center justify-center h-48 text-gray-500 text-sm">No HR zone data available</div>
  )

  const data = [
    { zone: 'Z1', minutes: hrZones.z1 || 0 },
    { zone: 'Z2', minutes: hrZones.z2 || 0 },
    { zone: 'Z3', minutes: hrZones.z3 || 0 },
    { zone: 'Z4', minutes: hrZones.z4 || 0 },
    { zone: 'Z5', minutes: hrZones.z5 || 0 },
  ]

  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={data} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
        <XAxis
          dataKey="zone"
          tick={{ fill: '#94a3b8', fontSize: 12 }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tick={{ fill: '#94a3b8', fontSize: 11 }}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.04)' }} />
        <Bar dataKey="minutes" radius={[4, 4, 0, 0]}>
          {data.map((entry) => (
            <Cell key={entry.zone} fill={ZONE_COLORS[entry.zone]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}
