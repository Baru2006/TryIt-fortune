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
function pickCard(cardElement, cardNum) {
  if (isPicking) return; // 🔴 အရေးကြီး- ရွေးနေဆဲဆိုရင် ထပ်နှိပ်လို့မရအောင် ပိတ်မယ်

  cardElement.classList.add('selected');
  selectedCards.push(cardNum);

  // လိုအပ်တဲ့ အရေအတွက် ပြည့်သွားရင်
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

  selectedCards.forEach(cardNum => {
    const card = document.createElement('div');
    card.className = 'reveal-card';
    
    // ပုံထည့်ထားရင် ဒီကုဒ်က အလုပ်လုပ်မယ်
    card.style.backgroundImage = `url('assets/cards/${cardNum}.png')`;
    
    // ပုံမရှိသေးရင် နံပါတ်ပြထားမယ်
    card.innerHTML = `<span style="color:#8b5cf6; font-size:24px; font-weight:bold; display:flex; align-items:center; justify-content:center; height:100%;">${cardNum}</span>`;
    
    revealContainer.appendChild(card);
  });

  const textContainer = document.getElementById('fortuneText');
  if (requiredCards === 1) {
    textContainer.innerHTML = `သင့်ရဲ့ ဒီနေ့အတွက် လိုအပ်နေတဲ့ အရာကတော့...<br><br>ဒီကဒ်က သင့်ကို အားကောင်းတဲ့ စွမ်းအင်တွေ ပေးနေပါတယ်။ ရှေ့ဆက်ဖို့ သတ္တိရှိပါ။`;
  } else {
    textContainer.innerHTML = `<b>အတိတ်:</b> သင်ဖြတ်သန်းခဲ့တာတွေက ခက်ခဲပေမဲ့ အခုတော့ အတိတ်မှာ ထားခဲ့လိုက်ပါ။<br><br>
    <b>ပစ္စုပ္ပန်:</b> လက်ရှိအချိန်မှာ သင့်ရဲ့ ကြိုးစားမှုတွေ အသီးအပွင့်စတင်နေပါပြီ။<br><br>
    <b>အနာဂတ်:</b> မကြာခင်မှာ သင်မျှော်လင့်ထားတဲ့ ကောင်းချီးတွေ ရောက်လာပါလိမ့်မယ်။`;
  }

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
