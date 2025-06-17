// Enhanced Read the Docs Custom JavaScript with Modern Interactions

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all custom functionality
    initializeThemeToggle();
    initializeAnimations();
    initializeSmoothScroll();
    initializeNavigation();
    initializeSearchEnhancements();
    initializeFooterInteractions();
    initializeAccessibility();
    initializeParallaxEffects();
    initializeFloatingElements();
    initializeProgressIndicator();
});

// Enhanced Theme Toggle
function initializeThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    const body = document.body;
    
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            const currentTheme = body.dataset.theme;
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            // Add smooth transition
            body.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
            body.dataset.theme = newTheme;
            localStorage.setItem('theme', newTheme);
            
            // Add visual feedback
            themeToggle.style.transform = 'scale(0.95) rotate(180deg)';
            setTimeout(() => {
                themeToggle.style.transform = 'scale(1) rotate(0deg)';
                body.style.transition = '';
            }, 300);
            
            // Announce theme change
            announceToScreenReader(`Thème changé vers le mode ${newTheme === 'dark' ? 'sombre' : 'clair'}`);
        });
    }
    
    // Enhanced system theme detection
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addListener(function(e) {
        if (!localStorage.getItem('theme')) {
            body.dataset.theme = e.matches ? 'dark' : 'light';
            announceToScreenReader(`Thème automatique: ${e.matches ? 'sombre' : 'clair'}`);
        }
    });
}

// Enhanced Animation on Scroll with Intersection Observer
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate__animated');
                
                // Add specific animation based on data attribute or default
                const animationType = entry.target.dataset.animation || 'animate__fadeInUp';
                entry.target.classList.add(animationType);
                
                // Add stagger effect for grid items
                if (entry.target.classList.contains('feature-card')) {
                    const delay = Array.from(entry.target.parentNode.children).indexOf(entry.target) * 100;
                    entry.target.style.animationDelay = `${delay}ms`;
                }
                
                // Unobserve after animation
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements with animation data attributes
    document.querySelectorAll('[data-animation]').forEach(el => {
        observer.observe(el);
    });
    
    // Auto-observe common elements
    document.querySelectorAll('.feature-card, .tech-item, .step-card, .tutorial-card').forEach((card, index) => {
        if (!card.dataset.animation) {
            card.dataset.animation = 'animate__fadeInUp';
        }
        observer.observe(card);
    });
    
    // Hero elements special animations
    const heroElements = document.querySelectorAll('.hero-title, .hero-description, .cta-section');
    heroElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            el.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, index * 200);
    });
}

// Enhanced Smooth Scroll with easing
function initializeSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                // Custom smooth scroll with easing
                smoothScrollTo(offsetPosition, 800);
                
                // Add visual highlight to target
                target.style.background = 'rgba(67, 97, 238, 0.1)';
                target.style.transition = 'background 0.3s ease';
                setTimeout(() => {
                    target.style.background = '';
                }, 2000);
            }
        });
    });
}

// Custom smooth scroll function with easing
function smoothScrollTo(endY, duration) {
    const startY = window.pageYOffset;
    const distanceY = endY - startY;
    const startTime = new Date().getTime();

    const easeInOutQuart = (time, from, distance, duration) => {
        if ((time /= duration / 2) < 1) return distance / 2 * time * time * time * time + from;
        return -distance / 2 * ((time -= 2) * time * time * time - 2) + from;
    };

    const timer = setInterval(() => {
        const time = new Date().getTime() - startTime;
        const newY = easeInOutQuart(time, startY, distanceY, duration);
        if (time >= duration) {
            clearInterval(timer);
        }
        window.scroll(0, newY);
    }, 1000 / 60);
}

// Enhanced Navigation with hover effects and active states
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.sidebar-tree a');
    
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(12px)';
            const icon = this.querySelector('.nav-icon');
            if (icon) {
                icon.style.transform = 'scale(1.2) rotate(360deg)';
            }
        });
        
        link.addEventListener('mouseleave', function() {
            if (!this.classList.contains('current')) {
                this.style.transform = 'translateX(0)';
                const icon = this.querySelector('.nav-icon');
                if (icon) {
                    icon.style.transform = 'scale(1) rotate(0deg)';
                }
            }
        });
        
        // Add click effect
        link.addEventListener('click', function() {
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'translateX(12px)';
            }, 100);
        });
    });
}

// Enhanced Search with real-time suggestions
function initializeSearchEnhancements() {
    const searchInput = document.querySelector('.sidebar-search');
    
    if (searchInput) {
        // Add search icon with loading state
        const searchContainer = searchInput.parentElement;
        const searchIcon = document.createElement('i');
        searchIcon.className = 'fas fa-search search-icon';
        searchContainer.style.position = 'relative';
        searchContainer.appendChild(searchIcon);
        
        // Style the search icon
        searchIcon.style.cssText = `
            position: absolute;
            right: 16px;
            top: 50%;
            transform: translateY(-50%);
            color: var(--gray-color);
            pointer-events: none;
            transition: all 0.3s ease;
        `;
        
        // Enhanced search functionality with debouncing
        let searchTimeout;
        let isSearching = false;
        
        searchInput.addEventListener('input', function() {
            clearTimeout(searchTimeout);
            const query = this.value.toLowerCase().trim();
            
            // Update search icon
            if (query.length > 0) {
                searchIcon.className = 'fas fa-spinner fa-spin search-icon';
                isSearching = true;
            } else {
                searchIcon.className = 'fas fa-search search-icon';
                isSearching = false;
            }
            
            searchTimeout = setTimeout(() => {
                if (query.length > 0) {
                    performSearch(query);
                } else {
                    clearSearchHighlights();
                }
                searchIcon.className = 'fas fa-search search-icon';
                isSearching = false;
            }, 300);
        });
        
        // Enhanced keyboard navigation
        searchInput.addEventListener('keydown', function(e) {
            switch(e.key) {
                case 'Escape':
                    this.value = '';
                    clearSearchHighlights();
                    this.blur();
                    searchIcon.className = 'fas fa-search search-icon';
                    break;
                case 'Enter':
                    e.preventDefault();
                    if (this.value.trim()) {
                        performAdvancedSearch(this.value.trim());
                    }
                    break;
            }
        });
        
        // Focus effects
        searchInput.addEventListener('focus', function() {
            searchContainer.style.boxShadow = '0 0 0 3px rgba(67, 97, 238, 0.2)';
        });
        
        searchInput.addEventListener('blur', function() {
            searchContainer.style.boxShadow = '';
        });
    }
}

// Advanced search functionality
function performSearch(query) {
    const searchableElements = document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, li, .feature-card, .tutorial-card');
    let resultsFound = 0;
    
    // Clear previous highlights
    clearSearchHighlights();
    
    searchableElements.forEach(element => {
        const text = element.textContent.toLowerCase();
        if (text.includes(query)) {
            highlightSearchTerm(element, query);
            resultsFound++;
            
            // Scroll to first result
            if (resultsFound === 1) {
                element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    });
    
    // Show search results count
    showSearchResults(resultsFound, query);
}

function performAdvancedSearch(query) {
    // Enhanced search with fuzzy matching
    const searchableContent = Array.from(document.querySelectorAll('h1, h2, h3, p, li')).map(el => ({
        element: el,
        text: el.textContent.toLowerCase(),
        score: 0
    }));
    
    // Calculate relevance scores
    searchableContent.forEach(item => {
        const queryWords = query.toLowerCase().split(' ');
        queryWords.forEach(word => {
            if (item.text.includes(word)) {
                item.score += word.length / item.text.length;
            }
        });
    });
    
    // Sort by relevance and highlight top results
    const sortedResults = searchableContent
        .filter(item => item.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, 10);
    
    clearSearchHighlights();
    sortedResults.forEach(result => {
        highlightSearchTerm(result.element, query);
    });
    
    if (sortedResults.length > 0) {
        sortedResults[0].element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    
    showSearchResults(sortedResults.length, query);
}

function highlightSearchTerm(element, query) {
    const text = element.innerHTML;
    const regex = new RegExp(`(${query})`, 'gi');
    const highlightedText = text.replace(regex, '<mark class="search-highlight">$1</mark>');
    element.innerHTML = highlightedText;
    
    // Add highlight styles
    const highlights = element.querySelectorAll('.search-highlight');
    highlights.forEach(highlight => {
        highlight.style.cssText = `
            background: linear-gradient(45deg, #fff3cd, #ffeaa7);
            color: #856404;
            padding: 2px 4px;
            border-radius: 3px;
            font-weight: 600;
            animation: searchHighlight 0.3s ease;
        `;
    });
}

function clearSearchHighlights() {
    document.querySelectorAll('.search-highlight').forEach(highlight => {
        const parent = highlight.parentNode;
        parent.insertBefore(document.createTextNode(highlight.textContent), highlight);
        parent.removeChild(highlight);
        parent.normalize();
    });
    hideSearchResults();
}

function showSearchResults(count, query) {
    // Remove existing results display
    const existingResults = document.querySelector('.search-results');
    if (existingResults) {
        existingResults.remove();
    }
    
    if (count > 0) {
        const resultsDiv = document.createElement('div');
        resultsDiv.className = 'search-results';
        resultsDiv.innerHTML = `
            <div class="search-results-content">
                <i class="fas fa-search"></i>
                <span>${count} résultat${count > 1 ? 's' : ''} trouvé${count > 1 ? 's' : ''} pour "${query}"</span>
                <button class="search-close" onclick="clearSearchHighlights()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;
        
        resultsDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: rgba(67, 97, 238, 0.95);
            color: white;
            padding: 12px 16px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
            z-index: 1000;
            animation: slideInRight 0.3s ease;
        `;
        
        document.body.appendChild(resultsDiv);
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            if (resultsDiv.parentNode) {
                resultsDiv.style.animation = 'slideOutRight 0.3s ease';
                setTimeout(() => resultsDiv.remove(), 300);
            }
        }, 5000);
    }
}

function hideSearchResults() {
    const resultsDiv = document.querySelector('.search-results');
    if (resultsDiv) {
        resultsDiv.remove();
    }
}

// Enhanced Footer Interactions with parallax and floating effects
function initializeFooterInteractions() {
    const developerCards = document.querySelectorAll('.developer-card');
    const socialLinks = document.querySelectorAll('.developer-links a, .social-links a');
    const footer = document.querySelector('.custom-footer');
    
    // Enhanced hover effects for developer cards
    developerCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.05) rotateY(5deg)';
            this.style.boxShadow = '0 20px 40px rgba(67, 97, 238, 0.3)';
            
            // Animate avatar
            const avatar = this.querySelector('.developer-avatar');
            if (avatar) {
                avatar.style.transform = 'scale(1.2) rotateY(360deg)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1) rotateY(0deg)';
            this.style.boxShadow = '';
            
            const avatar = this.querySelector('.developer-avatar');
            if (avatar) {
                avatar.style.transform = 'scale(1) rotateY(0deg)';
            }
        });
    });
    
    // Enhanced social links with bounce effect
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const platform = this.getAttribute('title') || this.href;
            const developer = this.closest('.developer-card')?.querySelector('h5')?.textContent || 'Developer';
            
            // Analytics tracking
            if (typeof gtag !== 'undefined') {
                gtag('event', 'social_link_click', {
                    platform: platform,
                    developer: developer
                });
            }
            
            // Visual feedback with bounce
            this.style.transform = 'scale(0.8) rotateZ(-10deg)';
            setTimeout(() => {
                this.style.transform = 'scale(1.1) rotateZ(5deg)';
                setTimeout(() => {
                    this.style.transform = 'scale(1) rotateZ(0deg)';
                }, 150);
            }, 100);
        });
        
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.1)';
            this.style.boxShadow = '0 8px 16px rgba(67, 97, 238, 0.3)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '';
        });
    });
    
    // Footer background animation
    if (footer) {
        const backgroundAnimation = footer.querySelector('.footer-background-animation');
        if (backgroundAnimation) {
            let mouseX = 0, mouseY = 0;
            
            footer.addEventListener('mousemove', function(e) {
                mouseX = (e.clientX / window.innerWidth) * 100;
                mouseY = (e.clientY / window.innerHeight) * 100;
                
                backgroundAnimation.style.background = `
                    radial-gradient(circle at ${mouseX}% ${mouseY}%, rgba(67, 97, 238, 0.2) 0%, transparent 50%),
                    radial-gradient(circle at ${100-mouseX}% ${100-mouseY}%, rgba(58, 12, 163, 0.15) 0%, transparent 50%),
                    radial-gradient(circle at 40% 40%, rgba(72, 149, 239, 0.1) 0%, transparent 50%)
                `;
            });
        }
    }
}

// Parallax Effects
function initializeParallaxEffects() {
    const parallaxElements = document.querySelectorAll('.hero-section, .tech-stack-section, .custom-footer');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.3;
        
        parallaxElements.forEach((element, index) => {
            const speed = (index + 1) * 0.1;
            element.style.transform = `translate3d(0, ${rate * speed}px, 0)`;
        });
    });
}

// Floating Elements Animation
function initializeFloatingElements() {
    const floatingElements = document.querySelectorAll('.feature-icon, .tech-item i, .hero-icon');
    
    floatingElements.forEach((element, index) => {
        const delay = index * 0.5;
        const duration = 3 + Math.random() * 2;
        const amplitude = 5 + Math.random() * 5;
        
        element.style.animation = `float ${duration}s ease-in-out ${delay}s infinite`;
        element.style.setProperty('--float-amplitude', `${amplitude}px`);
    });
}

// Progress Indicator
function initializeProgressIndicator() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
        z-index: 9999;
        transition: width 0.3s ease;
    `;
    
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        progressBar.style.width = `${Math.min(scrollPercent, 100)}%`;
    });
}

// Enhanced Accessibility
function initializeAccessibility() {
    // Skip to content functionality
    const skipLink = document.querySelector('.skip-to-content');
    if (skipLink) {
        skipLink.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.setAttribute('tabindex', '-1');
                target.focus();
                target.addEventListener('blur', function() {
                    this.removeAttribute('tabindex');
                }, { once: true });
            }
        });
    }
    
    // Enhanced keyboard navigation
    document.addEventListener('keydown', function(e) {
        // Custom keyboard shortcuts
        if (e.ctrlKey || e.metaKey) {
            switch(e.key) {
                case 'k':
                    e.preventDefault();
                    const searchInput = document.querySelector('.sidebar-search');
                    if (searchInput) {
                        searchInput.focus();
                        searchInput.select();
                    }
                    break;
                case 't':
                    e.preventDefault();
                    const themeToggle = document.querySelector('.theme-toggle');
                    if (themeToggle) {
                        themeToggle.click();
                    }
                    break;
                case '/':
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    break;
            }
        }
    });
    
    // Make cards focusable for keyboard navigation
    document.querySelectorAll('.feature-card, .tutorial-card, .developer-card').forEach(card => {
        card.setAttribute('tabindex', '0');
        card.addEventListener('focus', function() {
            this.style.outline = '3px solid var(--primary-color)';
            this.style.outlineOffset = '4px';
        });
        card.addEventListener('blur', function() {
            this.style.outline = '';
            this.style.outlineOffset = '';
        });
    });
}

// Screen reader announcements
function announceToScreenReader(message) {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.style.cssText = `
        position: absolute !important;
        left: -10000px !important;
        width: 1px !important;
        height: 1px !important;
        overflow: hidden !important;
        clip: rect(1px, 1px, 1px, 1px) !important;
    `;
    
    document.body.appendChild(announcement);
    announcement.textContent = message;
    
    setTimeout(() => {
        if (announcement.parentNode) {
            document.body.removeChild(announcement);
        }
    }, 1000);
}

// Add CSS animations for search and scroll effects
const additionalStyles = `
    @keyframes searchHighlight {
        0% { transform: scale(1); background: #fff3cd; }
        50% { transform: scale(1.05); background: #ffeaa7; }
        100% { transform: scale(1); background: #fff3cd; }
    }
    
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    @keyframes float {
        0%, 100% { transform: translateY(0px) rotate(0deg); }
        33% { transform: translateY(var(--float-amplitude, -10px)) rotate(1deg); }
        66% { transform: translateY(calc(var(--float-amplitude, -10px) / 2)) rotate(-1deg); }
    }
    
    .search-results-content {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 14px;
    }
    
    .search-close {
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        padding: 4px;
        border-radius: 50%;
        transition: background 0.2s ease;
    }
    
    .search-close:hover {
        background: rgba(255, 255, 255, 0.2);
    }
`;

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

// Initialize clipboard functionality for code blocks
document.querySelectorAll('pre code').forEach(block => {
    const button = document.createElement('button');
    button.className = 'copy-button';
    button.innerHTML = '<i class="fas fa-copy"></i>';
    button.title = 'Copier le code';
    
    button.style.cssText = `
        position: absolute;
        top: 8px;
        right: 8px;
        background: rgba(255, 255, 255, 0.1);
        border: none;
        color: white;
        padding: 8px;
        border-radius: 4px;
        cursor: pointer;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    const pre = block.closest('pre');
    if (pre) {
        pre.style.position = 'relative';
        pre.appendChild(button);
        
        pre.addEventListener('mouseenter', () => {
            button.style.opacity = '1';
        });
        
        pre.addEventListener('mouseleave', () => {
            button.style.opacity = '0';
        });
        
        button.addEventListener('click', async () => {
            try {
                await navigator.clipboard.writeText(block.textContent);
                button.innerHTML = '<i class="fas fa-check"></i>';
                button.style.background = 'rgba(76, 201, 240, 0.3)';
                
                setTimeout(() => {
                    button.innerHTML = '<i class="fas fa-copy"></i>';
                    button.style.background = 'rgba(255, 255, 255, 0.1)';
                }, 2000);
            } catch (err) {
                console.error('Failed to copy code:', err);
            }
        });
    }
});
