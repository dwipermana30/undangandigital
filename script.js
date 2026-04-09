(function () {
    const openBtn = document.getElementById("open-invitation-btn");
    const coverPage = document.querySelector(".cover");
    const mainContent = document.getElementById("main-content");
    const music = document.getElementById("bg-music");
    const heroBgImages = document.querySelectorAll(".hero-bg-img");
    
    let currentImageIndex = 0;
    let slideshowTimeout;
    const slideshowDuration = 12000;

    // --- Slideshow Logic ---
   function showImage(nextIndex) {
        const currentImg = heroBgImages[currentImageIndex];
        const nextImg = heroBgImages[nextIndex];

        // 1. Beri class 'exit' pada foto yang sedang tampil (mulai blur & fade out)
        if (currentImg) {
            currentImg.classList.remove("active");
            currentImg.classList.add("exit");
        }

        // 2. Bersihkan class 'exit' dari foto sebelumnya yang sudah tidak tampil
        heroBgImages.forEach((img, idx) => {
            if (idx !== currentImageIndex && idx !== nextIndex) {
                img.classList.remove("exit");
            }
        });

        // 3. Munculkan foto berikutnya (tanpa blur, mulai animasi zoom baru)
        if (nextImg) {
            nextImg.classList.remove("exit");
            nextImg.classList.add("active");
        }

        // Update index saat ini
        currentImageIndex = nextIndex;
    }

    function startSlideshow() {
        // Bersihkan timeout lama jika ada
        clearTimeout(slideshowTimeout);
        
        // Loop slideshow
        slideshowTimeout = setTimeout(() => {
            const nextIndex = (currentImageIndex + 1) % heroBgImages.length;
            showImage(nextIndex);
            startSlideshow(); // Panggil ulang untuk foto berikutnya
        }, slideshowDuration);
    }
    // --- Buka Undangan Logic ---
    if (openBtn) {
        openBtn.addEventListener("click", function(e) {
            e.preventDefault();
            coverPage.classList.add("fade-out");
            
            setTimeout(() => {
                coverPage.style.display = "none";
                mainContent.classList.add("fade-in");
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

    // --- Gallery & Copy (TIDAK DIUBAH) ---
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
