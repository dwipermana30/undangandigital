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

    // --- 2. Scroll Trigger Logic ---
    function animateOnScroll() {
        const windowHeight = window.innerHeight;

        pengantinCards.forEach((card) => {
            if (card.classList.contains("animated")) return;
            const rect = card.getBoundingClientRect();
            if (rect.top < windowHeight - 100) {
                card.classList.add("animated");
            }
        });

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
                alert("Terima kasih, ucapan Anda telah tersimpan!");
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
                    const originalText = copyBtn.textContent;
                    copyBtn.textContent = 'Tersalin!';
                    setTimeout(() => copyBtn.textContent = originalText, 2000);
                });
            }
        });
    }
})();
