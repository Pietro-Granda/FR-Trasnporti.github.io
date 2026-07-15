// Province data with coordinates (center of each province)
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

let map = null;
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
    map = L.map('map').setView([41.8719, 12.5674], 6);

    // Add tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19,
        style: {
            filter: 'brightness(0.95) contrast(1.05)'
        }
    }).addTo(map);

    // Add markers for each province
    Object.keys(provincesData).forEach(provinceKey => {
        const data = provincesData[provinceKey];
        const marker = L.circleMarker(
            [data.lat, data.lng],
            {
                radius: 8,
                fillColor: '#0a7d49',
                color: '#fff',
                weight: 2,
                opacity: 1,
                fillOpacity: 0.8
            }
        ).addTo(map);

        // Popup content
        const popup = L.popup()
            .setContent(`<h4>${data.name}</h4><p>${data.region}</p>`);

        marker.bindPopup(popup);

        // Interaction
        marker.on('click', () => {
            const item = document.querySelector(`[data-province="${provinceKey}"]`);
            if (item) {
                document.querySelectorAll('.province-item').forEach(el => el.classList.remove('active'));
                item.classList.add('active');
                item.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        });

        markers[provinceKey] = marker;
    });

    // Province items interaction
    document.querySelectorAll('.province-item').forEach(item => {
        const provinceKey = item.dataset.province;

        item.addEventListener('mouseenter', () => {
            item.classList.add('active');
            if (markers[provinceKey]) {
                markers[provinceKey].setStyle({
                    fillColor: '#25b66a',
                    radius: 10
                });
            }
        });

        item.addEventListener('mouseleave', () => {
            item.classList.remove('active');
            if (markers[provinceKey]) {
                markers[provinceKey].setStyle({
                    fillColor: '#0a7d49',
                    radius: 8
                });
            }
        });

        item.addEventListener('click', (e) => {
            e.preventDefault();
            document.querySelectorAll('.province-item').forEach(el => el.classList.remove('active'));
            item.classList.add('active');

            if (markers[provinceKey]) {
                const coord = provincesData[provinceKey];
                map.flyTo([coord.lat, coord.lng], 8, { duration: 1 });
                markers[provinceKey].openPopup();
            }
        });
    });
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
