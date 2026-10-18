// ==================================================
// TAROT GAME LOGIC (V6 - Final Polish)
// ==================================================

let currentMode = 'daily'; 
let requiredCards = 1;
let selectedCards = [];
let isPicking = false;
let isMusicOn = true;
let userQuestion = ""; 

const bgMusic = document.getElementById('bgMusic');
const sfxClick = document.getElementById('sfxClick');
const sfxShuffle = document.getElementById('sfxShuffle');
const sfxReveal = document.getElementById('sfxReveal');

function playSound(sfx) { 
  if (isMusicOn && sfx) { 
    sfx.currentTime = 0; 
    sfx.play().catch(e => console.log("Audio error:", e)); 
  } 
}

function toggleMusic() {
  isMusicOn = !isMusicOn;
  const btn = document.getElementById('musicToggle');
  if (isMusicOn) { bgMusic.play().catch(e => console.log(e)); btn.innerText = "ON"; btn.classList.remove("off"); }
  else { bgMusic.pause(); btn.innerText = "OFF"; btn.classList.add("off"); }
}

function showScreen(screenId) {
  document.querySelectorAll('.tarot-screen').forEach(s => s.classList.remove('active'));
  document.getElementById(screenId).classList.add('active');
}

// 1. Loading Screen
window.addEventListener('DOMContentLoaded', () => {
  bgMusic.volume = 0.4;
  let progress = 0;
  const progressBar = document.getElementById('progressBar');
  const interval = setInterval(() => {
    progress += Math.random() * 20;
    if (progress > 100) progress = 100;
    progressBar.style.width = progress + '%';
    if (progress === 100) {
      clearInterval(interval);
      setTimeout(() => showScreen('screen-start'), 500);
    }
  }, 150); 
});

// 2. Menu Navigation
function startGame() {
  playSound(sfxClick);
  if (isMusicOn && bgMusic.paused) bgMusic.play().catch(e => console.log(e));
  showScreen('screen-intro');
}

function openSettings() { playSound(sfxClick); showScreen('screen-settings'); }
function openAbout() { playSound(sfxClick); showScreen('screen-about'); }
function backToMenu() { playSound(sfxClick); showScreen('screen-start'); }

// 3. Choice Start
function startReading(mode, num) {
  playSound(sfxClick);
  currentMode = mode;
  requiredCards = num;
  selectedCards = []; // Reset 
  
  if (mode === 'yesno') {
    showScreen('screen-yesno');
  } else {
    startShuffle();
  }
}

function submitYesNo() {
  userQuestion = document.getElementById('yesNoInput').value.trim();
  if (!userQuestion) { alert("မေးခွန်း အရင်ရေးပါ။"); return; }
  playSound(sfxClick);
  startShuffle();
}

// 4. Shuffle Scene
function startShuffle() {
  playSound(sfxShuffle);
  showScreen('screen-shuffle');
  setTimeout(() => { buildPickGrid1(); }, 2000); 
}

// 5. Pick Step 1 (၄ ကဒ်)
function buildPickGrid1() {
  showScreen('screen-pick1');
  document.getElementById('title-pick1').innerText = `ကဒ် ${requiredCards} ကဒ် ရွေးပါ (အဆင့် ၁)`;
  
  let shuffled = [...TAROT_DECK].sort(() => Math.random() - 0.5).slice(0, 4);
  const grid = document.getElementById('grid1');
  grid.innerHTML = '';
  
  shuffled.forEach(cardData => {
    const card = document.createElement('div');
    card.className = 'tarot-card';
    card.onclick = () => {
      card.classList.add('selected');
      
      if (currentMode === 'yesno') {
        // Yes/No အတွက် ကဒ် ၁ ကဒ်တည်း
        selectedCards = [cardData];
        selectedCards[0].isReversed = Math.random() < 0.5;
        setTimeout(() => { playSound(sfxReveal); showResult(); }, 400);
      } else {
        // ကျန်တဲ့ Mode တွေအတွက် ဒုတိယအဆင့် ဆက်သွားမယ်
        buildPickGrid2();
      }
    };
    grid.appendChild(card);
  });
}

// 6. Pick Step 2 (၁၄ ကဒ်)
function buildPickGrid2() {
  showScreen('screen-pick2');
  document.getElementById('title-pick2').innerText = `ကဒ် ${requiredCards} ကဒ် ရွေးပါ (အဆင့် ၂)`;
  
  let shuffled = [...TAROT_DECK].sort(() => Math.random() - 0.5).slice(0, 14);
  const grid = document.getElementById('grid2');
  grid.innerHTML = '';
  
  const rowConfigs = [4, 3, 4, 3];
  let cardIndex = 0;
  
  rowConfigs.forEach(count => {
    const rowDiv = document.createElement('div');
    rowDiv.className = 'pick-row';
    for (let i = 0; i < count; i++) {
      const cardData = shuffled[cardIndex++];
      const card = document.createElement('div');
      card.className = 'tarot-card';
      card.onclick = () => pickCard(card, cardData);
      rowDiv.appendChild(card);
    }
    grid.appendChild(rowDiv);
  });
}

// 7. Pick Logic
function pickCard(cardElement, cardData) {
  if (isPicking) return;
  isPicking = true;
  
  playSound(sfxClick);
  cardElement.classList.add('selected');
  
  cardData.isReversed = Math.random() < 0.5;
  selectedCards.push(cardData);
  
  // လိုအပ်တဲ့ အရေအတွက် ပြည့်မပြည့် စစ်မယ်
  if (selectedCards.length === requiredCards) {
    setTimeout(() => {
      playSound(sfxReveal);
      showResult();
      isPicking = false;
    }, 400);
  } else {
    isPicking = false;
  }
}

// 8. Show Result
function showResult() {
  const revealContainer = document.getElementById('revealedCards');
  revealContainer.innerHTML = '';
  let fortuneText = "";

  const yesNoAnswers = {
    yes: "ဟုတ်ကဲ့ (Yes) - သေချာပါတယ်။ ဒီအလုပ်ကို လုပ်သင့်ပါတယ်။",
    no: "မဟုတ်ဘူး (No) - မလုပ်သင့်ပါဘူး။ နောက်တစ်ခါမှ စဉ်းစားပါ။",
    maybe: "ဖြစ်နိုင်တယ် (Maybe) - သင့်ရဲ့ ဆုံးဖြတ်ချက်ကို စောင့်ကြည့်ပါ။"
  };

  selectedCards.forEach((card, index) => {
    const cardDiv = document.createElement('div');
    cardDiv.className = 'reveal-card';
    if (card.isReversed) cardDiv.classList.add('reversed');
    
    // ပုံလမ်းကြောင်း (assets/cards/1.png စသဖြင့်)
    cardDiv.style.backgroundImage = `url('assets/cards/${card.img}')`;
    cardDiv.onclick = () => openModal(card);
    
    cardDiv.innerHTML = `<span style="color:#8b5cf6; font-size:12px; font-weight:bold; text-align:center; background:rgba(255,255,255,0.9); width:100%; padding:4px 0;">${card.name}</span>`; 
    revealContainer.appendChild(cardDiv);

    let meaning = card.isReversed ? card.reversed : card.upright;

    if (currentMode === 'yesno') {
      let answer = "";
      if (!card.isReversed && index === 0) answer = yesNoAnswers.yes;
      else if (card.isReversed) answer = yesNoAnswers.no;
      else answer = yesNoAnswers.maybe;

      fortuneText += `<div style="margin-bottom:15px;">
        <p style="font-size:14px; color:#a0aec0; font-style:italic; margin-bottom:10px;">"${userQuestion}"</p>
        <h3 style="color:#fbbf24; margin-bottom:5px;">ကဒ်ရဲ့ အဖြေ:</h3>
        <p style="font-size:16px; font-weight:bold; color:#10b981;">${answer}</p>
        <p style="font-size:13px; color:#a0aec0; margin-top:10px;">(${card.name})</p>
      </div>`;
    } else {
      const position = index === 0 ? "အတိတ်" : index === 1 ? "ပစ္စုပ္ပန်" : "အနာဂတ်";
      fortuneText += `<div style="margin-bottom:10px; text-align:left; border-bottom:1px solid rgba(255,255,255,0.1); padding-bottom:5px;">
        <h3 style="color:#fbbf24; font-size:14px;">${position} - ${card.name}</h3>
        <p style="font-size:13px;">${meaning}</p>
      </div>`;
    }
  });

  document.getElementById('fortuneText').innerHTML = fortuneText;
  showScreen('screen-result');
}

// 9. Save Logic (၅ ခုအထိ)
function saveReading() {
  playSound(sfxClick);
  let savedData = {
    date: new Date().toLocaleDateString(),
    cards: selectedCards.map(c => c.name),
    text: document.getElementById('fortuneText').innerHTML
  };

  let savedList = JSON.parse(localStorage.getItem('tarot_saves') || '[]');
  if (savedList.length >= 5) savedList.shift(); 
  savedList.push(savedData);
  localStorage.setItem('tarot_saves', JSON.stringify(savedList));

  const btn = document.querySelector('.result-actions .action-btn');
  const originalText = btn.innerText;
  btn.innerText = "Saved!";
  setTimeout(() => { btn.innerText = originalText; }, 1500);
}

// 10. Saved List (Modal)
function openSavedList() {
  playSound(sfxClick);
  const container = document.getElementById('savedListContainer');
  const savedList = JSON.parse(localStorage.getItem('tarot_saves') || '[]');
  
  if (savedList.length === 0) {
    container.innerHTML = "<p style='color:#a0aec0; text-align:center; font-family:Padauk;'>သိမ်းထားတာ မရှိသေးပါဘူး။</p>";
  } else {
    container.innerHTML = savedList.reverse().map((item) => `
      <div class="saved-item">
        <p style="font-weight:bold; color:#fbbf24; margin-bottom:5px;">${item.cards.join(', ')}</p>
        <p style="font-size:11px; color:#a0aec0;">${item.date}</p>
      </div>
    `).join('');
  }
  document.getElementById('savedModal').classList.add('active');
}

function closeSavedList() {
  playSound(sfxClick);
  document.getElementById('savedModal').classList.remove('active');
}

// 11. Card Detail Modal
function openModal(card) {
  playSound(sfxClick);
  document.getElementById('modal-img').src = `assets/cards/${card.img}`;
  document.getElementById('modal-img').style.transform = card.isReversed ? 'rotate(180deg)' : 'none';
  document.getElementById('modal-title').innerText = card.name;
  document.getElementById('modal-keywords').innerText = card.keywords;
  
  const statusBadge = document.getElementById('modal-status');
  if (card.isReversed) {
    statusBadge.innerText = "Reversed"; statusBadge.className = "status-badge reversed";
  } else {
    statusBadge.innerText = "Upright"; statusBadge.className = "status-badge upright";
  }

  document.getElementById('modal-general').innerText = card.general || "";
  document.getElementById('modal-upright').innerText = card.upright || "";
  document.getElementById('modal-reversed').innerText = card.reversed || "";
  document.getElementById('modal-love').innerText = card.love || "";
  document.getElementById('modal-career').innerText = card.career || "";
  document.getElementById('modal-health').innerText = card.health || "";
  document.getElementById('modal-advice').innerText = card.advice || "";

  document.getElementById('cardModal').classList.add('active');
}

function closeModal() {
  playSound(sfxClick);
  document.getElementById('cardModal').classList.remove('active');
}

// 12. Navigation
function leaveApp() {
  playSound(sfxClick);
  if(bgMusic) bgMusic.pause();
  window.location.href = 'index.html';
}

function restartApp() {
  playSound(sfxClick);
  selectedCards = []; // State ကို ရှင်းမယ်
  userQuestion = "";
  document.getElementById('yesNoInput').value = "";
  showScreen('screen-intro'); // ရွေးချယ်တဲ့ နေရာကို ပြန်သွားမယ်
}
