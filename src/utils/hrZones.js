export const HR_ZONE_RANGES = {
  z1: { label: 'Z1', min: 0, max: 119, color: '#64748b' },
  z2: { label: 'Z2', min: 120, max: 139, color: '#22c55e' },
  z3: { label: 'Z3', min: 140, max: 159, color: '#22d3ee' },
  z4: { label: 'Z4', min: 160, max: 179, color: '#f97316' },
  z5: { label: 'Z5', min: 180, max: 999, color: '#ef4444' },
}

export function classifyHR(bpm) {
  if (bpm < 120) return 'z1'
  if (bpm <= 139) return 'z2'
  if (bpm <= 159) return 'z3'
  if (bpm <= 179) return 'z4'
  return 'z5'
}

export function computeZoneRatios(zone_minutes) {
  const total = Object.values(zone_minutes).reduce((sum, v) => sum + (v || 0), 0)
  if (total === 0) return { z1: 0, z2: 0, z3: 0, z4: 0, z5: 0 }
  const ratios = {}
  for (const key of ['z1', 'z2', 'z3', 'z4', 'z5']) {
    ratios[key] = Math.round(((zone_minutes[key] || 0) / total) * 100)
  }
  return ratios
}

export function z2z3Ratio(zone_minutes) {
  const total = Object.values(zone_minutes).reduce((sum, v) => sum + (v || 0), 0)
  if (total === 0) return 0
  const combined = (zone_minutes.z2 || 0) + (zone_minutes.z3 || 0)
  return Math.round((combined / total) * 100)
}
