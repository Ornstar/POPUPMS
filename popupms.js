(() => {

const CONFIG = {
  LIVECHAT_URL: "https://urlmsshorten.com/livechat-mauslot",
  TELE_URL: "https://urlmsshorten.com/group-tele-official",
  IMAGE_URL: "https://i.postimg.cc/66Vg5Kbr/20260301-075640.jpg",
  STYLE_ID: "MAUSLOT_style_RAMADHAN_FX_ALLBG_V2_SIZE",
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
  background:
    radial-gradient(900px 520px at 50% 45%, rgba(255,213,107,.14), transparent 60%),
    radial-gradient(800px 520px at 50% 60%, rgba(30,91,255,.12), transparent 62%),
    rgba(0,0,0,.62);
  -webkit-backdrop-filter: blur(2px);
  backdrop-filter: blur(2px);
}

/* ✅ POPUP LEBIH KECIL + TIDAK MAKAN LAYAR */
.sW{
  width:min(380px, 88vw);     /* ✅ lebih kecil dari sebelumnya */
  max-height: min(86vh, 780px); /* ✅ batasi tinggi */
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

/* inner border */
.sW:before{
  content:"";
  position:absolute; inset:8px;
  border-radius:14px;
  border:1px solid rgba(255,255,255,.06);
  pointer-events:none;
}

/* gambar tetap full */
.sIW{padding:0;background:transparent;text-align:center; flex:0 0 auto;}
.sI{width:100%;height:auto;display:block;max-width:100%;max-height:none}

/* ✅ BAGIAN BAWAH SCROLL JIKA TINGGI KELEWAT (Biar ga gede) */
.sC{
  padding:12px 12px 14px;
  position:relative;
  overflow:auto;              /* ✅ scroll kalau perlu */
  -webkit-overflow-scrolling: touch;
  isolation:isolate;
  flex:1 1 auto;              /* ✅ ambil sisa tinggi */
}

/* scrollbar tipis (opsional, tetap premium) */
.sC::-webkit-scrollbar{ width:6px; }
.sC::-webkit-scrollbar-thumb{ background:rgba(255,255,255,.14); border-radius:99px; }
.sC::-webkit-scrollbar-track{ background:transparent; }

/* FX background seluruh area biru */
@keyframes allMistFlow{
  0%   { transform: translate3d(-14px, 6px, 0) scale(1.06); opacity:.40; }
  50%  { transform: translate3d(16px, -8px, 0) scale(1.10); opacity:.78; }
  100% { transform: translate3d(-14px, 6px, 0) scale(1.06); opacity:.40; }
}
@keyframes allSparkleFloat{
  0%   { transform: translate3d(0, 0, 0); opacity:.30; }
  45%  { transform: translate3d(10px, -12px, 0); opacity:.70; }
  100% { transform: translate3d(-8px, -26px, 0); opacity:.30; }
}

.sC:before{
  content:"";
  position:absolute;
  inset:-80px;
  z-index:0;
  pointer-events:none;
  background:
    radial-gradient(420px 300px at 14% 30%, rgba(255,255,255,.14), transparent 72%),
    radial-gradient(520px 360px at 85% 18%, rgba(255,255,255,.10), transparent 74%),
    radial-gradient(560px 400px at 50% 72%, rgba(255,255,255,.12), transparent 76%),
    radial-gradient(460px 330px at 88% 88%, rgba(255,255,255,.08), transparent 76%);
  filter: blur(18px);
  mix-blend-mode: screen;
  opacity:.75;
  animation: allMistFlow 7.8s ease-in-out infinite;
}
.sC:after{
  content:"";
  position:absolute;
  inset:-50px;
  z-index:0;
  pointer-events:none;
  background:
    radial-gradient(circle at 10% 20%, rgba(255,255,255,.85) 0 1.1px, transparent 2.6px),
    radial-gradient(circle at 22% 62%, rgba(255,255,255,.55) 0 1px,   transparent 2.4px),
    radial-gradient(circle at 35% 38%, rgba(255,255,255,.70) 0 1px,  transparent 2.5px),
    radial-gradient(circle at 48% 70%, rgba(255,255,255,.50) 0 1px,  transparent 2.4px),
    radial-gradient(circle at 58% 28%, rgba(255,255,255,.80) 0 1.1px, transparent 2.6px),
    radial-gradient(circle at 72% 56%, rgba(255,255,255,.60) 0 1px,  transparent 2.4px),
    radial-gradient(circle at 84% 35%, rgba(255,255,255,.70) 0 1px,  transparent 2.5px),
    radial-gradient(circle at 92% 74%, rgba(255,255,255,.50) 0 1px,  transparent 2.4px),
    radial-gradient(circle at 16% 84%, rgba(255,255,255,.42) 0 1px, transparent 2.4px),
    radial-gradient(circle at 66% 86%, rgba(255,255,255,.48) 0 1px, transparent 2.4px),
    radial-gradient(circle at 40% 12%, rgba(255,255,255,.46) 0 1px, transparent 2.4px);
  filter: blur(.25px);
  opacity:.65;
  animation: allSparkleFloat 6.2s ease-in-out infinite;
}

/* konten di atas FX */
.sC > *{ position:relative; z-index:1; }

/* teks & layout sedikit lebih compact biar muat */
.sT{
  text-align:center;
  font-size:16px;             /* ✅ kecilkan sedikit */
  font-weight:900;
  letter-spacing:.6px;
  margin-bottom:6px;
  text-shadow:0 3px 18px rgba(0,0,0,.65);
}

.sImlek{
  margin:8px 0 10px;
  text-align:center;
  font-size:10.5px;           /* ✅ kecilkan */
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
  font-size:10.5px;           /* ✅ kecilkan */
  margin-bottom:10px;
  color:#d6e3ff;
  opacity:.95;
}

.sG{display:grid;grid-template-columns:1fr 1fr;gap:10px}

.sK{
  padding:10px 10px;          /* ✅ lebih compact */
  border-radius:14px;
  text-align:center;
  font-size:10.5px;           /* ✅ kecilkan */
  background:
    radial-gradient(120% 80% at 50% -15%, rgba(255,255,255,.10), transparent 58%),
    linear-gradient(180deg, rgba(9,36,92,.72), rgba(5,20,60,.68));
  border:1px solid rgba(255,213,107,.30);
  box-shadow:0 10px 22px rgba(0,0,0,.28), 0 0 0 1px rgba(255,255,255,.06) inset;
}
.sK .sKTitle{
  display:block;
  font-weight:900;
  letter-spacing:.5px;
}
.sK b{
  display:block;
  color:var(--gold);
  margin:4px 0 6px;
  font-size:12.5px;           /* ✅ kecilkan */
  font-weight:900;
}

/* buttons tetap premium tapi sedikit lebih kecil */
@keyframes btnFloat{
  0%,100%{ transform: translateY(0) scale(1); }
  50%{ transform: translateY(-2px) scale(1.02); }
}
@keyframes btnShimmer{
  0%{ transform: translateX(-140%) skewX(-20deg); opacity:0; }
  12%{ opacity:.75; }
  30%{ opacity:0; }
  100%{ transform: translateX(170%) skewX(-20deg); opacity:0; }
}
.sBtn{
  display:block;
  margin-top:6px;
  padding:9px 10px;          /* ✅ lebih kecil */
  border-radius:999px;
  font-size:10.5px;          /* ✅ lebih kecil */
  font-weight:900;
  letter-spacing:.35px;
  text-decoration:none;
  text-align:center;
  position:relative;
  overflow:hidden;
  color:#fff;
  background:
    radial-gradient(120% 120% at 30% 15%, rgba(255,255,255,.22), transparent 45%),
    linear-gradient(180deg, rgba(65,140,255,1), rgba(9,24,95,1));
  border:1px solid rgba(255,213,107,.85);
  box-shadow:
    0 12px 20px rgba(0,0,0,.32),
    0 0 0 1px rgba(255,255,255,.10) inset,
    0 -10px 18px rgba(0,0,0,.22) inset,
    0 0 18px rgba(30,91,255,.18);
  will-change: transform;
  transform: translateZ(0);
  animation: btnFloat 2.4s ease-in-out infinite;
}
.sBtn:before{
  content:"";
  position:absolute;
  top:-30%;
  left:0;
  width:42%;
  height:170%;
  background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,.75) 50%, transparent 100%);
  opacity:0;
  animation: btnShimmer 3.2s ease-in-out infinite;
  pointer-events:none;
}
.sBtn:hover{ transform: translateY(-3px) scale(1.03); filter: brightness(1.06); }
.sBtn:active{ transform: translateY(0) scale(.985); filter: brightness(.98); opacity:.96; }

.sF{margin-top:10px;text-align:center;font-size:10px;opacity:.85;color:#e9f0ff}
.sCloseWrap{display:flex;justify-content:center}
.sClose{
  margin-top:12px;
  padding:9px 16px;          /* ✅ lebih kecil */
  border-radius:999px;
  font-size:11px;            /* ✅ lebih kecil */
  font-weight:900;
  letter-spacing:.35px;
  cursor:pointer;
  color:#fff;
  background:
    radial-gradient(120% 120% at 30% 15%, rgba(255,255,255,.18), transparent 45%),
    linear-gradient(180deg, rgba(30,110,155,1), rgba(10,60,95,1));
  border:2px solid rgba(255,213,107,.85);
  box-shadow:
    0 12px 18px rgba(0,0,0,.30),
    0 0 0 1px rgba(255,255,255,.10) inset,
    0 0 18px rgba(255,213,107,.12);
  transition: transform .18s ease, filter .18s ease;
}
.sClose:hover{ transform: translateY(-2px); filter: brightness(1.06); }
.sClose:active{ transform: scale(.985); filter: brightness(.98); }

@media (prefers-reduced-motion: reduce){
  .sC:before, .sC:after, .sBtn, .sBtn:before { animation:none !important; }
}

/* ✅ MOBILE: lebih kecil lagi */
@media(max-width:640px){
  #${CONFIG.OVERLAY_ID}{ padding:10px; }
  .sW{
    width:min(330px, 92vw);      /* ✅ mobile lebih kecil */
    max-height: 82vh;            /* ✅ jangan nutup layar */
    border-radius:16px;
  }
  .sC{ padding:10px 10px 12px; }
  .sT{ font-size:15px; }
  .sG{ gap:9px; }
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
      <div class="sT">MAUSLOT PRIORITAS, NIKMATI KEUNTUNGANNYA!</div>
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

})();
