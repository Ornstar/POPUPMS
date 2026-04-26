(() => {
const CONFIG = {
  IMAGES: [
    "http://plcl.me/images/c7RTL.png",
    "http://plcl.me/images/23msA.jpg",
  ],
  OVERLAY_ID: "IMG_ONLY_POPUP",
  CLOSE_ID:   "IMG_ONLY_CLOSE",
  INTERVAL:   3000
};

let isShown = false;
let currentIndex = 0;
let sliderInterval;

const injectCSS = () => {
  if (document.getElementById("IMG_ONLY_STYLE")) return;
  const style = document.createElement("style");
  style.id = "IMG_ONLY_STYLE";
  style.textContent = `
    @keyframes overlayIn {
      from { opacity: 0; }
      to   { opacity: 1; }
    }
    @keyframes popupEntrance {
      0%   { opacity: 0; transform: scale(0.78) translateY(30px); }
      60%  { opacity: 1; transform: scale(1.03) translateY(-4px); }
      80%  { transform: scale(0.98) translateY(2px); }
      100% { transform: scale(1) translateY(0); }
    }
    @keyframes floatAnim {
      0%,100% { transform: translateY(0px); }
      25%     { transform: translateY(-6px); }
      75%     { transform: translateY(4px); }
    }
    @keyframes pulseGlow {
      0%,100% { box-shadow: 0 0 18px 2px rgba(80,120,255,0.22), 0 8px 40px rgba(0,0,0,0.4); }
      50%     { box-shadow: 0 0 32px 6px rgba(80,180,255,0.35), 0 12px 48px rgba(0,0,0,0.5); }
    }
    @keyframes btnShimmer {
      0%   { background-position: -200% center; }
      100% { background-position:  200% center; }
    }
    @keyframes dotPulse {
      0%,100% { opacity: 0.4; transform: scale(1);   }
      50%     { opacity: 1;   transform: scale(1.4); }
    }

    /* OVERLAY — sama persis struktur script lama kamu */
    #IMG_ONLY_POPUP {
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,0.75);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 999999;
      animation: overlayIn 0.4s ease;
    }

    /* BOX */
    .popup-box {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background: rgba(15,20,50,0.95);
      border: 1px solid rgba(255,255,255,0.14);
      border-radius: 20px;
      padding: 18px 18px 14px;
      width: 530px;
      max-width: 93vw;
      box-sizing: border-box;
      position: relative;
      animation:
        popupEntrance 0.65s cubic-bezier(0.34,1.56,0.64,1) forwards,
        floatAnim     5s ease-in-out 1.2s infinite,
        pulseGlow     3s ease-in-out 1s infinite;
    }

    /* BADGE */
    .popup-badge {
      font-size: 10px;
      font-weight: 700;
      letter-spacing: 1.5px;
      text-transform: uppercase;
      color: rgba(120,200,255,0.9);
      background: rgba(80,160,255,0.12);
      border: 1px solid rgba(80,160,255,0.25);
      border-radius: 999px;
      padding: 3px 14px;
      margin-bottom: 10px;
    }

    /* SLIDER WRAP */
    .slider-wrap {
      position: relative;
      width: 100%;
      border-radius: 14px;
      overflow: hidden;
      background: rgba(0,0,0,0.3);
      margin-bottom: 10px;
    }

    /* GAMBAR */
    .slider-wrap img {
      width: 100%;
      height: 400px;
      object-fit: contain;
      display: block;
      border-radius: 14px;
      transition: opacity 0.45s ease;
    }

    /* OVERLAY GRADIENT GAMBAR */
    .slider-grad {
      position: absolute;
      inset: 0;
      background: linear-gradient(to top, rgba(0,0,0,0.3) 0%, transparent 45%);
      pointer-events: none;
      border-radius: 14px;
    }

    /* TOMBOL NAVIGASI */
    .nav-btn {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      width: 32px;
      height: 32px;
      background: rgba(255,255,255,0.12);
      border: 1px solid rgba(255,255,255,0.22);
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
    .nav-btn:hover { background: rgba(255,255,255,0.22); transform: translateY(-50%) scale(1.12); }
    .nav-btn.left  { left: 8px; }
    .nav-btn.right { right: 8px; }

    /* DOTS */
    .popup-dots {
      display: flex;
      gap: 6px;
      margin-bottom: 12px;
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

    /* TOMBOL TUTUP */
    #IMG_ONLY_CLOSE {
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
    }
    #IMG_ONLY_CLOSE:hover  { transform: scale(1.03); opacity: 0.9; }
    #IMG_ONLY_CLOSE:active { transform: scale(0.97); }

    .popup-caption {
      font-size: 11px;
      color: rgba(255,255,255,0.35);
      margin-top: 8px;
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
      <span class="nav-btn left">&#10094;</span>
      <img id="popup-img" src="${CONFIG.IMAGES[0]}" />
      <div class="slider-grad"></div>
      <span class="nav-btn right">&#10095;</span>
    </div>
    <div class="popup-dots"></div>
    <button id="${CONFIG.CLOSE_ID}">✕ &nbsp; KLIK UNTUK MENUTUP</button>
    <div class="popup-caption">Klik di luar untuk menutup</div>
  </div>
</div>
`;

const goTo = (n) => {
  currentIndex = (n + CONFIG.IMAGES.length) % CONFIG.IMAGES.length;
  const img = document.getElementById("popup-img");
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
  const overlay = document.getElementById(CONFIG.OVERLAY_ID);
  if (!overlay) return;
  overlay.style.transition = "opacity 0.35s";
  overlay.style.opacity = "0";
  setTimeout(() => { overlay.remove(); stopSlider(); isShown = false; }, 360);
};

const showPopup = () => {
  if (isShown) return;
  injectCSS();
  document.body.insertAdjacentHTML("beforeend", renderHTML());
  isShown = true;
  currentIndex = 0;

  buildDots();
  startSlider();

  document.querySelector(".nav-btn.right").onclick = (e) => { e.stopPropagation(); nextSlide(); stopSlider(); };
  document.querySelector(".nav-btn.left").onclick  = (e) => { e.stopPropagation(); prevSlide(); stopSlider(); };
  document.getElementById(CONFIG.CLOSE_ID).onclick = (e) => { e.stopPropagation(); closePopup(); };

  // ✅ Klik di luar popup-box = tutup (sama seperti script lama kamu)
  document.getElementById(CONFIG.OVERLAY_ID).onclick = (e) => {
    if (e.target.id === CONFIG.OVERLAY_ID) closePopup();
  };
};

document.readyState === "loading"
  ? document.addEventListener("DOMContentLoaded", showPopup)
  : showPopup();
})();
