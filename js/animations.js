// ===================================
// Scroll Animations
// Sergio Tenza López - Personal Landing Page
// ===================================

(function() {
    'use strict';

    // ===================================
    // Configuration
    // ===================================
    const config = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px',
        animationDuration: 600
    };

    // ===================================
    // Intersection Observer for Animations
    // ===================================
    class ScrollAnimations {
        constructor() {
            this.observers = new Map();
            this.animatedElements = new Set();
            this.init();
        }

        init() {
            this.setupIntersectionObserver();
            this.setupElementAnimations();
            this.setupParallax();
            this.setupCounters();
            this.setupProgressBars();
        }

        // ===================================
        // Main Intersection Observer
        // ===================================
        setupIntersectionObserver() {
            const options = {
                threshold: config.threshold,
                rootMargin: config.rootMargin
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && !this.animatedElements.has(entry.target)) {
                        this.animateElement(entry.target);
                        this.animatedElements.add(entry.target);
                    }
                });
            }, options);

            this.observers.set('main', observer);

            // Observe all elements with scroll animation classes
            this.observeElements();
        }

        observeElements() {
            const mainObserver = this.observers.get('main');
            const selectors = [
                '.scroll-animate',
                '.scroll-animate-left',
                '.scroll-animate-right',
                '.scroll-animate-scale',
                '.stagger-children'
            ];

            selectors.forEach(selector => {
                document.querySelectorAll(selector).forEach(element => {
                    mainObserver.observe(element);
                });
            });
        }

        // ===================================
        // Animate Individual Elements
        // ===================================
        animateElement(element) {
            // Add visible class
            element.classList.add('visible');

            // Handle stagger children
            if (element.classList.contains('stagger-children')) {
                const children = element.children;
                Array.from(children).forEach((child, index) => {
                    setTimeout(() => {
                        child.classList.add('visible');
                    }, index * 100);
                });
            }

            // Trigger special animations
            if (element.classList.contains('counter')) {
                this.animateCounter(element);
            }

            if (element.classList.contains('progress-bar')) {
                this.animateProgressBar(element);
            }
        }

        // ===================================
        // Setup Element Animations
        // ===================================
        setupElementAnimations() {
            // Add animation classes to elements
            this.animateSection('.about-text', 'fade-in-up');
            this.animateSection('.skill-category', 'fade-in-up');
            this.animateSection('.project-card', 'fade-in-up');
            this.animateSection('.timeline-item', 'fade-in-left');
            this.animateSection('.contact-card', 'scale-in');
        }

        animateSection(selector, animationClass) {
            const elements = document.querySelectorAll(selector);
            elements.forEach((element, index) => {
                element.style.animationDelay = `${index * 100}ms`;
                element.classList.add('scroll-animate');
            });
        }

        // ===================================
        // Parallax Effect
        // ===================================
        setupParallax() {
            const parallaxElements = document.querySelectorAll('[data-parallax]');

            if (parallaxElements.length === 0) {
                // Auto-detect parallax candidates
                this.setupAutoParallax();
                return;
            }

            parallaxElements.forEach(element => {
                const speed = parseFloat(element.dataset.parallax);
                this.applyParallax(element, speed);
            });
        }

        setupAutoParallax() {
            // Add parallax to hero content
            const heroContent = document.querySelector('.hero-content');
            if (heroContent) {
                this.applyParallax(heroContent, 0.3);
            }

            // Parallax disabled for section titles to prevent overlapping issues
            // Section titles now stay in their normal position within sections
            // const sectionTitles = document.querySelectorAll('.section-title');
            // sectionTitles.forEach(title => {
            //     this.applyParallax(title, 0.2);
            // });
        }

        applyParallax(element, speed) {
            let ticking = false;

            window.addEventListener('scroll', () => {
                if (!ticking) {
                    window.requestAnimationFrame(() => {
                        const rect = element.getBoundingClientRect();
                        const scrolled = window.pageYOffset;
                        const rate = scrolled * speed;

                        // Only apply if element is in view
                        if (rect.top < window.innerHeight && rect.bottom > 0) {
                            element.style.transform = `translateY(${rate}px)`;
                        }

                        ticking = false;
                    });

                    ticking = true;
                }
            });
        }

        // ===================================
        // Counter Animation
        // ===================================
        setupCounters() {
            const counters = document.querySelectorAll('.counter');
            counters.forEach(counter => {
                counter.dataset.target = counter.textContent;
                counter.textContent = '0';
            });
        }

        animateCounter(element) {
            const target = parseInt(element.dataset.target);
            const duration = config.animationDuration;
            const start = 0;
            const increment = target / (duration / 16);
            let current = start;

            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    element.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    element.textContent = target;
                }
            };

            updateCounter();
        }

        // ===================================
        // Progress Bar Animation
        // ===================================
        setupProgressBars() {
            const progressBars = document.querySelectorAll('.progress-bar');
            progressBars.forEach(bar => {
                const target = bar.dataset.progress || bar.style.width;
                bar.style.width = '0';
                bar.dataset.target = target;
            });
        }

        animateProgressBar(element) {
            const target = element.dataset.target;
            element.style.transition = `width ${config.animationDuration}ms ease-out`;

            // Use setTimeout to ensure transition is applied
            setTimeout(() => {
                element.style.width = target;
            }, 50);
        }

        // ===================================
        // Fade In on Load
        // ===================================
        setupFadeIn() {
            const elements = document.querySelectorAll('.fade-in-on-load');
            elements.forEach((element, index) => {
                setTimeout(() => {
                    element.classList.add('fade-in');
                }, index * 100);
            });
        }

        // ===================================
        // Mouse Move Effect
        // ===================================
        setupMouseMoveEffect() {
            const cards = document.querySelectorAll('.project-card, .skill-category, .contact-card');

            cards.forEach(card => {
                card.addEventListener('mousemove', (e) => {
                    const rect = card.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;

                    const centerX = rect.width / 2;
                    const centerY = rect.height / 2;

                    const rotateX = (y - centerY) / 10;
                    const rotateY = (centerX - x) / 10;

                    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
                });

                card.addEventListener('mouseleave', () => {
                    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
                });
            });
        }

        // ===================================
        // Scroll Progress Indicator
        // ===================================
        setupScrollProgress() {
            // Create progress bar
            const progressBar = document.createElement('div');
            progressBar.className = 'scroll-progress';
            progressBar.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 0%;
                height: 3px;
                background: linear-gradient(90deg, #0f3460, #e94560);
                z-index: 9999;
                transition: width 0.1s ease;
            `;
            document.body.appendChild(progressBar);

            // Update progress on scroll
            window.addEventListener('scroll', () => {
                const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
                const scrolled = (window.pageYOffset / windowHeight) * 100;
                progressBar.style.width = `${scrolled}%`;
            });
        }

        // ===================================
        // Reveal Animations
        // ===================================
        setupRevealAnimations() {
            const revealElements = document.querySelectorAll('.reveal');

            const revealObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('revealed');
                    }
                });
            }, {
                threshold: 0.15,
                rootMargin: '0px 0px -50px 0px'
            });

            revealElements.forEach(element => {
                revealObserver.observe(element);
            });
        }

        // ===================================
        // Text Split Animation
        // ===================================
        setupTextSplitAnimation() {
            const splitTextElements = document.querySelectorAll('.split-text');

            splitTextElements.forEach(element => {
                const text = element.textContent;
                element.textContent = '';

                text.split('').forEach((char, index) => {
                    const span = document.createElement('span');
                    span.textContent = char === ' ' ? '\u00A0' : char;
                    span.style.animationDelay = `${index * 50}ms`;
                    span.className = 'char';
                    element.appendChild(span);
                });
            });
        }

        // ===================================
        // Magnetic Button Effect
        // ===================================
        setupMagneticButtons() {
            const buttons = document.querySelectorAll('.btn');

            buttons.forEach(button => {
                button.addEventListener('mousemove', (e) => {
                    const rect = button.getBoundingClientRect();
                    const x = e.clientX - rect.left - rect.width / 2;
                    const y = e.clientY - rect.top - rect.height / 2;

                    button.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
                });

                button.addEventListener('mouseleave', () => {
                    button.style.transform = 'translate(0, 0)';
                });
            });
        }

        // ===================================
        // Glow Effect on Scroll
        // ===================================
        setupGlowEffect() {
            const sections = document.querySelectorAll('section');

            window.addEventListener('scroll', () => {
                const scrollPosition = window.pageYOffset;

                sections.forEach(section => {
                    const rect = section.getBoundingClientRect();
                    const centerY = rect.top + rect.height / 2;

                    if (Math.abs(centerY - window.innerHeight / 2) < 200) {
                        section.classList.add('glow-active');
                    } else {
                        section.classList.remove('glow-active');
                    }
                });
            });
        }

        // ===================================
        // Cleanup
        // ===================================
        destroy() {
            // Disconnect all observers
            this.observers.forEach(observer => {
                observer.disconnect();
            });
            this.observers.clear();
            this.animatedElements.clear();
        }
    }

    // ===================================
    // Initialize
    // ===================================
    let scrollAnimations;

    function init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initAnimations);
        } else {
            initAnimations();
        }
    }

    function initAnimations() {
        scrollAnimations = new ScrollAnimations();

        // Setup additional effects
        scrollAnimations.setupScrollProgress();
        scrollAnimations.setupMouseMoveEffect();
        scrollAnimations.setupMagneticButtons();
        scrollAnimations.setupRevealAnimations();

        console.log('✨ Scroll animations initialized');
    }

    // ===================================
    // Re-init on page changes (for SPA)
    // ===================================
    function reinit() {
        if (scrollAnimations) {
            scrollAnimations.destroy();
        }
        initAnimations();
    }

    // ===================================
    // Export for external use
    // ===================================
    window.ScrollAnimations = {
        init,
        reinit,
        instance: () => scrollAnimations
    };

    // Start animations
    init();

})();

// ===================================
// Utility Functions
// ===================================

// Debounce function
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

// Throttle function
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

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Animate number from 0 to target
function animateValue(element, start, end, duration) {
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if (current >= end) {
            element.textContent = end;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Lerp function for smooth animations
function lerp(start, end, factor) {
    return start + (end - start) * factor;
}

// Clamp function
function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}

// Map range
function mapRange(value, inMin, inMax, outMin, outMax) {
    return (value - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
}

// Random range
function randomRange(min, max) {
    return Math.random() * (max - min) + min;
}

// Random integer
function randomInt(min, max) {
    return Math.floor(randomRange(min, max));
}

// ===================================
// Performance Monitor
// ===================================
function measurePerformance() {
    if ('PerformanceObserver' in window) {
        const observer = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
                console.log(`${entry.name}: ${entry.duration}ms`);
            }
        });

        observer.observe({ entryTypes: ['measure', 'paint'] });
    }
}

// Measure performance on load
window.addEventListener('load', measurePerformance);