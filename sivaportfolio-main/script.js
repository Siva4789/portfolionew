/**
 * SIVA P - AI FULLSTACK DEVELOPER PORTFOLIO
 * Main Interactive JavaScript Engine
 */

document.addEventListener('DOMContentLoaded', () => {
    // -------------------------------------------------------------------------
    // 1. Theme Switcher (Dark / Light Mode)
    // -------------------------------------------------------------------------
    const themeToggleBtn = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;

    // Load saved theme or default to dark
    const savedTheme = localStorage.getItem('siva_portfolio_theme') || 'dark';
    htmlElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = htmlElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            htmlElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('siva_portfolio_theme', newTheme);
            updateThemeIcon(newTheme);
            showToast(`Switched to ${newTheme.toUpperCase()} mode`, 'info');
        });
    }

    function updateThemeIcon(theme) {
        if (!themeToggleBtn) return;
        const icon = themeToggleBtn.querySelector('i');
        if (icon) {
            if (theme === 'light') {
                icon.className = 'fa-solid fa-sun';
            } else {
                icon.className = 'fa-solid fa-moon';
            }
        }
    }

    // -------------------------------------------------------------------------
    // 2. Navigation Bar & Mobile Menu
    // -------------------------------------------------------------------------
    const navbar = document.getElementById('navbar');
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Sticky Navbar Background on Scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        highlightActiveSection();
        handleBackToTopVisibility();
    });

    // Mobile Hamburger Toggle
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('open');
            mobileToggle.classList.toggle('active');
        });

        // Close mobile nav when clicking a link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('open');
                mobileToggle.classList.remove('active');
            });
        });

        // Close mobile nav on outside click
        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
                navMenu.classList.remove('open');
                mobileToggle.classList.remove('active');
            }
        });
    }

    // Highlight Active Section on Scroll
    const sections = document.querySelectorAll('section[id]');
    function highlightActiveSection() {
        const scrollY = window.pageYOffset;
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 120;
            const sectionId = section.getAttribute('id');
            const correspondingLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (correspondingLink) correspondingLink.classList.add('active');
            }
        });
    }

    // Smooth Scroll for Nav Links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 70;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // -------------------------------------------------------------------------
    // 3. Hero Typewriter Effect
    // -------------------------------------------------------------------------
    const typedTextElement = document.getElementById('typed-text');
    const roles = [
        'AI Fullstack Developer',
        'Java & Spring Boot Engineer',
        'FastAPI & Python Builder',
        'Database & REST API Specialist'
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function typeEffect() {
        if (!typedTextElement) return;

        const currentRole = roles[roleIndex];

        if (isDeleting) {
            typedTextElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typedTextElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 110;
        }

        if (!isDeleting && charIndex === currentRole.length) {
            isDeleting = true;
            typingSpeed = 1800; // Pause at end of word
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typingSpeed = 400; // Pause before typing next
        }

        setTimeout(typeEffect, typingSpeed);
    }

    setTimeout(typeEffect, 500);

    // -------------------------------------------------------------------------
    // 4. Skills Filtering Tabs
    // -------------------------------------------------------------------------
    const skillTabs = document.querySelectorAll('.skill-tab');
    const skillCards = document.querySelectorAll('.skill-card');

    skillTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            skillTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const filterValue = tab.getAttribute('data-filter');

            skillCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                if (filterValue === 'all' || cardCategory === filterValue) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 200);
                }
            });
        });
    });

    // -------------------------------------------------------------------------
    // 5. Projects Filtering
    // -------------------------------------------------------------------------
    const projectFilters = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    projectFilters.forEach(btn => {
        btn.addEventListener('click', () => {
            projectFilters.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    card.style.display = 'flex';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(15px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 200);
                }
            });
        });
    });

    // -------------------------------------------------------------------------
    // 6. Project Details Modals
    // -------------------------------------------------------------------------
    const modalTriggers = document.querySelectorAll('.modal-trigger');
    modalTriggers.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const modalId = btn.getAttribute('data-modal');
            openModal(modalId);
        });
    });

    // Close modal on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            document.querySelectorAll('.modal-backdrop.active').forEach(m => {
                m.classList.remove('active');
            });
        }
    });

    // Close modal on outside backdrop click
    document.querySelectorAll('.modal-backdrop').forEach(backdrop => {
        backdrop.addEventListener('click', (e) => {
            if (e.target === backdrop) {
                backdrop.classList.remove('active');
            }
        });
    });

    // -------------------------------------------------------------------------
    // 7. Contact Form Handling
    // -------------------------------------------------------------------------
    const contactForm = document.getElementById('portfolio-contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('form-name').value.trim();
            const email = document.getElementById('form-email').value.trim();
            const subject = document.getElementById('form-subject').value.trim();
            const message = document.getElementById('form-message').value.trim();

            if (!name || !email || !message) {
                showToast('Please fill in all required fields.', 'error');
                return;
            }

            // Simulate fast delivery feedback
            const submitBtn = document.getElementById('form-submit-btn');
            const originalContent = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;

            setTimeout(() => {
                submitBtn.innerHTML = originalContent;
                submitBtn.disabled = false;
                contactForm.reset();
                showToast(`Thank you, ${name}! Your message has been sent to Siva.`, 'success');
            }, 1000);
        });
    }

    // -------------------------------------------------------------------------
    // 8. Back to Top Button
    // -------------------------------------------------------------------------
    const backToTopBtn = document.getElementById('back-to-top');
    function handleBackToTopVisibility() {
        if (!backToTopBtn) return;
        if (window.scrollY > 350) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    }

    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});

// -------------------------------------------------------------------------
// Global Utility Functions
// -------------------------------------------------------------------------

/**
 * Open Modal
 */
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
    }
}

/**
 * Close Modal
 */
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
    }
}

/**
 * Copy to Clipboard with Toast Feedback
 */
function copyToClipboard(text, successMessage = 'Copied to clipboard!') {
    navigator.clipboard.writeText(text).then(() => {
        showToast(successMessage, 'success');
    }).catch(() => {
        // Fallback for older browsers
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        showToast(successMessage, 'success');
    });
}

/**
 * Modern Toast Notifications
 */
function showToast(message, type = 'success') {
    const toastContainer = document.getElementById('toast-container');
    if (!toastContainer) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    let iconClass = 'fa-solid fa-circle-check';
    if (type === 'error') iconClass = 'fa-solid fa-circle-exclamation';
    if (type === 'info') iconClass = 'fa-solid fa-circle-info';

    toast.innerHTML = `
        <i class="${iconClass}"></i>
        <span>${message}</span>
    `;

    toastContainer.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(100%)';
        toast.style.transition = 'all 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 3500);
}

// -------------------------------------------------------------------------
// 9. Interactive AI Assistant / Chatbot Engine
// -------------------------------------------------------------------------

function toggleChat() {
    const chatWindow = document.getElementById('chatbot-window');
    const chatTrigger = document.getElementById('chatbot-toggle-btn');
    if (!chatWindow) return;

    if (chatWindow.classList.contains('open')) {
        chatWindow.classList.remove('open');
    } else {
        chatWindow.classList.add('open');
        const input = document.getElementById('chat-input');
        if (input) setTimeout(() => input.focus(), 200);
    }
}

function sendChipMessage(text) {
    const chatInput = document.getElementById('chat-input');
    if (chatInput) {
        chatInput.value = text;
        sendMessage();
    }
}

function handleKeyPress(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

function sendMessage() {
    const chatInput = document.getElementById('chat-input');
    const chatMessages = document.getElementById('chatbot-messages');
    if (!chatInput || !chatMessages) return;

    const query = chatInput.value.trim();
    if (query === '') return;

    // Render User Message
    const userMsg = document.createElement('div');
    userMsg.className = 'chat-msg user-msg';
    userMsg.innerHTML = `
        <div class="msg-bubble">${escapeHtml(query)}</div>
        <span class="msg-time">Just now</span>
    `;
    chatMessages.appendChild(userMsg);
    chatInput.value = '';
    chatMessages.scrollTop = chatMessages.scrollHeight;

    // Show Typing Indicator
    const typingMsg = document.createElement('div');
    typingMsg.className = 'chat-msg bot-msg typing-indicator-msg';
    typingMsg.innerHTML = `
        <div class="msg-bubble"><i class="fa-solid fa-circle-notch fa-spin"></i> Siva's Assistant is typing...</div>
    `;
    chatMessages.appendChild(typingMsg);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    // Generate Contextual Response based on Siva's Resume
    setTimeout(() => {
        typingMsg.remove();
        const botResponse = generateAssistantResponse(query);
        const botMsg = document.createElement('div');
        botMsg.className = 'chat-msg bot-msg';
        botMsg.innerHTML = `
            <div class="msg-bubble">${botResponse}</div>
            <span class="msg-time">Just now</span>
        `;
        chatMessages.appendChild(botMsg);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 700);
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.innerText = text;
    return div.innerHTML;
}

/**
 * Smart Knowledge Engine about Siva P
 */
function generateAssistantResponse(input) {
    const q = input.toLowerCase();

    // Background / Bio / Education
    if (q.includes('who') || q.includes('about') || q.includes('background') || q.includes('bio') || q.includes('education') || q.includes('college') || q.includes('cgpa')) {
        return `<strong>Siva P</strong> is an <strong>AI Fullstack Developer</strong> currently completing his <strong>B.Tech in Information Technology</strong> at Dhirajlal Gandhi College of Technology (CGPA: <strong>7.84 / 10</strong>, 2022–2026). He did his schooling at Glazebrooke Matric Higher Secondary School (76%). He specializes in building robust, scalable web applications with Java, Spring Boot, Python, FastAPI, and React.js!`;
    }

    // Internship / Experience
    if (q.includes('intern') || q.includes('experience') || q.includes('work') || q.includes('springreen') || q.includes('company')) {
        return `Siva completed a <strong>Software Development Internship at Springreen</strong> (May 2026 – July 2026). He developed and integrated <strong>RESTful APIs</strong> using <strong>Python & FastAPI</strong>, managed <strong>MongoDB</strong> database operations, and built end-to-end communication channels with clean code standards in an agile team.`;
    }

    // Skills / Stack / Technologies
    if (q.includes('skill') || q.includes('stack') || q.includes('tech') || q.includes('java') || q.includes('python') || q.includes('react') || q.includes('database') || q.includes('spring')) {
        return `Here are Siva's core proficiencies:
        <br>• <strong>Languages:</strong> Java (Core, OOPs), Python (OOPs), JavaScript, HTML5/CSS3
        <br>• <strong>Frameworks & APIs:</strong> Spring Boot, FastAPI, React.js, JDBC, REST APIs
        <br>• <strong>Databases:</strong> MySQL, PostgreSQL, MongoDB
        <br>• <strong>Tools & AI:</strong> Maven, Git/GitHub, Cursor, Antigravity, Claude, ChatGPT, Gemini`;
    }

    // Projects
    if (q.includes('project') || q.includes('built') || q.includes('vijay') || q.includes('student') || q.includes('vidnotes') || q.includes('dark pattern')) {
        return `Siva has developed several impressive projects:
        <br>1. <strong>Automobile Consulting Website:</strong> Fullstack platform for Vijay Auto Consulting with React.js, Spring Boot & MySQL.
        <br>2. <strong>Student Management System:</strong> Java & JDBC CRUD application with MySQL & robust error handling.
        <br>3. <strong>VIDNOTESHUB:</strong> AI-powered video lecture summarizer and note generator.
        <br>4. <strong>Dark Patterns UX Shield:</strong> Anti-deceptive web transparency tool.`;
    }

    // Certifications
    if (q.includes('certificate') || q.includes('certif') || q.includes('nptel') || q.includes('infosys') || q.includes('linkedin')) {
        return `Siva holds 4 key certifications:
        <br>1. <strong>NPTEL:</strong> Python Programming
        <br>2. <strong>INFOSYS:</strong> Java Enterprise Fundamentals
        <br>3. <strong>LinkedIn:</strong> JDBC & SQL
        <br>4. <strong>Ethical Research:</strong> Dark Patterns & UX (2024)`;
    }

    // Contact / Phone / Email / Hire
    if (q.includes('contact') || q.includes('email') || q.includes('phone') || q.includes('hire') || q.includes('reach') || q.includes('location') || q.includes('salem')) {
        return `You can reach Siva directly at:
        <br>📧 <strong>Email:</strong> <a href="mailto:siva03286@gmail.com" style="color:var(--primary); text-decoration:underline;">siva03286@gmail.com</a>
        <br>📞 <strong>Phone:</strong> <a href="tel:+919655247872" style="color:var(--primary);">+91 9655247872</a>
        <br>💼 <strong>LinkedIn:</strong> <a href="https://www.linkedin.com/in/siva-p-s04" target="_blank" style="color:var(--primary);">in/siva-p-s04</a>
        <br>🐙 <strong>GitHub:</strong> <a href="https://github.com/Siva4789" target="_blank" style="color:var(--primary);">github.com/Siva4789</a>
        <br>📍 <strong>Location:</strong> Salem, Tamil Nadu, India`;
    }

    // Resume
    if (q.includes('resume') || q.includes('cv') || q.includes('pdf') || q.includes('download')) {
        return `You can download Siva's official resume right now by clicking <a href="SIVA P RESUME.pdf" download="Siva_P_Resume.pdf" style="color:var(--primary); font-weight:bold; text-decoration:underline;" target="_blank">here (Download PDF)</a>!`;
    }

    // Default friendly response
    return `Thank you for your message! Siva is an AI Fullstack Developer proficient in Java, Spring Boot, FastAPI, Python, React, and MongoDB. Would you like to know more about his <strong>projects</strong>, <strong>Springreen internship</strong>, or <strong>contact info</strong>?`;
}
