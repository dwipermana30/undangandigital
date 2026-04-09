(function () {
    const openBtn = document.getElementById("open-invitation-btn");
    const coverPage = document.querySelector(".cover");
    const mainContent = document.getElementById("main-content");
    const music = document.getElementById("bg-music");
    const heroBgImages = document.querySelectorAll(".hero-bg-img");
    
    let currentImageIndex = 0;
    let slideshowTimeout;

    // --- Hero Slideshow Logic ---
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
        }, 1500);
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

    // --- Buka Undangan Logic (FIXED) ---
    if (openBtn) {
        openBtn.addEventListener("click", function(e) {
            e.preventDefault();
            
            // Animasi menghilang
            if (coverPage) {
                coverPage.classList.add("fade-out");
                coverPage.style.pointerEvents = "none"; 
            }

            setTimeout(() => {
                if (coverPage) coverPage.style.display = "none";
                
                // Tampilkan konten utama
                if (mainContent) {
                    mainContent.classList.add("fade-in");
                    mainContent.style.visibility = "visible";
                }
                
                document.body.style.overflow = "auto";
                
                // Jalankan fungsi tambahan
                startSlideshow();
                if (music) {
                    music.play().catch(err => console.log("Autoplay blocked"));
                }
            }, 800);
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
            if(d) d.textContent = Math.floor(diff / (1000 * 60 * 60 * 24)).toString().padStart(2, '0');
            if(h) h.textContent = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString().padStart(2, '0');
            if(m) m.textContent = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0');
            if(s) s.textContent = Math.floor((diff % (1000 * 60)) / 1000).toString().padStart(2, '0');
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

    // --- Gallery Modal Logic ---
    const galleryImages = ['foto1.webp', 'foto3.webp', 'foto4.webp', 'foto5.webp', 'foto6.webp', 'foto7.webp'];
    let currentGalleryIndex = 0;
    const modalImg = document.getElementById('galleryModalImage');

    document.querySelectorAll('[data-bs-target="#galleryModal"]').forEach(item => {
        item.addEventListener('click', function() {
            currentGalleryIndex = parseInt(this.getAttribute('data-index'));
            if(modalImg) modalImg.src = galleryImages[currentGalleryIndex];
        });
    });

    const nextBtn = document.getElementById('nextGalleryBtn'), prevBtn = document.getElementById('prevGalleryBtn');
    if(nextBtn) nextBtn.addEventListener('click', () => {
        currentGalleryIndex = (currentGalleryIndex + 1) % galleryImages.length;
        if(modalImg) modalImg.src = galleryImages[currentGalleryIndex];
    });
    if(prevBtn) prevBtn.addEventListener('click', () => {
        currentGalleryIndex = (currentGalleryIndex - 1 + galleryImages.length) % galleryImages.length;
        if(modalImg) modalImg.src = galleryImages[currentGalleryIndex];
    });

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
