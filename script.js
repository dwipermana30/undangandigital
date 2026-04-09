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
            currentImg.classList.add("exit");
        }
        if (nextImg) {
            nextImg.classList.remove("exit");
            nextImg.classList.add("active");
        }

        setTimeout(() => {
            heroBgImages.forEach((img, idx) => {
                if (idx !== nextIndex) img.classList.remove("exit");
            });
        }, 2000);

        currentImageIndex = nextIndex;
    }

    function startSlideshow() {
        clearTimeout(slideshowTimeout);
        slideshowTimeout = setTimeout(() => {
            const nextIndex = (currentImageIndex + 1) % heroBgImages.length;
            showImage(nextIndex);
            startSlideshow();
        }, 9000); // Durasi ganti gambar
    }

    if (openBtn) {
        openBtn.addEventListener("click", function(e) {
            e.preventDefault();
            coverPage.classList.add("fade-out");
            setTimeout(() => {
                coverPage.style.display = "none";
                if (mainContent) {
                    mainContent.classList.add("fade-in");
                    mainContent.style.visibility = "visible";
                }
                document.body.style.overflow = "auto";
                startSlideshow(); 
            }, 800);
            
            if (music) {
                music.play().catch(err => console.log("Music blocked"));
            }
        });
    }

    // --- Countdown Timer ---
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

    // --- Music Toggle ---
    const musicBtn = document.getElementById("music-btn");
    if (musicBtn && music) {
        musicBtn.addEventListener("click", () => {
            if (music.paused) { music.play(); musicBtn.textContent = "🎵"; }
            else { music.pause(); musicBtn.textContent = "🔇"; }
        });
    }

    // --- Copy Rekening ---
    const copyBtn = document.getElementById('copyBtn');
    if(copyBtn) {
        copyBtn.addEventListener('click', () => {
            const accNum = document.querySelector('.accnum')?.textContent;
            if(accNum) {
                navigator.clipboard.writeText(accNum).then(() => {
                    const originalText = copyBtn.textContent;
                    copyBtn.textContent = 'Tersalin!';
                    setTimeout(() => copyBtn.textContent = originalText, 2000);
                });
            }
        });
    }
})();
