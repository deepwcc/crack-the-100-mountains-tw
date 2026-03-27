import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts'

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm">
        <p className="text-gray-400">{label}</p>
        <p className="font-semibold text-cyan-400">{payload[0].value} km/h</p>
      </div>
    )
  }
  return null
}

export default function PaceChart({ trip }) {
  // If we have gpx_points with pace data, use it; otherwise generate synthetic from avg_pace
  let data = []

  if (trip?.gpx_points && trip.gpx_points.length > 1) {
    // Use real GPX data — compute pace between consecutive points
    data = trip.gpx_points.slice(1).map((pt, i) => {
      const prev = trip.gpx_points[i]
      const distDelta = pt.dist_km - prev.dist_km
      const timeDelta = (pt.time_s - prev.time_s) / 3600
      const pace = timeDelta > 0 ? Math.round((distDelta / timeDelta) * 10) / 10 : trip.avg_pace
      return { label: `${pt.dist_km.toFixed(1)}km`, pace }
    })
  } else if (trip?.avg_pace) {
    // Synthetic pace data with slight variance to visualize
    const hours = trip.duration_h || 8
    const points = Math.min(Math.ceil(hours), 12)
    data = Array.from({ length: points }, (_, i) => {
      const h = i + 1
      // Simulate fatigue: pace drops slightly in latter half
      const fatigueFactor = h > hours * 0.6 ? 0.85 : 1.0
      const variance = (Math.sin(i * 1.3) * 0.2)
      const pace = Math.round((trip.avg_pace * fatigueFactor + variance) * 10) / 10
      return { label: `${h}h`, pace: Math.max(pace, 0.5) }
    })
  }

  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center h-48 text-gray-500 text-sm">
        No pace data available
      </div>
    )
  }

  return (
    <ResponsiveContainer width="100%" height={220}>
      <LineChart data={data} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
        <XAxis
          dataKey="label"
          tick={{ fill: '#94a3b8', fontSize: 11 }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tick={{ fill: '#94a3b8', fontSize: 11 }}
          axisLine={false}
          tickLine={false}
          domain={['auto', 'auto']}
        />
        <Tooltip content={<CustomTooltip />} />
        {trip?.avg_pace && (
          <ReferenceLine
            y={trip.avg_pace}
            stroke="#64748b"
            strokeDasharray="4 4"
            label={{ value: 'avg', fill: '#64748b', fontSize: 10 }}
          />
        )}
        <Line
          type="monotone"
          dataKey="pace"
          stroke="#22d3ee"
          strokeWidth={2}
          dot={{ fill: '#22d3ee', r: 3 }}
          activeDot={{ r: 5, fill: '#22d3ee' }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
