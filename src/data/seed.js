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
  },
  {
    id: 'seed-trip-002',
    name: '雪山西稜',
    date: '2026-05-22',
    distance_km: 0,
    gain_m: 0,
    loss_m: 0,
    duration_h: 0,
    avg_hr: 0,
    avg_pace: 0,
    hr_zones: { z1: 0, z2: 0, z3: 0, z4: 0, z5: 0 },
    calories: 0,
    water_ml: 0,
    weather: '',
    estimated_h: 36.0,
    gear_ids: [
      'xiling-gear-001', 'xiling-gear-002', 'xiling-gear-003', 'xiling-gear-004',
      'xiling-gear-005', 'xiling-gear-006', 'xiling-gear-007', 'xiling-gear-008',
      'xiling-gear-009', 'xiling-gear-010', 'xiling-gear-011', 'xiling-gear-012',
      'xiling-gear-013', 'xiling-gear-014', 'xiling-gear-015', 'xiling-gear-016',
      'xiling-gear-017', 'xiling-gear-018', 'xiling-gear-019', 'xiling-gear-020',
      'xiling-gear-021'
    ],
    gpx_points: null,
    lessons: '',
    notes: '6天5夜縱走行程，2026/5/22–27。系統總重 5565g（含相機系統）。'
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
  },
  // 雪山西稜 2026/5/22-27 裝備清單
  // The Big 3
  {
    id: 'xiling-gear-001',
    name: 'Durston Kakwa 55 M',
    category: 'pack',
    weight_g: 890,
    clo: null,
    temp_rating: null,
    notes: '雪山西稜主背包。'
  },
  {
    id: 'xiling-gear-002',
    name: 'Rab Ultrasphere 5 Regular Wide',
    category: 'sleep',
    weight_g: 536,
    clo: null,
    temp_rating: null,
    notes: '睡袋。'
  },
  {
    id: 'xiling-gear-003',
    name: '100 Mountain Air Pillow',
    category: 'sleep',
    weight_g: 127,
    clo: null,
    temp_rating: null,
    notes: '充氣枕頭。'
  },
  {
    id: 'xiling-gear-004',
    name: 'EE Enigma -1',
    category: 'sleep',
    weight_g: 480,
    clo: null,
    temp_rating: -1,
    notes: '輕量羽絨睡被。'
  },
  // Clothes Worn While Hiking
  {
    id: 'xiling-gear-005',
    name: 'Hoka Speedgoat 6 non-gtx (wide)',
    category: 'footwear',
    weight_g: 307,
    clo: null,
    temp_rating: null,
    notes: '寬楦登山鞋，數量 2 雙，總重 614g。'
  },
  {
    id: 'xiling-gear-006',
    name: "Arc'teryx Gamma LT",
    category: 'clothing',
    weight_g: 333,
    clo: null,
    temp_rating: null,
    notes: '行進間外層。'
  },
  {
    id: 'xiling-gear-007',
    name: 'Decathlon Merino T-shirt',
    category: 'clothing',
    weight_g: 150,
    clo: null,
    temp_rating: null,
    notes: '美麗諾羊毛底層。'
  },
  {
    id: 'xiling-gear-008',
    name: 'Smartwool Merino Socks',
    category: 'clothing',
    weight_g: 50,
    clo: null,
    temp_rating: null,
    notes: '美麗諾羊毛襪，數量 2 雙，總重 100g。'
  },
  {
    id: 'xiling-gear-009',
    name: 'Buff Wool Headwear',
    category: 'clothing',
    weight_g: 33,
    clo: null,
    temp_rating: null,
    notes: '頭巾。'
  },
  {
    id: 'xiling-gear-010',
    name: 'Cap',
    category: 'clothing',
    weight_g: 0,
    clo: null,
    temp_rating: null,
    notes: '鴨舌帽。'
  },
  // Clothes In Pack
  {
    id: 'xiling-gear-011',
    name: 'Montbell Versalite Raincoat ML',
    category: 'clothing',
    weight_g: 185,
    clo: null,
    temp_rating: null,
    notes: '備用雨衣。'
  },
  {
    id: 'xiling-gear-012',
    name: 'Senchi Design Alpha 90 Hoodie',
    category: 'clothing',
    weight_g: 120,
    clo: null,
    temp_rating: null,
    notes: '刷毛連帽衣，備用保暖層。'
  },
  {
    id: 'xiling-gear-013',
    name: 'Uniqlo Heatteck Pufftech Vest',
    category: 'clothing',
    weight_g: 178,
    clo: null,
    temp_rating: null,
    notes: '輕量保暖背心。'
  },
  {
    id: 'xiling-gear-014',
    name: "Arc'teryx Wool Hat",
    category: 'clothing',
    weight_g: 53,
    clo: null,
    temp_rating: null,
    notes: '羊毛毛帽，備用。'
  },
  // Electronics
  {
    id: 'xiling-gear-015',
    name: 'Nitecore NU25 UL',
    category: 'electronics',
    weight_g: 45,
    clo: null,
    temp_rating: null,
    notes: '輕量頭燈。'
  },
  {
    id: 'xiling-gear-016',
    name: 'SP QS55 20000mAh',
    category: 'electronics',
    weight_g: 310,
    clo: null,
    temp_rating: null,
    notes: '行動電源 20000mAh，供相機與手機充電。'
  },
  // Cookware & Water
  {
    id: 'xiling-gear-017',
    name: 'Soto SOD-510 (down)',
    category: 'cookware',
    weight_g: 132,
    clo: null,
    temp_rating: null,
    notes: '輕量瓦斯爐，適合高海拔低溫使用。'
  },
  {
    id: 'xiling-gear-018',
    name: 'Snow Peak Fork & Spoon',
    category: 'cookware',
    weight_g: 15,
    clo: null,
    temp_rating: null,
    notes: '鈦金屬餐具組。'
  },
  // Camera System
  {
    id: 'xiling-gear-019',
    name: 'Sony A7Riii',
    category: 'camera',
    weight_g: 650,
    clo: null,
    temp_rating: null,
    notes: '含電池重 650g。'
  },
  {
    id: 'xiling-gear-020',
    name: 'Tamron 28-75 g2',
    category: 'camera',
    weight_g: 540,
    clo: null,
    temp_rating: null,
    notes: '標準變焦鏡頭。'
  },
  {
    id: 'xiling-gear-021',
    name: 'PD Capture V3',
    category: 'camera',
    weight_g: 74,
    clo: null,
    temp_rating: null,
    notes: '相機快扣背帶夾。'
  }
]
