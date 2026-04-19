(() => {

const CONFIG = {
  IMAGES: [
    "http://plcl.me/images/eCCez.png",
    "http://plcl.me/images/fNfUA.jpg",
  ],
  OVERLAY_ID: "IMG_POPUP",
  CLOSE_ID: "IMG_CLOSE",
  INTERVAL: 3000
};

let isShown = false;
let currentIndex = 0;
let sliderInterval;

const injectCSS = () => {
  if (document.getElementById("IMG_STYLE")) return;

  const style = document.createElement("style");
  style.id = "IMG_STYLE";
  style.textContent = `
#${CONFIG.OVERLAY_ID}{
  position:fixed;
  inset:0;
  background:rgba(0,0,0,.6);
  backdrop-filter: blur(8px);
  display:flex;
  align-items:center;
  justify-content:center;
  z-index:999999;
  animation: fadeIn .5s ease;
}

/* OVERLAY */
@keyframes fadeIn {
  from {opacity:0;}
  to {opacity:1;}
}

/* POPUP MASUK */
@keyframes popupIn {
  0% {
    transform: translateY(40px) scale(.85);
    opacity: 0;
  }
  60% {
    transform: translateY(-10px) scale(1.03);
    opacity: 1;
  }
  100% {
    transform: translateY(0) scale(1);
  }
}

/* FLOATING */
@keyframes float {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-8px); }
  100% { transform: translateY(0px); }
}

/* BOX */
.popup-box{
  background: rgba(255,255,255,0.05);
  backdrop-filter: blur(20px);
  border-radius: 16px;
  padding: 15px;
  box-shadow: 0 20px 60px rgba(0,0,0,.5);
  text-align:center;
  position: relative;

  animation: popupIn .6s ease, float 3s ease-in-out infinite;
}

/* PAUSE FLOAT SAAT HOVER */
.popup-box:hover{
  animation-play-state: paused;
}

/* IMAGE */
.slider img{
  width:500px;
  max-width:90%;
  border-radius:12px;
  transition: opacity .5s ease;
}

/* NAV */
.nav{
  position:absolute;
  top:50%;
  transform:translateY(-50%);
  font-size:24px;
  color:#fff;
  cursor:pointer;
  padding:10px;
  user-select:none;
  transition:.3s;
}
.nav:hover{
  transform: translateY(-50%) scale(1.2);
}
.nav.left{ left:0; }
.nav.right{ right:0; }

/* BUTTON */
#${CONFIG.CLOSE_ID}{
  margin-top:10px;
  background: linear-gradient(135deg,#1e90ff,#00c6ff);
  color:#fff;
  border:none;
  padding:8px 18px;
  border-radius:999px;
  font-size:14px;
  font-weight:bold;
  cursor:pointer;
  transition:.3s;
}
#${CONFIG.CLOSE_ID}:hover{
  transform: scale(1.08);
  box-shadow:0 5px 20px rgba(0,0,0,.3);
}
`;
  document.head.appendChild(style);
};

const renderHTML = () => `
<div id="${CONFIG.OVERLAY_ID}">
  <div class="popup-box">
    
    <div class="slider">
      <span class="nav left">&#10094;</span>
      <img id="popup-image" src="${CONFIG.IMAGES[0]}" />
      <span class="nav right">&#10095;</span>
    </div>

    <button id="${CONFIG.CLOSE_ID}">Tutup</button>
  </div>
</div>
`;

const updateImage = () => {
  const img = document.getElementById("popup-image");
  img.style.opacity = 0;

  setTimeout(() => {
    img.src = CONFIG.IMAGES[currentIndex];
    img.style.opacity = 1;
  }, 200);
};

const nextSlide = () => {
  currentIndex = (currentIndex + 1) % CONFIG.IMAGES.length;
  updateImage();
};

const prevSlide = () => {
  currentIndex = (currentIndex - 1 + CONFIG.IMAGES.length) % CONFIG.IMAGES.length;
  updateImage();
};

const startSlider = () => {
  sliderInterval = setInterval(nextSlide, CONFIG.INTERVAL);
};

const stopSlider = () => {
  clearInterval(sliderInterval);
};

const showPopup = () => {
  if (isShown) return;

  injectCSS();
  document.body.insertAdjacentHTML("beforeend", renderHTML());
  isShown = true;

  const overlay = document.getElementById(CONFIG.OVERLAY_ID);

  document.querySelector(".nav.right").onclick = () => {
    nextSlide();
    stopSlider();
  };

  document.querySelector(".nav.left").onclick = () => {
    prevSlide();
    stopSlider();
  };

  startSlider();

  document.getElementById(CONFIG.CLOSE_ID).onclick = () => {
    overlay.remove();
    stopSlider();
  };

  overlay.onclick = (e) => {
    if (e.target.id === CONFIG.OVERLAY_ID) {
      overlay.remove();
      stopSlider();
    }
  };
};

/* DELAY BIAR LEBIH NATURAL */
const init = () => setTimeout(showPopup, 800);

document.readyState === "loading"
  ? document.addEventListener("DOMContentLoaded", init)
  : init();

})();
