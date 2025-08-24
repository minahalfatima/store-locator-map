import React, { useEffect } from 'react'
import MapView from './components/MapView'
import StoreList from './components/StoreList'
import DetailsDrawer from './components/DetailsDrawer'
import ZoneSelector from './components/ZoneSelector'
import SearchBar from './components/SearchBar'
import { useStore } from './store/useStore'

export default function App() {
  const { fetchStores, loading, error, filtered, selectedId } = useStore()

  useEffect(() => { fetchStores() }, [])

  return (
    <div className="h-full text-gray-100">
      <header className="p-4 md:p-6 flex items-center justify-between bg-gradient-to-r from-[#081029] to-[#071226]">
        <div className="text-2xl font-bold">
          Store Locator <span className="text-cyan-300">Map</span>
        </div>
      </header>

      <main className="h-[calc(100%-80px)] grid grid-cols-1 lg:grid-cols-6 gap-4 px-4 md:px-6 pb-6 relative">
        {/* Sidebar (left) */}
        <aside className="lg:col-span-2 h-full flex flex-col gap-4">
          <div className="glass rounded-2xl p-4 flex flex-col gap-3 h-full relative">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-lg font-semibold">Stores in Zone</div>
                <div className="text-xs text-zinc-400">{filtered.length} found</div>
              </div>
            </div>

            <SearchBar />

            <div className="flex-1 overflow-y-auto pr-2">
              {loading && <div className="text-sm text-zinc-400">Loading…</div>}
              {error && <div className="text-sm text-red-400">{error}</div>}
              {!loading && !error && <StoreList />}
            </div>

            <div>
              <ZoneSelector />
            </div>

            {/* Drawer mounts inside sidebar container */}
            <DetailsDrawer />
          </div>
        </aside>

        {/* Map area */}
        <section className="lg:col-span-4 h-full">
          <div className="h-full rounded-2xl overflow-hidden shadow-soft">
            <MapView />
          </div>
        </section>
      </main>
    </div>
  )
}
