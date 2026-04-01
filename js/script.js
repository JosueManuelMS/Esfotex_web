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
    const cardHTML = `
    <div class="card" role="button" tabindex="0" style="cursor: pointer;">
    <img src="${course.img}">
    <h3>${course.title}</h3>
    <p>${course.desc}</p>
    </div>
    `;
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = cardHTML;
    const card = tempDiv.firstElementChild;
    
    const handleCardClick = () => {
      const phoneNumber = "51939122803";
      const message = `Hola ESFOTEX, quería información sobre ${course.title}. ¿Pueden ayudarme?`;
      const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
      window.open(whatsappURL, "_blank");
    };
    
    card.addEventListener("click", handleCardClick);
    card.addEventListener("keypress", (e) => {
      if (e.key === "Enter" || e.key === " ") handleCardClick();
    });
    
    container.appendChild(card);
  });
}

let index = 0;
let mainSliderTimer = null;

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

function restartMainSliderAutoplay(){
    if(!slides.length || !dots.length || !document.querySelector(".slides")) return;
    if(mainSliderTimer) clearInterval(mainSliderTimer);
    mainSliderTimer = setInterval(()=>{
        nextSlide();
    },4000);
}

/* automático */
if(slides.length && dots.length && document.querySelector(".slides")){
    restartMainSliderAutoplay();

    const originalPrevSlide = prevSlide;
    const originalNextSlide = nextSlide;
    const originalGoToSlide = goToSlide;

    prevSlide = function(){
        originalPrevSlide();
        restartMainSliderAutoplay();
    };

    nextSlide = function(){
        originalNextSlide();
        restartMainSliderAutoplay();
    };

    goToSlide = function(i){
        originalGoToSlide(i);
        restartMainSliderAutoplay();
    };
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

function normalizeCarouselItems(items){
    if(!Array.isArray(items)) return [];

    return items
        .map((item)=>{
            if(typeof item === 'string') {
                return { type: 'image', src: item, alt: '', poster: '' };
            }

            if(!item || typeof item.src !== 'string') {
                return null;
            }

            return {
                type: item.type === 'video' ? 'video' : 'image',
                src: item.src,
                alt: typeof item.alt === 'string' ? item.alt : '',
                poster: typeof item.poster === 'string' ? item.poster : ''
            };
        })
        .filter(Boolean);
}

function createCarouselMediaElement(item, slideClass, index){
    if(item.type === 'video'){
        const video = document.createElement('video');
        video.className = slideClass;
        video.src = item.src;
        video.title = item.alt || `Video ${index + 1}`;
        video.setAttribute('aria-label', item.alt || `Video ${index + 1}`);
        video.controls = true;
        video.autoplay = true;
        video.muted = true;
        video.loop = false;
        video.preload = 'auto';
        video.playsInline = true;
        if(item.poster) video.poster = item.poster;
        return video;
    }

    const img = document.createElement('img');
    img.className = slideClass;
    img.src = item.src;
    img.alt = item.alt || `Imagen ${index + 1}`;
    img.loading = 'lazy';
    return img;
}

function populateCarouselsFromConfig(){
    const config = window.CAROUSEL_IMAGE_CONFIG || {};

    document.querySelectorAll('.fade-carousel[data-carousel-key]').forEach((carousel) => {
        const key = carousel.dataset.carouselKey;
        const items = normalizeCarouselItems(config[key]);
        if(!items.length) return;

        carousel.innerHTML = '';

        items.forEach((item, idx) => {
            const media = createCarouselMediaElement(item, idx === 0 ? 'fade-slide is-active' : 'fade-slide', idx);
            carousel.appendChild(media);
        });
    });

    document.querySelectorAll('.machine-carousel[data-carousel-key]').forEach((carousel) => {
        const key = carousel.dataset.carouselKey;
        const items = normalizeCarouselItems(config[key]);
        if(!items.length) return;

        const prevBtn = carousel.querySelector('.machine-carousel-prev');
        const nextBtn = carousel.querySelector('.machine-carousel-next');

        carousel.querySelectorAll('.machine-slide').forEach((slide) => slide.remove());

        items.forEach((item, idx) => {
            const media = createCarouselMediaElement(item, idx === 0 ? 'machine-slide is-active' : 'machine-slide', idx);

            if(prevBtn){
                carousel.insertBefore(media, prevBtn);
                return;
            }

            if(nextBtn){
                carousel.insertBefore(media, nextBtn);
                return;
            }

            carousel.appendChild(media);
        });
    });
}

populateCarouselsFromConfig();

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
    let machineCarouselTimer = null;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const videoSlides = Array.from(slides).filter((slide) => slide.tagName === 'VIDEO');

    const updateVideoPlayback = () => {
        slides.forEach((slide, index) => {
            if (slide.tagName !== 'VIDEO') return;

            if (index === activeIndex) {
                slide.play().catch(() => {});
                return;
            }

            slide.pause();
            slide.currentTime = 0;
        });
    };

    const scheduleNextSlideForActiveState = () => {
        if (machineCarouselTimer) {
            clearInterval(machineCarouselTimer);
            machineCarouselTimer = null;
        }

        const activeSlide = slides[activeIndex];
        if (!activeSlide) return;

        if (activeSlide.tagName === 'VIDEO') {
            return;
        }

        if (reducedMotion) return;

        machineCarouselTimer = setInterval(() => {
            showSlide(activeIndex + 1);
        }, 6000);
    };

    const showSlide = (newIndex) => {
        const previousSlide = slides[activeIndex];
        slides[activeIndex].classList.remove('is-active');
        activeIndex = (newIndex + slides.length) % slides.length;
        slides[activeIndex].classList.add('is-active');
        if (previousSlide && previousSlide.tagName === 'VIDEO') {
            previousSlide.pause();
        }
        updateVideoPlayback();
        scheduleNextSlideForActiveState();
    };

    videoSlides.forEach((video) => {
        video.addEventListener('ended', () => {
            if (video.classList.contains('is-active')) {
                showSlide(activeIndex + 1);
            }
        });
    });

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

    updateVideoPlayback();
    scheduleNextSlideForActiveState();
});

// Manejar clicks en los cards de especializaciones
const specializationCards = document.querySelectorAll('.specialization-card');

specializationCards.forEach((card) => {
    card.style.cursor = 'pointer';
    
    const handleClick = () => {
        const titleElement = card.querySelector('.course-title');
        const specialization = titleElement ? titleElement.textContent.trim() : 'una especialización';
        const phoneNumber = "51939122803";
        const message = `Hola ESFOTEX, quería información sobre ${specialization}. ¿Pueden ayudarme?`;
        const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(whatsappURL, "_blank");
    };
    
    card.addEventListener('click', handleClick);
    card.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' || e.key === ' ') handleClick();
    });
});
