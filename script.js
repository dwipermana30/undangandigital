(function () {
    // --- 0. Konfigurasi & Inisialisasi Firebase ---
    const firebaseConfig = {
        apiKey: "AIzaSyCfVTqzeBvt5MuE-1cuuST_XfapPmwpV-s",
        authDomain: "undangan-dwi-niken.firebaseapp.com",
        databaseURL: "https://undangan-dwi-niken-default-rtdb.asia-southeast1.firebasedatabase.app",
        projectId: "undangan-dwi-niken",
        storageBucket: "undangan-dwi-niken.firebasestorage.app",
        messagingSenderId: "470175125544",
        appId: "1:470175125544:web:4009100d97e64374d4251d"
    };

    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }
    const database = firebase.database();

    // --- Elemen UI ---
    const openBtn = document.getElementById("open-invitation-btn");
    const coverPage = document.querySelector(".cover");
    const mainContent = document.getElementById("main-content");
    const music = document.getElementById("bg-music");
    const heroBgImages = document.querySelectorAll(".hero-bg-img");
    const pengantinCards = document.querySelectorAll("#pengantin .col-lg-6");
    const galleryItems = document.querySelectorAll(".photo-gallery a");
    const mapSection = document.querySelector("#location .map-responsive");
    
    let currentImageIndex = 0;
    let slideshowTimeout;

    // --- Fungsi Pembantu ---
    function adjustHeroHeight() {
        if (window.innerWidth <= 768) {
            const vh = window.innerHeight;
            const hero = document.querySelector('.hero');
            if (hero) hero.style.height = `${vh}px`;
        }
    }

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

    function animateOnScroll() {
        const windowHeight = window.innerHeight;
        if (mapSection && !mapSection.classList.contains("animated")) {
            const rect = mapSection.getBoundingClientRect();
            if (rect.top < windowHeight - 100) mapSection.classList.add("animated");
        }
        pengantinCards.forEach((card) => {
            const rect = card.getBoundingClientRect();
            if (rect.top < windowHeight - 100) card.classList.add("animated");
        });
        galleryItems.forEach((item) => {
            const rect = item.getBoundingClientRect();
            if (rect.top < windowHeight - 50) item.classList.add("animated");
        });
    }

    // --- Event Utama: Buka Undangan ---
    if (openBtn) {
        openBtn.addEventListener("click", function (e) {
            e.preventDefault();
            
            // UI Feedback
            this.innerHTML = "Memuat...";
            this.style.opacity = "0.7";

            // Transisi Cover
            if (coverPage) coverPage.classList.add("fade-out");
            
            setTimeout(() => {
                if (coverPage) coverPage.style.display = "none";
                if (mainContent) {
                    mainContent.classList.add("fade-in");
                    mainContent.style.opacity = "1";
                    mainContent.style.visibility = "visible";
                }
                
                // Aktifkan Scroll
                document.body.style.overflow = "auto";
                document.documentElement.style.overflow = "auto";
                
                // Jalankan Fitur
                startSlideshow(); 
                animateOnScroll(); 
                adjustHeroHeight();
            }, 600);

            // Putar musik
            if (music) {
                music.play().catch(() => console.log("Musik tertunda interaksi"));
            }
        });
    }

    // --- Countdown Timer ---
    const weddingDate = new Date("2026-05-06T10:00:00+08:00").getTime();
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

    // --- RSVP & Music Logic Tetap Sama ---
    // (Tambahkan sisa kode musik & copy bank Anda di sini)
    const musicBtn = document.getElementById("music-btn");
    if (musicBtn && music) {
        musicBtn.addEventListener("click", () => {
            if (music.paused) { music.play(); musicBtn.textContent = "🎵"; }
            else { music.pause(); musicBtn.textContent = " Valenciana"; }
        });
    }

    window.addEventListener("scroll", animateOnScroll);
    window.addEventListener("load", adjustHeroHeight);
})();
