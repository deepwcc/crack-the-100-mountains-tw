const accentColors = {
  cyan: 'border-cyan-500 text-cyan-400',
  green: 'border-green-500 text-green-400',
  orange: 'border-orange-500 text-orange-400',
  red: 'border-red-500 text-red-400',
}

export default function StatCard({ label, value, unit, accent = 'cyan' }) {
  const accentClass = accentColors[accent] || accentColors.cyan

  return (
    <div className={`bg-gray-900 border border-gray-800 border-l-4 ${accentClass.split(' ')[0]} rounded-xl p-4 flex flex-col gap-1 transition-all hover:border-gray-700`}>
      <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">{label}</span>
      <div className="flex items-baseline gap-1 mt-1">
        <span className={`text-2xl font-bold ${accentClass.split(' ')[1]}`}>{value}</span>
        {unit && <span className="text-sm text-gray-400">{unit}</span>}
      </div>
    </div>
  )
}
