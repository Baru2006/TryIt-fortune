const TAROT_DECK = [
  // ==========================================
  // WANDS (1-14)
  // ==========================================
  {
    id: 1, name: "Ace of Wands", img: "1.png", 
    keywords: "စွမ်းအင်သစ်၊ ဖန်တီးနိုင်စွမ်း၊ အခွင့်အလမ်း",
    general: "Ace of Wands ဟာ စွမ်းအင်သစ်တွေ၊ စိတ်လှုပ်ရှားစရာ အခွင့်အလမ်းတွေနဲ့ လုပ်ငန်းသစ်တစ်ခုကို အစပျိုးရမယ့် ကာလကို ကိုယ်စားပြုပါတယ်။",
    upright: "အလုပ်သစ်စဖို့၊ စီးပွားရေးအသစ် စတင်ဖို့ အချိန်အခါကောင်း ဖြစ်ပါတယ်။ စွမ်းအင်နဲ့ ယုံကြည်ချက်အပြည့်ရှိနေပါမယ်။",
    reversed: "စွမ်းအင်ကျဆင်းနေခြင်း၊ စိတ်အားထက်သန်မှု ကုန်ခမ်းနေခြင်းတို့ကို ညွှန်ပြပါတယ်။ အရေးကြီးဆုံးဖြတ်ချက်တွေ ချတာမျိုး ခေတ္တရှောင်သင့်ပါတယ်။",
    love: "ချစ်သူရှိသူများ: ရိုမန်းတစ်ဆန်တဲ့ စွမ်းအင်တွေ ပြန်လည်ဝင်ရောက်လာပါမယ်။",
    career: "လုပ်ငန်းခွင်မှာ တာဝန်အသစ်တွေ ရရှိတာ၊ Project အသစ် စတင်ခွင့်ရတာမျိုး ဖြစ်လာပါမယ်။",
    health: "ခန္ဓာကိုယ်မှာ စွမ်းအင်အပြည့်အဝ ရှိနေပြီး လေ့ကျင့်ခန်းအသစ်တွေ စတင်ဖို့ အကောင်းဆုံးအချိန် ဖြစ်ပါတယ်။",
    advice: "အခွင့်အလမ်းသစ်တစ်ခု တံခါးခေါက်လာရင် ရဲရဲဝံ့ဝံ့ ခြေလှမ်းလှမ်းလိုက်ပါ။",
    past: "စိတ်အားတက်ကြွမှုတွေ ရှိခဲ့တယ်", present: "အခွင့်အရေးသစ်တွေ စတင်နေပြီ", future: "အောင်မြင်မှု အလားအလာကောင်းတွေ ရှိတယ်" 
  },
  { id: 2, name: "Two of Wands", img: "2.png", keywords: "#", general: "#", upright: "#", reversed: "#", love: "#", career: "#", health: "#", advice: "#", past: "#", present: "#", future: "#" },
  { id: 3, name: "Three of Wands", img: "3.png", keywords: "#", general: "#", upright: "#", reversed: "#", love: "#", career: "#", health: "#", advice: "#", past: "#", present: "#", future: "#" },
  { id: 4, name: "Four of Wands", img: "4.png", keywords: "#", general: "#", upright: "#", reversed: "#", love: "#", career: "#", health: "#", advice: "#", past: "#", present: "#", future: "#" },
  { id: 5, name: "Five of Wands", img: "5.png", keywords: "#", general: "#", upright: "#", reversed: "#", love: "#", career: "#", health: "#", advice: "#", past: "#", present: "#", future: "#" },
  { id: 6, name: "Six of Wands", img: "6.png", keywords: "#", general: "#", upright: "#", reversed: "#", love: "#", career: "#", health: "#", advice: "#", past: "#", present: "#", future: "#" },
  { id: 7, name: "Seven of Wands", img: "7.png", keywords: "#", general: "#", upright: "#", reversed: "#", love: "#", career: "#", health: "#", advice: "#", past: "#", present: "#", future: "#" },
  { id: 8, name: "Eight of Wands", img: "8.png", keywords: "#", general: "#", upright: "#", reversed: "#", love: "#", career: "#", health: "#", advice: "#", past: "#", present: "#", future: "#" },
  { id: 9, name: "Nine of Wands", img: "9.png", keywords: "#", general: "#", upright: "#", reversed: "#", love: "#", career: "#", health: "#", advice: "#", past: "#", present: "#", future: "#" },
  { id: 10, name: "Ten of Wands", img: "10.png", keywords: "#", general: "#", upright: "#", reversed: "#", love: "#", career: "#", health: "#", advice: "#", past: "#", present: "#", future: "#" },
  { id: 11, name: "Page of Wands", img: "11.png", keywords: "#", general: "#", upright: "#", reversed: "#", love: "#", career: "#", health: "#", advice: "#", past: "#", present: "#", future: "#" },
  { id: 12, name: "Knight of Wands", img: "12.png", keywords: "#", general: "#", upright: "#", reversed: "#", love: "#", career: "#", health: "#", advice: "#", past: "#", present: "#", future: "#" },
  { id: 13, name: "Queen of Wands", img: "13.png", keywords: "#", general: "#", upright: "#", reversed: "#", love: "#", career: "#", health: "#", advice: "#", past: "#", present: "#", future: "#" },
  { id: 14, name: "King of Wands", img: "14.png", keywords: "#", general: "#", upright: "#", reversed: "#", love: "#", career: "#", health: "#", advice: "#", past: "#", present: "#", future: "#" },

  // ==========================================
  // CUPS (15-28)
  // ==========================================
  {
    id: 15, name: "Ace of Cups", img: "15.png", 
    keywords: "အချစ်အသစ်၊ ခံစားချက်ပြည့်ဝမှု၊ ကရုဏာ",
    general: "Ace of Cups ဟာ နှလုံးသားထဲမှာ ခံစားချက်အသစ်တွေ စတင်ပေါ်ပေါက်လာခြင်းကို ကိုယ်စားပြုပါတယ်။ ချစ်ခြင်းတရား၊ ကြင်နာမှုနဲ့ ပျော်ရွှင်မှုတွေ ပြည့်နှက်နေတဲ့ အချိန်ဖြစ်ပါတယ်။",
    upright: "အချစ်အသစ်တစ်ခု စတင်ခြင်း၊ ဒါမှမဟုတ် လက်ရှိဆက်ဆံရေးမှာ ပိုပြီးနက်ရှိုင်းလာခြင်းတွေ ဖြစ်နိုင်ပါတယ်။ ဖန်တီးမှုနဲ့ အနုပညာအလုပ်တွေအတွက်လည်း စိတ်ကူးကောင်းတွေ ရလာပါလိမ့်မယ်။",
    reversed: "ခံစားချက်တွေကို ဖိနှိပ်ထားခြင်း၊ စိတ်ဓာတ်ကျဆင်းနေခြင်း သို့မဟုတ် အချစ်ရေးမှာ စိတ်ပျက်စရာတွေ ကြုံရနိုင်ပါတယ်။ ကိုယ့်ကိုယ်ကိုယ် ပြန်ပြီး ဂရုစိုက်ဖို့ လိုအပ်နေပါတယ်။",
    love: "အချစ်ရေးမှာ အလွန်ကောင်းမွန်တဲ့ အချိန်ပါ။ နှလုံးသားနဲ့ ဆက်ဆံရေးတွေ ပိုခိုင်မာလာပါမယ်။",
    career: "အလုပ်မှာ စိတ်ပါဝင်စားမှုနဲ့ ဖန်တီးမှုတွေ မြင့်မားနေပါမယ်။ ကိုယ်ဝါသနာပါတဲ့ အလုပ်တွေကို လုပ်ဖို့ အခွင့်အရေးရနိုင်ပါတယ်။",
    health: "စိတ်ရောကိုယ်ပါ ကျန်းမာသန်စွမ်းနေမယ့် အချိန်ပါ။ ရေဓာတ်ပြည့်ဝအောင် သောက်သုံးဖို့ မမေ့ပါနဲ့။",
    advice: "သင့်ရဲ့ ခံစားချက်တွေကို ပွင့်ပွင့်လင်းလင်း ဖော်ပြပါ။ အချစ်နဲ့ ကရုဏာတရားက သင့်ကို ခွန်အားဖြစ်စေပါလိမ့်မယ်။",
    past: "ချစ်ခြင်းတရားကို ခံစားခဲ့ရတယ်", present: "ပျော်ရွှင်မှုအသစ်တွေ ရောက်လာမယ်", future: "နှလုံးသားကို ဖွင့်ပြနိုင်မယ့် အခွင့်အရေး" 
  },
  { id: 16, name: "Two of Cups", img: "16.png", keywords: "#", general: "#", upright: "#", reversed: "#", love: "#", career: "#", health: "#", advice: "#", past: "#", present: "#", future: "#" },
  { id: 17, name: "Three of Cups", img: "17.png", keywords: "#", general: "#", upright: "#", reversed: "#", love: "#", career: "#", health: "#", advice: "#", past: "#", present: "#", future: "#" },
  { id: 18, name: "Four of Cups", img: "18.png", keywords: "#", general: "#", upright: "#", reversed: "#", love: "#", career: "#", health: "#", advice: "#", past: "#", present: "#", future: "#" },
  { id: 19, name: "Five of Cups", img: "19.png", keywords: "#", general: "#", upright: "#", reversed: "#", love: "#", career: "#", health: "#", advice: "#", past: "#", present: "#", future: "#" },
  { id: 20, name: "Six of Cups", img: "20.png", keywords: "#", general: "#", upright: "#", reversed: "#", love: "#", career: "#", health: "#", advice: "#", past: "#", present: "#", future: "#" },
  { id: 21, name: "Seven of Cups", img: "21.png", keywords: "#", general: "#", upright: "#", reversed: "#", love: "#", career: "#", health: "#", advice: "#", past: "#", present: "#", future: "#" },
  { id: 22, name: "Eight of Cups", img: "22.png", keywords: "#", general: "#", upright: "#", reversed: "#", love: "#", career: "#", health: "#", advice: "#", past: "#", present: "#", future: "#" },
  { id: 23, name: "Nine of Cups", img: "23.png", keywords: "#", general: "#", upright: "#", reversed: "#", love: "#", career: "#", health: "#", advice: "#", past: "#", present: "#", future: "#" },
  { id: 24, name: "Ten of Cups", img: "24.png", keywords: "#", general: "#", upright: "#", reversed: "#", love: "#", career: "#", health: "#", advice: "#", past: "#", present: "#", future: "#" },
  { id: 25, name: "Page of Cups", img: "25.png", keywords: "#", general: "#", upright: "#", reversed: "#", love: "#", career: "#", health: "#", advice: "#", past: "#", present: "#", future: "#" },
  { id: 26, name: "Knight of Cups", img: "26.png", keywords: "#", general: "#", upright: "#", reversed: "#", love: "#", career: "#", health: "#", advice: "#", past: "#", present: "#", future: "#" },
  { id: 27, name: "Queen of Cups", img: "27.png", keywords: "#", general: "#", upright: "#", reversed: "#", love: "#", career: "#", health: "#", advice: "#", past: "#", present: "#", future: "#" },
  { id: 28, name: "King of Cups", img: "28.png", keywords: "#", general: "#", upright: "#", reversed: "#", love: "#", career: "#", health: "#", advice: "#", past: "#", present: "#", future: "#" },

  // ==========================================
  // SWORDS (29-42)
  // ==========================================
  {
    id: 29, name: "Ace of Swords", img: "29.png", 
    keywords: "ရှင်းလင်းမှု၊ အမှန်တရား၊ အတွေးအခေါ်သစ်၊ အောင်ပွဲ",
    general: "Ace of Swords ဟာ စိတ်ရှင်းလင်းမှုနဲ့ အမှန်တရားကို မြင်တွေ့ရမယ့် အခိုက်အတန့်ကို ကိုယ်စားပြုပါတယ်။ မှုန်ဝါးနေတဲ့ အခြေအနေတွေ ပြတ်သားလာပြီး ဆုံးဖြတ်ချက်တွေ ခိုင်မာလာမယ့် အချိန်ပါ။",
    upright: "စိတ်ရှင်းရှင်းနဲ့ ဆုံးဖြတ်ချက်ချဖို့ အကောင်းဆုံးအချိန်ပါ။ ပညာရေး၊ စာမေးပွဲ ဒါမှမဟုတ် ဉာဏ်ရည်ဉာဏ်သွေးလိုအပ်တဲ့ အလုပ်တွေမှာ အောင်မြင်မှု ရနိုင်ပါတယ်။",
    reversed: "စိတ်ရှုပ်ထွေးနေခြင်း၊ အချက်အလက်တွေ မပြည့်စုံခြင်း သို့မဟုတ် မှားယွင်းတဲ့ ဆုံးဖြတ်ချက်တွေ ချမိနိုင်ပါတယ်။ အလျင်စလို မလုပ်ဖို့ သတိပေးနေပါတယ်။",
    love: "ဆက်ဆံရေးမှာ ရိုးသားပွင့်လင်းမှု လိုအပ်နေပါတယ်။ စိတ်ထဲရှိတာကို ပြတ်ပြတ်သားသား ပြောပါ။",
    career: "ခေါင်းဆောင်မှုနဲ့ ပြဿနာဖြေရှင်းနိုင်စွမ်းကို အသုံးပြုပြီး အလုပ်တွေ အောင်မြင်လာပါမယ်။",
    health: "စိတ်ဖိစီးမှုတွေ လျော့ချဖို့ လိုပါတယ်။ ဦးခေါင်းနဲ့ ဦးနှောက်ပိုင်းဆိုင်ရာ ကျန်းမာရေးကို ဂရုစိုက်ပါ။",
    advice: "မှန်ကန်တဲ့ အချက်အလက်တွေပေါ်မှာ အခြေခံပြီး ရဲရဲတင်းတင်း ဆုံးဖြတ်ချက်ချပါ။",
    past: "အမှန်တရားကို မြင်ခဲ့တယ်", present: "စိတ်ရှင်းရှင်းနဲ့ ဆုံးဖြတ်နိုင်တယ်", future: "အောင်မြင်မှု ရဖို့ လမ်းစ ပေါ်လာမယ်" 
  },
  { id: 30, name: "Two of Swords", img: "30.png", keywords: "#", general: "#", upright: "#", reversed: "#", love: "#", career: "#", health: "#", advice: "#", past: "#", present: "#", future: "#" },
  { id: 31, name: "Three of Swords", img: "31.png", keywords: "#", general: "#", upright: "#", reversed: "#", love: "#", career: "#", health: "#", advice: "#", past: "#", present: "#", future: "#" },
  { id: 32, name: "Four of Swords", img: "32.png", keywords: "#", general: "#", upright: "#", reversed: "#", love: "#", career: "#", health: "#", advice: "#", past: "#", present: "#", future: "#" },
  { id: 33, name: "Five of Swords", img: "33.png", keywords: "#", general: "#", upright: "#", reversed: "#", love: "#", career: "#", health: "#", advice: "#", past: "#", present: "#", future: "#" },
  { id: 34, name: "Six of Swords", img: "34.png", keywords: "#", general: "#", upright: "#", reversed: "#", love: "#", career: "#", health: "#", advice: "#", past: "#", present: "#", future: "#" },
  { id: 35, name: "Seven of Swords", img: "35.png", keywords: "#", general: "#", upright: "#", reversed: "#", love: "#", career: "#", health: "#", advice: "#", past: "#", present: "#", future: "#" },
  { id: 36, name: "Eight of Swords", img: "36.png", keywords: "#", general: "#", upright: "#", reversed: "#", love: "#", career: "#", health: "#", advice: "#", past: "#", present: "#", future: "#" },
  { id: 37, name: "Nine of Swords", img: "37.png", keywords: "#", general: "#", upright: "#", reversed: "#", love: "#", career: "#", health: "#", advice: "#", past: "#", present: "#", future: "#" },
  { id: 38, name: "Ten of Swords", img: "38.png", keywords: "#", general: "#", upright: "#", reversed: "#", love: "#", career: "#", health: "#", advice: "#", past: "#", present: "#", future: "#" },
  { id: 39, name: "Page of Swords", img: "39.png", keywords: "#", general: "#", upright: "#", reversed: "#", love: "#", career: "#", health: "#", advice: "#", past: "#", present: "#", future: "#" },
  { id: 40, name: "Knight of Swords", img: "40.png", keywords: "#", general: "#", upright: "#", reversed: "#", love: "#", career: "#", health: "#", advice: "#", past: "#", present: "#", future: "#" },
  { id: 41, name: "Queen of Swords", img: "41.png", keywords: "#", general: "#", upright: "#", reversed: "#", love: "#", career: "#", health: "#", advice: "#", past: "#", present: "#", future: "#" },
  { id: 42, name: "King of Swords", img: "42.png", keywords: "#", general: "#", upright: "#", reversed: "#", love: "#", career: "#", health: "#", advice: "#", past: "#", present: "#", future: "#" },

  // ==========================================
  // PENTACLES (43-56)
  // ==========================================
  {
    id: 43, name: "Ace of Pentacles", img: "43.png", 
    keywords: "ရုပ်ပိုင်းဆိုင်ရာ အခွင့်အလမ်း၊ ငွေကြေး၊ စီးပွားရေး",
    general: "Ace of Pentacles ဟာ ရုပ်ပိုင်းဆိုင်ရာနဲ့ ငွေကြေးပိုင်းဆိုင်ရာ အခွင့်အလမ်းသစ်တွေ ရောက်လာခြင်းကို ကိုယ်စားပြုပါတယ်။ လုပ်ငန်းအသစ်၊ ရင်းနှီးမြှုပ်နှံမှုအသစ်တွေအတွက် ကောင်းချီးတံခါး ဖွင့်ပေးလိုက်သလိုပါပဲ။",
    upright: "ဝင်ငွေအသစ်တွေ ရလာနိုင်ပါတယ်။ အလုပ်သစ်တစ်ခု ရနိုင်ခြေ မြင့်မားပါတယ်။ ရေရှည်တည်တံ့မယ့် စီးပွားရေးအစီအစဉ်တွေ ချဖို့ အကောင်းဆုံးအချိန်ပါ။",
    reversed: "ငွေကြေးနဲ့ ပတ်သက်ပြီး အခွင့်အရေးလွတ်သွားနိုင်ခြေ ရှိပါတယ်။ စွန့်စားရင်းနှီးမြှုပ်နှံမှုတွေကို ခေတ္တရှောင်ပြီး ပိုက်ဆံကို ဂရုတစိုက် စီမံပါ။",
    love: "ဆက်ဆံရေးမှာ တည်ငြိမ်မှုနဲ့ လုံခြုံမှုကို ရှာဖွေနေပါတယ်။ ရုပ်ဝတ္ထုအရ ပံ့ပိုးပေးမှုတွေ ရှိလာနိုင်ပါတယ်။",
    career: "စီးပွားရေးလုပ်ငန်း စတင်ဖို့ သို့မဟုတ် လစာတိုးဖို့ အခွင့်အရေးကောင်း ရလာပါမယ်။",
    health: "ကျန်းမာရေးအတွက် ရင်းနှီးမြှုပ်နှံမှု (ဥပမာ - Gym သွားခြင်း၊ အစားအသောက်ကောင်းကောင်းစားခြင်း) က အကျိုးရှိမယ့်အချိန်။",
    advice: "လက်တွေ့ကျကျ စဉ်းစားပါ။ ရလာတဲ့ အခွင့်အရေးကို အသုံးချပြီး အုတ်မြစ်ခိုင်ခိုင်တည်ဆောက်ပါ။",
    past: "ငွေကြေးအခွင့်အရေး ရခဲ့တယ်", present: "ဝင်ငွေအသစ် လမ်းစ ပေါ်နေတယ်", future: "ငွေကြေးတိုးတက်မှု ရှိမယ်" 
  },
  { id: 44, name: "Two of Pentacles", img: "44.png", keywords: "#", general: "#", upright: "#", reversed: "#", love: "#", career: "#", health: "#", advice: "#", past: "#", present: "#", future: "#" },
  { id: 45, name: "Three of Pentacles", img: "45.png", keywords: "#", general: "#", upright: "#", reversed: "#", love: "#", career: "#", health: "#", advice: "#", past: "#", present: "#", future: "#" },
  { id: 46, name: "Four of Pentacles", img: "46.png", keywords: "#", general: "#", upright: "#", reversed: "#", love: "#", career: "#", health: "#", advice: "#", past: "#", present: "#", future: "#" },
  { id: 47, name: "Five of Pentacles", img: "47.png", keywords: "#", general: "#", upright: "#", reversed: "#", love: "#", career: "#", health: "#", advice: "#", past: "#", present: "#", future: "#" },
  { id: 48, name: "Six of Pentacles", img: "48.png", keywords: "#", general: "#", upright: "#", reversed: "#", love: "#", career: "#", health: "#", advice: "#", past: "#", present: "#", future: "#" },
  { id: 49, name: "Seven of Pentacles", img: "49.png", keywords: "#", general: "#", upright: "#", reversed: "#", love: "#", career: "#", health: "#", advice: "#", past: "#", present: "#", future: "#" },
  { id: 50, name: "Eight of Pentacles", img: "50.png", keywords: "#", general: "#", upright: "#", reversed: "#", love: "#", career: "#", health: "#", advice: "#", past: "#", present: "#", future: "#" },
  { id: 51, name: "Nine of Pentacles", img: "51.png", keywords: "#", general: "#", upright: "#", reversed: "#", love: "#", career: "#", health: "#", advice: "#", past: "#", present: "#", future: "#" },
  { id: 52, name: "Ten of Pentacles", img: "52.png", keywords: "#", general: "#", upright: "#", reversed: "#", love: "#", career: "#", health: "#", advice: "#", past: "#", present: "#", future: "#" },
  { id: 53, name: "Page of Pentacles", img: "53.png", keywords: "#", general: "#", upright: "#", reversed: "#", love: "#", career: "#", health: "#", advice: "#", past: "#", present: "#", future: "#" },
  { id: 54, name: "Knight of Pentacles", img: "54.png", keywords: "#", general: "#", upright: "#", reversed: "#", love: "#", career: "#", health: "#", advice: "#", past: "#", present: "#", future: "#" },
  { id: 55, name: "Queen of Pentacles", img: "55.png", keywords: "#", general: "#", upright: "#", reversed: "#", love: "#", career: "#", health: "#", advice: "#", past: "#", present: "#", future: "#" },
  { id: 56, name: "King of Pentacles", img: "56.png", keywords: "#", general: "#", upright: "#", reversed: "#", love: "#", career: "#", health: "#", advice: "#", past: "#", present: "#", future: "#" }
];keywords
