# Custom Map Explorer

An interactive, single-page map explorer for browsing places of interest (POIs) around a center point. Built with **Leaflet**, **Bootstrap 5**, and **Font Awesome**, styled with a dark theme.

Everything — the POI center, its icon, the radius zones, and the locations — is driven from a single JSON config file. No code changes needed to customize the map.

## Features

- 🗺️ **Interactive Leaflet map** with fly-to navigation and location popups
- 📍 **Configurable POI center** — name, coordinates, and icon (Font Awesome, Bootstrap icon, or custom image)
- 🎯 **Configurable radius zones** — arbitrary number of zones, each with its own distance threshold, color, and circle rendering
- 🏷️ **Category filters** with live location counts
- 🔍 **Radius zone filters** (multi-select) that filter markers, sidebar cards, and concentric map circles
- 📋 **Sidebar location cards** sorted by distance with zone indicators
- 📊 **Live legend overlay** on the map, generated from config
- 📱 **Responsive layout** — sidebar slides in from the right on mobile
- 🔄 **Reset button** to restore default filters

## Getting Started

### Prerequisites

- A web server (any static file server works — e.g. `python3 -m http.server 8080`, `npx serve`, or VS Code Live Server)
- Internet access (for Leaflet, Bootstrap, Font Awesome CDNs and the CARTO basemap tiles)

### Running

```bash
# from the project root
python3 -m http.server 8080
```

Then open `http://localhost:8080` in your browser.

> ⚠️ Opening `index.html` directly via `file://` will not work — the app fetches the config JSON over HTTP.

## Configuration

All configuration lives in a single JSON file: `config/locations.json`. You can replace this file with your own data — the app structure is entirely data-driven.

### Top-level structure

```json
{
  "defaultPoi": { ... },
  "basemap": { ... },
  "categories": [ ... ],
  "radiusZones": [ ... ],
  "locations": [ ... ]
}
```

### `categories` — optional per-category accent colours

Each entry maps a category key (as used in `locations[].category`) to the colour used for that category across the UI: the **active filter button**, the **marker dot**, the sidebar **category chip**, and the popup's category label. Categories missing from this list fall back to the default accent (`#58a6ff`).

| Field   | Type   | Required | Description                                  |
| ------- | ------ | -------- | -------------------------------------------- |
| `key`   | string | ✅       | A category key present in your locations     |
| `color` | string | ✅       | Hex colour (e.g. `"#3fb950"`) for the active button and its count badge |

```json
"categories": [
  { "key": "Education", "color": "#3fb950" },
  { "key": "Hospital",  "color": "#f85149" }
]
```

> The buttons themselves are still generated from the data — this block only styles them.

### `basemap` — CARTO tile API key

CARTO now requires a (free) API key to serve its basemap tiles. Request one at [carto.com/basemaps/apikey](https://carto.com/basemaps/apikey/) — no CARTO account needed.

| Field         | Type   | Required | Description                                                                                                                                 |
| ------------- | ------ | -------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| `cartoApiKey` | string | ❌       | Your CARTO basemap key. When set, it is appended to the tile URL as `?key=…`. Leave empty (`""`) to skip the parameter |

```json
"basemap": {
  "cartoApiKey": "your-key-from-carto"
}
```

> 💡 **Notes:**
> - The key is issued for the **domain you register** on the form — if tiles keep failing, confirm you are viewing the app from that host.
> - Free tier ≈ 5M tile requests/month and is for non-commercial use; keep the CARTO/OSM attribution visible.
> - If you still see an "API key required" watermark after adding the key, force-refresh — browsers and the CDN cache tiles.

### `defaultPoi` — the POI center

Controls the center marker and its popup.

| Field  | Type   | Required | Description                                                                                                                                              |
| ------ | ------ | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `lat`  | number | ✅       | Latitude of the POI center                                                                                                                               |
| `lng`  | number | ✅       | Longitude of the POI center                                                                                                                              |
| `name` | string | ❌       | Display name — shown in the marker popup and the sidebar header subtitle. Falls back to `"POI Center"` / `"POI"`                                         |
| `icon` | string | ❌       | Marker icon. Accepts a **Font Awesome** class (`fa-star`), a **Bootstrap icon** (`bi-geo-alt`), or an **image URL**. Falls back to the default gold star |

**Icon examples:**

```json
"defaultPoi": {
  "lat": 51.4072,
  "lng": -3.8629,
  "name": "London City Center",
  "icon": "fa-star"              // Font Awesome
}
```

```json
"icon": "bi-geo-alt-fill"        // Bootstrap icon
```

```json
"icon": "images/center.png"      // custom image (URL or relative path)
```

> Image URLs are auto-detected (start with `http://`, `/`, `data:`, or end with a common image extension). Anything else is treated as an icon class.

### `radiusZones` — the distance zones

Defines the concentric radius zones around the POI. **You can define any number of zones with any keys you like** — the filters, legend, circles, and distance bucketing all derive from this array.

| Field         | Type   | Required | Description                                                                                                        |
| ------------- | ------ | -------- | ------------------------------------------------------------------------------------------------------------------ |
| `key`         | string | ✅       | Unique identifier (e.g. `"inner"`, `"downtown"`). Used as the zone's data attribute and CSS-variable suffix        |
| `label`       | string | ✅       | Human-readable label shown in filters, legend, and popups (e.g. `"< 1 km"`)                                        |
| `radius`      | number | ✅       | Distance boundary in **meters**. A location belongs to the first zone whose boundary it falls under                |
| `color`       | string | ✅       | Hex color used for the marker dot, filter dot, legend swatch, and circle stroke/fill                               |
| `fillOpacity` | number | ❌       | Circle fill opacity (0–1). Set to `0` (or omit) to skip drawing a circle for that zone (typical for the catch-all) |

**How bucketing works:** zones are sorted by `radius` ascending. A location at distance _d_ belongs to the first zone where `d < zone.radius`. The zone with the **largest radius is the catch-all** — every location beyond the other boundaries lands in it.

```json
"radiusZones": [
  { "key": "inner", "label": "< 1 km",    "radius": 1000,  "color": "#26a641", "fillOpacity": 0.08 },
  { "key": "close", "label": "1 – 2 km",  "radius": 2000,  "color": "#75d02e", "fillOpacity": 0.06 },
  { "key": "near",  "label": "2 – 5 km",  "radius": 5000,  "color": "#d29922", "fillOpacity": 0.04 },
  { "key": "mid",   "label": "5 – 10 km", "radius": 10000, "color": "#58a6ff", "fillOpacity": 0.03 },
  { "key": "far",   "label": "> 10 km",   "radius": 20000, "color": "#a371f7", "fillOpacity": 0    }
]
```

**Custom example** — completely different keys and ranges work out of the box:

```json
"radiusZones": [
  { "key": "downtown", "label": "Downtown (< 2 km)", "radius": 2000,  "color": "#ff4444", "fillOpacity": 0.08 },
  { "key": "suburb",   "label": "Suburbs (2–8 km)",   "radius": 8000,  "color": "#44aaff", "fillOpacity": 0.05 },
  { "key": "rural",    "label": "Rural (8–15 km)",    "radius": 15000, "color": "#44cc44", "fillOpacity": 0.03 },
  { "key": "way_out",  "label": "Way out (> 15 km)",  "radius": 30000, "color": "#888888", "fillOpacity": 0    }
]
```

> **Note:** if `radiusZones` is omitted entirely, the app falls back to the original five zones (`inner`/`close`/`near`/`mid`/`far`) for backward compatibility.

### `locations` — the places

Each entry is a place marker around the POI.

| Field         | Type   | Required | Description                                                                                                                               |
| ------------- | ------ | -------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `name`        | string | ✅       | Place name — marker tooltip, popup title, sidebar card                                                                                    |
| `lat`         | number | ✅       | Latitude                                                                                                                                  |
| `lng`         | number | ✅       | Longitude                                                                                                                                 |
| `category`    | string | ✅       | Category key — must match one of the sidebar filter buttons (see below)                                                                   |
| `description` | string | ❌       | Short description shown in the marker popup                                                                                               |
| `icon`        | string | ❌       | Font Awesome class shown inside the marker (e.g. `fa-mug-hot`). If omitted, the marker renders as just the colored circle without an icon |

```json
"locations": [
  {
    "name": "Brew & Bean",
    "lat": 51.4090,
    "lng": -3.8610,
    "category": "coffee",
    "description": "Artisan coffee roaster with single-origin pour-overs and fresh pastries.",
    "icon": "fa-mug-hot"
  }
]
```

> **Note on categories:** category filters are **dynamic** — buttons are generated from the unique `category` values found in `locations` (an "All" button plus one per category, in first-appearance order). Each button shows a live count badge and an icon taken from the first location of that category (falls back to `fa-tag`). The button label is the category key with its first letter capitalised, so choose readable keys like `"Education"` or `"Hospital"`. Optional accent colours per category live in the top-level `categories` block (see above).

## How It Works

1. On load, the app fetches `config/locations.json`.
2. From the config it:
   - places the POI marker (icon from `defaultPoi.icon`, popup title from `defaultPoi.name`),
   - builds the radius filter buttons, legend, and `--zone-{key}` CSS color variables,
   - draws a dashed circle for every zone with `fillOpacity > 0`,
   - computes each location's distance (haversine) and assigns it to a zone,
   - renders markers colored by their **category** (from the `categories` config block, falling back to the default accent) and populated with distance/zone info.
3. Interacting with the category / radius filters re-evaluates marker, card, and circle visibility immediately.

## Project Structure

```
custom-map-explorer/
├── index.html            # App shell: sidebar, map container, legend, script tags
├── css/
│   ├── main.css          # Dark theme, layout, sidebar, filters, cards, responsive
│   └── map.css           # Leaflet overrides, legend, popup styling
├── js/
│   ├── map.js            # MapEngine: Leaflet init, markers, circles, zones (config-driven)
│   └── app.js            # App state, dynamic UI builders, filters, event wiring
└── config/
    └── locations.json       # The configuration file (POI, basemap key, radius zones, locations)
```

### Script load order (do not change)

```html
leaflet.js → bootstrap.js → js/map.js → js/app.js
```

`app.js` depends on the global `MapEngine` exposed by `map.js`.

## UI Behavior Notes

- **Radius filters are multi-select** — click to toggle zones on/off. With **no zones selected, all locations are hidden**.
- **The reset button** restores "All categories" + the first zone with a visible circle (the innermost zone) and re-fits the map.
- On **desktop**, the sidebar is pinned left; on **mobile** (≤ 768px), it slides in from the **right** via the toggle button.
- The **legend** and the **radius filter buttons** are generated from config — no HTML edits needed when changing zones.

## Browser Support

Modern evergreen browsers (Chrome, Firefox, Edge, Safari). The app uses `fetch`, `Element.closest`, and `String.startsWith` — an up-to-date browser is assumed.

## License

See [LICENSE](LICENSE).
