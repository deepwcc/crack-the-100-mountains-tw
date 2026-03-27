/**
 * Efficiency Index: E = gain_m / (hours * avg_hr)
 * Higher is better — measures how much vertical you gained per unit of cardiac effort.
 */
export function efficiencyIndex(gain_m, hours, avg_hr) {
  if (!hours || !avg_hr) return 0
  return Math.round((gain_m / (hours * avg_hr)) * 100) / 100
}

/**
 * Returns true when actual time exceeds estimated time by more than 20%.
 * Signals that the hiker may be fatigued or underprepared.
 */
export function alertReadiness(actual_h, estimated_h) {
  if (!estimated_h || estimated_h <= 0) return false
  return actual_h > estimated_h * 1.2
}
