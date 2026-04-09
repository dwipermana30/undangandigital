(function () {
    const openBtn = document.getElementById("open-invitation-btn");
    const coverPage = document.querySelector(".cover");
    const music = document.getElementById("bg-music");
    const heroBgImages = document.querySelectorAll(".hero-bg-img");
    
    let currentImageIndex = 0;

    // Slideshow
    function startSlideshow() {
        setInterval(() => {
            heroBgImages[currentImageIndex].classList.remove("active");
            currentImageIndex = (currentImageIndex + 1) % heroBgImages.length;
            heroBgImages[currentImageIndex].classList.add("active");
        }, 5000);
    }

    // Buka Undangan
    if (openBtn) {
        openBtn.addEventListener("click", () => {
            coverPage.classList.add("fade-out");
            document.body.style.overflow = "auto";
            startSlideshow();
            if (music) {
                music.play().catch(e => console.log("Music error:", e));
            }
        });
    }

    // Countdown 06 Mei 2026
    const weddingDate = new Date("May 6, 2026 10:00:00").getTime();
    setInterval(() => {
        const now = new Date().getTime();
        const diff = weddingDate - now;
        if (diff > 0) {
            document.getElementById("days").textContent = Math.floor(diff / (1000 * 60 * 60 * 24)).toString().padStart(2, '0');
            document.getElementById("hours").textContent = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString().padStart(2, '0');
            document.getElementById("mins").textContent = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0');
            document.getElementById("secs").textContent = Math.floor((diff % (1000 * 60)) / 1000).toString().padStart(2, '0');
        }
    }, 1000);

    // Music Toggle
    const musicBtn = document.getElementById("music-btn");
    if (musicBtn && music) {
        musicBtn.addEventListener("click", () => {
            if (music.paused) { music.play(); musicBtn.textContent = "🎵"; }
            else { music.pause(); musicBtn.textContent = "🔇"; }
        });
    }
})();
