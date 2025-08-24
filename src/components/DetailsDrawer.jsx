// src/components/DetailsDrawer.jsx
import React, { useEffect, useMemo, useState } from 'react'
import { useStore } from '../store/useStore'
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { motion, AnimatePresence } from 'framer-motion'

const dummySeries = Array.from({ length: 12 }).map((_, i) => ({
  month: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][i],
  visits: Math.round(200 + Math.random() * 800),
}))

export default function DetailsDrawer() {
  const { selectedId, filtered, setSelected, updateStore } = useStore()
  const store = useMemo(() => filtered.find(s => s.id === selectedId), [filtered, selectedId])
  const [form, setForm] = useState({ name: '', type: '' })

  useEffect(() => {
    if (store) setForm({ name: store.name, type: store.type })
  }, [store])

  return (
    <AnimatePresence>
      {store && (
        <>
          {/* background overlay */}
          <motion.div
            className="fixed inset-0 bg-black/50 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          />

          {/* sliding drawer */}
          <motion.div
            key={store.id}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-[#0d1528] z-50 shadow-xl overflow-y-auto p-6"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <img
                  src={store.picture}
                  alt={store.name}
                  className="h-14 w-20 rounded-lg object-cover ring-1 ring-white/6"
                />
                <div>
                  <div className="text-lg font-bold text-white">{store.name}</div>
                  <div className="text-sm text-zinc-300">{store.type}</div>
                </div>
              </div>
              <button
                onClick={() => setSelected(null)}
                className="px-3 py-1 rounded-lg glass text-sm text-zinc-300 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="mt-3 text-sm text-zinc-300">{store.description}</div>
            <div className="mt-2 text-sm">
              <span className="text-zinc-400">Hours:</span> {store.opening_hours}
            </div>
            <a
              href={store.website}
              target="_blank"
              rel="noreferrer"
              className="text-sm text-cyan-300 underline mt-2 inline-block"
            >
              {store.website}
            </a>

            {/* chart */}
            <div className="mt-4 h-36 glass rounded-xl p-2">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={dummySeries}>
                  <defs>
                    <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.06} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="visits"
                    stroke="#06b6d4"
                    fill="url(#g2)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* update form */}
            <div className="mt-4 space-y-3">
              <div className="font-medium">Update Basic Info</div>
              <div className="space-y-2">
                <label className="block text-sm text-zinc-300">Name</label>
                <input
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  className="w-full px-3 py-2 rounded-lg bg-zinc-800 border border-white/6"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm text-zinc-300">Category</label>
                <input
                  value={form.type}
                  onChange={e => setForm(f => ({ ...f, type: e.target.value }))}
                  className="w-full px-3 py-2 rounded-lg bg-zinc-800 border border-white/6"
                />
              </div>
              <button
                onClick={() => {
                  updateStore(store.id, { name: form.name, type: form.type })
                  setSelected(null)
                }}
                className="w-full py-2 rounded-xl bg-gradient-to-r from-cyan-400 to-indigo-500 text-zinc-900 hover:opacity-95 transition shadow-soft mt-2"
              >
                Save Changes
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
