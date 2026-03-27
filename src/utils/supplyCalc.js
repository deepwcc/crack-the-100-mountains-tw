/**
 * Caloric density: kcal per gram of food item.
 */
export function caloricDensity(kcal, weight_g) {
  if (!weight_g || weight_g <= 0) return 0
  return Math.round((kcal / weight_g) * 100) / 100
}

/**
 * Total calories across a list of food items.
 * Each item: { kcal: number, quantity?: number }
 */
export function totalCalories(foodItems) {
  return foodItems.reduce((sum, item) => {
    const qty = item.quantity || 1
    return sum + (item.kcal || 0) * qty
  }, 0)
}

/**
 * Water consumption rate in ml per hour.
 */
export function waterPerHour(water_ml, duration_h) {
  if (!duration_h || duration_h <= 0) return 0
  return Math.round(water_ml / duration_h)
}
