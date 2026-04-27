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

    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    const database = firebase.database();

    // --- Elemen UI Existing ---
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

   // --- 1. Hero Slideshow Logic (Fixed) ---
    function showImage(nextIndex) {
        if (!heroBgImages.length) return;
        
        const currentImg = heroBgImages[currentImageIndex];
        const nextImg = heroBgImages[nextIndex];

        // Reset semua status agar tidak ada class 'exit' yang tertinggal
        heroBgImages.forEach(img => img.classList.remove("exit"));

        if (currentImg) {
            currentImg.classList.remove("active");
            currentImg.classList.add("exit"); // Foto lama keluar
        }
        
        if (nextImg) {
            nextImg.classList.add("active"); // Foto baru masuk (Z-index lebih tinggi)
        }

        currentImageIndex = nextIndex;
    }

    function startSlideshow() {
        // Gunakan interval agar perulangan otomatis berjalan setiap 11 detik
        if (slideshowTimeout) clearInterval(slideshowTimeout); 
        
        slideshowTimeout = setInterval(() => {
            const nextIndex = (currentImageIndex + 1) % heroBgImages.length;
            showImage(nextIndex);
        }, 11000);
    }
    
   // --- 2. Scroll Trigger Logic ---
function animateOnScroll() {
    const windowHeight = window.innerHeight;
    const revealElements = document.querySelectorAll(".reveal");

    // Efek Reveal Tanggal
    revealElements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < windowHeight - 50) {
            el.classList.add("active");
        }
    });

    // Efek Animasi Map
    if (mapSection && !mapSection.classList.contains("animated")) {
        const rect = mapSection.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
            mapSection.style.opacity = "1";
            mapSection.style.transform = "translateY(0)";
            mapSection.classList.add("animated");
        }
    }

    // Efek Animasi Kartu Pengantin
    pengantinCards.forEach((card) => {
        if (card.classList.contains("animated")) return;
        const rect = card.getBoundingClientRect();
        if (rect.top < windowHeight - 100) {
            card.classList.add("animated");
        }
    });

    // Efek Animasi Gallery
    galleryItems.forEach((item) => {
        if (item.classList.contains("animated")) return;
        const rect = item.getBoundingClientRect();
        if (rect.top < windowHeight - 50) {
            item.classList.add("animated");
        }
    });
}
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
                
                startSlideshow(); 
                animateOnScroll(); 
            }, 500);

            if (music) {
                music.play().catch(err => console.log("Autoplay dicegah browser"));
            }
        });
    }

    // --- 4. Countdown Timer ---
    const weddingDate = new Date("2026-05-06T10:00:00+08:00").getTime();
    const countdownInterval = setInterval(() => {
        const now = new Date().getTime();
        const diff = weddingDate - now;

        if (diff > 0) {
            const d = document.getElementById("days");
            const h = document.getElementById("hours");
            const m = document.getElementById("mins");
            const s = document.getElementById("secs");

            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const secs = Math.floor((diff % (1000 * 60)) / 1000);

            if(d) d.textContent = days.toString().padStart(2, '0');
            if(h) h.textContent = hours.toString().padStart(2, '0');
            if(m) m.textContent = mins.toString().padStart(2, '0');
            if(s) s.textContent = secs.toString().padStart(2, '0');
        } else {
            const countdownContainer = document.querySelector(".countdown");
            if(countdownContainer) countdownContainer.innerHTML = "<h4>Acara Sedang Berlangsung</h4>";
            clearInterval(countdownInterval);
        }
    }, 1000);

    // --- 5. Logika RSVP (Firebase Realtime) ---
    const rsvpForm = document.getElementById('rsvpForm');
    if(rsvpForm) {
        rsvpForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const nama = document.getElementById('inputNama').value;
            const kehadiran = document.getElementById('inputHadir').value;
            const pesan = document.getElementById('inputPesan').value;
            const waktu = new Date().getTime();

            const newPostRef = database.ref('ucapan').push();
            newPostRef.set({
                nama: nama,
                kehadiran: kehadiran,
                pesan: pesan,
                waktu: waktu
            }).then(() => {
    rsvpForm.reset(); 
    // Notifikasi Custom yang Elegan
        Swal.fire({
        title: 'Sukses!',
        text: 'Terima kasih, ucapan Anda telah tersimpan.',
        icon: 'success',
        confirmButtonText: 'OK',
        confirmButtonColor: '#8d7a5f', // Warna disesuaikan dengan tema Griya Taksu
        background: '#ffffff',
        customClass: {
            title: 'font-forum', // Jika ingin menyesuaikan font
            popup: 'rounded-4'
            }
        });
        }).catch((error) => {
                console.error("Gagal menyimpan:", error);
            });
        });
    }

    // Tampilkan Ucapan Realtime
    const commentContainer = document.querySelector('.comment-container');
    if(commentContainer) {
        database.ref('ucapan').orderByChild('waktu').on('value', (snapshot) => {
            let html = '';
            snapshot.forEach((childSnapshot) => {
                const data = childSnapshot.val();
                html = `
                    <div class="comment-item">
                        <div class="comment-header">
                            <span class="comment-name">${data.nama}</span>
                            <span class="badge-hadir">${data.kehadiran}</span>
                        </div>
                        <p class="comment-text">${data.pesan}</p>
                        <div class="comment-footer">
                            <small>Baru saja</small>
                            <span class="reply-btn">Reply</span>
                        </div>
                    </div>
                    <hr class="comment-divider">
                ` + html; 
            });
            commentContainer.innerHTML = html;
        });
    }

    // --- 6. Gallery Modal & Navigation ---
    const galleryImages = ['foto1.webp', 'foto2.webp', 'foto3.webp', 'foto4.webp', 'foto5.webp', 'foto6.webp', 'foto7.webp', 'foto8.webp'];
    let currentGalleryIndex = 0;
    const modalImg = document.getElementById('galleryModalImage');
    const nextBtn = document.getElementById('nextGalleryBtn');
    const prevBtn = document.getElementById('prevGalleryBtn');

    document.querySelectorAll('.photo-gallery a').forEach((item, index) => {
        item.addEventListener('click', function() {
            currentGalleryIndex = index;
            if(modalImg) modalImg.src = galleryImages[currentGalleryIndex];
            if(prevBtn) prevBtn.style.display = 'block';
            if(nextBtn) nextBtn.style.display = 'block';
        });
    });

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

    // --- 7. Music Toggle & Copy Bank Logic ---
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
                Swal.fire({
                    toast: true,
                    position: 'top-end',
                    icon: 'success',
                    title: 'No. Rekening tersalin!',
                    showConfirmButton: false,
                    timer: 2000,
                    timerProgressBar: true
                });
            });
        }
    });
}
    function adjustHeroHeight() {
    if (window.innerWidth <= 768) {
        const vh = window.innerHeight;
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.height = `${vh}px`;
        }
    }
}

// Jalankan saat load dan saat buka undangan
window.addEventListener('load', adjustHeroHeight);
// Panggil fungsi ini juga di dalam event listener openBtn.click
openBtn.addEventListener("click", function(e) {
    // ... kode yang sudah ada ...
    adjustHeroHeight(); // Tambahkan ini
});
})();
