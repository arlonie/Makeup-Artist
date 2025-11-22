// ========================================
// Professional Makeup Artist Website - JavaScript
// Features: Navigation, Animations, Interactions
// ========================================

/**
 * Mobile Navigation Toggle
 */
function initMobileNav() {
    const navMenu = document.querySelector('.nav-menu');
    
    // Add event listener for mobile menu toggle if needed
    if (window.innerWidth <= 768) {
        navMenu?.addEventListener('click', (e) => {
            if (e.target.classList.contains('nav-link')) {
                // Close menu on link click on mobile
                document.body.style.overflow = 'auto';
            }
        });
    }
}

/**
 * Active Navigation Link
 */
function setActiveNavLink() {
    const navLinks = document.querySelectorAll('.nav-link');
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

/**
 * Smooth Scroll for Anchor Links
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== '#bookingForm') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    });
}

/**
 * Intersection Observer for Animations
 */
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements that should animate on scroll
    document.querySelectorAll('.service-card, .portfolio-item, .testimonial-card, .review-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });
}

/**
 * Form Validation
 */
function initFormValidation() {
    const bookingForm = document.getElementById('bookingForm');
    
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate form fields
            const name = document.getElementById('name')?.value.trim();
            const email = document.getElementById('email')?.value.trim();
            const phone = document.getElementById('phone')?.value.trim();
            const service = document.getElementById('service')?.value;
            const date = document.getElementById('date')?.value;
            const time = document.getElementById('time')?.value;

            if (!name || !email || !phone || !service || !date || !time) {
                alert('Please fill in all required fields');
                return;
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address');
                return;
            }

            // Phone validation
            const phoneRegex = /^[0-9\s\-\+\(\)]+$/;
            if (!phoneRegex.test(phone)) {
                alert('Please enter a valid phone number');
                return;
            }

            // Show success message
            const successMessage = document.getElementById('successMessage');
            if (successMessage) {
                successMessage.style.display = 'block';
                this.reset();
                
                // Scroll to message
                successMessage.scrollIntoView({ behavior: 'smooth' });
                
                // Hide after 5 seconds
                setTimeout(() => {
                    successMessage.style.display = 'none';
                }, 5000);
            }
        });
    }
}

/**
 * Keyboard Accessibility
 */
function initAccessibility() {
    // Ensure all interactive elements are keyboard accessible
    document.querySelectorAll('button, a, input, textarea, select').forEach(el => {
        if (!el.hasAttribute('tabindex') && el.tagName !== 'BUTTON' && el.tagName !== 'INPUT' && el.tagName !== 'TEXTAREA' && el.tagName !== 'SELECT') {
            el.setAttribute('tabindex', '0');
        }
    });

    // Skip to main content link
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.className = 'skip-link';
    skipLink.textContent = 'Skip to main content';
    skipLink.style.cssText = `
        position: absolute;
        left: -9999px;
        z-index: 999;
    `;
    
    skipLink.addEventListener('focus', () => {
        skipLink.style.cssText = `
            position: fixed;
            left: 0;
            top: 0;
            background: var(--primary);
            color: white;
            padding: 10px;
            z-index: 999;
        `;
    });
    
    skipLink.addEventListener('blur', () => {
        skipLink.style.cssText = `
            position: absolute;
            left: -9999px;
            z-index: 999;
        `;
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
}

/**
 * Performance Optimization - Lazy Loading Images
 */
function initLazyLoading() {
    const imageElements = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });

        imageElements.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        imageElements.forEach(img => {
            img.src = img.dataset.src;
        });
    }
}

/**
 * Service Card Interactions
 */
function initServiceInteractions() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

/**
 * Portfolio Item Interactions
 */
function initPortfolioInteractions() {
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    portfolioItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const image = this.querySelector('.portfolio-image');
            if (image) {
                image.style.transform = 'scale(1.05)';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            const image = this.querySelector('.portfolio-image');
            if (image) {
                image.style.transform = 'scale(1)';
            }
        });
    });
}

/**
 * FAQ Accordion
 */
function initFAQAccordion() {
    const faqItems = document.querySelectorAll('.faq-item h4');
    
    faqItems.forEach(item => {
        item.addEventListener('click', function() {
            const paragraph = this.nextElementSibling;
            if (paragraph) {
                const isVisible = paragraph.style.maxHeight;
                
                // Close all other FAQs
                document.querySelectorAll('.faq-item p').forEach(p => {
                    p.style.maxHeight = null;
                });
                
                // Toggle current FAQ
                if (isVisible) {
                    paragraph.style.maxHeight = null;
                    this.style.color = '#8B4789';
                } else {
                    paragraph.style.maxHeight = paragraph.scrollHeight + 'px';
                    this.style.color = '#D4AF37';
                }
            }
        });
    });
}

/**
 * Dark Mode Support
 */
function initDarkModeSupport() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.body.classList.add('dark-mode');
    }
    
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        if (e.matches) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
    });
}

/**
 * Debounce utility for performance
 */
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

/**
 * Window Resize Handler
 */
function handleWindowResize() {
    const debouncedResize = debounce(() => {
        if (window.innerWidth > 768) {
            // Reset mobile styles if needed
        }
    }, 250);

    window.addEventListener('resize', debouncedResize);
}

/**
 * Analytics - Track button clicks
 */
function initAnalytics() {
    document.querySelectorAll('a[href*="contact"], .btn-primary').forEach(el => {
        el.addEventListener('click', function() {
            // Track conversion
            if (window.gtag) {
                gtag('event', 'conversion', {
                    'send_to': 'AW-XXXXXXX/XXXXXXX',
                    'value': 1,
                    'currency': 'USD'
                });
            }
            
            console.log('Conversion tracked:', this.textContent);
        });
    });
}

/**
 * Initialize All Features
 */
function init() {
    // Check if DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeApp);
    } else {
        initializeApp();
    }
}

function initializeApp() {
    console.log('Initializing Glam Studio Website');
    
    // Navigation
    setActiveNavLink();
    initMobileNav();
    
    // Interactions
    initSmoothScroll();
    initAnimations();
    initServiceInteractions();
    initPortfolioInteractions();
    initFAQAccordion();
    
    // Forms
    initFormValidation();
    
    // Accessibility
    initAccessibility();
    
    // Performance
    initLazyLoading();
    
    // Theming
    initDarkModeSupport();
    
    // Events
    handleWindowResize();
    
    // Analytics
    initAnalytics();
    
    console.log('Website initialized successfully');
}

// Start initialization
init();

// Expose utility functions to global scope if needed
window.glamStudio = {
    debounce,
    init
};
