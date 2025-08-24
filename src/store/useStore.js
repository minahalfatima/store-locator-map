import { create } from 'zustand'

const toRad = (d) => d * Math.PI / 180
export const haversine = (lat1, lon1, lat2, lon2) => {
  const R = 6371e3
  const dLat = toRad(lat2 - lat1)
  const dLon = toRad(lon2 - lon1)
  const a = Math.sin(dLat/2)**2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon/2)**2
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
  return R * c
}

export const useStore = create((set, get) => ({
  stores: [],
  filtered: [],
  activeZone: { center: [51.050112, -114.085291], radius: 1500 }, // meters
  selectedId: null,
  loading: false,
  error: null,
  fetchStores: async () => {
    set({ loading: true, error: null })
    try {
      const res = await fetch('/stores.json')
      const data = await res.json()
      set({ stores: data, loading: false })
      get().applyZone()
    } catch (e) {
      set({ error: e.message, loading: false })
    }
  },
  setSelected: (id) => set({ selectedId: id }),
  updateStore: (id, patch) => {
    const stores = get().stores.map(s => s.id === id ? { ...s, ...patch } : s)
    set({ stores })
    get().applyZone()
  },
  setActiveZone: (zone) => {
    set({ activeZone: zone })
    get().applyZone()
  },
  applyZone: () => {
    const { stores, activeZone } = get()
    const filtered = stores.filter(s => {
      const d = haversine(activeZone.center[0], activeZone.center[1], s.latitude, s.longitude)
      return d <= activeZone.radius
    })
    set({ filtered })
  },
  search: (q) => {
    const { stores, activeZone } = get()
    const ql = (q || '').toLowerCase()
    const filtered = stores.filter(s => {
      const textMatch = s.name.toLowerCase().includes(ql) || s.type.toLowerCase().includes(ql)
      const inZone = haversine(activeZone.center[0], activeZone.center[1], s.latitude, s.longitude) <= activeZone.radius
      return textMatch && inZone
    })
    set({ filtered })
  }
}))
