function toggleMenu(){
document.getElementById("nav").classList.toggle("active");
}

const courses = [
{
title:"Manejo de Máquina",
desc:"Aprende el uso profesional de máquinas industriales.",
img:"img/maquina.jpg"
},
{
title:"Patronaje Profesional",
desc:"Diseña patrones modernos para todo tipo de prendas.",
img:"img/patronaje.jpg"
},
{
title:"Bordado y Acabados",
desc:"Técnicas modernas de bordado decorativo.",
img:"img/bordado.jpg"
}
];

const container = document.getElementById("coursesContainer");

if(container){
  courses.forEach(course=>{
    container.innerHTML += `
    <div class="card">
    <img src="${course.img}">
    <h3>${course.title}</h3>
    <p>${course.desc}</p>
    </div>
    `;
  });
}

let index = 0;

const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");

function showSlide(i){

    if(!slides.length || !dots.length || !document.querySelector(".slides")) return;

    if(i >= slides.length) index = 0;
    else if(i < 0) index = slides.length - 1;
    else index = i;

    document.querySelector(".slides").style.transform =
        `translateX(-${index * 100}%)`;

    dots.forEach(dot => dot.classList.remove("active"));
    dots[index].classList.add("active");
}

function nextSlide(){
    showSlide(index + 1);
}

function prevSlide(){
    showSlide(index - 1);
}

function goToSlide(i){
    showSlide(i);
}

/* automático */
if(slides.length && dots.length && document.querySelector(".slides")){
    setInterval(()=>{
        nextSlide();
    },4000);
}

/* HERO BACKGROUND CHANGER */
const heroImages = ['img/hero.png', 'img/hero2.jpg','img/hero3.png','img/hero4.jpg', 'img/hero5.png'];
let heroIndex = 0;
const heroSection = document.querySelector('.hero-large');
const path = window.location.pathname.toLowerCase();
const isHomePage = path.endsWith('/index.html') || path === '/' || path.endsWith('/esfotex');
const heroOverlay = "linear-gradient(rgba(0,0,0,.2),rgba(0,0,0,.3))";

// Precargar todas las imágenes
heroImages.forEach(src => {
    const img = new Image();
    img.src = src;
});

function changeHeroBackground() {
    heroIndex = (heroIndex + 1) % heroImages.length;
    if(heroSection) {
        heroSection.style.backgroundImage = `${heroOverlay}, url('${heroImages[heroIndex]}')`;
    }
}

// Cambiar fondo cada 5 segundos
if(isHomePage && heroSection){
    const heroBgCurrent = document.createElement('div');
    heroBgCurrent.className = 'hero-bg-layer hero-bg-current';

    const heroBgNext = document.createElement('div');
    heroBgNext.className = 'hero-bg-layer hero-bg-next';

    heroBgCurrent.style.backgroundImage = `${heroOverlay}, url('${heroImages[heroIndex]}')`;
    heroBgNext.style.backgroundImage = heroBgCurrent.style.backgroundImage;

    heroSection.classList.add('hero-fade-enabled');
    heroSection.prepend(heroBgNext);
    heroSection.prepend(heroBgCurrent);

    let isHeroAnimating = false;

    setInterval(() => {
        if (isHeroAnimating) return;

        isHeroAnimating = true;
        heroIndex = (heroIndex + 1) % heroImages.length;
        heroBgNext.style.backgroundImage = `${heroOverlay}, url('${heroImages[heroIndex]}')`;
        heroBgNext.classList.add('is-visible');

        setTimeout(() => {
            heroBgCurrent.style.backgroundImage = heroBgNext.style.backgroundImage;
            heroBgNext.classList.remove('is-visible');
            isHeroAnimating = false;
        }, 700);
    }, 5000);
}

const certificadoTrigger = document.querySelector('.certificado-trigger');
const certificadoLightbox = document.getElementById('certificadoLightbox');
const lightboxCloseBtn = document.querySelector('.lightbox-close');

function openCertificadoLightbox() {
    if (!certificadoLightbox) return;
    certificadoLightbox.classList.add('open');
    certificadoLightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
}

function closeCertificadoLightbox() {
    if (!certificadoLightbox) return;
    certificadoLightbox.classList.remove('open');
    certificadoLightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
}

if (certificadoTrigger && certificadoLightbox) {
    certificadoTrigger.addEventListener('click', openCertificadoLightbox);

    if (lightboxCloseBtn) {
        lightboxCloseBtn.addEventListener('click', closeCertificadoLightbox);
    }

    certificadoLightbox.addEventListener('click', (event) => {
        if (event.target === certificadoLightbox) {
            closeCertificadoLightbox();
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && certificadoLightbox.classList.contains('open')) {
            closeCertificadoLightbox();
        }
    });
}

const benefitCards = document.querySelectorAll('.benefit-card');
const beneficioTitulo = document.getElementById('beneficioTitulo');
const beneficioTexto = document.getElementById('beneficioTexto');
const mobileBreakpoint = window.matchMedia('(max-width: 768px)');

function updateBeneficioDetalle(card) {
    if (!card || !beneficioTitulo || !beneficioTexto) return;
    beneficioTitulo.textContent = card.dataset.title || '';
    beneficioTexto.textContent = card.dataset.text || '';
}

if (benefitCards.length) {
    benefitCards.forEach((card) => {
        card.addEventListener('click', () => {
            if (mobileBreakpoint.matches) {
                const wasActive = card.classList.contains('is-active');
                benefitCards.forEach((item) => item.classList.remove('is-active'));
                if (!wasActive) card.classList.add('is-active');
                return;
            }

            benefitCards.forEach((item) => item.classList.remove('is-active'));
            card.classList.add('is-active');
            updateBeneficioDetalle(card);
        });
    });

    const initialCard = document.querySelector('.benefit-card.is-active') || benefitCards[0];
    if (initialCard) {
        if (!mobileBreakpoint.matches) {
            benefitCards.forEach((item) => item.classList.remove('is-active'));
            initialCard.classList.add('is-active');
            updateBeneficioDetalle(initialCard);
        }
    }

    mobileBreakpoint.addEventListener('change', (event) => {
        if (event.matches) {
            return;
        }

        let activeCard = document.querySelector('.benefit-card.is-active');
        if (!activeCard) {
            activeCard = benefitCards[0];
        }

        benefitCards.forEach((item) => item.classList.remove('is-active'));
        activeCard.classList.add('is-active');
        updateBeneficioDetalle(activeCard);
    });
}

const fadeCarousels = document.querySelectorAll('.fade-carousel');

fadeCarousels.forEach((carousel) => {
    const fadeSlides = carousel.querySelectorAll('.fade-slide');
    if (fadeSlides.length < 2) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let activeIndex = 0;
    setInterval(() => {
        fadeSlides[activeIndex].classList.remove('is-active');
        activeIndex = (activeIndex + 1) % fadeSlides.length;
        fadeSlides[activeIndex].classList.add('is-active');
    }, 7500);
});

const machineCarousels = document.querySelectorAll('.machine-carousel');

machineCarousels.forEach((carousel) => {
    const slides = carousel.querySelectorAll('.machine-slide');
    const prevBtn = carousel.querySelector('.machine-carousel-prev');
    const nextBtn = carousel.querySelector('.machine-carousel-next');

    if (slides.length < 2) return;

    let activeIndex = 0;

    const showSlide = (newIndex) => {
        slides[activeIndex].classList.remove('is-active');
        activeIndex = (newIndex + slides.length) % slides.length;
        slides[activeIndex].classList.add('is-active');
    };

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            showSlide(activeIndex - 1);
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            showSlide(activeIndex + 1);
        });
    }

    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        setInterval(() => {
            showSlide(activeIndex + 1);
        }, 6000);
    }
});
