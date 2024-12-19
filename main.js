// main.js

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initLoader();
    initNavbar();
    initSmoothScroll();
    initFormValidation();
    initAnimations();
    initImageLoading();
});

// Loader functionality
function initLoader() {
    window.addEventListener('load', () => {
        const loader = document.querySelector('.loader');
        loader.classList.add('fade-out');
        setTimeout(() => {
            loader.style.display = 'none';
        }, 1000);
    });
}

// Navbar scroll effect
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu handling
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    navbarToggler.addEventListener('click', () => {
        navbarCollapse.classList.toggle('show');
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navbar.contains(e.target) && navbarCollapse.classList.contains('show')) {
            navbarCollapse.classList.remove('show');
        }
    });
}

// Smooth scroll functionality
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                // Close mobile menu after clicking
                document.querySelector('.navbar-collapse').classList.remove('show');
            }
        });
    });
}

// Form validation and handling
function initFormValidation() {
    const form = document.querySelector('form');
    const nameInput = form.querySelector('input[type="text"]');
    const emailInput = form.querySelector('input[type="email"]');
    const messageInput = form.querySelector('textarea');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Reset previous error states
        resetErrors();

        // Validate inputs
        let isValid = true;
        
        if (!validateField(nameInput, 'Name is required')) {
            isValid = false;
        }
        
        if (!validateEmail(emailInput)) {
            isValid = false;
        }
        
        if (!validateField(messageInput, 'Message is required')) {
            isValid = false;
        }

        if (isValid) {
            // Simulate form submission
            submitForm({
                name: nameInput.value,
                email: emailInput.value,
                message: messageInput.value
            });
        }
    });
}

// Animation handling
function initAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                // Stagger child animations if any
                entry.target.querySelectorAll('.animate-child').forEach((child, index) => {
                    setTimeout(() => {
                        child.classList.add('animate');
                    }, index * 100);
                });
            }
        });
    }, { threshold: 0.1 });

    // Observe sections and cards
    document.querySelectorAll('section, .card').forEach(element => {
        observer.observe(element);
    });
}

// Image loading handling
function initImageLoading() {
    document.querySelectorAll('img').forEach(img => {
        if (img.complete) {
            imgLoaded(img);
        } else {
            img.addEventListener('load', () => imgLoaded(img));
        }
        img.addEventListener('error', () => imgError(img));
    });
}

// Helper functions
function validateField(field, errorMessage) {
    if (!field.value.trim()) {
        showError(field, errorMessage);
        return false;
    }
    return true;
}

function validateEmail(emailField) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailField.value.trim() || !emailRegex.test(emailField.value)) {
        showError(emailField, 'Please enter a valid email address');
        return false;
    }
    return true;
}

function showError(field, message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    field.classList.add('error');
    field.parentNode.appendChild(errorDiv);
}

function resetErrors() {
    document.querySelectorAll('.error-message').forEach(error => error.remove());
    document.querySelectorAll('.error').forEach(field => field.classList.remove('error'));
}

function imgLoaded(img) {
    img.classList.add('loaded');
}

function imgError(img) {
    img.src = 'path/to/fallback-image.jpg'; // Add a fallback image
    console.log('Image failed to load:', img.src);
}

async function submitForm(data) {
    try {
        // Show loading state
        const submitButton = document.querySelector('form button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Success handling
        showSuccessMessage('Thank you for your message. We will contact you soon!');
        document.querySelector('form').reset();

    } catch (error) {
        showError(document.querySelector('form'), 'Failed to send message. Please try again.');
        console.error('Form submission error:', error);
    } finally {
        // Reset button state
        submitButton.disabled = false;
        submitButton.textContent = originalText;
    }
}

function showSuccessMessage(message) {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.textContent = message;
    document.querySelector('form').appendChild(successDiv);
    setTimeout(() => successDiv.remove(), 5000);
}

// Add to your CSS (styles_new.css)
const styles = `
    .error-message {
        color: #dc3545;
        font-size: 0.875rem;
        margin-top: 0.25rem;
    }

    .success-message {
        color: #198754;
        padding: 1rem;
        margin-top: 1rem;
        background-color: #d1e7dd;
        border-radius: 0.25rem;
        text-align: center;
    }

    .error {
        border-color: #dc3545 !important;
    }

    .loaded {
        animation: fadeIn 0.5s ease;
    }
`;

// Add styles to document
const styleSheet = document.createElement('style');
styleSheet.textContent = styles;
document.head.appendChild(styleSheet);
