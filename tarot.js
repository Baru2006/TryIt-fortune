// ==========================================
// CONFIG & STATE
// ==========================================
let currentMode = 'daily'; 
let requiredCards = 1;
let selectedCards = [];
let isPicking = false;
let isMusicOn = true;
let userQuestion = ""; 

// ၁၂ လရာသီ နောက်ခံပုံများ (Assets/bg/ ထဲမှာ ထည့်ထားပါ)
const SEASON_BACKGROUNDS = {
  0: 'assets/bg/jan.webp', 1: 'assets/bg/feb.webp', 2: 'assets/bg/mar.webp',
  3: 'assets/bg/apr.webp', 4: 'assets/bg/may.webp', 5: 'assets/bg/jun.webp',
  6: 'assets/bg/jul.webp', 7: 'assets/bg/aug.webp', 8: 'assets/bg/sep.webp',
  9: 'assets/bg/oct.webp', 10: 'assets/bg/nov.webp', 11: 'assets/bg/dec.webp'
};

const bgMusic = document.getElementById('bgMusic');
const sfxClick = document.getElementById('sfxClick');
const sfxShuffle = document.getElementById('sfxShuffle');
const sfxReveal = document.getElementById('sfxReveal');

// Telegram Ready
if (window.Telegram && window.Telegram.WebApp) {
  window.Telegram.WebApp.ready();
  window.Telegram.WebApp.expand();
}

// ==========================================
// TICKET & TIME LOGIC (LocalStorage)
// ==========================================
function getTickets() { return parseInt(localStorage.getItem('tarot_tickets') || '3'); }
function setTickets(amount) { 
  localStorage.setItem('tarot_tickets', amount); 
  document.getElementById('ticketCount').innerText = amount;
}

function getTime() { return Math.floor(Date.now() / 1000); }

function checkCooldown(key, durationSeconds) {
  const lastUsed = parseInt(localStorage.getItem(key) || '0');
  const now = getTime();
  if (now - lastUsed >= durationSeconds) {
    return true; // Ready
  }
  return false; // On cooldown
}

function setCooldown(key) {
  localStorage.setItem(key, getTime().toString());
}

function updateAdButtons() {
  const btnWatch = document.getElementById('btnWatchAd');
  const btnTask = document.getElementById('btnTaskAd');

  // Watch Ad (1 Hour = 3600s)
  if (checkCooldown('last_watch_ad', 3600)) {
    btnWatch.disabled = false;
    btnWatch.innerHTML = `<img src="assets/icons/watch-ad.svg" class="icon-svg"><span>ကြော်ငြာကြည့်မယ် (+3)</span>`;
  } else {
    btnWatch.disabled = true;
    btnWatch.innerHTML = `<img src="assets/icons/watch-ad.svg" class="icon-svg"><span>နောက်ထပ် ၁ နာရီ စောင့်ပါ</span>`;
  }

  // Task Ad (1 Hour = 3600s)
  if (checkCooldown('last_task_ad', 3600)) {
    btnTask.disabled = false;
    btnTask.innerHTML = `<img src="assets/icons/task-ad.svg" class="icon-svg"><span>Task လုပ်မယ် (+1)</span>`;
  } else {
    btnTask.disabled = true;
    btnTask.innerHTML = `<img src="assets/icons/task-ad.svg" class="icon-svg"><span>နောက်ထပ် ၁ နာရီ စောင့်ပါ</span>`;
  }
}

// Daily Free Card Logic
function getDailyFreeStatus() {
  const today = new Date().toLocaleDateString();
  const lastFree = localStorage.getItem('last_free_card');
  return lastFree !== today;
}
function setDailyFreeUsed() {
  const today = new Date().toLocaleDateString();
  localStorage.setItem('last_free_card', today);
}

// ==========================================
// UI & SETUP
// ==========================================
function playSound(sfx) { 
  if (isMusicOn && sfx) { sfx.currentTime = 0; sfx.play().catch(e => console.log(e)); } 
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
  if(screenId === 'screen-start') updateAdButtons();
}

// ==========================================
// AD FUNCTIONS (Monetag)
// ==========================================
function watchAd() {
  if (!checkCooldown('last_watch_ad', 3600)) return;
  
  if (typeof show_12069395 === "function") {
    show_12069395().then(() => {
      setCooldown('last_watch_ad');
      setTickets(getTickets() + 3);
      updateAdButtons();
      alert("ကြော်ငြာကြည့်ပြီးပါပြီ။ Ticket ၃ ခု ရပါပြီ။");
    }).catch((e) => {
      console.log("Ad error/skipped", e);
      alert("ကြော်ငြာ ကြည့်ခြင်း မအောင်မြင်ပါ။");
    });
  } else {
    // Test အတွက်
    setCooldown('last_watch_ad');
    setTickets(getTickets() + 3);
    updateAdButtons();
    alert("(Test) Ticket ၃ ခု ရပါပြီ။");
  }
}

function taskAd() {
  if (!checkCooldown('last_task_ad', 3600)) return;
  
  if (typeof show_12069395 === "function") {
    show_12069395().then(() => {
      setCooldown('last_task_ad');
      setTickets(getTickets() + 1);
      updateAdButtons();
      alert("Task ပြီးပါပြီ။ Ticket ၁ ခု ရပါပြီ။");
    }).catch((e) => {
      console.log("Task Ad error", e);
    });
  } else {
    setCooldown('last_task_ad');
    setTickets(getTickets() + 1);
    updateAdButtons();
    alert("(Test) Ticket ၁ ခု ရပါပြီ။");
  }
}

// ==========================================
// READING LOGIC
// ==========================================
function openReading(mode) {
  playSound(sfxClick);
  
  // 1. Daily Free Check
  if (mode === 'daily') {
    if (!getDailyFreeStatus()) {
      alert("ဒီနေ့အတွက် Free ကဒ် ကြည့်ပြီးသား ဖြစ်ပါတယ်။");
      return;
    }
    currentMode = 'daily';
    requiredCards = 1;
    selectedCards = [];
    startShuffle();
    return;
  }

  // 2. Ticket Check for other modes
  if (getTickets() < 1) {
    alert("Ticket မလုံလောက်ပါဘူး။ ကြော်ငြာကြည့်ပြီး Ticket ယူပါ။");
    return;
  }

  // Deduct Ticket
  setTickets(getTickets() - 1);
  currentMode = mode;
  selectedCards = [];

  if (mode === 'yesno') {
    requiredCards = 1;
    showScreen('screen-yesno');
  } else if (mode === '3cards') {
    requiredCards = 3;
    startShuffle();
  } else {
    // Love, Career, Health (1 card read)
    requiredCards = 1;
    startShuffle();
  }
}

function submitYesNo() {
  userQuestion = document.getElementById('yesNoInput').value.trim();
  if (!userQuestion) { alert("မေးခွန်း အရင်ရေးပါ။"); return; }
  playSound(sfxClick);
  startShuffle();
}

function startShuffle() {
  playSound(sfxShuffle);
  showScreen('screen-shuffle');
  setTimeout(() => { buildPickGrid1(); }, 2000); 
}

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
      
      if (requiredCards === 1 && currentMode !== 'daily') {
        // Yes/No, Love, Career, Health အတွက် တစ်ကဒ်တည်း
        selectedCards = [cardData];
        selectedCards[0].isReversed = Math.random() < 0.5;
        setTimeout(() => { playSound(sfxReveal); showResult(); }, 400);
      } else if (currentMode === 'daily') {
        // Daily အတွက် တစ်ကဒ် (Free ဖြစ်လို့ Ticket မကောက်ဘူး)
        selectedCards = [cardData];
        selectedCards[0].isReversed = Math.random() < 0.5;
        setDailyFreeUsed();
        setTimeout(() => { playSound(sfxReveal); showResult(); }, 400);
      } else {
        buildPickGrid2();
      }
    };
    grid.appendChild(card);
  });
}

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

function pickCard(cardElement, cardData) {
  if (isPicking) return;
  isPicking = true;
  
  playSound(sfxClick);
  cardElement.classList.add('selected');
  
  cardData.isReversed = Math.random() < 0.5;
  selectedCards.push(cardData);
  
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
    
    cardDiv.style.backgroundImage = `url('assets/cards/${card.img}')`;
    cardDiv.onclick = () => openModal(card); 
    cardDiv.innerHTML = `<span style="color:#8b5cf6; font-size:12px; font-weight:bold; background:rgba(255,255,255,0.9); width:100%; text-align:center; padding:4px 0; border-radius:4px;">${card.name}</span>`; 
    revealContainer.appendChild(cardDiv);

    let meaning = card.isReversed ? card.reversed : card.upright;

    if (currentMode === 'yesno') {
      let answer = "";
      if (!card.isReversed && index === 0) answer = yesNoAnswers.yes;
      else if (card.isReversed) answer = yesNoAnswers.no;
      else answer = yesNoAnswers.maybe;

      fortuneText += `<div style="margin-bottom:20px; text-align:center;">
        <p style="font-size:14px; color:#a0aec0; font-style:italic; margin-bottom:10px;">"${userQuestion}"</p>
        <h3 style="color:#fbbf24; margin-bottom:5px;">ကဒ်ရဲ့ အဖြေ:</h3>
        <p style="font-size:16px; font-weight:bold; color:#10b981; margin-bottom: 15px;">${answer}</p>
        <button class="read-more-btn" onclick="openModalByIndex(${index})">အသေးစိတ် ဖတ်ရန်</button>
      </div>`;
    } else if (currentMode === '3cards') {
      const position = index === 0 ? "အတိတ်" : index === 1 ? "ပစ္စုပ္ပန်" : "အနာဂတ်";
      fortuneText += `<div style="margin-bottom:20px; text-align:left; border-bottom:1px solid rgba(255,255,255,0.1); padding-bottom:15px;">
        <h3 style="color:#fbbf24; font-size:16px; margin-bottom:8px;">${position} - ${card.name}</h3>
        <p style="font-size:14px; line-height:1.6; margin-bottom: 12px;">${meaning}</p>
        <button class="read-more-btn" onclick="openModalByIndex(${index})">အသေးစိတ် ဖတ်ရန်</button>
      </div>`;
    } else {
      // Daily, Love, Career, Health
      fortuneText += `<div style="margin-bottom:20px; text-align:center;">
        <h3 style="color:#fbbf24; font-size:16px; margin-bottom:8px;">${card.name}</h3>
        <p style="font-size:14px; line-height:1.6; margin-bottom: 12px;">${meaning}</p>
        <button class="read-more-btn" onclick="openModalByIndex(${index})">အသေးစိတ် ဖတ်ရန်</button>
      </div>`;
    }
  });

  document.getElementById('fortuneText').innerHTML = fortuneText;
  showScreen('screen-result');
}

function openModalByIndex(index) {
  openModal(selectedCards[index]);
}

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

function closeModal() { playSound(sfxClick); document.getElementById('cardModal').classList.remove('active'); }
function openSavedList() { playSound(sfxClick); document.getElementById('savedModal').classList.add('active'); }
function closeSavedList() { playSound(sfxClick); document.getElementById('savedModal').classList.remove('active'); }
function openSettings() { playSound(sfxClick); showScreen('screen-settings'); }
function openAbout() { playSound(sfxClick); showScreen('screen-about'); }
function backToMenu() { playSound(sfxClick); showScreen('screen-start'); }
function leaveApp() { playSound(sfxClick); if(bgMusic) bgMusic.pause(); window.location.href = 'index.html'; }

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
  btn.innerText = "Saved!";
  setTimeout(() => { btn.innerText = "Save"; }, 1500);
}

function restartApp() {
  playSound(sfxClick);
  selectedCards = [];
  showScreen('screen-start');
}

function agreeDisclaimer() {
  playSound(sfxClick);
  document.getElementById('disclaimerModal').style.display = 'none';
  
  // Loading စမယ်
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
}

// ==========================================
// INIT
// ==========================================
window.addEventListener('DOMContentLoaded', () => {
  // ၁၂ လ ရာသီ နောက်ခံပုံ သတ်မှတ်မယ်
  const currentMonth = new Date().getMonth(); // 0 = Jan, 11 = Dec
  document.getElementById('seasonBg').style.backgroundImage = `url('${SEASON_BACKGROUNDS[currentMonth]}')`;
  
  // Ticket Count ပြမယ်
  setTickets(getTickets());
});
