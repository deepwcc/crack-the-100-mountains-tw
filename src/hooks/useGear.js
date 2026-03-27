import { useState } from 'react'
import { getGear, saveGear } from '../data/storage'

export function useGear() {
  const [gear, setGear] = useState(() => getGear())

  function addGear(item) {
    const updated = [item, ...gear]
    setGear(updated)
    saveGear(updated)
  }

  function updateGear(updatedItem) {
    const updated = gear.map(g => g.id === updatedItem.id ? updatedItem : g)
    setGear(updated)
    saveGear(updated)
  }

  function deleteGear(id) {
    const updated = gear.filter(g => g.id !== id)
    setGear(updated)
    saveGear(updated)
  }

  function getGearItem(id) {
    return gear.find(g => g.id === id) || null
  }

  return { gear, addGear, updateGear, deleteGear, getGearItem }
}
