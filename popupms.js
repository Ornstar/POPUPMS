(() => {
"use strict";

/* ================= FILTER (DISABLE DULU BIAR TEST) ================= */
// sementara kita matikan dulu biar pasti muncul
// nanti kalau mau aktifin lagi baru kita adjust

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

style.innerHTML = `
#popup_overlay{
position:fixed;
top:0;
left:0;
width:100%;
height:100%;
background:rgba(0,0,0,0.6);
z-index:999999;
display:flex;
align-items:center;
justify-content:center;
}

#popup_final .card{
width:360px;
background:#0b1a3a;
border-radius:20px;
overflow:hidden;
position:relative;
}

#popup_final .slides{
display:flex;
transition:0.5s;
}

#popup_final img{
width:100%;
}

#popup_final .buttons{
padding:16px;
display:grid;
grid-template-columns:1fr 1fr;
gap:10px;
}

#popup_final .btn{
display:flex;
align-items:center;
justify-content:center;
height:42px;
border-radius:40px;
font-size:11px;
font-weight:bold;
color:#fff;
text-decoration:none;
background:#1e40af;
}

#popup_final .btnWrap{
position:relative;
}

#popup_final .hot{
position:absolute;
top:-10px;
right:-6px;
background:red;
color:#fff;
font-size:9px;
padding:4px 6px;
border-radius:6px;
z-index:10;
}

#popup_final .closeX{
position:absolute;
bottom:-30px;
left:50%;
transform:translateX(-50%);
width:60px;
height:60px;
border-radius:50%;
background:red;
color:#fff;
display:flex;
align-items:center;
justify-content:center;
font-size:28px;
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

    <div class="slides">${slidesHTML}</div>

    <div class="buttons">
      <a class="btn" href="${BTN1_URL}" target="_blank">HUBUNGI</a>
      <a class="btn" href="${BTN2_URL}" target="_blank">LINK</a>

      <div class="btnWrap">
        <span class="hot">HOT</span>
        <a class="btn" href="${BTN3_URL}" target="_blank">BONUS</a>
      </div>

      <a class="btn" href="${BTN4_URL}" target="_blank">APK</a>
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

setInterval(function(){
index = (index + 1) % SLIDES.length;
slides.style.transform = "translateX(-" + (index*100) + "%)";
},3000);

// tombol X
wrap.querySelector("#closeBtn").onclick = function(){
wrap.remove();
};

// klik luar popup
wrap.onclick = function(e){
if (!e.target.closest("#popup_final")) {
wrap.remove();
}
};

}

/* ================= RUN ================= */

window.addEventListener("load", function(){
setTimeout(init,800);
});

})();
