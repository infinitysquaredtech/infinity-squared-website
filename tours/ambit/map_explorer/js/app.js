/* ============================================================
   app.js — Application State, UI Events, Sidebar Cards, Bootstrap
   Depends on: MapEngine (from map.js), DOM elements in index.html
   ============================================================ */

(function () {
  "use strict";

  // ── Application state ─────────────────────────────────────────
  var _config = null; // full config from JSON
  var _poiDefault = null; // { lat, lng, name, icon, … } from JSON
  var _poiCoords = null; // current POI (immutable from UI)
  var _locations = []; // raw locations from JSON
  var _activeCategory = "all";
  var _activeRadius = []; // array of zone keys, default set from config

  // ── DOM refs (cached once) ────────────────────────────────────
  var $sidebar = document.getElementById("sidebar");
  var $catFilters = document.getElementById("category-filters");
  var $radFilters = document.getElementById("radius-filters");
  var $resultsCount = document.getElementById("results-count");
  var $locationList = document.getElementById("location-list");
  var $toggleSidebar = document.getElementById("toggle-sidebar");
  var $btnResetAll = document.getElementById("btn-reset-all");
  var $mapEl = document.getElementById("map");
  var $headerSubtitle = document.getElementById("header-subtitle");

  // ── Helpers ───────────────────────────────────────────────────

  /** Update the count badges of every category button (incl. "All"). */
  function refreshCategoryCounts() {
    $catFilters.querySelectorAll(".cat-btn").forEach(function (btn) {
      var cat = btn.dataset.category;
      var count =
        cat === "all"
          ? _locations.length
          : _locations.filter(function (l) {
              return l.category === cat;
            }).length;
      var badge = btn.querySelector(".badge-count");
      if (badge) badge.textContent = count;
    });
  }

  /** Update the "Showing X locations" counter. */
  function refreshResultsCount() {
    $resultsCount.textContent = MapEngine.visibleCount();
  }

  /** Return the key of the first zone that has a visible circle,
   *  falling back to the very first zone in the config. */
  function getDefaultZoneKey() {
    var zones = (_config && _config.radiusZones) || [];
    // Prefer the first zone with fillOpacity > 0
    for (var i = 0; i < zones.length; i++) {
      if (zones[i].fillOpacity && zones[i].fillOpacity > 0) {
        return zones[i].key;
      }
    }
    return zones.length > 0 ? zones[0].key : "inner";
  }

  /** Update the sidebar header subtitle with the POI name from config. */
  function updateHeaderSubtitle() {
    if (!$headerSubtitle) return;
    var poiName = (_poiDefault && _poiDefault.name) || "POI";
    $headerSubtitle.textContent = poiName;
  }

  // ── Sidebar card rendering ────────────────────────────────────

  /** Rebuild the scrollable card list from enriched locations. */
  function renderCards() {
    var enriched = MapEngine.enrich(_poiCoords, _locations);
    $locationList.innerHTML = "";

    enriched.forEach(function (loc) {
      var distKm = loc.distanceKm.toFixed(2);
      var zoneLabel = MapEngine.getZoneLabel(loc.zone);
      var zoneColor = MapEngine.getZoneColor(loc.zone);
      var categoryColor = MapEngine.getCategoryColor(loc.category);

      var card = document.createElement("div");
      card.className = "location-card";
      card.dataset.category = loc.category;
      card.dataset.zone = loc.zone;

      card.innerHTML =
        '<div class="zone-indicator" style="background:' +
        zoneColor +
        ';" title="' +
        zoneLabel +
        '"></div>' +
        '<div class="loc-name">' +
        loc.name +
        "</div>" +
        '<span class="loc-category" style="background:color-mix(in srgb,' +
        categoryColor +
        " 14%,transparent);color:" +
        categoryColor +
        ';">' +
        loc.category +
        "</span>" +
        '<div class="loc-distance">' +
        '<i class="fa-solid fa-location-dot" style="color:' +
        zoneColor +
        ';font-size:0.65rem;"></i> ' +
        distKm +
        " km &nbsp;&middot;&nbsp; " +
        zoneLabel +
        "</div>";

      card.addEventListener("click", function () {
        MapEngine.flyTo(loc.lat, loc.lng, 15);
        MapEngine.openPopupFor(loc.name);
        if (window.innerWidth <= 768) {
          $sidebar.classList.remove("visible");
        }
      });

      $locationList.appendChild(card);
    });

    applyCardVisibility();
  }

  /** Show/hide sidebar cards based on active filters. */
  function applyCardVisibility() {
    var cards = $locationList.querySelectorAll(".location-card");
    cards.forEach(function (card) {
      var catMatch =
        _activeCategory === "all" || card.dataset.category === _activeCategory;
      var radMatch = _activeRadius.indexOf(card.dataset.zone) !== -1;
      card.classList.toggle("hidden-card", !(catMatch && radMatch));
    });
  }

  // ── Master filter application ─────────────────────────────────

  function applyAllFilters() {
    MapEngine.applyFilters(_poiCoords, _activeCategory, _activeRadius);
    MapEngine.setCircleVisibility(_activeRadius);
    renderCards();
    refreshResultsCount();
  }

  // ── Reset to defaults ─────────────────────────────────────────

  function resetToDefaults() {
    // Category: all
    _activeCategory = "all";
    $catFilters.querySelectorAll(".cat-btn").forEach(function (b) {
      b.classList.remove("active");
    });
    var allBtn = $catFilters.querySelector('[data-category="all"]');
    if (allBtn) allBtn.classList.add("active");

    // Radius: only the first visible zone from config
    var defaultZone = getDefaultZoneKey();
    _activeRadius = [defaultZone];
    $radFilters.querySelectorAll(".radius-btn").forEach(function (b) {
      b.classList.remove("active");
    });
    var defBtn = $radFilters.querySelector(
      '[data-radius="' + defaultZone + '"]',
    );
    if (defBtn) defBtn.classList.add("active");

    // Fit map to show the default radius zone(s) fully
    MapEngine.fitToZones(_poiDefault, _activeRadius);

    applyAllFilters();
  }

  // ── Event wiring ──────────────────────────────────────────────

  function bindEvents() {
    // Category filter clicks (single-select)
    $catFilters.addEventListener("click", function (e) {
      var btn = e.target.closest(".cat-btn");
      if (!btn) return;
      $catFilters.querySelectorAll(".cat-btn").forEach(function (b) {
        b.classList.remove("active");
      });
      btn.classList.add("active");
      _activeCategory = btn.dataset.category;
      applyAllFilters();
    });

    // Radius filter clicks (multi-select toggle)
    $radFilters.addEventListener("click", function (e) {
      var btn = e.target.closest(".radius-btn");
      if (!btn) return;
      var zone = btn.dataset.radius;

      // Toggle: if already active, remove; otherwise add
      var idx = _activeRadius.indexOf(zone);
      if (idx !== -1) {
        _activeRadius.splice(idx, 1);
        btn.classList.remove("active");
      } else {
        _activeRadius.push(zone);
        btn.classList.add("active");
      }

      applyAllFilters();
    });

    // Reset-all button
    $btnResetAll.addEventListener("click", resetToDefaults);

    // Mobile sidebar toggle
    $toggleSidebar.addEventListener("click", function () {
      $sidebar.classList.toggle("visible");
    });

    // Tap map → close sidebar on mobile
    $mapEl.addEventListener("click", function () {
      if (window.innerWidth <= 768) {
        $sidebar.classList.remove("visible");
      }
    });

    // Resize → ensure sidebar visible on desktop
    window.addEventListener("resize", function () {
      if (window.innerWidth > 768) {
        $sidebar.classList.add("visible");
        $sidebar.classList.remove("hidden");
      }
    });
  }

  // ── Bootstrap: load config, init map, wire UI ─────────────────

  function init() {
    fetch("config/locations.json")
      .then(function (res) {
        if (!res.ok)
          throw new Error(
            "Failed to load config/locations.json (HTTP " + res.status + ")",
          );
        return res.json();
      })
      .then(function (config) {
        _config = config;
        _poiDefault = config.defaultPoi;
        _poiCoords = { lat: _poiDefault.lat, lng: _poiDefault.lng };
        _locations = config.locations;

        // ── Inject CSS variables for zone colours ──────────────
        injectZoneCssVars(config.radiusZones);

        // ── Inject per-category active accent colours (optional) ─
        injectCategoryAccents(config.categories);

        // ── Update header subtitle with POI name ──────────────
        updateHeaderSubtitle();

        // ── Build radius filter buttons dynamically ───────────
        buildRadiusFilters(config.radiusZones);

        // ── Build legend items dynamically ────────────────────
        buildLegend(config.radiusZones);

        // ── Init map engine with full config ──────────────────
        MapEngine.init(_poiCoords, config);
        MapEngine.updateCircles(_poiCoords);
        MapEngine.renderMarkers(_poiCoords, _locations);

        // ── Set default radius to first visible zone ──────────
        _activeRadius = [getDefaultZoneKey()];
        var defBtn = $radFilters.querySelector(
          '[data-radius="' + _activeRadius[0] + '"]',
        );
        if (defBtn) defBtn.classList.add("active");

        // ── Build category filter buttons from data ─────────────
        buildCategoryFilters(_locations);

        // Populate category badges and apply initial filters
        refreshCategoryCounts();
        applyAllFilters();

        // Fit the map view to fully show the default radius zone(s)
        MapEngine.fitToZones(_poiCoords, _activeRadius);

        bindEvents();

        // Show sidebar on desktop
        if (window.innerWidth > 768) {
          $sidebar.classList.add("visible");
        }
      })
      .catch(function (err) {
        console.error("Map Explorer init failed:", err);
        var el = document.createElement("div");
        el.style.cssText =
          "position:fixed;top:20px;left:50%;transform:translateX(-50%);" +
          "background:var(--danger);color:#fff;padding:12px 24px;border-radius:8px;" +
          "z-index:9999;font-family:inherit;font-size:0.9rem;";
        el.textContent =
          "⚠ Failed to load location data. Check the console for details.";
        document.body.appendChild(el);
      });
  }

  // ── Dynamic UI builders ───────────────────────────────────────

  /** Inject CSS custom properties for each radius zone's colour. */
  function injectZoneCssVars(zones) {
    if (!zones || !zones.length) return;
    var styleEl = document.createElement("style");
    styleEl.id = "zone-css-vars";
    var rules = "";
    zones.forEach(function (z) {
      rules += "--zone-" + z.key + ": " + z.color + ";\n";
    });
    rules += "--zone-outside: #6a7078;\n";
    styleEl.textContent = ":root {\n" + rules + "}\n";
    // Remove any previous injected block
    var old = document.getElementById("zone-css-vars");
    if (old) old.remove();
    document.head.appendChild(styleEl);
  }

  /** Capitalise the first letter of a category key for display. */
  function prettyCategory(cat) {
    return cat ? cat.charAt(0).toUpperCase() + cat.slice(1) : "";
  }

  /** Collect unique categories from the data, in first-appearance order. */
  function collectCategories(locations) {
    var cats = [];
    locations.forEach(function (loc) {
      if (!loc.category) return;
      if (cats.indexOf(loc.category) === -1) cats.push(loc.category);
    });
    return cats;
  }

  /** Icon for a category — the first location icon in that category, else a tag. */
  function iconForCategory(cat, locations) {
    for (var i = 0; i < locations.length; i++) {
      if (locations[i].category === cat && locations[i].icon) {
        return locations[i].icon;
      }
    }
    return "fa-tag";
  }

  /** Build category filter buttons from the unique categories in the config. */
  function buildCategoryFilters(locations) {
    $catFilters.innerHTML = "";

    // "All" button — always first and active by default
    var allBtn = document.createElement("button");
    allBtn.className = "cat-btn active";
    allBtn.dataset.category = "all";
    allBtn.innerHTML =
      '<i class="fa-solid fa-globe"></i> All<span class="badge-count">0</span>';
    $catFilters.appendChild(allBtn);

    collectCategories(locations).forEach(function (cat) {
      var btn = document.createElement("button");
      btn.className = "cat-btn";
      btn.dataset.category = cat;
      btn.innerHTML =
        '<i class="fa-solid ' +
        iconForCategory(cat, locations) +
        '"></i> ' +
        prettyCategory(cat) +
        '<span class="badge-count">0</span>';
      $catFilters.appendChild(btn);
    });
  }

  /** Inject `.active` accent rules for each configured category colour.
   *  Colors come from the optional top-level `categories` block in the
   *  config JSON: `[{ key, color }]`. Unconfigured categories keep the
   *  generic accent styling from main.css. */
  function injectCategoryAccents(categories) {
    var old = document.getElementById("category-accent-css");
    if (old) old.remove();
    if (!categories || !categories.length) return;

    var rules = "";
    categories.forEach(function (c) {
      if (!c || !c.key || !c.color) return;
      // Quote-safe attribute value for the selector
      var key = String(c.key).replace(/[\\"]/g, "\\$&");
      var sel = '.cat-btn[data-category="' + key + '"].active';
      rules +=
        sel +
        "{background:color-mix(in srgb," +
        c.color +
        " 18%,transparent);border-color:" +
        c.color +
        ";color:" +
        c.color +
        "}";
      rules +=
        sel +
        " .badge-count{background:color-mix(in srgb," +
        c.color +
        " 28%,transparent)}";
    });
    if (!rules) return;

    var styleEl = document.createElement("style");
    styleEl.id = "category-accent-css";
    styleEl.textContent = rules;
    document.head.appendChild(styleEl);
  }

  /** Build radius-zone filter buttons from config. */
  function buildRadiusFilters(zones) {
    if (!zones || !zones.length) return;
    $radFilters.innerHTML = "";
    zones.forEach(function (z) {
      var btn = document.createElement("button");
      btn.className = "radius-btn";
      btn.dataset.radius = z.key;
      btn.innerHTML =
        '<span class="zone-dot" style="background:' +
        z.color +
        ';"></span> ' +
        z.label;
      $radFilters.appendChild(btn);
    });
  }

  /** Build the map legend items from config. */
  function buildLegend(zones) {
    var $legend = document.getElementById("legend");
    if (!$legend) return;

    // Save the title HTML before clearing
    var titleHtml = '<div class="legend-title">Radius Zones</div>';
    $legend.innerHTML = titleHtml;

    if (zones && zones.length) {
      zones.forEach(function (z) {
        var item = document.createElement("div");
        item.className = "legend-item";
        item.innerHTML =
          '<span class="legend-swatch" style="background:' +
          z.color +
          '"></span> ' +
          z.label;
        $legend.appendChild(item);
      });
    }

    // POI Center line
    var poiItem = document.createElement("div");
    poiItem.className = "legend-item";
    poiItem.style.cssText =
      "margin-top:4px;border-top:1px solid var(--border-subtle);padding-top:4px;";
    poiItem.innerHTML =
      '<span style="color:#ffd700;font-weight:700;">&#9733;</span>&nbsp; POI Center';
    $legend.appendChild(poiItem);
  }

  // ── Start ─────────────────────────────────────────────────────
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
