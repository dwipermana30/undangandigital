let currentImageIndex = 0;
let slideshowTimeout;

    // --- Slideshow Logic ---
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

        // Membersihkan class exit setelah transisi selesai
setTimeout(() => {
heroBgImages.forEach((img, idx) => {
if (idx !== nextIndex) img.classList.remove("exit");
@@ -37,27 +41,29 @@
const nextIndex = (currentImageIndex + 1) % heroBgImages.length;
showImage(nextIndex);
startSlideshow();
        }, 9000); 
        }, 9000); // Sinkron dengan siklus zoom di CSS agar tidak melompat
}

    // --- Buka Undangan Logic ---
if (openBtn) {
openBtn.addEventListener("click", function(e) {
e.preventDefault();
coverPage.classList.add("fade-out");
            
setTimeout(() => {
coverPage.style.display = "none";
                if (mainContent) {
                    mainContent.classList.add("fade-in");
                    mainContent.style.visibility = "visible";
                }
                mainContent.classList.add("fade-in");
document.body.style.overflow = "auto";
startSlideshow(); 
}, 800);
            if (music) music.play().catch(err => console.log("Music blocked"));
            
            if (music) {
                music.play().catch(err => console.log("Music blocked"));
            }
});
}

    // --- COUNTDOWN TIMER ---
    // --- Countdown Timer ---
const weddingDate = new Date("April 26, 2026 10:00:00").getTime();
setInterval(() => {
const now = new Date().getTime();
@@ -72,7 +78,7 @@
}
}, 1000);

    // --- MUSIC & COPY REKENING ---
    // --- Music Toggle ---
const musicBtn = document.getElementById("music-btn");
if (musicBtn && music) {
musicBtn.addEventListener("click", () => {
@@ -81,15 +87,36 @@
});
}

    // --- Gallery & Copy (TIDAK DIUBAH) ---
    const galleryImages = ['foto1.webp', 'foto3.webp', 'foto4.webp', 'foto5.webp', 'foto6.webp', 'foto7.webp'];
    let currentGalleryIndex = 0;
    const modalImg = document.getElementById('galleryModalImage');

    document.querySelectorAll('[data-bs-target="#galleryModal"]').forEach(item => {
        item.addEventListener('click', function() {
            currentGalleryIndex = parseInt(this.getAttribute('data-index'));
            if(modalImg) modalImg.src = galleryImages[currentGalleryIndex];
        });
    });

    const nextBtn = document.getElementById('nextGalleryBtn'), prevBtn = document.getElementById('prevGalleryBtn');
    if(nextBtn) nextBtn.addEventListener('click', () => {
        currentGalleryIndex = (currentGalleryIndex + 1) % galleryImages.length;
        if(modalImg) modalImg.src = galleryImages[currentGalleryIndex];
    });
    if(prevBtn) prevBtn.addEventListener('click', () => {
        currentGalleryIndex = (currentGalleryIndex - 1 + galleryImages.length) % galleryImages.length;
        if(modalImg) modalImg.src = galleryImages[currentGalleryIndex];
    });

const copyBtn = document.getElementById('copyBtn');
if(copyBtn) {
copyBtn.addEventListener('click', () => {
const accNum = document.querySelector('.accnum')?.textContent;
if(accNum) {
navigator.clipboard.writeText(accNum).then(() => {
                    const originalText = copyBtn.textContent;
copyBtn.textContent = 'Tersalin!';
                    setTimeout(() => copyBtn.textContent = originalText, 2000);
                    setTimeout(() => copyBtn.textContent = 'Salin No. Rekening', 2000);
});
}
});
