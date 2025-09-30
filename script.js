// Mock data for suggestions
const mockSuggestions = [
    {
        songs: [
            { title: "Weightless", artist: "Marconi Union", mood: "Peaceful" },
            { title: "Clair de Lune", artist: "Claude Debussy", mood: "Serene" },
            { title: "River", artist: "Joni Mitchell", mood: "Contemplative" },
            { title: "Mad World", artist: "Gary Jules", mood: "Melancholic" }
        ],
        quotes: [
            { text: "The quieter you become, the more you are able to hear.", author: "Rumi", theme: "Mindfulness" },
            { text: "In every walk with nature, one receives far more than they seek.", author: "John Muir", theme: "Nature" },
            { text: "Peace comes from within. Do not seek it without.", author: "Buddha", theme: "Inner Peace" },
            { text: "The present moment is the only time over which we have dominion.", author: "Thich Nhat Hanh", theme: "Presence" }
        ]
    },
    {
        songs: [
            { title: "Happy", artist: "Pharrell Williams", mood: "Joyful" },
            { title: "Good as Hell", artist: "Lizzo", mood: "Uplifting" },
            { title: "Walking on Sunshine", artist: "Katrina and the Waves", mood: "Energetic" },
            { title: "Can't Stop the Feeling", artist: "Justin Timberlake", mood: "Vibrant" }
        ],
        quotes: [
            { text: "Happiness is not something ready-made. It comes from your own actions.", author: "Dalai Lama", theme: "Joy" },
            { text: "The purpose of our lives is to be happy.", author: "Dalai Lama", theme: "Purpose" },
            { text: "Life is what happens to you while you're busy making other plans.", author: "John Lennon", theme: "Living" },
            { text: "Be yourself; everyone else is already taken.", author: "Oscar Wilde", theme: "Authenticity" }
        ]
    },
    {
        songs: [
            { title: "Bohemian Rhapsody", artist: "Queen", mood: "Epic" },
            { title: "Thunderstruck", artist: "AC/DC", mood: "Powerful" },
            { title: "Eye of the Tiger", artist: "Survivor", mood: "Motivational" },
            { title: "We Will Rock You", artist: "Queen", mood: "Energizing" }
        ],
        quotes: [
            { text: "The only way to do great work is to love what you do.", author: "Steve Jobs", theme: "Passion" },
            { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill", theme: "Perseverance" },
            { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt", theme: "Confidence" },
            { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt", theme: "Dreams" }
        ]
    }
];

// DOM elements
const uploadArea = document.getElementById('upload-area');
const fileInput = document.getElementById('file-input');
const resultsContainer = document.getElementById('results-container');
const previewImage = document.getElementById('preview-image');
const resetBtn = document.getElementById('reset-btn');
const loading = document.getElementById('loading');
const suggestions = document.getElementById('suggestions');
const songsGrid = document.getElementById('songs-grid');
const quotesGrid = document.getElementById('quotes-grid');

// Auth elements
const loginBtn = document.getElementById('login-btn');
const registerBtn = document.getElementById('register-btn');
const loginModal = document.getElementById('login-modal');
const registerModal = document.getElementById('register-modal');
const loginClose = document.getElementById('login-close');
const registerClose = document.getElementById('register-close');
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const switchToRegister = document.getElementById('switch-to-register');
const switchToLogin = document.getElementById('switch-to-login');
const authButtons = document.querySelector('.auth-buttons');
const userMenu = document.getElementById('user-menu');
const userName = document.getElementById('user-name');
const logoutBtn = document.getElementById('logout-btn');

// Auth state
let currentUser = null;

// Event listeners
uploadArea.addEventListener('click', () => fileInput.click());
uploadArea.addEventListener('dragover', handleDragOver);
uploadArea.addEventListener('dragleave', handleDragLeave);
uploadArea.addEventListener('drop', handleDrop);
fileInput.addEventListener('change', handleFileSelect);
resetBtn.addEventListener('click', resetUpload);

// Auth event listeners
loginBtn.addEventListener('click', () => showModal(loginModal));
registerBtn.addEventListener('click', () => showModal(registerModal));
loginClose.addEventListener('click', () => hideModal(loginModal));
registerClose.addEventListener('click', () => hideModal(registerModal));
switchToRegister.addEventListener('click', () => switchModal(loginModal, registerModal));
switchToLogin.addEventListener('click', () => switchModal(registerModal, loginModal));
loginForm.addEventListener('submit', handleLogin);
registerForm.addEventListener('submit', handleRegister);
logoutBtn.addEventListener('click', handleLogout);

// Close modals when clicking overlay
loginModal.addEventListener('click', (e) => {
    if (e.target === loginModal || e.target.classList.contains('modal-overlay')) {
        hideModal(loginModal);
    }
});

registerModal.addEventListener('click', (e) => {
    if (e.target === registerModal || e.target.classList.contains('modal-overlay')) {
        hideModal(registerModal);
    }
});

// Auth functions
function showModal(modal) {
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function hideModal(modal) {
    modal.classList.add('hidden');
    document.body.style.overflow = '';
}

function switchModal(fromModal, toModal) {
    hideModal(fromModal);
    setTimeout(() => showModal(toModal), 150);
}

function handleLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    
    // Simulate login process
    if (email && password) {
        // Mock successful login
        currentUser = {
            name: email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1),
            email: email
        };
        
        updateAuthState();
        hideModal(loginModal);
        
        // Show success message
        showNotification('Welcome back! You\'re now logged in.', 'success');
        
        // Reset form
        loginForm.reset();
    }
}

function handleRegister(e) {
    e.preventDefault();
    
    const name = document.getElementById('register-name').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    const confirmPassword = document.getElementById('register-confirm').value;
    
    // Basic validation
    if (password !== confirmPassword) {
        showNotification('Passwords do not match!', 'error');
        return;
    }
    
    if (name && email && password) {
        // Mock successful registration
        currentUser = {
            name: name,
            email: email
        };
        
        updateAuthState();
        hideModal(registerModal);
        
        // Show success message
        showNotification('Account created successfully! Welcome to MoodSync.', 'success');
        
        // Reset form
        registerForm.reset();
    }
}

function handleLogout() {
    currentUser = null;
    updateAuthState();
    showNotification('You\'ve been logged out successfully.', 'success');
}

function updateAuthState() {
    if (currentUser) {
        authButtons.classList.add('hidden');
        userMenu.classList.remove('hidden');
        userName.textContent = currentUser.name;
    } else {
        authButtons.classList.remove('hidden');
        userMenu.classList.add('hidden');
    }
}

function showNotification(message, type = 'success') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span>${message}</span>
            <button class="notification-close">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="18" y1="6" x2="6" y2="18"/>
                    <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
            </button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 2rem;
        right: 2rem;
        background: ${type === 'success' ? '#10b981' : '#ef4444'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        z-index: 1001;
        animation: slideInRight 0.3s ease-out;
        max-width: 300px;
    `;
    
    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                opacity: 0;
                transform: translateX(100%);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        .notification-content {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 1rem;
        }
        .notification-close {
            background: none;
            border: none;
            color: white;
            cursor: pointer;
            padding: 0.25rem;
            border-radius: 0.25rem;
            transition: background-color 0.2s ease;
        }
        .notification-close:hover {
            background: rgba(255, 255, 255, 0.2);
        }
        .notification-close svg {
            width: 1rem;
            height: 1rem;
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(notification);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.remove();
        style.remove();
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
            style.remove();
        }
    }, 5000);
}

// Drag and drop handlers
function handleDragOver(e) {
    e.preventDefault();
    uploadArea.classList.add('dragover');
}

function handleDragLeave(e) {
    e.preventDefault();
    uploadArea.classList.remove('dragover');
}

function handleDrop(e) {
    e.preventDefault();
    uploadArea.classList.remove('dragover');
    
    const files = e.dataTransfer.files;
    if (files.length > 0 && files[0].type.startsWith('image/')) {
        processImage(files[0]);
    }
}

// File selection handler
function handleFileSelect(e) {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
        processImage(file);
    }
}

// Process uploaded image
function processImage(file) {
    const reader = new FileReader();
    reader.onload = function(e) {
        previewImage.src = e.target.result;
        showResults();
        analyzeImage();
    };
    reader.readAsDataURL(file);
}

// Show results container
function showResults() {
    uploadArea.style.display = 'none';
    resultsContainer.classList.remove('hidden');
    loading.classList.remove('hidden');
    suggestions.classList.add('hidden');
}

// Simulate image analysis
function analyzeImage() {
    // Simulate AI processing time
    setTimeout(() => {
        const randomIndex = Math.floor(Math.random() * mockSuggestions.length);
        const selectedSuggestions = mockSuggestions[randomIndex];
        
        displaySuggestions(selectedSuggestions);
        
        loading.classList.add('hidden');
        suggestions.classList.remove('hidden');
    }, 2500);
}

// Display suggestions
function displaySuggestions(data) {
    // Clear previous suggestions
    songsGrid.innerHTML = '';
    quotesGrid.innerHTML = '';
    
    // Display songs
    data.songs.forEach(song => {
        const songCard = createSongCard(song);
        songsGrid.appendChild(songCard);
    });
    
    // Display quotes
    data.quotes.forEach(quote => {
        const quoteCard = createQuoteCard(quote);
        quotesGrid.appendChild(quoteCard);
    });
    
    // Add stagger animation
    animateCards();
}

// Create song card
function createSongCard(song) {
    const card = document.createElement('div');
    card.className = 'song-card';
    card.innerHTML = `
        <div class="song-title">${song.title}</div>
        <div class="song-artist">${song.artist}</div>
        <span class="tag">${song.mood}</span>
    `;
    return card;
}

// Create quote card
function createQuoteCard(quote) {
    const card = document.createElement('div');
    card.className = 'quote-card';
    card.innerHTML = `
        <div class="quote-text">"${quote.text}"</div>
        <div class="quote-author">— ${quote.author}</div>
        <span class="tag">${quote.theme}</span>
    `;
    return card;
}

// Animate cards with stagger effect
function animateCards() {
    const cards = document.querySelectorAll('.song-card, .quote-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// Reset upload
function resetUpload() {
    uploadArea.style.display = 'block';
    resultsContainer.classList.add('hidden');
    loading.classList.add('hidden');
    suggestions.classList.add('hidden');
    fileInput.value = '';
    previewImage.src = '';
    songsGrid.innerHTML = '';
    quotesGrid.innerHTML = '';
}

// Add smooth scrolling for better UX
function smoothScrollTo(element) {
    element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

// Add click handlers for cards (optional enhancement)
document.addEventListener('click', function(e) {
    if (e.target.closest('.song-card')) {
        const card = e.target.closest('.song-card');
        const title = card.querySelector('.song-title').textContent;
        const artist = card.querySelector('.song-artist').textContent;
        
        // You could integrate with music services here
        console.log(`Playing: ${title} by ${artist}`);
        
        // Add visual feedback
        card.style.transform = 'scale(0.98)';
        setTimeout(() => {
            card.style.transform = 'scale(1)';
        }, 150);
    }
    
    if (e.target.closest('.quote-card')) {
        const card = e.target.closest('.quote-card');
        const quote = card.querySelector('.quote-text').textContent;
        
        // You could add sharing functionality here
        console.log(`Selected quote: ${quote}`);
        
        // Add visual feedback
        card.style.transform = 'scale(0.98)';
        setTimeout(() => {
            card.style.transform = 'scale(1)';
        }, 150);
    }
});

// Add keyboard accessibility
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && !resultsContainer.classList.contains('hidden')) {
        resetUpload();
    }
    
    // Close modals with Escape key
    if (e.key === 'Escape') {
        if (!loginModal.classList.contains('hidden')) {
            hideModal(loginModal);
        }
        if (!registerModal.classList.contains('hidden')) {
            hideModal(registerModal);
        }
    }
});

// Add loading animation variety
function updateLoadingText() {
    const loadingTexts = [
        "Analyzing your image...",
        "Detecting mood and colors...",
        "Finding perfect matches...",
        "Curating suggestions..."
    ];
    
    let currentIndex = 0;
    const loadingTextElement = document.querySelector('.loading-text');
    
    const interval = setInterval(() => {
        if (loading.classList.contains('hidden')) {
            clearInterval(interval);
            return;
        }
        
        currentIndex = (currentIndex + 1) % loadingTexts.length;
        loadingTextElement.textContent = loadingTexts[currentIndex];
    }, 800);
}

// Initialize loading text animation when analysis starts
const originalAnalyzeImage = analyzeImage;
analyzeImage = function() {
    updateLoadingText();
    originalAnalyzeImage();
};
// Initialize auth state on page load
document.addEventListener('DOMContentLoaded', function() {
    updateAuthState();
});