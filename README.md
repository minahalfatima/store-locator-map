# Store Locator Map 

A single-page React application demonstrating a futuristic Store Locator with:
- Full-screen interactive map (React-Leaflet / OpenStreetMap)
- Circular active zone (geofence)
- Sidebar store list (search/filterable)
- Click store to highlight marker and open details drawer
- Details drawer includes dummy chart (Recharts) and an edit form that updates state
- Responsive and modern UI using Tailwind and Framer Motion
- Mock API data in `public/stores.json`

## Quick Start

1. Install
```bash
npm install
```

2. Run
```bash
npm run dev
```

Open the URL printed by Vite (default: http://localhost:5173)

## Notes

- Map tiles are from OpenStreetMap (no API key).
- To replace mock API data, edit `public/stores.json`.
- The app includes a basic ViTest setup for adding tests.

## What was implemented
- All core requirements from the project brief (active zone, markers, sidebar, details drawer, chart, edit form).
- Smooth animations and responsive layout.
