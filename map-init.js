// Province data with coordinates (center of each province, used for the locator dot)
const provincesData = {
    'cuneo': { lat: 44.389, lng: 7.541, name: 'CUNEO', region: 'Piemonte' },
    'verbania': { lat: 45.933, lng: 8.560, name: 'VERBANIA', region: 'Piemonte' },
    'novara': { lat: 45.447, lng: 8.627, name: 'NOVARA', region: 'Piemonte' },
    'alessandria': { lat: 44.913, lng: 8.618, name: 'ALESSANDRIA', region: 'Piemonte' },
    'milano': { lat: 45.465, lng: 9.188, name: 'MILANO', region: 'Lombardia' },
    'pavia': { lat: 45.191, lng: 9.158, name: 'PAVIA', region: 'Lombardia' },
    'padova': { lat: 45.408, lng: 11.877, name: 'PADOVA', region: 'Veneto' },
    'rovigo': { lat: 45.074, lng: 11.789, name: 'ROVIGO', region: 'Veneto' },
    'forli': { lat: 44.191, lng: 12.039, name: 'FORLÌ', region: 'Emilia-Romagna' },
    'ravenna': { lat: 44.418, lng: 12.199, name: 'RAVENNA', region: 'Emilia-Romagna' },
    'rimini': { lat: 44.070, lng: 12.566, name: 'RIMINI', region: 'Emilia-Romagna' },
    'chieti': { lat: 42.370, lng: 14.168, name: 'CHIETI', region: 'Abruzzo' },
    'molise': { lat: 41.557, lng: 14.650, name: 'MOLISE', region: 'Molise' },
    'cagliari': { lat: 39.216, lng: 9.133, name: 'CAGLIARI', region: 'Sardegna' },
    'oristano': { lat: 39.897, lng: 8.589, name: 'ORISTANO', region: 'Sardegna' },
    'catania': { lat: 37.503, lng: 15.087, name: 'CATANIA', region: 'Sicilia' },
    'ragusa': { lat: 36.927, lng: 14.748, name: 'RAGUSA', region: 'Sicilia' },
    'siracusa': { lat: 37.265, lng: 15.298, name: 'SIRACUSA', region: 'Sicilia' }
};

const PROVINCE_BOUNDARIES_URL = 'assets/data/it-provinces.geojson';

const AREA_STYLE = {
    color: '#0a7d49',
    weight: 1.5,
    opacity: 0.85,
    fillColor: '#25b66a',
    fillOpacity: 0.25
};

const AREA_STYLE_ACTIVE = {
    color: '#0a7d49',
    weight: 2,
    opacity: 1,
    fillColor: '#25b66a',
    fillOpacity: 0.5
};

let map = null;
let areas = {};
let markers = {};

// Initialize map when DOM is ready
function initMap() {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', setupMap);
    } else {
        setupMap();
    }
}

function setupMap() {
    const mapElement = document.getElementById('map');
    if (!mapElement) return;

    // Create map centered on Italy
    map = L.map('map', {
        scrollWheelZoom: false,
        tap: true
    }).setView([41.8719, 12.5674], 6);

    // Add tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19,
        style: {
            filter: 'brightness(0.95) contrast(1.05)'
        }
    }).addTo(map);

    // Re-enable scroll-to-zoom only once the user has intentionally
    // interacted with the map, so mouse-wheel page scrolling never
    // gets trapped when the map is small (tablet/mobile layouts).
    map.once('click focus', () => map.scrollWheelZoom.enable());

    // Leaflet caches the container size at init time and never checks
    // it again on its own. On this page the map container's size
    // changes across breakpoints (grid stacking, height changes) and
    // on orientation change / browser resize, which left the map
    // showing blank/grey tiles or a misaligned view at most screen
    // sizes. Keep it in sync with the real container size.
    const refreshMapSize = () => {
        if (map) map.invalidateSize();
    };

    if ('ResizeObserver' in window) {
        new ResizeObserver(refreshMapSize).observe(mapElement);
    } else {
        window.addEventListener('resize', refreshMapSize);
        window.addEventListener('orientationchange', refreshMapSize);
    }

    // Fonts/images loading after first paint can still shift layout;
    // double-check the size shortly after setup too.
    window.setTimeout(refreshMapSize, 300);

    // Add a locator dot for each province straight away, so hover/click
    // from the sidebar list works even before the boundary shapes load.
    Object.keys(provincesData).forEach(provinceKey => {
        const data = provincesData[provinceKey];
        const marker = L.circleMarker(
            [data.lat, data.lng],
            {
                radius: 5,
                fillColor: '#fff',
                color: '#0a7d49',
                weight: 2,
                opacity: 1,
                fillOpacity: 1
            }
        ).addTo(map);

        const popup = L.popup().setContent(`<h4>${data.name}</h4><p>${data.region}</p>`);
        marker.bindPopup(popup);

        marker.on('click', () => selectProvince(provinceKey));

        markers[provinceKey] = marker;
    });

    // Draw the actual province boundaries so the map shows the whole
    // area covered, not just a point.
    fetch(PROVINCE_BOUNDARIES_URL)
        .then(res => res.json())
        .then(geojson => {
            L.geoJSON(geojson, {
                style: AREA_STYLE,
                onEachFeature: (feature, layer) => {
                    const provinceKey = feature.properties.province;
                    const data = provincesData[provinceKey];
                    if (!data) return;

                    areas[provinceKey] = layer;
                    layer.bindPopup(`<h4>${data.name}</h4><p>${data.region}</p>`);

                    layer.on('mouseover', () => highlightProvince(provinceKey));
                    layer.on('mouseout', () => unhighlightProvince(provinceKey));
                    layer.on('click', () => selectProvince(provinceKey));

                    // Keep the locator dot above the shape.
                    if (markers[provinceKey]) markers[provinceKey].bringToFront();
                }
            }).addTo(map);
        })
        .catch(() => {
            // If the boundaries fail to load, the locator dots added
            // above still make every covered province clickable.
        });

    // Province items interaction
    document.querySelectorAll('.province-item').forEach(item => {
        const provinceKey = item.dataset.province;

        item.addEventListener('mouseenter', () => {
            item.classList.add('active');
            highlightProvince(provinceKey);
        });

        item.addEventListener('mouseleave', () => {
            item.classList.remove('active');
            unhighlightProvince(provinceKey);
        });

        item.addEventListener('click', (e) => {
            e.preventDefault();
            selectProvince(provinceKey);
        });
    });
}

function highlightProvince(provinceKey) {
    if (areas[provinceKey]) areas[provinceKey].setStyle(AREA_STYLE_ACTIVE);
    if (markers[provinceKey]) markers[provinceKey].setStyle({ radius: 7 });
}

function unhighlightProvince(provinceKey) {
    if (areas[provinceKey]) areas[provinceKey].setStyle(AREA_STYLE);
    if (markers[provinceKey]) markers[provinceKey].setStyle({ radius: 5 });
}

function selectProvince(provinceKey) {
    const coord = provincesData[provinceKey];
    if (!coord) return;

    document.querySelectorAll('.province-item').forEach(el => el.classList.remove('active'));
    const item = document.querySelector(`[data-province="${provinceKey}"]`);
    if (item) {
        item.classList.add('active');
        item.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    if (areas[provinceKey]) {
        map.fitBounds(areas[provinceKey].getBounds(), { maxZoom: 9, duration: 1 });
    } else {
        map.flyTo([coord.lat, coord.lng], 8, { duration: 1 });
    }

    if (markers[provinceKey]) markers[provinceKey].openPopup();
}

// Initialize when Leaflet is ready
if (typeof L !== 'undefined') {
    initMap();
} else {
    // Wait for Leaflet to load
    const checkLeaflet = setInterval(() => {
        if (typeof L !== 'undefined') {
            clearInterval(checkLeaflet);
            initMap();
        }
    }, 100);
}
