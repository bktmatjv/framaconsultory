        // 1. Inicializar AOS (Animaciones)
        AOS.init({ duration: 800, once: true, offset: 100 });

        // 2. Lenis (Smooth Scroll Premium)
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            direction: 'vertical',
            gestureDirection: 'vertical',
            smooth: true,
            mouseMultiplier: 1,
            smoothTouch: false,
            touchMultiplier: 2,
            infinite: false,
        });
        function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
        requestAnimationFrame(raf);

        // Arreglar enlaces con Lenis
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if(target) lenis.scrollTo(target);
            });
        });

        // 3. Menú Móvil
        // 3. Menú Móvil (Sidebar Derecho)
        function toggleMenu() {
            const sidebar = document.getElementById('sidebar');
            const overlay = document.getElementById('menu-overlay');
            
            // Añade o quita la clase 'active'
            sidebar.classList.toggle('active');
            overlay.classList.toggle('active');
            
            // Evita el scroll del fondo cuando el menú está abierto
            if(sidebar.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        }

        function toggleSubmenu(event) {
            event.preventDefault(); // Evita que la página salte al tocar el enlace
            
            const submenu = document.getElementById('mobile-submenu');
            const icon = document.getElementById('submenu-icon');
            
            // Abre o cierra el submenú
            submenu.classList.toggle('open');
            
            // Cambia el ícono de + a - dependiendo si está abierto o cerrado
            if (submenu.classList.contains('open')) {
                icon.classList.remove('ph-plus');
                icon.classList.add('ph-minus');
            } else {
                icon.classList.remove('ph-minus');
                icon.classList.add('ph-plus');
            }
        }

        // 4. Lógica para Accordion FAQ
        const faqItems = document.querySelectorAll('.faq-item');
        faqItems.forEach(item => {
            item.querySelector('.faq-question').addEventListener('click', () => {
                faqItems.forEach(otherItem => {
                    if(otherItem !== item) {
                        otherItem.classList.remove('active');
                    }
                });
                item.classList.toggle('active');
            });
        });

        // 5. Transición Suave de Fondo y Círculos de Metodología
        document.addEventListener("DOMContentLoaded", function() {
            // Fondo
            const sections = document.querySelectorAll("section[data-bg]");
            const bgObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        document.body.style.backgroundColor = entry.target.getAttribute("data-bg");
                    }
                });
            }, { threshold: 0.4 });
            sections.forEach(sec => bgObserver.observe(sec));

            // Metodología: Colorear pasos al scrollear
            const steps = document.querySelectorAll('.method-step .step-bg');
            const stepObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.backgroundColor = 'var(--primary-light)';
                        entry.target.style.color = 'white';
                        entry.target.style.borderColor = 'var(--primary-light)';
                    }
                });
            }, { threshold: 1 });
            steps.forEach(step => stepObserver.observe(step));
        });

const form = document.getElementById("contact-form");
const messageBox = document.getElementById("form-message");

form.addEventListener("submit", function(e) {
    e.preventDefault();

    const formData = new FormData(form);

    fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData).toString()
    })
    .then(() => {
        messageBox.style.display = "block";
        messageBox.style.color = "#10B981";
        messageBox.innerHTML = "✅ Mensaje enviado correctamente. Te contactaremos pronto.";
        form.reset();
    })
    .catch(() => {
        messageBox.style.display = "block";
        messageBox.style.color = "#EF4444";
        messageBox.innerHTML = "❌ Hubo un error. Intenta nuevamente.";
    });
});