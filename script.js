(function () {
    const openBtn = document.getElementById("open-invitation-btn");
    const coverPage = document.querySelector(".cover");
    const mainContent = document.getElementById("main-content");
    const music = document.getElementById("bg-music");
    const heroBgImages = document.querySelectorAll(".hero-bg-img");
    let currentImageIndex = 0;
    let slideshowTimeout;
    let isPaused = false;
    let startX = null;

    // Accessibility ARIA-live region
    const heroText = document.querySelector('.hero-text');
    if (heroText) {
        heroText.setAttribute('aria-live', 'polite');
    }

    // Smooth fade transition with requestAnimationFrame
    function showImage(index) {
        heroBgImages.forEach((img, i) => {
            if (i === index) {
                img.classList.add("active");
                img.setAttribute('aria-hidden', 'false');
                img.tabIndex = 0;
            } else {
                img.classList.remove("active");
                img.setAttribute('aria-hidden', 'true');
                img.tabIndex = -1;
            }
        });
    }

    function nextImage() {
        currentImageIndex = (currentImageIndex + 1) % heroBgImages.length;
        showImage(currentImageIndex);
    }
    function prevImage() {
        currentImageIndex = (currentImageIndex - 1 + heroBgImages.length) % heroBgImages.length;
        showImage(currentImageIndex);
    }

    function startSlideshow() {
        if (heroBgImages.length > 1 && !isPaused) {
            clearTimeout(slideshowTimeout);
            slideshowTimeout = setTimeout(() => {
                nextImage();
                startSlideshow();
            }, 5000);
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

    // Touch support for mobile
    function handleTouchStart(e) {
        startX = e.touches[0].clientX;
    }
    function handleTouchEnd(e) {
        if (startX === null) return;
        let endX = e.changedTouches[0].clientX;
        let diffX = endX - startX;
        if (Math.abs(diffX) > 50) {
            pauseSlideshow();
            if (diffX > 0) {
                prevImage();
            } else {
                nextImage();
            }
            // Resume after a brief pause
            setTimeout(resumeSlideshow, 4000);
        }
        startX = null;
    }

    // Keyboard navigation for accessibility
    function handleKeydown(e) {
        if (document.activeElement.classList.contains('hero-bg-img')) {
            if (e.key === "ArrowRight") {
                pauseSlideshow();
                nextImage();
                setTimeout(resumeSlideshow, 4000);
            } else if (e.key === "ArrowLeft") {
                pauseSlideshow();
                prevImage();
                setTimeout(resumeSlideshow, 4000);
            }
        }
    }

    // Click/tap to pause slideshow
    const heroBg = document.querySelector('.hero-bg');
    if (heroBg) {
        heroBg.addEventListener('click', function () {
            if (!isPaused) {
                pauseSlideshow();
            } else {
                resumeSlideshow();
            }
        });
        heroBg.addEventListener('touchstart', handleTouchStart, {passive:true});
        heroBg.addEventListener('touchend', handleTouchEnd, {passive:true});
    }
    document.addEventListener('keydown', handleKeydown);

    // Init
    showImage(currentImageIndex);
    startSlideshow();

    // ...rest of your existing code (countdown, music, gallery, etc.) ...

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

    const galleryModal = document.getElementById('galleryModal');
    const galleryImages = [
        'foto1.jpg', 'foto2.jpg', 'foto3.jpg', 'foto4.jpg', 
        'foto5.jpg', 'foto6.jpg', 'foto7.jpg', 'foto8.jpg'
    ];
    let currentGalleryIndex = 0;
    const galleryModalImage = document.getElementById('galleryModalImage');
    const prevGalleryBtn = document.getElementById('prevGalleryBtn');
    const nextGalleryBtn = document.getElementById('nextGalleryBtn');

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