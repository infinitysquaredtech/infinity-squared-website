/* ============================================================
   map.js — Leaflet Map, Tile Layer, Markers, Radius Circles
   Exposes all map-layer functions on the global `MapEngine` object.
   ============================================================ */

(function () {
  "use strict";

  // ── Private module state ──────────────────────────────────────
  let _map = null;
  let _poiMarker = null;
  let _markers = []; // { marker, data }
  let _circles = {}; // { zoneKey: L.circle }
  let _zoneMap = {}; // { zoneKey: zoneConfig } — fast lookup
  let _sortedZones = []; // zones sorted by radius asc (for getRadiusZone)
  let _categoryColorMap = {}; // { category: hexColor } — marker/chip accents
  const DEFAULT_CATEGORY_COLOR = "#58a6ff"; // fallback when a category has no colour

  // ── Utilities (pure functions) ────────────────────────────────

  /** Haversine distance between two lat/lng points (returns km). */
  function haversineDistance(lat1, lng1, lat2, lng2) {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLng = ((lng2 - lng1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLng / 2) ** 2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  }

  /** Map a distance (km) to a radius zone key, using config-driven zones. */
  function getRadiusZone(distanceKm) {
    var distMeters = distanceKm * 1000;
    // Walk sorted zones (asc radius); last zone is the catch-all
    for (var i = 0; i < _sortedZones.length - 1; i++) {
      if (distMeters < _sortedZones[i].radius) {
        return _sortedZones[i].key;
      }
    }
    return _sortedZones.length > 0
      ? _sortedZones[_sortedZones.length - 1].key
      : "far";
  }

  /** Get the hex color for a given radius zone from config. */
  function getZoneColor(zone) {
    var z = _zoneMap[zone];
    return (z && z.color) || "#6a7078";
  }

  /** Get the accent colour for a category (markers/chips/popups). */
  function getCategoryColor(category) {
    return _categoryColorMap[category] || DEFAULT_CATEGORY_COLOR;
  }

  /** Human-readable label for a radius zone from config. */
  function getZoneLabel(zone) {
    var z = _zoneMap[zone];
    return (z && z.label) || zone || "Unknown";
  }

  /** Enrich raw location objects with distance + zone. */
  function enrich(poiCoords, locations) {
    return locations.map(function (loc) {
      var dist = haversineDistance(
        poiCoords.lat,
        poiCoords.lng,
        loc.lat,
        loc.lng,
      );
      return {
        name: loc.name,
        lat: loc.lat,
        lng: loc.lng,
        category: loc.category,
        description: loc.description,
        icon: loc.icon,
        distanceKm: dist,
        zone: getRadiusZone(dist),
      };
    });
  }

  /** Build a Leaflet DivIcon for a location marker (coloured by category). */
  function createMarkerIcon(color, faIconClass) {
    return L.divIcon({
      className: "custom-marker-icon",
      html:
        '<div style="' +
        "width:34px;height:34px;" +
        "border-radius:50%;" +
        "background:" +
        color +
        ";" +
        +"border:3px solid #fff;" +
        "box-shadow:0 2px 8px rgba(0,0,0,0.5);" +
        "display:flex;align-items:center;justify-content:center;" +
        "font-size:14px;color:#fff;" +
        "transition:transform 0.2s ease,box-shadow 0.2s ease;" +
        '"><i class="fa-solid ' +
        faIconClass +
        '"></i></div>',
      iconSize: [34, 34],
      iconAnchor: [17, 17],
      popupAnchor: [0, -20],
    });
  }

  /** Build the POI marker icon, driven by config (image or icon class).
   *  Falls back to the default gold star when no icon is provided. */
  function createPoiIcon(poiConfig) {
    var iconHtml = "";
    var imgBg = "#ffd700";
    var imgBorder = "4px solid #fff";
    var imgShadow = "0 0 16px rgba(255,215,0,0.6),0 2px 10px rgba(0,0,0,0.5)";

    var icon = (poiConfig && poiConfig.icon) || "fa-star";

    // Detect image URL vs icon class
    if (
      /^(https?:|\/|data:)/.test(icon) ||
      /\.(png|svg|jpg|jpeg|gif|webp)/i.test(icon)
    ) {
      // Image URL
      iconHtml =
        '<div style="' +
        "width:44px;height:44px;" +
        "border-radius:50%;background:" +
        imgBg +
        ";" +
        "border:" +
        imgBorder +
        ";" +
        "box-shadow:" +
        imgShadow +
        ";" +
        "display:flex;align-items:center;justify-content:center;" +
        "overflow:hidden;" +
        '"><img src="' +
        icon +
        '" style="width:32px;height:32px;border-radius:50%;object-fit:cover;"></div>';
    } else {
      // Font-Awesome / Bootstrap icon class
      var iconClass =
        icon.startsWith("fa-") || icon.startsWith("bi-") ? icon : "fa-" + icon;
      var prefix = iconClass.startsWith("bi-") ? "bi" : "fa-solid";
      iconHtml =
        '<div style="' +
        "width:44px;height:44px;" +
        "border-radius:50%;background:" +
        imgBg +
        ";" +
        "border:" +
        imgBorder +
        ";" +
        "box-shadow:" +
        imgShadow +
        ";" +
        "display:flex;align-items:center;justify-content:center;" +
        "font-size:18px;color:#1a1d23;" +
        '"><i class="' +
        prefix +
        " " +
        iconClass +
        '"></i></div>';
    }

    return L.divIcon({
      className: "poi-marker-icon",
      html: iconHtml,
      iconSize: [44, 44],
      iconAnchor: [22, 22],
      popupAnchor: [0, -24],
    });
  }

  /** Build popup HTML for a location. */
  function buildPopup(data) {
    var categoryColor = getCategoryColor(data.category);
    var distKm = data.distanceKm.toFixed(2);
    var zoneLabel = getZoneLabel(data.zone);
    return (
      "<strong>" +
        data.name +
        "</strong>" +
        '<div class="popup-category" style="color:' +
        categoryColor +
        ';">' +
        data.category.toUpperCase() +
        "</div>",
      '<div class="popup-distance">' +
        '<i class="fa-solid fa-location-dot"></i> ' +
        distKm +
        " km from POI &nbsp;|&nbsp; " +
        zoneLabel +
        "</div>" +
        '<div class="popup-desc">' +
        data.description +
        "</div>"
    );
  }

  // ── Public API (exposed on window.MapEngine) ──────────────────

  var MapEngine = {
    /** Return the Leaflet map instance. */
    getMap: function () {
      return _map;
    },

    /** Return the array of { marker, data } objects. */
    getMarkers: function () {
      return _markers;
    },

    // ── Initialisation ────────────────────────────────────────

    /**
     * Create the Leaflet map, add the tile layer, and place the
     * initial POI marker.  Accepts the full config for zone/POI data.
     * Returns the map instance.
     */
    init: function (poiCoords, config) {
      // ── Store zone config (with sensible fallbacks) ──────────
      var zones = (config && config.radiusZones) || [
        {
          key: "inner",
          label: "< 1 km",
          radius: 1000,
          color: "#26a641",
          fillOpacity: 0.08,
        },
        {
          key: "close",
          label: "1 – 2 km",
          radius: 2000,
          color: "#75d02e",
          fillOpacity: 0.06,
        },
        {
          key: "near",
          label: "2 – 5 km",
          radius: 5000,
          color: "#d29922",
          fillOpacity: 0.04,
        },
        {
          key: "mid",
          label: "5 – 10 km",
          radius: 10000,
          color: "#58a6ff",
          fillOpacity: 0.03,
        },
        {
          key: "far",
          label: "> 10 km",
          radius: 20000,
          color: "#a371f7",
          fillOpacity: 0,
        },
      ];
      _zoneMap = {};
      _sortedZones = zones.slice().sort(function (a, b) {
        return a.radius - b.radius;
      });
      _sortedZones.forEach(function (z) {
        _zoneMap[z.key] = z;
      });

      // ── Store category colours (from the optional config block) ──
      _categoryColorMap = {};
      ((config && config.categories) || []).forEach(function (c) {
        if (c && c.key && c.color) _categoryColorMap[c.key] = c.color;
      });

      _map = L.map("map", {
        center: [poiCoords.lat, poiCoords.lng],
        zoom: 12,
        zoomControl: true,
        preferCanvas: true,
      });

      // CARTO basemap tiles now require a free API key, sent as a `key`
      // query parameter. Supply it in the config JSON under
      // `basemap.cartoApiKey` (see https://carto.com/basemaps/apikey/).
      var cartoKey = config && config.basemap && config.basemap.cartoApiKey;
      var basemapUrl =
        "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" +
        (cartoKey ? "?key=" + encodeURIComponent(cartoKey) : "");

      L.tileLayer(basemapUrl, {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>' +
          ' &copy; <a href="https://carto.com/">CARTO</a>',
        subdomains: "abcd",
        maxZoom: 19,
      }).addTo(_map);

      MapEngine.updatePoi(poiCoords, config && config.defaultPoi);
      return _map;
    },

    // ── POI Marker ────────────────────────────────────────────

    /** Place (or move) the POI marker using the config-supplied icon & name. */
    updatePoi: function (poiCoords, poiConfig) {
      if (_poiMarker) _map.removeLayer(_poiMarker);
      var icon = createPoiIcon(poiConfig);
      var name = (poiConfig && poiConfig.name) || "POI Center";

      _poiMarker = L.marker([poiCoords.lat, poiCoords.lng], {
        icon: icon,
        zIndexOffset: 1000,
      }).addTo(_map);
      _poiMarker.bindPopup(
        "<strong>&#9733; " +
          name +
          "</strong>" +
          '<span style="font-size:0.75rem;color:var(--text-muted);">' +
          poiCoords.lat.toFixed(4) +
          "&deg;, " +
          poiCoords.lng.toFixed(4) +
          "&deg;</span>",
      );
    },

    // ── Radius Circles ────────────────────────────────────────

    /** Draw concentric dashed circles around the POI, driven by radiusZones config. */
    updateCircles: function (poiCoords) {
      // Remove old circles
      Object.keys(_circles).forEach(function (key) {
        _map.removeLayer(_circles[key]);
      });
      _circles = {};

      _sortedZones.forEach(function (zone) {
        // Only draw circles for zones with a non-zero fillOpacity
        if (!zone.fillOpacity || zone.fillOpacity <= 0) return;

        var circle = L.circle([poiCoords.lat, poiCoords.lng], {
          radius: zone.radius,
          color: zone.color,
          weight: 1.5,
          fillColor: zone.color,
          fillOpacity: zone.fillOpacity,
          dashArray: "6 4",
          interactive: false,
        });
        circle.addTo(_map);
        _circles[zone.key] = circle;
      });
    },

    /**
     * Show/hide radius circles based on which zones are selected.
     * @param {string[]} selectedZones - e.g. ['close', 'near']
     */
    setCircleVisibility: function (selectedZones) {
      Object.keys(_circles).forEach(function (key) {
        var circle = _circles[key];
        var visible = selectedZones.indexOf(key) !== -1;
        if (visible && !_map.hasLayer(circle)) {
          circle.addTo(_map);
        } else if (!visible && _map.hasLayer(circle)) {
          _map.removeLayer(circle);
        }
      });
    },

    // ── Location Markers ──────────────────────────────────────

    /**
     * Clear all existing location markers and place new ones
     * from the raw locations array, enriched with distance/zone.
     */
    renderMarkers: function (poiCoords, locations) {
      // Clear old
      _markers.forEach(function (m) {
        _map.removeLayer(m.marker);
      });
      _markers = [];

      var enriched = enrich(poiCoords, locations);

      enriched.forEach(function (loc) {
        var categoryColor = getCategoryColor(loc.category);
        var icon = createMarkerIcon(categoryColor, loc.icon);
        var marker = L.marker([loc.lat, loc.lng], { icon: icon }).addTo(_map);

        marker.bindPopup(buildPopup(loc));
        marker.bindTooltip(loc.name, {
          direction: "top",
          offset: [0, -20],
          className: "custom-tooltip",
        });

        _markers.push({ marker: marker, data: loc });
      });
    },

    /**
     * Re-evaluate every marker's zone / popup / icon against the
     * current POI, then show/hide based on category & radius filters.
     * @param {string[]} activeRadius - array of selected zone keys, e.g. ['close','near']
     */
    applyFilters: function (poiCoords, activeCategory, activeRadius) {
      _markers.forEach(function (item) {
        var data = item.data;
        var marker = item.marker;

        // Recompute distance & zone
        var dist = haversineDistance(
          poiCoords.lat,
          poiCoords.lng,
          data.lat,
          data.lng,
        );
        var zone = getRadiusZone(dist);
        data.distanceKm = dist;
        data.zone = zone;

        // Update icon colour & popup — markers follow category colour
        var categoryColor = getCategoryColor(data.category);
        marker.setIcon(createMarkerIcon(categoryColor, data.icon));
        marker.setPopupContent(buildPopup(data));

        // Visibility — category match
        var catMatch =
          activeCategory === "all" || data.category === activeCategory;
        // Radius match — location must fall in one of the selected zones
        var radMatch = activeRadius.indexOf(zone) !== -1;

        if (catMatch && radMatch) {
          if (!_map.hasLayer(marker)) marker.addTo(_map);
        } else {
          if (_map.hasLayer(marker)) _map.removeLayer(marker);
        }
      });
    },

    // ── Navigation ────────────────────────────────────────────

    /** Animated fly-to a lat/lng with optional zoom. */
    flyTo: function (lat, lng, zoom) {
      _map.flyTo([lat, lng], zoom || _map.getZoom(), { duration: 0.8 });
    },

    /**
     * Fit the map view so that the largest selected radius zone is fully visible.
     * @param {{lat:number, lng:number}} poiCoords
     * @param {string[]} selectedZones - array of zone keys, e.g. ['inner','close']
     */
    fitToZones: function (poiCoords, selectedZones) {
      // Build a lookup of zone radius from config, falling back to defaults
      var zoneRadii = {
        inner: 1000,
        close: 2000,
        near: 5000,
        mid: 10000,
        far: 20000,
      };
      _sortedZones.forEach(function (z) {
        zoneRadii[z.key] = z.radius;
      });

      // Find the largest radius among selected zones (default to 1000 if none)
      var maxR = 1000;
      if (selectedZones && selectedZones.length > 0) {
        selectedZones.forEach(function (z) {
          if (zoneRadii[z] && zoneRadii[z] > maxR) maxR = zoneRadii[z];
        });
      }

      // Convert metre radius → approximate lat/lng degrees
      var lat = poiCoords.lat;
      var lng = poiCoords.lng;
      var latDegPerM = 1 / 111320;
      var lngDegPerM = 1 / (111320 * Math.cos((lat * Math.PI) / 180));
      var dLat = maxR * latDegPerM;
      var dLng = maxR * lngDegPerM;

      var southWest = L.latLng(lat - dLat, lng - dLng);
      var northEast = L.latLng(lat + dLat, lng + dLng);
      var bounds = L.latLngBounds(southWest, northEast);

      _map.fitBounds(bounds, {
        padding: [40, 40],
        maxZoom: 16,
        animate: true,
        duration: 0.6,
      });
    },

    /** Open the popup of the first visible marker matching `name`. */
    openPopupFor: function (name) {
      for (var i = 0; i < _markers.length; i++) {
        var item = _markers[i];
        if (item.data.name === name && _map.hasLayer(item.marker)) {
          item.marker.openPopup();
          return;
        }
      }
    },

    /** Count how many markers are currently visible on the map. */
    visibleCount: function () {
      var count = 0;
      _markers.forEach(function (item) {
        if (_map.hasLayer(item.marker)) count++;
      });
      return count;
    },

    // ── Re-exported utilities (convenience for app.js) ────────

    haversineDistance: haversineDistance,
    getRadiusZone: getRadiusZone,
    getZoneColor: getZoneColor,
    getZoneLabel: getZoneLabel,
    getCategoryColor: getCategoryColor,
    enrich: enrich,
  };

  // ── Expose globally ───────────────────────────────────────────
  window.MapEngine = MapEngine;
})();
