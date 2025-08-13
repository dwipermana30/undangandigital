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
            // Tambahkan kelas untuk memulai animasi fade out pada cover
            coverPage.classList.add("fade-out");

            // Tunggu hingga animasi cover selesai
            setTimeout(() => {
                coverPage.style.display = "none";
                mainContent.classList.add("fade-in");
                document.body.style.overflow = "auto"; /* Aktifkan kembali pengguliran */
            }, 500); /* Waktu ini harus sesuai dengan durasi transisi di CSS */

            // Putar musik secara otomatis setelah interaksi pengguna
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
    const eventDate = new Date(2026, 3, 26, 8, 0, 0);
    const daysEl = document.getElementById("days");
    const hoursEl = document.getElementById("hours");
    const minsEl = document.getElementById("mins");
    const secsEl = document.getElementById("secs");

    if (daysEl && hoursEl && minsEl && secsEl) {
        function updateCountdown() {
            const now = new Date();
            let diff = Math.max(0, eventDate - now);
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            diff -= days * (1000 * 60 * 60 * 24);
            const hours = Math.floor(diff / (1000 * 60 * 60));
            diff -= hours * (1000 * 60 * 60);
            const minutes = Math.floor(diff / (1000 * 60));
            diff -= minutes * (1000 * 60);
            const seconds = Math.floor(diff / 1000);
            daysEl.textContent = String(days).padStart(2, "0");
            hoursEl.textContent = String(hours).padStart(2, "0");
            minsEl.textContent = String(minutes).padStart(2, "0");
            secsEl.textContent = String(seconds).padStart(2, "0");
        }
        updateCountdown();
        setInterval(updateCountdown, 1000);
    }

    // ===================================
    // Copy Account Number
    // ===================================
    const copyBtn = document.getElementById("copyBtn");
    if (copyBtn) {
        copyBtn.addEventListener("click", function () {
            const accEl = document.querySelector(".gift-card .accnum");
            const acc = accEl?.textContent?.trim();
            if (!acc) {
                alert("Nomor rekening tidak ditemukan.");
                return;
            }
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(acc)
                    .then(() => {
                        const prevText = this.textContent;
                        this.textContent = "Copied ✓";
                        setTimeout(() => (this.textContent = prevText), 2000);
                    })
                    .catch(() => {
                        alert("Gagal menyalin. Silakan salin manual.");
                    });
            } else {
                const ta = document.createElement("textarea");
                ta.value = acc;
                document.body.appendChild(ta);
                ta.select();
                try {
                    document.execCommand("copy");
                    this.textContent = "Copied ✓";
                    setTimeout(() => (this.textContent = "Copy Account Number"), 2000);
                } catch {
                    alert("Gagal menyalin. Silakan salin manual.");
                } finally {
                    document.body.removeChild(ta);
                }
            }
        });
    }

    // ===================================
    // Kontrol Musik
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
})();

document.addEventListener('DOMContentLoaded', function () {
    // Kode untuk slideshow background
    const heroSection = document.querySelector('.hero');
    const images = ['foto1.jpg', 'foto2.jpg', 'foto3.jpg', 'foto4.jpg'];
    let currentIndex = 0;

    function changeHeroBackground() {
        heroSection.style.backgroundImage = `url('${images[currentIndex]}')`;
        currentIndex = (currentIndex + 1) % images.length;
    }

    // Ganti foto pertama kali saat halaman dimuat
    changeHeroBackground();

    // Ganti foto setiap 2 detik
    setInterval(changeHeroBackground, 2000);

});
