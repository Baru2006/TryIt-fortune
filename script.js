// ==================================================
// TRYIT HUB — MAIN SCRIPT
// ==================================================

// Telegram WebApp ready
if (window.Telegram && window.Telegram.WebApp) {
  window.Telegram.WebApp.ready();
  window.Telegram.WebApp.expand();
}

// ==================================================
// NAVIGATION
// ==================================================
function goToPage(url) {
  window.location.href = url;
}

function openMenu() {
  // Menu action (optional)
  alert('Menu — Coming Soon');
}

// ==================================================
// OPEN TOOL — Internal or External
// ==================================================
function openTool(url, isInternal) {
  if (isInternal) {
    window.location.href = url;
    return;
  }

  // External — Telegram openLink
  if (window.Telegram && window.Telegram.WebApp) {
    window.Telegram.WebApp.openLink(url, {
      try_instant_view: false,
    });
  } else {
    window.open(url, '_blank');
  }
}

// ==================================================
// RENDER POPULAR APPS
// ==================================================
function renderPopular() {
  const grid = document.getElementById('popularGrid');
  if (!grid) return;

  grid.innerHTML = POPULAR_APPS.map(app => `
    <div class="grid-card glass-card" onclick="goToPage('${app.url}')">
      <div class="grid-icon">${app.icon}</div>
      <span class="grid-label">${app.label}</span>
      <span class="grid-sub">${app.sub}</span>
    </div>
  `).join('');
}

// ==================================================
// RENDER ONLINE TOOLS
// ==================================================
function renderTools() {
  const list = document.getElementById('toolsList');
  if (!list) return;

  list.innerHTML = ONLINE_TOOLS.map(tool => `
    <div class="tool-item" onclick="openTool('${tool.url}', ${!!tool.internal})">
      <div class="tool-icon-wrap">${tool.icon}</div>
      <div class="tool-info">
        <h4>${tool.title}</h4>
        <p>${tool.sub}</p>
      </div>
      <span class="tool-arrow">→</span>
    </div>
  `).join('');
}

// ==================================================
// INIT
// ==================================================
document.addEventListener('DOMContentLoaded', () => {
  renderPopular();
  renderTools();
});
