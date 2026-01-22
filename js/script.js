// Enhanced Mobile Navigation and Professional Interactions with Advanced Animations
document.addEventListener('DOMContentLoaded', function() {
    // Navigation functionality
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navbar = document.querySelector('.navbar');

    // Mobile menu toggle with enhanced animations
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
            
            // Add stagger animation to menu items
            if (navMenu.classList.contains('active')) {
                const menuItems = navMenu.querySelectorAll('.nav-link');
                menuItems.forEach((item, index) => {
                    item.style.animation = `slideInRight 0.3s ease ${index * 0.1}s both`;
                });
            }
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // Enhanced navbar scroll effects
    let lastScrollTop = 0;
    const scrollThreshold = 100;
    
    function updateNavbar() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add scrolled class for styling
        if (scrollTop > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Hide/show navbar on scroll (only on mobile)
        if (window.innerWidth <= 768) {
            if (scrollTop > lastScrollTop && scrollTop > scrollThreshold) {
                navbar.style.transform = 'translateY(-100%)';
            } else {
                navbar.style.transform = 'translateY(0)';
            }
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    }

    // Throttled scroll handler
    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(function() {
                updateNavbar();
                ticking = false;
            });
            ticking = true;
        }
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Enhanced Intersection Observer for advanced scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
                
                // Add different animation classes based on element type
                if (element.classList.contains('feature-card')) {
                    element.classList.add('animate-bounce');
                } else if (element.classList.contains('stat-card')) {
                    element.classList.add('animate-flip');
                } else if (element.classList.contains('trust-item')) {
                    element.classList.add('animate-rotate');
                } else if (element.classList.contains('testimonial-card')) {
                    element.classList.add('animate-left');
                } else if (element.classList.contains('insight-card')) {
                    element.classList.add('animate-right');
                } else {
                    element.classList.add('animate-in');
                }
                
                // Trigger counter animations for stat numbers
                if (element.querySelector('.stat-number, .metric-value')) {
                    animateCounters(element);
                }
            }
        });
    }, observerOptions);

    // Observe elements for animation with staggered delays
    const animateElements = document.querySelectorAll(`
        .feature-card, .threat-card, .tip-category, .agency-card, 
        .step-card, .practice-card, .trust-item, .checklist-item,
        .stat-card, .testimonial-card, .insight-card, .solution-category
    `);
    
    animateElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(50px)';
        el.style.transition = `all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) ${index * 0.1}s`;
        observer.observe(el);
    });

    // Enhanced Security Checklist functionality with celebrations
    const checklistItems = document.querySelectorAll('.checklist-item input[type="checkbox"]');
    
    checklistItems.forEach((checkbox, index) => {
        const savedState = localStorage.getItem(`security-checklist-${index}`);
        if (savedState === 'true') {
            checkbox.checked = true;
            checkbox.closest('.checklist-item').classList.add('completed');
        }
        
        checkbox.addEventListener('change', function() {
            const listItem = this.closest('.checklist-item');
            localStorage.setItem(`security-checklist-${index}`, this.checked);
            
            if (this.checked) {
                listItem.classList.add('completed');
                createFireworksEffect(listItem);
                createCelebrationEffect(listItem);
                showNotification('Security task completed! 🎉', 'success');
                
                // Check if all items are completed
                const totalItems = checklistItems.length;
                const completedItems = document.querySelectorAll('.checklist-item.completed').length;
                
                if (completedItems === totalItems) {
                    setTimeout(() => {
                        createMegaCelebration();
                        showNotification('🏆 CONGRATULATIONS! All security tasks completed! You\'re now cyber-secure! 🛡️', 'success');
                    }, 1000);
                }
            } else {
                listItem.classList.remove('completed');
            }
        });
    });

    // Create scroll-to-top button with enhanced animations
    createScrollToTopButton();

    // Enhanced button hover effects with ripple animation
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            if (!this.classList.contains('loading')) {
                this.style.transform = 'translateY(-3px) scale(1.02)';
            }
        });
        
        btn.addEventListener('mouseleave', function() {
            if (!this.classList.contains('loading')) {
                this.style.transform = 'translateY(0) scale(1)';
            }
        });

        // Add ripple effect on click
        btn.addEventListener('click', function(e) {
            createRippleEffect(e, this);
        });
    });

    // Enhanced external link handling with loading animations
    document.querySelectorAll('a[href^="http"]').forEach(link => {
        // Add external link indicator with animation
        if (!link.querySelector('svg') && !link.querySelector('.external-icon')) {
            const icon = document.createElement('span');
            icon.className = 'external-icon';
            icon.innerHTML = ' ↗';
            icon.style.cssText = `
                opacity: 0.7; 
                font-size: 0.8em; 
                transition: all 0.3s ease;
                display: inline-block;
            `;
            link.appendChild(icon);
        }
        
        link.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.external-icon');
            if (icon) {
                icon.style.transform = 'translate(2px, -2px) rotate(45deg)';
                icon.style.opacity = '1';
            }
        });

        link.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.external-icon');
            if (icon) {
                icon.style.transform = 'translate(0, 0) rotate(0deg)';
                icon.style.opacity = '0.7';
            }
        });
        
        link.addEventListener('click', function(e) {
            this.classList.add('loading');
            this.style.opacity = '0.8';
            
            // Remove loading state after delay
            setTimeout(() => {
                this.classList.remove('loading');
                this.style.opacity = '1';
            }, 2000);
        });
    });

    // Enhanced keyboard navigation support
    document.addEventListener('keydown', function(e) {
        // ESC key closes mobile menu
        if (e.key === 'Escape') {
            if (navMenu && navMenu.classList.contains('active')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
        
        // Ctrl/Cmd + K for search (placeholder)
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            showNotification('🔍 Advanced search functionality coming soon!', 'info');
        }

        // Arrow keys for navigation (Easter egg)
        if (e.key === 'ArrowUp' && e.shiftKey) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        if (e.key === 'ArrowDown' && e.shiftKey) {
            window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
        }
    });

    // Enhanced form validation with real-time feedback
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        const inputs = form.querySelectorAll('input, textarea, select');
        
        inputs.forEach(input => {
            input.addEventListener('focus', function() {
                this.style.transform = 'scale(1.02)';
                this.style.boxShadow = '0 0 20px rgba(79, 172, 254, 0.3)';
            });

            input.addEventListener('blur', function() {
                this.style.transform = 'scale(1)';
                this.style.boxShadow = '';
            });

            input.addEventListener('input', function() {
                validateFieldRealTime(this);
            });
        });

        form.addEventListener('submit', function(e) {
            const requiredFields = form.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.style.borderColor = '#ef4444';
                    field.style.backgroundColor = 'rgba(239, 68, 68, 0.1)';
                    field.style.animation = 'wiggle 0.5s ease-in-out';
                    
                    // Remove error styling after user starts typing
                    field.addEventListener('input', function() {
                        this.style.borderColor = '';
                        this.style.backgroundColor = '';
                        this.style.animation = '';
                    }, { once: true });
                }
            });
            
            if (!isValid) {
                e.preventDefault();
                showNotification('⚠️ Please fill in all required fields', 'error');
            }
        });
    });

    // Initialize floating particles background
    createFloatingParticles();

    // Initialize parallax scrolling effects
    initializeParallaxEffects();

    // Performance monitoring
    if ('performance' in window) {
        window.addEventListener('load', function() {
            const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
            if (loadTime > 3000) {
                console.warn('Page load time:', loadTime + 'ms');
            }
        });
    }
});

    // Threat item expansion (for mobile)
    const threatItems = document.querySelectorAll('.threat-item');
    threatItems.forEach(item => {
        const header = item.querySelector('.threat-header');
        const content = item.querySelector('.threat-details');
        
        if (header && content && window.innerWidth <= 768) {
            content.style.display = 'none';
            header.style.cursor = 'pointer';
            
            header.addEventListener('click', function() {
                const isVisible = content.style.display !== 'none';
                content.style.display = isVisible ? 'none' : 'block';
                
                // Add rotation animation to icon
                const icon = header.querySelector('.threat-icon');
                if (icon) {
                    icon.style.transform = isVisible ? 'rotate(0deg)' : 'rotate(180deg)';
                    icon.style.transition = 'transform 0.3s ease';
                }
            });
        }
    });

    // Add scroll-to-top functionality
    const scrollToTopBtn = createScrollToTopButton();
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.style.display = 'block';
        } else {
            scrollToTopBtn.style.display = 'none';
        }
    });

    // Form validation for any future forms
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            const requiredFields = form.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.style.borderColor = '#e74c3c';
                    field.style.backgroundColor = '#fdf2f2';
                } else {
                    field.style.borderColor = '';
                    field.style.backgroundColor = '';
                }
            });
            
            if (!isValid) {
                e.preventDefault();
                showNotification('Please fill in all required fields', 'error');
            }
        });
    });

    // Add loading states to external links
    const externalLinks = document.querySelectorAll('a[href^="http"]');
    externalLinks.forEach(link => {
        link.addEventListener('click', function() {
            this.style.opacity = '0.7';
            this.innerHTML += ' <span style="font-size: 0.8em;">↗</span>';
        });
    });
});

// Create scroll-to-top button
function createScrollToTopButton() {
    const button = document.createElement('button');
    button.innerHTML = '↑';
    button.className = 'scroll-to-top';
    button.setAttribute('aria-label', 'Scroll to top');
    
    button.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    document.body.appendChild(button);
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            button.style.display = 'flex';
        } else {
            button.style.display = 'none';
        }
    });
    
    return button;
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 8px;
        color: white;
        font-weight: 600;
        z-index: 1001;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
        word-wrap: break-word;
    `;
    
    // Set background color based on type
    const colors = {
        info: '#3498db',
        success: '#27ae60',
        warning: '#f39c12',
        error: '#e74c3c'
    };
    notification.style.backgroundColor = colors[type] || colors.info;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
    
    // Click to dismiss
    notification.addEventListener('click', function() {
        this.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (this.parentNode) {
                this.parentNode.removeChild(this);
            }
        }, 300);
    });
}

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    // ESC key closes mobile menu
    if (e.key === 'Escape') {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        if (hamburger && navMenu && navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    }
    
    // Ctrl/Cmd + K for quick navigation (future enhancement)
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        // Could implement a quick search/navigation modal here
        showNotification('Quick navigation coming soon!', 'info');
    }
});

// Performance optimization: Lazy load images if any are added
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading if supported
if ('IntersectionObserver' in window) {
    lazyLoadImages();
}

// Add print styles optimization
window.addEventListener('beforeprint', function() {
    // Hide navigation and other non-essential elements when printing
    const elementsToHide = document.querySelectorAll('.hamburger, .scroll-to-top, .notification');
    elementsToHide.forEach(el => {
        el.style.display = 'none';
    });
});

window.addEventListener('afterprint', function() {
    // Restore hidden elements after printing
    const elementsToShow = document.querySelectorAll('.hamburger, .scroll-to-top');
    elementsToShow.forEach(el => {
        el.style.display = '';
    });
});

// Analytics placeholder (for future implementation)
function trackEvent(category, action, label) {
    // Placeholder for analytics tracking
    console.log(`Event tracked: ${category} - ${action} - ${label}`);
}

// Track page views
trackEvent('Page', 'View', document.title);

// Track external link clicks
document.querySelectorAll('a[href^="http"]').forEach(link => {
    link.addEventListener('click', function() {
        trackEvent('External Link', 'Click', this.href);
    });
});

// Advanced Animation Functions

// Create ripple effect on button clicks
function createRippleEffect(event, element) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: radial-gradient(circle, rgba(255,255,255,0.6) 0%, transparent 70%);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s ease-out;
        pointer-events: none;
        z-index: 1;
    `;
    
    element.style.position = 'relative';
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Create fireworks effect for major celebrations
function createFireworksEffect(element) {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Create multiple bursts
    for (let burst = 0; burst < 3; burst++) {
        setTimeout(() => {
            for (let i = 0; i < 20; i++) {
                const particle = document.createElement('div');
                particle.style.cssText = `
                    position: fixed;
                    width: 6px;
                    height: 6px;
                    background: ${getRandomColor()};
                    border-radius: 50%;
                    pointer-events: none;
                    z-index: 9999;
                    left: ${centerX}px;
                    top: ${centerY}px;
                    box-shadow: 0 0 10px currentColor;
                `;
                
                document.body.appendChild(particle);
                
                const angle = (i / 20) * Math.PI * 2;
                const velocity = 150 + Math.random() * 100;
                const vx = Math.cos(angle) * velocity;
                const vy = Math.sin(angle) * velocity;
                
                particle.animate([
                    { 
                        transform: 'translate(0, 0) scale(1)', 
                        opacity: 1 
                    },
                    { 
                        transform: `translate(${vx}px, ${vy + 100}px) scale(0)`, 
                        opacity: 0 
                    }
                ], {
                    duration: 1500,
                    easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
                }).onfinish = () => particle.remove();
            }
        }, burst * 200);
    }
}

// Create mega celebration for completing all tasks
function createMegaCelebration() {
    // Screen flash effect
    const flash = document.createElement('div');
    flash.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(45deg, #4facfe, #00f2fe, #4facfe);
        opacity: 0;
        pointer-events: none;
        z-index: 9998;
    `;
    document.body.appendChild(flash);
    
    flash.animate([
        { opacity: 0 },
        { opacity: 0.3 },
        { opacity: 0 }
    ], {
        duration: 500,
        easing: 'ease-in-out'
    }).onfinish = () => flash.remove();
    
    // Multiple fireworks across the screen
    const positions = [
        { x: window.innerWidth * 0.2, y: window.innerHeight * 0.3 },
        { x: window.innerWidth * 0.8, y: window.innerHeight * 0.3 },
        { x: window.innerWidth * 0.5, y: window.innerHeight * 0.2 },
        { x: window.innerWidth * 0.3, y: window.innerHeight * 0.6 },
        { x: window.innerWidth * 0.7, y: window.innerHeight * 0.6 }
    ];
    
    positions.forEach((pos, index) => {
        setTimeout(() => {
            createFireworksAtPosition(pos.x, pos.y);
        }, index * 300);
    });
}

function createFireworksAtPosition(x, y) {
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: fixed;
            width: 8px;
            height: 8px;
            background: ${getRandomColor()};
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            left: ${x}px;
            top: ${y}px;
            box-shadow: 0 0 15px currentColor;
        `;
        
        document.body.appendChild(particle);
        
        const angle = (i / 30) * Math.PI * 2;
        const velocity = 100 + Math.random() * 150;
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity;
        
        particle.animate([
            { 
                transform: 'translate(0, 0) scale(1)', 
                opacity: 1 
            },
            { 
                transform: `translate(${vx}px, ${vy + 200}px) scale(0)`, 
                opacity: 0 
            }
        ], {
            duration: 2000,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        }).onfinish = () => particle.remove();
    }
}

function getRandomColor() {
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7', '#dda0dd', '#98d8c8', '#f7dc6f'];
    return colors[Math.floor(Math.random() * colors.length)];
}

// Animate counters with easing
function animateCounters(container) {
    const counters = container.querySelectorAll('.stat-number, .metric-value');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent.replace(/[^\d]/g, '')) || 0;
        if (target === 0) return;
        
        let current = 0;
        const increment = target / 60; // 60 frames for smooth animation
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            const suffix = counter.textContent.replace(/[\d.]/g, '');
            counter.textContent = Math.floor(current) + suffix;
        }, 16); // ~60fps
    });
}

// Create floating particles background
function createFloatingParticles() {
    const particleContainer = document.createElement('div');
    particleContainer.className = 'floating-particles';
    particleContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
        overflow: hidden;
    `;
    document.body.appendChild(particleContainer);
    
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 6 + 2}px;
            height: ${Math.random() * 6 + 2}px;
            background: rgba(79, 172, 254, ${Math.random() * 0.3 + 0.1});
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: floatParticle ${Math.random() * 20 + 15}s linear infinite;
        `;
        particleContainer.appendChild(particle);
    }
}

// Initialize parallax scrolling effects
function initializeParallaxEffects() {
    const parallaxElements = document.querySelectorAll('.hero-glow, .hero-grid');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        parallaxElements.forEach(element => {
            element.style.transform = `translateY(${rate}px)`;
        });
    });
}

// Real-time form field validation
function validateFieldRealTime(field) {
    const value = field.value.trim();
    const type = field.type;
    
    // Remove previous validation classes
    field.classList.remove('valid', 'invalid');
    
    if (value === '') return;
    
    let isValid = true;
    
    switch (type) {
        case 'email':
            isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
            break;
        case 'tel':
            isValid = /^[\+]?[1-9][\d]{0,15}$/.test(value.replace(/\s/g, ''));
            break;
        case 'url':
            isValid = /^https?:\/\/.+/.test(value);
            break;
        default:
            isValid = value.length >= 2;
    }
    
    if (isValid) {
        field.classList.add('valid');
        field.style.borderColor = '#27ae60';
        field.style.backgroundColor = 'rgba(39, 174, 96, 0.1)';
    } else {
        field.classList.add('invalid');
        field.style.borderColor = '#e74c3c';
        field.style.backgroundColor = 'rgba(231, 76, 60, 0.1)';
    }
}

// Create floating background particles
function createBackgroundParticles() {
    const particleContainer = document.createElement('div');
    particleContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
        overflow: hidden;
    `;
    document.body.appendChild(particleContainer);
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 4 + 2}px;
            height: ${Math.random() * 4 + 2}px;
            background: rgba(255, 255, 255, ${Math.random() * 0.3 + 0.1});
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float ${Math.random() * 10 + 10}s linear infinite;
        `;
        particleContainer.appendChild(particle);
    }
}

// Enhanced notification system with better styling
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div style="display: flex; align-items: center; gap: 10px;">
            <span style="font-size: 1.2em;">${getNotificationIcon(type)}</span>
            <span>${message}</span>
        </div>
    `;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 20px 25px;
        border-radius: 15px;
        color: white;
        font-weight: 600;
        z-index: 1001;
        transform: translateX(100%);
        transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        max-width: 350px;
        word-wrap: break-word;
        backdrop-filter: blur(20px);
        border: 1px solid rgba(255, 255, 255, 0.2);
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    `;
    
    // Set background color based on type
    const colors = {
        info: 'linear-gradient(135deg, #4facfe, #00f2fe)',
        success: 'linear-gradient(135deg, #27ae60, #2ecc71)',
        warning: 'linear-gradient(135deg, #f39c12, #e67e22)',
        error: 'linear-gradient(135deg, #e74c3c, #c0392b)'
    };
    notification.style.background = colors[type] || colors.info;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 400);
    }, 5000);
    
    // Click to dismiss
    notification.addEventListener('click', function() {
        this.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (this.parentNode) {
                this.parentNode.removeChild(this);
            }
        }, 400);
    });
}

function getNotificationIcon(type) {
    const icons = {
        info: 'ℹ️',
        success: '✅',
        warning: '⚠️',
        error: '❌'
    };
    return icons[type] || icons.info;
}

// Add CSS for additional animations
const additionalStyles = `
    @keyframes float {
        0%, 100% { transform: translateY(0px) rotate(0deg); }
        33% { transform: translateY(-10px) rotate(120deg); }
        66% { transform: translateY(5px) rotate(240deg); }
    }
    
    .completed {
        background: linear-gradient(135deg, #27ae60, #2ecc71) !important;
        color: white !important;
        transform: scale(1.02) !important;
        box-shadow: 0 5px 15px rgba(39, 174, 96, 0.3) !important;
    }
    
    .completed span {
        text-decoration: line-through !important;
        opacity: 0.8 !important;
    }
    
    /* Cursor effects */
    .btn, .nav-link, .feature-link, .checklist-item {
        cursor: pointer;
    }
    
    .btn:active {
        transform: translateY(-3px) scale(0.98) !important;
    }
    
    /* Loading animation for external links */
    .loading::after {
        content: '';
        display: inline-block;
        width: 12px;
        height: 12px;
        border: 2px solid rgba(255,255,255,0.3);
        border-radius: 50%;
        border-top-color: white;
        animation: spin 1s ease-in-out infinite;
        margin-left: 8px;
    }
    
    @keyframes spin {
        to { transform: rotate(360deg); }
    }
`;

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

// Add loading states to external links with better UX
document.querySelectorAll('a[href^="http"]').forEach(link => {
    link.addEventListener('click', function(e) {
        if (!this.classList.contains('loading')) {
            this.classList.add('loading');
            this.style.opacity = '0.8';
            
            // Remove loading state after 3 seconds
            setTimeout(() => {
                this.classList.remove('loading');
                this.style.opacity = '1';
            }, 3000);
        }
    });
});

// Performance optimization: Throttle scroll events
function throttle(func, wait) {
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

// Apply throttling to scroll events
const throttledScroll = throttle(() => {
    // Scroll-based animations can be added here
}, 16); // ~60fps

window.addEventListener('scroll', throttledScroll);

// Track page engagement
let startTime = Date.now();
let maxScroll = 0;

window.addEventListener('scroll', () => {
    const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
    maxScroll = Math.max(maxScroll, scrollPercent);
});

window.addEventListener('beforeunload', () => {
    const timeSpent = Date.now() - startTime;
    trackEvent('Engagement', 'Time Spent', Math.round(timeSpent / 1000));
    trackEvent('Engagement', 'Max Scroll', Math.round(maxScroll));
});

// Threat Assessment Tool Functionality
function calculateThreatScore() {
    const form = document.querySelector('.assessment-form');
    const industry = form.querySelector('input[name="industry"]:checked')?.value;
    const size = form.querySelector('input[name="size"]:checked')?.value;
    const remote = form.querySelector('input[name="remote"]:checked')?.value;
    const training = form.querySelector('input[name="training"]:checked')?.value;
    
    if (!industry || !size || !remote || !training) {
        showNotification('Please answer all questions to calculate your threat score', 'warning');
        return;
    }
    
    let score = 0;
    let riskFactors = [];
    
    // Industry risk scoring
    const industryRisk = {
        'financial': 25,
        'healthcare': 23,
        'manufacturing': 18,
        'retail': 20,
        'technology': 22,
        'other': 15
    };
    score += industryRisk[industry] || 15;
    
    // Size risk scoring
    const sizeRisk = {
        'small': 10,
        'medium': 15,
        'large': 20,
        'enterprise': 25
    };
    score += sizeRisk[size] || 10;
    
    // Remote work risk
    const remoteRisk = {
        'none': 5,
        'some': 10,
        'most': 15,
        'all': 20
    };
    score += remoteRisk[remote] || 5;
    
    // Training frequency (inverse scoring - less training = higher risk)
    const trainingRisk = {
        'never': 25,
        'annual': 15,
        'quarterly': 10,
        'monthly': 5
    };
    score += trainingRisk[training] || 25;
    
    // Determine risk level and recommendations
    let riskLevel, riskColor, recommendations;
    
    if (score <= 35) {
        riskLevel = 'Low Risk';
        riskColor = '#27ae60';
        recommendations = [
            'Maintain current security practices',
            'Consider quarterly security reviews',
            'Implement basic monitoring tools',
            'Regular security awareness updates'
        ];
    } else if (score <= 55) {
        riskLevel = 'Medium Risk';
        riskColor = '#f39c12';
        recommendations = [
            'Implement comprehensive endpoint protection',
            'Establish incident response procedures',
            'Increase security training frequency',
            'Deploy network monitoring solutions',
            'Conduct vulnerability assessments'
        ];
    } else if (score <= 75) {
        riskLevel = 'High Risk';
        riskColor = '#e67e22';
        recommendations = [
            'Immediate security assessment required',
            'Deploy advanced threat detection',
            'Implement zero trust architecture',
            'Monthly security training mandatory',
            'Consider managed security services',
            'Establish 24/7 monitoring'
        ];
    } else {
        riskLevel = 'Critical Risk';
        riskColor = '#e74c3c';
        recommendations = [
            'Urgent security overhaul needed',
            'Engage professional security consultants',
            'Implement comprehensive security stack',
            'Weekly security training required',
            'Deploy AI-powered threat hunting',
            'Establish dedicated security team',
            'Consider cyber insurance'
        ];
    }
    
    // Display results
    const resultsDiv = document.getElementById('assessmentResults');
    const scoreNumber = document.getElementById('scoreNumber');
    const scoreDescription = document.getElementById('scoreDescription');
    const recommendationsDiv = document.getElementById('recommendations');
    
    scoreNumber.textContent = score;
    scoreNumber.style.color = riskColor;
    
    scoreDescription.innerHTML = `
        <div style="color: ${riskColor}; font-weight: bold; font-size: 1.2em; margin-bottom: 10px;">
            ${riskLevel}
        </div>
        <p>Based on your responses, your organization has a threat score of ${score}/100. This indicates ${riskLevel.toLowerCase()} exposure to cyber threats.</p>
    `;
    
    recommendationsDiv.innerHTML = `
        <h4>Recommended Actions:</h4>
        <ul style="list-style: none; padding: 0;">
            ${recommendations.map(rec => `
                <li style="padding: 8px 0; border-bottom: 1px solid #eee;">
                    <span style="color: ${riskColor}; margin-right: 10px;">•</span>
                    ${rec}
                </li>
            `).join('')}
        </ul>
        <div style="margin-top: 20px; padding: 15px; background: #f8f9fa; border-radius: 8px;">
            <strong>Next Steps:</strong> Contact our security experts for a personalized consultation and implementation roadmap.
        </div>
    `;
    
    resultsDiv.style.display = 'block';
    resultsDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
    
    // Track the assessment completion
    trackEvent('Assessment', 'Completed', `Score: ${score} - ${riskLevel}`);
    
    showNotification(`Assessment complete! Your risk level: ${riskLevel}`, score > 55 ? 'warning' : 'info');
}

// Incident Form Handling
document.addEventListener('DOMContentLoaded', function() {
    const incidentForm = document.querySelector('.incident-form');
    if (incidentForm) {
        incidentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<span>Submitting Report...</span>';
            submitBtn.disabled = true;
            
            // Simulate form submission
            setTimeout(() => {
                showNotification('Incident report submitted successfully! Our team will contact you within 15 minutes.', 'success');
                
                // Reset form
                this.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                
                // Track incident report
                const incidentType = this.querySelector('#incidentType').value;
                const severity = this.querySelector('#severity').value;
                trackEvent('Incident Report', 'Submitted', `${incidentType} - ${severity}`);
                
            }, 2000);
        });
    }
    
    // Contact form handling
    const contactForm = document.querySelector('.security-contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<span>Sending Request...</span>';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                showNotification('Thank you! Our security experts will contact you within 24 hours.', 'success');
                
                this.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                
                trackEvent('Contact Form', 'Submitted', 'Security Consultation');
                
            }, 1500);
        });
    }
});

// Enhanced accordion functionality for incident types
document.addEventListener('DOMContentLoaded', function() {
    const incidentItems = document.querySelectorAll('.incident-item');
    
    incidentItems.forEach(item => {
        const header = item.querySelector('.incident-header');
        const content = item.querySelector('.incident-content');
        
        if (header && content) {
            // Initially hide content
            content.style.display = 'none';
            content.style.maxHeight = '0';
            content.style.overflow = 'hidden';
            content.style.transition = 'max-height 0.3s ease';
            
            header.style.cursor = 'pointer';
            header.addEventListener('click', function() {
                const isOpen = content.style.display !== 'none';
                
                // Close all other items
                incidentItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        const otherContent = otherItem.querySelector('.incident-content');
                        otherContent.style.display = 'none';
                        otherContent.style.maxHeight = '0';
                        otherItem.classList.remove('active');
                    }
                });
                
                // Toggle current item
                if (isOpen) {
                    content.style.display = 'none';
                    content.style.maxHeight = '0';
                    item.classList.remove('active');
                } else {
                    content.style.display = 'block';
                    content.style.maxHeight = content.scrollHeight + 'px';
                    item.classList.add('active');
                }
            });
        }
    });
});

// Real-time threat intelligence updates (simulated)
function initializeThreatIntelligence() {
    const intelCards = document.querySelectorAll('.intel-card');
    
    if (intelCards.length > 0) {
        // Simulate real-time updates
        setInterval(() => {
            const randomCard = intelCards[Math.floor(Math.random() * intelCards.length)];
            const timestamp = randomCard.querySelector('.intel-timestamp');
            
            if (timestamp) {
                const now = new Date();
                const minutes = Math.floor(Math.random() * 60) + 1;
                timestamp.textContent = `Updated ${minutes} minutes ago`;
                
                // Add pulse effect
                randomCard.style.animation = 'pulse 0.5s ease-in-out';
                setTimeout(() => {
                    randomCard.style.animation = '';
                }, 500);
            }
        }, 30000); // Update every 30 seconds
    }
}

// Initialize threat intelligence on page load
document.addEventListener('DOMContentLoaded', initializeThreatIntelligence);

// Enhanced metrics dashboard with animations
function animateMetrics() {
    const metricNumbers = document.querySelectorAll('.metric-value, .stat-number, .score-number');
    
    metricNumbers.forEach(element => {
        const finalValue = element.textContent;
        const isPercentage = finalValue.includes('%');
        const isTime = finalValue.includes('sec') || finalValue.includes('min') || finalValue.includes('days');
        const isMoney = finalValue.includes('$') || finalValue.includes('M');
        
        let numericValue = parseFloat(finalValue.replace(/[^\d.]/g, ''));
        
        if (isNaN(numericValue)) return;
        
        let currentValue = 0;
        const increment = numericValue / 50; // 50 steps
        const duration = 2000; // 2 seconds
        const stepTime = duration / 50;
        
        const timer = setInterval(() => {
            currentValue += increment;
            
            if (currentValue >= numericValue) {
                currentValue = numericValue;
                clearInterval(timer);
            }
            
            let displayValue = Math.round(currentValue * 10) / 10;
            
            if (isPercentage) {
                element.textContent = displayValue + '%';
            } else if (isTime) {
                if (finalValue.includes('sec')) {
                    element.textContent = Math.round(displayValue) + ' sec';
                } else if (finalValue.includes('min')) {
                    element.textContent = Math.round(displayValue) + ' min';
                } else if (finalValue.includes('days')) {
                    element.textContent = Math.round(displayValue) + ' days';
                }
            } else if (isMoney) {
                element.textContent = '$' + displayValue + 'M';
            } else {
                element.textContent = displayValue;
            }
        }, stepTime);
    });
}

// Trigger metric animations when they come into view
const metricObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateMetrics();
            metricObserver.unobserve(entry.target);
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const metricsSection = document.querySelector('.security-metrics, .metrics-dashboard');
    if (metricsSection) {
        metricObserver.observe(metricsSection);
    }
});

// Enhanced search functionality (placeholder for future implementation)
function initializeSearch() {
    // Create search overlay
    const searchOverlay = document.createElement('div');
    searchOverlay.className = 'search-overlay';
    searchOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        backdrop-filter: blur(10px);
        z-index: 9999;
        display: none;
        align-items: center;
        justify-content: center;
    `;
    
    const searchBox = document.createElement('div');
    searchBox.innerHTML = `
        <div style="background: white; padding: 30px; border-radius: 15px; max-width: 500px; width: 90%;">
            <h3 style="margin: 0 0 20px 0; color: #333;">Search Security Resources</h3>
            <input type="text" placeholder="Search threats, best practices, or guidance..." 
                   style="width: 100%; padding: 15px; border: 2px solid #ddd; border-radius: 8px; font-size: 16px;">
            <div style="margin-top: 15px; text-align: right;">
                <button onclick="closeSearch()" style="padding: 10px 20px; background: #6c757d; color: white; border: none; border-radius: 5px; margin-right: 10px; cursor: pointer;">Cancel</button>
                <button onclick="performSearch()" style="padding: 10px 20px; background: #4facfe; color: white; border: none; border-radius: 5px; cursor: pointer;">Search</button>
            </div>
        </div>
    `;
    
    searchOverlay.appendChild(searchBox);
    document.body.appendChild(searchOverlay);
    
    // Global search function
    window.openSearch = function() {
        searchOverlay.style.display = 'flex';
        searchBox.querySelector('input').focus();
    };
    
    window.closeSearch = function() {
        searchOverlay.style.display = 'none';
    };
    
    window.performSearch = function() {
        const query = searchBox.querySelector('input').value;
        if (query.trim()) {
            showNotification(`Searching for: "${query}" - Feature coming soon!`, 'info');
            trackEvent('Search', 'Query', query);
        }
        closeSearch();
    };
    
    // ESC to close search
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && searchOverlay.style.display === 'flex') {
            closeSearch();
        }
    });
}

// Initialize search on page load
document.addEventListener('DOMContentLoaded', initializeSearch);

// Add pulse animation for critical alerts
const pulseStyles = `
    @keyframes pulse {
        0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(231, 76, 60, 0.7); }
        70% { transform: scale(1.02); box-shadow: 0 0 0 10px rgba(231, 76, 60, 0); }
        100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(231, 76, 60, 0); }
    }
    
    .intel-critical {
        animation: pulse 2s infinite;
    }
    
    .threat-card-critical {
        border-left: 4px solid #e74c3c;
    }
    
    .threat-card-high {
        border-left: 4px solid #f39c12;
    }
    
    .threat-card-medium {
        border-left: 4px solid #3498db;
    }
`;

// Inject pulse styles
const pulseStyleSheet = document.createElement('style');
pulseStyleSheet.textContent = pulseStyles;
document.head.appendChild(pulseStyleSheet);

// Enhanced error handling and user feedback
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    showNotification('An error occurred. Please refresh the page if issues persist.', 'error');
});

// Service worker registration for offline functionality (future enhancement)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Service worker registration would go here
        console.log('Service worker support detected');
    });
}

// Enhanced accessibility features
document.addEventListener('DOMContentLoaded', function() {
    // Add skip to content link
    const skipLink = document.createElement('a');
    skipLink.href = '#main';
    skipLink.textContent = 'Skip to main content';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: #000;
        color: #fff;
        padding: 8px;
        text-decoration: none;
        border-radius: 4px;
        z-index: 10000;
        transition: top 0.3s;
    `;
    
    skipLink.addEventListener('focus', function() {
        this.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', function() {
        this.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Add main landmark if not present
    const main = document.querySelector('main');
    if (main && !main.id) {
        main.id = 'main';
    }
});

// Performance monitoring and optimization
function monitorPerformance() {
    if ('performance' in window && 'PerformanceObserver' in window) {
        // Monitor Largest Contentful Paint
        const lcpObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            const lastEntry = entries[entries.length - 1];
            console.log('LCP:', lastEntry.startTime);
            
            if (lastEntry.startTime > 2500) {
                console.warn('LCP is slower than recommended (2.5s)');
            }
        });
        
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
        
        // Monitor First Input Delay
        const fidObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            entries.forEach((entry) => {
                console.log('FID:', entry.processingStart - entry.startTime);
            });
        });
        
        fidObserver.observe({ entryTypes: ['first-input'] });
    }
}

// Initialize performance monitoring
document.addEventListener('DOMContentLoaded', monitorPerformance);

// Add loading states to all forms
document.addEventListener('DOMContentLoaded', function() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            const submitButton = this.querySelector('button[type="submit"], input[type="submit"]');
            
            if (submitButton && !submitButton.disabled) {
                submitButton.classList.add('loading');
                submitButton.disabled = true;
                
                // Re-enable after 5 seconds as fallback
                setTimeout(() => {
                    submitButton.classList.remove('loading');
                    submitButton.disabled = false;
                }, 5000);
            }
        });
    });
});

console.log('CyberGuard Pro - Enhanced security website loaded successfully! 🛡️');