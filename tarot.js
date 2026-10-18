// ==================================================
// TAROT GAME LOGIC (V2 - With Progress Bar)
// ==================================================

let requiredCards = 1;
let selectedCards = [];
let isPicking = false;
let isMusicOn = true;

const bgMusic = document.getElementById('bgMusic');
const sfxClick = document.getElementById('sfxClick');
const sfxShuffle = document.getElementById('sfxShuffle');
const sfxReveal = document.getElementById('sfxReveal');

function playSound(sfx) {
  if (isMusicOn && sfx) { sfx.currentTime = 0; sfx.play().catch(e => console.log(e)); }
}

function toggleMusic() {
  isMusicOn = !isMusicOn;
  const btn = document.getElementById('musicToggle');
  if (isMusicOn) {
    bgMusic.play(); btn.innerText = "ON"; btn.classList.remove("off");
  } else {
    bgMusic.pause(); btn.innerText = "OFF"; btn.classList.add("off");
  }
}

function showScreen(screenId) {
  document.querySelectorAll('.tarot-screen').forEach(s => s.classList.remove('active'));
  document.getElementById(screenId).classList.add('active');
}

// 1. Loading Screen Progress Bar
window.addEventListener('DOMContentLoaded', () => {
  bgMusic.volume = 0.4;
  let progress = 0;
  const progressBar = document.getElementById('progressBar');
  
  const interval = setInterval(() => {
    progress += Math.random() * 15; // ကျပန်း တိုးမယ်
    if (progress > 100) progress = 100;
    progressBar.style.width = progress + '%';

    if (progress === 100) {
      clearInterval(interval);
      setTimeout(() => {
        showScreen('screen-start');
      }, 500); // 100% ပြည့်ပြီး ခဏနေမှ Menu ကို သွားမယ်
    }
  }, 150); // 150ms တစ်ခါ တိုးမယ်
});

// 2. Menu Actions
function startGame() {
  playSound(sfxClick);
  if (isMusicOn && bgMusic.paused) bgMusic.play().catch(e => console.log(e));
  showScreen('screen-intro');
}

function openSettings() { playSound(sfxClick); showScreen('screen-settings'); }
function openAbout() { playSound(sfxClick); showScreen('screen-about'); }
function backToMenu() { playSound(sfxClick); showScreen('screen-start'); }

// 3. Start Reading (Pick Screen)
function startReading(num) {
  playSound(sfxClick);
  playSound(sfxShuffle);
  
  requiredCards = num;
  selectedCards = [];
  isPicking = false; 
  
  document.getElementById('pick-instruction').innerText = `ကဒ် ${num} ကဒ် ရွေးပါ`;
  
  let shuffledDeck = [...TAROT_DECK].sort(() => Math.random() - 0.5);
  let drawnCards = shuffledDeck.slice(0, 10);

  const grid = document.getElementById('cardsGrid');
  grid.innerHTML = '';
  
  drawnCards.forEach((cardData, index) => {
    const card = document.createElement('div');
    card.className = 'tarot-card';
    card.style.animationDelay = `${index * 0.05}s`;
    card.onclick = () => pickCard(card, cardData); 
    grid.appendChild(card);
  });

  showScreen('screen-pick');
}

// 4. Pick Card
function pickCard(cardElement, cardData) {
  if (isPicking) return;

  playSound(sfxClick);
  cardElement.classList.add('selected');
  selectedCards.push(cardData);

  if (selectedCards.length === requiredCards) {
    isPicking = true;
    setTimeout(() => {
      playSound(sfxReveal);
      showResult();
    }, 400);
  }
}

// 5. Show Result
function showResult() {
  const revealContainer = document.getElementById('revealedCards');
  revealContainer.innerHTML = '';
  let fortuneText = "";

  selectedCards.forEach((card, index) => {
    const cardDiv = document.createElement('div');
    cardDiv.className = 'reveal-card';
    cardDiv.style.backgroundImage = `url('assets/cards/${card.img}')`;
    cardDiv.innerHTML = `<span style="color:#8b5cf6; font-size:14px; font-weight:bold; text-align:center; background:rgba(255,255,255,0.8); width:100%; padding:5px 0;">${card.name}</span>`; 
    revealContainer.appendChild(cardDiv);

    if (requiredCards === 1) {
      fortuneText += `<div style="margin-bottom:15px;">
        <h3 style="color:#fbbf24; margin-bottom:5px;">${card.name}</h3>
        <p>${card.general}</p>
      </div>`;
    } else {
      const position = index === 0 ? "အတိတ်" : index === 1 ? "ပစ္စုပ္ပန်" : "အနာဂတ်";
      const meaning = index === 0 ? card.past : index === 1 ? card.present : card.future;
      fortuneText += `<div style="margin-bottom:10px; text-align:left; border-bottom:1px solid rgba(255,255,255,0.1); padding-bottom:5px;">
        <h3 style="color:#fbbf24; font-size:14px;">${position} - ${card.name}</h3>
        <p style="font-size:13px;">${meaning}</p>
      </div>`;
    }
  });

  document.getElementById('fortuneText').innerHTML = fortuneText;
  showScreen('screen-result');
}

// 6. Save / Share
function saveReading() {
  playSound(sfxClick);
  const captureArea = document.getElementById('captureArea');
  const btn = document.querySelector('.result-actions .action-btn');
  const originalText = btn.innerText;
  btn.innerText = 'Saving...';

  html2canvas(captureArea, { backgroundColor: '#1a1025', scale: 2 }).then(canvas => {
    const link = document.createElement('a');
    link.download = `Tarot-Reading-${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
    btn.innerText = originalText;
  }).catch(err => {
    alert("သိမ်းဆည်း၍ မရပါ။"); btn.innerText = originalText;
  });
}

// 7. Navigation
function leaveApp() {
  playSound(sfxClick);
  if(bgMusic) bgMusic.pause();
  window.location.href = 'index.html'; // TryIt Hub ပင်မစာမျက်နှာသို့
}

function restartApp() {
  playSound(sfxClick);
  showScreen('screen-intro'); // ပြန်စတဲ့အခါ ဟောစာတမ်းရွေးတဲ့ နေရာကို ပြန်သွားမယ်
}
