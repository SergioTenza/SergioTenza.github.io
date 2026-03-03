// ===================================
// Main JavaScript
// Sergio Tenza López - Personal Landing Page
// ===================================

(function() {
    'use strict';

    // ===================================
    // DOM Elements
    // ===================================
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    const currentYearSpan = document.getElementById('currentYear');

    // ===================================
    // Smooth Scrolling
    // ===================================
    function smoothScroll(target) {
        const element = document.querySelector(target);
        if (!element) return;

        const navbarHeight = navbar.offsetHeight;
        const targetPosition = element.offsetTop - navbarHeight;

        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }

    // Add smooth scrolling to all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = this.getAttribute('href');
            smoothScroll(target);

            // Close mobile menu if open
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    });

    // ===================================
    // Mobile Navigation
    // ===================================
    function toggleMobileMenu() {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');

        // Animate hamburger icon
        const spans = navToggle.querySelectorAll('span');
        if (navToggle.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translateY(8px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translateY(-8px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    }

    navToggle.addEventListener('click', toggleMobileMenu);

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');

                // Reset hamburger icon
                const spans = navToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        }
    });

    // ===================================
    // Navbar Scroll Effect
    // ===================================
    let lastScrollTop = 0;

    function handleNavbarScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        // Add shadow on scroll
        if (scrollTop > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScrollTop = scrollTop;
    }

    window.addEventListener('scroll', handleNavbarScroll);
    handleNavbarScroll(); // Initial check

    // ===================================
    // Active Navigation Link
    // ===================================
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('.section, .hero, .contact');
        const scrollPosition = window.pageYOffset + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', updateActiveNavLink);
    updateActiveNavLink(); // Initial check

    // ===================================
    // Dynamic Year
    // ===================================
    function updateYear() {
        if (currentYearSpan) {
            currentYearSpan.textContent = new Date().getFullYear();
        }
    }

    updateYear();

    // ===================================
    // Typewriter Effect
    // ===================================
    class Typewriter {
        constructor(element, texts, options = {}) {
            this.element = element;
            this.texts = texts;
            this.options = {
                typeSpeed: options.typeSpeed || 100,
                deleteSpeed: options.deleteSpeed || 50,
                pauseTime: options.pauseTime || 2000,
                loop: options.loop !== undefined ? options.loop : true
            };

            this.textIndex = 0;
            this.charIndex = 0;
            this.isDeleting = false;
            this.timeout = null;
        }

        type() {
            const currentText = this.texts[this.textIndex];

            if (this.isDeleting) {
                this.element.textContent = currentText.substring(0, this.charIndex - 1);
                this.charIndex--;
            } else {
                this.element.textContent = currentText.substring(0, this.charIndex + 1);
                this.charIndex++;
            }

            let typeSpeed = this.isDeleting ? this.options.deleteSpeed : this.options.typeSpeed;

            if (!this.isDeleting && this.charIndex === currentText.length) {
                typeSpeed = this.options.pauseTime;
                this.isDeleting = true;
            } else if (this.isDeleting && this.charIndex === 0) {
                this.isDeleting = false;
                this.textIndex = (this.textIndex + 1) % this.texts.length;
                typeSpeed = 500;
            }

            this.timeout = setTimeout(() => this.type(), typeSpeed);
        }

        start() {
            this.type();
        }

        stop() {
            if (this.timeout) {
                clearTimeout(this.timeout);
            }
        }
    }

    // Initialize typewriter
    const typewriterElement = document.getElementById('typewriter');
    if (typewriterElement) {
        const typewriter = new Typewriter(
            typewriterElement,
            [
                'Platform Engineer',
                'Distributed Systems Specialist',
                'Streaming Infrastructure Expert',
                'Open Source Contributor',
                '.NET Developer'
            ],
            {
                typeSpeed: 100,
                deleteSpeed: 50,
                pauseTime: 2000,
                loop: true
            }
        );
        typewriter.start();
    }

    // ===================================
    // Particle Background
    // ===================================
    class ParticleBackground {
        constructor(canvas) {
            this.canvas = canvas;
            this.ctx = canvas.getContext('2d');
            this.particles = [];
            this.numberOfParticles = 100;
            this.connectionDistance = 150;
            this.mouseRadius = 150;

            this.mouse = {
                x: null,
                y: null
            };

            this.init();
        }

        init() {
            this.resize();
            this.createParticles();
            this.addEventListeners();
            this.animate();
        }

        resize() {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
        }

        createParticles() {
            this.particles = [];
            for (let i = 0; i < this.numberOfParticles; i++) {
                this.particles.push({
                    x: Math.random() * this.canvas.width,
                    y: Math.random() * this.canvas.height,
                    vx: (Math.random() - 0.5) * 0.5,
                    vy: (Math.random() - 0.5) * 0.5,
                    radius: Math.random() * 2 + 1
                });
            }
        }

        addEventListeners() {
            window.addEventListener('resize', () => {
                this.resize();
                this.createParticles();
            });

            window.addEventListener('mousemove', (e) => {
                this.mouse.x = e.x;
                this.mouse.y = e.y;
            });

            window.addEventListener('mouseout', () => {
                this.mouse.x = null;
                this.mouse.y = null;
            });
        }

        drawParticles() {
            this.particles.forEach(particle => {
                this.ctx.beginPath();
                this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
                this.ctx.fillStyle = 'rgba(233, 69, 96, 0.5)';
                this.ctx.fill();
            });
        }

        drawConnections() {
            for (let i = 0; i < this.particles.length; i++) {
                for (let j = i + 1; j < this.particles.length; j++) {
                    const dx = this.particles[i].x - this.particles[j].x;
                    const dy = this.particles[i].y - this.particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < this.connectionDistance) {
                        this.ctx.beginPath();
                        this.ctx.strokeStyle = `rgba(233, 69, 96, ${1 - distance / this.connectionDistance})`;
                        this.ctx.lineWidth = 0.5;
                        this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                        this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                        this.ctx.stroke();
                    }
                }
            }
        }

        updateParticles() {
            this.particles.forEach(particle => {
                // Update position
                particle.x += particle.vx;
                particle.y += particle.vy;

                // Bounce off walls
                if (particle.x < 0 || particle.x > this.canvas.width) {
                    particle.vx *= -1;
                }
                if (particle.y < 0 || particle.y > this.canvas.height) {
                    particle.vy *= -1;
                }

                // Mouse interaction
                if (this.mouse.x !== null && this.mouse.y !== null) {
                    const dx = this.mouse.x - particle.x;
                    const dy = this.mouse.y - particle.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < this.mouseRadius) {
                        const force = (this.mouseRadius - distance) / this.mouseRadius;
                        const angle = Math.atan2(dy, dx);
                        particle.x -= Math.cos(angle) * force * 2;
                        particle.y -= Math.sin(angle) * force * 2;
                    }
                }
            });
        }

        animate() {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.drawParticles();
            this.drawConnections();
            this.updateParticles();
            requestAnimationFrame(() => this.animate());
        }
    }

    // Initialize particle background
    const particleCanvas = document.getElementById('particleCanvas');
    if (particleCanvas) {
        new ParticleBackground(particleCanvas);
    }

    // ===================================
    // Lazy Loading Images
    // ===================================
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    const src = img.getAttribute('data-src');

                    if (src) {
                        img.src = src;
                        img.removeAttribute('data-src');
                        img.classList.add('loaded');
                        observer.unobserve(img);
                    }
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    // ===================================
    // Accessibility
    // ===================================
    // Handle keyboard navigation
    document.addEventListener('keydown', function(e) {
        // ESC key closes mobile menu
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            navToggle.focus();
        }
    });

    // ===================================
    // Performance Optimization
    // ===================================
    // Debounce function for scroll events
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Throttle function for high-frequency events
    function throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    // Apply throttle to scroll handler
    const throttledNavbarScroll = throttle(handleNavbarScroll, 100);
    window.removeEventListener('scroll', handleNavbarScroll);
    window.addEventListener('scroll', throttledNavbarScroll);

    // ===================================
    // Initialize
    // ===================================
    function init() {
        console.log('🚀 Landing page initialized successfully');
        console.log('👨‍💻 Sergio Tenza López - Platform Engineer');

        // Add loaded class to body
        document.body.classList.add('loaded');
    }

    // Run when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
