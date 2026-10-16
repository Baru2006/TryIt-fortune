// ==================================================
// TOOLS (10 items)
// ==================================================
const TOOLS = [
  { icon: 'assets/icons/yt-mp3.png',   title: 'YouTube MP3 Download', sub: 'Audio Download',   url: 'https://ytmp3.cc', external: true },
  { icon: 'assets/icons/yt-thumb.png', title: 'YouTube Thumbnail',    sub: 'Thumbnail Download', url: 'https://youtube.com', external: true },
  { icon: 'assets/icons/tiktok.png',   title: 'TikTok No Watermark',  sub: 'Video Download',    url: 'https://ssstik.io', external: true },
  { icon: 'assets/icons/tts.png',      title: 'Text To Speech',       sub: 'AI Voice',          url: '#', external: false },
  { icon: 'assets/icons/yt-video.png', title: 'YouTube Video',        sub: 'MP4 Download',      url: 'https://y2mate.com', external: true },
  { icon: 'assets/icons/calculator.png', title: 'Calculator',         sub: 'Calculate',         url: '#', external: false },
  { icon: 'assets/icons/qr.png',       title: 'QR Generator',         sub: 'Create QR',         url: 'https://qr-code-generator.com', external: true },
  { icon: 'assets/icons/password.png', title: 'Password Generator',   sub: 'Strong Password',   url: 'https://passwordsgenerator.net', external: true },
  { icon: 'assets/icons/image.png',    title: 'Image Compressor',     sub: 'Compress Image',    url: 'https://tinypng.com', external: true },
  { icon: 'assets/icons/color.png',    title: 'Color Picker',         sub: 'Pick Color',        url: 'https://imagecolorpicker.com', external: true },
];

// ==================================================
// POPULAR APPS (30)
// ==================================================
const POPULAR_APPS = [
  {
    icon: 'assets/apps/telegram.png',
    title: 'Telegram',
    tags: ['messaging', 'social'],
    developer: 'Telegram FZ-LLC',
    desc: 'မြန်ဆန်လုံခြုံတဲ့ messaging app',
    size: '80 MB',
    url: '#'
  },
  {
    icon: 'assets/apps/capcut.png',
    title: 'CapCut',
    tags: ['video editor', 'tools'],
    developer: 'Bytedance Pte. Ltd.',
    desc: 'လူကြိုက်များတဲ့ ဗီဒီယိုဖန်တီးပြင်ဆင်ရေး app',
    size: '150 MB',
    url: '#'
  },
  {
    icon: 'assets/apps/picsart.png',
    title: 'Picsart',
    tags: ['photo editor', 'tools'],
    developer: 'Picsart, Inc.',
    desc: 'ပုံများကို လှပစွာ တည်းဖြတ်နိုင်သော app',
    size: '90 MB',
    url: '#'
  },
  {
    icon: 'assets/apps/deepseek.png',
    title: 'DeepSeek',
    tags: ['ai', 'productivity'],
    developer: 'DeepSeek',
    desc: 'ဉာဏ်ရည်တုနည်းပညာသုံး AI assistant app',
    size: '65 MB',
    url: '#'
  },
  {
    icon: 'assets/apps/chatgpt.png',
    title: 'ChatGPT',
    tags: ['ai', 'productivity'],
    developer: 'OpenAI',
    desc: 'အသုံးဝင်ပြီး စမတ်ကျတဲ့ AI chat app',
    size: '70 MB',
    url: '#'
  },
  {
    icon: 'assets/apps/tiktok.png',
    title: 'TikTok',
    tags: ['social', 'video'],
    developer: 'TikTok Pte. Ltd.',
    desc: 'ဖျော်ဖြေရေး ဗီဒီယိုများ ကြည့်ရှုနိုင်သော app',
    size: '180 MB',
    url: '#'
  },
  {
    icon: 'assets/apps/spotify.png',
    title: 'Spotify',
    tags: ['music', 'audio'],
    developer: 'Spotify AB',
    desc: 'သီချင်းပေါင်းများစွာကို အလွယ်တကူ နားဆင်နိုင်သော app',
    size: '100 MB',
    url: '#'
  },
  {
    icon: 'assets/apps/netflix.png',
    title: 'Netflix',
    tags: ['video', 'entertainment'],
    developer: 'Netflix, Inc.',
    desc: 'ဇာတ်လမ်းတွဲနဲ့ ရုပ်ရှင်ကောင်းများ ကြည့်ရှုနိုင်သော app',
    size: '75 MB',
    url: '#'
  },
  {
    icon: 'assets/apps/whatsapp.png',
    title: 'WhatsApp',
    tags: ['communication', 'social'],
    developer: 'Meta Platforms, Inc.',
    desc: 'မက်ဆေ့ချ်နဲ့ ဖုန်းခေါ်ဆိုမှုများ ပြုလုပ်နိုင်သော app',
    size: '85 MB',
    url: '#'
  },
  {
    icon: 'assets/apps/viber.png',
    title: 'Viber',
    tags: ['communication', 'social'],
    developer: 'Rakuten Viber',
    desc: 'မြန်မာနိုင်ငံတွင် လူသုံးများသော chat app',
    size: '95 MB',
    url: '#'
  },
  {
    icon: 'assets/apps/zalo.png',
    title: 'Zalo',
    tags: ['communication', 'social'],
    developer: 'VNG Corporation',
    desc: 'ဆက်သွယ်ရေးအတွက် အသုံးပြုရလွယ်ကူသော app',
    size: '110 MB',
    url: '#'
  },
  {
    icon: 'assets/apps/messenger.png',
    title: 'Messenger',
    tags: ['communication', 'social'],
    developer: 'Meta Platforms, Inc.',
    desc: 'သူငယ်ချင်းများနဲ့ စကားပြောဆိုနိုင်သော app',
    size: '130 MB',
    url: '#'
  },
  {
    icon: 'assets/apps/google-drive.png',
    title: 'Google Drive',
    tags: ['productivity', 'tools'],
    developer: 'Google LLC',
    desc: 'ဖိုင်များကို လုံခြုံစွာ သိမ်းဆည်းပေးသော app',
    size: '60 MB',
    url: '#'
  },
  {
    icon: 'assets/apps/chrome.png',
    title: 'Chrome',
    tags: ['browser', 'tools'],
    developer: 'Google LLC',
    desc: 'အင်တာနက်စာမျက်နှာများ ကြည့်ရှုရန် browser app',
    size: '140 MB',
    url: '#'
  },
  {
    icon: 'assets/apps/opera.png',
    title: 'Opera',
    tags: ['browser', 'vpn'],
    developer: 'Opera Norway AS',
    desc: 'အမြန်နှုန်းကောင်းပြီး VPN ပါဝင်သော browser',
    size: '90 MB',
    url: '#'
  },
  {
    icon: 'assets/apps/opera-mini.png',
    title: 'Opera Mini',
    tags: ['browser', 'tools'],
    developer: 'Opera Norway AS',
    desc: 'ဒေတာချွေတာပြီး မြန်ဆန်တဲ့ web browser',
    size: '40 MB',
    url: '#'
  },
  {
    icon: 'assets/apps/snapseed.png',
    title: 'Snapseed',
    tags: ['photo editor', 'tools'],
    developer: 'Google LLC',
    desc: 'ဓာတ်ပုံများကို ကျွမ်းကျင်စွာ ပြင်ဆင်နိုင်သော app',
    size: '45 MB',
    url: '#'
  },
  {
    icon: 'assets/apps/canva.png',
    title: 'Canva',
    tags: ['productivity', 'photo editor'],
    developer: 'Canva',
    desc: 'ဒီဇိုင်းအမျိုးမျိုး ဖန်တီးနိုင်သော application',
    size: '120 MB',
    url: '#'
  },
  {
    icon: 'assets/apps/files-by-google.png',
    title: 'Files by Google',
    tags: ['tools', 'productivity'],
    developer: 'Google LLC',
    desc: 'ဖုန်းအတွင်းရှိ ဖိုင်များကို ရှင်းလင်းစီမံပေးသော app',
    size: '30 MB',
    url: '#'
  },
  {
    icon: 'assets/apps/mx-player.png',
    title: 'MX Player',
    tags: ['video', 'tools'],
    developer: 'MX Media and Entertainment',
    desc: 'ဗီဒီယိုအမျိုးမျိုးကို ဖွင့်လှစ်ကြည့်ရှုနိုင်သော player',
    size: '70 MB',
    url: '#'
  },
  {
    icon: 'assets/apps/vlc.png',
    title: 'VLC',
    tags: ['video', 'tools'],
    developer: 'VideoLAN',
    desc: 'ဖော်မတ်စုံလင်စွာ ဖွင့်နိုင်သော media player',
    size: '50 MB',
    url: '#'
  },
  {
    icon: 'assets/apps/shazam.png',
    title: 'Shazam',
    tags: ['music', 'tools'],
    developer: 'Apple Inc.',
    desc: 'ဖွင့်နေသောသီချင်းများကို ရှာဖွေဖော်ထုတ်ပေးသော app',
    size: '35 MB',
    url: '#'
  },
  {
    icon: 'assets/apps/adobe-lightroom.png',
    title: 'Adobe Lightroom',
    tags: ['photo editor', 'tools'],
    developer: 'Adobe',
    desc: 'အရည်အသွေးမြင့် ဓာတ်ပုံတည်းဖြတ်ရေး app',
    size: '160 MB',
    url: '#'
  },
  {
    icon: 'assets/apps/bitmoji.png',
    title: 'Bitmoji',
    tags: ['social', 'tools'],
    developer: 'Snap Inc.',
    desc: 'ကိုယ်ပိုင်ပုံစံတူ စတစ်ကာများ ဖန်တီးနိုင်သော app',
    size: '55 MB',
    url: '#'
  },
  {
    icon: 'assets/apps/amazon.png',
    title: 'Amazon',
    tags: ['shopping', 'tools'],
    developer: 'Amazon Mobile LLC',
    desc: 'ကမ္ဘာကျော် အွန်လိုင်းမှ ပစ္စည်းဝယ်ယူနိုင်သော app',
    size: '95 MB',
    url: '#'
  },
  {
    icon: 'assets/apps/shopee.png',
    title: 'Shopee',
    tags: ['shopping', 'tools'],
    developer: 'Shopee',
    desc: 'အွန်လိုင်းစျေးဝယ်ယူမှုများ ပြုလုပ်နိုင်သော app',
    size: '110 MB',
    url: '#'
  },
  {
    icon: 'assets/apps/lazada.png',
    title: 'Lazada',
    tags: ['shopping', 'tools'],
    developer: 'Lazada Group',
    desc: 'လူကြိုက်များတဲ့ အရှေ့တောင်အာရှ shopping app',
    size: '100 MB',
    url: '#'
  },
  {
    icon: 'assets/apps/facebook.png',
    title: 'Facebook',
    tags: ['social', 'communication'],
    developer: 'Meta Platforms, Inc.',
    desc: 'လူမှုကွန်ရက်သုံးစွဲရန် ထိပ်တန်း application',
    size: '170 MB',
    url: '#'
  },
  {
    icon: 'assets/apps/instagram.png',
    title: 'Instagram',
    tags: ['social', 'photo editor'],
    developer: 'Meta Platforms, Inc.',
    desc: 'ဓာတ်ပုံနှင့် ဗီဒီယိုများ မျှဝေရန် social app',
    size: '150 MB',
    url: '#'
  },
  {
    icon: 'assets/apps/zoom.png',
    title: 'Zoom',
    tags: ['productivity', 'communication'],
    developer: 'Zoom Video Communications',
    desc: 'အစည်းအဝေးများနှင့် အွန်လိုင်းသင်ခန်းစာများအတွက် app',
    size: '110 MB',
    url: '#'
  }
];

// ==================================================
// POPULAR GAMES (30)
// ==================================================
const POPULAR_GAMES = [
  {
    icon: 'assets/games/free-fire.png',
    title: 'Free Fire',
    tags: ['action', 'battle royale'],
    developer: 'Garena',
    desc: 'လူကြိုက်များတဲ့ battle royale game',
    size: '800 MB',
    url: '#'
  },
  {
    icon: 'assets/games/pubg-mobile.png',
    title: 'PUBG Mobile',
    tags: ['action', 'battle royale'],
    developer: 'Level Infinite',
    desc: 'လက်တွေ့ဆန်တဲ့ ရှင်သန်တိုက်ခိုက်ရတဲ့ game',
    size: '1.2 GB',
    url: '#'
  },
  {
    icon: 'assets/games/mobile-legends.png',
    title: 'Mobile Legends',
    tags: ['moba', 'action'],
    developer: 'Moonton',
    desc: 'အဖွဲ့လိုက် တိုက်ခိုက်ရတဲ့ MOBA game',
    size: '950 MB',
    url: '#'
  },
  {
    icon: 'assets/games/call-of-duty-mobile.png',
    title: 'Call of Duty Mobile',
    tags: ['action', 'shooter'],
    developer: 'Activision Publishing',
    desc: 'စိတ်လှုပ်ရှားဖွယ်ကောင်းတဲ့ လက်နက်ကိုင်တိုက်ပွဲ game',
    size: '1.5 GB',
    url: '#'
  },
  {
    icon: 'assets/games/genshin-impact.png',
    title: 'Genshin Impact',
    tags: ['rpg', 'adventure'],
    developer: 'COGNOSPHERE',
    desc: 'စူးစမ်းလေ့လာရတဲ့ လှပတဲ့ open-world RPG game',
    size: '2.5 GB',
    url: '#'
  },
  {
    icon: 'assets/games/minecraft.png',
    title: 'Minecraft',
    tags: ['simulation', 'puzzle'],
    developer: 'Mojang',
    desc: 'စိတ်ကူးယဉ်ပုံစံများကို တည်ဆောက်ရတဲ့ game',
    size: '600 MB',
    url: '#'
  },
  {
    icon: 'assets/games/roblox.png',
    title: 'Roblox',
    tags: ['simulation', 'casual'],
    developer: 'Roblox Corporation',
    desc: 'ဂိမ်းအမျိုးမျိုးကို တစ်နေရာတည်းမှာ ဆော့ရတဲ့ game',
    size: '300 MB',
    url: '#'
  },
  {
    icon: 'assets/games/among-us.png',
    title: 'Among Us',
    tags: ['casual', 'strategy'],
    developer: 'Innersloth LLC',
    desc: 'လူသတ်သမားကို လျှို့ဝှက်ရှာဖွေရတဲ့ ပျော်စရာ game',
    size: '250 MB',
    url: '#'
  },
  {
    icon: 'assets/games/subway-surfers.png',
    title: 'Subway Surfers',
    tags: ['action', 'casual'],
    developer: 'SYBO Games',
    desc: 'ရထားလမ်းပေါ်မှာ အပြေးပြိုင်ရတဲ့ လူကြိုက်များ game',
    size: '180 MB',
    url: '#'
  },
  {
    icon: 'assets/games/candy-crush.png',
    title: 'Candy Crush',
    tags: ['puzzle', 'casual'],
    developer: 'King',
    desc: 'အရောင်တူ သကြားလုံးများကို ဆက်သွယ်ရတဲ့ puzzle',
    size: '150 MB',
    url: '#'
  },
  {
    icon: 'assets/games/clash-of-clans.png',
    title: 'Clash of Clans',
    tags: ['strategy', 'action'],
    developer: 'Supercell',
    desc: 'ရွာတည်ဆောက်ပြီး စစ်တိုက်ရတဲ့ strategy game',
    size: '400 MB',
    url: '#'
  },
  {
    icon: 'assets/games/clash-royale.png',
    title: 'Clash Royale',
    tags: ['strategy', 'action'],
    developer: 'Supercell',
    desc: 'ကတ်ပြားများကို အသုံးပြုတိုက်ခိုက်ရတဲ့ strategy game',
    size: '350 MB',
    url: '#'
  },
  {
    icon: 'assets/games/asphalt-9.png',
    title: 'Asphalt 9',
    tags: ['racing', 'action'],
    developer: 'Gameloft',
    desc: 'အရှိန်ပြင်းပြင်း မောင်းနှင်ရတဲ့ ကားပြိုင်ပွဲ game',
    size: '1.8 GB',
    url: '#'
  },
  {
    icon: 'assets/games/real-racing-3.png',
    title: 'Real Racing 3',
    tags: ['racing', 'sports'],
    developer: 'ELECTRONIC ARTS',
    desc: 'လက်တွေ့ဆန်တဲ့ ကားမောင်းပြိုင်ပွဲဝင် game',
    size: '1.1 GB',
    url: '#'
  },
  {
    icon: 'assets/games/need-for-speed.png',
    title: 'Need for Speed',
    tags: ['racing', 'action'],
    developer: 'ELECTRONIC ARTS',
    desc: 'နာမည်ကြီး ကားအမြန်မောင်းပြိုင်ရတဲ့ game',
    size: '900 MB',
    url: '#'
  },
  {
    icon: 'assets/games/pokemon-go.png',
    title: 'Pokemon GO',
    tags: ['simulation', 'casual'],
    developer: 'Niantic, Inc.',
    desc: 'ပြင်ပလောကထဲမှာ ပိုကီမွန်ဖမ်းရတဲ့ AR game',
    size: '500 MB',
    url: '#'
  },
  {
    icon: 'assets/games/stumble-guys.png',
    title: 'Stumble Guys',
    tags: ['casual', 'action'],
    developer: 'Scopely',
    desc: 'ပျော်စရာအတားအဆီးတွေကို ကျော်ဖြတ်ရတဲ့ game',
    size: '200 MB',
    url: '#'
  },
  {
    icon: 'assets/games/ludo-king.png',
    title: 'Ludo King',
    tags: ['casual', 'strategy'],
    developer: 'Gametion',
    desc: 'သူငယ်ချင်းများနှင့် အတူဆော့ရတဲ့ အန်စာတုံး game',
    size: '80 MB',
    url: '#'
  },
  {
    icon: 'assets/games/8-ball-pool.png',
    title: '8 Ball Pool',
    tags: ['sports', 'casual'],
    developer: 'Miniclip.com',
    desc: 'ဘီလိယက်ထိုးပြိုင်ပွဲ ဆော့ကစားရတဲ့ game',
    size: '120 MB',
    url: '#'
  },
  {
    icon: 'assets/games/temple-run-2.png',
    title: 'Temple Run 2',
    tags: ['action', 'casual'],
    developer: 'Imangi Studios',
    desc: 'ဘုံဗိမာန်ထဲကနေ အပြေးလွှတ်လွတ်မြောက်ရတဲ့ game',
    size: '130 MB',
    url: '#'
  },
  {
    icon: 'assets/games/angry-birds-2.png',
    title: 'Angry Birds 2',
    tags: ['puzzle', 'casual'],
    developer: 'Rovio Entertainment',
    desc: 'ငှက်များကို ပစ်ခတ်ဖျက်ဆီးရတဲ့ puzzle game',
    size: '220 MB',
    url: '#'
  },
  {
    icon: 'assets/games/plants-vs-zombies.png',
    title: 'Plants Vs Zombies',
    tags: ['strategy', 'casual'],
    developer: 'ELECTRONIC ARTS',
    desc: 'အပင်စိုက်ပြီး ဖုတ်ကောင်များကို ကာကွယ်ရတဲ့ game',
    size: '300 MB',
    url: '#'
  },
  {
    icon: 'assets/games/altos-odyssey.png',
    title: "Alto's Odyssey",
    tags: ['casual', 'adventure'],
    developer: 'Noodlecake',
    desc: 'နှင်းလျှောစီးရင်း ရှုခင်းခံစားရတဲ့ လှပတဲ့ game',
    size: '140 MB',
    url: '#'
  },
  {
    icon: 'assets/games/brawl-stars.png',
    title: 'Brawl Stars',
    tags: ['action', 'strategy'],
    developer: 'Supercell',
    desc: 'အဖွဲ့လိုက် အမြန်တိုက်ခိုက်ရတဲ့ action game',
    size: '550 MB',
    url: '#'
  },
  {
    icon: 'assets/games/fortnite.png',
    title: 'Fortnite',
    tags: ['action', 'battle royale'],
    developer: 'Epic Games',
    desc: 'တည်ဆောက်ရေးပါဝင်တဲ့ battle royale game',
    size: '2.0 GB',
    url: '#'
  },
  {
    icon: 'assets/games/apex-legends-mobile.png',
    title: 'Apex Legends Mobile',
    tags: ['action', 'battle royale'],
    developer: 'Electronic Arts',
    desc: 'စွမ်းရည်ကိုယ်စီပါတဲ့ သူရဲကောင်းတိုက်ပွဲ game',
    size: '1.4 GB',
    url: '#'
  },
  {
    icon: 'assets/games/efootball.png',
    title: 'eFootball',
    tags: ['sports', 'simulation'],
    developer: 'Konami',
    desc: 'လက်တွေ့ဆန်တဲ့ ဘောလုံးပြိုင်ပွဲ game',
    size: '1.8 GB',
    url: '#'
  },
  {
    icon: 'assets/games/pes-2021.png',
    title: 'PES 2021',
    tags: ['sports', 'simulation'],
    developer: 'Konami',
    desc: 'နာမည်ကျော် ဘောလုံးကစားနည်း simulation',
    size: '1.6 GB',
    url: '#'
  },
  {
    icon: 'assets/games/fifa-mobile.png',
    title: 'FIFA Mobile',
    tags: ['sports', 'simulation'],
    developer: 'ELECTRONIC ARTS',
    desc: 'ကမ္ဘာ့ဘောလုံးအသင်းများနှင့် ချိတ်ဆက်ကစားရတဲ့ game',
    size: '1.3 GB',
    url: '#'
  },
  {
    icon: 'assets/games/dream-league-soccer.png',
    title: 'Dream League Soccer',
    tags: ['sports', 'simulation'],
    developer: 'First Touch Games',
    desc: 'ကိုယ့်အသင်းကို ကိုယ်တိုင်ဖန်တီးဆော့ရတဲ့ ဘောလုံး game',
    size: '500 MB',
    url: '#'
  }
];
