(() => {

const CONFIG = {
  LIVECHAT_URL: "https://urlmsshorten.com/livechat-mauslot",
  TELE_URL: "https://urlmsshorten.com/group-tele-official",
  IMAGE_URL: "https://i.postimg.cc/66Vg5Kbr/20260301-075640.jpg",
  STYLE_ID: "MAUSLOT_style_RAMADHAN_KEEP_PILL_NOSCROLL_V1",
  OVERLAY_ID: "MAUSLOTOv",
  CLOSE_ID: "MAUSLOTClose",
  DATE_TEXT: "Selamat Menyambut Bulan Suci RAMADHAN",
};

let isShown = false;
let isClosed = false;
let wasHome = null;

const isHomePage = () => {
  const p = (location.pathname || "").toLowerCase();
  const h = (location.hash || "").toLowerCase();
  return (
    p === "/" || p === "" || p.includes("home") || p.includes("index") ||
    h === "#/" || h === "#home" || h.includes("home")
  );
};

const removeOverlay = () => {
  const ov = document.getElementById(CONFIG.OVERLAY_ID);
  if (ov) ov.remove();
  isShown = false;

  document.documentElement.style.overflow = "";
  document.body.style.overflow = "";
};

const injectCSS = () => {
  if (document.getElementById(CONFIG.STYLE_ID)) return;

  const style = document.createElement("style");
  style.id = CONFIG.STYLE_ID;
  style.textContent = `
:root{
  --gold:#ffd56b;
  --gold2:#ffedb6;
  --bg1:#000;
  --bg2:#010f69;
  --bg3:#01093a;
}

#${CONFIG.OVERLAY_ID}{
  position:fixed; inset:0; z-index:2147483647;
  display:flex; align-items:center; justify-content:center;
  padding:12px;
  overflow:hidden;
  overscroll-behavior:none;
  background:
    radial-gradient(900px 520px at 50% 45%, rgba(255,213,107,.14), transparent 60%),
    radial-gradient(800px 520px at 50% 60%, rgba(30,91,255,.12), transparent 62%),
    rgba(0,0,0,.62);
  -webkit-backdrop-filter: blur(2px);
  backdrop-filter: blur(2px);
}

.sW{
  width:min(360px, 92vw);
  max-height:92vh;
  display:flex;
  flex-direction:column;
  border-radius:18px;
  overflow:hidden;
  position:relative;
  background:
    radial-gradient(120% 90% at 50% -10%, rgba(255,213,107,.16), transparent 58%),
    radial-gradient(90% 70% at 18% 120%, rgba(30,91,255,.14), transparent 60%),
    linear-gradient(180deg,var(--bg1),var(--bg2),var(--bg3));
  border:1px solid rgba(255,213,107,.65);
  box-shadow:
    0 18px 60px rgba(0,0,0,.70),
    0 0 0 1px rgba(255,255,255,.06) inset,
    0 0 40px rgba(255,213,107,.12);
  color:#fff;
  font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
}
.sW:before{
  content:"";
  position:absolute; inset:8px;
  border-radius:14px;
  border:1px solid rgba(255,255,255,.06);
  pointer-events:none;
}

.sIW{padding:0;background:transparent;text-align:center; flex:0 0 auto;}
.sI{
  width:100%;
  height:auto;
  display:block;
  max-height:42vh;
  object-fit:contain;
}

.sC{
  position:relative;
  overflow:hidden;
  padding:12px;
  flex:1 1 auto;
  isolation:isolate;
}

/* FX background area biru */
@keyframes mistFlow{
  0%   { transform: translate3d(-14px, 6px, 0) scale(1.06); opacity:.40; }
  50%  { transform: translate3d(16px, -8px, 0) scale(1.10); opacity:.75; }
  100% { transform: translate3d(-14px, 6px, 0) scale(1.06); opacity:.40; }
}
@keyframes sparkleFloat{
  0%   { transform: translate3d(0, 0, 0); opacity:.28; }
  45%  { transform: translate3d(10px, -12px, 0); opacity:.60; }
  100% { transform: translate3d(-8px, -26px, 0); opacity:.28; }
}
.sC:before{
  content:"";
  position:absolute; inset:-80px;
  z-index:0; pointer-events:none;
  background:
    radial-gradient(420px 300px at 14% 30%, rgba(255,255,255,.14), transparent 72%),
    radial-gradient(520px 360px at 85% 18%, rgba(255,255,255,.10), transparent 74%),
    radial-gradient(560px 400px at 50% 72%, rgba(255,255,255,.12), transparent 76%),
    radial-gradient(460px 330px at 88% 88%, rgba(255,255,255,.08), transparent 76%);
  filter: blur(18px);
  mix-blend-mode: screen;
  opacity:.75;
  animation: mistFlow 7.8s ease-in-out infinite;
}
.sC:after{
  content:"";
  position:absolute; inset:-50px;
  z-index:0; pointer-events:none;
  background:
    radial-gradient(circle at 10% 20%, rgba(255,255,255,.85) 0 1.1px, transparent 2.6px),
    radial-gradient(circle at 22% 62%, rgba(255,255,255,.55) 0 1px,   transparent 2.4px),
    radial-gradient(circle at 35% 38%, rgba(255,255,255,.70) 0 1px,  transparent 2.5px),
    radial-gradient(circle at 48% 70%, rgba(255,255,255,.50) 0 1px,  transparent 2.4px),
    radial-gradient(circle at 58% 28%, rgba(255,255,255,.80) 0 1.1px, transparent 2.6px),
    radial-gradient(circle at 72% 56%, rgba(255,255,255,.60) 0 1px,  transparent 2.4px),
    radial-gradient(circle at 84% 35%, rgba(255,255,255,.70) 0 1px,  transparent 2.5px),
    radial-gradient(circle at 92% 74%, rgba(255,255,255,.50) 0 1px,  transparent 2.4px);
  filter: blur(.25px);
  opacity:.55;
  animation: sparkleFloat 6.2s ease-in-out infinite;
}
.sC > *{ position:relative; z-index:1; }

.sT{ display:none !important; }

.sImlek{
  margin:6px 0 10px;
  text-align:center;
  font-size:10.8px;
  font-weight:900;
  letter-spacing:.25px;
  color:var(--gold2);
  padding:7px 12px;
  border-radius:999px;
  background:linear-gradient(180deg, rgba(160,0,0,.72), rgba(120,0,0,.55));
  border:1px solid rgba(255,213,107,.50);
  box-shadow:0 8px 18px rgba(0,0,0,.28), 0 0 0 1px rgba(255,255,255,.06) inset;
}
.sS{
  text-align:center;
  font-size:10.5px;
  margin-bottom:10px;
  color:#d6e3ff;
  opacity:.95;
}

.sG{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.sK{
  padding:10px;
  border-radius:14px;
  text-align:center;
  font-size:10.5px;
  background:
    radial-gradient(120% 80% at 50% -15%, rgba(255,255,255,.10), transparent 58%),
    linear-gradient(180deg, rgba(9,36,92,.72), rgba(5,20,60,.68));
  border:1px solid rgba(255,213,107,.30);
  box-shadow:0 10px 22px rgba(0,0,0,.28), 0 0 0 1px rgba(255,255,255,.06) inset;
}
.sK .sKTitle{display:block;font-weight:900;letter-spacing:.5px}
.sK b{display:block;color:var(--gold);margin:4px 0 6px;font-size:12.5px;font-weight:900}

/* ==============================
   ✅ FIX: BUTTON SHINE PASTI KELIHATAN (ANTI OVERRIDE)
   ============================== */
@keyframes shinePass{
  0%   { transform: translateX(-210%) skewX(-20deg); }
  100% { transform: translateX(240%) skewX(-20deg); }
}
@keyframes glowPulse{
  0%,100%{ box-shadow: 0 10px 18px rgba(0,0,0,.35), 0 0 16px rgba(255,255,255,.10); }
  50%   { box-shadow: 0 12px 20px rgba(0,0,0,.38), 0 0 26px rgba(255,255,255,.18); }
}

/* selector kuat + !important biar ga dipatahkan css theme */
#${CONFIG.OVERLAY_ID} .sBtn,
#${CONFIG.OVERLAY_ID} .sClose{
  position:relative !important;
  overflow:hidden !important;
  isolation:isolate;
  transform: translateZ(0);
}

/* kilau tebal + terang (pasti kelihatan) */
#${CONFIG.OVERLAY_ID} .sBtn::before,
#${CONFIG.OVERLAY_ID} .sClose::before{
  content:"";
  position:absolute;
  top:-60%;
  left:-80%;
  width:78%;
  height:260%;
  border-radius:999px;

  /* putih terang + sedikit biru */
  background: linear-gradient(
    90deg,
    rgba(255,255,255,0) 0%,
    rgba(255,255,255,.98) 45%,
    rgba(160,210,255,.85) 52%,
    rgba(255,255,255,.98) 60%,
    rgba(255,255,255,0) 100%
  );

  opacity:.95;
  filter: blur(.4px) drop-shadow(0 0 10px rgba(255,255,255,.28));
  mix-blend-mode: screen;

  pointer-events:none;
  z-index:5;

  animation: shinePass 1.35s linear infinite !important;
  will-change: transform;
}

/* tombol Livechat / Telegram */
#${CONFIG.OVERLAY_ID} .sBtn{
  display:block;
  margin-top:6px;
  padding:9px 10px;
  border-radius:999px;
  font-size:10.5px;
  font-weight:900;
  letter-spacing:.35px;
  text-decoration:none;
  text-align:center;
  color:#fff;
  background:
    radial-gradient(120% 120% at 30% 15%, rgba(255,255,255,.25), transparent 45%),
    linear-gradient(180deg, #2f7bff, #0a2b8f);
  border:1px solid rgba(255,213,107,.90);
  box-shadow:
    0 10px 18px rgba(0,0,0,.35),
    0 0 18px rgba(30,91,255,.25);
  animation: glowPulse 2.0s ease-in-out infinite !important;
}

/* tombol tutup */
.sCloseWrap{display:flex;justify-content:center}
#${CONFIG.OVERLAY_ID} .sClose{
  margin-top:12px;
  padding:9px 16px;
  border-radius:999px;
  font-size:11px;
  font-weight:900;
  letter-spacing:.35px;
  cursor:pointer;
  color:#fff;
  background:
    radial-gradient(120% 120% at 30% 15%, rgba(255,255,255,.22), transparent 45%),
    linear-gradient(180deg, #1e6e9b, #0a3c5f);
  border:2px solid rgba(255,213,107,.90);
  box-shadow:
    0 10px 18px rgba(0,0,0,.35),
    0 0 18px rgba(255,213,107,.18);
  animation: glowPulse 2.0s ease-in-out infinite !important;
}

.sF{margin-top:10px;text-align:center;font-size:10px;opacity:.85;color:#e9f0ff}

/* MOBILE DIPERKECIL */
@media(max-width:640px){
  #${CONFIG.OVERLAY_ID}{ padding:8px; }
  .sW{
    width:min(300px, 88vw);
    max-height:86vh;
    border-radius:14px;
  }
  .sI{ max-height:30vh; }
  .sC{ padding:9px; }
  .sG{ gap:8px; }
  .sK{ padding:9px; border-radius:12px; }
  .sImlek{ font-size:10.2px; padding:6px 10px; }
  .sS{ font-size:10.1px; margin-bottom:8px; }
  .sK b{ font-size:12px; }
  .sBtn{ padding:8px 10px; font-size:10.2px; }
  .sClose{ padding:8px 14px; font-size:10.6px; }
}

@media(max-width:380px){
  .sW{ width:min(280px, 90vw); max-height:84vh; }
  .sI{ max-height:28vh; }
}

/* reduce motion */
@media (prefers-reduced-motion: reduce){
  .sC:before,.sC:after,
  #${CONFIG.OVERLAY_ID} .sBtn,
  #${CONFIG.OVERLAY_ID} .sBtn::before,
  #${CONFIG.OVERLAY_ID} .sClose,
  #${CONFIG.OVERLAY_ID} .sClose::before{
    animation:none !important;
  }
}
`;
  document.head.appendChild(style);
};

const renderHTML = () => `
<div id="${CONFIG.OVERLAY_ID}">
  <div class="sW">
    <div class="sIW">
      <img class="sI" src="${CONFIG.IMAGE_URL}" alt="">
    </div>

    <div class="sC">
      <div class="sImlek">${CONFIG.DATE_TEXT}</div>
      <div class="sS">JOIN KOMUNITAS MAUSLOT PRIORITAS RASAKAN MANFAATNYA</div>

      <div class="sG">
        <div class="sK">
          <span class="sKTitle">BONUS SAHUR</span>
          <b>35%</b>
          <a class="sBtn" href="${CONFIG.LIVECHAT_URL}" target="_blank" rel="noopener">Livechat</a>
        </div>

        <div class="sK">
          <span class="sKTitle">BONUS NGABUBURIT</span>
          <b>25%</b>
          <a class="sBtn" href="${CONFIG.LIVECHAT_URL}" target="_blank" rel="noopener">Livechat</a>
        </div>

        <div class="sK">
          <span class="sKTitle">LUCKY WHEEL</span>
          <b>MEMBER</b>
          <a class="sBtn" href="${CONFIG.TELE_URL}" target="_blank" rel="noopener">Telegram</a>
        </div>

        <div class="sK">
          <span class="sKTitle">LOYALTY POIN</span>
          <b>AKTIF</b>
          <a class="sBtn" href="${CONFIG.TELE_URL}" target="_blank" rel="noopener">Telegram</a>
        </div>
      </div>

      <div class="sF">© MAUSLOT GROUP</div>

      <div class="sCloseWrap">
        <div class="sClose" id="${CONFIG.CLOSE_ID}">
          KLIK DISINI UNTUK MENUTUP
        </div>
      </div>
    </div>
  </div>
</div>`;

const closeOverlay = () => {
  isClosed = true;
  removeOverlay();
};

const showOverlay = () => {
  if (isShown || isClosed) return;

  document.documentElement.style.overflow = "hidden";
  document.body.style.overflow = "hidden";

  injectCSS();
  document.body.insertAdjacentHTML("beforeend", renderHTML());
  isShown = true;

  document.getElementById(CONFIG.CLOSE_ID).onclick = closeOverlay;
  document.getElementById(CONFIG.OVERLAY_ID).onclick = (e)=>{
    if(e.target.id === CONFIG.OVERLAY_ID) closeOverlay();
  };
};

const tick = () => {
  const home = isHomePage();
  if (!home) {
    isClosed = false;
    removeOverlay();
  } else {
    if (wasHome === false || wasHome === null) isClosed = false;
    showOverlay();
  }
  wasHome = home;
};

["pushState","replaceState"].forEach(fn=>{
  const original = history[fn];
  history[fn] = function(){
    const ret = original.apply(this, arguments);
    setTimeout(tick,80);
    return ret;
  };
});

addEventListener("popstate",()=>setTimeout(tick,80));
addEventListener("hashchange",()=>setTimeout(tick,80));
document.readyState==="loading"
  ? addEventListener("DOMContentLoaded",tick)
  : tick();

  /* ==============================
   ✅ ANIMASI SAAT POPUP MUNCUL
   ============================== */
@keyframes ovFadeIn{
  from { opacity:0; }
  to   { opacity:1; }
}
@keyframes cardEnter{
  0%   { transform: translate3d(0,14px,0) scale(.92); opacity:0; }
  60%  { transform: translate3d(0,-2px,0) scale(1.01); opacity:1; }
  100% { transform: translate3d(0,0,0) scale(1); opacity:1; }
}
@keyframes contentRise{
  from { transform: translateY(10px); opacity:0; }
  to   { transform: translateY(0); opacity:1; }
}

/* overlay fade */
#MAUSLOTOv.ms-enter{
  animation: ovFadeIn .28s ease-out both;
}

/* card masuk */
#MAUSLOTOv.ms-enter .sW{
  animation: cardEnter .55s cubic-bezier(.2,.9,.2,1) both;
}

/* isi konten naik halus */
#MAUSLOTOv.ms-enter .sC{
  animation: contentRise .45s ease-out .10s both;
}

})();
