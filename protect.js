// ==================================================
// COPY PROTECTION
// ==================================================

// 1. Right-click ပိတ်
document.addEventListener('contextmenu', (e) => {
  e.preventDefault();
  return false;
});

// 2. Copy, Cut, Paste ပိတ်
['copy', 'cut', 'paste'].forEach(event => {
  document.addEventListener(event, (e) => {
    e.preventDefault();
    return false;
  });
});

// 3. Text Selection ပိတ်
document.addEventListener('selectstart', (e) => {
  e.preventDefault();
  return false;
});

// 4. Long-press (mobile) ပိတ်
document.addEventListener('touchstart', (e) => {
  if (e.touches.length > 1) {
    e.preventDefault();
  }
}, { passive: false });

// 5. Long-press context menu (mobile) ပိတ်
document.addEventListener('touchmove', (e) => {
  // allow scrolling
}, { passive: true });

// 6. Image drag ပိတ်
document.addEventListener('dragstart', (e) => {
  if (e.target.tagName === 'IMG') {
    e.preventDefault();
    return false;
  }
});

// 7. Ctrl+C, Ctrl+U, Ctrl+S, F12 ပိတ်
document.addEventListener('keydown', (e) => {
  // Ctrl/Cmd + C, U, S, A
  if ((e.ctrlKey || e.metaKey) && ['c', 'u', 's', 'a'].includes(e.key.toLowerCase())) {
    e.preventDefault();
    return false;
  }
  // F12 (DevTools)
  if (e.key === 'F12') {
    e.preventDefault();
    return false;
  }
  // Ctrl+Shift+I / J / C
  if ((e.ctrlKey || e.metaKey) && e.shiftKey && ['i', 'j', 'c'].includes(e.key.toLowerCase())) {
    e.preventDefault();
    return false;
  }
});

// 8. All images — draggable="false" သတ်မှတ်
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('img').forEach(img => {
    img.setAttribute('draggable', 'false');
    img.style.pointerEvents = 'none';
  });
});

console.log('🔒 Protection enabled');
