// ==================================================
// TAROT GAME LOGIC (V5 - Flawless Telegram Mini App)
// ==================================================
​let currentMode = 'daily';
let requiredCards = 1;
let selectedCards = [];
let isPicking = false;
let isMusicOn = true;
let userQuestion = "";
​const bgMusic = document.getElementById('bgMusic');
const sfxClick = document.getElementById('sfxClick');
const sfxShuffle = document.getElementById('sfxShuffle');
const sfxReveal = document.getElementById('sfxReveal');
​function playSound(sfx) {
if (isMusicOn && sfx) {
sfx.currentTime = 0;
sfx.play().catch(e => console.log("Audio play error:", e));
}
}
​function toggleMusic() {
isMusicOn = !isMusicOn;
const btn = document.getElementById('musicToggle');
if (isMusicOn) {
bgMusic.play().catch(e => console.log(e));
btn.innerText = "ON";
btn.classList.remove("off");
} else {
bgMusic.pause();
btn.innerText = "OFF";
btn.classList.add("off");
}
}
​function showScreen(screenId) {
document.querySelectorAll('.tarot-screen').forEach(s => s.classList.remove('active'));
const target = document.getElementById(screenId);
if (target) target.classList.add('active');
}
​// 1. Loading Screen Initialization
window.addEventListener('DOMContentLoaded', () => {
bgMusic.volume = 0.4;
let progress = 0;
const progressBar = document.getElementById('progressBar');
const interval = setInterval(() => {
progress += Math.random() * 25;
if (progress > 100) progress = 100;
if (progressBar) progressBar.style.width = progress + '%';
if (progress === 100) {
clearInterval(interval);
setTimeout(() => showScreen('screen-start'), 400);
}
}, 180);
});
​// 2. Menu Navigation
function startGame() {
playSound(sfxClick);
if (isMusicOn && bgMusic.paused) bgMusic.play().catch(e => console.log(e));
showScreen('screen-intro');
}
​function openSettings() {
playSound(sfxClick);
showScreen('screen-settings');
}
​function openAbout() {
playSound(sfxClick);
showScreen('screen-about');
}
​function backToMenu() {
playSound(sfxClick);
showScreen('screen-start');
}
​// 3. Choice Start
function startReading(mode, num) {
playSound(sfxClick);
currentMode = mode;
requiredCards = num;
selectedCards = [];
​if (mode === 'yesno') {
showScreen('screen-yesno');
} else {
startShuffle();
}
}
​function submitYesNo() {
const inputEl = document.getElementById('yesNoInput');
userQuestion = inputEl ? inputEl.value.trim() : "";
if (!userQuestion) {
alert("ကျေးဇူးပြု၍ မေးခွန်း အရင်ရေးပါ။");
return;
}
playSound(sfxClick);
startShuffle();
}
​// 4. Shuffle Scene Animation
function startShuffle() {
playSound(sfxShuffle);
showScreen('screen-shuffle');
setTimeout(() => {
if (requiredCards === 1) {
buildPickGrid1();
} else {
buildPickGrid2();
}
}, 1800);
}
​// 5. Pick Step 1 (4 Cards - 2x2 Grid)
function buildPickGrid1() {
showScreen('screen-pick1');
const titleEl = document.getElementById('title-pick1');
if (titleEl) titleEl.innerText = ကဒ် ${requiredCards} ကဒ် ရွေးပါ;
​let shuffled = [...TAROT_DECK].sort(() => Math.random() - 0.5).slice(0, 4);
const grid = document.getElementById('grid1');
if (!grid) return;
grid.innerHTML = '';
​shuffled.forEach(cardData => {
const card = document.createElement('div');
card.className = 'tarot-card';
card.onclick = () => {
if (isPicking) return;
isPicking = true;
playSound(sfxClick);
card.classList.add('selected');
​cardData.isReversed = Math.random() < 0.5;
selectedCards = [cardData];
​setTimeout(() => {
playSound(sfxReveal);
showResult();
isPicking = false;
}, 400);
};
grid.appendChild(card);
});
}
​// 6. Pick Step 2 (14 Cards - Pyramid Layout 4-3-4-3)
function buildPickGrid2() {
showScreen('screen-pick2');
const titleEl = document.getElementById('title-pick2');
if (titleEl) titleEl.innerText = ကဒ် ${requiredCards} ကဒ် ရွေးပါ;
​let shuffled = [...TAROT_DECK].sort(() => Math.random() - 0.5).slice(0, 14);
const grid = document.getElementById('grid2');
if (!grid) return;
grid.innerHTML = '';
​const rowConfigs = [4, 3, 4, 3];
let cardIndex = 0;
​rowConfigs.forEach(count => {
const rowDiv = document.createElement('div');
rowDiv.className = 'pick-row';
for (let i = 0; i < count; i++) {
if (cardIndex >= shuffled.length) break;
const cardData = shuffled[cardIndex++];
const card = document.createElement('div');
card.className = 'tarot-card';
card.onclick = () => pickCardPyramid(card, cardData);
rowDiv.appendChild(card);
}
grid.appendChild(rowDiv);
});
}
​function pickCardPyramid(cardElement, cardData) {
if (isPicking) return;
isPicking = true;
playSound(sfxClick);
cardElement.classList.add('selected');
​cardData.isReversed = Math.random() < 0.5;
selectedCards.push(cardData);
​if (selectedCards.length < requiredCards) {
// Continue picking until required count is met
setTimeout(() => { isPicking = false; }, 300);
} else {
setTimeout(() => {
playSound(sfxReveal);
showResult();
isPicking = false;
}, 400);
}
}
​// 7. Show Result Screen & Formatting
function showResult() {
const revealContainer = document.getElementById('revealedCards');
if (!revealContainer) return;
revealContainer.innerHTML = '';
let fortuneHTML = "";
​const yesNoAnswers = {
yes: "ဟုတ်ကဲ့ (Yes) - အပြုသဘောဆောင်ပြီး အောင်မြင်ပါမည်။",
no: "မဟုတ်ဘူး (No) - အတားအဆီးရှိသဖြင့် ဆိုင်းငံ့သင့်သည်။",
maybe: "ဖြစ်နိုင်ခြေရှိသည် (Maybe) - အခြေအနေကို စောင့်ကြည့်ပါ။"
};
​selectedCards.forEach((card, index) => {
const cardDiv = document.createElement('div');
cardDiv.className = 'reveal-card';
if (card.isReversed) cardDiv.classList.add('reversed');
​cardDiv.style.backgroundImage = url('assets/cards/${card.img}');
cardDiv.onclick = () => openModal(card);
​cardDiv.innerHTML = <span style="color:#2d3748; font-size:11px; font-weight:700; text-align:center; background:rgba(255,255,255,0.85); width:100%; padding:2px 0; overflow:hidden; white-space:nowrap; text-overflow:ellipsis;">${card.name}</span>;
revealContainer.appendChild(cardDiv);
​let meaning = card.isReversed ? card.reversed : card.upright;
​if (currentMode === 'yesno') {
let answer = "";
if (!card.isReversed) answer = yesNoAnswers.yes;
else answer = yesNoAnswers.no;
​fortuneHTML += <div style="margin-bottom:12px;"> <p style="font-size:12px; color:#a0aec0; font-style:italic; margin-bottom:6px;">"${userQuestion}"</p> <h3 style="color:#fbbf24; font-size:13px; margin-bottom:2px;">ကဒ်အဖြေ:</h3> <p style="font-size:14px; font-weight:bold; color:#10b981;">${answer}</p> <p style="font-size:12px; color:#e2e8f0; margin-top:4px;">(${card.name} - ${card.isReversed ? 'Reversed' : 'Upright'})</p> </div>;
} else {
const positions = ["အတိတ် (Past)", "ပစ္စုပ္ပန် (Present)", "အနာဂတ် (Future)"];
const posLabel = positions[index] || ကဒ် (${index + 1});
fortuneHTML += <div style="margin-bottom:12px; border-bottom:1px solid rgba(255,255,255,0.08); padding-bottom:8px;"> <h3 style="color:#fbbf24; font-size:13px; margin-bottom:2px;">${posLabel}: ${card.name} (${card.isReversed ? 'Reversed' : 'Upright'})</h3> <p style="font-size:12px; color:#e2e8f0;">${meaning}</p> </div>;
}
});
​const textEl = document.getElementById('fortuneText');
if (textEl) textEl.innerHTML = fortuneHTML;
showScreen('screen-result');
}
​// 8. Save Functionality (Max 5 items using localStorage)
function saveReading() {
playSound(sfxClick);
let savedData = {
date: new Date().toLocaleDateString(),
cards: selectedCards.map(c => c.name),
text: document.getElementById('fortuneText').innerHTML
};
​let savedList = JSON.parse(localStorage.getItem('tarot_saves') || '[]');
if (savedList.length >= 5) {
savedList.shift(); // Remove oldest if 5 reached
}
savedList.push(savedData);
localStorage.setItem('tarot_saves', JSON.stringify(savedList));
​const btn = document.querySelector('.result-actions .action-btn.save');
if (btn) {
const originalText = btn.innerText;
btn.innerText = "သိမ်းပြီးပါပြီ!";
setTimeout(() => { btn.innerText = originalText; }, 1500);
}
}
​// 9. Saved List Modal
function openSavedList() {
playSound(sfxClick);
const container = document.getElementById('savedListContainer');
const savedList = JSON.parse(localStorage.getItem('tarot_saves') || '[]');
​if (!container) return;
if (savedList.length === 0) {
container.innerHTML = "<p style='color:#a0aec0; text-align:center; font-size:13px;'>သိမ်းဆည်းထားသော ဟောကိန်းများ မရှိသေးပါ။</p>";
} else {
container.innerHTML = savedList.slice().reverse().map((item) => <div class="saved-item"> <p style="font-weight:bold; color:#fbbf24; font-size:13px; margin-bottom:3px;">${item.cards.join(', ')}</p> <p style="font-size:10px; color:#a0aec0; margin-bottom:6px;">${item.date}</p> <div style="font-size:11px; color:#cbd5e0; max-height:80px; overflow-y:auto;">${item.text}</div> </div>).join('');
}
const modal = document.getElementById('savedModal');
if (modal) modal.classList.add('active');
}
​function closeSavedList() {
playSound(sfxClick);
const modal = document.getElementById('savedModal');
if (modal) modal.classList.remove('active');
}
​// 10. Card Detail Popup Modal
function openModal(card) {
playSound(sfxClick);
const imgEl = document.getElementById('modal-img');
if (imgEl) {
imgEl.src = assets/cards/${card.img};
imgEl.style.transform = card.isReversed ? 'rotate(180deg)' : 'none';
}
​const titleEl = document.getElementById('modal-title');
if (titleEl) titleEl.innerText = card.name;
​const kwEl = document.getElementById('modal-keywords');
if (kwEl) kwEl.innerText = card.keywords;
​const statusBadge = document.getElementById('modal-status');
if (statusBadge) {
if (card.isReversed) {
statusBadge.innerText = "Reversed";
statusBadge.className = "status-badge reversed";
} else {
statusBadge.innerText = "Upright";
statusBadge.className = "status-badge upright";
}
}
​const setVal = (id, val) => {
const el = document.getElementById(id);
if (el) el.innerText = val || "";
};
​setVal('modal-general', card.general);
setVal('modal-upright', card.upright);
setVal('modal-reversed', card.reversed);
setVal('modal-love', card.love);
setVal('modal-career', card.career);
setVal('modal-health', card.health);
setVal('modal-advice', card.advice);
​const cardModal = document.getElementById('cardModal');
if (cardModal) cardModal.classList.add('active');
}
​function closeModal() {
playSound(sfxClick);
const cardModal = document.getElementById('cardModal');
if (cardModal) cardModal.classList.remove('active');
}
​// 11. App Actions
function leaveApp() {
playSound(sfxClick);
if (bgMusic) bgMusic.pause();
// Safe fallback redirect for Telegram WebApp
if (window.Telegram && window.Telegram.WebApp) {
window.Telegram.WebApp.close();
} else {
window.location.href = 'index.html';
}
}
​function restartApp() {
playSound(sfxClick);
selectedCards = [];
showScreen('screen-intro');
}
