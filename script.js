(function () {
    const openBtn = document.getElementById("open-invitation-btn");
    const coverPage = document.querySelector(".cover");
    const mainContent = document.getElementById("main-content");
    const music = document.getElementById("bg-music");
    const heroBgImages = document.querySelectorAll(".hero-bg-img");
    let currentImageIndex = 0;
    let slideshowTimeout;
    let isPaused = false;

    // --- Hero Slideshow
    function showImage(index) {
        heroBgImages.forEach(img => {
            img.classList.remove("active");
            img.style.animation = 'none';
            img.offsetHeight;
        });

        heroBgImages[index].classList.add("active");
        heroBgImages[index].style.animation = 'kenburns 15s infinite alternate';
    }

    function nextImage() {
        currentImageIndex = (currentImageIndex + 1) % heroBgImages.length;
        showImage(currentImageIndex);
    }

    function startSlideshow() {
        if (heroBgImages.length > 1 && !isPaused) {
            clearTimeout(slideshowTimeout);
            slideshowTimeout = setTimeout(() => {
                nextImage();
                startSlideshow();
            }, 8000); // Ganti foto setiap 8 detik
        }
    }

    function pauseSlideshow() {
        isPaused = true;
        clearTimeout(slideshowTimeout);
    }
    function resumeSlideshow() {
        isPaused = false;
        startSlideshow();
    }

    showImage(currentImageIndex);
    startSlideshow();

    // --- Cover Page dan Music
    if (openBtn) {
        openBtn.addEventListener("click", () => {
            coverPage.classList.add("fade-out");
            setTimeout(() => {
                coverPage.style.display = "none";
                mainContent.classList.add("fade-in");
                document.body.style.overflow = "auto";
            }, 500);
            if (music) {
                music.play()
                    .then(() => console.log("Musik diputar otomatis."))
                    .catch(e => console.log("Autoplay diblokir:", e));
            }
        });
    }

    // --- Countdown Timer
    const countdownElement = document.getElementById("countdown");
    if (countdownElement) {
        const weddingDate = new Date("April 26, 2026 10:00:00").getTime();
        const updateCountdown = setInterval(() => {
            const now = new Date().getTime();
            const distance = weddingDate - now;
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            if (distance < 0) {
                clearInterval(updateCountdown);
                countdownElement.innerHTML = "<div><span>Acara Sedang Berlangsung</span></div>";
            } else {
                document.getElementById("days").textContent = days.toString().padStart(2, '0');
                document.getElementById("hours").textContent = hours.toString().padStart(2, '0');
                document.getElementById("mins").textContent = minutes.toString().padStart(2, '0');
                document.getElementById("secs").textContent = seconds.toString().padStart(2, '0');
            }
        }, 1000);
    }

    // --- Music Toggle Button
    const musicBtn = document.getElementById("music-btn");
    if (music && musicBtn) {
        const updateBtn = () => {
            musicBtn.textContent = music.paused ? "🔇" : "🎵";
        };
        updateBtn();
        musicBtn.addEventListener("click", () => {
            if (music.paused) {
                music.play()
                    .then(() => console.log("Musik diputar."))
                    .catch((e) => {
                        alert("Autoplay diblokir oleh browser. Silakan klik lagi untuk memutar musik.");
                        console.log("Autoplay blocked:", e);
                    });
            } else {
                music.pause();
                console.log("Musik dijeda.");
            }
            updateBtn();
        });
        music.addEventListener("play", updateBtn);
        music.addEventListener("pause", updateBtn);
    }

    // --- Copy Account Number
    const copyBtn = document.getElementById('copyBtn');
    if(copyBtn) {
        copyBtn.addEventListener('click', () => {
            const accNum = document.querySelector('.accnum').textContent;
            navigator.clipboard.writeText(accNum)
                .then(() => {
                    copyBtn.textContent = 'Nomor disalin!';
                    setTimeout(() => copyBtn.textContent = 'Copy Account Number', 2000);
                })
                .catch(err => {
                    console.error('Gagal menyalin: ', err);
                });
        });
    }

    // --- Galeri Modal & Swipe Functionality ---
    const galleryModal = document.getElementById('galleryModal');
    const galleryImages = [
        'foto1.jpg', 'foto2.jpg', 'foto3.jpg', 'foto4.jpg', 
        'foto5.jpg', 'foto6.jpg', 'foto7.jpg', 'foto8.jpg'
    ];
    let currentGalleryIndex = 0;
    const galleryModalImage = document.getElementById('galleryModalImage');
    const prevGalleryBtn = document.getElementById('prevGalleryBtn');
    const nextGalleryBtn = document.getElementById('nextGalleryBtn');
    let startX = null; // Untuk swipe

    galleryModal.addEventListener('show.bs.modal', function (event) {
        const button = event.relatedTarget;
        currentGalleryIndex = parseInt(button.getAttribute('data-index'));
        updateGalleryImage(currentGalleryIndex);
    });

    prevGalleryBtn.addEventListener('click', () => {
        currentGalleryIndex = (currentGalleryIndex - 1 + galleryImages.length) % galleryImages.length;
        updateGalleryImage(currentGalleryIndex);
    });

    nextGalleryBtn.addEventListener('click', () => {
        currentGalleryIndex = (currentGalleryIndex + 1) % galleryImages.length;
        updateGalleryImage(currentGalleryIndex);
    });

    function updateGalleryImage(index) {
        galleryModalImage.src = galleryImages[index];
    }

    // Event listener untuk swipe
    galleryModal.addEventListener('touchstart', function(e) {
        startX = e.touches[0].clientX;
    });

    galleryModal.addEventListener('touchend', function(e) {
        if (startX === null) return;
        const endX = e.changedTouches[0].clientX;
        const diffX = endX - startX;

        // Jika swipe cukup jauh (misal > 50px)
        if (Math.abs(diffX) > 50) {
            if (diffX > 0) {
                // Swipe ke kanan (sebelumnya)
                currentGalleryIndex = (currentGalleryIndex - 1 + galleryImages.length) % galleryImages.length;
            } else {
                // Swipe ke kiri (selanjutnya)
                currentGalleryIndex = (currentGalleryIndex + 1) % galleryImages.length;
            }
            updateGalleryImage(currentGalleryIndex);
        }
        startX = null;
    });

    // --- Disable Context Menu & Drag
    document.addEventListener('contextmenu', function(e) {
        if (e.target.nodeName === 'IMG' || e.target.closest('.pengantin-card') || e.target.closest('.photo-gallery')) {
            e.preventDefault();
        }
    });

    document.addEventListener('dragstart', function(e) {
        if (e.target.nodeName === 'IMG' || e.target.closest('.pengantin-card') || e.target.closest('.photo-gallery')) {
            e.preventDefault();
        }
    });
})();