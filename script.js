// ============ ADSGRAM CONFIG ============
// ⚠️ ဒီနေရာမှာ သင့် Block ID ထည့်ပါ
const ADSGRAM_BLOCK_ID = "54078";

let adController = null;

// Initialize Telegram WebApp
if (window.Telegram && window.Telegram.WebApp) {
  window.Telegram.WebApp.ready();
  window.Telegram.WebApp.expand();
}

// ============ STATE ============
const state = {
  sign: null,
  period: null,
  currentQ: 0,
  answers: {},
  fortune: null,
};

// ============ SCREEN NAVIGATION ============
function goToScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const target = document.getElementById(id);
  if (target) {
    target.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

// ============ INIT ============
function init() {
  buildZodiacGrid();
  buildQuestions();
  attachEventListeners();
  loadTodayCount();
}

// ============ ZODIAC GRID ============
function buildZodiacGrid() {
  const grid = document.getElementById('zodiacGrid');
  grid.innerHTML = '';
  ZODIAC.forEach((z, i) => {
    const btn = document.createElement('button');
    btn.className = 'zodiac-item';
    btn.dataset.index = i;
    btn.innerHTML = `
      <span class="zodiac-symbol">${z.symbol}</span>
      <span class="zodiac-name">${z.name}</span>
    `;
    btn.addEventListener('click', () => selectSign(i, btn));
    grid.appendChild(btn);
  });
}

function selectSign(index, btn) {
  document.querySelectorAll('.zodiac-item').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
  state.sign = ZODIAC[index];
  document.getElementById('nextSign').disabled = false;
}

// ============ QUESTIONS ============
function buildQuestions() {
  renderQuestion();
}

function renderQuestion() {
  const q = QUESTIONS[state.currentQ];
  const wrap = document.getElementById('questionWrap');
  wrap.innerHTML = '';

  const title = document.createElement('h3');
  title.className = 'q-title';
  title.textContent = q.title;
  wrap.appendChild(title);

  const sub = document.createElement('p');
  sub.className = 'q-sub';
  sub.textContent = q.sub;
  wrap.appendChild(sub);

  if (q.type === 'date') {
    const input = document.createElement('input');
    input.type = 'date';
    input.className = 'q-date';
    input.max = new Date().toISOString().split('T')[0];
    if (state.answers[q.id]) input.value = state.answers[q.id];
    input.addEventListener('change', (e) => {
      state.answers[q.id] = e.target.value;
      updateNextBtn();
    });
    wrap.appendChild(input);
  } else if (q.type === 'options') {
    const optWrap = document.createElement('div');
    optWrap.className = 'q-options';
    q.options.forEach(opt => {
      const btn = document.createElement('button');
      btn.className = 'q-option';
      btn.textContent = opt.label;
      btn.dataset.value = opt.value;
      if (state.answers[q.id] === opt.value) btn.classList.add('selected');
      btn.addEventListener('click', () => {
        document.querySelectorAll('.q-option').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        state.answers[q.id] = opt.value;
        updateNextBtn();
      });
      optWrap.appendChild(btn);
    });
    wrap.appendChild(optWrap);
  }

  // Update progress
  document.getElementById('qCurrent').textContent = state.currentQ + 1;
  document.getElementById('qTotal').textContent = QUESTIONS.length;
  document.getElementById('progressFill').style.width =
    ((state.currentQ + 1) / QUESTIONS.length * 100) + '%';

  updateNextBtn();
}

function updateNextBtn() {
  const q = QUESTIONS[state.currentQ];
  const btn = document.getElementById('qNext');
  const hasAnswer = state.answers[q.id] !== undefined && state.answers[q.id] !== '';
  btn.disabled = !hasAnswer;
  btn.textContent = state.currentQ === QUESTIONS.length - 1 ? 'Get Fortune ✨' : 'Next →';
}

// ============ EVENT LISTENERS ============
function attachEventListeners() {
  // Zodiac next
  document.getElementById('nextSign').addEventListener('click', () => {
    if (state.sign) goToScreen('screen-period');
  });

  // Period select
  document.querySelectorAll('.period-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      state.period = btn.dataset.period;
      state.currentQ = 0;
      state.answers = {};
      renderQuestion();
      goToScreen('screen-questions');
    });
  });

  // Question nav
  document.getElementById('qBack').addEventListener('click', () => {
    if (state.currentQ > 0) {
      state.currentQ--;
      renderQuestion();
    } else {
      goToScreen('screen-period');
    }
  });

  document.getElementById('qNext').addEventListener('click', () => {
    if (state.currentQ < QUESTIONS.length - 1) {
      state.currentQ++;
      renderQuestion();
    } else {
      showLoadingAndResult();
    }
  });

  // Ad overlay
  document.getElementById('btnWatchAd').addEventListener('click', () => {
    watchAdAndUnlock();
  });
  document.getElementById('btnSkipAd').addEventListener('click', () => {
    document.getElementById('adOverlay').classList.remove('show');
    revealAllCategories();
  });

  // Share
  document.getElementById('btnShare').addEventListener('click', shareFortune);
}

// ============ LOADING + RESULT ============
function showLoadingAndResult() {
  goToScreen('screen-loading');
  setTimeout(() => {
    generateFortune();
    renderResult();
    goToScreen('screen-result');
    setTimeout(showAdOverlay, 800);
  }, 2200);
}

// ============ FORTUNE GENERATION ============
function generateFortune() {
  const categories = ['love', 'health', 'family', 'work', 'money'];
  const period = state.period || 'today';

  const catData = categories.map(cat => {
    const texts = FORTUNE_TEXTS[cat][period] || FORTUNE_TEXTS[cat].today;
    const text = texts[Math.floor(Math.random() * texts.length)];
    return { cat, text };
  });

  // Lucky
  const color = LUCKY_COLORS[Math.floor(Math.random() * LUCKY_COLORS.length)];
  const number = Math.floor(Math.random() * 9) + 1;
  const day = LUCKY_DAYS[Math.floor(Math.random() * LUCKY_DAYS.length)];
  const time = LUCKY_TIMES[Math.floor(Math.random() * LUCKY_TIMES.length)];

  state.fortune = {
    categories: catData,
    lucky: { color, number, day, time },
  };
}

// ============ RENDER RESULT ============
const CAT_META = {
  love: { icon: '❤️', name: 'အချစ်ရေး' },
  health: { icon: '💪', name: 'ကျန်းမာရေး' },
  family: { icon: '👨‍👩‍👧', name: 'မိသားစု' },
  work: { icon: '💼', name: 'အလုပ်အကိုင်' },
  money: { icon: '💰', name: 'ငွေကြေး' },
};

const PERIOD_LABEL = {
  today: '🌞 ဒီနေ့ Fortune',
  month: '🌙 ဒီလ Fortune',
  year: '⭐ ဒီနှစ် Fortune',
};

function renderResult() {
  const f = state.fortune;
  const sign = state.sign;

  document.getElementById('resultSign').textContent = sign.symbol;
  document.getElementById('resultTitle').textContent = `${sign.name} · ${sign.my}`;
  document.getElementById('resultSub').textContent = 'သင့်အတွက်သာ ✨';
  document.getElementById('resultPeriod').textContent = PERIOD_LABEL[state.period];

  const wrap = document.getElementById('resultCategories');
  wrap.innerHTML = '';

  f.categories.forEach((c, i) => {
    const meta = CAT_META[c.cat];
    const card = document.createElement('div');
    card.className = 'cat-card locked';
    card.style.animationDelay = (i * 0.1) + 's';
    card.innerHTML = `
      <div class="cat-head">
        <span class="cat-icon">${meta.icon}</span>
        <span class="cat-name">${meta.name}</span>
      </div>
      <div class="cat-body">${c.text}</div>
    `;
    wrap.appendChild(card);
  });

  // Lucky
  document.getElementById('luckyColor').textContent = f.lucky.color.emoji + ' ' + f.lucky.color.name;
  document.getElementById('luckyNumber').textContent = f.lucky.number;
  document.getElementById('luckyDay').textContent = f.lucky.day;
  document.getElementById('luckyTime').textContent = f.lucky.time;
}

// ============ AD OVERLAY ============
function showAdOverlay() {
  document.getElementById('adOverlay').classList.add('show');
}

async function watchAdAndUnlock() {
  try {
    if (!adController && window.Adsgram) {
      adController = window.Adsgram.init({ blockId: ADSGRAM_BLOCK_ID });
    }
    if (adController) {
      await adController.show();
    }
    document.getElementById('adOverlay').classList.remove('show');
    revealAllCategories();
  } catch (err) {
    console.log('Ad skipped or error:', err);
    document.getElementById('adOverlay').classList.remove('show');
    revealAllCategories();
  }
}

function revealAllCategories() {
  document.querySelectorAll('.cat-card').forEach(card => {
    card.classList.remove('locked');
  });
}

// ============ SHARE ============
function shareFortune() {
  const f = state.fortune;
  const text = `🔮 TryIt Fortune\n♌ ${state.sign.name}\n🍀 Lucky: ${f.lucky.color.emoji} ${f.lucky.number}\n\nTry yours!`;

  if (window.Telegram && window.Telegram.WebApp) {
    window.Telegram.WebApp.switchInlineQuery(text);
  } else if (navigator.share) {
    navigator.share({ title: 'TryIt Fortune', text });
  } else {
    alert(text);
  }
}

// ============ RESTART ============
function restart() {
  state.sign = null;
  state.period = null;
  state.currentQ = 0;
  state.answers = {};
  state.fortune = null;
  document.querySelectorAll('.zodiac-item').forEach(b => b.classList.remove('selected'));
  document.getElementById('nextSign').disabled = true;
  goToScreen('screen-home');
}

// ============ TODAY COUNT ============
function loadTodayCount() {
  const today = new Date().toDateString();
  const stored = localStorage.getItem('fortune_' + today);
  const count = stored ? parseInt(stored) + 1 : Math.floor(Math.random() * 500) + 1000;
  localStorage.setItem('fortune_' + today, count);
  document.getElementById('todayCount').textContent = count.toLocaleString();
}

// ============ START ============
document.addEventListener('DOMContentLoaded', init);
