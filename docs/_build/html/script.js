(function() {
    'use strict';

    // Configuration
    const sections = ['introduction', 'installation', 'utilisation', 'api', 'models', 'download'];
    const sectionTitles = {
        'introduction': 'Introduction',
        'installation': 'Installation', 
        'utilisation': 'Utilisation',
        'api': 'API Documentation',
        'models': 'Modèles',
        'download': 'Téléchargement'
    };

    let currentSection = 0;
    let searchIndex = [];

    // DOM Elements
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    const searchInput = document.getElementById('search-input');
    const breadcrumb = document.getElementById('breadcrumb');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');

    // Initialize the application
    function init() {
        setupEventListeners();
        buildSearchIndex();
        showSection('introduction');
        updateBreadcrumb();
    }

    // Setup event listeners
    function setupEventListeners() {
        // Mobile menu
        if (mobileMenuBtn) {
            mobileMenuBtn.addEventListener('click', openMobileMenu);
        }

        if (overlay) {
            overlay.addEventListener('click', closeMobileMenu);
        }

        // Search functionality
        if (searchInput) {
            searchInput.addEventListener('input', handleSearch);
            searchInput.addEventListener('keydown', handleSearchKeydown);
        }

        // Navigation buttons
        if (prevBtn) {
            prevBtn.addEventListener('click', () => navigatePage('prev'));
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => navigatePage('next'));
        }

        // Handle browser back/forward
        window.addEventListener('popstate', handlePopState);

        // Handle hash changes
        window.addEventListener('hashchange', handleHashChange);

        // Handle keyboard navigation
        document.addEventListener('keydown', handleKeyboardNavigation);

        // Handle window resize
        window.addEventListener('resize', handleResize);
    }

    // Mobile menu functions
    function openMobileMenu() {
        if (sidebar) {
            sidebar.classList.remove('-translate-x-full');
        }
        if (overlay) {
            overlay.classList.remove('hidden');
        }
        document.body.style.overflow = 'hidden';
    }

    function closeMobileMenu() {
        if (sidebar) {
            sidebar.classList.add('-translate-x-full');
        }
        if (overlay) {
            overlay.classList.add('hidden');
        }
        document.body.style.overflow = '';
    }

    // Navigation functions
    function showSection(sectionId) {
        // Validate section ID
        if (!sections.includes(sectionId)) {
            console.warn(`Section ${sectionId} not found`);
            return;
        }

        // Hide all sections
        document.querySelectorAll('.content-section').forEach(section => {
            section.classList.add('hidden');
        });

        // Show selected section
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.remove('hidden');
            targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }

        // Update active nav link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('bg-blue-50', 'text-rtd-blue');
        });

        const activeLink = document.querySelector(`[onclick="showSection('${sectionId}')"]`);
        if (activeLink) {
            activeLink.classList.add('bg-blue-50', 'text-rtd-blue');
        }

        // Update current section index
        currentSection = sections.indexOf(sectionId);
        updateNavigationButtons();
        updateBreadcrumb(sectionId);

        // Update URL hash
        history.pushState({ section: sectionId }, '', `#${sectionId}`);

        // Close mobile menu
        closeMobileMenu();

        // Update page title
        document.title = `${sectionTitles[sectionId]} - Cheating Detection Documentation`;
    }

    function navigatePage(direction) {
        if (direction === 'next' && currentSection < sections.length - 1) {
            currentSection++;
        } else if (direction === 'prev' && currentSection > 0) {
            currentSection--;
        }
        showSection(sections[currentSection]);
    }

    function updateNavigationButtons() {
        if (prevBtn) {
            prevBtn.style.visibility = currentSection === 0 ? 'hidden' : 'visible';
        }
        if (nextBtn) {
            nextBtn.style.visibility = currentSection === sections.length - 1 ? 'hidden' : 'visible';
        }
    }

    function updateBreadcrumb(sectionId = sections[currentSection]) {
        if (breadcrumb) {
            breadcrumb.textContent = sectionTitles[sectionId] || sectionId;
        }
    }

    // Search functionality
    function buildSearchIndex() {
        searchIndex = [];
        sections.forEach(sectionId => {
            const section = document.getElementById(sectionId);
            if (section) {
                const text = section.textContent.toLowerCase();
                const headings = section.querySelectorAll('h1, h2, h3, h4, h5, h6');
                
                searchIndex.push({
                    id: sectionId,
                    title: sectionTitles[sectionId],
                    content: text,
                    headings: Array.from(headings).map(h => h.textContent.toLowerCase())
                });
            }
        });
    }

    function handleSearch(event) {
        const query = event.target.value.toLowerCase().trim();
        
        if (query.length < 2) {
            clearSearchResults();
            return;
        }

        const results = searchIndex.filter(item => {
            return item.content.includes(query) || 
                   item.title.toLowerCase().includes(query) ||
                   item.headings.some(heading => heading.includes(query));
        });

        displaySearchResults(results, query);
    }

    function displaySearchResults(results, query) {
        // Remove existing search results
        const existingResults = document.getElementById('search-results');
        if (existingResults) {
            existingResults.remove();
        }

        if (results.length === 0) {
            return;
        }

        // Create search results container
        const resultsContainer = document.createElement('div');
        resultsContainer.id = 'search-results';
        resultsContainer.className = 'absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-b shadow-lg z-50 max-h-60 overflow-y-auto';

        results.forEach(result => {
            const resultItem = document.createElement('div');
            resultItem.className = 'p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0';
            resultItem.innerHTML = `
                <div class="font-semibold text-sm text-rtd-blue">${highlightText(result.title, query)}</div>
                <div class="text-xs text-gray-600 mt-1">Section: ${result.id}</div>
            `;
            
            resultItem.addEventListener('click', () => {
                showSection(result.id);
                clearSearchResults();
                searchInput.value = '';
            });

            resultsContainer.appendChild(resultItem);
        });

        // Add results to search container
        const searchContainer = searchInput.parentElement;
        searchContainer.style.position = 'relative';
        searchContainer.appendChild(resultsContainer);
    }

    function clearSearchResults() {
        const existingResults = document.getElementById('search-results');
        if (existingResults) {
            existingResults.remove();
        }
    }

    function highlightText(text, query) {
        const regex = new RegExp(`(${query})`, 'gi');
        return text.replace(regex, '<span class="search-highlight">$1</span>');
    }

    function handleSearchKeydown(event) {
        if (event.key === 'Escape') {
            clearSearchResults();
            searchInput.blur();
        }
    }

    // Event handlers
    function handlePopState(event) {
        if (event.state && event.state.section) {
            showSection(event.state.section);
        }
    }

    function handleHashChange() {
        const hash = window.location.hash.substring(1);
        if (hash && sections.includes(hash)) {
            showSection(hash);
        }
    }

    function handleKeyboardNavigation(event) {
        // Only handle keyboard navigation when not in an input field
        if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA') {
            return;
        }

        switch (event.key) {
            case 'ArrowLeft':
                if (currentSection > 0) {
                    event.preventDefault();
                    navigatePage('prev');
                }
                break;
            case 'ArrowRight':
                if (currentSection < sections.length - 1) {
                    event.preventDefault();
                    navigatePage('next');
                }
                break;
            case 'Escape':
                closeMobileMenu();
                break;
            case '/':
                event.preventDefault();
                if (searchInput) {
                    searchInput.focus();
                }
                break;
        }
    }

    function handleResize() {
        // Close mobile menu on resize to desktop
        if (window.innerWidth >= 1024) {
            closeMobileMenu();
        }
    }

    // Utility functions
    function copyToClipboard(text) {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(text).then(function() {
                showToast('Copié dans le presse-papiers !');
            }).catch(function(err) {
                console.error('Erreur lors de la copie:', err);
                fallbackCopyTextToClipboard(text);
            });
        } else {
            fallbackCopyTextToClipboard(text);
        }
    }

    function fallbackCopyTextToClipboard(text) {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.top = '0';
        textArea.style.left = '0';
        textArea.style.width = '2em';
        textArea.style.height = '2em';
        textArea.style.padding = '0';
        textArea.style.border = 'none';
        textArea.style.outline = 'none';
        textArea.style.boxShadow = 'none';
        textArea.style.background = 'transparent';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
            document.execCommand('copy');
            showToast('Copié dans le presse-papiers !');
        } catch (err) {
            console.error('Erreur lors de la copie:', err);
        }
        
        document.body.removeChild(textArea);
    }

    function showToast(message) {
        // Remove existing toast
        const existingToast = document.getElementById('toast');
        if (existingToast) {
            existingToast.remove();
        }

        // Create toast element
        const toast = document.createElement('div');
        toast.id = 'toast';
        toast.className = 'fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50 transform translate-x-full transition-transform duration-300';
        toast.textContent = message;

        document.body.appendChild(toast);

        // Show toast
        setTimeout(() => {
            toast.classList.remove('translate-x-full');
        }, 100);

        // Hide toast after 3 seconds
        setTimeout(() => {
            toast.classList.add('translate-x-full');
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.parentNode.removeChild(toast);
                }
            }, 300);
        }, 3000);
    }

    // Global functions for onclick handlers
    window.showSection = showSection;
    window.navigatePage = navigatePage;
    window.closeMobileMenu = closeMobileMenu;
    window.copyToClipboard = copyToClipboard;

    // Initialize when DOM is loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Handle initial hash
    const initialHash = window.location.hash.substring(1);
    if (initialHash && sections.includes(initialHash)) {
        // Delay to ensure DOM is ready
        setTimeout(() => showSection(initialHash), 100);
    }

})();