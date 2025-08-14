(function () {
    const openBtn = document.getElementById("open-invitation-btn");
    const coverPage = document.querySelector(".cover");
    const mainContent = document.getElementById("main-content");
    const music = document.getElementById("bg-music");
    const heroBgImg = document.getElementById("hero-bg"); // Gunakan ID baru untuk tag <img>

    const slideshowImages = ["foto1.jpg", "foto2.jpg", "foto3.jpg", "foto4.jpg"];
    let currentImageIndex = 0;
    let slideshowInterval = null;

    function startSlideshow() {
        if (heroBgImg && slideshowImages.length > 0) {
            heroBgImg.style.opacity = '1';
            
            // Perubahan src pada tag <img> lebih andal
            slideshowInterval = setInterval(() => {
                currentImageIndex = (currentImageIndex + 1) % slideshowImages.length;
                heroBgImg.src = slideshowImages[currentImageIndex];
            }, 5000);
        }
    }

    if (openBtn) {
        openBtn.addEventListener("click", () => {
            coverPage.classList.add("fade-out");
            
            setTimeout(() => {
                coverPage.style.display = "none";
                mainContent.classList.add("fade-in");
                document.body.style.overflow = "auto";
                startSlideshow();
            }, 500);

            if (music) {
                music.play()
                    .then(() => {
                        console.log("Musik diputar otomatis.");
                    })
                    .catch((e) => {
                        console.log("Autoplay diblokir:", e);
                    });
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
                    .then(() => {
                        console.log("Musik diputar.");
                    })
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
    galleryModal.addEventListener('show.bs.modal', function (event) {
        const button = event.relatedTarget;
        const imageSource = button.getAttribute('data-src');
        const modalImage = galleryModal.querySelector('#galleryModalImage');
        modalImage.src = imageSource;
    });
    
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
