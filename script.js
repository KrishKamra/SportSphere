// Vanilla JavaScript for SportSphere Dashboard

// ========== LOCAL STORAGE MANAGEMENT ==========

const FAVORITES_KEY = 'sportSphere_favorites';

function getFavorites() {
    const stored = localStorage.getItem(FAVORITES_KEY);
    return stored ? JSON.parse(stored) : [];
}

function saveFavorites(favorites) {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
}

// ========== HERO SECTION FUNCTIONALITY ==========

const highlightBtn = document.getElementById('highlightBtn');
const highlightContent = document.getElementById('highlightContent');

highlightBtn.addEventListener('click', () => {
    highlightContent.classList.toggle('hidden');
    highlightBtn.textContent = highlightContent.classList.contains('hidden') 
        ? "Show Today's Highlight" 
        : "Hide Today's Highlight";
    
    // Add visual feedback
    highlightBtn.style.transform = 'scale(0.98)';
    setTimeout(() => {
        highlightBtn.style.transform = 'scale(1)';
    }, 100);
});

// ========== FAVORITE TEAMS FUNCTIONALITY ==========

const favoriteButtons = document.querySelectorAll('.btn-favorite');
const favoritesDisplay = document.getElementById('favoritesDisplay');
const favoritesList = document.getElementById('favoritesList');

function updateFavoriteButtons() {
    const favorites = getFavorites();
    favoriteButtons.forEach(btn => {
        const teamName = btn.getAttribute('data-team');
        if (favorites.includes(teamName)) {
            btn.classList.add('active');
            btn.innerHTML = '<span class="favorite-icon">★</span> Favorite';
        } else {
            btn.classList.remove('active');
            btn.innerHTML = '<span class="favorite-icon">☆</span> Set as Favorite';
        }
    });
}

function updateFavoritesDisplay() {
    const favorites = getFavorites();
    
    if (favorites.length > 0) {
        favoritesDisplay.classList.remove('hidden');
        favoritesList.innerHTML = favorites
            .map(team => `
                <span class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00a8cc]/10 border border-[#00a8cc]/30 text-[#00a8cc] text-sm font-medium">
                    ⭐ ${team}
                    <button class="remove-favorite ml-1 cursor-pointer hover:text-[#ffdd57] transition" data-team="${team}">×</button>
                </span>
            `)
            .join('');
        
        // Add event listeners to remove buttons
        document.querySelectorAll('.remove-favorite').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const teamName = btn.getAttribute('data-team');
                const favorites = getFavorites();
                const filtered = favorites.filter(t => t !== teamName);
                saveFavorites(filtered);
                updateFavoriteButtons();
                updateFavoritesDisplay();
            });
        });
    } else {
        favoritesDisplay.classList.add('hidden');
    }
}

// Add click handlers to favorite buttons
favoriteButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const teamName = btn.getAttribute('data-team');
        const favorites = getFavorites();
        
        if (favorites.includes(teamName)) {
            const filtered = favorites.filter(t => t !== teamName);
            saveFavorites(filtered);
        } else {
            favorites.push(teamName);
            saveFavorites(favorites);
        }
        
        updateFavoriteButtons();
        updateFavoritesDisplay();
    });
});

// Initialize favorite buttons on page load
updateFavoriteButtons();
updateFavoritesDisplay();

// ========== SCHEDULE FILTER FUNCTIONALITY ==========

const filterButtons = document.querySelectorAll('.schedule-filter');
const scheduleCards = document.querySelectorAll('.schedule-card');

filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        // Update active state
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const filterValue = btn.getAttribute('data-filter');
        
        // Filter schedule cards
        scheduleCards.forEach(card => {
            const status = card.getAttribute('data-status');
            
            if (filterValue === 'all' || status === filterValue) {
                card.style.display = 'flex';
                card.style.animation = 'fadeInUp 0.3s ease-out';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// ========== CONTACT FORM FUNCTIONALITY ==========

const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    
    // Basic validation
    if (!name || !email || !message) {
        showFormMessage('Please fill in all fields', 'error');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showFormMessage('Please enter a valid email address', 'error');
        return;
    }
    
    // Simulate form submission
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';
    
    // Simulate API call
    setTimeout(() => {
        showFormMessage('Thank you for your message! We\'ll get back to you soon.', 'success');
        contactForm.reset();
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
    }, 1500);
});

function showFormMessage(text, type) {
    formMessage.textContent = text;
    formMessage.className = `${type} p-4 rounded-lg text-center font-medium`;
    formMessage.classList.remove('hidden');
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        formMessage.classList.add('hidden');
    }, 5000);
}

// ========== SMOOTH NAVIGATION ==========

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ========== NAVIGATION ACTIVE STATE ==========

const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    
    document.querySelectorAll('section').forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// ========== PAGE LOAD ANIMATIONS ==========

window.addEventListener('load', () => {
    // Fade in elements
    const elements = document.querySelectorAll('.glass-card, h2, h1');
    elements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        setTimeout(() => {
            el.style.transition = 'all 0.6s ease-out';
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, index * 50);
    });
});

// ========== DARK MODE / THEME (Optional Enhancement) ==========

// Check for saved theme preference or default to dark
function initTheme() {
    const savedTheme = localStorage.getItem('sportSphere_theme') || 'dark';
    document.documentElement.style.colorScheme = savedTheme;
}

initTheme();

// ========== PERFORMANCE: Lazy Load Images (Future Enhancement) ==========

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img.lazy').forEach(img => imageObserver.observe(img));
}

// ========== ACCESSIBILITY: Keyboard Navigation ==========

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (!highlightContent.classList.contains('hidden')) {
            highlightContent.classList.add('hidden');
            highlightBtn.textContent = "Show Today's Highlight";
        }
    }
});

// ========== RESPONSIVE MENU (Mobile) ==========

const mobileMenuBtn = document.querySelector('.md\\:hidden button');
if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        // Placeholder for mobile menu functionality
        console.log('Mobile menu toggled');
    });
}
