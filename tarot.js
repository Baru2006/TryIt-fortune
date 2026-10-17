
// ==================================================
// TAROT GAME LOGIC
// ==================================================

// State
let requiredCards = 1;
let selectedCards = [];
let drawnCards = []; // ရွေးချယ်ထားသော ကဒ်နံပါတ်များ
let isPicking = false;

// Screen တစ်ခုကနေ တစ်ခုကို ပြောင်းခြင်း
function showScreen(screenId) {
  document.querySelectorAll('.tarot-screen').forEach(s => s.classList.remove('active'));
  document.getElementById(screenId).classList.add('active');
}

// App စတင်ချိန် (Loading 3 စက္ကန့်)
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
  
  // ကဒ်အရေအတွက် ပြင်ဆင်ခြင်း
  document.getElementById('pick-instruction').innerText = `${num} ကဒ် ရွေးချယ်ပါ`;
  
  // ကဒ် ၅၆ ကဒ်ထဲက ၁၀ ကဒ်ကို ကျပန်းရွေးပြီး မှောက်ထားမယ်
  let available = Array.from({length: 56}, (_, i) => i + 1); // [1...56]
  available.sort(() => Math.random() - 0.5); // မွှေမယ်
  drawnCards = available.slice(0, 10); // ၁၀ ကဒ်ယူမယ်

  // ကဒ်များကို Screen ပေါ်တင်မယ်
  const grid = document.getElementById('cardsGrid');
  grid.innerHTML = '';
  drawnCards.forEach((cardNum, index) => {
    const card = document.createElement('div');
    card.className = 'tarot-card';
    card.style.animationDelay = `${index * 0.05}s`;
    card.onclick = () => pickCard(card, cardNum);
    grid.appendChild(card);
  });

  showScreen('screen-pick');
}

// ကဒ်ရွေးချယ်ခြင်း
function pickCard(cardElement, cardNum) {
  if (!isPicking) return; // ထပ်နှိပ်လို့မရအောင်

  cardElement.classList.add('selected');
  selectedCards.push(cardNum);

  // လိုအပ်တဲ့ အရေအတွက် ပြည့်သွားရင်
  if (selectedCards.length === requiredCards) {
    isPicking = true;
    setTimeout(() => {
      showResult();
      isPicking = false;
    }, 500); // ကဒ်ပျောက်သွားတာကို ခဏစောင့်မယ်
  }
}

// ရလဒ်ပြသခြင်း
function showResult() {
  const revealContainer = document.getElementById('revealedCards');
  revealContainer.innerHTML = '';

  // ရွေးထားတဲ့ ကဒ်တွေကို လှန်ပြမယ်
  selectedCards.forEach(cardNum => {
    const card = document.createElement('div');
    card.className = 'reveal-card';
    // ကဒ်ပုံကို သတ်မှတ်မယ် (ဥပမာ - assets/cards/12.png)
    card.style.backgroundImage = `url('assets/cards/${cardNum}.png')`;
    revealContainer.appendChild(card);
  });

  // ဟောစာတမ်း စာသား ထည့်မယ်
  // ⚠️ နောက်ပိုင်း ကဒ်တစ်ခုချင်းစီအလိုက် စာသားတွေ ထည့်နိုင်ပါတယ်။ 
  // အခုတော့ ယေဘုယျ စာသားလေးပဲ ထည့်ထားပါတယ်။
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

// သိမ်းဆည်းခြင်း (Save)
function saveReading() {
  // ဖုန်းထဲ save လုပ်ဖို့အတွက် Canvas ကိုသုံးပြီး ပုံပြောင်းရပါမယ်။ 
  // ဒီနေရာမှာ ရိုးရှင်းအောင် Alert ပဲ ပြထားပါတယ်။
  alert("သင့်ရဲ့ ဟောစာတမ်းကို သိမ်းဆည်းလိုက်ပါပြီ။ (Screenshot ရိုက်ထားနိုင်ပါတယ်)");
}

// Share လုပ်ခြင်း
function shareApp() {
  const appUrl = "https://t.me/tryitmm_bot/app"; // သင့် Mini App Link ကို ထည့်ပါ
  const text = "🔮 ငါ့အတွက် Tarot ကဒ်ဖတ်ကြည့်လိုက်တာ။ မင်းလည်း လုပ်ကြည့်ပါဦး!";
  
  if (window.Telegram && window.Telegram.WebApp) {
    window.Telegram.WebApp.openTelegramLink(
      `https://t.me/share/url?url=${encodeURIComponent(appUrl)}&text=${encodeURIComponent(text)}`
    );
  } else {
    alert("Share link: " + appUrl);
  }
}

// ဇာတ်ညွှန်း ဆက်လုပ်ခြင်း
function showOutro() {
  showScreen('screen-outro');
  setTimeout(() => {
    showScreen('screen-info');
  }, 4000); // စကားပြောပြီး ၄ စက္ကန့်နေမယ်
}

// အိမ်ပြန်သွားခြင်း
function leaveApp() {
  window.location.href = 'index.html';
}

// ပြန်စခြင်း
function restartApp() {
  showScreen('screen-loading');
  setTimeout(() => {
    showScreen('screen-intro');
  }, 2000);
}
