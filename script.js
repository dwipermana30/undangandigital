(function () {
    const openBtn = document.getElementById("open-invitation-btn");
    const coverPage = document.querySelector(".cover");
    const mainContent = document.getElementById("main-content");
    const music = document.getElementById("bg-music");
    const heroBgImages = document.querySelectorAll(".hero-bg-img");
    
    let currentImageIndex = 0;
    let slideshowTimeout;

    // --- Hero Slideshow
    function showImage(index) {
        heroBgImages.forEach(img => img.classList.remove("active"));
        heroBgImages[index].classList.add("active");
    }

    function startSlideshow() {
        clearTimeout(slideshowTimeout);
        slideshowTimeout = setTimeout(() => {
            currentImageIndex = (currentImageIndex + 1) % heroBgImages.length;
            showImage(currentImageIndex);
            startSlideshow();
        }, 6000); // Ganti foto setiap 6 detik agar terasa dinamis
    }

    // --- Buka Undangan Logic
    if (openBtn) {
        openBtn.addEventListener("click", () => {
            coverPage.classList.add("fade-out");
            setTimeout(() => {
                coverPage.style.display = "none";
                mainContent.classList.add("fade-in");
                document.body.style.overflow = "auto";
                startSlideshow(); // Mulai slideshow setelah undangan dibuka
            }, 500);
            
            if (music) {
                music.play().catch(e => console.log("Autoplay blocked:", e));
            }
        });
    }

    // --- Countdown Timer
    const weddingDate = new Date("April 26, 2026 10:00:00").getTime();
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

    // --- Music Toggle
    const musicBtn = document.getElementById("music-btn");
    if (musicBtn && music) {
        musicBtn.addEventListener("click", () => {
            if (music.paused) {
                music.play();
                musicBtn.textContent = "🎵";
            } else {
                music.pause();
                musicBtn.textContent = "🔇";
            }
        });
    }

    // --- Gallery Modal Logic
    const galleryImages = ['foto1.webp', 'foto2.webp', 'foto3.webp', 'foto4.webp', 'foto5.webp', 'foto6.webp', 'foto7.webp', 'foto8.webp'];
    let currentGalleryIndex = 0;
    const modalImg = document.getElementById('galleryModalImage');

    document.querySelectorAll('[data-bs-target="#galleryModal"]').forEach(item => {
        item.addEventListener('click', function() {
            currentGalleryIndex = parseInt(this.getAttribute('data-index'));
            modalImg.src = galleryImages[currentGalleryIndex];
        });
    });

    document.getElementById('nextGalleryBtn').addEventListener('click', () => {
        currentGalleryIndex = (currentGalleryIndex + 1) % galleryImages.length;
        modalImg.src = galleryImages[currentGalleryIndex];
    });

    document.getElementById('prevGalleryBtn').addEventListener('click', () => {
        currentGalleryIndex = (currentGalleryIndex - 1 + galleryImages.length) % galleryImages.length;
        modalImg.src = galleryImages[currentGalleryIndex];
    });

    // --- Copy Rekening
    const copyBtn = document.getElementById('copyBtn');
    if(copyBtn) {
        copyBtn.addEventListener('click', () => {
            const accNum = document.querySelector('.accnum').textContent;
            navigator.clipboard.writeText(accNum).then(() => {
                const originalText = copyBtn.textContent;
                copyBtn.textContent = 'Tersalin!';
                setTimeout(() => copyBtn.textContent = originalText, 2000);
            });
        });
    }
})();
