(function () {
    const openBtn = document.getElementById("open-invitation-btn");
    const coverPage = document.querySelector(".cover");
    const mainContent = document.getElementById("main-content");
    const music = document.getElementById("bg-music");
    const heroBgImages = document.querySelectorAll(".hero-bg-img");
    
    // Elemen Animasi
    const pengantinCards = document.querySelectorAll("#pengantin .col-lg-6");
    const galleryItems = document.querySelectorAll(".photo-gallery a");
    
    let currentImageIndex = 0;
    let slideshowTimeout;

    // --- 1. Hero Slideshow Logic ---
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
        }, 11000);
    }

    // --- 2. Scroll Trigger Logic (Pengantin & Galeri) ---
   function animateOnScroll() {
        // Ambil posisi scroll saat ini
        const windowHeight = window.innerHeight;

        // Animasi Pengantin
        pengantinCards.forEach((card) => {
            if (card.classList.contains("animated")) return;
            const rect = card.getBoundingClientRect();
            // Trigger ketika elemen sudah masuk 100px ke dalam layar
            if (rect.top < windowHeight - 100) {
                card.classList.add("animated");
            }
        });

       // Animasi Galeri (Gantung)
        galleryItems.forEach((item) => {
            if (item.classList.contains("animated")) return;
            const rect = item.getBoundingClientRect();
            // Dibuat lebih sensitif agar tidak nyangkut
            if (rect.top < windowHeight - 50) {
                item.classList.add("animated");
            }
        });
    }
// PENTING: Jalankan fungsi sekali saat window di-resize atau di-scroll
    window.addEventListener("scroll", animateOnScroll);
    window.addEventListener("resize", animateOnScroll);
    
    // --- 3. Buka Undangan Event ---
    if (openBtn) {
        openBtn.addEventListener("click", function(e) {
            e.preventDefault();
            coverPage.classList.add("fade-out");
            
            setTimeout(() => {
                coverPage.style.display = "none";
                mainContent.classList.add("fade-in");
                document.body.style.overflow = "auto";
                
                // Jalankan fungsi setelah terbuka
                startSlideshow(); 
                animateOnScroll(); 
            }, 500);

            if (music) {
                music.play().catch(err => console.log("Autoplay dicegah browser"));
            }
        });
    }

    window.addEventListener("scroll", animateOnScroll);

    // --- 4. Countdown Timer ---
    const weddingDate = new Date("May 26, 2026 10:00:00").getTime(); // Sesuaikan tanggal
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

    // --- 5. Gallery Modal & Navigation ---
    const galleryImages = ['foto1.webp', 'foto2.webp', 'foto3.webp', 'foto4.webp', 'foto5.webp', 'foto6.webp', 'foto7.webp', 'foto8.webp'];
    let currentGalleryIndex = 0;
    const modalImg = document.getElementById('galleryModalImage');
    const nextBtn = document.getElementById('nextGalleryBtn');
    const prevBtn = document.getElementById('prevGalleryBtn');

    // Klik Item Galeri
    document.querySelectorAll('.photo-gallery a').forEach((item, index) => {
        item.addEventListener('click', function() {
            currentGalleryIndex = index;
            if(modalImg) modalImg.src = galleryImages[currentGalleryIndex];
            if(prevBtn) prevBtn.style.display = 'block';
            if(nextBtn) nextBtn.style.display = 'block';
        });
    });

    // Klik Foto Profil Pengantin ke Modal
    document.querySelectorAll('.pengantin-card').forEach(item => {
        item.addEventListener('click', function() {
            const imgSrc = this.getAttribute('data-img');
            if(modalImg) modalImg.src = imgSrc;
            if(prevBtn) prevBtn.style.display = 'none';
            if(nextBtn) nextBtn.style.display = 'none';
        });
    });

    if(nextBtn) nextBtn.addEventListener('click', () => {
        currentGalleryIndex = (currentGalleryIndex + 1) % galleryImages.length;
        if(modalImg) modalImg.src = galleryImages[currentGalleryIndex];
    });

    if(prevBtn) prevBtn.addEventListener('click', () => {
        currentGalleryIndex = (currentGalleryIndex - 1 + galleryImages.length) % galleryImages.length;
        if(modalImg) modalImg.src = galleryImages[currentGalleryIndex];
    });

    // --- 6. Music Toggle & Copy Bank Logic ---
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
