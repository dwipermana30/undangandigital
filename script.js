(function () {
    const openBtn = document.getElementById("open-invitation-btn");
    const coverPage = document.querySelector(".cover");
    const mainContent = document.getElementById("main-content");
    const music = document.getElementById("bg-music");
    const heroBgImages = document.querySelectorAll(".hero-bg-img");
    
    let currentImageIndex = 0;
    let slideshowTimeout;

    function showImage(nextIndex) {
        if (!heroBgImages.length) return;
        const currentImg = heroBgImages[currentImageIndex];
        const nextImg = heroBgImages[nextIndex];

        if (currentImg) {
            currentImg.classList.remove("active");
        }
        if (nextImg) {
            nextImg.classList.add("active");
        }
        currentImageIndex = nextIndex;
    }

    function startSlideshow() {
        if (!heroBgImages.length) return;
        clearTimeout(slideshowTimeout);
        slideshowTimeout = setTimeout(() => {
            const nextIndex = (currentImageIndex + 1) % heroBgImages.length;
            showImage(nextIndex);
            startSlideshow();
        }, 10000); 
    }

    if (openBtn) {
        openBtn.addEventListener("click", (e) => {
            e.preventDefault();
            coverPage.classList.add("fade-out");
            setTimeout(() => {
                coverPage.style.display = "none";
                mainContent.classList.add("fade-in");
                mainContent.style.visibility = "visible";
                document.body.style.overflow = "auto";
                startSlideshow(); 
                if (music) music.play().catch(err => console.log("Music blocked"));
            }, 800);
        });
    }

    // Countdown Logic
    const weddingDate = new Date("April 26, 2026 10:00:00").getTime();
    setInterval(() => {
        const now = new Date().getTime();
        const diff = weddingDate - now;
        if (diff > 0) {
            const d = document.getElementById("days"), h = document.getElementById("hours"),
                  m = document.getElementById("mins"), s = document.getElementById("secs");
            if(d) d.textContent = Math.floor(diff / (1000*60*60*24)).toString().padStart(2,'0');
            if(h) h.textContent = Math.floor((diff % (1000*60*60*24))/(1000*60*60)).toString().padStart(2,'0');
            if(m) m.textContent = Math.floor((diff % (1000*60*60))/(1000*60)).toString().padStart(2,'0');
            if(s) s.textContent = Math.floor((diff % (1000*60))/1000).toString().padStart(2,'0');
        }
    }, 1000);

    // Copy Rekening
    const copyBtn = document.getElementById('copyBtn');
    if(copyBtn) {
        copyBtn.addEventListener('click', () => {
            const accNum = document.querySelector('.accnum')?.textContent;
            if(accNum) {
                navigator.clipboard.writeText(accNum).then(() => {
                    copyBtn.textContent = 'Tersalin!';
                    setTimeout(() => copyBtn.textContent = 'Salin No. Rekening', 2000);
                });
            }
        });
    }
})();
