// ==================================================
// TRYIT HUB — SVG ICONS LIBRARY
// All icons: 24x24 viewBox, currentColor, stroke
// ==================================================

const ICONS = {

  // ===== TOOLS =====
  music: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 18V5l12-2v13" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="6" cy="18" r="3" stroke="currentColor" stroke-width="1.8"/>
    <circle cx="18" cy="16" r="3" stroke="currentColor" stroke-width="1.8"/>
  </svg>`,

  video: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="6" width="15" height="12" rx="2" stroke="currentColor" stroke-width="1.8"/>
    <path d="M17 10l5-3v10l-5-3" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`,

  image: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" stroke-width="1.8"/>
    <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor"/>
    <path d="M21 15l-5-5L5 21" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`,

  tiktok: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14 4v10.5a4.5 4.5 0 1 1-4.5-4.5M14 4c0 2.5 1.5 4.5 4 5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`,

  volume: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M11 5L6 9H2v6h4l5 4V5z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
    <path d="M15.5 8.5a5 5 0 0 1 0 7M19 5a9 9 0 0 1 0 14" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
  </svg>`,

  calculator: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="4" y="2" width="16" height="20" rx="2" stroke="currentColor" stroke-width="1.8"/>
    <path d="M8 6h8M8 11h2M14 11h2M8 15h2M14 15h2M8 19h2M14 19h2" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
  </svg>`,

  // ===== APPS =====
  ai: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="5" y="7" width="14" height="12" rx="3" stroke="currentColor" stroke-width="1.8"/>
    <path d="M9 4v3M15 4v3M9 19v2M15 19v2" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
    <circle cx="9.5" cy="13" r="1" fill="currentColor"/>
    <circle cx="14.5" cy="13" r="1" fill="currentColor"/>
  </svg>`,

  scissors: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="6" cy="6" r="3" stroke="currentColor" stroke-width="1.8"/>
    <circle cx="6" cy="18" r="3" stroke="currentColor" stroke-width="1.8"/>
    <path d="M20 4L8.5 15.5M20 20L8.5 8.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
  </svg>`,

  send: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
  </svg>`,

  paint: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.8"/>
    <circle cx="9" cy="9" r="1.5" fill="currentColor"/>
    <circle cx="15" cy="9" r="1.5" fill="currentColor"/>
    <circle cx="9" cy="15" r="1.5" fill="currentColor"/>
    <circle cx="15" cy="15" r="1.5" fill="currentColor"/>
  </svg>`,

  camera: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 8a2 2 0 0 1 2-2h2l2-3h6l2 3h2a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
    <circle cx="12" cy="13" r="3.5" stroke="currentColor" stroke-width="1.8"/>
  </svg>`,

  headphones: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 18v-6a9 9 0 0 1 18 0v6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
    <rect x="3" y="14" width="4" height="7" rx="2" stroke="currentColor" stroke-width="1.8"/>
    <rect x="17" y="14" width="4" height="7" rx="2" stroke="currentColor" stroke-width="1.8"/>
  </svg>`,

  // ===== GAMES =====
  fire: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2c2 5 6 6 6 11a6 6 0 0 1-12 0c0-3 2-5 3-7 0 2 1 3 2 3s2-1 1-7z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
  </svg>`,

  crosshair: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.8"/>
    <path d="M12 1v6M12 17v6M1 12h6M17 12h6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
    <circle cx="12" cy="12" r="2" fill="currentColor"/>
  </svg>`,

  target: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.8"/>
    <circle cx="12" cy="12" r="5" stroke="currentColor" stroke-width="1.8"/>
    <circle cx="12" cy="12" r="1.5" fill="currentColor"/>
  </svg>`,

  car: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 17h14M3 17v-5l2-5h14l2 5v5" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
    <circle cx="7" cy="17" r="2" stroke="currentColor" stroke-width="1.8"/>
    <circle cx="17" cy="17" r="2" stroke="currentColor" stroke-width="1.8"/>
  </svg>`,

  cube: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L2 7v10l10 5 10-5V7l-10-5zM2 7l10 5M12 12l10-5M12 12v10" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
  </svg>`,

  gamepad: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="7" width="20" height="10" rx="5" stroke="currentColor" stroke-width="1.8"/>
    <path d="M6 12h4M8 10v4M15 11h.01M17 13h.01" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
  </svg>`,

  // ===== OUR APPS =====
  crystal: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.8"/>
    <path d="M8 10c1-2 3-3 4-3s3 1 4 3M9 15c1 2 2 2 3 2s2 0 3-2" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
    <circle cx="10" cy="12" r="0.8" fill="currentColor"/>
    <circle cx="14" cy="12" r="0.8" fill="currentColor"/>
  </svg>`,

  shield: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2l9 4v6c0 5-3.5 9-9 10-5.5-1-9-5-9-10V6l9-4z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
    <path d="M9 12l2 2 4-4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`,

  card: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" stroke-width="1.8"/>
    <path d="M8 11h3M8 15h5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
    <circle cx="17" cy="10" r="1.5" fill="currentColor"/>
  </svg>`,

  question: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.8"/>
    <path d="M9.5 9.5c0-1.4 1.1-2.5 2.5-2.5s2.5 1.1 2.5 2.5c0 1.5-2.5 2-2.5 3.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
    <circle cx="12" cy="17" r="0.9" fill="currentColor"/>
  </svg>`,

  // ===== UI =====
  arrowRight: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`,

  arrowLeft: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M19 12H5M11 18l-6-6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`,

  sparkle: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2l2 7 7 2-7 2-2 7-2-7-7-2 7-2 2-7z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
  </svg>`,

  rocket: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 15c-1 3-2 4-2 4s3-1 5-2M14.5 4.5c2-2 4.5-2 5.5-1 1 1 1 3.5-1 5.5L13 15l-4-4 5.5-6.5z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
    <circle cx="15" cy="9" r="1.5" stroke="currentColor" stroke-width="1.8"/>
  </svg>`,
};

// Helper — Get icon by name
function getIcon(name) {
  return ICONS[name] || '';
}

// Auto-render icons in elements with [data-icon]
function renderDataIcons() {
  document.querySelectorAll('[data-icon]').forEach(el => {
    const iconName = el.getAttribute('data-icon');
    if (ICONS[iconName]) {
      el.innerHTML = ICONS[iconName];
    }
  });
}
