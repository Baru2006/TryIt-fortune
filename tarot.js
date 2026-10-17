// ==================================================
// TAROT GAME LOGIC + AUDIO
// ==================================================

let requiredCards = 1;
let selectedCards = [];
let isPicking = false;
let isMusicOn = true;

// Audio Elements
const bgMusic = document.getElementById('bgMusic');
const sfxClick = document.getElementById('sfxClick');
const sfxShuffle = document.getElementById('sfxShuffle');
const sfxReveal = document.getElementById('sfxReveal');

// Utility: Play Sound
function playSound(sfx) {
  if (isMusicOn && sfx) {
    sfx.currentTime = 0;
    sfx.play().catch(e => console.log("Audio error:", e));
  }
}

// Utility: Toggle Music
function toggleMusic() {
  isMusicOn = !isMusicOn;
  const btn = document.getElementById('musicToggle');
  
  if (isMusicOn) {
    bgMusic.play();
    btn.innerText = "ON";
    btn.classList.remove("off");
  } else {
    bgMusic.pause();
    btn.innerText = "OFF";
    btn.classList.add("off");
  }
}

// Utility: Show Screen
function showScreen(screenId) {
  document.querySelectorAll('.tarot-screen').forEach(s => s.classList.remove('active'));
  document.getElementById(screenId).classList.add('active');
}

// 1. App Start -> Play Music
window.addEventListener('DOMContentLoaded', () => {
  bgMusic.volume = 0.5; // Volume 50%
  bgMusic.play().catch(e => console.log("Need interaction to play audio"));
  showScreen('screen-start');
});

// 2. Menu Navigation
function startGame() {
  playSound(sfxClick);
  showScreen('screen-intro');
}

function openSettings() {
  playSound(sfxClick);
  showScreen('screen-settings');
}

function backToMenu() {
  playSound(sfxClick);
  showScreen('screen-start');
}

function goToChoice() {
  playSound(sfxClick);
  showScreen('screen-choice');
}

// 3. Start Reading
function startReading(num) {
  playSound(sfxClick);
  playSound(sfxShuffle); // ကဒ်မွှေသံ
  
  requiredCards = num;
  selectedCards = [];
  isPicking = false; 
  
  document.getElementById('pick-instruction').innerText = `${num} ကဒ် ရွေးချယ်ပါ`;
  
  let shuffledDeck = [...TAROT_DECK].sort(() => Math.random() - 0.5);
  let drawnCards = shuffledDeck.slice(0, 10);

  const grid = document.getElementById('cardsGrid');
  grid.innerHTML = '';
  
  drawnCards.forEach((cardData, index) => {
    const card = document.createElement('div');
    card.className = 'tarot-card';
    card.style.animationDelay = `${index * 0.05}s`;
    // နောက်ကျောပုံကို CSS မှာ ထည့်ထားပါတယ်
    card.onclick = () => pickCard(card, cardData); 
    grid.appendChild(card);
  });

  showScreen('screen-pick');
}

// 4. Pick Card
function pickCard(cardElement, cardData) {
  if (isPicking) return;

  playSound(sfxClick); // နှိပ်သံ
  cardElement.classList.add('selected');
  selectedCards.push(cardData);

  if (selectedCards.length === requiredCards) {
    isPicking = true;
    setTimeout(() => {
      playSound(sfxReveal); // ကဒ်လှန်သံ
      showResult();
    }, 500);
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
    
    // ကဒ်ပုံထည့်မယ် (ပုံမရှိရင် အမည်ပြမယ်)
    cardDiv.style.backgroundImage = `url('assets/cards/${card.img}')`;
    cardDiv.innerHTML = `<span style="color:#8b5cf6; font-size:18px; font-weight:bold; display:flex; align-items:center; justify-content:center; height:100%; text-align:center; padding:5px; background:rgba(255,255,255,0.8);">${card.name}</span>`; 
    
    revealContainer.appendChild(cardDiv);

    if (requiredCards === 1) {
      fortuneText += `<div style="margin-bottom:20px;">
        <h3 style="color:#8b5cf6; margin-bottom:8px; font-size:18px;">${card.name}</h3>
        <p style="font-size:15px; line-height:1.6;">${card.general}</p>
      </div>`;
    } else {
      const position = index === 0 ? "အတိတ်" : index === 1 ? "ပစ္စုပ္ပန်" : "အနာဂတ်";
      const meaning = index === 0 ? card.past : index === 1 ? card.present : card.future;
      
      fortuneText += `<div style="margin-bottom:15px; text-align:left; border-bottom:1px solid rgba(255,255,255,0.1); padding-bottom:10px;">
        <h3 style="color:#8b5cf6; font-size:16px; margin-bottom:5px;">${position} - ${card.name}</h3>
        <p style="font-size:14px; line-height:1.5;">${meaning}</p>
      </div>`;
    }
  });

  document.getElementById('fortuneText').innerHTML = fortuneText;
  showScreen('screen-result');
}

// 6. Save / Share
function saveReading() {
  playSound(sfxClick);
  const captureArea = document.querySelector('.result-container');
  const btn = document.querySelector('.action-buttons .icon-btn');
  const originalText = btn.innerText;
  btn.innerText = '⏳ Saving...';

  html2canvas(captureArea, { backgroundColor: '#0f0a1a', scale: 2 }).then(canvas => {
    const link = document.createElement('a');
    link.download = `Tarot-Reading-${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
    btn.innerText = originalText;
  }).catch(err => {
    alert("သိမ်းဆည်း၍ မရပါ။");
    btn.innerText = originalText;
  });
}

function shareApp() {
  playSound(sfxClick);
  const appUrl = "https://t.me/tryitmm_bot/app"; 
  const text = "🔮 ငါ့အတွက် Tarot ကဒ်ဖတ်ကြည့်လိုက်တာ။ မင်းလည်း လုပ်ကြည့်ပါဦး!";
  
  if (window.Telegram && window.Telegram.WebApp) {
    window.Telegram.WebApp.openTelegramLink(
      `https://t.me/share/url?url=${encodeURIComponent(appUrl)}&text=${encodeURIComponent(text)}`
    );
  }
}

// 7. Outro & Info
function showOutro() {
  playSound(sfxClick);
  showScreen('screen-outro');
  setTimeout(() => {
    showScreen('screen-info');
  }, 4000); 
}

function leaveApp() {
  playSound(sfxClick);
  bgMusic.pause(); // ထွက်ခွာရင် သီချင်းပိတ်မယ်
  window.location.href = 'index.html';
}

function restartApp() {
  playSound(sfxClick);
  showScreen('screen-start');
}
