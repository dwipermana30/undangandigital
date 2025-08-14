(function () {
    // ===================================
    // Buka Undangan dengan Animasi
    // ===================================
    const openBtn = document.getElementById("open-invitation-btn");
    const coverPage = document.querySelector(".cover");
    const mainContent = document.getElementById("main-content");
    const music = document.getElementById("bg-music");

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
                    .then(() => {
                        console.log("Musik diputar otomatis.");
                    })
                    .catch((e) => {
                        console.log("Autoplay diblokir:", e);
                    });
            }
        });
    }

    // ===================================
    // Countdown (untuk tanggal acara)
    // ===================================
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

    // ===================================
    // Autoplay Musik & Tombol Kontrol
    // ===================================
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

    // ===================================
    // Salin Nomor Rekening
    // ===================================
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

    // ===================================
    // Logika Modal Galeri Foto (Bootstrap)
    // ===================================
    const galleryModal = document.getElementById('galleryModal');
    galleryModal.addEventListener('show.bs.modal', function (event) {
        const button = event.relatedTarget;
        const imageSource = button.getAttribute('data-src');
        const modalImage = galleryModal.querySelector('#galleryModalImage');
        modalImage.src = imageSource;
    });
    
    // ===================================
    // Slideshow Latar Belakang (Hero)
    // ===================================
    const heroBg = document.getElementById("hero-bg");
    const slideshowImages = ["foto1.jpg", "foto2.jpg", "foto3.jpg", "foto4.jpg"];
    let currentImageIndex = 0;

    function startSlideshow() {
        setInterval(() => {
            currentImageIndex = (currentImageIndex + 1) % slideshowImages.length;
            heroBg.style.backgroundImage = `url('${slideshowImages[currentImageIndex]}')`;
        }, 5000); // Ganti gambar setiap 5 detik
    }

    // Hanya jalankan slideshow setelah undangan dibuka
    openBtn.addEventListener("click", () => {
        // ... kode lain
        startSlideshow();
    });

    // ===================================
    // Menonaktifkan Klik Kanan di Semua Gambar dan Halaman
    // ===================================
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
