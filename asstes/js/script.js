// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// ========================================
// HEADER SCROLL EFFECT
// ========================================
const header = document.getElementById('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.querySelector('nav > div').classList.add('header-scrolled');
    } else {
        header.querySelector('nav > div').classList.remove('header-scrolled');
    }
    
    lastScroll = currentScroll;
});

// ========================================
// MOBILE MENU
// ========================================
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const closeMenu = document.getElementById('close-menu');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.add('active');
});

closeMenu.addEventListener('click', () => {
    mobileMenu.classList.remove('active');
});

// Close menu when clicking on a link
const mobileMenuLinks = mobileMenu.querySelectorAll('a');
mobileMenuLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        mobileMenu.classList.remove('active');
    }
});

// ========================================
// COUNTER ANIMATION
// ========================================
const counters = document.querySelectorAll('.counter');
let counterAnimated = false;

function animateCounters() {
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        updateCounter();
    });
}

// Trigger counter animation when scrolling to stats section
window.addEventListener('scroll', () => {
    if (!counterAnimated) {
        const statsSection = document.querySelector('#home');
        const sectionTop = statsSection.offsetTop;
        const sectionHeight = statsSection.offsetHeight;
        const scrollPosition = window.pageYOffset + window.innerHeight;
        
        if (scrollPosition > sectionTop + sectionHeight / 2) {
            animateCounters();
            counterAnimated = true;
        }
    }
});

// ========================================
// COUNTDOWN TIMER
// ========================================
function startCountdown() {
    const countdownDate = new Date();
    countdownDate.setDate(countdownDate.getDate() + 7); // 7 days from now
    
    const timer = setInterval(() => {
        const now = new Date().getTime();
        const distance = countdownDate - now;
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        document.getElementById('days').textContent = String(days).padStart(2, '0');
        document.getElementById('hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
        
        if (distance < 0) {
            clearInterval(timer);
            document.getElementById('days').textContent = '00';
            document.getElementById('hours').textContent = '00';
            document.getElementById('minutes').textContent = '00';
            document.getElementById('seconds').textContent = '00';
        }
    }, 1000);
}

startCountdown();

// ========================================
// PORTFOLIO FILTER
// ========================================
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => {
            b.classList.remove('active', 'bg-orange-500', 'text-white');
            b.classList.add('bg-white', 'text-gray-800');
        });
        
        // Add active class to clicked button
        btn.classList.add('active', 'bg-orange-500', 'text-white');
        btn.classList.remove('bg-white', 'text-gray-800');
        
        const filter = btn.getAttribute('data-filter');
        
        portfolioItems.forEach(item => {
            if (filter === 'all' || item.classList.contains(filter)) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 10);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    });
});

// ========================================
// LIGHTBOX
// ========================================
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightbox-image');
const closeLightbox = document.getElementById('close-lightbox');
const lightboxBtns = document.querySelectorAll('.lightbox-btn');

lightboxBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const imageSrc = btn.getAttribute('data-image');
        lightboxImage.src = imageSrc;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

closeLightbox.addEventListener('click', () => {
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
});

lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// ========================================
// ACCORDION FAQ
// ========================================
const accordionBtns = document.querySelectorAll('.accordion-btn');

accordionBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const content = btn.nextElementSibling;
        const icon = btn.querySelector('i');
        
        // Close all other accordions
        accordionBtns.forEach(otherBtn => {
            if (otherBtn !== btn) {
                const otherContent = otherBtn.nextElementSibling;
                const otherIcon = otherBtn.querySelector('i');
                otherContent.classList.remove('active');
                otherIcon.style.transform = 'rotate(0deg)';
            }
        });
        
        // Toggle current accordion
        content.classList.toggle('active');
        
        if (content.classList.contains('active')) {
            icon.style.transform = 'rotate(180deg)';
        } else {
            icon.style.transform = 'rotate(0deg)';
        }
    });
});

// ========================================
// TESTIMONIALS CAROUSEL
// ========================================
const carousel = document.getElementById('testimonials-carousel').querySelector('.flex');
const prevBtn = document.getElementById('prev-testimonial');
const nextBtn = document.getElementById('next-testimonial');
const dots = document.querySelectorAll('.testimonial-dot');
let currentSlide = 0;
const totalSlides = 3;

function updateCarousel() {
    const offset = -currentSlide * 100;
    carousel.style.transform = `translateX(${offset}%)`;
    
    // Update dots
    dots.forEach((dot, index) => {
        if (index === currentSlide) {
            dot.classList.add('bg-orange-500');
            dot.classList.remove('bg-gray-300');
        } else {
            dot.classList.remove('bg-orange-500');
            dot.classList.add('bg-gray-300');
        }
    });
}

prevBtn.addEventListener('click', () => {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateCarousel();
});

nextBtn.addEventListener('click', () => {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateCarousel();
});

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentSlide = index;
        updateCarousel();
    });
});

// Auto-play carousel
let autoplayInterval = setInterval(() => {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateCarousel();
}, 5000);

// Pause autoplay on hover
document.getElementById('testimonials-carousel').addEventListener('mouseenter', () => {
    clearInterval(autoplayInterval);
});

document.getElementById('testimonials-carousel').addEventListener('mouseleave', () => {
    autoplayInterval = setInterval(() => {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateCarousel();
    }, 5000);
});

// ========================================
// PRICE CALCULATOR
// ========================================
const calculateBtn = document.getElementById('calculate-btn');
const calculatorResult = document.getElementById('calculator-result');
const totalPriceElement = document.getElementById('total-price');

calculateBtn.addEventListener('click', () => {
    const houseType = document.getElementById('house-type');
    const distance = parseInt(document.getElementById('distance').value) || 0;
    const checkboxes = document.querySelectorAll('#calculator-form input[type="checkbox"]:checked');
    const phone = document.getElementById('phone').value;
    const movingDate = document.getElementById('moving-date').value;
    
    // Validation
    if (!houseType.value) {
        alert('الرجاء اختيار نوع المنزل');
        return;
    }
    
    if (distance === 0) {
        alert('الرجاء إدخال المسافة');
        return;
    }
    
    if (!movingDate) {
        alert('الرجاء تحديد موعد النقل');
        return;
    }
    
    if (!phone) {
        alert('الرجاء إدخال رقم الهاتف');
        return;
    }
    
    // Calculate base price
    let basePrice = 0;
    const selectedOption = houseType.options[houseType.selectedIndex];
    const rooms = parseInt(selectedOption.getAttribute('data-rooms'));
    
    // Base price calculation
    basePrice = 500 + (rooms * 200);
    
    // Distance cost (2 SAR per km)
    const distanceCost = distance * 2;
    
    // Additional services
    let additionalCost = 0;
    checkboxes.forEach(checkbox => {
        if (checkbox.value === 'packing') additionalCost += 200;
        if (checkbox.value === 'disassembly') additionalCost += 300;
        if (checkbox.value === 'storage') additionalCost += 500;
    });
    
    // Total price
    const totalPrice = basePrice + distanceCost + additionalCost;
    
    // Display result
    totalPriceElement.textContent = totalPrice.toLocaleString();
    calculatorResult.classList.remove('hidden');
    
    // Smooth scroll to result
    calculatorResult.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    
    // Store data for booking (you can send this to a server)
    const calculatorData = {
        houseType: houseType.value,
        rooms: rooms,
        distance: distance,
        additionalServices: Array.from(checkboxes).map(cb => cb.value),
        movingDate: movingDate,
        phone: phone,
        totalPrice: totalPrice
    };
    
    console.log('Calculator Data:', calculatorData);
});

// ========================================
// CONTACT FORM
// ========================================
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    // Here you would typically send this data to a server
    console.log('Contact Form Data:', data);
    
    // Show success message
    alert('شكراً لتواصلك معنا! سنرد عليك في أقرب وقت ممكن.');
    
    // Reset form
    contactForm.reset();
});

// ========================================
// SCROLL TO TOP BUTTON
// ========================================
const scrollTopBtn = document.getElementById('scroll-top');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 500) {
        scrollTopBtn.style.opacity = '1';
        scrollTopBtn.style.pointerEvents = 'auto';
    } else {
        scrollTopBtn.style.opacity = '0';
        scrollTopBtn.style.pointerEvents = 'none';
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ========================================
// SMOOTH SCROLL FOR NAVIGATION LINKS
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const headerHeight = 100;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ========================================
// PARALLAX EFFECT
// ========================================
window.addEventListener('scroll', () => {
    const parallaxElements = document.querySelectorAll('.parallax');
    
    parallaxElements.forEach(element => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.5;
        element.style.backgroundPositionY = rate + 'px';
    });
});

// ========================================
// PRELOAD OPTIMIZATION
// ========================================
window.addEventListener('load', () => {
    // Remove any loading screens if present
    document.body.classList.add('loaded');
    
    // Initialize any lazy loading
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    }
});

// ========================================
// ANIMATED ELEMENTS ON SCROLL
// ========================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe all cards and sections
document.querySelectorAll('.card-hover, section').forEach(el => {
    observer.observe(el);
});

// ========================================
// BOOKING SYSTEM (Simple Implementation)
// ========================================
const bookingButtons = document.querySelectorAll('button:not([type="submit"])');

bookingButtons.forEach(btn => {
    if (btn.textContent.includes('احجز الآن') || btn.textContent.includes('احجز')) {
        btn.addEventListener('click', () => {
            // Scroll to contact section
            const contactSection = document.getElementById('contact');
            if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
                
                // Show a notification
                showNotification('يمكنك الحجز الآن عن طريق ملء النموذج أو الاتصال بنا مباشرة');
            }
        });
    }
});

// ========================================
// NOTIFICATION SYSTEM
// ========================================
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'fixed top-24 right-4 bg-green-500 text-white px-6 py-4 rounded-xl shadow-2xl z-50 transform transition-all duration-500 translate-x-full';
    notification.innerHTML = `
        <div class="flex items-center gap-3">
            <i class="fas fa-check-circle text-2xl"></i>
            <span class="font-semibold">${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            notification.remove();
        }, 500);
    }, 5000);
}

// ========================================
// TRACKING SYSTEM (Basic Implementation)
// ========================================
function initializeTracking() {
    // This would typically connect to a backend system
    // For now, we'll just create a simple tracking number generator
    
    const trackingNumbers = [];
    
    window.generateTrackingNumber = function() {
        const prefix = 'MVX';
        const randomNum = Math.floor(Math.random() * 1000000);
        const trackingNum = `${prefix}${String(randomNum).padStart(6, '0')}`;
        trackingNumbers.push({
            number: trackingNum,
            date: new Date(),
            status: 'قيد المعالجة'
        });
        return trackingNum;
    };
    
    window.trackOrder = function(trackingNum) {
        const order = trackingNumbers.find(t => t.number === trackingNum);
        if (order) {
            return order;
        } else {
            return null;
        }
    };
}

initializeTracking();

// ========================================
// LOYALTY POINTS SYSTEM (Basic)
// ========================================
const loyaltySystem = {
    points: 0,
    
    addPoints(amount) {
        this.points += amount;
        this.savePoints();
        showNotification(`تم إضافة ${amount} نقطة إلى رصيدك!`);
    },
    
    redeemPoints(amount) {
        if (this.points >= amount) {
            this.points -= amount;
            this.savePoints();
            return true;
        }
        return false;
    },
    
    savePoints() {
        localStorage.setItem('mevox_loyalty_points', this.points);
    },
    
    loadPoints() {
        const savedPoints = localStorage.getItem('mevox_loyalty_points');
        if (savedPoints) {
            this.points = parseInt(savedPoints);
        }
    },
    
    getPoints() {
        return this.points;
    }
};

// Load points on page load
loyaltySystem.loadPoints();

// ========================================
// NEWSLETTER SUBSCRIPTION
// ========================================
const newsletterForm = document.querySelector('footer form');

if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = newsletterForm.querySelector('input[type="email"]').value;
        
        // Here you would typically send this to a server
        console.log('Newsletter subscription:', email);
        
        showNotification('تم الاشتراك بنجاح! شكراً لك.');
        newsletterForm.reset();
        
        // Award loyalty points for newsletter subscription
        loyaltySystem.addPoints(10);
    });
}

// ========================================
// REAL-TIME CHAT (Basic UI)
// ========================================
const chatButton = document.querySelector('.chat-button');

if (chatButton) {
    chatButton.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Open WhatsApp
        const whatsappUrl = chatButton.getAttribute('href');
        window.open(whatsappUrl, '_blank');
        
        showNotification('يتم توجيهك إلى واتساب...');
    });
}

// ========================================
// APPOINTMENT SCHEDULER (Basic)
// ========================================
const movingDateInput = document.getElementById('moving-date');

if (movingDateInput) {
    // Set minimum date to today
    const today = new Date().toISOString().split('T')[0];
    movingDateInput.setAttribute('min', today);
    
    // Highlight weekends (optional)
    movingDateInput.addEventListener('change', (e) => {
        const selectedDate = new Date(e.target.value);
        const dayOfWeek = selectedDate.getDay();
        
        if (dayOfWeek === 5) { // Friday
            showNotification('تنبيه: يوم الجمعة - ساعات العمل من 2:00 م - 10:00 م');
        }
    });
}

// ========================================
// SEO AND PERFORMANCE OPTIMIZATIONS
// ========================================
// Add meta description dynamically if needed
if (!document.querySelector('meta[name="description"]')) {
    const metaDescription = document.createElement('meta');
    metaDescription.name = 'description';
    metaDescription.content = 'ميفوكس - شركة نقل العفش الرائدة في جدة. خدمات نقل احترافية، فك وتركيب، تخزين آمن. اتصل الآن!';
    document.head.appendChild(metaDescription);
}

// ========================================
// ERROR HANDLING
// ========================================
window.addEventListener('error', (e) => {
    console.error('Error occurred:', e.error);
    // You could send this to an error tracking service
});

// ========================================
// CONSOLE WELCOME MESSAGE
// ========================================
console.log('%c🚚 مرحباً بك في ميفوكس!', 'font-size: 24px; color: #f97316; font-weight: bold;');
console.log('%cنقل العفش الاحترافي في جدة', 'font-size: 16px; color: #3b82f6;');
console.log('%cاتصل بنا: 0500000000', 'font-size: 14px; color: #10b981;');

// ========================================
// INITIALIZE ALL FUNCTIONS
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    console.log('✅ Website loaded successfully');
    console.log('✅ All interactive features initialized');
});

// ========================================
// GOOGLE ANALYTICS (Placeholder)
// ========================================
// Add your Google Analytics code here
// window.dataLayer = window.dataLayer || [];
// function gtag(){dataLayer.push(arguments);}
// gtag('js', new Date());
// gtag('config', 'YOUR-GA-ID');

// ========================================
// PERFORMANCE MONITORING
// ========================================
if ('performance' in window) {
    window.addEventListener('load', () => {
        const perfData = performance.getEntriesByType('navigation')[0];
        console.log('📊 Page Load Time:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
    });
}

// ========================================
// SERVICE WORKER (For PWA - Advanced)
// ========================================
// Uncomment to enable PWA functionality
// if ('serviceWorker' in navigator) {
//     navigator.serviceWorker.register('/sw.js')
//         .then(reg => console.log('Service Worker registered'))
//         .catch(err => console.log('Service Worker registration failed'));
// }


let ticking = false;

window.addEventListener('scroll', function() {
  if (!ticking) {
    window.requestAnimationFrame(function() {
      // الكود الخاص بالسكروول هنا
      ticking = false;
    });
    ticking = true;
  }
});