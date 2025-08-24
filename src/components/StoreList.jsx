// src/components/StoreList.jsx
import { useStore } from '../store/useStore'
import { clsx } from 'clsx'
import { motion } from 'framer-motion'

export default function StoreList() {
  const { filtered, selectedId, setSelected } = useStore()

  return (
    <div className="space-y-2">
      {filtered.map(s => (
        <motion.button
          key={s.id}
          onClick={() => setSelected(s.id)}
          layout
          className={clsx(
            'w-full text-left p-3 rounded-xl glass hover:bg-white/6 transition flex items-center gap-3',
            selectedId === s.id && 'ring-2 ring-cyan-300 bg-white/6'
          )}
        >
          <img src={s.picture} alt={s.name} className="h-12 w-16 rounded-lg object-cover" />
          <div className="flex-1">
            <div className="font-semibold text-white">{s.name}</div>
            <div className="text-xs text-zinc-300">{s.type}</div>
          </div>
          <div className="text-xs text-zinc-400">{s.opening_hours}</div>
        </motion.button>
      ))}
      {filtered.length === 0 && <div className="text-zinc-400 text-sm">No stores in the active zone.</div>}
    </div>
  )
}
