
const config = {
    navbarScrollThreshold: 50,
    animationDuration: 1000,
    glideOptions: {
        type: 'carousel',
        startAt: 0,
        perView: 3,
        focusAt: 'center',
        gap: 40,
        autoplay: 3000,
        hoverpause: true,
        animationDuration: 800,
        breakpoints: {
            1024: {
                perView: 2
            },
            600: {
                perView: 1
            }
        }
    }
};


document.addEventListener('DOMContentLoaded', function() {
    initGranimBackground();
    initGlideSlider();
    initAOS();
    initLightbox();
    initNavigation();
    initSmoothScroll();
    initFormHandling();
    initScrollEffects();
});

// ================================
// Granim.js 
// ================================
function initGranimBackground() {
    try {
        const granimInstance = new Granim({
            element: '#canvas-gradient',
            direction: 'diagonal',
            opacity: [1, 1],
            isPausedWhenNotInView: true,
            stateTransitionSpeed: 500,
            states: {
                "default-state": {
                    gradients: [
                        ['#ff6b6b', '#4ecdc4'],
                        ['#667eea', '#764ba2'],
                        ['#f093fb', '#f5576c'],
                        ['#4facfe', '#00f2fe'],
                        ['#43e97b', '#38f9d7']
                    ],
                    transitionSpeed: 5000
                }
            }
        });
        console.log('✓ Granim.js initialized successfully');
    } catch (error) {
        console.error('Error initializing Granim:', error);
    }
}

// ================================
// Glide.js 
// ================================
function initGlideSlider() {
    try {
        const glide = new Glide('.glide', config.glideOptions);
        
       
        glide.on('run', () => {
            updateSliderButtons();
        });
        
        glide.mount();
        console.log('✓ Glide.js initialized successfully');
    } catch (error) {
        console.error('Error initializing Glide:', error);
    }
}

function updateSliderButtons() {
    const bullets = document.querySelectorAll('.glide__bullet');
    bullets.forEach(bullet => {
        bullet.classList.add('fade-in');
    });
}

// ================================
// AOS 
// ================================
function initAOS() {
    try {
        AOS.init({
            duration: 1000,
            easing: 'ease-in-out',
            once: false,
            mirror: true,
            offset: 100,
            anchorPlacement: 'top-center'
        });
        console.log('✓ AOS initialized successfully');
    } catch (error) {
        console.error('Error initializing AOS:', error);
    }
}



// ================================
// Lightbox
// ================================
function initLightbox() {
    try {
        lightbox.option({
            'resizeDuration': 400,
            'wrapAround': true,
            'albumLabel': 'Image %1 of %2',
            'fadeDuration': 300,
            'imageFadeDuration': 300,
            'positionFromTop': 50,
            'disableScrolling': true
        });
        console.log('✓ Lightbox2 initialized successfully');
    } catch (error) {
        console.error('Error initializing Lightbox:', error);
    }
}

// ================================
// Navigation System
// ================================
function initNavigation() {
    const navbar = document.querySelector('.navbar');
    const navToggle = document.getElementById('burgerBtn');
    const navMenu = document.getElementById('navMenu');

    if (!navToggle || !navMenu) return;



    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });


    

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar?.classList.add('scrolled');
        } else {
            navbar?.classList.remove('scrolled');
        }
    });

    const burgerBtn = document.getElementById('burgerBtn');
    const navmenu = document.getElementById('navMenu');

burgerBtn.addEventListener('mouseenter', () => {
    navMenu.classList.add('active');
});

navMenu.addEventListener('mouseenter', () => {
    navMenu.classList.add('active');
});

navMenu.addEventListener('mouseleave', () => {
    navMenu.classList.remove('active');
});
}

// ================================
//  Scrolling
// ================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = 80; // Navbar height
                const targetPosition = target.offsetTop - offset;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ================================
// Form Handling
// ================================
function initFormHandling() {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
   
            const submitBtn = contactForm.querySelector('.btn-primary');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
         
            setTimeout(() => {
            
                showNotification('Message sent successfully! We\'ll get back to you soon.');
                
         
                contactForm.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
        
    
        const inputs = contactForm.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('focus', () => {
                input.parentElement?.classList.add('focused');
            });
            
            input.addEventListener('blur', () => {
                if (!input.value) {
                    input.parentElement?.classList.remove('focused');
                }
            });
        });
    }
}

// ================================
// Scroll Effects
// ================================
function initScrollEffects() {
   
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('counter')) {
                    animateCounter(entry.target);
                }
            }
        });
    }, observerOptions);
    

    document.querySelectorAll('.counter').forEach(counter => {
        observer.observe(counter);
    });
    

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroContent = document.querySelector('.hero-content');
        
        if (heroContent && scrolled < window.innerHeight) {
            heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
            heroContent.style.opacity = 1 - (scrolled / window.innerHeight);
        }
    });
}

// ================================
// Utility Functions
// ================================
function animateCounter(element) {
    const target = parseInt(element.textContent.replace(/\D/g, ''));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    
    const updateCounter = () => {
        current += step;
        if (current < target) {
            element.textContent = Math.floor(current).toLocaleString() + '+';
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target.toLocaleString() + '+';
        }
    };
    
    updateCounter();
}

function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    

    Object.assign(notification.style, {
        position: 'fixed',
        top: '100px',
        right: '20px',
        padding: '15px 25px',
        background: type === 'success' ? '#4ecdc4' : '#ff6b6b',
        color: 'white',
        borderRadius: '5px',
        boxShadow: '0 5px 15px rgba(0,0,0,0.2)',
        zIndex: '9999',
        animation: 'slideIn 0.5s ease-out'
    });
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.5s ease-out';
        setTimeout(() => notification.remove(), 500);
    }, 3000);
}


function loadInstagramFeed() {

    console.log('Instagram feed placeholder for @saruna_tattoo');
}


if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        AOS.refresh();
    }, 250);
});


window.addEventListener('load', () => {
    console.log('✓ Saruna Tattoo website fully loaded');
    console.log('✓ All 4 JavaScript libraries initialized:');
    console.log('  1. Granim.js - Animated gradient backgrounds');
    console.log('  2. Glide.js - Portfolio slider');
    console.log('  3. AOS - Scroll animations');
    console.log('  4. Lightbox2 - Gallery lightbox');
});



const cartIcon = document.querySelector('.nav-right a:last-child i');

cartIcon.addEventListener('mouseenter', () => {
  anime({
    targets: cartIcon,
    rotate: [0, 20, -20, 0],
    duration: 600,
    easing: 'easeInOutSine'
  });
});



if (window.innerWidth <= 400) {
    gsap.set(".logo", {x:0}); 
}

window.addEventListener("load", () => {
  AOS.init({ once: true });
});