// ==================================================
// TAROT GAME LOGIC
// ==================================================

let requiredCards = 1;
let selectedCards = [];
let currentPileCards = []; // ရွေးချယ်လိုက်တဲ့ အစုထဲက ကဒ် ၁၄ ကဒ်
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

// 1. Initial Load (၅ စက္ကန့် Loading ပြီး Start Menu ကို သွားမယ်)
window.addEventListener('DOMContentLoaded', () => {
  bgMusic.volume = 0.4;
  setTimeout(() => {
    showScreen('screen-start');
  }, 5000); // 5 စက္ကန့်
});

// 2. Menu Navigation
function startGame() {
  playSound(sfxClick);
  if (isMusicOn && bgMusic.paused) bgMusic.play().catch(e => console.log(e));
  
  // "တာရော့ကြည့်မယ်" နှိပ်ပြီး ၃ စက္ကန့် ရောနှောတဲ့ Loading ပြမယ်
  showScreen('screen-shuffle');
  playSound(sfxShuffle);
  setTimeout(() => {
    showScreen('screen-intro');
  }, 3000); // 3 စက္ကန့်
}

function goToChoice() {
  playSound(sfxClick);
  showScreen('screen-choice');
}

function openSettings() {
  playSound(sfxClick);
  showScreen('screen-settings');
}

function backToMenu() {
  playSound(sfxClick);
  showScreen('screen-start');
}

// 3. Prepare Piles (ကဒ် ၅၆ ကဒ်ကို ရောပြီး ၁၄ ကဒ် ၄ စု ခွဲမယ်)
function preparePiles(num) {
  playSound(sfxClick);
  requiredCards = num;
  selectedCards = [];
  isPicking = false; 
  
  document.getElementById('pick-instruction').innerText = `${num} ကဒ် ရွေးချယ်ပါ`;
  
  // Deck ကို ရောမယ်
  let shuffledDeck = [...TAROT_DECK].sort(() => Math.random() - 0.5);
  
  // Pile တွေကို သိမ်းမယ် (၁၄ ကဒ်စီ)
  window.piles = [];
  for(let i=0; i<4; i++) {
    window.piles.push(shuffledDeck.slice(i*14, (i+1)*14));
  }

  showScreen('screen-piles'); // အစုရွေးတဲ့စာမျက်နှာကို သွားမယ်
}

// 4. Select Pile (အစုတစ်ခုကို ရွေးပြီး ကဒ် ၁၄ ကဒ် ခင်းမယ်)
function selectPile(index) {
  playSound(sfxClick);
  currentPileCards = window.piles[index]; // ရွေးလိုက်တဲ့အစုထဲက ၁၄ ကဒ်
  
  const grid = document.getElementById('cardsGrid');
  grid.innerHTML = '';
  
  currentPileCards.forEach((cardData, i) => {
    const card = document.createElement('div');
    card.className = 'tarot-card';
    card.style.animationDelay = `${i * 0.05}s`;
    card.onclick = () => pickCard(card, cardData); 
    grid.appendChild(card);
  });

  showScreen('screen-pick');
}

// 5. Pick Card
function pickCard(cardElement, cardData) {
  if (isPicking || cardElement.classList.contains('selected')) return;

  playSound(sfxClick);
  cardElement.classList.add('selected');
  selectedCards.push(cardData);

  if (selectedCards.length === requiredCards) {
    isPicking = true;
    setTimeout(() => {
      playSound(sfxReveal);
      showResult();
    }, 500);
  }
}

// 6. Show Result
function showResult() {
  const revealContainer = document.getElementById('revealedCards');
  revealContainer.innerHTML = '';

  let fortuneText = "";

  selectedCards.forEach((card, index) => {
    const cardDiv = document.createElement('div');
    cardDiv.className = 'reveal-card';
    
    // ကဒ်ပုံထည့်မယ်
    cardDiv.style.backgroundImage = `url('assets/cards/${card.img}')`;
    
    // ပုံမရှိရင် အမည်ပြမယ် (Fallback)
    cardDiv.innerHTML = `<span style="color:#8b5cf6; font-size:14px; font-weight:bold; display:flex; align-items:center; justify-content:center; height:100%; text-align:center; padding:5px; background:rgba(255,255,255,0.8);">${card.name}</span>`; 
    
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

// 7. Save / Share
function saveReading() {
  playSound(sfxClick);
  const captureArea = document.getElementById('captureArea');
  const btns = document.querySelectorAll('.action-buttons .icon-btn');
  
  // ခလုတ်တွေကို ခဏဖျောက်မယ် (ပုံထဲ ပါမသွားအောင်)
  document.querySelector('.action-buttons').style.display = 'none';
  document.querySelector('.primary-btn').style.display = 'none';

  html2canvas(captureArea, { 
    backgroundColor: '#0f0a1a', 
    scale: 2,
    useCORS: true
  }).then(canvas => {
    const link = document.createElement('a');
    link.download = `Tarot-Reading-${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
    
    // ခလုတ်တွေ ပြန်ပြမယ်
    document.querySelector('.action-buttons').style.display = 'flex';
    document.querySelector('.primary-btn').style.display = 'block';
  }).catch(err => {
    alert("သိမ်းဆည်း၍ မရပါ။");
    document.querySelector('.action-buttons').style.display = 'flex';
    document.querySelector('.primary-btn').style.display = 'block';
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

// 8. Outro & Info
function showOutro() {
  playSound(sfxClick);
  showScreen('screen-outro');
  setTimeout(() => {
    showScreen('screen-info');
  }, 4000); 
}

function leaveApp() {
  playSound(sfxClick);
  if(bgMusic) bgMusic.pause();
  window.location.href = 'index.html'; // ဒါမှမဟုတ် Telegram ပိတ်ချင်ရင် window.Telegram.WebApp.close()
}

function restartApp() {
  playSound(sfxClick);
  showScreen('screen-choice'); // Choice ကနေ ပြန်စမယ်
}
