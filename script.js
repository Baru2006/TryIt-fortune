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
// RENDER TOOLS
// ==================================================
function renderTools() {
  const grid = document.getElementById('toolsGrid');
  if (!grid) return;

  grid.innerHTML = TOOLS.map(t => {
    const onclick = t.external
      ? `openTool('${t.url}', true)`
      : `openTool('${t.url}', false)`;

    return `
      <div class="tool-card" onclick="${onclick}">
        <div class="tool-icon">
          <img src="${t.icon}" alt="" draggable="false" />
        </div>
        <div class="tool-title">${t.title}</div>
        <div class="tool-sub">${t.sub}</div>
      </div>
    `;
  }).join('');
}

// ==================================================
// RENDER LIST (Apps / Games)
// ==================================================
function renderList(containerId, items, btnLabel) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = items.map(item => `
    <div class="list-card">
      <div class="list-card-icon">
        <img src="${item.icon}" alt="" draggable="false" />
      </div>
      <div class="list-card-body">
        <div class="list-card-title">${item.title}</div>
        <div class="list-card-tags">
          ${item.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
        </div>
        <div class="list-card-dev">${item.dev}</div>
        <div class="list-card-desc">${item.desc}</div>
        <div class="list-card-footer">
          <span class="list-card-size">${item.size}</span>
          <button class="list-card-btn" onclick="openTool('${item.url}', false)">
            ${btnLabel}
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

// ==================================================
// INIT
// ==================================================
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('toolsGrid'))  renderTools();
  if (document.getElementById('appList'))    renderList('appList',  POPULAR_APPS,  'အသုံးပြုမယ်');
  if (document.getElementById('gameList'))   renderList('gameList', POPULAR_GAMES, 'ဆော့မယ်');
});
