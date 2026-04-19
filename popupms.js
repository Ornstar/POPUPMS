(() => {
const CONFIG = {
  IMAGES: [
    "http://plcl.me/images/eCCez.png",
    "http://plcl.me/images/fNfUA.jpg",
  ],
  OVERLAY_ID: "IMG_POPUP",
  CLOSE_ID: "IMG_CLOSE",
  INTERVAL: 3000,
  HOME_PATHS: ["/", "/home", "/index", "/index.html", "/index.php"]
};

const isHomePage = () => {
  const path = window.location.pathname.toLowerCase().replace(/\/$/, "") || "/";
  return CONFIG.HOME_PATHS.some(p => {
    const normalized = p.toLowerCase().replace(/\/$/, "") || "/";
    return path === normalized;
  });
};

if (!isHomePage()) return;

let isShown = false;
let currentIndex = 0;
let sliderInterval;

// ✅ Target LANGSUNG div.main.nav-wrapper dari inspector
const getNavbarBottom = () => {
  // Selector persis dari inspector kamu
  const targets = [
    "div.main.nav-wrapper",
    ".main.nav-wrapper",
    ".header-wrapper",
    "div.header-wrapper"
  ];
  for (const sel of targets) {
    const el = document.querySelector(sel);
    if (el) {
      const rect = el.getBoundingClientRect();
      if (rect.height > 0) return rect.top + rect.height;
    }
  }
  // Fallback nilai dari inspector kamu: 126.81px
  return 127;
};

const injectCSS = () => {
  if (document.getElementById("IMG_STYLE")) return;
  const style = document.createElement("style");
  style.id = "IMG_STYLE";
  style.textContent = `
    @keyframes popupEntrance {
      0%   { opacity: 0; transform: translateX(-50%) scale(0.78) translateY(20px); }
      60%  { opacity: 1; transform: translateX(-50%) scale(1.03) translateY(-4px); }
      80%  { transform: translateX(-50%) scale(0.98) translateY(2px); }
      100% { transform: translateX(-50%) scale(1) translateY(0); }
    }
    @keyframes floatAnim {
      0%,100% { margin-top: 0px; }
      25%      { margin-top: -5px; }
      75%      { margin-top: 3px; }
    }
    @keyframes pulseGlow {
      0%,100% { box-shadow: 0 0 18px 2px rgba(80,120,255,0.25), 0 8px 40px rgba(0,0,0,0.35); }
      50%      { box-shadow: 0 0 32px 6px rgba(80,180,255,0.38), 0 12px 48px rgba(0,0,0,0.45); }
    }
    @keyframes btnShimmer {
      0%   { background-position: -200% center; }
      100% { background-position:  200% center; }
    }
    @keyframes dotPulse {
      0%,100% { opacity: 0.4; transform: scale(1);   }
      50%      { opacity: 1;   transform: scale(1.4); }
    }

    #IMG_POPUP {
      position: fixed;
      left: 50%;
      transform: translateX(-50%);
      /* top di-set via JS tepat di bawah nav-wrapper */
      z-index: 999;
      pointer-events: none;
      animation: popupEntrance 0.65s cubic-bezier(0.34,1.56,0.64,1) forwards;
    }

    .popup-box {
      pointer-events: auto;
      position: relative;
      background: rgba(15, 20, 50, 0.95);
      backdrop-filter: blur(24px);
      -webkit-backdrop-filter: blur(24px);
      border: 1px solid rgba(255,255,255,0.14);
      border-radius: 20px;
      padding: 18px 18px 16px;
      width: 530px;
      max-width: 94vw;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      text-align: center;
      animation:
        floatAnim  5s ease-in-out 1s infinite,
        pulseGlow  3s ease-in-out 0.8s infinite;
    }
    .popup-box::before {
      content: '';
      position: absolute;
      inset: 0;
      border-radius: 20px;
      background: linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 50%, rgba(255,255,255,0.02) 100%);
      pointer-events: none;
    }

    .popup-badge {
      display: inline-block;
      font-size: 10px;
      font-weight: 600;
      letter-spacing: 1.5px;
      text-transform: uppercase;
      color: rgba(120,200,255,0.9);
      background: rgba(80,160,255,0.12);
      border: 1px solid rgba(80,160,255,0.25);
      border-radius: 999px;
      padding: 3px 12px;
      margin-bottom: 10px;
      flex-shrink: 0;
    }

    .slider-wrap {
      position: relative;
      border-radius: 14px;
      overflow: hidden;
      background: rgba(0,0,0,0.3);
      margin-bottom: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .slider-wrap img {
      width: 100%;
      height: 380px;
      object-fit: contain;
      object-position: center;
      display: block;
      border-radius: 14px;
      transition: opacity 0.45s ease;
    }
    .slider-overlay-grad {
      position: absolute;
      inset: 0;
      background: linear-gradient(to top, rgba(0,0,0,0.3) 0%, transparent 40%);
      border-radius: 14px;
      pointer-events: none;
    }

    .nav {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      width: 32px;
      height: 32px;
      background: rgba(255,255,255,0.12);
      border: 1px solid rgba(255,255,255,0.2);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      color: white;
      font-size: 13px;
      user-select: none;
      backdrop-filter: blur(8px);
      transition: background 0.2s, transform 0.2s;
      z-index: 2;
    }
    .nav:hover { background: rgba(255,255,255,0.22); transform: translateY(-50%) scale(1.12); }
    .nav.left  { left: 8px; }
    .nav.right { right: 8px; }

    .popup-dots {
      display: flex;
      justify-content: center;
      gap: 6px;
      margin-bottom: 10px;
      flex-shrink: 0;
    }
    .popup-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: rgba(255,255,255,0.25);
      cursor: pointer;
      transition: all 0.3s;
    }
    .popup-dot.active {
      background: rgba(100,180,255,0.95);
      width: 18px;
      border-radius: 999px;
      animation: dotPulse 1.8s ease-in-out infinite;
    }

    #IMG_CLOSE {
      display: block;
      width: 100%;
      padding: 10px 0;
      border: none;
      border-radius: 12px;
      font-size: 13px;
      font-weight: 700;
      letter-spacing: 0.5px;
      cursor: pointer;
      color: #fff;
      background: linear-gradient(90deg, #1a73e8 0%, #00c6ff 50%, #1a73e8 100%);
      background-size: 200% auto;
      animation: btnShimmer 2.5s linear infinite;
      transition: transform 0.2s, opacity 0.2s;
      flex-shrink: 0;
    }
    #IMG_CLOSE:hover  { transform: scale(1.03); opacity: 0.9; }
    #IMG_CLOSE:active { transform: scale(0.97); }

    .popup-caption {
      font-size: 11px;
      color: rgba(255,255,255,0.35);
      margin-top: 8px;
      letter-spacing: 0.3px;
      flex-shrink: 0;
    }
  `;
  document.head.appendChild(style);
};

const buildDots = () => {
  const wrap = document.querySelector(".popup-dots");
  if (!wrap) return;
  wrap.innerHTML = "";
  CONFIG.IMAGES.forEach((_, i) => {
    const d = document.createElement("span");
    d.className = "popup-dot" + (i === 0 ? " active" : "");
    d.onclick = () => { goTo(i); stopSlider(); };
    wrap.appendChild(d);
  });
};

const updateDots = () => {
  document.querySelectorAll(".popup-dot").forEach((d, i) => {
    d.className = "popup-dot" + (i === currentIndex ? " active" : "");
  });
};

const renderHTML = () => `
<div id="${CONFIG.OVERLAY_ID}">
  <div class="popup-box">
    <div class="popup-badge">✦ Penawaran Eksklusif</div>
    <div class="slider-wrap">
      <span class="nav left">&#10094;</span>
      <img id="popup-image" src="${CONFIG.IMAGES[0]}" />
      <div class="slider-overlay-grad"></div>
      <span class="nav right">&#10095;</span>
    </div>
    <div class="popup-dots"></div>
    <button id="${CONFIG.CLOSE_ID}">✕ &nbsp; Tutup</button>
    <div class="popup-caption">Klik di luar untuk menutup</div>
  </div>
</div>
`;

const goTo = (n) => {
  currentIndex = (n + CONFIG.IMAGES.length) % CONFIG.IMAGES.length;
  const img = document.getElementById("popup-image");
  img.style.opacity = 0;
  setTimeout(() => {
    img.src = CONFIG.IMAGES[currentIndex];
    img.style.opacity = 1;
    updateDots();
  }, 220);
};

const nextSlide = () => goTo(currentIndex + 1);
const prevSlide = () => goTo(currentIndex - 1);
const startSlider = () => { sliderInterval = setInterval(nextSlide, CONFIG.INTERVAL); };
const stopSlider  = () => { clearInterval(sliderInterval); };

const closePopup = () => {
  const popup = document.getElementById(CONFIG.OVERLAY_ID);
  if (!popup) return;
  popup.style.transition = "opacity 0.35s, transform 0.35s";
  popup.style.opacity = "0";
  popup.style.transform = "translateX(-50%) scale(0.85)";
  setTimeout(() => {
    popup.remove();
    stopSlider();
    isShown = false;
    document.removeEventListener("click", onDocumentClick, true);
  }, 360);
};

const onDocumentClick = (e) => {
  const popup = document.getElementById(CONFIG.OVERLAY_ID);
  if (!popup) return;
  const box = popup.querySelector(".popup-box");
  if (box && !box.contains(e.target)) closePopup();
};

const setPopupPosition = () => {
  const popup = document.getElementById(CONFIG.OVERLAY_ID);
  if (!popup) return;
  const navBottom = getNavbarBottom();
  popup.style.top = (navBottom + 8) + "px";
};

const showPopup = () => {
  if (isShown) return;
  injectCSS();
  document.body.insertAdjacentHTML("beforeend", renderHTML());
  isShown = true;
  currentIndex = 0;

  // Set posisi langsung, lalu cek ulang setelah 300ms & 800ms
  // (kadang navbar Angular/framework render lambat)
  setPopupPosition();
  setTimeout(setPopupPosition, 300);
  setTimeout(setPopupPosition, 800);

  buildDots();
  startSlider();

  document.querySelector(".nav.right").onclick = (e) => { e.stopPropagation(); nextSlide(); stopSlider(); };
  document.querySelector(".nav.left").onclick  = (e) => { e.stopPropagation(); prevSlide(); stopSlider(); };
  document.getElementById(CONFIG.CLOSE_ID).onclick = (e) => { e.stopPropagation(); closePopup(); };

  setTimeout(() => { document.addEventListener("click", onDocumentClick, true); }, 600);
};

document.readyState === "loading"
  ? document.addEventListener("DOMContentLoaded", showPopup)
  : showPopup();
})();
