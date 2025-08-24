import React, { useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Circle, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import { useStore } from '../store/useStore'
import 'leaflet/dist/leaflet.css'

// Fix default marker icons in Vite environment
const DefaultIcon = L.icon({
  iconUrl: new URL('leaflet/dist/images/marker-icon.png', import.meta.url).toString(),
  iconRetinaUrl: new URL('leaflet/dist/images/marker-icon-2x.png', import.meta.url).toString(),
  shadowUrl: new URL('leaflet/dist/images/marker-shadow.png', import.meta.url).toString(),
  iconSize: [25,41],
  iconAnchor: [12,41]
})
L.Marker.prototype.options.icon = DefaultIcon

function FlyToSelected() {
  const map = useMap()
  const { selectedId, filtered } = useStore()
  useEffect(() => {
    if (!selectedId) return
    const s = filtered.find(x => x.id === selectedId)
    if (s) map.flyTo([s.latitude, s.longitude], Math.max(map.getZoom(), 15), { duration: 0.6 })
  }, [selectedId])
  return null
}

export default function MapView() {
  const { filtered, activeZone, setSelected } = useStore()

  return (
    <div className="h-full w-full rounded-2xl overflow-hidden shadow-soft">
      <MapContainer center={activeZone.center} zoom={13} minZoom={3} maxZoom={19} scrollWheelZoom className="leaflet-container">
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Circle center={activeZone.center} radius={activeZone.radius} pathOptions={{ color: '#06b6d4', fillOpacity: 0.08, weight: 2 }} />
        {filtered.map(s => (
          <Marker key={s.id} position={[s.latitude, s.longitude]} eventHandlers={{ click: () => setSelected(s.id) }}>
            <Popup closeButton={false}>
              <div className="text-sm">
                <div className="font-semibold">{s.name}</div>
                <div className="opacity-70">{s.type}</div>
              </div>
            </Popup>
          </Marker>
        ))}
        <FlyToSelected />
      </MapContainer>
    </div>
  )
}
