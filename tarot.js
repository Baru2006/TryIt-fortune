// Global State
let appState = {
    tickets: 1, 
    lastLoginDate: "",
    adCount: 0,
    shareCount: 0,
    currentMode: "",
    currentCategory: "",
    selectedCards: [],
    savedResults: [],
    activeCardIndex: 0,
    ticketHistory: [], 
    user: null
};

// Audio
const bgMusic = document.getElementById('bgMusic');
const sfxClick = document.getElementById('sfxClick');
const sfxShuffle = document.getElementById('sfxShuffle');
const sfxReveal = document.getElementById('sfxReveal');
let isSoundOn = true;

// Adsgram
const ADSGRAM_BLOCK_ID = "55409"; 
let AdController = null;

// Session
let currentResultData = null;
let typeInterval = null;
let shuffleInterval = null;
let pickedCardObj = null;
let selectedPickId = null;
let onPickComplete = null;

// Long Press / Context Menu ကို ပိတ်မယ်
document.addEventListener('contextmenu', event => event.preventDefault());

// ==========================================
// AUDIO LOGIC
// ==========================================
function playSFX(audio) {
    if (isSoundOn && audio) {
        audio.currentTime = 0;
        audio.play().catch(e => console.log(e));
    }
}
function toggleSound() {
    const cb = document.getElementById('setting-sound');
    isSoundOn = cb.checked;
    if (isSoundOn) { bgMusic.volume = 0.3; bgMusic.play().catch(e => console.log(e)); }
    else { bgMusic.pause(); }
}

// ==========================================
// TELEGRAM AUTO LOGIN
// ==========================================
function initTelegramLogin() {
    if (window.Telegram && window.Telegram.WebApp && window.Telegram.WebApp.initDataUnsafe) {
        const tgUser = window.Telegram.WebApp.initDataUnsafe.user;
        if (tgUser) {
            appState.user = {
                id: tgUser.id,
                name: tgUser.first_name + (tgUser.last_name ? ' ' + tgUser.last_name : ''),
                photo: tgUser.photo_url || 'assets/char/girl.webp'
            };
            // Update UI
            document.getElementById('user-profile-img').src = appState.user.photo;
            document.getElementById('user-display-name').innerText = appState.user.name;
            document.getElementById('user-display-id').innerText = 'ID: ' + appState.user.id;
            
            document.getElementById('user-page-img').src = appState.user.photo;
            document.getElementById('user-page-name').innerText = appState.user.name;
            document.getElementById('user-page-id').innerText = 'Telegram ID: ' + appState.user.id;
        }
    } else {
        // Fallback for testing in browser
        appState.user = { id: 123456789, name: "Test User", photo: "assets/char/girl.webp" };
        document.getElementById('user-page-name').innerText = appState.user.name;
        document.getElementById('user-page-id').innerText = 'Telegram ID: ' + appState.user.id;
    }
}

// ==========================================
// DISCLAIMER LOGIC
// ==========================================
function toggleAgreeButton() {
    const cb = document.getElementById('disclaimer-checkbox');
    const btn = document.getElementById('btn-disclaimer-agree');
    if (cb.checked) {
        btn.classList.remove('opacity-50', 'cursor-not-allowed');
        btn.classList.add('opacity-100', 'cursor-pointer', 'hover:scale-105');
    } else {
        btn.classList.add('opacity-50', 'cursor-not-allowed');
        btn.classList.remove('opacity-100', 'cursor-pointer', 'hover:scale-105');
    }
}

function agreeDisclaimer() {
    const cb = document.getElementById('disclaimer-checkbox');
    if (!cb.checked) { alert("ကျေးဇူးပြု၍ သတိပေးချက်ကို အရင်ဆုံး သဘောတူညီပေးပါ။"); return; }
    localStorage.setItem('tarot_disclaimer_agreed', 'true');
    bgMusic.volume = 0.3;
    bgMusic.play().catch(e => console.log(e));
    
    document.getElementById('screen-disclaimer').classList.add('hidden');
    document.getElementById('screen-disclaimer').style.display = 'none';
    document.getElementById('screen-main-menu').classList.remove('hidden');
    document.getElementById('screen-main-menu').style.display = 'flex';
}

// ==========================================
// INITIALIZATION
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    if (!navigator.onLine) alert("အသုံးပြုရန်အတွက် အင်တာနက် လိုအပ်ပါသည်။");
    
    initTelegramLogin();
    loadState();
    updateTicketUI();
    checkDailyResets();
    setSeasonBackground();

    if (window.Adsgram) {
        try { AdController = window.Adsgram.init({ blockId: ADSGRAM_BLOCK_ID }); } catch (e) { console.log(e); }
    }
    if (window.Telegram && window.Telegram.WebApp) { window.Telegram.WebApp.ready(); window.Telegram.WebApp.expand(); }

    if (localStorage.getItem('tarot_disclaimer_agreed') === 'true') {
        switchScreen('screen-main-menu');
    } else {
        switchScreen('screen-disclaimer');
    }
});

function setSeasonBackground() {
    const month = new Date().getMonth();
    const months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
    const bgEl = document.getElementById('season-bg');
    if (bgEl) bgEl.style.backgroundImage = `url('assets/bg/${months[month]}.webp')`;
}

function loadState() {
    const saved = localStorage.getItem('tarot_app_state');
    if (saved) { try { appState = { ...appState, ...JSON.parse(saved) }; } catch(e) {} }
}
function saveState() { localStorage.setItem('tarot_app_state', JSON.stringify(appState)); }

function checkDailyResets() {
    const today = new Date().toDateString();
    if (localStorage.getItem('tarot_last_date') !== today) {
        appState.adCount = 0;
        appState.shareCount = 0;
        appState.lastLoginDate = "";
        localStorage.setItem('tarot_last_date', today);
        saveState();
    }
}

function switchScreen(screenId) {
    playSFX(sfxClick);
    document.querySelectorAll('.screen').forEach(el => { el.classList.add('hidden'); el.style.display = 'none'; });
    const target = document.getElementById(screenId);
    if (target) { target.classList.remove('hidden'); target.style.display = 'flex'; }
    updateTicketUI();
    if (screenId === 'screen-user') renderTicketHistory();
}

function updateTicketUI() {
    document.getElementById('ticket-count').innerText = appState.tickets;
    document.getElementById('ticket-screen-count').innerText = appState.tickets;
    document.getElementById('user-page-tickets').innerText = appState.tickets;

    const adEl = document.getElementById('ad-status-text');
    if(adEl) adEl.innerText = `ကျန်ရှိမှု - ${7 - appState.adCount}/7 ကြိမ် (+1 Ticket)`;
    const shareEl = document.getElementById('share-status-text');
    if(shareEl) shareEl.innerText = `ကျန်ရှိမှု - ${3 - appState.shareCount}/3 ကြိမ် (+1 Ticket)`;

    const loginBtn = document.getElementById('btn-task-login');
    if (appState.lastLoginDate === new Date().toDateString() && loginBtn) {
        loginBtn.disabled = true; loginBtn.innerText = "ရယူပြီး"; loginBtn.classList.add('opacity-50');
    }
}

function renderTicketHistory() {
    const container = document.getElementById('ticket-history-list');
    container.innerHTML = '';
    if (!appState.ticketHistory || appState.ticketHistory.length === 0) {
        container.innerHTML = "<p class='text-xs text-gray-500 text-center'>မှတ်တမ်း မရှိသေးပါ။</p>";
        return;
    }
    appState.ticketHistory.slice().reverse().slice(0, 10).forEach(log => {
        const div = document.createElement('div');
        div.className = "flex justify-between items-center text-xs border-b border-white/5 pb-1";
        div.innerHTML = `<span class="text-gray-400">${log.date}</span> <span class="${log.amount > 0 ? 'text-green-400' : 'text-red-400'} font-bold">${log.amount > 0 ? '+' : ''}${log.amount} (${log.reason})</span>`;
        container.appendChild(div);
    });
}

function logTicketChange(amount, reason) {
    const now = new Date();
    const dateStr = `${now.getDate()}/${now.getMonth()+1} ${now.getHours()}:${now.getMinutes().toString().padStart(2,'0')}`;
    appState.ticketHistory.push({ amount, reason, date: dateStr });
    if(appState.ticketHistory.length > 50) appState.ticketHistory.shift();
}

function showMsg(title, text) {
    document.getElementById('msg-title').innerText = title;
    document.getElementById('msg-text').innerText = text;
    document.getElementById('modal-msg').classList.remove('hidden');
}
function closeModal(id) { document.getElementById(id).classList.add('hidden'); }

// ==========================================
// READING FLOW
// ==========================================
function getFormattedDate(mode) {
    const today = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    if (mode === 'daily') {
        return today.toLocaleDateString('my-MM', options) + " အတွက်";
    } else if (mode === 'weekly') {
        let curr = new Date();
        let first = curr.getDate() - curr.getDay() + 1; 
        let last = first + 6; 
        let firstday = new Date(curr.setDate(first));
        let lastday = new Date(curr.setDate(last));
        return firstday.toLocaleDateString('my-MM', {day: 'numeric', month: 'short'}) + " မှ " + lastday.toLocaleDateString('my-MM', {day: 'numeric', month: 'short', year: 'numeric'}) + " အတွက်";
    } else if (mode === 'monthly') {
        return today.toLocaleDateString('my-MM', {month: 'long', year: 'numeric'}) + " အတွက်";
    } else if (mode === 'yearly') {
        return today.getFullYear() + " ခုနှစ်အတွက်";
    }
    return "";
}

function checkAndStart(mode) {
    appState.currentMode = mode;
    appState.selectedCards = [];
    const todayStr = new Date().toDateString();
    const existingRes = localStorage.getItem(`tarot_res_${mode}_${todayStr}`);

    if (existingRes) {
        currentResultData = JSON.parse(existingRes);
        displayResult(currentResultData);
        return;
    }
    startShuffle(() => startPickProcess());
}

function openDialogue(mode) {
    if (appState.tickets < 1) { showMsg("Ticket မလုံလောက်ပါ", "ကြော်ငြာကြည့်ပြီး Ticket ယူပါ။"); return; }
    
    appState.currentMode = mode;
    switchScreen('screen-dialogue');
    const optionsContainer = document.getElementById('dialogue-options');
    optionsContainer.innerHTML = '';

    if (mode === 'category') {
        document.getElementById('dialogue-text').innerText = "ချစ်ခင်ရတဲ့ မိတ်ဆွေ... ဘယ်နယ်ပယ်အတွက် တာရော့ကြည့်ချင်ပါသလဲရှင့်?";
        const cats = [
            { key: 'love', name: 'အချစ်ရေး', icon: 'fa-heart' },
            { key: 'education', name: 'ပညာရေး', icon: 'fa-graduation-cap' },
            { key: 'business', name: 'စီးပွားရေး', icon: 'fa-briefcase' },
            { key: 'health', name: 'ကျန်းမာရေး', icon: 'fa-heart-pulse' }
        ];
        cats.forEach(c => {
            const btn = document.createElement('button');
            btn.className = "w-full py-3 px-4 rounded-xl text-xs font-bold text-yellow-100 bg-mystic-800 border border-yellow-500/40 hover:bg-mystic-700 transition-all flex items-center justify-center space-x-2";
            btn.innerHTML = `<i class="fa-solid ${c.icon} text-yellow-400"></i><span>${c.name}</span>`;
            btn.onclick = () => startCategory(c.key);
            optionsContainer.appendChild(btn);
        });
    } else if (mode === 'ppf') {
        document.getElementById('dialogue-text').innerText = "အတိတ်၊ ပစ္စုပ္ပန်၊ အနာဂတ် သုံးဘက်မြင် တာရော့ဟောကိန်းအတွက် စတင်ကြပါစို့ရှင်။";
        const btn = document.createElement('button');
        btn.className = "w-full py-3.5 rounded-xl text-xs font-bold text-mystic-900 bg-gradient-to-r from-yellow-600 via-yellow-400 to-yellow-600 shadow-xl flex items-center justify-center space-x-2";
        btn.innerHTML = `<i class="fa-solid fa-play"></i><span>ကဒ်များစတင်ရွေးမည်</span>`;
        btn.onclick = () => {
            appState.tickets -= 1; logTicketChange(-1, 'PPF Reading'); saveState();
            startShuffle(() => startPPFPick());
        };
        optionsContainer.appendChild(btn);
    }
}

function startCategory(catKey) {
    appState.currentCategory = catKey;
    appState.tickets -= 1; logTicketChange(-1, 'Category Reading'); saveState();
    
    startShuffle(() => {
        startPick13(() => {
            appState.selectedCards = [pickedCardObj];
            setTimeout(() => {
                startShuffle(() => {
                    startPick13(() => {
                        appState.selectedCards.push(pickedCardObj);
                        showCategoryResultScreen();
                    }, "ဖြေရှင်းနည်းအတွက် ကဒ်ရွေးပါ");
                });
            }, 500);
        }, "ပြဿနာအတွက် ကဒ်ရွေးပါ");
    });
}

function startPPFPick() {
    appState.selectedCards = [];
    startShuffle(() => {
        startPick13(() => {
            appState.selectedCards.push({ ...pickedCardObj, role: 'အတိတ် (Past)' });
            startShuffle(() => {
                startPick13(() => {
                    appState.selectedCards.push({ ...pickedCardObj, role: 'ပစ္စုပ္ပန် (Present)' });
                    startShuffle(() => {
                        startPick13(() => {
                            appState.selectedCards.push({ ...pickedCardObj, role: 'အနာဂတ် (Future)' });
                            showPPFResultScreen();
                        }, "အနာဂတ်အတွက် ကဒ်ရွေးပါ");
                    });
                }, "ပစ္စုပ္ပန်အတွက် ကဒ်ရွေးပါ");
            });
        }, "အတိတ်အတွက် ကဒ်ရွေးပါ");
    });
}

// ==========================================
// SHUFFLE & PICK
// ==========================================
function startShuffle(callback) {
    playSFX(sfxShuffle);
    switchScreen('screen-shuffle');
    let imgEl = document.getElementById('shuffle-img');
    let frame = 1;
    let totalCycles = 0;
    
    clearInterval(shuffleInterval);
    shuffleInterval = setInterval(() => {
        frame = (frame % 9) + 1;
        imgEl.src = `assets/ui/shuffle-${frame}.png`;
        totalCycles++;
        if (totalCycles >= 45) { clearInterval(shuffleInterval); if (callback) callback(); }
    }, 110);
}

function startPickProcess() {
    switchScreen('screen-pick');
    document.getElementById('pick-title').innerText = "ဤကဒ် ခြောက်ပုံ ထဲက တစ်ပုံကို ရွေးပေးပါရှင်";
    document.getElementById('pick-action-container').classList.add('hidden');
    
    const container = document.getElementById('pick-grid-container');
    container.innerHTML = `
        <div class="grid grid-cols-3 gap-4 w-full max-w-xs my-auto">
            ${[1,2,3,4,5,6].map(i => `
                <div onclick="proceedToPick13()" class="aspect-[2/3] rounded-xl border-2 border-yellow-500/50 shadow-[0_0_15px_rgba(212,175,55,0.3)] cursor-pointer hover:scale-105 transition-all flex items-center justify-center bg-mystic-800 overflow-hidden">
                    <img src="assets/cards/back.png" alt="Card" class="w-full h-full object-cover">
                </div>
            `).join('')}
        </div>
    `;
}

function proceedToPick13() {
    playSFX(sfxClick);
    startPick13(() => showBeforeResultScreen(), "ဤ၁၃ပုံ ထဲက တစ်ပုံကို ရွေးပေးပါရှင်");
}

function startPick13(callback, titleText) {
    switchScreen('screen-pick');
    document.getElementById('pick-title').innerText = titleText || "ကဒ်ရွေးပါ";
    document.getElementById('pick-action-container').classList.remove('hidden');
    onPickComplete = callback;
    selectedPickId = null;
    
    const container = document.getElementById('pick-grid-container');
    const rows = [3, 2, 3, 2, 3];
    let html = '<div class="flex flex-col space-y-3 w-full max-w-xs my-auto items-center">';
    let cardIdCounter = 1;
    
    rows.forEach(count => {
        html += `<div class="flex justify-center space-x-3 w-full">`;
        for(let i=0; i<count; i++) {
            const id = cardIdCounter++;
            html += `
                <div id="pick-card-${id}" onclick="selectCard(${id})" class="w-14 aspect-[2/3] rounded-lg border border-yellow-500/50 shadow-md cursor-pointer transition-all flex items-center justify-center bg-mystic-800 overflow-hidden">
                    <img src="assets/cards/back.png" alt="Back" class="w-full h-full object-cover opacity-80">
                </div>
            `;
        }
        html += `</div>`;
    });
    html += '</div>';
    container.innerHTML = html;
}

function selectCard(id) {
    playSFX(sfxClick);
    document.querySelectorAll('[id^="pick-card-"]').forEach(el => {
        el.classList.remove('ring-2', 'ring-yellow-400', 'scale-110', 'opacity-100');
        el.classList.add('opacity-60');
    });
    const target = document.getElementById(`pick-card-${id}`);
    if (target) { target.classList.remove('opacity-60'); target.classList.add('ring-2', 'ring-yellow-400', 'scale-110'); selectedPickId = id; }
}

function confirmPick13() {
    if (!selectedPickId) { showMsg("ရွေးချယ်ပါ", "ကဒ်တစ်ပုံကို ဦးစွာ ရွေးချယ်ပါ။"); return; }
    const randomCard = TAROT_DECK[Math.floor(Math.random() * TAROT_DECK.length)];
    const isReversed = Math.random() > 0.7;
    pickedCardObj = { ...randomCard, isReversed };
    playSFX(sfxReveal);
    if (onPickComplete) onPickComplete();
}

// ==========================================
// RESULTS
// ==========================================
function showBeforeResultScreen() {
    switchScreen('screen-before-result');
    document.getElementById('before-card-img').src = `assets/cards/${pickedCardObj.img}`;
    document.getElementById('before-card-img').style.transform = pickedCardObj.isReversed ? 'rotate(180deg)' : 'none';
    document.getElementById('before-card-name').innerText = pickedCardObj.name;
    
    const badge = document.getElementById('before-card-badge');
    if (pickedCardObj.isReversed) {
        badge.innerText = "Reversed"; badge.className = "px-3 py-1 rounded-full text-xs font-bold bg-red-500/20 text-red-300 border border-red-500/30";
    } else {
        badge.innerText = "Upright"; badge.className = "px-3 py-1 rounded-full text-xs font-bold bg-green-500/20 text-green-300 border border-green-500/30";
    }
}

function showFinalResult() {
    appState.selectedCards = [pickedCardObj];
    const todayStr = new Date().toDateString();
    const resObj = { mode: appState.currentMode, category: appState.currentCategory, date: new Date().toLocaleDateString('my-MM'), cards: appState.selectedCards };
    if (['daily', 'weekly', 'monthly', 'yearly'].includes(appState.currentMode)) {
        localStorage.setItem(`tarot_res_${appState.currentMode}_${todayStr}`, JSON.stringify(resObj));
    }
    displayResult(resObj);
}

function showCategoryResultScreen() {
    displayResult({ mode: 'category', category: appState.currentCategory, date: new Date().toLocaleDateString('my-MM'), cards: appState.selectedCards });
}
function showPPFResultScreen() {
    displayResult({ mode: 'ppf', date: new Date().toLocaleDateString('my-MM'), cards: appState.selectedCards });
}

function displayResult(resData) {
    currentResultData = resData;
    appState.activeCardIndex = 0;
    switchScreen('screen-result');
    
    document.getElementById('result-header-title').innerText = resData.mode === 'category' ? 'နယ်ပယ်အလိုက်' : (resData.mode === 'ppf' ? 'PPF ဟောကိန်း' : 'တာရော့ဟောစာတမ်း');
    
    // Date နဲ့ Badge ကို ပြမယ်
    if (resData.mode !== 'category' && resData.mode !== 'ppf') {
        document.getElementById('result-date-text').innerText = getFormattedDate(resData.mode);
    } else {
        document.getElementById('result-date-text').innerText = resData.date; // Category/PPF အတွက် ရိုးရိုးရက်စွဲ
    }
    
    renderResultView();
    setupSwipeGesture();
}

function renderResultView() {
    const wrapper = document.getElementById('result-cards-wrapper');
    const swipeInd = document.getElementById('swipe-indicator');
    const statusBadge = document.getElementById('result-status-badge');
    const cards = currentResultData.cards;
    
    if (cards.length > 1) swipeInd.classList.remove('hidden'); else swipeInd.classList.add('hidden');

    wrapper.innerHTML = cards.map((c, idx) => {
        const isActive = idx === appState.activeCardIndex;
        const activeClass = isActive ? 'border-yellow-400 shadow-[0_0_20px_rgba(212,175,55,0.8)] scale-105 z-10' : 'border-gray-600 opacity-50 scale-90';
        return `
            <div class="result-card-item relative w-24 h-36 shrink-0 rounded-xl overflow-hidden border-2 ${activeClass} transition-all duration-300" onclick="setActiveCard(${idx})">
                <img src="assets/cards/${c.img}" class="w-full h-full object-cover" style="transform: ${c.isReversed ? 'rotate(180deg)' : 'none'}">
            </div>
        `;
    }).join('');

    // Active Card ရဲ့ Upright/Reversed Badge ကို ပြမယ်
    const activeCard = cards[appState.activeCardIndex];
    if (activeCard.isReversed) {
        statusBadge.innerText = "Reversed (ပြောင်းပြန်)";
        statusBadge.className = "px-3 py-1 rounded-full text-xs font-bold bg-red-500/20 text-red-300 border border-red-500/30 mb-2";
    } else {
        statusBadge.innerText = "Upright (အတည့်)";
        statusBadge.className = "px-3 py-1 rounded-full text-xs font-bold bg-green-500/20 text-green-300 border border-green-500/30 mb-2";
    }

    updateResultText();
}

function setActiveCard(index) {
    playSFX(sfxClick);
    appState.activeCardIndex = index;
    renderResultView();
}

function updateResultText() {
    const titleEl = document.getElementById('answer-section-title');
    const textEl = document.getElementById('result-text');
    
    const card = currentResultData.cards[appState.activeCardIndex];
    const stateKey = card.isReversed ? 'reversed' : 'upright';
    let displayText = "", title = "";

    if (currentResultData.mode === 'category') {
        if (appState.activeCardIndex === 0) {
            title = `ပြဿနာ - ${card.name}`;
            displayText = card[stateKey][currentResultData.category]; 
        } else {
            title = `ဖြေရှင်းနည်း - ${card.name}`;
            displayText = card[stateKey].advice; 
        }
    } else if (currentResultData.mode === 'ppf') {
        title = `${card.role} - ${card.name}`;
        const pKey = appState.activeCardIndex === 0 ? 'past' : (appState.activeCardIndex === 1 ? 'present' : 'future');
        displayText = card[stateKey][pKey];
    } else {
        title = `ကဒ်အမည် - ${card.name}`;
        displayText = `<p>${card[stateKey].general}</p><br><p style="color:#fbbf24; font-weight:bold;">အကြံပြုချက် - </p><p>${card[stateKey].advice}</p>`;
    }

    titleEl.innerText = title;
    typeWriterEffect(displayText, textEl);
}

function typeWriterEffect(text, element) {
    if (typeInterval) clearInterval(typeInterval);
    element.innerHTML = "";
    let plainText = text.replace(/<[^>]+>/g, '\n').trim(); 
    typeInterval = setInterval(() => {
        if (i < plainText.length) { 
            element.innerHTML += plainText.charAt(i) === '\n' ? '<br>' : plainText.charAt(i);
            i++; 
        } else { clearInterval(typeInterval); }
    }, 20);
}

function setupSwipeGesture() {
    let touchStartX = 0, touchEndX = 0;
    const rs = document.getElementById('screen-result');
    rs.ontouchstart = (e) => { touchStartX = e.changedTouches[0].screenX; };
    rs.ontouchend = (e) => {
        touchEndX = e.changedTouches[0].screenX;
        if (!currentResultData || currentResultData.cards.length <= 1) return;
        if (touchEndX < touchStartX - 50 && appState.activeCardIndex < currentResultData.cards.length - 1) { appState.activeCardIndex++; renderResultView(); }
        if (touchEndX > touchStartX + 50 && appState.activeCardIndex > 0) { appState.activeCardIndex--; renderResultView(); }
    };
}

// ==========================================
// SAVE, AGAIN, TICKET
// ==========================================
function saveCurrentResult() {
    playSFX(sfxClick);
    if (!currentResultData) return;
    let saves = appState.savedResults;
    if (saves.length >= 5) saves.pop();
    saves.unshift({ ...currentResultData, id: Date.now() });
    appState.savedResults = saves;
    saveState();
    showMsg("အောင်မြင်သည်", "သိမ်းဆည်းပြီးပါပြီ။");
}

function openSaveModal() {
    playSFX(sfxClick);
    const container = document.getElementById('save-list-container');
    container.innerHTML = '';
    if (appState.savedResults.length === 0) {
        container.innerHTML = `<p class="text-xs text-gray-400 text-center py-6">မှတ်တမ်း မရှိပါ။</p>`;
    } else {
        appState.savedResults.forEach(s => {
            const item = document.createElement('div');
            item.className = "flex items-center justify-between p-3 rounded-2xl glass-panel border border-yellow-500/30 cursor-pointer";
            item.innerHTML = `
                <div class="flex items-center space-x-3">
                    <img src="assets/cards/${s.cards[0].img}" class="w-10 h-14 object-cover rounded border border-yellow-500/40">
                    <div><h4 class="font-bold text-xs text-yellow-300">${s.mode}</h4><p class="text-[10px] text-gray-400">${s.date}</p></div>
                </div><i class="fa-solid fa-chevron-right text-yellow-400"></i>`;
            item.onclick = () => { closeModal('modal-save'); displayResult(s); };
            container.appendChild(item);
        });
    }
    document.getElementById('modal-save').classList.remove('hidden');
}

function openAgainModal() {
    playSFX(sfxClick);
    const container = document.getElementById('again-options-container');
    container.innerHTML = '';
    ['daily', 'category', 'ppf'].forEach(m => {
        const btn = document.createElement('button');
        btn.className = "w-full py-2.5 rounded-xl text-xs font-bold text-yellow-200 glass-panel border border-yellow-500/30";
        btn.innerText = m === 'daily' ? 'ဒီနေ့အတွက်' : (m === 'category' ? 'နယ်ပယ်အလိုက် (1 Ticket)' : 'PPF (1 Ticket)');
        btn.onclick = () => { closeModal('modal-again'); checkAndStart(m); };
        container.appendChild(btn);
    });
    document.getElementById('modal-again').classList.remove('hidden');
}

function claimLoginTicket() {
    if (appState.lastLoginDate === new Date().toDateString()) return;
    appState.lastLoginDate = new Date().toDateString();
    appState.tickets += 1; logTicketChange(1, 'Daily Login'); 
    saveState(); updateTicketUI();
    showMsg("အောင်မြင်သည်", "+1 Ticket ရပါပြီ။");
}

function watchAd() {
    if (!navigator.onLine) { showMsg("အင်တာနက် မကောင်းပါ", "ချိတ်ဆက်မှု မကောင်းပါ။"); return; }
    if (appState.adCount >= 7) { showMsg("ပြည့်သွားပါပြီ", "ကြော်ငြာကြည့်ခွင့် ကုန်ပါပြီ။"); return; }
    if (!AdController) { showMsg("စနစ် အသင့်မဖြစ်ပါ", "ခဏနေမှ ပြန်စမ်းပါ။"); return; }

    AdController.show().then(() => {
        appState.adCount += 1; appState.tickets += 1; logTicketChange(1, 'Watch Ad');
        saveState(); updateTicketUI();
        showMsg("အောင်မြင်သည်", "+1 Ticket ရပါပြီ။");
    }).catch(() => {
        showMsg("မအောင်မြင်ပါ", "အင်တာနက် မကောင်းပါ။ ခဏနေမှ ပြန်စမ်းပါ။");
    });
}

function shareApp() {
    if (appState.shareCount >= 3) { showMsg("ပြည့်သွားပါပြီ", "ရှယ်ခွင့် ကုန်ပါပြီ။"); return; }
    appState.shareCount += 1; appState.tickets += 1; logTicketChange(1, 'Share App');
    saveState(); updateTicketUI();
    
    if (window.Telegram && window.Telegram.WebApp) {
        window.Telegram.WebApp.openTelegramLink("https://t.me/share/url?url=https://t.me/YourBot&text=Tarot");
    }
    showMsg("အောင်မြင်သည်", "+1 Ticket ရပါပြီ။");
}

function exitApp() {
    if (window.Telegram && window.Telegram.WebApp) window.Telegram.WebApp.close();
    else window.location.href = 'index.html';
}
