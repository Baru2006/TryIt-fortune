// အစမ်းသုံး Data (tarot-data.js မထည့်ရသေးလို့ ဒါကို ခေတ္တသုံးထားပါတယ်)
const mockDeck = Array.from({length: 56}, (_, i) => ({
  id: i + 1,
  name: `Card ${i + 1}`,
  img: `${i + 1}.png`, // ပုံအမည်
  general: "ယေဘုယျ အဓိပ္ပာယ် (အစမ်း)",
  past: "အတိတ် အဓိပ္ပာယ် (အစမ်း)",
  present: "ပစ္စုပ္ပန် အဓိပ္ပာယ် (အစမ်း)",
  future: "အနာဂတ် အဓိပ္ပာယ် (အစမ်း)"
}));

// State များ
let requiredCards = 1;
let selectedCards = [];
let currentPile = [];
let isMusicOn = true;

// Audio
const bgMusic = document.getElementById('bgMusic');
const sfxClick = document.getElementById('sfxClick');
const sfxShuffle = document.getElementById('sfxShuffle');

function playSound(sfx) {
  if (isMusicOn && sfx) {
    sfx.currentTime = 0;
    sfx.play().catch(e => console.log("Audio error"));
  }
}

function toggleMusic() {
  isMusicOn = !isMusicOn;
  const btn = document.getElementById('musicToggle');
  if (isMusicOn) { bgMusic.play(); btn.innerText = "ON"; btn.classList.remove("off"); }
  else { bgMusic.pause(); btn.innerText = "OFF"; btn.classList.add("off"); }
}

function showScreen(screenId) {
  document.querySelectorAll('.tarot-screen').forEach(s => s.classList.remove('active'));
  document.getElementById(screenId).classList.add('active');
}

// 1. App စဝင်တာနဲ့ ၅ စက္ကန့် စောင့်မယ်
window.addEventListener('DOMContentLoaded', () => {
  bgMusic.volume = 0.4;
  setTimeout(() => {
    showScreen('screen-home');
  }, 5000); // 5 sec
});

// 2. Home -> Welcome
function goToWelcome() {
  playSound(sfxClick);
  if (isMusicOn && bgMusic.paused) bgMusic.play().catch(e=>console.log(e));
  showScreen('screen-welcome');
}

function openSettings() { playSound(sfxClick); showScreen('screen-settings'); }

// 3. Choice (၁ ကဒ်/၃ ကဒ်) -> Shuffle
function startShuffle(num) {
  playSound(sfxClick);
  playSound(sfxShuffle);
  requiredCards = num;
  
  showScreen('screen-shuffle');
  
  // Progress Bar (၃ စက္ကန့်)
  let progress = 0;
  const interval = setInterval(() => {
    progress += 2;
    document.getElementById('progress-fill').style.width = progress + '%';
    
    if (progress >= 100) {
      clearInterval(interval);
      preparePiles();
    }
  }, 60); // 60ms * 50 = 3000ms (3 sec)
}

// 4. Pile ပြင်ဆင်ခြင်း
function preparePiles() {
  // ကဒ်တွေကို ရောမယ်
  let shuffled = [...mockDeck].sort(() => Math.random() - 0.5);
  
  // ၁၄ ကဒ် ၄ စု ခွဲမယ်
  window.piles = [];
  for (let i = 0; i < 4; i++) {
    window.piles.push(shuffled.slice(i * 14, (i + 1) * 14));
  }
  
  showScreen('screen-piles');
}

// 5. အစုတစ်ခုကို ရွေးချယ်ပြီး ၁၄ ကဒ် ခင်းမယ်
function selectPile(index) {
  playSound(sfxClick);
  currentPile = window.piles[index];
  selectedCards = []; // reset
  
  document.getElementById('pick-instruction').innerText = `ကဒ် ${requiredCards} ကဒ် ရွေးပါ`;
  document.getElementById('confirm-btn').style.display = 'none';

  const container = document.getElementById('spreadContainer');
  container.innerHTML = '';

  // ၄-၃-၄-၃ ပုံစံအတိုင်း Row တွေ ခွဲတည်ဆောက်မယ်
  const rows = [4, 3, 4, 3];
  let cardIndex = 0;

  rows.forEach(count => {
    const rowDiv = document.createElement('div');
    rowDiv.className = 'spread-row';

    for (let i = 0; i < count; i++) {
      if (cardIndex >= currentPile.length) break;
      const cardData = currentPile[cardIndex];
      
      const cardEl = document.createElement('div');
      cardEl.className = 'spread-card';
      cardEl.onclick = () => toggleCardSelection(cardEl, cardData);
      
      rowDiv.appendChild(cardEl);
      cardIndex++;
    }
    container.appendChild(rowDiv);
  });

  showScreen('screen-spread');
}

// 6. ကဒ်ရွေးချယ်ခြင်း (Highlight လုပ်မယ်)
function toggleCardSelection(element, cardData) {
  if (element.classList.contains('selected')) {
    // ရွေးထားတာကို ပြန်ဖျက်မယ်
    element.classList.remove('selected');
    selectedCards = selectedCards.filter(c => c.id !== cardData.id);
  } else {
    // အသစ်ရွေးမယ် (သတ်မှတ်ထားတဲ့ အရေအတွက်ထက် မကျော်ရဘူး)
    if (selectedCards.length < requiredCards) {
      playSound(sfxClick);
      element.classList.add('selected');
      selectedCards.push(cardData);
    }
  }

  // လိုအပ်တဲ့ အရေအတွက် ပြည့်သွားရင် "သေချာပြီ" ခလုတ်ပြမယ်
  const confirmBtn = document.getElementById('confirm-btn');
  if (selectedCards.length === requiredCards) {
    confirmBtn.style.display = 'block';
  } else {
    confirmBtn.style.display = 'none';
  }
}

// 7. ရလဒ်ပြသခြင်း
function showResult() {
  playSound(sfxClick);
  
  const revealContainer = document.getElementById('revealedCards');
  revealContainer.innerHTML = '';
  let fortuneHtml = '';

  selectedCards.forEach((card, index) => {
    // ကဒ်ပုံနဲ့ အနေအထား (အတိတ်/ပစ္စုပ္ပန်/အနာဂတ်) သတ်မှတ်မယ်
    let positionLabel = '';
    let meaningText = '';

    if (requiredCards === 1) {
      positionLabel = 'ရလဒ်';
      meaningText = card.general;
    } else {
      if (index === 0) { positionLabel = 'အတိတ်'; meaningText = card.past; }
      else if (index === 1) { positionLabel = 'ပစ္စုပ္ပန်'; meaningText = card.present; }
      else if (index === 2) { positionLabel = 'အနာဂတ်'; meaningText = card.future; }
    }

    // ကဒ်ပုံပြမယ်
    const wrapper = document.createElement('div');
    wrapper.className = 'reveal-card-wrapper';
    wrapper.innerHTML = `
      <div class="reveal-card" style="background-image: url('assets/cards/${card.img}');"></div>
      <div class="position-label">${positionLabel}</div>
    `;
    revealContainer.appendChild(wrapper);

    // စာသားပြမယ်
    fortuneHtml += `
      <div style="margin-bottom: 15px;">
        <h3>${positionLabel} - ${card.name}</h3>
        <p>${meaningText}</p>
      </div>
    `;
  });

  document.getElementById('fortuneText').innerHTML = fortuneHtml;
  showScreen('screen-result');
}

// 8. Action ခလုတ်များ
function saveReading() {
  playSound(sfxClick);
  const captureArea = document.getElementById('captureArea');
  
  // ခလုတ်တွေ ဖျောက်မယ်
  document.body.classList.add('screenshot-mode');

  html2canvas(captureArea, { backgroundColor: '#0f0a1a', scale: 2, useCORS: true }).then(canvas => {
    const link = document.createElement('a');
    link.download = `Tarot-${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
    
    // ခလုတ်တွေ ပြန်ပြမယ်
    setTimeout(() => document.body.classList.remove('screenshot-mode'), 1000);
  }).catch(err => {
    alert("သိမ်းဆည်း၍ မရပါ။");
    document.body.classList.remove('screenshot-mode');
  });
}

function againReading() {
  playSound(sfxClick);
  // ကဒ်ရွေးတဲ့နေရာကို ပြန်သွားမယ်
  selectedCards = [];
  document.querySelectorAll('.spread-card').forEach(c => c.classList.remove('selected'));
  document.getElementById('confirm-btn').style.display = 'none';
  showScreen('screen-spread');
}

function leaveToHome() {
  playSound(sfxClick);
  showScreen('screen-home');
}
