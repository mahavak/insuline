// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Insulin Resistance Calculator - English
function calculateRatio() {
    const triglycerides = parseFloat(document.getElementById('triglycerides').value);
    const hdl = parseFloat(document.getElementById('hdl').value);
    const resultDiv = document.getElementById('ratio-result');

    if (isNaN(triglycerides) || isNaN(hdl) || hdl === 0) {
        resultDiv.innerHTML = '<p style="color: var(--error-color);">Please enter valid numbers</p>';
        return;
    }

    const ratio = (triglycerides / hdl).toFixed(2);
    let status = '';
    let color = '';

    if (ratio < 1.5) {
        status = 'Optimal - Low insulin resistance risk';
        color = 'var(--success-color)';
    } else if (ratio >= 1.5 && ratio < 2.0) {
        status = 'Moderate - Some insulin resistance';
        color = 'var(--warning-color)';
    } else {
        status = 'High - Significant insulin resistance';
        color = 'var(--error-color)';
    }

    resultDiv.innerHTML = `
        <div style="color: ${color};">
            <strong>Your Ratio: ${ratio}</strong><br>
            ${status}
        </div>
    `;
}

// Insulin Resistance Calculator - Dutch
function calculateRatioNL() {
    const triglycerides = parseFloat(document.getElementById('triglycerides-nl').value);
    const hdl = parseFloat(document.getElementById('hdl-nl').value);
    const resultDiv = document.getElementById('ratio-result-nl');

    if (isNaN(triglycerides) || isNaN(hdl) || hdl === 0) {
        resultDiv.innerHTML = '<p style="color: var(--error-color);">Voer geldige getallen in</p>';
        return;
    }

    const ratio = (triglycerides / hdl).toFixed(2);
    let status = '';
    let color = '';

    if (ratio < 1.5) {
        status = 'Optimaal - Laag risico op insulineresistentie';
        color = 'var(--success-color)';
    } else if (ratio >= 1.5 && ratio < 2.0) {
        status = 'Matig - Enige insulineresistentie';
        color = 'var(--warning-color)';
    } else {
        status = 'Hoog - Significante insulineresistentie';
        color = 'var(--error-color)';
    }

    resultDiv.innerHTML = `
        <div style="color: ${color};">
            <strong>Jouw Ratio: ${ratio}</strong><br>
            ${status}
        </div>
    `;
}

// Progress Tracker
function updateProgress() {
    const fastingHours = document.querySelector('.tracker-item input[type="number"]').value;
    const postMealWalks = document.querySelector('.tracker-item input[type="checkbox"]').checked;
    const sleepHours = document.querySelectorAll('.tracker-item input[type="number"]')[1].value;
    const stressLevel = document.querySelector('.tracker-item input[type="range"]').value;

    // Store in localStorage
    localStorage.setItem('insulinProgress', JSON.stringify({
        fastingHours,
        postMealWalks,
        sleepHours,
        stressLevel,
        date: new Date().toISOString()
    }));
}

// Load saved progress
function loadProgress() {
    const saved = localStorage.getItem('insulinProgress');
    if (saved) {
        const data = JSON.parse(saved);
        document.querySelector('.tracker-item input[type="number"]').value = data.fastingHours || 16;
        document.querySelector('.tracker-item input[type="checkbox"]').checked = data.postMealWalks || false;
        document.querySelectorAll('.tracker-item input[type="number"]')[1].value = data.sleepHours || 8;
        document.querySelector('.tracker-item input[type="range"]').value = data.stressLevel || 5;
    }
}

// Add event listeners for progress tracker
document.addEventListener('DOMContentLoaded', function() {
    loadProgress();
    
    const trackerInputs = document.querySelectorAll('.tracker-item input');
    trackerInputs.forEach(input => {
        input.addEventListener('change', updateProgress);
    });
});

// Animated counters for hero stats
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = counter.textContent;
        const isPercentage = target.includes('%');
        const isNumber = !isNaN(parseInt(target));
        
        if (isNumber) {
            const finalNumber = parseInt(target);
            let currentNumber = 0;
            const increment = finalNumber / 50;
            const timer = setInterval(() => {
                currentNumber += increment;
                if (currentNumber >= finalNumber) {
                    counter.textContent = target;
                    clearInterval(timer);
                } else {
                    counter.textContent = Math.floor(currentNumber) + (isPercentage ? '%' : '');
                }
            }, 30);
        }
    });
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            
            // Trigger counter animation for hero stats
            if (entry.target.classList.contains('hero-stats')) {
                animateCounters();
            }
        }
    });
}, observerOptions);

// Observe elements
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.content-card, .step, .solution-card, .method-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Add animation class styles
const style = document.createElement('style');
style.textContent = `
    .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(style);

// Scroll to top button
function createScrollToTopButton() {
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '↑';
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: var(--primary-color);
        color: white;
        border: none;
        font-size: 20px;
        cursor: pointer;
        opacity: 0;
        transition: opacity 0.3s ease;
        z-index: 1000;
    `;
    
    document.body.appendChild(scrollBtn);
    
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollBtn.style.opacity = '1';
        } else {
            scrollBtn.style.opacity = '0';
        }
    });
}

// Initialize scroll to top button
document.addEventListener('DOMContentLoaded', createScrollToTopButton);

// Dark mode toggle (bonus feature)
function createDarkModeToggle() {
    const toggle = document.createElement('button');
    toggle.innerHTML = '🌙';
    toggle.className = 'dark-mode-toggle';
    toggle.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: var(--bg-secondary);
        border: 1px solid var(--border-color);
        cursor: pointer;
        font-size: 18px;
        z-index: 1000;
        transition: all 0.3s ease;
    `;
    
    document.body.appendChild(toggle);
    
    toggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        toggle.innerHTML = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
        
        // Save preference
        localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
    });
    
    // Load saved preference
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
        toggle.innerHTML = '☀️';
    }
}

// Add dark mode styles
const darkModeStyle = document.createElement('style');
darkModeStyle.textContent = `
    .dark-mode {
        --text-primary: #f9fafb;
        --text-secondary: #d1d5db;
        --bg-primary: #111827;
        --bg-secondary: #1f2937;
        --border-color: #374151;
    }
    
    .dark-mode .navbar {
        background: rgba(17, 24, 39, 0.95);
    }
    
    .dark-mode .content-card,
    .dark-mode .method-card,
    .dark-mode .solution-card,
    .dark-mode .week,
    .dark-mode .progress-tracker,
    .dark-mode .resource-card {
        background: #1f2937;
        color: #f9fafb;
    }
`;
document.head.appendChild(darkModeStyle);

// Initialize dark mode toggle
document.addEventListener('DOMContentLoaded', createDarkModeToggle);

// Newsletter signup (bonus feature)
function createNewsletterSignup() {
    const newsletterSection = document.createElement('div');
    newsletterSection.className = 'newsletter-section';
    newsletterSection.innerHTML = `
        <div class="container">
            <h3>Stay Updated</h3>
            <p>Get the latest research and tips on insulin resistance</p>
            <form class="newsletter-form">
                <input type="email" placeholder="Enter your email" required>
                <button type="submit" class="btn btn-primary">Subscribe</button>
            </form>
        </div>
    `;
    
    newsletterSection.style.cssText = `
        background: var(--bg-secondary);
        padding: 3rem 0;
        text-align: center;
    `;
    
    const footer = document.querySelector('.footer');
    if (footer) {
        footer.parentNode.insertBefore(newsletterSection, footer);
    }
    
    // Handle form submission
    const form = newsletterSection.querySelector('.newsletter-form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = form.querySelector('input[type="email"]').value;
        
        // Simulate signup
        form.innerHTML = `
            <p style="color: var(--success-color);">Thank you for subscribing!</p>
        `;
        
        // Save email locally
        localStorage.setItem('newsletterEmail', email);
    });
}

// Initialize newsletter signup
document.addEventListener('DOMContentLoaded', createNewsletterSignup);

// Performance optimization - lazy load images
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
document.addEventListener('DOMContentLoaded', lazyLoadImages);

// Add loading states
function addLoadingStates() {
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            if (!this.classList.contains('loading')) {
                const originalText = this.textContent;
                this.innerHTML = '<span class="loading"></span>';
                this.classList.add('loading');
                
                setTimeout(() => {
                    this.textContent = originalText;
                    this.classList.remove('loading');
                }, 1000);
            }
        });
    });
}

// Initialize loading states
document.addEventListener('DOMContentLoaded', addLoadingStates);

// Print functionality
function addPrintButton() {
    const printBtn = document.createElement('button');
    printBtn.innerHTML = '🖨️ Print Guide';
    printBtn.className = 'print-btn';
    printBtn.style.cssText = `
        position: fixed;
        bottom: 80px;
        right: 20px;
        padding: 10px 15px;
        background: var(--secondary-color);
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        font-size: 14px;
        z-index: 1000;
    `;
    
    printBtn.addEventListener('click', () => {
        window.print();
    });
    
    document.body.appendChild(printBtn);
}

// Initialize print button
document.addEventListener('DOMContentLoaded', addPrintButton);

// Accessibility improvements
function improveAccessibility() {
    // Add keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });
    
    document.addEventListener('mousedown', () => {
        document.body.classList.remove('keyboard-navigation');
    });
    
    // Add skip link
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 0;
        background: var(--primary-color);
        color: white;
        padding: 8px;
        text-decoration: none;
        z-index: 1001;
    `;
    
    skipLink.addEventListener('focus', () => {
        skipLink.style.top = '0';
    });
    
    skipLink.addEventListener('blur', () => {
        skipLink.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
}

// Initialize accessibility features
document.addEventListener('DOMContentLoaded', improveAccessibility);

// Error handling
window.addEventListener('error', (e) => {
    console.error('JavaScript error:', e.error);
});

// Language switching functionality
function switchLanguage(lang) {
    const currentPath = window.location.pathname;
    const basePath = currentPath.substring(0, currentPath.lastIndexOf('/') + 1);
    
    if (lang === 'nl') {
        window.location.href = basePath + 'nl.html';
    } else {
        window.location.href = basePath + 'index.html';
    }
    
    // Update active button
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.getElementById(`${lang}-btn`).classList.add('active');
}

// Initialize language switcher based on current page
document.addEventListener('DOMContentLoaded', function() {
    const currentPath = window.location.pathname;
    const langButtons = document.querySelectorAll('.lang-btn');
    
    if (currentPath.includes('nl.html')) {
        document.getElementById('nl-btn')?.classList.add('active');
        document.getElementById('en-btn')?.classList.remove('active');
    } else {
        document.getElementById('en-btn')?.classList.add('active');
        document.getElementById('nl-btn')?.classList.remove('active');
    }
});

// Service worker registration (for PWA)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').catch(() => {
            console.log('Service worker registration failed');
        });
    });
}
