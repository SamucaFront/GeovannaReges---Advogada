// script.js - VERSÃO ESTÁVEL (substitua todo o arquivo por este)

// Aguarda DOM pronto (mais seguro mesmo com script no final)
document.addEventListener("DOMContentLoaded", () => {

    // 1. Navbar menor ao rolar
    const navbarEl = document.getElementById("navbar");
    window.addEventListener("scroll", () => {
        if (!navbarEl) return;
        if (window.scrollY > 100) {
            navbarEl.classList.add("scrolled");
        } else {
            navbarEl.classList.remove("scrolled");
        }
    });

    // 2. MENU MOBILE
    const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
    const navLinks = document.querySelector(".nav-links");

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener("click", () => {
            mobileMenuBtn.classList.toggle("active");
            navLinks.classList.toggle("active");
        });

        document.querySelectorAll(".nav-links a").forEach(link => {
            link.addEventListener("click", () => {
                navLinks.classList.remove("active");
                mobileMenuBtn.classList.remove("active");
            });
        });
    }

    // 3. Animações ao aparecer (OBS: NÃO aplicamos fade-in à .contato-content)
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                }
            });
        },
        { threshold: 0.15, rootMargin: "0px 0px -80px 0px" }
    );

    // Liste apenas elementos que realmente devem animar
    document.querySelectorAll(".section-title, .sobre-text, .area-card, .timeline-item")
        .forEach(el => {
            el.classList.add("fade-in");
            observer.observe(el);
        });

    // 4. Smooth scroll COM OFFSET PERFEITO da navbar fixa
    // Função utilitária para rolar até um elemento com offset da navbar
    function scrollToElementWithOffset(targetEl, extraOffset = 10) {
        if (!targetEl) return;
        // recalcula altura da navbar na hora do clique (garante responsividade)
        const nav = document.getElementById("navbar");
        const navbarHeight = nav ? nav.offsetHeight : 0;
        const targetPosition = targetEl.getBoundingClientRect().top + window.scrollY;
        const offsetPosition = Math.max(0, targetPosition - navbarHeight - extraOffset);

        window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
        });
    }

    // Handler para todos links âncora internos (a[href^="#"])
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            // se href é somente "#" ou vazio, permitir comportamento normal
            const href = this.getAttribute("href");
            if (!href || href === "#") return;

            const target = document.querySelector(href);
            if (!target) return; // nada a fazer se não existir

            e.preventDefault();

            // Fecha menu mobile se aberto
            navLinks?.classList.remove("active");
            mobileMenuBtn?.classList.remove("active");

            // Rola com offset
            scrollToElementWithOffset(target, 10);
        });
    });

    // 4b. Handler ESPECÍFICO e redundante só para o botão "Agende uma Consulta"
    // (garante que *sempre* funcione, mesmo que outro listener dê erro)
    const consultaBtn = document.querySelector('.cta-button');
    if (consultaBtn) {
        consultaBtn.addEventListener('click', function (e) {
            // se o botão já tem href com #contato, vamos tratar a mesma forma
            const href = this.getAttribute('href') || '#contato';
            const target = document.querySelector(href);
            if (!target) return;
            e.preventDefault();
            // usa função utilitária (recalcula navbar)
            scrollToElementWithOffset(target, 10);
        });
    }

    // 5. Efeito de atraso nos cards
    document.querySelectorAll(".area-card").forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.15}s`;
    });

    // 6. Ícone hambúrguer vira X (corrigido - altera o <i>)
    const dynamicStyle = document.createElement("style");
    dynamicStyle.textContent = `
        /* Troca visual do icon: quando mobile-menu-btn tiver .active, esconde .fa-bars e insere conteudo X via pseudo */
        .mobile-menu-btn.active i.fa-bars { display: none; }
        .mobile-menu-btn.active::after {
            content: "\\00d7";
            font-size: 1.4rem;
            color: white;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            pointer-events: none;
        }
    `;
    document.head.appendChild(dynamicStyle);

    // 7. Proteção global: logs de erro para debug (opcional, remove em produção)
    window.addEventListener('error', (ev) => {
        // console.error('JS ERROR', ev.message, ev.filename, ev.lineno);
    });
});
