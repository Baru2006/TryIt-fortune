// ==================================================
// TELEGRAM WEBAPP
// ==================================================
if (window.Telegram && window.Telegram.WebApp) {
  window.Telegram.WebApp.ready();
  window.Telegram.WebApp.expand();
}

// ==================================================
// NAVIGATION
// ==================================================
function goToPage(url) {
  if (url === '#') return;
  window.location.href = url;
}

// ==================================================
// OPEN TOOL (Internal / External)
// ==================================================
function openTool(url, isExternal) {
  if (!isExternal) {
    goToPage(url);
    return;
  }

  if (window.Telegram && window.Telegram.WebApp) {
    window.Telegram.WebApp.openLink(url, { try_instant_view: false });
  } else {
    window.open(url, '_blank');
  }
}

// ==================================================
// RENDER GRID — Horizontal Scroll + SVG Icons
// ==================================================
function renderGrid(containerId, items) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = items.map(item => {
    const onclick = item.external
      ? `openTool('${item.url}', true)`
      : `goToPage('${item.url}')`;

    const svgIcon = getIcon(item.icon);

    return `
      <div class="grid-card" onclick="${onclick}">
        <div class="grid-icon">${svgIcon}</div>
        <div class="grid-label">${item.label}</div>
        <div class="grid-sub">${item.sub}</div>
      </div>
    `;
  }).join('');
}

// ==================================================
// INIT
// ==================================================
document.addEventListener('DOMContentLoaded', () => {
  // Render all sections
  renderGrid('toolsGrid',   TOOLS);
  renderGrid('appsGrid',    POPULAR_APPS);
  renderGrid('gamesGrid',   POPULAR_GAMES);
  renderGrid('ourAppsGrid', OUR_APPS);

  // Auto-render [data-icon] elements (see-more arrows, hero button)
  renderDataIcons();
});
