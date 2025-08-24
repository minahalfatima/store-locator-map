import React, { useState } from 'react'
import { useStore } from '../store/useStore'

export default function SearchBar() {
  const [q, setQ] = useState('')
  const { search } = useStore()

  const onChange = (e) => {
    setQ(e.target.value)
    search(e.target.value)
  }

  return (
    <div className="mb-3">
      <input
        value={q}
        onChange={onChange}
        placeholder="Search by name or type..."
        className="w-full px-3 py-2 rounded-lg bg-zinc-800 border border-white/6 text-sm"
      />
    </div>
  )
}
