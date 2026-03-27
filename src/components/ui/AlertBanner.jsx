import { alertReadiness } from '../../utils/elevationCalc'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'

export default function AlertBanner({ actual_h, estimated_h }) {
  if (!alertReadiness(actual_h, estimated_h)) return null

  const overrun = actual_h && estimated_h
    ? Math.round(((actual_h - estimated_h) / estimated_h) * 100)
    : 0

  return (
    <div className="flex items-start gap-3 bg-orange-950 border border-orange-700 rounded-xl p-4 text-orange-300">
      <ExclamationTriangleIcon className="w-5 h-5 mt-0.5 shrink-0 text-orange-400" />
      <div>
        <p className="font-semibold text-orange-200">Readiness Alert</p>
        <p className="text-sm mt-0.5">
          Actual duration ({actual_h}h) exceeded estimated time ({estimated_h}h) by{' '}
          <strong>{overrun}%</strong>. Consider reviewing pacing strategy, fitness level, or route estimation for future trips.
        </p>
      </div>
    </div>
  )
}
