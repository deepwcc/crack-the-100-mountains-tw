export const seedTrips = [
  {
    id: 'seed-trip-001',
    name: '玉山主峰',
    date: '2025-11-03',
    distance_km: 22.3,
    gain_m: 1400,
    loss_m: 1400,
    duration_h: 9.5,
    avg_hr: 148,
    avg_pace: 2.3,
    hr_zones: { z1: 20, z2: 95, z3: 110, z4: 45, z5: 10 },
    calories: 2800,
    water_ml: 3200,
    weather: 'Partly Cloudy, -3°C at summit',
    estimated_h: 8.0,
    gear_ids: ['seed-gear-001', 'seed-gear-002', 'seed-gear-003'],
    gpx_points: null,
    lessons: '## Lessons Learned\n- Foot warmers expired — carry backup chemical toe warmers next time.\n- BeFree flow rate dropped significantly after day 2. Pre-filter needed.',
    notes: 'Summit reached at 07:30. Clear visibility from Yushan peak. Snow present above 3500m.'
  }
]

export const seedGear = [
  {
    id: 'seed-gear-001',
    name: 'Kakwa 55',
    category: 'pack',
    weight_g: 1100,
    clo: null,
    temp_rating: null,
    notes: 'Main expedition pack. Hip belt pockets very convenient for snacks and navigation.'
  },
  {
    id: 'seed-gear-002',
    name: 'EE 30F Quilt',
    category: 'sleep',
    weight_g: 680,
    clo: 4.5,
    temp_rating: -5,
    notes: 'Excellent warmth-to-weight ratio. Tested down to -8°C with liner. Footbox slightly drafty.'
  },
  {
    id: 'seed-gear-003',
    name: 'BeFree 1L',
    category: 'filter',
    weight_g: 65,
    clo: null,
    temp_rating: null,
    notes: 'Flow rate degrades with silty water sources. Pre-filtering with bandana helps significantly.'
  }
]
