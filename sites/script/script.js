// ===== 1. Navbar scroll effect (agora funciona mesmo com menu aberto no mobile) =====
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ===== 2. Menu Mobile (hambúrguer) - FECHAR AO CLICAR EM UM LINK =====
document.querySelector('.mobile-menu-btn').addEventListener('click', function () {
    document.querySelector('.nav-links').classList.toggle('active');
    this.classList.toggle('active'); // opcional: anima o ícone virando X
});

// Fechar o menu ao clicar em qualquer link (muito importante no celular!)
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        document.querySelector('.nav-links').classList.remove('active');
        document.querySelector('.mobile-menu-btn').classList.remove('active');
    });
});

// ===== 3. Intersection Observer para animações de entrada =====
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -80px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observar todos os elementos que devem aparecer com animação
document.querySelectorAll('.section-title, .sobre-text, .area-card, .timeline-item, .contato-content').forEach(el => {
    el.classList.add('fade-in'); // garante que todos tenham a classe base
    observer.observe(el);
});

// ===== 4. Smooth scroll (funciona perfeitamente com o menu mobile) =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);

        if (target) {
            // Fecha o menu mobile antes de rolar (UX perfeita)
            document.querySelector('.nav-links').classList.remove('active');
            document.querySelector('.mobile-menu-btn').classList.remove('active');

            // Pequeno delay para dar tempo do menu fechar antes do scroll
            setTimeout(() => {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });

                // Ajuste fino para compensar a navbar fixa
                const navbarHeight = document.getElementById('navbar').offsetHeight;
                window.scrollBy(0, -navbarHeight - 20);
            }, 100);
        }
    });
});

// ===== 5. Animação escalonada nas cards de áreas =====
const areaCards = document.querySelectorAll('.area-card');
areaCards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.15}s`;
});

// ===== 6. (Opcional) Transformar o ícone de hambúrguer em X quando aberto =====
const style = document.createElement('style');
style.textContent = `
    .mobile-menu-btn.active .fa-bars::before {
        content: "\f00d"; /* ícone de X do Font Awesome */
    }
`;
document.head.appendChild(style);