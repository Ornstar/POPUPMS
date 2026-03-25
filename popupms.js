(() => {
"use strict";

/* ================= FILTER (HOME ONLY) ================= */

const currentURL = window.location.href.toLowerCase();
const isHome = currentURL.includes("home") || currentURL.endsWith("/");
if (!isHome) return;

/* ================= CONFIG ================= */

const BTN1_URL = "https://urlmsshorten.com/whatsapp-official";
const BTN2_URL = "https://urlmsshorten.com/mauslot-spektakuler";
const BTN3_URL = "https://urlmsshorten.com/group-tele-official";
const BTN4_URL = "https://urlmsshorten.com/apk-mauslot";

const SLIDES = [
"http://plcl.me/images/TMMAa.png",
"http://plcl.me/images/JNgNR.png",
];

/* ================= STYLE ================= */

function injectStyle(){

if(document.getElementById("popup_mauslot")) return;

const style = document.createElement("style");
style.id = "popup_mauslot";

style.textContent = `

@keyframes pulse{
0%{transform:scale(1)}
50%{transform:scale(1.2)}
100%{transform:scale(1)}
}

@keyframes shineMove{
0%{left:-120%}
100%{left:120%}
}

/* OVERLAY */
#popup_overlay{
position:fixed;
top:0;
left:0;
width:100%;
height:100%;
background:rgba(0,0,0,0.6);
z-index:999998;
display:flex;
align-items:center;
justify-content:center;
}

/* POPUP */
#popup_final{
position:relative;
font-family:Arial;
}

/* CARD */
#popup_final .card{
width:360px;
max-width:92vw;
background:#0b1a3a;
border-radius:20px;
overflow:visible;
box-shadow:0 20px 60px rgba(0,0,0,.9);
position:relative;
}

/* BANNER */
#popup_final .banner{
aspect-ratio:4/4;
overflow:hidden;
border-radius:20px 20px 0 0;
}

#popup_final .slides{
display:flex;
height:100%;
transition:transform .5s ease;
}

#popup_final .slides img{
width:100%;
height:100%;
object-fit:contain;
flex-shrink:0;
}

/* BUTTONS */
#popup_final .buttons{
padding:16px;
display:grid;
grid-template-columns:1fr 1fr;
gap:10px;
}

/* WRAP BUTTON (PENTING) */
#popup_final .btnWrap{
position:relative;
z-index:5;
}

/* BUTTON */
#popup_final .btn{
position:relative;
z-index:1;
display:flex;
align-items:center;
justify-content:center;
height:42px;
border-radius:40px;
font-size:11px;
font-weight:900;
color:#ffffff;
text-decoration:none;

background:linear-gradient(180deg,#1e3a8a,#1e40af,#1d4ed8,#0f172a);
border:1px solid #3b82f6;

cursor:pointer;
overflow:hidden;

box-shadow:
inset 0 2px 0 rgba(255,255,255,.2),
inset 0 -3px 6px rgba(0,0,0,.6),
0 0 12px rgba(59,130,246,.5);
}

/* SHINE FIX (DI BAWAH SEMUA) */
#popup_final .btn::before{
content:"";
position:absolute;
top:-50%;
left:-120%;
width:120%;
height:200%;
background:linear-gradient(120deg,transparent,rgba(255,255,255,.8),transparent);
animation:shineMove 3s infinite;
z-index:0;
pointer-events:none;
}

/* HOT BADGE (PALING ATAS) */
#popup_final .hot{
position:absolute;
top:-10px;
right:-6px;
background:#ef4444;
color:#fff;
font-size:9px;
padding:4px 6px;
border-radius:6px;
animation:pulse 1s infinite;
z-index:999;
pointer-events:none;
}

/* CLOSE BUTTON */
#popup_final .closeX{
position:absolute;
bottom:-30px;
left:50%;
transform:translateX(-50%);
width:60px;
height:60px;
border-radius:50%;

display:flex;
align-items:center;
justify-content:center;

font-size:28px;
font-weight:bold;
color:#fff;

background:linear-gradient(180deg,#ffb3b3,#ff0000,#990000);

cursor:pointer;
z-index:9999;
}
`;

document.head.appendChild(style);
}

/* ================= HTML ================= */

function buildHTML(){

const slidesHTML = SLIDES.map(s=>`<img src="${s}">`).join("");

return `
<div id="popup_final">
  <div class="card">

    <div class="banner">
      <div class="slides">${slidesHTML}</div>
    </div>

    <div class="buttons">
      <a class="btn" href="${BTN1_URL}" target="_blank">HUBUNGI KAMI</a>
      <a class="btn" href="${BTN2_URL}" target="_blank">LINK ANTI NAWALA</a>

      <div class="btnWrap">
        <span class="hot">HOT</span>
        <a class="btn" href="${BTN3_URL}" target="_blank">AMBIL BONUS</a>
      </div>

      <a class="btn" href="${BTN4_URL}" target="_blank">APK GRATIS</a>
    </div>

    <div class="closeX" id="closeBtn">✕</div>

  </div>
</div>
`;
}

/* ================= INIT ================= */

function init(){

injectStyle();

const wrap = document.createElement("div");
wrap.id = "popup_overlay";
wrap.innerHTML = buildHTML();
document.body.appendChild(wrap);

const slides = wrap.querySelector(".slides");
let index = 0;

setInterval(()=>{
index = (index + 1) % SLIDES.length;
slides.style.transform = `translateX(-${index*100}%)`;
},3000);

// tombol X
wrap.querySelector("#closeBtn").onclick = () => wrap.remove();

// klik luar popup
wrap.addEventListener("click", (e) => {
  if (!e.target.closest("#popup_final")) {
    wrap.remove();
  }
});

}

document.addEventListener("DOMContentLoaded",()=>{
setTimeout(init,800);
});

})();
