/**
 * V/ADIVER PRO 2026 - UI & UX CORE (LIMPIO PRO)
 * SOLO UI / EFECTOS / VISUAL
 * ⚠️ SIN lógica de autenticación
 */

/* ==========================================
   1. EFECTOS + INIT
========================================== */
document.addEventListener('DOMContentLoaded', () => {

    // --- PARALLAX HERO ---
    const sliderLeft = document.getElementById('sliderLeft');
    const sliderRight = document.getElementById('sliderRight');

    if (sliderLeft && sliderRight) {
        window.addEventListener('mousemove', (e) => {
            const moveX = (e.clientX - window.innerWidth / 2) / 50;
            const moveY = (e.clientY - window.innerHeight / 2) / 50;

            sliderLeft.style.transform = `translate(${moveX}px, ${moveY}px)`;
            sliderRight.style.transform = `translate(${-moveX}px, ${-moveY}px)`;
        });
    }

    // --- MODO ADMIN (SOLO VISUAL) ---
    const userSession = JSON.parse(localStorage.getItem('vadiver_user'));

    if (userSession && userSession.rol === 'admin') {
        console.log("⚓ Modo Administrador Detectado");

        const buttons = document.querySelectorAll('.btn-main, .btn-service');

        buttons.forEach(btn => {
            const text = btn.innerText.toUpperCase();

            if (text.includes("COMPRAR") || text.includes("TIENDA")) {
                btn.classList.add('admin-mode-btn');
                btn.innerText = "GESTIONAR";
            }
        });
    }

    // --- STATUS SYSTEM ---
    updateSystemStatus();
});

/* ==========================================
   2. STATUS SYSTEM UI
========================================== */
function updateSystemStatus() {
    const statusDots = document.querySelectorAll('.status-dot');

    statusDots.forEach(dot => {
        dot.style.boxShadow = "0 0 10px #00e5ff";
    });
}

/* ==========================================
   LÓGICA DEL CARRUSEL NATIVO V/ADIVER
========================================== */
let slideIndex = 0;
let autoPlayTimer;

function mostrarSlides(n) {
    const slides = document.querySelectorAll('.vadiver-slide');
    const dots = document.querySelectorAll('.dot');
    
    if (slides.length === 0) return;

    if (n >= slides.length) { slideIndex = 0; }
    if (n < 0) { slideIndex = slides.length - 1; }

    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    slides[slideIndex].classList.add('active');
    if (dots[slideIndex]) {
        dots[slideIndex].classList.add('active');
    }
}

function cambiarSlide(direccion) {
    slideIndex += direccion;
    mostrarSlides(slideIndex);
    activarCronometro();
}

function irAlSlide(num) {
    slideIndex = num;
    mostrarSlides(slideIndex);
    activarCronometro();
}

function activarCronometro() {
    clearInterval(autoPlayTimer);
    autoPlayTimer = setInterval(() => {
        slideIndex++;
        mostrarSlides(slideIndex);
    }, 4000);
}

// Inicialización automática al cargar el árbol del DOM
document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('.vadiver-slider-container')) {
        mostrarSlides(slideIndex);
        activarCronometro();
    }
});

// funciones de la galeria


function abrir(src) {
  document.getElementById("modalImg").src = src;
  document.getElementById("modal").style.display = "flex";
}

function cerrar() {
  document.getElementById("modal").style.display = "none";
}