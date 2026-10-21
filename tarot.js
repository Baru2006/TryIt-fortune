// ==========================================
// GLOBAL STATE & VARIABLES
// ==========================================
let currentMode = ''; 
let readingPhase = ''; 
let requiredPicks = 1;
let currentPicks = 0;
let pickedCards = [];
let shuffledDeck = [];
let isPicking = false;
let currentResultData = { mode: '', date: '', cards: [], textHTML: '' };
let previousScreen = 'screen-start'; // Back အတွက် သိမ်းထားမယ်

const SEASON_BACKGROUNDS = {
  0: 'assets/bg/jan.webp', 1: 'assets/bg/feb.webp', 2: 'assets/bg/mar.webp',
  3: 'assets/bg/apr.webp', 4: 'assets/bg/may.webp', 5: 'assets/bg/jun.webp',
  6: 'assets/bg/jul.webp', 7: 'assets/bg/aug.webp', 8: 'assets/bg/sep.webp',
  9: 'assets/bg/oct.webp', 10: 'assets/bg/nov.webp', 11: 'assets/bg/dec.webp'
};

const LONG_DIALOGUE = "မင်္ဂလာပါ။ ကျွန်မက ဒီနေ့အတွက် သင့်ကို ဟောစာတမ်း ဖတ်ပေးမယ့် နက္ခတ်ဆရာမလေးပါ။ ကဒ်တွေက သင့်အတွက် အရေးကြီးတဲ့ အချက်အလက်တွေကို ဖော်ပြပေးပါလိမ့်မယ်။ စိတ်ကို အေးအေးထားပြီး သင့်မေးခွန်းကို အာရုံပြုလိုက်ပါ။ ဘယ်အကြောင်းအရာကို ဟောကြည့်ချင်ပါသလဲ?";

const bgMusic = document.getElementById('bgMusic');
const sfxClick = document.getElementById('sfxClick');
const sfxShuffle = document.getElementById('sfxShuffle');
const sfxReveal = document.getElementById('sfxReveal');

// ==========================================
// INIT & UTILS
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    const month = new Date().getMonth();
    document.getElementById('seasonBg').style.backgroundImage = `url('${SEASON_BACKGROUNDS[month]}')`;
    
    updateTicketUI();
    checkDailyResets();
    
    if (window.Telegram && window.Telegram.WebApp) {
        window.Telegram.WebApp.ready();
        window.Telegram.WebApp.expand();
    }
});

function getTodayStr() { return new Date().toDateString(); }
function playSound(sfx) { if (sfx) { sfx.currentTime = 0; sfx.play().catch(e => console.log(e)); } }
function showScreen(screenId) {
    document.querySelectorAll('.tarot-screen').forEach(s => s.classList.remove('active'));
    document.getElementById(screenId).classList.add('active');
}

function goBack(screenId) {
    playSound(sfxClick);
    // Animation တွေ ရပ်မယ်
    if(window.shuffleInterval) clearInterval(window.shuffleInterval);
    showScreen(screenId);
}

// ==========================================
// TICKET & PERSISTENCE LOGIC
// ==========================================
function getTickets() { return parseInt(localStorage.getItem('tarot_tickets') || '3'); }
function setTickets(amount) { localStorage.setItem('tarot_tickets', amount); updateTicketUI(); }
function updateTicketUI() { 
    document.getElementById('ticketCount').innerText = getTickets(); 
    document.getElementById('adLimit').innerText = `${localStorage.getItem('ad_count') || 0}/5`;
    document.getElementById('shareLimit').innerText = `${localStorage.getItem('share_count') || 0}/2`;
}

function checkDailyResets() {
    const today = getTodayStr();
    if(localStorage.getItem('last_ad_date') !== today) {
        localStorage.setItem('ad_count', '0');
        localStorage.setItem('share_count', '0');
        localStorage.setItem('last_login_date', '');
        localStorage.setItem('last_ad_date', today);
        // နေ့စဉ် ဟောထားတာတွေ ပြန်ရှင်းမယ် (Optional - မင်းအဆင်ပြေသလို ထားလို့ရတယ်)
        // localStorage.removeItem('read_daily'); 
    }
}

function getReadData(mode) {
    const data = localStorage.getItem(`read_${mode}`);
    if (!data) return null;
    const parsed = JSON.parse(data);
    const today = new Date();
    
    if (mode === 'daily') return parsed.date === today.toDateString() ? parsed : null;
    if (mode === 'weekly') {
        const diffDays = Math.ceil(Math.abs(today - new Date(parsed.date)) / (1000 * 60 * 60 * 24)); 
        return diffDays <= 7 ? parsed : null;
    }
    if (mode === 'monthly') return (new Date(parsed.date).getMonth() === today.getMonth()) ? parsed : null;
    if (mode === 'yearly') return (new Date(parsed.date).getFullYear() === today.getFullYear()) ? parsed : null;
    return null;
}
function saveReadData(mode, data) { localStorage.setItem(`read_${mode}`, JSON.stringify(data)); }

// ==========================================
// FLOW CONTROL
// ==========================================
function agreeDisclaimer() {
    playSound(sfxClick);
    document.getElementById('disclaimerModal').style.display = 'none';
    bgMusic.volume = 0.3;
    bgMusic.play().catch(e => console.log(e));
    
    let progress = 0;
    const bar = document.getElementById('progressBar');
    const interval = setInterval(() => {
        progress += Math.random() * 20;
        if(progress > 100) progress = 100;
        bar.style.width = progress + '%';
        if(progress === 100) {
            clearInterval(interval);
            setTimeout(() => showScreen('screen-start'), 300);
        }
    }, 100);
}

function checkAndStart(mode) {
    playSound(sfxClick);
    const savedData = getReadData(mode);
    
    if (savedData) {
        reconstructResultFromSave(savedData);
    } else {
        currentMode = mode;
        readingPhase = 'time';
        pickedCards = [];
        startShuffle();
    }
}

function openCategoryDialogue() {
    playSound(sfxClick);
    showScreen('screen-category');
    document.getElementById('categoryOptions').style.display = 'none';
    document.getElementById('dialogueNextBtn').style.display = 'block';
    
    const textBox = document.getElementById('dialogueText');
    textBox.innerHTML = '';
    let i = 0;
    const interval = setInterval(() => {
        textBox.innerHTML += LONG_DIALOGUE.charAt(i);
        i++;
        if (i >= LONG_DIALOGUE.length) clearInterval(interval);
    }, 30);
}

function showCategoryOptions() {
    playSound(sfxClick);
    document.getElementById('dialogueText').innerHTML = "<p style='color:#fbbf24; font-weight:bold; font-size:18px;'>ဘယ်အကြောင်းအရာကို ရွေးမလဲ?</p>";
    document.getElementById('categoryOptions').style.display = 'grid';
    document.getElementById('dialogueNextBtn').style.display = 'none';
}

function startCategory(category) {
    playSound(sfxClick);
    if (getTickets() < 1) { 
        alert("Ticket မလုံလောက်ပါ။ ကြော်ငြာကြည့်ပြီး ယူပါ။"); 
        openTicketMenu(); 
        return; 
    }
    
    const savedData = getReadData(category);
    if (savedData) { reconstructResultFromSave(savedData); return; }

    setTickets(getTickets() - 1);
    currentMode = category;
    pickedCards = [];
    
    if (category === 'ppf') { requiredPicks = 3; readingPhase = 'ppf'; } 
    else { requiredPicks = 1; readingPhase = 'problem'; }
    
    startShuffle();
}

// ==========================================
// SHUFFLE & PICK LOGIC (ပုံ ၉ ပုံ သုံးထားတယ်)
// ==========================================
function startShuffle() {
    playSound(sfxShuffle);
    showScreen('screen-shuffle');
    
    let currentFrame = 1;
    const shuffleImg = document.getElementById('shuffleAnim');
    
    // 1 second = 9 frames (111ms/frame)
    window.shuffleInterval = setInterval(() => {
        currentFrame++;
        if (currentFrame > 9) currentFrame = 1;
        shuffleImg.src = `assets/ui/shuffle-${currentFrame}.png`;
    }, 111); 

    setTimeout(() => {
        clearInterval(window.shuffleInterval);
        if (currentMode === 'daily' || currentMode === 'weekly' || currentMode === 'monthly' || currentMode === 'yearly') {
            if (pickedCards.length === 0 && readingPhase === 'time') buildPick6();
            else buildPick13();
        } else {
            buildPick13();
        }
    }, 5000); 
}

function buildPick6() {
    showScreen('screen-pick6');
    const grid = document.getElementById('pickGrid6');
    grid.innerHTML = '';
    for (let i = 0; i < 6; i++) {
        const card = document.createElement('div');
        card.className = 'tarot-card';
        card.onclick = () => {
            playSound(sfxClick);
            card.classList.add('selected');
            setTimeout(() => buildPick13(), 500);
        };
        grid.appendChild(card);
    }
}

function buildPick13() {
    showScreen('screen-pick13');
    currentPicks = 0;
    isPicking = false;
    if(pickedCards.length === 0) shuffledDeck = [...TAROT_DECK].sort(() => Math.random() - 0.5);

    if (readingPhase === 'problem') document.getElementById('pick13Title').innerText = "ပြဿနာ (၁) ကဒ် ရွေးပါ";
    else if (readingPhase === 'solution') document.getElementById('pick13Title').innerText = "ဖြေရှင်းနည်း (၁) ကဒ် ရွေးပါ";
    else if (readingPhase === 'ppf') document.getElementById('pick13Title').innerText = "အတိတ်၊ ပစ္စုပ္ပန်၊ အနာဂတ် (၃ ကဒ်)";
    else document.getElementById('pick13Title').innerText = "ကဒ်တစ်ကဒ် ရွေးပါ";

    document.querySelectorAll('.pick-row').forEach(row => row.innerHTML = '');
    const rowIds = ['row-1', 'row-2', 'row-3', 'row-4', 'row-5'];
    const rowCounts = [3, 2, 3, 2, 3];
    let deckIndex = 0;

    rowIds.forEach((id, index) => {
        const rowEl = document.getElementById(id);
        for (let i = 0; i < rowCounts[index]; i++) {
            const cardData = shuffledDeck[deckIndex++];
            const card = document.createElement('div');
            card.className = 'tarot-card';
            card.onclick = () => pickCard13(card, cardData);
            rowEl.appendChild(card);
        }
    });
}

function pickCard13(cardElement, cardData) {
    if (isPicking) return;
    isPicking = true;
    playSound(sfxClick);
    
    cardElement.classList.add('selected');
    const newCard = JSON.parse(JSON.stringify(cardData));
    newCard.isReversed = Math.random() < 0.5;
    pickedCards.push(newCard);
    currentPicks++;

    if (currentPicks === requiredPicks) {
        setTimeout(() => { playSound(sfxReveal); routeToResult(); isPicking = false; }, 600);
    } else {
        document.querySelectorAll('.tarot-card:not(.selected)').forEach(c => c.classList.add('dimmed'));
        setTimeout(() => { document.querySelectorAll('.tarot-card').forEach(c => c.classList.remove('dimmed')); isPicking = false; }, 1000);
    }
}

// ==========================================
// RESULT RENDERING (စာသားများ ပြန်ပြင်ထားသည်)
// ==========================================
function routeToResult() {
    showScreen('screen-result');
    document.getElementById('resultActionButtons').style.display = 'flex'; // Buttons ပြန်ပြ
    document.querySelectorAll('#screen-result > div > div').forEach(d => { if(d.id.startsWith('layout')) d.style.display = 'none'; }); // Layout အကုန်ဖျောက်

    if (readingPhase === 'time') renderTimeResult();
    else if (readingPhase === 'problem') renderProblemResult();
    else if (readingPhase === 'solution') renderSolutionResult();
    else if (readingPhase === 'ppf') renderPPFResult();
}

function renderTimeResult() {
    document.getElementById('layout-single').style.display = 'flex';
    const card = pickedCards[0]; const state = card.isReversed ? 'reversed' : 'upright';
    
    document.getElementById('resImg1').src = `assets/cards/${card.img}`;
    document.getElementById('resImg1').style.transform = card.isReversed ? 'rotate(180deg)' : 'none';
    document.getElementById('resName1').innerText = card.name;
    
    const badge = document.getElementById('resBadge1');
    badge.innerText = state === 'reversed' ? "Reversed" : "Upright";
    badge.className = `status-badge ${state}`;

    let html = `<h3 style="color:#fbbf24;">ဟောစာတမ်း</h3><p>${card[state].general}</p>`;
    document.getElementById('resultTextArea').innerHTML = html;

    currentResultData = { mode: currentMode, date: getTodayStr(), cards: [card], textHTML: html };
    saveReadData(currentMode, currentResultData);
}

function renderProblemResult() {
    document.getElementById('layout-problem').style.display = 'flex';
    const card = pickedCards[0]; const state = card.isReversed ? 'reversed' : 'upright';
    
    document.getElementById('probImg').src = `assets/cards/${card.img}`;
    document.getElementById('probImg').style.transform = card.isReversed ? 'rotate(180deg)' : 'none';
    document.getElementById('probName').innerText = card.name;
    
    const badge = document.getElementById('probBadge');
    badge.innerText = state === 'reversed' ? "Reversed" : "Upright";
    badge.className = `status-badge ${state}`;

    let html = `<h3 style="color:#ef4444;">ပြဿနာ / လက်ရှိအခြေအနေ</h3><p>${card[state][currentMode]}</p>`;
    document.getElementById('resultTextArea').innerHTML = html;

    // ဒီအဆင့်မှာ ခလုတ်တွေဖျောက်ပြီး ဖြေရှင်းနည်းခလုတ်ပဲပြမယ်
    document.getElementById('resultActionButtons').style.display = 'none';
    document.getElementById('resultTextArea').innerHTML += `
        <button class="btn primary-btn" style="margin-top:20px;" onclick="startSolutionPhase()">ဖြေရှင်းနည်း ကြည့်မယ်</button>
    `;
}

function startSolutionPhase() {
    playSound(sfxClick);
    readingPhase = 'solution';
    requiredPicks = 1;
    document.getElementById('resultActionButtons').style.display = 'flex'; // Buttons ပြန်ပြ
    startShuffle();
}

function renderSolutionResult() {
    document.getElementById('layout-solution').style.display = 'flex';
    const probCard = pickedCards[0]; const solCard = pickedCards[1];
    const pState = probCard.isReversed ? 'reversed' : 'upright'; const sState = solCard.isReversed ? 'reversed' : 'upright';

    document.getElementById('solImg1').src = `assets/cards/${probCard.img}`;
    document.getElementById('solImg1').style.transform = probCard.isReversed ? 'rotate(180deg)' : 'none';
    document.getElementById('solName1').innerText = probCard.name;

    document.getElementById('solImg2').src = `assets/cards/${solCard.img}`;
    document.getElementById('solImg2').style.transform = solCard.isReversed ? 'rotate(180deg)' : 'none';
    document.getElementById('solName2').innerText = solCard.name;

    let html = `
        <h3 style="color:#ef4444;">ပြဿနာ (${probCard.name})</h3><p>${probCard[pState][currentMode]}</p>
        <h3 style="color:#10b981; margin-top:15px;">ဖြေရှင်းနည်း (${solCard.name})</h3><p>${solCard[sState][currentMode]}</p>
    `;
    document.getElementById('resultTextArea').innerHTML = html;
    currentResultData = { mode: currentMode, date: getTodayStr(), cards: [probCard, solCard], textHTML: html };
    saveReadData(currentMode, currentResultData);
}

function renderPPFResult() {
    document.getElementById('layout-ppf').style.display = 'flex';
    const c1 = pickedCards[0]; const s1 = c1.isReversed ? 'reversed' : 'upright';
    const c2 = pickedCards[1]; const s2 = c2.isReversed ? 'reversed' : 'upright';
    const c3 = pickedCards[2]; const s3 = c3.isReversed ? 'reversed' : 'upright';

    document.getElementById('ppfImg1').src = `assets/cards/${c1.img}`;
    document.getElementById('ppfImg1').style.transform = c1.isReversed ? 'rotate(180deg)' : 'none';
    document.getElementById('ppfImg2').src = `assets/cards/${c2.img}`;
    document.getElementById('ppfImg2').style.transform = c2.isReversed ? 'rotate(180deg)' : 'none';
    document.getElementById('ppfImg3').src = `assets/cards/${c3.img}`;
    document.getElementById('ppfImg3').style.transform = c3.isReversed ? 'rotate(180deg)' : 'none';

    let html = `
        <h3 style="color:#fbbf24;">အတိတ် (${c1.name})</h3><p>${c1[s1].past}</p>
        <h3 style="color:#fbbf24; margin-top:15px;">ပစ္စုပ္ပန် (${c2.name})</h3><p>${c2[s2].present}</p>
        <h3 style="color:#fbbf24; margin-top:15px;">အနာဂတ် (${c3.name})</h3><p>${c3[s3].future}</p>
    `;
    document.getElementById('resultTextArea').innerHTML = html;
    currentResultData = { mode: 'ppf', date: getTodayStr(), cards: [c1, c2, c3], textHTML: html };
    saveReadData('ppf', currentResultData);
}

// ==========================================
// ACTION BUTTONS
// ==========================================
function saveCurrentReading() {
    playSound(sfxClick);
    let saves = JSON.parse(localStorage.getItem('tarot_saves') || '[]');
    if (saves.length >= 5) saves.shift();
    saves.push(currentResultData);
    localStorage.setItem('tarot_saves', JSON.stringify(saves));
    alert("သိမ်းဆည်းပြီးပါပြီ။");
}

function openSaveList() {
    playSound(sfxClick);
    const container = document.getElementById('saveListContainer');
    container.innerHTML = '';
    let saves = JSON.parse(localStorage.getItem('tarot_saves') || '[]');
    
    if (saves.length === 0) {
        container.innerHTML = "<p style='text-align:center; font-family:Padauk;'>သိမ်းထားတာ မရှိသေးပါဘူး။</p>";
    } else {
        saves.forEach((save) => {
            const div = document.createElement('div');
            div.style = "background: rgba(0,0,0,0.6); padding: 10px; border-radius: 10px; border: 1px solid #8b5cf6; display: flex; gap: 10px; align-items: center; cursor: pointer;";
            div.onclick = () => { closeModal('saveModal'); reconstructResultFromSave(save); };
            div.innerHTML = `
                <img src="assets/cards/${save.cards[0].img}" style="width: 40px; border-radius: 4px;">
                <div style="text-align:left; flex:1;">
                    <h4 style="margin:0; color:#fbbf24; font-size:14px;">${save.cards[0].name}</h4>
                    <p style="margin:0; font-size:11px; color:#a0aec0;">${save.date}</p>
                </div>
            `;
            container.appendChild(div);
        });
    }
    document.getElementById('saveModal').classList.add('active');
}

function reconstructResultFromSave(data) {
    showScreen('screen-result');
    document.querySelectorAll('#screen-result > div > div').forEach(d => { if(d.id.startsWith('layout')) d.style.display = 'none'; });
    document.getElementById('resultActionButtons').style.display = 'flex';
    document.getElementById('resultTextArea').innerHTML = data.textHTML;

    if (data.mode === 'daily' || data.mode === 'weekly' || data.mode === 'monthly' || data.mode === 'yearly') {
        document.getElementById('layout-single').style.display = 'flex';
        const card = data.cards[0];
        const state = card.isReversed ? 'reversed' : 'upright';
        document.getElementById('resImg1').src = `assets/cards/${card.img}`;
        document.getElementById('resImg1').style.transform = card.isReversed ? 'rotate(180deg)' : 'none';
        document.getElementById('resName1').innerText = card.name;
        const badge = document.getElementById('resBadge1');
        badge.innerText = state === 'reversed' ? "Reversed" : "Upright";
        badge.className = `status-badge ${state}`;
    } 
    else if (data.mode === 'ppf') {
        document.getElementById('layout-ppf').style.display = 'flex';
        for(let i=0; i<3; i++) {
            document.getElementById(`ppfImg${i+1}`).src = `assets/cards/${data.cards[i].img}`;
            document.getElementById(`ppfImg${i+1}`).style.transform = data.cards[i].isReversed ? 'rotate(180deg)' : 'none';
        }
    }
    else {
        if (data.cards.length === 2) {
            document.getElementById('layout-solution').style.display = 'flex';
            document.getElementById('solImg1').src = `assets/cards/${data.cards[0].img}`;
            document.getElementById('solName1').innerText = data.cards[0].name;
            document.getElementById('solImg2').src = `assets/cards/${data.cards[1].img}`;
            document.getElementById('solName2').innerText = data.cards[1].name;
        } else {
            document.getElementById('layout-problem').style.display = 'flex';
            document.getElementById('probImg').src = `assets/cards/${data.cards[0].img}`;
            document.getElementById('probName').innerText = data.cards[0].name;
        }
    }
    currentResultData = data;
}

function promptAgain() {
    playSound(sfxClick);
    document.getElementById('againModal').classList.add('active');
}

function confirmAgain(mode) {
    closeModal('againModal');
    if (getTickets() < 1) { alert("Ticket မလုံလောက်ပါ။"); openTicketMenu(); return; }
    setTickets(getTickets() - 1);
    
    pickedCards = [];
    if (mode === 'category_menu') { openCategoryDialogue(); } 
    else { currentMode = mode; readingPhase = 'time'; startShuffle(); }
}

function goHome() {
    playSound(sfxClick);
    pickedCards = [];
    showScreen('screen-start');
}

// ==========================================
// TICKET UTILS & MISC
// ==========================================
function openTicketMenu() { document.getElementById('ticketModal').classList.add('active'); }
function closeModal(id) { document.getElementById(id).classList.remove('active'); }

function watchAd() {
    let adCount = parseInt(localStorage.getItem('ad_count') || '0');
    if (adCount >= 5) { alert("ဒီနေ့အတွက် ကြော်ငြာကြည့်ခွင့် ကုန်ပါပြီ။"); return; }
    
    if (typeof show_12069395 === "function") {
        show_12069395().then(() => {
            setTickets(getTickets() + 2); localStorage.setItem('ad_count', adCount + 1); updateTicketUI();
            alert("Ticket ၂ ခု ရပါပြီ။");
        }).catch(e => alert("ကြော်ငြာ မအောင်မြင်ပါ။"));
    } else {
        setTickets(getTickets() + 2); localStorage.setItem('ad_count', adCount + 1); updateTicketUI();
        alert("(Test) Ticket ၂ ခု ရပါပြီ။");
    }
}

function dailyLogin() {
    if (localStorage.getItem('last_login_date') === getTodayStr()) { alert("ဒီနေ့ ရရှိပြီးသား ဖြစ်ပါတယ်။"); return; }
    setTickets(getTickets() + 1); localStorage.setItem('last_login_date', getTodayStr());
    alert("နေ့စဉ် Login အတွက် Ticket ၁ ခု ရပါပြီ။");
}

function shareApp() {
    let shareCount = parseInt(localStorage.getItem('share_count') || '0');
    if (shareCount >= 2) { alert("ဒီနေ့အတွက် ရှယ်ခွင့် ကုန်ပါပြီ။"); return; }
    
    if (window.Telegram && window.Telegram.WebApp) {
        const url = "https://t.me/share/url?url=" + encodeURIComponent("https://t.me/YourBotName") + "&text=" + encodeURIComponent("Tarot App လေး စမ်းကြည့်ပါဦး");
        window.Telegram.WebApp.openTelegramLink(url);
    }
    setTickets(getTickets() + 1); localStorage.setItem('share_count', shareCount + 1); updateTicketUI();
    alert("ရှယ်လုပ်ပြီးပါပြီ။ Ticket ၁ ခု ရပါပြီ။");
}

function openSettings() { alert("Settings (Coming Soon)"); }
function openAbout() { alert("About App (Coming Soon)"); }
function leaveApp() { window.location.href = 'index.html'; }
