(() => {

const CONFIG = {
  LIVECHAT_URL: "https://urlmsshorten.com/livechat-mauslot",
  TELE_URL: "https://urlmsshorten.com/group-tele-official",
  IMAGE_URL: "https://i.postimg.cc/gcg18Ln1/MS009-Mobile.jpg",
  STYLE_ID: "MAUSLOT_style_IMLEK_FX",
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
#${CONFIG.OVERLAY_ID}{
  position:fixed; inset:0; z-index:2147483647;
  background:rgba(0,0,0,.5);
  display:flex; align-items:center; justify-content:center;
  padding:10px;
}

/* CARD */
.sW{
  width:min(560px, 95vw);
  border-radius:16px;
  overflow:hidden;
  background:linear-gradient(180deg,#000,#010f69,#01093a);
  border:1px solid #ffd56b;
  box-shadow:0 15px 40px rgba(0,0,0,.6);
  color:#fff;
  font-family:sans-serif;
}

.sIW{padding:0;background:transparent;text-align:center}
.sI{width:100%;height:auto;display:block;max-width:100%;max-height:none}

.sC{padding:14px}
.sT{text-align:center;font-size:20px;font-weight:900;margin-bottom:6px}

.sImlek{
  margin:6px 0 10px;
  text-align:center;
  font-size:11px;
  font-weight:900;
  color:#ffe9b8;
  padding:6px 10px;
  border-radius:10px;
  background:rgba(140,0,0,.6);
  border:1px solid rgba(255,213,107,.5);
}

.sS{text-align:center;font-size:11px;margin-bottom:10px;color:#cfe0ff}
.sG{display:grid;grid-template-columns:1fr 1fr;gap:8px}

.sK{
  padding:10px;border-radius:12px;
  background:rgba(7,27,74,.85);
  border:1px solid rgba(255,213,107,.35);
  text-align:center;font-size:11px
}
.sK b{display:block;color:#ffd56b;margin:4px 0}

/* ======================
   BUTTON ANIMATION (RINGAN)
   - hanya transform/opacity
   - ada hover/tap feedback
   ====================== */
@keyframes sBtnFloat {
  0%,100% { transform: translateY(0) scale(1); }
  50%     { transform: translateY(-1px) scale(1.02); }
}

.sBtn{
  display:block;
  margin-top:6px;
  background:linear-gradient(180deg,#1e5bff,#0f2b8a);
  color:#fff;
  text-decoration:none;
  padding:6px;
  border-radius:999px;
  font-size:11px;
  font-weight:700;
  border:1px solid #ffd56b;

  /* performance */
  will-change: transform;
  transform: translateZ(0);

  /* anim halus */
  animation: sBtnFloat 2.4s ease-in-out infinite;
}

.sBtn:hover{
  transform: translateY(-2px) scale(1.03);
}

.sBtn:active{
  transform: translateY(0) scale(0.98);
  opacity: .92;
}

/* Kurangi animasi kalau user setting reduce motion */
@media (prefers-reduced-motion: reduce){
  .sBtn{ animation:none !important; }
}

.sF{margin-top:10px;text-align:center;font-size:10px;opacity:.85}
.sCloseWrap{display:flex;justify-content:center}

.sClose{
  margin-top:12px;
  background:linear-gradient(180deg,#145778,#145778);
  color:#fff;
  padding:8px 16px;
  border-radius:999px;
  font-size:12px;
  font-weight:900;
  cursor:pointer;
  border:2px solid #ffd56b;
}

@media(max-width:640px){
  .sW{width:min(360px, 95vw)}
  .sT{font-size:16px}
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
        <div class="sK">BONUS SAHUR<b>35%</b>
          <a class="sBtn" href="${CONFIG.LIVECHAT_URL}" target="_blank" rel="noopener">Livechat</a>
        </div>
        <div class="sK">BONUS NGABUBURIT<b>25%</b>
          <a class="sBtn" href="${CONFIG.LIVECHAT_URL}" target="_blank" rel="noopener">Livechat</a>
        </div>
        <div class="sK">LUCKY WHEEL<b>MEMBER</b>
          <a class="sBtn" href="${CONFIG.TELE_URL}" target="_blank" rel="noopener">Telegram</a>
        </div>
        <div class="sK">LOYALTY POIN<b>AKTIF</b>
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
