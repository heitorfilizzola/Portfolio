document.addEventListener('DOMContentLoaded', () => {
    console.log('Página carregada e script.js ativo');

    // === Tradução ===
    function setLanguage(lang) {
        document.querySelectorAll('[data-pt]').forEach(el => {
            el.innerText = el.getAttribute(`data-${lang}`);
        });
        // Salva o idioma no localStorage
        localStorage.setItem('lang', lang);
    }

    window.setLanguage = setLanguage;

    // Aplica o idioma salvo
    const savedLang = localStorage.getItem('lang') || 'pt';
    setLanguage(savedLang);

    // Adiciona eventos para as bandeiras
    const flagPT = document.querySelector('img[alt="Português"]');
    if (flagPT) {
        flagPT.addEventListener('click', () => {
            setLanguage('pt');
        });
    }

    const flagEN = document.querySelector('img[alt="English"]');
    if (flagEN) {
        flagEN.addEventListener('click', () => {
            setLanguage('en');
        });
    }
});

// === Carrossel Principal ===
document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('#main-carousel .slide');
    let currentSlide = 0;
    let slideInterval;

    // Mostra o slide inicial
    showSlide(currentSlide);

    // Inicia o carrossel automático
    function startCarousel() {
        slideInterval = setInterval(() => {
            nextSlide();
        }, 13000);
    }

    // Avança para o próximo slide
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    // Mostra um slide específico
    function showSlide(index) {
        // Remove a classe 'active' de todos os slides
        slides.forEach(slide => {
            slide.classList.remove('active');
        });

        // Adiciona a classe 'active' apenas ao slide atual
        slides[index].classList.add('active');
    }

    // Inicia o carrossel
    startCarousel();

    // Pausa o carrossel quando o mouse está sobre ele (opcional)
});
// === Novo Carrossel da seção "valores" ===
// === Novo Carrossel da seção "valores" (formato solutions-carousel) ===
const carousel = document.querySelector('.solutions-carousel');
const solutionItems = document.querySelectorAll('.solution');
const leftArrow = document.querySelector('.arrow.left');
const rightArrow = document.querySelector('.arrow.right');
let currentIndex = 2; // Começa no item central (índice 2)
let autoRotateInterval;

function updateCarousel() {
    const isMobile = window.innerWidth <= 768;
    const activeItem = solutionItems[currentIndex];
    const itemWidth = activeItem.offsetWidth + (isMobile ? 0 : 20); // Margem apenas no desktop
    const containerWidth = document.querySelector('.solutions-carousel-wrapper').offsetWidth;

    // Centraliza o item ativo
    let offset;
    if (isMobile) {
        offset = (containerWidth / 2) - (itemWidth / 2) - (currentIndex * itemWidth);
    } else {
        offset = (containerWidth / 2) - (itemWidth / 2) - (currentIndex * itemWidth);
    }

    carousel.style.transform = `translateX(${offset}px)`;

    // Atualiza classes dos itens
    solutionItems.forEach((item, index) => {
        item.classList.remove('active', 'prev', 'next');

        if (isMobile) {
            // Modo mobile - apenas 1 item visível
            if (index === currentIndex) {
                item.classList.add('active');
            }
        } else {
            // Modo desktop - 3 itens visíveis
            if (index === currentIndex) {
                item.classList.add('active');
            } else if (index === currentIndex - 1 ||
                (currentIndex === 0 && index === solutionItems.length - 1)) {
                item.classList.add('prev');
            } else if (index === currentIndex + 1 ||
                (currentIndex === solutionItems.length - 1 && index === 0)) {
                item.classList.add('next');
            }
        }
    });
}

function moveToPrev() {
    currentIndex = (currentIndex - 1 + solutionItems.length) % solutionItems.length;
    updateCarousel();
    resetAutoRotate();
}

function moveToNext() {
    currentIndex = (currentIndex + 1) % solutionItems.length;
    updateCarousel();
    resetAutoRotate();
}

function resetAutoRotate() {
    clearInterval(autoRotateInterval);
    autoRotateInterval = setInterval(moveToNext, 5000);
}

// Event listeners
leftArrow.addEventListener('click', moveToPrev);
rightArrow.addEventListener('click', moveToNext);

// Inicialização
updateCarousel();
autoRotateInterval = setInterval(moveToNext, 5000);

// Redimensionamento com debounce para melhor performance
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        updateCarousel();
    }, 100);
});

// === Tema escuro ===
const toggleButton = document.getElementById('toggleTheme');
if (toggleButton) {
    toggleButton.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        // Salvar preferências de tema no localStorage
        const theme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
        localStorage.setItem('theme', theme);
    });
}

// Carregar tema preferido do localStorage
const savedTheme = localStorage.getItem('theme') || 'light';
if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
}

const darkModeCSS = `
    body.dark-mode {
      background-color: var(--cor-preto);
      color: var(--cor-branco);
    }
    body.dark-mode .header {
      background-color: #111;
    }
    body.dark-mode .card {
      background-color: #1a1a1a;
      color: var(--cor-branco);
      border: 1px solid #333;
    }
    body.dark-mode .button {
      background-color: var(--cor-azul-escuro);
    }
    body.dark-mode .button:hover {
      background-color: var(--cor-ciano);
    }
  `;
const style = document.createElement('style');
style.appendChild(document.createTextNode(darkModeCSS));
document.head.appendChild(style);
