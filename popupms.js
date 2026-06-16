(() => {
"use strict";

/* ================= CONFIG ================= */
const BTN1_URL = "https://speed-ly.com/WHATSAPP_OFFICIAL_MAUPOKER";
const BTN2_URL = "https://speed-ly.com/PengaduanMemberMauPoker";
const BTN3_URL = "https://speed-ly.com/MAUPOKER_GROUP";
const BTN4_URL = "https://speed-ly.com/APK_WEB_MAUPOKER";

const SLIDES = [
  "http://plcl.me/images/Mk3qe.png",
  "http://plcl.me/images/3xzU2.jpg"
];

/* ================= STYLE ================= */
function injectStyle() {
  if (document.getElementById("popup_pasjackpot")) return;

  const style = document.createElement("style");
  style.id = "popup_pasjackpot";

  style.textContent = `

    @keyframes shineMove {
      0%   { left: -120% }
      100% { left:  120% }
    }
    @keyframes hotPulse {
      0%,100% { transform: scale(1) }
      50%      { transform: scale(1.22) }
    }

    /* Masuk */
    @keyframes popupEnter {
      0%   { opacity: 0; transform: translateY(28px) scale(0.8); }
      60%  { opacity: 1; transform: translateY(-5px)  scale(1.03); }
      80%  {             transform: translateY(2px)   scale(0.98); }
      100% { opacity: 1; transform: translateY(0)     scale(1);    }
    }

    /*
      Float — HANYA translateY dalam px bulat.
      Gerakan kecil (±6px) agar masuk dalam padding buffer 20px
      sehingga tepi GPU layer TIDAK pernah bergerak.
    */
    @keyframes popupFloat {
      0%,100% { transform: translateY(0px); }
      30%      { transform: translateY(-6px); }
      70%      { transform: translateY(6px);  }
    }

    /* Keluar */
    @keyframes popupExit {
      0%   { opacity: 1; transform: translateY(0)    scale(1);    }
      100% { opacity: 0; transform: translateY(16px) scale(0.82); }
    }

    @keyframes bgShimmer {
      0%,100% { background-position: 0% 50%; }
      50%      { background-position: 100% 50%; }
    }
    @keyframes borderGlow {
      0%,100% {
        box-shadow: 0 0 18px 2px rgba(200,148,12,0.45),
                    0 24px 60px rgba(0,0,0,0.85);
      }
      50% {
        box-shadow: 0 0 38px 8px rgba(232,185,40,0.82),
                    0 24px 60px rgba(0,0,0,0.85);
      }
    }
    @keyframes btnFloat {
      0%,100% { transform: translateY(0); }
      50%      { transform: translateY(-3px); }
    }
    @keyframes btnGlowPulse {
      0%,100% {
        box-shadow:
          inset 0 2px 5px rgba(255,210,100,0.22),
          inset 0 -3px 7px rgba(0,0,0,0.7),
          0 0 10px rgba(200,148,12,0.3);
      }
      50% {
        box-shadow:
          inset 0 2px 5px rgba(255,210,100,0.38),
          inset 0 -3px 7px rgba(0,0,0,0.7),
          0 0 24px rgba(232,185,40,0.75),
          0 0 44px rgba(200,148,12,0.28);
      }
    }
    @keyframes btnBgShift {
      0%,100% { background-position: 0% 50%; }
      50%      { background-position: 100% 50%; }
    }
    @keyframes btnBounceIn {
      0%   { opacity: 0; transform: translateY(14px) scale(0.88); }
      70%  { opacity: 1; transform: translateY(-2px) scale(1.02); }
      100% { opacity: 1; transform: translateY(0) scale(1); }
    }

    /*
      ============================================================
      LAYER 1 — #popup_positioner
        - Posisi center (transform tetap, tidak dianimasikan)
        - padding: 20px → ini "bantalan" GPU layer
          Gerakan floater terjadi di DALAM ruang ini,
          sehingga tepi layer tidak pernah berpindah → no artifact
        - will-change: transform → alokasikan layer GPU sendiri
      ============================================================
    */
    #popup_positioner {
      position: fixed;
      top: 50%;
      left: 50%;
      /* margin negatif untuk kompensasi padding tanpa menggeser posisi */
      transform: translate(-50%, -50%);
      z-index: 999999;
      padding: 20px;
      /* Layer GPU sendiri, tidak pernah berubah */
      will-change: transform;
      /* Paksa GPU compositing & hilangkan sub-pixel artifact */
      backface-visibility: hidden;
      -webkit-backface-visibility: hidden;
      perspective: 1000px;
      -webkit-perspective: 1000px;
    }

    /*
      LAYER 2 — .popup-floater
        - Bergerak naik-turun di dalam ruang padding layer 1
        - isolation: isolate → stacking context sendiri
        - backface-visibility: hidden → anti-flicker
    */
    #popup_positioner .popup-floater {
      font-family: 'Segoe UI', Arial, sans-serif;
      will-change: transform;
      backface-visibility: hidden;
      -webkit-backface-visibility: hidden;
      isolation: isolate;
      animation: popupEnter 0.6s cubic-bezier(0.34, 1.42, 0.64, 1) forwards;
    }

    #popup_positioner .popup-floater.floating {
      animation: popupFloat 4s ease-in-out infinite !important;
    }

    #popup_positioner .popup-floater.closing {
      animation: popupExit 0.3s ease-in forwards !important;
    }

    /* ===== CARD ===== */
    #popup_positioner .card {
      width: 360px;
      max-width: 92vw;
      background: linear-gradient(145deg, #1c0e00, #0d0500, #251100, #160800);
      background-size: 300% 300%;
      border-radius: 22px !important;
      overflow: hidden;
      position: relative;
      border: 1.5px solid #c8900a;
      /* Filter drop-shadow menggantikan box-shadow untuk GPU compositing lebih bersih */
      filter: drop-shadow(0 0 18px rgba(200,148,12,0.45))
              drop-shadow(0 20px 40px rgba(0,0,0,0.85));
      animation:
        bgShimmer  8s   ease         infinite,
        borderGlow 2.8s ease-in-out  infinite;
    }

    /* ===== CLOSE ===== */
    #popup_positioner .closeWrap {
      display: flex;
      justify-content: center;
      margin-top: 10px;
    }

    #popup_positioner .closeX {
      width: 54px;
      height: 54px;
      border-radius: 50% !important;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20px;
      font-weight: bold;
      color: #fff;
      background: linear-gradient(170deg, #ff9090 0%, #ff4444 30%, #dd0000 65%, #880000 100%);
      box-shadow:
        0 10px 28px rgba(0,0,0,0.85),
        0 0 22px rgba(220,0,0,0.75),
        inset 0 4px 8px rgba(255,255,255,0.45),
        inset 0 -4px 8px rgba(0,0,0,0.55);
      cursor: pointer;
      overflow: hidden;
      position: relative;
      transition: transform 0.2s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.2s ease;
    }

    #popup_positioner .closeX::before {
      content: "";
      position: absolute;
      top: -50%; left: -120%;
      width: 100%; height: 200%;
      background: linear-gradient(120deg, transparent, rgba(255,255,255,0.85), transparent);
      animation: shineMove 2.2s infinite;
    }

    #popup_positioner .closeX::after {
      content: "";
      position: absolute;
      top: -15%; left: -5%;
      width: 110%; height: 55%;
      background: radial-gradient(circle, rgba(255,255,255,0.45), transparent 70%);
    }

    #popup_positioner .closeX:hover {
      transform: scale(1.16);
    }

    /* ===== BANNER ===== */
    #popup_positioner .banner {
      aspect-ratio: 4/4;
      overflow: hidden;
      position: relative;
      z-index: 1;
    }

    #popup_positioner .slides {
      display: flex;
      height: 100%;
      transition: transform 0.6s cubic-bezier(0.77, 0, 0.18, 1);
    }

    #popup_positioner .slides img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      flex-shrink: 0;
    }

    /* ===== DIVIDER ===== */
    #popup_positioner .divider {
      height: 1px;
      margin: 0 16px;
      background: linear-gradient(90deg, transparent, #c8900a, #e8b828, #c8900a, transparent);
    }

    /* ===== BUTTONS ===== */
    #popup_positioner .buttons {
      padding: 14px 16px 20px;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
      position: relative;
      z-index: 1;
    }

    html body #popup_positioner .btn {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 44px;
      border-radius: 40px !important;
      font-size: 11px;
      font-weight: 900;
      letter-spacing: 0.5px;
      text-transform: uppercase;
      color: #ffe9b0 !important;
      text-decoration: none;
      background: linear-gradient(
        135deg,
        #8c5500 0%, #5c3200 25%,
        #7a4500 50%, #3d1e00 75%, #6a3a00 100%
      ) !important;
      background-size: 300% 300% !important;
      border: 1px solid #c8900a !important;
      cursor: pointer;
      overflow: hidden;
      animation:
        btnFloat      3s   ease-in-out infinite,
        btnGlowPulse  2.5s ease-in-out infinite,
        btnBgShift    5s   ease         infinite,
        btnBounceIn   0.5s ease         forwards;
      transition: filter 0.15s ease;
    }

    html body #popup_positioner .buttons > .btn:nth-child(1)          { animation-delay: 0s,    0s,    0s,    0.25s; }
    html body #popup_positioner .buttons > .btn:nth-child(2)          { animation-delay: 0.5s,  0.7s,  0.3s,  0.4s;  }
    html body #popup_positioner .buttons > .btnWrap:nth-child(3) .btn { animation-delay: 0.25s, 0.4s,  0.15s, 0.35s; }
    html body #popup_positioner .buttons > .btn:nth-child(4)          { animation-delay: 0.75s, 1.1s,  0.6s,  0.55s; }

    html body #popup_positioner .btn:hover {
      animation-play-state: paused !important;
      transform: translateY(-4px) scale(1.04) !important;
      box-shadow:
        inset 0 2px 5px rgba(255,210,100,0.35),
        inset 0 -3px 7px rgba(0,0,0,0.7),
        0 0 28px rgba(232,185,40,0.8),
        0 8px 20px rgba(0,0,0,0.5) !important;
      filter: brightness(1.18);
    }

    html body #popup_positioner .btn:active {
      transform: translateY(0) scale(0.97) !important;
      filter: brightness(0.9);
    }

    html body #popup_positioner .btn * { border-radius: 40px !important; }

    #popup_positioner .btn::before {
      content: "";
      position: absolute;
      top: -50%; left: -120%;
      width: 60%; height: 200%;
      background: linear-gradient(120deg, transparent, rgba(255,225,130,0.8), transparent);
      animation: shineMove 2.4s ease-in-out infinite;
    }

    /* ===== HOT BADGE ===== */
    #popup_positioner .btnWrap { position: relative; }

    #popup_positioner .hot {
      position: absolute;
      top: -10px; right: -6px;
      background: linear-gradient(135deg, #ff4400, #cc1100);
      color: #fff;
      font-size: 9px;
      font-weight: 900;
      padding: 3px 7px;
      border-radius: 6px !important;
      border: 1px solid rgba(255,100,50,0.6);
      z-index: 9999;
      animation: hotPulse 1.1s ease-in-out infinite;
      box-shadow: 0 0 8px rgba(255,60,0,0.6);
    }

  `;

  document.head.appendChild(style);
}

/* ================= HTML ================= */
function buildHTML() {
  const slidesHTML = SLIDES.map(s => `<img src="${s}">`).join("");
  return `
    <div class="popup-floater">
      <div class="card">
        <div class="banner">
          <div class="slides">${slidesHTML}</div>
        </div>
        <div class="divider"></div>
        <div class="buttons">
          <a class="btn" href="${BTN1_URL}" target="_blank">HUBUNGI KAMI</a>
          <a class="btn" href="${BTN2_URL}" target="_blank">PENGADUAN MEMBER</a>
          <div class="btnWrap">
            <span class="hot">🔥 HOT</span>
            <a class="btn" href="${BTN3_URL}" target="_blank">AMBIL BONUS</a>
          </div>
          <a class="btn" href="${BTN4_URL}" target="_blank">APK GRATIS</a>
        </div>
      </div>
      <div class="closeWrap">
        <div class="closeX" id="closeBtn">✕</div>
      </div>
    </div>
  `;
}

/* ================= INIT ================= */
function init() {

  // Jika pernah ditutup jangan tampil lagi
  if (localStorage.getItem("popup_closed") === "1") {
    return;
  }

  injectStyle();

  const positioner = document.createElement("div");
  positioner.id = "popup_positioner";
  positioner.innerHTML = buildHTML();
  document.body.appendChild(positioner);

  const floater = positioner.querySelector(".popup-floater");

  setTimeout(() => {
    if (positioner.parentNode) {
      floater.classList.add("floating");
    }
  }, 650);

  const slides = positioner.querySelector(".slides");
  let index = 0;

  const slideInterval = setInterval(() => {

    if (!document.body.contains(positioner)) {
      clearInterval(slideInterval);
      return;
    }

    index = (index + 1) % SLIDES.length;
    slides.style.transform = `translateX(-${index * 100}%)`;

  }, 3000);

  document.getElementById("closeBtn").onclick = () => {

    // Simpan status sudah ditutup
    localStorage.setItem("popup_closed", "1");

    floater.classList.remove("floating");
    floater.classList.add("closing");

    setTimeout(() => {
      positioner.remove();
    }, 300);
  };
}

window.addEventListener("load", () => {
  setTimeout(init, 800);
});

})();
