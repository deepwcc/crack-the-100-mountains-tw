import { seedTrips, seedGear } from './seed'

const KEYS = {
  trips: 'mtw_trips',
  gear: 'mtw_gear',
}

export function getTrips() {
  try {
    const raw = localStorage.getItem(KEYS.trips)
    if (!raw) return seedTrips
    return JSON.parse(raw)
  } catch {
    return seedTrips
  }
}

export function saveTrips(trips) {
  localStorage.setItem(KEYS.trips, JSON.stringify(trips))
}

export function getGear() {
  try {
    const raw = localStorage.getItem(KEYS.gear)
    if (!raw) return seedGear
    return JSON.parse(raw)
  } catch {
    return seedGear
  }
}

export function saveGear(gear) {
  localStorage.setItem(KEYS.gear, JSON.stringify(gear))
}
