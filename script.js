const navLinks = [...document.querySelectorAll("a.nav-link")];
const sections = [...document.querySelectorAll("main .panel")];
const revealNodes = [...document.querySelectorAll(".reveal")];
const skyDust = document.getElementById("skyDust");
const musicFloatBtn = document.getElementById("musicFloatBtn");
const musicFloatText = document.getElementById("musicFloatText");
const trackSelect = document.getElementById("trackSelect");
const musicLyricTrack = document.getElementById("musicLyricTrack");
const bgm = document.getElementById("bgm");
const toast = document.getElementById("toast");
const moonBtn = document.getElementById("moonBtn");
const easterContent = document.getElementById("easterContent");
const easterCode = document.getElementById("easterCode");
const staggerNodes = [...document.querySelectorAll(".mist-stagger")];
const cloudBubbles = [...document.querySelectorAll(".cloud-bubble")];
const chipTags = [...document.querySelectorAll(".chip-tag")];
const heroMainImage = document.getElementById("heroMainImage");
const heroPoster = document.querySelector(".hero-poster");
const pastJourneyTrack = document.getElementById("pastJourneyTrack");
const journeyCloudOverlay = document.getElementById("journeyCloudOverlay");
const journeyCloudCloseBtn = document.getElementById("journeyCloudCloseBtn");
const journeyCloudImage = document.getElementById("journeyCloudImage");
const journeyCloudTitle = document.getElementById("journeyCloudTitle");
const journeyCloudText = document.getElementById("journeyCloudText");
const presentRowTop = document.getElementById("presentRowTop");
const presentRowBottom = document.getElementById("presentRowBottom");
const presentCarouselShell = document.querySelector(".present-carousel-shell");
const futureDanmus = [...document.querySelectorAll(".future-danmu")];
const lifeStatusButtons = [...document.querySelectorAll(".life-status-pill")];
const lifeStatusNote = document.getElementById("lifeStatusNote");
const socialScreenImages = [...document.querySelectorAll(".social-screen-img")];
const catFriends = [...document.querySelectorAll("[data-cat-toast]")];
const catChatPop = document.getElementById("catChatPop");
const catChatTitle = document.getElementById("catChatTitle");
const catChatText = document.getElementById("catChatText");
const blindboxCards = [...document.querySelectorAll(".blindbox-card")];
const rantForm = document.getElementById("rantForm");
const rantAlias = document.getElementById("rantAlias");
const rantText = document.getElementById("rantText");
const rantList = document.getElementById("rantList");
const clearRantsBtn = document.getElementById("clearRantsBtn");
const resumeEntryBtn = document.getElementById("resumeEntryBtn");
const resumeOverlay = document.getElementById("resumeOverlay");
const resumeCloseBtn = document.getElementById("resumeCloseBtn");
const resumeBackBtn = document.getElementById("resumeBackBtn");
const resumeBar = document.getElementById("resumeBar");
const resumeLoadingText = document.getElementById("resumeLoadingText");
const resumeResult = document.getElementById("resumeResult");
const tagOverlay = document.getElementById("tagOverlay");
const tagCloseBtn = document.getElementById("tagCloseBtn");
const tagCard = document.getElementById("tagCard");
const tagCardImage = document.getElementById("tagCardImage");
const tagCardTitle = document.getElementById("tagCardTitle");
const tagCardDesc = document.getElementById("tagCardDesc");
const projectEntryBtn = document.getElementById("projectEntryBtn");

let moonClickCount = 0;
let secretCode = "";
let resumeTimer = null;
let heroCarouselTimer = null;
let toastTimer = null;
let catChatTypingTimer = null;
let catChatHideTimer = null;
let catChatFollowRaf = null;
let catChatAnchor = null;
let pastJourneyItems = [];
let musicHasPlayedOnce = false;
let presentLikeBurstTimer = null;
let presentLikeTipNode = null;
const imageWarmPromises = new Map();
const imageWarmDone = new Set();
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const AUTOPLAY_GUIDE_TOAST = "欢迎来到我的主页～点击任意位置开始边听音乐边了解我吧～";
const CAT_CHAT_MESSAGES = {
  catFriendLeft: {
    title: "呆呆在线陪逛中",
    text: "呆呆陪逛中，慢慢了解主人。"
  },
  catFriendRight: {
    title: "呆呆猫小助理",
    text:
      "失望了吧，嘿嘿！我可不是AI助理哦！\n想我的话，可以给我打电话，约我吃饭，西湖边吹吹风，数星星～\n人与人之间真实的链接，才是AI替代不了的东西\n联系方式：lzyliangzi@gmail.com"
  }
};

const RANT_STORAGE_KEY = "liangziyuan_home_rants_v1";
const blindboxSeed = [
  "你拆到了一颗小星星：明天会有新的灵感找到你。",
  "你拆到了一朵云：今天请对自己温柔一点点。",
  "你拆到了一张便签：暂停 3 分钟，深呼吸，先照顾好自己。",
  "你拆到了隐藏 BGM：把音量调高一点，今天就当在拍电影。",
  "你拆到了一句悄悄话：做自己，比做标准答案更酷。",
  "你拆到了一只猫爪印：呆呆说，别急，都会慢慢变好。",
  "你拆到了一个任务：今晚写下 3 件值得开心的小事。",
  "你拆到了一封未来信：谢谢你还在坚持发光。"
];
let blindboxPool = [...blindboxSeed];
const heroImageCandidates = [
  { src: "./assets/images/home-hero/day-girl.jpg.webp", alt: "我的奶茶大头照" },
  { src: "./assets/images/home-hero/haichazhutu1.png.webp", alt: "奶茶主题写真 1" },
  { src: "./assets/images/home-hero/naichazhutu2.png.webp", alt: "奶茶主题写真 2" },
  { src: "./assets/images/home-hero/naichazhutu3.png.webp", alt: "奶茶主题写真 3" }
];
const DEFAULT_MUSIC_LYRICS = [
  "去有风的地方，找回心里的轻松",
  "晚风吹过，烦恼就慢慢散开",
  "把今天的疲惫，交给星光和月亮",
  "你只要做自己，就已经很闪亮",
  "生活有起伏，但你一直在发光"
];
const LIFE_STATUS_COPY = {
  onroad: "在路上：慢一点没关系，按自己的节奏走就很好。",
  glowing: "在发光：把灵感落地成行动，认真生活本身就很耀眼。",
  charging: "在充电：给自己一点留白，喝杯奶茶也算认真恢复元气。"
};
const PAST_JOURNEY_FALLBACK = [
  {
    title: "成长",
    meta: "18 岁之前",
    description: "南宁市星湖小学到南宁三中，按时长大，也收获了至今仍在身边的朋友。",
    image: "./assets/images/past-journey/growth.jpg.webp",
    cloudTitle: "成长彩蛋",
    cloudText: "那些看似普通的校园时光，悄悄铺垫了我后来面对世界的底气。",
    cloudImage: "./assets/images/past-journey/growth.jpg.webp",
    yearMark: "成长",
    sideSkill: "技能：学习习惯与自律建立",
    sideInsight: "感悟：在被爱中慢慢长大",
    sideResult: "成果：收获长期稳定的友谊"
  },
  {
    title: "本科求学",
    meta: "2013 - 2017 | 天津理工大学",
    description: "信息管理与信息系统专业，完成创新创业项目并论文发表、申请软著。",
    image: "./assets/images/past-journey/undergraduate.png.webp",
    cloudTitle: "本科彩蛋",
    cloudText: "课堂之外，我也在不断试错和表达，慢慢找到“做产品”的直觉。",
    cloudImage: "./assets/images/past-journey/undergraduate.png.webp",
    yearMark: "2013",
    sideSkill: "技能：系统思维与需求分析",
    sideInsight: "感悟：做产品要从真实问题出发",
    sideResult: "成果：项目落地、论文发表、软著申请"
  },
  {
    title: "Gap 一年",
    meta: "2017 - 2018",
    description: "考研二战，同时参与新媒体运营实习，公众号内容最高阅读量 10w+。",
    image: "./assets/images/past-journey/gap-year.png.webp",
    cloudTitle: "Gap 彩蛋",
    cloudText: "最迷茫的一年，反而练出了我的韧性，也让我学会在不确定里前进。",
    cloudImage: "./assets/images/past-journey/gap-year.png.webp",
    yearMark: "2017",
    sideSkill: "技能：内容运营与用户洞察",
    sideInsight: "感悟：迷茫期也能积累硬实力",
    sideResult: "成果：原创内容最高阅读 10w+"
  },
  {
    title: "研究生求学",
    meta: "2018 - 2021 | 广西大学",
    description: "主攻市场营销与企业诊断，输出价值 20w 的组织管理与营销方案。",
    image: "./assets/images/past-journey/master.png.webp",
    cloudTitle: "研究生彩蛋",
    cloudText: "调研和论文训练，让我开始习惯“用事实和结构说话”。",
    cloudImage: "./assets/images/past-journey/master.png.webp",
    yearMark: "2018",
    sideSkill: "技能：调研、诊断与结构化表达",
    sideInsight: "感悟：事实和结构比情绪更有说服力",
    sideResult: "成果：输出价值 20w 的咨询方案"
  },
  {
    title: "第一份工作（白月光）",
    meta: "2021.07 - 2023.11 | 北森云计算",
    description: "负责 PaaS 元数据能力与签署升级，推动 2000+ 客户平滑迁移。",
    image: "./assets/images/past-journey/first-job.jpg.webp",
    cloudTitle: "第一份工作彩蛋",
    cloudText: "第一次被真实业务“打磨”，也第一次感受到产品改变组织的力量。",
    cloudImage: "./assets/images/past-journey/first-job.jpg.webp",
    yearMark: "2021",
    sideSkill: "技能：平台化设计与复杂场景抽象",
    sideInsight: "感悟：好产品是业务与体验的平衡",
    sideResult: "成果：签署升级覆盖 2000+ 客户迁移"
  },
  {
    title: "第二份工作（进化）",
    meta: "2024.03 - 至今 | e签宝",
    description: "从 0 到 1 打造低代码核心能力，同时建设 ePaaS 文件模板底座。",
    image: "./assets/images/past-journey/second-job.png.webp",
    cloudTitle: "第二份工作彩蛋",
    cloudText: "从“做功能”走向“搭系统”，我开始更清楚自己想成为怎样的产品人。",
    cloudImage: "./assets/images/past-journey/second-job.png.webp",
    yearMark: "2024",
    sideSkill: "技能：0-1 产品搭建与平台能力沉淀",
    sideInsight: "感悟：从功能思维走向系统思维",
    sideResult: "成果：落地核心设计器与文件模板底座"
  }
];
const DEFAULT_TAG_CARD_MAP = {
  "长今富豪集团 唯一继承人": {
    title: "长今富豪集团 唯一继承人",
    description: "主打一个底气在线。遇事先稳住，再把排面和温柔都给到位。",
    image: "./assets/images/home-hero/night-couple.png.webp"
  },
  "库里南车主预备役": {
    title: "库里南车主预备役",
    description: "梦想清单里写着「豪车」也写着「自由」。把愿望变成计划，是我的日常快乐。",
    image: "./assets/images/home-hero/night-girl.png.webp"
  },
  "产品捣蛋鬼 × 未来女总裁": {
    title: "产品捣蛋鬼 × 未来女总裁",
    description: "一边拆问题，一边搭系统。把天马行空落成可交付，是我最上头的事。",
    image: "./assets/images/home-hero/微信图片_20260412120634_62_154.png.webp"
  },
  "95 摩羯 INFJ": {
    title: "95 摩羯 INFJ",
    description: "外冷内热，理想和现实都不放手。温柔有锋芒，慢热但有力量。",
    image: "./assets/images/home-hero/day-girl.jpg.webp"
  },
  自由追光者: {
    title: "自由追光者",
    description: "追风、追光、追喜欢的生活感。今天也要向着更开阔的世界前进。",
    image: "./assets/images/present/present-03.jpg.webp"
  },
  "清醒小甜妹": {
    title: "清醒小甜妹",
    description: "甜是表达方式，清醒是底层逻辑。既能温柔，也能果断。",
    image: "./assets/images/present/present-08.jpg.webp"
  },
  "请我喝奶茶吗": {
    title: "请我喝奶茶吗",
    description: "快乐很简单，一杯奶茶就能续命。欢迎随时发起投喂邀请。",
    image: "./assets/images/home-hero/day-girl.jpg.webp"
  }
};
let tagCardMap = { ...DEFAULT_TAG_CARD_MAP };

function showToast(text, duration) {
  if (!toast) return;
  if (toastTimer) window.clearTimeout(toastTimer);
  toast.textContent = text;
  toast.classList.add("show");
  const autoDuration = 2000;
  toastTimer = window.setTimeout(() => toast.classList.remove("show"), autoDuration);
}

function syncMusicControls() {
  if (!bgm) return;
  const isPlaying = !bgm.paused;
  if (isPlaying) musicHasPlayedOnce = true;

  if (musicFloatBtn) {
    musicFloatBtn.classList.toggle("playing", isPlaying);
    musicFloatBtn.setAttribute("aria-pressed", isPlaying ? "true" : "false");
    musicFloatBtn.setAttribute("aria-label", isPlaying ? "暂停背景音乐" : "播放背景音乐");
  }

  if (musicFloatText) {
    if (isPlaying) {
      musicFloatText.textContent = "播放中 点暂停";
    } else {
      musicFloatText.textContent = musicHasPlayedOnce ? "已暂停 点继续" : "点我播放";
    }
  }
}

function hideCatAssistantReply() {
  if (!catChatPop) return;
  if (catChatFollowRaf) {
    window.cancelAnimationFrame(catChatFollowRaf);
    catChatFollowRaf = null;
  }
  catChatAnchor = null;
  catChatPop.classList.remove("show", "typing");
  catChatPop.classList.remove("from-left-cat", "from-right-cat");
  catChatPop.setAttribute("aria-hidden", "true");
}

function positionCatChatPop(anchorNode) {
  if (!catChatPop || !anchorNode) return;
  const anchorRect = anchorNode.getBoundingClientRect();
  const popRect = catChatPop.getBoundingClientRect();
  const margin = 10;
  const anchorCenterX = anchorRect.left + anchorRect.width / 2;
  const anchorCenterY = anchorRect.top + anchorRect.height * 0.45;
  const preferLeftAnchor = anchorCenterX < window.innerWidth / 2;
  let left = preferLeftAnchor
    ? anchorRect.right + 12
    : anchorRect.left - popRect.width - 12;
  let top = anchorCenterY - popRect.height * 0.45;

  if (top < 72) top = 72;
  if (left < margin) left = margin;
  if (left + popRect.width > window.innerWidth - margin) {
    left = window.innerWidth - popRect.width - margin;
  }

  const arrowMin = 18;
  const arrowMax = Math.max(arrowMin, popRect.height - 18);
  const arrowY = Math.min(arrowMax, Math.max(arrowMin, anchorCenterY - top));

  catChatPop.style.left = `${left}px`;
  catChatPop.style.top = `${top}px`;
  catChatPop.style.setProperty("--chat-arrow-y", `${arrowY}px`);
  catChatPop.classList.toggle("from-left-cat", preferLeftAnchor);
  catChatPop.classList.toggle("from-right-cat", !preferLeftAnchor);
}

function startCatChatFollow(anchorNode) {
  if (!catChatPop || !anchorNode) return;
  if (catChatFollowRaf) {
    window.cancelAnimationFrame(catChatFollowRaf);
    catChatFollowRaf = null;
  }

  catChatAnchor = anchorNode;
  const tick = () => {
    if (!catChatAnchor || !catChatPop.classList.contains("show")) return;
    positionCatChatPop(catChatAnchor);
    catChatFollowRaf = window.requestAnimationFrame(tick);
  };
  tick();
}

function showCatAssistantReply(anchorNode, payload) {
  if (!catChatPop || !catChatText || !payload) {
    showToast(payload?.text || "呆呆：我在这里陪你。", 5200);
    return;
  }

  const { title, text } = payload;
  if (!text) return;
  if (catChatTitle) {
    catChatTitle.textContent = title || "呆呆在线";
  }

  if (catChatTypingTimer) window.clearInterval(catChatTypingTimer);
  if (catChatHideTimer) window.clearTimeout(catChatHideTimer);

  catChatText.textContent = "";
  catChatPop.classList.add("show", "typing");
  catChatPop.setAttribute("aria-hidden", "false");
  startCatChatFollow(anchorNode);

  let index = 0;
  const typingSpeed = 24;
  catChatTypingTimer = window.setInterval(() => {
    index += 1;
    catChatText.textContent = text.slice(0, index);
    if (index < text.length) return;
    window.clearInterval(catChatTypingTimer);
    catChatTypingTimer = null;
    catChatPop.classList.remove("typing");
    catChatHideTimer = window.setTimeout(() => {
      hideCatAssistantReply();
      catChatHideTimer = null;
    }, 2600);
  }, typingSpeed);
}

function mergeTagCardMap(source) {
  if (!source || typeof source !== "object" || Array.isArray(source)) return;
  Object.entries(source).forEach(([tag, value]) => {
    if (!value || typeof value !== "object" || Array.isArray(value)) return;
    tagCardMap[tag] = {
      ...(DEFAULT_TAG_CARD_MAP[tag] || {}),
      ...value
    };
  });
}

function warmImageAsset(src, priority = "low") {
  const normalized = typeof src === "string" ? src.trim() : "";
  if (!normalized) return Promise.resolve(false);
  if (imageWarmDone.has(normalized)) return Promise.resolve(true);
  if (imageWarmPromises.has(normalized)) return imageWarmPromises.get(normalized);

  const pending = new Promise((resolve) => {
    const img = new Image();
    img.decoding = "async";
    if ("fetchPriority" in img) {
      img.fetchPriority = priority;
    }
    img.onload = () => {
      imageWarmDone.add(normalized);
      resolve(true);
    };
    img.onerror = () => {
      resolve(false);
    };
    img.src = normalized;
  });

  imageWarmPromises.set(normalized, pending);
  pending.finally(() => {
    if (!imageWarmDone.has(normalized)) {
      imageWarmPromises.delete(normalized);
    }
  });
  return pending;
}

async function loadTagCards() {
  try {
    const response = await fetch("./content/tag-cards.json", { cache: "no-store" });
    if (!response.ok) return;
    const remoteMap = await response.json();
    mergeTagCardMap(remoteMap);
  } catch (error) {
    // Use defaults when local content file is unavailable.
  }
}

function setActiveNav() {
  const current = sections.find((section) => {
    const rect = section.getBoundingClientRect();
    return rect.top <= 180 && rect.bottom >= 200;
  });

  if (!current) return;
  navLinks.forEach((link) => {
    const isCurrent = link.getAttribute("href") === `#${current.id}`;
    link.classList.toggle("active", isCurrent);
    if (isCurrent) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });
}

function createDust() {
  if (!skyDust || prefersReducedMotion.matches) return;
  const total = 26;
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < total; i += 1) {
    const dust = document.createElement("span");
    dust.className = "dust";
    const size = Math.random() * 2.8 + 1.2;
    dust.style.width = `${size}px`;
    dust.style.height = `${size}px`;
    dust.style.left = `${Math.random() * 100}%`;
    dust.style.bottom = `${Math.random() * -100}px`;
    dust.style.animationDuration = `${Math.random() * 10 + 14}s`;
    dust.style.animationDelay = `${Math.random() * 7}s`;
    fragment.appendChild(dust);
  }
  skyDust.appendChild(fragment);
}

function buildStaggerText() {
  staggerNodes.forEach((node, idx) => {
    const rawText = node.dataset.text || node.textContent || "";
    if (prefersReducedMotion.matches) {
      node.textContent = rawText;
      return;
    }
    node.innerHTML = "";
    const baseDelay = Number(node.dataset.startDelay || idx * 0.45);
    const charDelay = Number(node.dataset.charDelay || 0.1);

    let step = 0;
    [...rawText].forEach((char) => {
      if (char === "\n") {
        node.appendChild(document.createElement("br"));
        return;
      }

      const unit = document.createElement("span");
      unit.className = "mist-char";
      unit.textContent = char === " " ? "\u00A0" : char;
      unit.style.animationDelay = `${baseDelay + step * charDelay}s`;
      node.appendChild(unit);
      step += 1;
    });
  });
}

function tuneCloudFloating() {
  if (document.querySelector(".home-cloud-track")) return;
  cloudBubbles.forEach((bubble, idx) => {
    if (prefersReducedMotion.matches) {
      bubble.style.animation = "none";
      return;
    }
    const duration = 18 + Math.random() * 8;
    const delay = idx * 0.8;
    bubble.style.animationDuration = `${duration}s`;
    bubble.style.animationDelay = `${delay}s`;
  });
}

function renderMusicLyrics(lines) {
  if (!musicLyricTrack) return;
  const source = Array.isArray(lines) && lines.length > 0 ? lines : DEFAULT_MUSIC_LYRICS;
  const normalized = source
    .map((item) => (typeof item === "string" ? item.trim() : ""))
    .filter(Boolean)
    .slice(0, 24);
  if (normalized.length === 0) return;

  const loops = [...normalized, ...normalized];
  musicLyricTrack.innerHTML = "";
  loops.forEach((line) => {
    const node = document.createElement("span");
    node.className = "music-lyric-item";
    node.textContent = `♪ ${line} ♪`;
    musicLyricTrack.appendChild(node);
  });
}

async function initMusicLyrics() {
  renderMusicLyrics(DEFAULT_MUSIC_LYRICS);
  try {
    const response = await fetch("./content/music-lyrics.json", { cache: "no-store" });
    if (!response.ok) return;
    const remoteData = await response.json();
    const remoteLyrics = Array.isArray(remoteData) ? remoteData : remoteData?.lyrics;
    renderMusicLyrics(remoteLyrics);
  } catch (error) {
    // Keep default lyrics when local content file is unavailable.
  }
}

async function initHeroCarousel() {
  if (!heroMainImage || prefersReducedMotion.matches) return;

  const deduped = heroImageCandidates.filter((item, idx, arr) => arr.findIndex((x) => x.src === item.src) === idx);
  const slides = deduped.length > 0 ? deduped : [heroImageCandidates[0]];
  if (slides.length <= 1) return;
  const loadedMap = new Map();
  const initialSrc = heroMainImage.getAttribute("src") || slides[0].src;
  loadedMap.set(initialSrc, true);

  let currentIdx = Math.max(
    0,
    slides.findIndex((item) => item.src === heroMainImage.getAttribute("src"))
  );
  let isSwitching = false;

  const ensureLoaded = (nextSlide) => {
    if (loadedMap.get(nextSlide.src)) return Promise.resolve(true);
    return new Promise((resolve) => {
      const temp = new Image();
      temp.decoding = "async";
      if ("fetchPriority" in temp) temp.fetchPriority = "low";
      temp.onload = () => {
        loadedMap.set(nextSlide.src, true);
        resolve(true);
      };
      temp.onerror = () => resolve(false);
      temp.src = nextSlide.src;
    });
  };

  const switchTo = async (nextIdx) => {
    if (isSwitching) return;
    const nextSlide = slides[nextIdx];
    const ok = await ensureLoaded(nextSlide);
    if (!ok) return;
    isSwitching = true;
    heroMainImage.classList.add("is-fading");
    if (heroPoster) heroPoster.classList.add("is-switching");

    window.setTimeout(() => {
      heroMainImage.src = nextSlide.src;
      heroMainImage.alt = nextSlide.alt;
      const settle = () => {
        heroMainImage.classList.remove("is-fading");
        if (heroPoster) heroPoster.classList.remove("is-switching");
        window.setTimeout(() => {
          isSwitching = false;
        }, 180);
      };

      if (typeof heroMainImage.decode === "function") {
        heroMainImage
          .decode()
          .catch(() => { })
          .finally(() => {
            window.requestAnimationFrame(settle);
          });
      } else {
        window.requestAnimationFrame(settle);
      }
    }, 220);
  };

  heroMainImage.addEventListener("error", () => {
    currentIdx = (currentIdx + 1) % slides.length;
    switchTo(currentIdx);
  });

  if (heroCarouselTimer) window.clearInterval(heroCarouselTimer);
  heroCarouselTimer = window.setInterval(() => {
    currentIdx = (currentIdx + 1) % slides.length;
    switchTo(currentIdx);
  }, 3600);
}

function createPresentStripCard(src, index) {
  const card = document.createElement("figure");
  card.className = "present-strip-card";

  const img = document.createElement("img");
  img.src = src;
  img.alt = `现在的我横向影像 ${index + 1}`;
  img.loading = "lazy";
  img.decoding = "async";
  if ("fetchPriority" in img) img.fetchPriority = "low";
  img.addEventListener("error", () => card.remove());

  card.appendChild(img);
  return card;
}

function renderPresentCarouselRows() {
  if (!presentRowTop || !presentRowBottom) return;

  // NOTE:
  // present-01 ~ present-04 are currently pure-black source files.
  // Use the validated visible set to keep the first row from showing black cards.
  const visibleImageOrders = [5, 6, 7, 8, 9, 10, 11, 12];
  const sources = visibleImageOrders.map((num) => {
    const order = String(num).padStart(2, "0");
    return `./assets/images/present/present-${order}.jpg.webp`;
  });

  const topList = sources.slice(0, 4);
  const bottomList = sources.slice(4, 8);

  const mountRow = (rowNode, list, className) => {
    rowNode.innerHTML = "";
    const track = document.createElement("div");
    track.className = `present-row-track ${className}`;

    for (let loop = 0; loop < 2; loop += 1) {
      list.forEach((src, idx) => {
        track.appendChild(createPresentStripCard(src, idx));
      });
    }

    rowNode.appendChild(track);
  };

  mountRow(presentRowTop, topList, "track-right");
  mountRow(presentRowBottom, bottomList, "track-left");
}

function initSocialScreenFallback() {
  if (socialScreenImages.length === 0) return;
  socialScreenImages.forEach((img) => {
    img.addEventListener("error", () => {
      const fallback = img.dataset.fallback;
      if (!fallback || img.src.endsWith(fallback.replace("./", ""))) return;
      img.src = fallback;
    });
  });
}

function spawnPresentLikeStar(originX, originY) {
  const spark = document.createElement("span");
  spark.className = "chip-spark";
  spark.textContent = ["✦", "✶", "✨", "✧"][Math.floor(Math.random() * 4)];

  const driftX = (Math.random() - 0.5) * 82;
  const driftY = (Math.random() - 0.5) * 34;
  spark.style.left = `${originX + driftX}px`;
  spark.style.top = `${originY + driftY}px`;
  spark.style.color = ["#ffd77f", "#ffe7a6", "#ffd5f0", "#fff0bd"][Math.floor(Math.random() * 4)];
  spark.style.fontSize = `${0.72 + Math.random() * 0.5}rem`;
  spark.style.animationDuration = `${0.56 + Math.random() * 0.26}s`;

  document.body.appendChild(spark);
  window.setTimeout(() => spark.remove(), 900);
}

function triggerPresentLikeBurst(originX, originY) {
  if (prefersReducedMotion.matches) {
    spawnPresentLikeStar(originX, originY);
    return;
  }

  if (presentLikeBurstTimer) {
    window.clearInterval(presentLikeBurstTimer);
    presentLikeBurstTimer = null;
  }

  const startedAt = performance.now();
  const spawnCluster = () => {
    const count = 2 + Math.floor(Math.random() * 3);
    for (let i = 0; i < count; i += 1) {
      spawnPresentLikeStar(originX, originY);
    }
  };

  spawnCluster();
  presentLikeBurstTimer = window.setInterval(() => {
    if (performance.now() - startedAt >= 2000) {
      window.clearInterval(presentLikeBurstTimer);
      presentLikeBurstTimer = null;
      return;
    }
    spawnCluster();
  }, 120);
}

function initPresentCarouselEngagement() {
  if (!presentCarouselShell) return;

  if (!presentLikeTipNode) {
    presentLikeTipNode = document.createElement("span");
    presentLikeTipNode.className = "present-like-tip";
    presentLikeTipNode.textContent = "求赞～";
    document.body.appendChild(presentLikeTipNode);
  }

  const positionLikeTip = (clientX, clientY) => {
    if (!presentLikeTipNode) return;
    presentLikeTipNode.style.left = `${clientX}px`;
    presentLikeTipNode.style.top = `${clientY - 6}px`;
  };

  const showLikeTip = () => {
    if (!presentLikeTipNode) return;
    presentLikeTipNode.classList.add("show");
  };

  const hideLikeTip = () => {
    if (!presentLikeTipNode) return;
    presentLikeTipNode.classList.remove("show");
  };

  presentCarouselShell.addEventListener("mouseenter", (event) => {
    positionLikeTip(event.clientX, event.clientY);
    showLikeTip();
  });

  presentCarouselShell.addEventListener("mousemove", (event) => {
    positionLikeTip(event.clientX, event.clientY);
  });

  presentCarouselShell.addEventListener("mouseleave", hideLikeTip);
  presentCarouselShell.addEventListener("blur", hideLikeTip, true);

  presentCarouselShell.addEventListener("pointerdown", (event) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    positionLikeTip(event.clientX, event.clientY);
    showLikeTip();
    triggerPresentLikeBurst(event.clientX, event.clientY);
  });
}

function initLifeStatusSwitch() {
  if (lifeStatusButtons.length === 0 || !lifeStatusNote) return;

  const setActiveStatus = (statusKey) => {
    const note = LIFE_STATUS_COPY[statusKey];
    if (!note) return;

    lifeStatusButtons.forEach((btn) => {
      const isActive = btn.dataset.lifeStatus === statusKey;
      btn.classList.toggle("active", isActive);
      btn.setAttribute("aria-pressed", isActive ? "true" : "false");
    });
    lifeStatusNote.textContent = note;
  };

  lifeStatusButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const statusKey = btn.dataset.lifeStatus;
      if (!statusKey) return;
      setActiveStatus(statusKey);
    });
  });

  const defaultKey = lifeStatusButtons.find((btn) => btn.classList.contains("active"))?.dataset.lifeStatus || "onroad";
  setActiveStatus(defaultKey);
}

function initFutureDanmuLayout() {
  if (futureDanmus.length === 0) return;
  const total = futureDanmus.length;

  futureDanmus.forEach((item, idx) => {
    const progress = total > 1 ? idx / (total - 1) : 0.5;
    const x = 4 + progress * 92;
    const dur = 13.6 + (idx % 5) * 0.55;
    const delay = -(idx * 0.82 + (idx % 3) * 0.35);
    const drift = 18 + (idx % 4) * 3;

    item.style.setProperty("--x", `${x.toFixed(1)}%`);
    item.style.setProperty("--dur", `${dur.toFixed(1)}s`);
    item.style.setProperty("--delay", `${delay.toFixed(1)}s`);
    item.style.setProperty("--drift", `${drift}px`);
  });
}

function inferJourneyYearMark(meta, title) {
  const years = (meta || "").match(/\d{4}/g);
  if (years && years.length > 0) return years[0];
  if ((meta || "").includes("18 岁之前")) return "成长";
  return title || "阶段";
}

function renderPastJourney(items) {
  if (!pastJourneyTrack) return;
  pastJourneyItems = items;
  pastJourneyTrack.innerHTML = "";

  items.forEach((item, idx) => {
    const card = document.createElement("article");
    card.className = "journey-card";
    card.dataset.index = String(idx);
    card.setAttribute("role", "button");
    card.setAttribute("tabindex", "0");
    card.setAttribute("aria-label", `查看${item.title}的成长彩蛋`);

    const tapTip = document.createElement("span");
    tapTip.className = "journey-tap-tip";
    tapTip.textContent = "✦ 点我拆卡";

    const yearMark = document.createElement("span");
    yearMark.className = "journey-year-mark";
    yearMark.textContent = item.yearMark || inferJourneyYearMark(item.meta, item.title);

    const sideTexts = [item.sideSkill, item.sideInsight, item.sideResult].filter(Boolean);
    const resolvedSideTexts =
      sideTexts.length > 0
        ? sideTexts
        : ["技能：待补充", "感悟：待补充", "成果：待补充"];

    const sideNotes = document.createElement("div");
    sideNotes.className = "journey-side-notes";

    resolvedSideTexts.forEach((text) => {
      const line = document.createElement("p");
      line.className = "journey-side-note";
      line.textContent = text;
      sideNotes.appendChild(line);
    });

    const visual = document.createElement("figure");
    visual.className = "journey-visual";
    const img = document.createElement("img");
    img.src = item.image;
    img.alt = `${item.title} 阶段配图`;
    img.loading = "lazy";
    img.decoding = "async";
    if ("fetchPriority" in img) img.fetchPriority = "low";
    img.addEventListener("error", () => {
      img.src = "./assets/images/past-journey/growth.jpg.webp";
    });
    visual.appendChild(img);

    const body = document.createElement("div");
    body.className = "journey-content";
    const title = document.createElement("h4");
    title.textContent = item.title;
    const meta = document.createElement("p");
    meta.className = "meta";
    meta.textContent = item.meta;
    const desc = document.createElement("p");
    desc.textContent = item.description;

    body.appendChild(title);
    body.appendChild(meta);
    body.appendChild(desc);

    card.appendChild(yearMark);
    card.appendChild(sideNotes);
    card.appendChild(tapTip);
    card.appendChild(visual);
    card.appendChild(body);
    pastJourneyTrack.appendChild(card);
  });
}

async function initPastJourney() {
  if (!pastJourneyTrack) return;
  let items = [...PAST_JOURNEY_FALLBACK];

  try {
    const response = await fetch("./content/past-journey.json", { cache: "no-store" });
    if (response.ok) {
      const remoteItems = await response.json();
      if (Array.isArray(remoteItems) && remoteItems.length > 0) {
        items = remoteItems
          .filter((item) => item && item.title && item.meta && item.description)
          .map((item) => ({
            title: item.title,
            meta: item.meta,
            description: item.description,
            image: item.image || "./assets/images/past-journey/growth.jpg.webp",
            cloudTitle: item.cloudTitle || `${item.title} 彩蛋`,
            cloudText: item.cloudText || item.description,
            cloudImage: item.cloudImage || item.image || "./assets/images/past-journey/growth.jpg.webp",
            yearMark: item.yearMark || inferJourneyYearMark(item.meta, item.title),
            sideSkill: item.sideSkill || "技能：待补充",
            sideInsight: item.sideInsight || "感悟：待补充",
            sideResult: item.sideResult || "成果：待补充"
          }));
      }
    }
  } catch (error) {
    // Keep fallback data when content file is unavailable.
  }

  renderPastJourney(items);
}

function closeJourneyCloud() {
  if (!journeyCloudOverlay) return;
  journeyCloudOverlay.classList.remove("show");
  journeyCloudOverlay.setAttribute("aria-hidden", "true");
}

function openJourneyCloud(item) {
  if (!journeyCloudOverlay || !journeyCloudImage || !journeyCloudTitle || !journeyCloudText) return;
  const title = item.cloudTitle || `${item.title} 彩蛋`;
  const text = item.cloudText || item.description || "这一段旅程，正在继续发光。";
  const image = item.cloudImage || item.image || "./assets/images/past-journey/growth.jpg.webp";

  journeyCloudTitle.textContent = title;
  journeyCloudText.textContent = text;
  journeyCloudImage.loading = "eager";
  warmImageAsset(image, "high");
  journeyCloudImage.src = image;
  journeyCloudImage.alt = `${title} 配图`;
  journeyCloudImage.onerror = () => {
    journeyCloudImage.onerror = null;
    journeyCloudImage.src = "./assets/images/past-journey/growth.jpg.webp";
  };

  journeyCloudOverlay.classList.add("show");
  journeyCloudOverlay.setAttribute("aria-hidden", "false");
}

function initJourneyCloud() {
  if (!journeyCloudOverlay || !journeyCloudCloseBtn) return;

  journeyCloudCloseBtn.addEventListener("click", closeJourneyCloud);
  journeyCloudOverlay.addEventListener("click", (event) => {
    if (event.target === journeyCloudOverlay) closeJourneyCloud();
  });

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && journeyCloudOverlay.classList.contains("show")) {
      closeJourneyCloud();
    }
  });
}

function initJourneyCardsInteraction() {
  if (!pastJourneyTrack) return;

  const openByCard = (card) => {
    const idx = Number(card.dataset.index);
    if (Number.isNaN(idx) || !pastJourneyItems[idx]) return;
    openJourneyCloud(pastJourneyItems[idx]);
  };

  const warmByCard = (card) => {
    if (!(card instanceof HTMLElement)) return;
    if (card.dataset.warmed === "1") return;
    const idx = Number(card.dataset.index);
    if (Number.isNaN(idx) || !pastJourneyItems[idx]) return;
    const item = pastJourneyItems[idx];
    const mainImage = item.image || "./assets/images/past-journey/growth.jpg.webp";
    const cloudImage = item.cloudImage || mainImage;
    card.dataset.warmed = "1";
    warmImageAsset(mainImage, "low");
    warmImageAsset(cloudImage, "high");
  };

  pastJourneyTrack.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;
    const card = target.closest(".journey-card");
    if (!card) return;
    openByCard(card);
  });

  pastJourneyTrack.addEventListener("keydown", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;
    const card = target.closest(".journey-card");
    if (!card) return;
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    openByCard(card);
  });

  pastJourneyTrack.addEventListener("pointerover", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;
    const card = target.closest(".journey-card");
    if (!card) return;
    warmByCard(card);
  });

  pastJourneyTrack.addEventListener("focusin", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;
    const card = target.closest(".journey-card");
    if (!card) return;
    warmByCard(card);
  });

  pastJourneyTrack.addEventListener("touchstart", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;
    const card = target.closest(".journey-card");
    if (!card) return;
    warmByCard(card);
  }, { passive: true });
}

async function playMusic(silent = false) {
  if (!bgm) return false;
  try {
    await bgm.play();
    syncMusicControls();
    if (!silent) showToast("背景音乐已开启");
    return true;
  } catch (error) {
    syncMusicControls();
    if (!silent) showToast(AUTOPLAY_GUIDE_TOAST);
    return false;
  }
}

async function toggleMusic() {
  if (!bgm) return;
  if (bgm.paused) {
    await playMusic(false);
    return;
  }

  bgm.pause();
  syncMusicControls();
  showToast("背景音乐已暂停");
}

async function switchTrack() {
  if (!bgm || !trackSelect) return;
  const isPlaying = !bgm.paused;
  bgm.src = trackSelect.value;
  bgm.load();
  showToast("已切换曲目");

  if (!isPlaying) {
    syncMusicControls();
    return;
  }
  try {
    await bgm.play();
    syncMusicControls();
  } catch (error) {
    syncMusicControls();
  }
}

function setupAutoPlay() {
  if (!bgm) return;
  const tryByGesture = async () => {
    if (!bgm.paused) {
      teardown();
      return;
    }
    const ok = await playMusic(true);
    if (ok) teardown();
  };

  const teardown = () => {
    window.removeEventListener("pointerdown", tryByGesture);
    window.removeEventListener("keydown", tryByGesture);
    window.removeEventListener("touchstart", tryByGesture);
  };

  window.addEventListener("pointerdown", tryByGesture);
  window.addEventListener("keydown", tryByGesture);
  window.addEventListener("touchstart", tryByGesture);

  window.setTimeout(async () => {
    const playAttempt = playMusic(true);
    playAttempt.then((ok) => {
      if (ok) teardown();
    });

    const result = await Promise.race([
      playAttempt,
      new Promise((resolve) => window.setTimeout(() => resolve("pending"), 900))
    ]);

    if (result === true) return;
    if (bgm.paused) showToast(AUTOPLAY_GUIDE_TOAST);
  }, 160);
}

function watchReveal() {
  if (prefersReducedMotion.matches) {
    revealNodes.forEach((item) => item.classList.add("visible"));
    return;
  }

  if (typeof IntersectionObserver !== "function") {
    revealNodes.forEach((item) => item.classList.add("visible"));
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealNodes.forEach((item) => io.observe(item));
}

function handleEasterEgg() {
  if (!moonBtn || !easterContent) return;
  moonClickCount += 1;

  if (moonClickCount < 5) {
    showToast(`再点 ${5 - moonClickCount} 次，解锁隐藏台词`);
    return;
  }

  easterContent.classList.add("show");
  moonBtn.textContent = "✨ 已解锁";
  moonBtn.disabled = true;
  showToast("你解锁了真正的我");
}

function drawBlindboxMessage() {
  if (blindboxPool.length === 0) blindboxPool = [...blindboxSeed];
  const idx = Math.floor(Math.random() * blindboxPool.length);
  return blindboxPool.splice(idx, 1)[0];
}

function initBlindbox() {
  if (blindboxCards.length === 0) return;
  blindboxCards.forEach((card, idx) => {
    card.addEventListener("click", () => {
      if (card.classList.contains("opened")) {
        showToast("这个盲盒已经拆开了");
        return;
      }
      const message = drawBlindboxMessage();
      const back = card.querySelector(".box-back");
      back.textContent = message;
      card.classList.add("opened");
      showToast(`盲盒 ${idx + 1} 已拆开`);
    });
  });
}

function loadRants() {
  try {
    const raw = localStorage.getItem(RANT_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    return [];
  }
}

function saveRants(items) {
  try {
    localStorage.setItem(RANT_STORAGE_KEY, JSON.stringify(items));
  } catch (error) {
    showToast("本地存储不可用，吐槽暂时无法保存");
  }
}

function formatRantTime(timestamp) {
  const time = new Date(timestamp);
  return time.toLocaleString("zh-CN", {
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  });
}

function renderRants() {
  if (!rantList) return;
  const items = loadRants();
  rantList.innerHTML = "";

  if (items.length === 0) {
    const empty = document.createElement("li");
    empty.className = "rant-empty";
    empty.textContent = "吐槽池还空着，来写第一条吧。";
    rantList.appendChild(empty);
    return;
  }

  items.forEach((item) => {
    const li = document.createElement("li");
    li.className = "rant-item";

    const meta = document.createElement("div");
    meta.className = "rant-meta";
    meta.textContent = `${item.alias || "匿名访客"} · ${formatRantTime(item.createdAt)}`;

    const text = document.createElement("p");
    text.textContent = item.text;

    const del = document.createElement("button");
    del.type = "button";
    del.className = "rant-delete";
    del.dataset.id = item.id;
    del.textContent = "删除这条";

    li.appendChild(meta);
    li.appendChild(text);
    li.appendChild(del);
    rantList.appendChild(li);
  });
}

function initRantBoard() {
  if (!rantForm || !rantAlias || !rantText || !rantList || !clearRantsBtn) return;
  renderRants();

  rantForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const text = rantText.value.trim();
    const alias = rantAlias.value.trim();
    if (!text) return;

    const current = loadRants();
    current.unshift({
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      alias,
      text,
      createdAt: Date.now()
    });

    saveRants(current.slice(0, 60));
    rantText.value = "";
    rantAlias.value = "";
    renderRants();
    showToast("已丢进吐槽池");
  });

  rantList.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;
    if (!target.classList.contains("rant-delete")) return;
    const id = target.dataset.id;
    if (!id) return;
    const current = loadRants().filter((item) => item.id !== id);
    saveRants(current);
    renderRants();
  });

  clearRantsBtn.addEventListener("click", () => {
    try {
      localStorage.removeItem(RANT_STORAGE_KEY);
    } catch (error) {
      showToast("本地存储不可用，无法清空");
    }
    renderRants();
    showToast("已清空本地吐槽");
  });
}

function closeResumeOverlay() {
  if (!resumeOverlay) return;
  if (resumeTimer) window.clearInterval(resumeTimer);
  resumeTimer = null;
  resumeOverlay.classList.remove("show");
  resumeOverlay.setAttribute("aria-hidden", "true");
}

function openResumeOverlay() {
  if (!resumeOverlay || !resumeBar || !resumeLoadingText || !resumeResult) return;
  if (resumeTimer) window.clearInterval(resumeTimer);
  resumeTimer = null;

  resumeOverlay.classList.add("show");
  resumeOverlay.setAttribute("aria-hidden", "false");
  resumeBar.style.width = "0%";
  resumeLoadingText.textContent = "加载中 0%";
  resumeResult.classList.remove("show");

  let progress = 0;
  resumeTimer = window.setInterval(() => {
    progress += Math.floor(Math.random() * 17) + 6;
    if (progress >= 100) {
      progress = 100;
      resumeBar.style.width = "100%";
      resumeLoadingText.textContent = "跳转失败 100%";
      resumeResult.classList.add("show");
      window.clearInterval(resumeTimer);
      resumeTimer = null;
      return;
    }
    resumeBar.style.width = `${progress}%`;
    resumeLoadingText.textContent = `加载中 ${progress}%`;
  }, 120);
}

function initResumeGate() {
  if (!resumeOverlay || !resumeEntryBtn || !resumeCloseBtn || !resumeBackBtn) return;
  const resumeActionNodes = [
    ...resumeOverlay.querySelectorAll(".resume-actions a, .resume-actions button")
  ];

  resumeEntryBtn.addEventListener("click", openResumeOverlay);
  resumeCloseBtn.addEventListener("click", closeResumeOverlay);
  resumeActionNodes.forEach((node) => {
    node.addEventListener("click", () => {
      closeResumeOverlay();
    });
  });

  resumeOverlay.addEventListener("click", (event) => {
    if (event.target === resumeOverlay) closeResumeOverlay();
  });

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && resumeOverlay.classList.contains("show")) {
      closeResumeOverlay();
    }
  });
}

function closeTagOverlay() {
  if (!tagOverlay) return;
  tagOverlay.classList.remove("show");
  tagOverlay.setAttribute("aria-hidden", "true");
}

function openTagOverlay(tagName) {
  if (!tagOverlay || !tagCard || !tagCardImage || !tagCardTitle || !tagCardDesc) return;
  const payload = tagCardMap[tagName] || {};
  const title = payload.title || tagName;
  const description = payload.description || "这个标签故事正在赶来路上，稍后给你补上。";
  const fallbackImage = "./assets/images/home-hero/day-girl.jpg.webp";
  const image = payload.image || fallbackImage;

  tagCardTitle.textContent = title;
  tagCardDesc.textContent = description;
  tagCardImage.loading = "eager";
  warmImageAsset(image, "high");
  tagCardImage.src = image;
  tagCardImage.alt = `${title} 标签配图`;
  tagCardImage.onerror = () => {
    tagCardImage.onerror = null;
    tagCardImage.src = fallbackImage;
  };

  tagOverlay.classList.add("show");
  tagOverlay.setAttribute("aria-hidden", "false");
  tagCard.classList.remove("deal");
  void tagCard.offsetWidth;
  tagCard.classList.add("deal");
}

function initTagCards() {
  if (chipTags.length === 0 || !tagOverlay || !tagCloseBtn) return;

  chipTags.forEach((chip) => {
    let warmed = false;
    const warmByChip = () => {
      if (warmed) return;
      warmed = true;
      const tagName = chip.dataset.tag || chip.textContent.trim();
      const payload = tagCardMap[tagName] || {};
      const image = payload.image || "./assets/images/home-hero/day-girl.jpg.webp";
      warmImageAsset(image, "high");
    };

    chip.addEventListener("pointerenter", warmByChip, { passive: true });
    chip.addEventListener("focus", warmByChip, { passive: true });
    chip.addEventListener("touchstart", warmByChip, { passive: true });

    chip.addEventListener("click", () => {
      const tagName = chip.dataset.tag || chip.textContent.trim();
      openTagOverlay(tagName);
    });
  });

  tagCloseBtn.addEventListener("click", closeTagOverlay);
  tagOverlay.addEventListener("click", (event) => {
    if (event.target === tagOverlay) closeTagOverlay();
  });

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && tagOverlay.classList.contains("show")) {
      closeTagOverlay();
    }
  });
}

function initChipHoverMagic() {
  const cursorStar = document.createElement("span");
  cursorStar.className = "chip-cursor-star";
  cursorStar.textContent = "✦";
  document.body.appendChild(cursorStar);

  let lastSparkAt = 0;

  const hideCursorStar = (force = false) => {
    if (!force && "ontouchstart" in window) return;
    cursorStar.classList.remove("show");
  };

  const moveCursorStar = (event) => {
    if (event.pointerType === "touch") return;
    cursorStar.classList.add("show");
    cursorStar.style.left = `${event.clientX + 14}px`;
    cursorStar.style.top = `${event.clientY - 10}px`;

    if (prefersReducedMotion.matches) return;
    const now = performance.now();
    if (now - lastSparkAt < 82) return;
    lastSparkAt = now;

    const spark = document.createElement("span");
    spark.className = "chip-spark";
    spark.textContent = "✦";
    spark.style.left = `${event.clientX}px`;
    spark.style.top = `${event.clientY}px`;
    document.body.appendChild(spark);
    window.setTimeout(() => spark.remove(), 700);
  };

  window.addEventListener("pointermove", moveCursorStar, { passive: true });
  window.addEventListener("pointerdown", moveCursorStar, { passive: true });
  window.addEventListener("pointerleave", () => hideCursorStar(true));
  window.addEventListener("scroll", () => hideCursorStar(true), { passive: true });
  window.addEventListener("blur", () => hideCursorStar(true));
}

function initHomeEntrance() {
  const targets = [
    document.querySelector(".hero-title"),
    document.querySelector(".name-main"),
    document.querySelector(".self-intro"),
    document.querySelector(".narration"),
    document.querySelector(".opening-copy"),
    document.querySelector(".chip-guidance"),
    document.querySelector(".chips"),
    heroMainImage,
    ...document.querySelectorAll(".mini-card")
  ].filter(Boolean);

  targets.forEach((node, idx) => {
    node.classList.add("home-enter-item");
    node.style.setProperty("--enter-delay", `${0.08 + idx * 0.08}s`);
  });

  window.requestAnimationFrame(() => {
    targets.forEach((node) => node.classList.add("in"));
  });
}

function watchCodeEaster() {
  if (!easterCode) return;
  window.addEventListener("keydown", (event) => {
    if (!/^[a-z]$/i.test(event.key)) return;
    secretCode = `${secretCode}${event.key.toUpperCase()}`.slice(-4);
    if (secretCode !== "IMSB") return;
    easterCode.classList.add("show");
    showToast("IMSB 密码已解锁");
  });
}

function bindCatCompanion() {
  if (!catFriends.length) return;

  catFriends.forEach((catNode) => {
    catNode.addEventListener("click", () => {
      const payload = CAT_CHAT_MESSAGES[catNode.id];
      if (payload) {
        showCatAssistantReply(catNode, payload);
        return;
      }
      showToast(catNode.dataset.catToast || "呆呆：我在这里陪你。", 3200);
    });
  });
}

window.addEventListener("scroll", setActiveNav, { passive: true });
if (musicFloatBtn) musicFloatBtn.addEventListener("click", toggleMusic);
if (moonBtn) moonBtn.addEventListener("click", handleEasterEgg);
if (trackSelect) trackSelect.addEventListener("change", switchTrack);
if (projectEntryBtn) projectEntryBtn.addEventListener("click", () => showToast("这里先留个悬念，代表作正在悄悄打磨中～"));

if (bgm && trackSelect) {
  bgm.src = trackSelect.value;
  bgm.volume = 0.8;
}
if (bgm) {
  bgm.addEventListener("play", syncMusicControls);
  bgm.addEventListener("pause", syncMusicControls);
}
syncMusicControls();
loadTagCards();
buildStaggerText();
tuneCloudFloating();
createDust();
renderPresentCarouselRows();
initPresentCarouselEngagement();
initSocialScreenFallback();
initLifeStatusSwitch();
initFutureDanmuLayout();
initPastJourney();
setActiveNav();
watchReveal();
watchCodeEaster();
bindCatCompanion();
initBlindbox();
initRantBoard();
initResumeGate();
initTagCards();
initChipHoverMagic();
initJourneyCloud();
initJourneyCardsInteraction();
initHomeEntrance();
initHeroCarousel();
setupAutoPlay();
