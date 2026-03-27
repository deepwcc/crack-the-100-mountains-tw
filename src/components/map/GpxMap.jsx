import { useEffect } from 'react'
import { MapContainer, TileLayer, Polyline, useMap } from 'react-leaflet'
import L from 'leaflet'

// Fix Leaflet default icon issue with webpack/vite
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

function FitBounds({ positions }) {
  const map = useMap()
  useEffect(() => {
    if (positions && positions.length > 1) {
      map.fitBounds(positions, { padding: [30, 30] })
    }
  }, [positions, map])
  return null
}

export default function GpxMap({ gpxPoints, center = [23.47, 120.96], zoom = 8 }) {
  const hasTrack = gpxPoints && gpxPoints.length > 1

  return (
    <div className="relative w-full h-full min-h-[260px] rounded-xl overflow-hidden border border-gray-800">
      <MapContainer
        center={center}
        zoom={zoom}
        style={{ width: '100%', height: '100%', minHeight: '260px' }}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://carto.com/">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          subdomains="abcd"
          maxZoom={19}
        />
        {hasTrack && (
          <>
            <Polyline
              positions={gpxPoints}
              color="#22d3ee"
              weight={3}
              opacity={0.85}
            />
            <FitBounds positions={gpxPoints} />
          </>
        )}
      </MapContainer>
      {!hasTrack && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-950/60 backdrop-blur-sm z-[1000] pointer-events-none">
          <svg className="w-10 h-10 text-gray-600 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
          </svg>
          <p className="text-gray-400 text-sm font-medium">No GPX track available</p>
          <p className="text-gray-600 text-xs mt-1">Add GPX points to see your route</p>
        </div>
      )}
    </div>
  )
}
