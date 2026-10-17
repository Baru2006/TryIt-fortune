// ==================================================
// TAROT GAME LOGIC (Fixed Version)
// ==================================================

let requiredCards = 1;
let selectedCards = [];
let drawnCards = [];
let isPicking = false; // ကဒ်ရွေးနေဆဲလား စစ်ဖို့

function showScreen(screenId) {
  document.querySelectorAll('.tarot-screen').forEach(s => s.classList.remove('active'));
  document.getElementById(screenId).classList.add('active');
}

// Loading ပြီးရင် Intro ကို သွားမယ်
window.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    showScreen('screen-intro');
  }, 3000);
});

// ရွေးချယ်မှု စတင်ခြင်း
function startReading(num) {
  requiredCards = num;
  selectedCards = [];
  drawnCards = [];
  isPicking = false; // 🔴 အရေးကြီး- ဒီနေရာမှာ false ပြန်ထားရမယ်
  
  document.getElementById('pick-instruction').innerText = `${num} ကဒ် ရွေးချယ်ပါ`;
  
  // ကဒ် ၁ ကနေ ၅၆ ထဲက ၁၀ ကဒ်ကို ကျပန်းရွေးမယ်
  let available = Array.from({length: 56}, (_, i) => i + 1);
  available.sort(() => Math.random() - 0.5);
  drawnCards = available.slice(0, 10);

  const grid = document.getElementById('cardsGrid');
  grid.innerHTML = '';
  
  drawnCards.forEach((cardNum, index) => {
    const card = document.createElement('div');
    card.className = 'tarot-card';
    card.style.animationDelay = `${index * 0.05}s`;
    
    // ပုံမရှိသေးရင် ကဒ်နံပါတ် ပြထားမယ် (ခဏတာ)
    card.innerHTML = `<span style="color:rgba(255,255,255,0.2); font-size:12px;">${cardNum}</span>`;
    
    card.onclick = () => pickCard(card, cardNum);
    grid.appendChild(card);
  });

  showScreen('screen-pick');
}

// ကဒ်ရွေးချယ်ခြင်း
// ကဒ်ရွေးချယ်ခြင်း
function pickCard(cardElement, cardData) { // cardNum အစား cardData လက်ခံမယ်
  if (isPicking) return;

  cardElement.classList.add('selected');
  selectedCards.push(cardData); // ကဒ် Data တစ်ခုလုံးကို သိမ်းမယ်

  if (selectedCards.length === requiredCards) {
    isPicking = true;
    setTimeout(() => {
      showResult();
    }, 500);
  }
}

// ရလဒ်ပြသခြင်း
function showResult() {
  const revealContainer = document.getElementById('revealedCards');
  revealContainer.innerHTML = '';

  let fortuneText = "";

  selectedCards.forEach((card, index) => {
    const cardDiv = document.createElement('div');
    cardDiv.className = 'reveal-card';
    
    // ပုံကို ချိတ်ဆက်မယ် (သင့်ပုံတွေ assets/cards/ ထဲမှာ ရှိရမယ်)
    cardDiv.style.backgroundImage = `url('assets/cards/${card.img}')`;
    cardDiv.innerHTML = `<span style="color:#8b5cf6; font-size:20px; font-weight:bold; display:flex; align-items:center; justify-content:center; height:100%; background:rgba(255,255,255,0.8);">${card.name}</span>`; // ပုံမရှိရင် အမည်ပြမယ်
    
    revealContainer.appendChild(cardDiv);

    // ဟောစာတမ်း စာသား စုစည်းမယ်
    if (requiredCards === 1) {
      fortuneText += `<div style="margin-bottom:20px;">
        <h3 style="color:#8b5cf6; margin-bottom:5px;">${card.name}</h3>
        <p>${card.general}</p>
      </div>`;
    } else {
      const position = index === 0 ? "အတိတ်" : index === 1 ? "ပစ္စုပ္ပန်" : "အနာဂတ်";
      const meaning = index === 0 ? card.past : index === 1 ? card.present : card.future;
      
      fortuneText += `<div style="margin-bottom:20px; text-align:left; border-bottom:1px solid rgba(255,255,255,0.1); padding-bottom:10px;">
        <h3 style="color:#8b5cf6; font-size:16px;">${position} - ${card.name}</h3>
        <p style="font-size:14px;">${meaning}</p>
      </div>`;
    }
  });

  document.getElementById('fortuneText').innerHTML = fortuneText;
  showScreen('screen-result');
}

function saveReading() {
  alert("သင့်ရဲ့ ဟောစာတမ်းကို သိမ်းဆည်းလိုက်ပါပြီ။ (Screenshot ရိုက်ထားနိုင်ပါတယ်)");
}

function shareApp() {
  const appUrl = "https://t.me/tryitmm_bot/app"; 
  const text = "🔮 ငါ့အတွက် Tarot ကဒ်ဖတ်ကြည့်လိုက်တာ။ မင်းလည်း လုပ်ကြည့်ပါဦး!";
  
  if (window.Telegram && window.Telegram.WebApp) {
    window.Telegram.WebApp.openTelegramLink(
      `https://t.me/share/url?url=${encodeURIComponent(appUrl)}&text=${encodeURIComponent(text)}`
    );
  } else {
    alert("Share link: " + appUrl);
  }
}

function showOutro() {
  showScreen('screen-outro');
  setTimeout(() => {
    showScreen('screen-info');
  }, 4000);
}

function leaveApp() {
  window.location.href = 'index.html';
}

function restartApp() {
  showScreen('screen-loading');
  setTimeout(() => {
    showScreen('screen-intro');
  }, 2000);
}
