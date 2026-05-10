// Esperar a que el DOM cargue
document.addEventListener("DOMContentLoaded", (event) => {
    // 1. Inicializar Lenis para Scroll Suave
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smooth: true,
        smoothTouch: false,
    });

    lenis.on('scroll', ScrollTrigger.update)

    gsap.ticker.add((time) => {
        lenis.raf(time * 1000)
    })

    gsap.ticker.lagSmoothing(0)

    // 2. Efecto de Scroll en la Barra de Navegación
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Menú Hamburguesa para Móviles
    const hamburgerMenu = document.getElementById('hamburger-menu');
    const navLinks = document.getElementById('nav-links');

    if (hamburgerMenu && navLinks) {
        hamburgerMenu.addEventListener('click', () => {
            hamburgerMenu.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Cerrar menú al hacer clic en un enlace normal
        navLinks.querySelectorAll('a:not(.nav-dropdown-toggle)').forEach(link => {
            link.addEventListener('click', () => {
                hamburgerMenu.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }

    // Lógica para abrir la pestaña "Contáctanos" en móvil
    const navDropdownToggle = document.querySelector('.nav-dropdown-toggle');
    const navDropdown = document.querySelector('.nav-dropdown');

    if (navDropdownToggle && navDropdown) {
        navDropdownToggle.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                e.preventDefault(); // Prevenir salto de ancla en móvil
                navDropdown.classList.toggle('active');
            }
        });
    }

    // 3. Animaciones GSAP ScrollTrigger para Elementos
    gsap.registerPlugin(ScrollTrigger);

    // Animación de aparición ascendente para textos, estadísticas y contenedores
    const fadeUpElements = document.querySelectorAll('.gs-fade-up');

    fadeUpElements.forEach((el) => {
        const delay = el.getAttribute('data-delay') || 0;

        gsap.fromTo(el,
            {
                y: 50,
                opacity: 0
            },
            {
                y: 0,
                opacity: 1,
                duration: 1,
                delay: Number(delay),
                ease: "power3.out",
                scrollTrigger: {
                    trigger: el,
                    start: "top 85%", // Se activa cuando la parte superior del elemento alcanza el 85% del viewport
                    toggleActions: "play none none reverse"
                }
            }
        );
    });

    // 4. Efecto Parallax para fondos de video
    const videoBackgrounds = document.querySelectorAll('.video-background video');
    videoBackgrounds.forEach((video) => {
        gsap.to(video, {
            yPercent: 30,
            ease: "none",
            scrollTrigger: {
                trigger: video.parentElement,
                start: "top bottom",
                end: "bottom top",
                scrub: true
            }
        });
    });

    // 5. Animación Infinita de Marquesina para Proyectos
    const track = document.querySelector('#projects-track');
    if (track) {
        gsap.to(track, {
            xPercent: -50,
            ease: "none",
            duration: 30, // Un poco más lento para mejor visualización
            repeat: -1
        });
    }

    // 6. Lógica de Desplegable para el Equipo
    const btnTeam = document.getElementById('btn-team-toggle');
    const teamContent = document.getElementById('team-content');
    let isTeamOpen = false;

    if (btnTeam && teamContent) {
        btnTeam.addEventListener('click', () => {
            if (!isTeamOpen) {
                // Abrir
                gsap.to(teamContent, {
                    height: "auto",
                    opacity: 1,
                    duration: 0.8,
                    ease: "power3.out",
                    onComplete: () => {
                        ScrollTrigger.refresh(); // Refrescar para que las animaciones sigan funcionando
                    }
                });
                btnTeam.textContent = "Cerrar Detalles";
            } else {
                // Cerrar
                gsap.to(teamContent, {
                    height: 0,
                    opacity: 0,
                    duration: 0.6,
                    ease: "power3.in",
                    onComplete: () => {
                        ScrollTrigger.refresh();
                    }
                });
                btnTeam.textContent = "Conoce al Equipo";
            }
            isTeamOpen = !isTeamOpen;
        });
    }

});
