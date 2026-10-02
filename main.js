// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {

    /* --- Dynamic Portfolio Renderer --- */
    function renderPortfolio() {
        if (!window.PortfolioStore) return;
        const data = window.PortfolioStore.get();
        if (!data) return;

        // 1. Hero Section
        if (data.hero) {
            const eyebrowEl = document.querySelector('.hero-content .eyebrow');
            if (eyebrowEl && data.hero.welcome) eyebrowEl.textContent = data.hero.welcome;

            const nameEl = document.querySelector('.hero-content h1');
            if (nameEl && data.hero.name) nameEl.textContent = data.hero.name;

            const taglineEl = document.querySelector('.hero-content p');
            if (taglineEl && data.hero.tagline) taglineEl.textContent = data.hero.tagline;

            const profileImgEl = document.getElementById('profileImage');
            if (profileImgEl && data.hero.profileImage) profileImgEl.src = data.hero.profileImage;

            const locBadgeTextEl = document.getElementById('heroLocationText') || document.getElementById('heroLocationBadge');
            if (locBadgeTextEl && data.hero.locationBadge) locBadgeTextEl.textContent = data.hero.locationBadge;

            const cvBtn = document.querySelector('.cta-group a[download]');
            if (cvBtn && data.hero.cvFile) cvBtn.setAttribute('href', data.hero.cvFile);

            const talkBtn = document.querySelector('.cta-group a[href="#contact"]');
            if (talkBtn && data.hero.contactText) talkBtn.textContent = data.hero.contactText;
        }

        // 2. About Section
        if (data.about) {
            const bioEl = document.querySelector('.about-text p');
            if (bioEl && data.about.bio) bioEl.textContent = data.about.bio;

            if (data.about.stats && Array.isArray(data.about.stats)) {
                const statsContainer = document.querySelector('.stats');
                if (statsContainer) {
                    statsContainer.innerHTML = data.about.stats.map(s => `
                        <div class="stat-item">
                            <h3>${escapeHTML(s.number)}</h3>
                            <p>${escapeHTML(s.label)}</p>
                        </div>
                    `).join('');
                }
            }

            if (data.about.terminal) {
                const terminalOutputs = document.querySelectorAll('.terminal-body .output');
                if (terminalOutputs[0] && data.about.terminal.whoami) terminalOutputs[0].textContent = data.about.terminal.whoami;
                if (terminalOutputs[1] && data.about.terminal.interests) terminalOutputs[1].textContent = data.about.terminal.interests;
                if (terminalOutputs[2] && data.about.terminal.status) terminalOutputs[2].textContent = data.about.terminal.status;
            }
        }

        // 3. Education Section
        if (data.education && Array.isArray(data.education)) {
            const eduTimeline = document.querySelector('.education-timeline');
            if (eduTimeline) {
                eduTimeline.innerHTML = data.education.map(item => `
                    <div class="timeline-item glass-panel">
                        <div class="timeline-dot"></div>
                        <div class="timeline-date">${escapeHTML(item.date)}</div>
                        <div class="timeline-content">
                            <h3>${escapeHTML(item.title)}</h3>
                            <h4>${escapeHTML(item.subtitle)}</h4>
                            <p>${escapeHTML(item.description)}</p>
                        </div>
                    </div>
                `).join('');
            }
        }

        // 4. Training Section
        if (data.training && Array.isArray(data.training)) {
            const trainingGrid = document.querySelector('.training-grid');
            if (trainingGrid) {
                trainingGrid.innerHTML = data.training.map(item => `
                    <div class="training-card glass-panel">
                        <div class="training-icon">${escapeHTML(item.icon || '🎓')}</div>
                        <div class="training-content">
                            <div class="training-date">${escapeHTML(item.date)}</div>
                            <h3>${escapeHTML(item.title)}</h3>
                            <h4>${escapeHTML(item.subtitle)}</h4>
                            <p>${escapeHTML(item.description)}</p>
                            <div class="skill-tags">
                                ${(item.tags || []).map(tag => `<span>${escapeHTML(tag)}</span>`).join('')}
                            </div>
                        </div>
                    </div>
                `).join('');
            }
        }

        // 5. Skills Section
        if (data.skills && Array.isArray(data.skills)) {
            const skillsGrid = document.querySelector('.skills-grid');
            if (skillsGrid) {
                skillsGrid.innerHTML = data.skills.map(cat => {
                    const normalTags = (cat.tags || []).map(t => `<span>${escapeHTML(t)}</span>`).join('');
                    const highlightTags = (cat.highlights || []).map(t => `<span class="highlight">${escapeHTML(t)}</span>`).join('');
                    return `
                        <div class="skill-category glass-panel">
                            <h3>${escapeHTML(cat.title)}</h3>
                            <div class="skill-tags">
                                ${highlightTags}
                                ${normalTags}
                            </div>
                        </div>
                    `;
                }).join('');
            }
        }

        // 6. Projects Section
        if (data.projects && Array.isArray(data.projects)) {
            const projectGrid = document.querySelector('.project-grid');
            if (projectGrid) {
                projectGrid.innerHTML = data.projects.map(proj => `
                    <div class="project-card glass-panel">
                        <div class="project-image">
                            <img src="${escapeHTML(proj.image || 'my-profile-photo.jpeg')}" alt="${escapeHTML(proj.title)}">
                        </div>
                        <div class="project-content">
                            <span class="project-type">${escapeHTML(proj.type)}</span>
                            <h3>${escapeHTML(proj.title)}</h3>
                            <p>${escapeHTML(proj.description)}</p>
                            <div class="project-tech">
                                ${(proj.tech || []).map(t => `<span>${escapeHTML(t)}</span>`).join('')}
                            </div>
                            <div class="project-links">
                                ${proj.liveUrl ? `<a href="${escapeHTML(proj.liveUrl)}" target="_blank" rel="noopener noreferrer" class="link-btn">View Analysis ↗</a>` : ''}
                                ${proj.githubUrl ? `<a href="${escapeHTML(proj.githubUrl)}" target="_blank" rel="noopener noreferrer" class="link-btn outline">GitHub Source</a>` : ''}
                            </div>
                        </div>
                    </div>
                `).join('');
            }
        }

        // 7. Achievements Section
        if (data.achievements && Array.isArray(data.achievements)) {
            const achievementsList = document.querySelector('.achievements-list');
            if (achievementsList) {
                achievementsList.innerHTML = data.achievements.map(ach => `
                    <div class="achievement-card glass-panel">
                        <div class="achievement-badge">${escapeHTML(ach.badge || '🏆')}</div>
                        <div class="achievement-content">
                            <div class="achievement-date">${escapeHTML(ach.date)}</div>
                            <h3>${escapeHTML(ach.title)}</h3>
                            <p>${escapeHTML(ach.description)}</p>
                        </div>
                    </div>
                `).join('');
            }
        }

        // 8. Certificates Section
        if (data.certificates && Array.isArray(data.certificates)) {
            const certificatesGrid = document.querySelector('.certificates-grid');
            if (certificatesGrid) {
                certificatesGrid.innerHTML = data.certificates.map(cert => `
                    <div class="certificate-card glass-panel">
                        <div class="cert-icon"><img src="${escapeHTML(cert.logo || 'cipherschool.png')}" alt="${escapeHTML(cert.issuer)} Logo"></div>
                        <div class="certificate-content">
                            <div class="certificate-year">${escapeHTML(cert.date)}</div>
                            <h3>${escapeHTML(cert.title)}</h3>
                            <p><i>${escapeHTML(cert.issuer)}</i></p>
                            <div style="display: flex; gap: 1rem; flex-wrap: wrap; margin-top: 1rem;">
                                ${cert.pdfUrl ? `<a href="${escapeHTML(cert.pdfUrl)}" target="_blank" class="link-btn">View Certificate ↗</a>` : ''}
                                ${cert.verifyUrl ? `<a href="${escapeHTML(cert.verifyUrl)}" target="_blank" class="link-btn outline">Link ↗</a>` : ''}
                            </div>
                        </div>
                    </div>
                `).join('');
            }
        }

        // 9. Contact Section
        if (data.contact) {
            const contactHeader = document.querySelector('.contact-info h3');
            if (contactHeader && data.contact.talkHeader) contactHeader.textContent = data.contact.talkHeader;

            const contactSubtext = document.querySelector('.contact-info p');
            if (contactSubtext && data.contact.talkSubtext) contactSubtext.textContent = data.contact.talkSubtext;

            const emailLink = document.querySelector('.contact-item a[href^="mailto:"]');
            if (emailLink && data.contact.email) {
                emailLink.setAttribute('href', `mailto:${data.contact.email}`);
                emailLink.textContent = data.contact.email;
            }

            const locationText = document.querySelector('.contact-item div p');
            if (locationText && data.contact.location) locationText.textContent = data.contact.location;

            const socialLinks = document.querySelectorAll('.social-links a');
            if (socialLinks[0] && data.contact.github) socialLinks[0].setAttribute('href', data.contact.github);
            if (socialLinks[1] && data.contact.linkedin) socialLinks[1].setAttribute('href', data.contact.linkedin);
            if (socialLinks[2] && data.contact.leetcode) socialLinks[2].setAttribute('href', data.contact.leetcode);

            const formspreeForm = document.getElementById('contactForm');
            if (formspreeForm && data.contact.formspreeUrl) formspreeForm.setAttribute('action', data.contact.formspreeUrl);
        }
    }

    function escapeHTML(str) {
        if (!str) return '';
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }

    // Run dynamic render before observers setup
    renderPortfolio();

    /* --- Custom Cursor Glow --- */
    const cursorGlow = document.querySelector('.cursor-glow');
    
    // Update cursor position
    document.addEventListener('mousemove', (e) => {
        requestAnimationFrame(() => {
            if (cursorGlow) {
                cursorGlow.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
            }
        });
    });

    // Fade out glow when leaving window
    document.addEventListener('mouseleave', () => {
        if (cursorGlow) cursorGlow.style.opacity = '0';
    });
    
    document.addEventListener('mouseenter', () => {
        if (cursorGlow) cursorGlow.style.opacity = '1';
    });


    /* --- Scroll Reveal Animations --- */
    const revealElements = document.querySelectorAll('.reveal');

    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });


    /* --- Navbar Scroll Effect --- */
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    if (navbar) {
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;

            if (currentScroll > 50) {
                navbar.style.background = 'rgba(5, 5, 5, 0.85)';
                navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.3)';
            } else {
                navbar.style.background = 'rgba(5, 5, 5, 0.7)';
                navbar.style.boxShadow = 'none';
            }

            if (currentScroll <= 0) {
                navbar.classList.remove('hidden');
            } else if (currentScroll > lastScroll && currentScroll > 100) {
                navbar.classList.add('hidden');
            } else {
                navbar.classList.remove('hidden');
            }

            lastScroll = currentScroll;
        });
    }


    /* --- Smooth Scrolling for Navigation Links --- */
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"], .cta-group a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const navHeight = document.querySelector('.navbar') ? document.querySelector('.navbar').offsetHeight : 0;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    /* --- Theme Toggle --- */
    const themeToggleBtn = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;
    const sunIcon = document.querySelector('.sun-icon');
    const moonIcon = document.querySelector('.moon-icon');

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        htmlElement.setAttribute('data-theme', 'light');
        htmlElement.classList.remove('dark');
        if (sunIcon) sunIcon.style.display = 'none';
        if (moonIcon) moonIcon.style.display = 'block';
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = htmlElement.getAttribute('data-theme');
            if (currentTheme === 'light') {
                htmlElement.removeAttribute('data-theme');
                htmlElement.classList.add('dark');
                localStorage.setItem('theme', 'dark');
                if (sunIcon) sunIcon.style.display = 'block';
                if (moonIcon) moonIcon.style.display = 'none';
            } else {
                htmlElement.setAttribute('data-theme', 'light');
                htmlElement.classList.remove('dark');
                localStorage.setItem('theme', 'light');
                if (sunIcon) sunIcon.style.display = 'none';
                if (moonIcon) moonIcon.style.display = 'block';
            }
        });
    }

    /* --- Contact Form Handling (Formspree) --- */
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');
    const submitBtn = document.getElementById('submitBtn');

    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const action = contactForm.getAttribute('action');
            if (action && action.includes('your-id-here')) {
                alert('Action Required: Please replace "your-id-here" in index.html with your actual Formspree ID!');
                return;
            }

            const formData = new FormData(contactForm);
            
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            if(formStatus) {
                formStatus.className = 'info';
                formStatus.style.display = 'block';
                formStatus.textContent = 'Sending your message...';
            }

            try {
                const response = await fetch(action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                
                if (response.ok) {
                    if(formStatus) {
                        formStatus.className = 'success';
                        formStatus.textContent = "Message sent successfully! 🚀";
                    }
                    contactForm.reset();
                } else {
                    const data = await response.json();
                    if(formStatus) {
                        formStatus.className = 'error';
                        formStatus.textContent = data.errors ? data.errors.map(error => error.message).join(", ") : "Oops! There was a problem.";
                    }
                }
            } catch (error) {
                if(formStatus) {
                    formStatus.className = 'error';
                    formStatus.textContent = "Error sending message. Please check your connection.";
                }
            } finally {
                submitBtn.textContent = 'Send Message 🚀';
                submitBtn.disabled = false;
                
                if(formStatus) {
                    setTimeout(() => {
                        formStatus.style.display = 'none';
                    }, 5000);
                }
            }
        });
    }

});

