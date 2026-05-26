/* ==========================================================================
   NEXO FASHIONS - INTERACTIVE GLOBAL REACH MAP CONTROLLER
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    const mapContainer = document.querySelector('.map-wrapper');
    if (!mapContainer) return;

    // Define coordinates for sourcing routes (represented inside SVG container scale 800x450)
    // Tiruppur center point: (580, 240)
    const points = {
        tiruppur: { x: 580, y: 240, name: "Tiruppur (Sourcing Hub)" },
        london: { x: 385, y: 120, name: "United Kingdom", desc: "Private Label Sourcing & Buying Houses" },
        paris: { x: 405, y: 132, name: "Western Europe", desc: "High-End Streetwear & Organic Garments" },
        newyork: { x: 235, y: 155, name: "East Coast USA", desc: "Sustainable Clothing & Sports Brands" },
        scandinavia: { x: 430, y: 80, name: "Scandinavia", desc: "Premium Knitwear & OEKO-TEX Standard Brands" }
    };

    const hubs = document.querySelectorAll('.map-point-interactive');
    const pathConnections = document.querySelectorAll('.pulse-line');

    hubs.forEach(hub => {
        hub.addEventListener('mouseenter', (e) => {
            const hubId = e.currentTarget.getAttribute('data-hub');
            const data = points[hubId];

            if (!data) return;

            // Highlight corresponding path line
            const path = document.querySelector(`.line-${hubId}`);
            if (path) {
                path.style.stroke = 'var(--color-luxury-gold)';
                path.style.strokeWidth = '3';
                path.style.filter = 'drop-shadow(0 0 6px rgba(212, 175, 55, 0.8))';
            }

            // Create or show elegant luxury tooltip
            let tooltip = document.getElementById('map-tooltip');
            if (!tooltip) {
                tooltip = document.createElement('div');
                tooltip.id = 'map-tooltip';
                tooltip.style.position = 'absolute';
                tooltip.style.backgroundColor = 'var(--color-primary-dark)';
                tooltip.style.border = '1px solid var(--color-luxury-gold)';
                tooltip.style.padding = 'var(--space-sm)';
                tooltip.style.borderRadius = 'var(--border-radius-sm)';
                tooltip.style.boxShadow = 'var(--shadow-lg)';
                tooltip.style.zIndex = '100';
                tooltip.style.pointerEvents = 'none';
                tooltip.style.opacity = '0';
                tooltip.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                tooltip.style.minWidth = '220px';
                mapContainer.appendChild(tooltip);
            }

            tooltip.innerHTML = `
                <h4 style="color: var(--color-luxury-gold); margin-bottom: 4px; font-size: 0.95rem; text-transform: uppercase; font-family: var(--font-body); letter-spacing: 0.05em;">${data.name}</h4>
                <p style="color: #D1D5DB; font-size: 0.85rem; margin: 0; line-height: 1.4;">${data.desc || 'Active Supply Chain Partner Hub'}</p>
            `;

            // Tooltip positioning
            const mapRect = mapContainer.getBoundingClientRect();
            const hubRect = e.currentTarget.getBoundingClientRect();
            
            const left = hubRect.left - mapRect.left + (hubRect.width / 2) - 110; // Center tooltip
            const top = hubRect.top - mapRect.top - tooltip.offsetHeight - 12; // Place above node

            tooltip.style.left = `${left}px`;
            tooltip.style.top = `${top}px`;
            tooltip.style.opacity = '1';
            tooltip.style.transform = 'translateY(0)';
        });

        hub.addEventListener('mouseleave', (e) => {
            const hubId = e.currentTarget.getAttribute('data-hub');
            
            // Revert corresponding path line
            const path = document.querySelector(`.line-${hubId}`);
            if (path) {
                path.style.stroke = 'rgba(15, 118, 110, 0.4)';
                path.style.strokeWidth = '1.5';
                path.style.filter = '';
            }

            const tooltip = document.getElementById('map-tooltip');
            if (tooltip) {
                tooltip.style.opacity = '0';
                tooltip.style.transform = 'translateY(-10px)';
            }
        });
    });
});
