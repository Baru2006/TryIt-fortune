// ==================================================
// TAROT GAME LOGIC (Full Version)
// ==================================================

let requiredCards = 1;
let selectedCards = [];
let drawnCards = [];
let isPicking = false;

// 1. Screen ပြောင်းလဲခြင်း
function showScreen(screenId) {
  document.querySelectorAll('.tarot-screen').forEach(s => s.classList.remove('active'));
  document.getElementById(screenId).classList.add('active');
}

// 2. App စတင်ချိန် (Loading ပြီးရင် Intro ကို သွားမယ်)
window.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    showScreen('screen-intro');
  }, 3000); // ၃ စက္ကန့် စောင့်မယ်
});

// 3. ကဒ်ရွေးချယ်မှု စတင်ခြင်း
function startReading(num) {
  requiredCards = num;
  selectedCards = [];
  isPicking = false; 
  
  document.getElementById('pick-instruction').innerText = `${num} ကဒ် ရွေးချယ်ပါ`;
  
  // Data ထဲက ကဒ် ၅၆ ကဒ်ကို မွှေမယ်
  let shuffledDeck = [...TAROT_DECK].sort(() => Math.random() - 0.5);
  drawnCards = shuffledDeck.slice(0, 10); // ၁၀ ကဒ်ကို ရွေးထုတ်မယ်

  const grid = document.getElementById('cardsGrid');
  grid.innerHTML = '';
  
  drawnCards.forEach((cardData, index) => {
    const card = document.createElement('div');
    card.className = 'tarot-card';
    card.style.animationDelay = `${index * 0.05}s`;
    
    // ကဒ်ကျောဘက်မှာ နံပါတ်လေး ပြထားမယ် (ပုံမရှိသေးလို့)
    card.innerHTML = `<span style="color:rgba(255,255,255,0.2); font-size:12px;">${cardData.id}</span>`;
    
    // နှိပ်လိုက်ရင် ကဒ်ရဲ့ Data တစ်ခုလုံးကို ပို့မယ်
    card.onclick = () => pickCard(card, cardData); 
    grid.appendChild(card);
  });

  showScreen('screen-pick');
}

// 4. ကဒ်ရွေးချယ်ခြင်း
function pickCard(cardElement, cardData) {
  if (isPicking) return; // ရွေးနေဆဲဆိုရင် ထပ်နှိပ်လို့မရအောင် ပိတ်မယ်

  cardElement.classList.add('selected');
  selectedCards.push(cardData);

  // လိုအပ်တဲ့ အရေအတွက် ပြည့်သွားရင်
  if (selectedCards.length === requiredCards) {
    isPicking = true;
    setTimeout(() => {
      showResult();
    }, 500); // ကဒ်ပျောက်သွားတာကို ခဏစောင့်မယ်
  }
}

// 5. ရလဒ်ပြသခြင်း
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

    // ဟောစာတမ်း စာသား စုစည်းမယ်
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

// 6. သိမ်းဆည်းခြင်း (Save to Image)
function saveReading() {
  const captureArea = document.querySelector('.result-container');
  
  // ခလုတ်စာသား ခဏပြောင်းမယ်
  const btn = document.querySelector('.action-buttons .icon-btn');
  const originalText = btn.innerText;
  btn.innerText = '⏳ Saving...';

  // html2canvas ကို သုံးပြီး ပုံပြောင်းမယ်
  html2canvas(captureArea, { 
    backgroundColor: '#0f0a1a', // အနက်ရောင်နောက်ခံ
    scale: 2 
  }).then(canvas => {
    // ဒေါင်းလုဒ်ဆွဲမယ်
    const link = document.createElement('a');
    link.download = `Tarot-Reading-${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
    
    btn.innerText = originalText;
  }).catch(err => {
    console.error("Save error:", err);
    alert("သိမ်းဆည်း၍ မရပါ။");
    btn.innerText = originalText;
  });
}

// 7. App ကို Share လုပ်ခြင်း
function shareApp() {
  const appUrl = "https://t.me/tryitmm_bot/app"; // သင့် Bot Link ကို ထည့်ပါ
  const text = "🔮 ငါ့အတွက် Tarot ကဒ်ဖတ်ကြည့်လိုက်တာ။ မင်းလည်း လုပ်ကြည့်ပါဦး!";
  
  if (window.Telegram && window.Telegram.WebApp) {
    window.Telegram.WebApp.openTelegramLink(
      `https://t.me/share/url?url=${encodeURIComponent(appUrl)}&text=${encodeURIComponent(text)}`
    );
  } else {
    alert("Share link: " + appUrl);
  }
}

// 8. ဇာတ်ညွှန်း ဆက်လုပ်ခြင်း (Next နှိပ်ရင်)
function showOutro() {
  showScreen('screen-outro');
  setTimeout(() => {
    showScreen('screen-info');
  }, 4000); // စကားပြောပြီး ၄ စက္ကန့်နေမယ်
}

// 9. အိမ်ပြန်သွားခြင်း
function leaveApp() {
  window.location.href = 'index.html';
}

// 10. ပြန်စခြင်း
function restartApp() {
  showScreen('screen-loading');
  setTimeout(() => {
    showScreen('screen-intro');
  }, 2000); // Loading ပြန် ၂ စက္ကန့်ပြမယ်
}
