// Portfolio JavaScript
// Minimal interactions and utilities

document.addEventListener('DOMContentLoaded', function() {
    
    // Add fade-in animation to project cards
    const projectCards = document.querySelectorAll('.project-card');
    
    if (projectCards.length > 0) {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry, index) {
                if (entry.isIntersecting) {
                    setTimeout(function() {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 100);
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        projectCards.forEach(function(card) {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(card);
        });
    }

    // Add fade-in animation to experience items
    const experienceItems = document.querySelectorAll('.experience-item');
    
    if (experienceItems.length > 0) {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry, index) {
                if (entry.isIntersecting) {
                    setTimeout(function() {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 100);
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        experienceItems.forEach(function(item) {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(item);
        });
    }

    // Add fade-in animation to contact links
    const contactLinks = document.querySelectorAll('.contact-link');
    
    if (contactLinks.length > 0) {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry, index) {
                if (entry.isIntersecting) {
                    setTimeout(function() {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateX(0)';
                    }, index * 100);
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        contactLinks.forEach(function(link) {
            link.style.opacity = '0';
            link.style.transform = 'translateX(-20px)';
            link.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(link);
        });
    }

    // Smooth scroll for internal links (if needed)
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Add subtle parallax effect to hero image glow
    const heroGlow = document.querySelector('.hero-image-glow');
    if (heroGlow) {
        window.addEventListener('scroll', function() {
            const scrolled = window.scrollY;
            if (scrolled < 500) {
                heroGlow.style.transform = 'scale(' + (1 + scrolled * 0.0002) + ')';
            }
        });
    }

    // Mobile menu toggle (if needed in future)
    // Uncomment and modify if you want a hamburger menu on mobile
    /*
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }
    */

});