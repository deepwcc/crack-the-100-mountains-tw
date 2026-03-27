const colorMap = {
  cyan: 'bg-cyan-900 text-cyan-300 border border-cyan-700',
  green: 'bg-green-900 text-green-300 border border-green-700',
  orange: 'bg-orange-900 text-orange-300 border border-orange-700',
  red: 'bg-red-900 text-red-300 border border-red-700',
  slate: 'bg-slate-800 text-slate-300 border border-slate-600',
  purple: 'bg-purple-900 text-purple-300 border border-purple-700',
  yellow: 'bg-yellow-900 text-yellow-300 border border-yellow-700',
}

export default function Badge({ text, color = 'cyan' }) {
  const cls = colorMap[color] || colorMap.slate
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${cls}`}>
      {text}
    </span>
  )
}
