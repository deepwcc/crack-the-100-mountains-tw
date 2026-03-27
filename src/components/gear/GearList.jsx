import Badge from '../ui/Badge'

const categoryColors = {
  pack: 'cyan',
  sleep: 'purple',
  filter: 'green',
  shelter: 'orange',
  clothing: 'slate',
  footwear: 'yellow',
  navigation: 'slate',
  medical: 'red',
  other: 'slate',
}

export default function GearList({ gearIds, allGear }) {
  if (!gearIds || gearIds.length === 0) {
    return (
      <p className="text-gray-500 text-sm italic">No gear linked to this trip.</p>
    )
  }

  const items = gearIds
    .map(id => allGear.find(g => g.id === id))
    .filter(Boolean)

  if (items.length === 0) {
    return (
      <p className="text-gray-500 text-sm italic">Gear items not found.</p>
    )
  }

  const totalWeight = items.reduce((sum, g) => sum + (g.weight_g || 0), 0)

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider">Gear Used</h3>
        <span className="text-xs text-gray-400">Total: <strong className="text-cyan-400">{totalWeight}g</strong></span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-800">
              <th className="text-left py-2 px-3 text-xs text-gray-400 font-medium">Name</th>
              <th className="text-left py-2 px-3 text-xs text-gray-400 font-medium">Category</th>
              <th className="text-right py-2 px-3 text-xs text-gray-400 font-medium">Weight (g)</th>
              <th className="text-right py-2 px-3 text-xs text-gray-400 font-medium">CLO</th>
              <th className="text-right py-2 px-3 text-xs text-gray-400 font-medium">Temp (°C)</th>
              <th className="text-left py-2 px-3 text-xs text-gray-400 font-medium hidden md:table-cell">Notes</th>
            </tr>
          </thead>
          <tbody>
            {items.map(item => (
              <tr key={item.id} className="border-b border-gray-800/50 hover:bg-gray-800/30 transition-colors">
                <td className="py-2 px-3 font-medium text-gray-100">{item.name}</td>
                <td className="py-2 px-3">
                  <Badge text={item.category} color={categoryColors[item.category] || 'slate'} />
                </td>
                <td className="py-2 px-3 text-right text-gray-300">{item.weight_g ?? '—'}</td>
                <td className="py-2 px-3 text-right text-gray-300">{item.clo ?? '—'}</td>
                <td className="py-2 px-3 text-right text-gray-300">
                  {item.temp_rating != null ? item.temp_rating : '—'}
                </td>
                <td className="py-2 px-3 text-gray-400 text-xs hidden md:table-cell max-w-xs truncate">
                  {item.notes || '—'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
