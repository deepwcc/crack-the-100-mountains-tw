import { useState } from 'react'
import { getTrips, saveTrips } from '../data/storage'

export function useTrips() {
  const [trips, setTrips] = useState(() => getTrips())

  function addTrip(trip) {
    const updated = [trip, ...trips]
    setTrips(updated)
    saveTrips(updated)
  }

  function updateTrip(updatedTrip) {
    const updated = trips.map(t => t.id === updatedTrip.id ? updatedTrip : t)
    setTrips(updated)
    saveTrips(updated)
  }

  function deleteTrip(id) {
    const updated = trips.filter(t => t.id !== id)
    setTrips(updated)
    saveTrips(updated)
  }

  function getTrip(id) {
    return trips.find(t => t.id === id) || null
  }

  return { trips, addTrip, updateTrip, deleteTrip, getTrip }
}
