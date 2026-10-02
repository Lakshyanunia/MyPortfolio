/**
 * Portfolio Admin Dashboard Logic
 */

document.addEventListener('DOMContentLoaded', () => {

    let portfolioData = window.PortfolioStore ? window.PortfolioStore.get() : {};

    // DOM Elements
    const pinModal = document.getElementById('pinModal');
    const pinForm = document.getElementById('pinForm');
    const usernameInput = document.getElementById('usernameInput');
    const passwordInput = document.getElementById('passwordInput');
    const pinError = document.getElementById('pinError');
    const adminApp = document.getElementById('adminApp');
    const lockBtn = document.getElementById('lockBtn');
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    const saveAllBtn = document.getElementById('saveAllBtn');
    const toastContainer = document.getElementById('toastContainer');

    /* --- 1. Admin Authentication --- */
    function checkAuth() {
        const isAuth = sessionStorage.getItem('portfolio_admin_auth');
        if (isAuth === 'true') {
            if (pinModal) pinModal.classList.add('hidden');
            if (adminApp) adminApp.classList.remove('hidden');
            initDashboard();
        } else {
            if (pinModal) pinModal.classList.remove('hidden');
            if (adminApp) adminApp.classList.add('hidden');
            setTimeout(() => usernameInput && usernameInput.focus(), 100);
        }
    }

    if (pinForm) {
        pinForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const inputUser = usernameInput ? usernameInput.value.trim() : '';
            const inputPass = passwordInput ? passwordInput.value.trim() : '';
            const validUser = portfolioData.adminUsername || 'lakshyanunia';
            const validPass = portfolioData.adminPassword || portfolioData.adminPin || 'lucky7742';

            if (inputUser === validUser && inputPass === validPass) {
                sessionStorage.setItem('portfolio_admin_auth', 'true');
                if (pinError) pinError.style.display = 'none';
                if (usernameInput) usernameInput.value = '';
                if (passwordInput) passwordInput.value = '';
                checkAuth();
                showToast('Authentication successful! Welcome to Admin Dashboard.', 'success');
            } else {
                if (pinError) pinError.style.display = 'block';
                if (passwordInput) passwordInput.value = '';
                if (passwordInput) passwordInput.focus();
            }
        });
    }

    if (lockBtn) {
        lockBtn.addEventListener('click', () => {
            sessionStorage.removeItem('portfolio_admin_auth');
            checkAuth();
            showToast('Editor locked.', 'info');
        });
    }

    /* --- 2. Theme Toggle --- */
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const html = document.documentElement;
            if (html.getAttribute('data-theme') === 'light') {
                html.removeAttribute('data-theme');
                html.classList.add('dark');
                localStorage.setItem('theme', 'dark');
            } else {
                html.setAttribute('data-theme', 'light');
                html.classList.remove('dark');
                localStorage.setItem('theme', 'light');
            }
        });
    }

    /* --- 3. Tab Switching --- */
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            tabPanes.forEach(p => p.classList.remove('active'));

            btn.classList.add('active');
            const targetId = btn.getAttribute('data-tab');
            const targetPane = document.getElementById(targetId);
            if (targetPane) targetPane.classList.add('active');
        });
    });

    /* --- 4. Dashboard Initialization & Form Loading --- */
    function initDashboard() {
        portfolioData = window.PortfolioStore.get();
        loadHeroTab();
        loadAboutTab();
        loadEducationTab();
        loadTrainingTab();
        loadSkillsTab();
        loadProjectsTab();
        loadAchievementsTab();
        loadCertificatesTab();
        loadContactTab();
    }

    // Toast Notification Utility
    function showToast(msg, type = 'success') {
        if (!toastContainer) return;
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.innerHTML = `<span>${type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️'}</span> ${msg}`;
        toastContainer.appendChild(toast);
        setTimeout(() => {
            toast.style.opacity = '0';
            setTimeout(() => toast.remove(), 300);
        }, 3500);
    }

    /* --- 5. Hero Section Handler --- */
    function loadHeroTab() {
        const h = portfolioData.hero || {};
        const welcomeEl = document.getElementById('heroWelcome');
        const nameEl = document.getElementById('heroName');
        const taglineEl = document.getElementById('heroTagline');
        const profileImgEl = document.getElementById('heroProfileImg');
        const locInputEl = document.getElementById('heroLocationInput');
        const cvFileEl = document.getElementById('heroCvFile');
        const contactTextEl = document.getElementById('heroContactText');

        if (welcomeEl) welcomeEl.value = h.welcome || '';
        if (nameEl) nameEl.value = h.name || '';
        if (taglineEl) taglineEl.value = h.tagline || '';
        if (profileImgEl) profileImgEl.value = h.profileImage || '';
        if (locInputEl) locInputEl.value = h.locationBadge || 'Based in - INDIA';
        if (cvFileEl) cvFileEl.value = h.cvFile || '';
        if (contactTextEl) contactTextEl.value = h.contactText || '';

        const imgPrev = document.getElementById('heroImgPreview');
        if (imgPrev) imgPrev.src = h.profileImage || 'my-profile-photo.jpeg';

        if (profileImgEl) {
            profileImgEl.oninput = (e) => {
                if (imgPrev) imgPrev.src = e.target.value.trim() || 'my-profile-photo.jpeg';
            };
        }
    }

    function saveHeroTab() {
        portfolioData.hero = {
            welcome: (document.getElementById('heroWelcome')?.value || '').trim(),
            name: (document.getElementById('heroName')?.value || '').trim(),
            tagline: (document.getElementById('heroTagline')?.value || '').trim(),
            profileImage: (document.getElementById('heroProfileImg')?.value || '').trim(),
            locationBadge: (document.getElementById('heroLocationInput')?.value || '').trim(),
            cvFile: (document.getElementById('heroCvFile')?.value || '').trim(),
            contactText: (document.getElementById('heroContactText')?.value || '').trim()
        };
    }

    /* --- 6. About Section Handler --- */
    function loadAboutTab() {
        const a = portfolioData.about || {};
        const bioEl = document.getElementById('aboutBio');
        if (bioEl) bioEl.value = a.bio || '';

        const statsList = document.getElementById('statsList');
        const stats = a.stats || [];
        if (statsList) {
            statsList.innerHTML = stats.map((s, idx) => `
                <div class="item-card" data-stat-idx="${idx}">
                    <div class="form-row">
                        <div class="form-group">
                            <label>Stat Number/Heading</label>
                            <input type="text" class="form-control stat-number" value="${escapeHTML(s.number)}">
                        </div>
                        <div class="form-group">
                            <label>Stat Label</label>
                            <input type="text" class="form-control stat-label" value="${escapeHTML(s.label)}">
                        </div>
                    </div>
                </div>
            `).join('');
        }

        const term = a.terminal || {};
        const whoamiEl = document.getElementById('terminalWhoami');
        const interestsEl = document.getElementById('terminalInterests');
        const statusEl = document.getElementById('terminalStatus');

        if (whoamiEl) whoamiEl.value = term.whoami || '';
        if (interestsEl) interestsEl.value = term.interests || '';
        if (statusEl) statusEl.value = term.status || '';
    }

    function saveAboutTab() {
        const statCards = document.querySelectorAll('#statsList .item-card');
        const statsArr = [];
        statCards.forEach(card => {
            const num = card.querySelector('.stat-number')?.value.trim() || '';
            const lbl = card.querySelector('.stat-label')?.value.trim() || '';
            if (num || lbl) statsArr.push({ number: num, label: lbl });
        });

        portfolioData.about = {
            bio: (document.getElementById('aboutBio')?.value || '').trim(),
            stats: statsArr,
            terminal: {
                whoami: (document.getElementById('terminalWhoami')?.value || '').trim(),
                interests: (document.getElementById('terminalInterests')?.value || '').trim(),
                status: (document.getElementById('terminalStatus')?.value || '').trim()
            }
        };
    }

    /* --- 7. Education Handler --- */
    function syncEducationTab() {
        const cards = document.querySelectorAll('#educationList .item-card');
        if (cards.length === 0) return portfolioData.education || [];
        const arr = [];
        cards.forEach((card, idx) => {
            arr.push({
                id: 'edu-' + (idx + 1),
                title: card.querySelector('.edu-title')?.value.trim() || '',
                subtitle: card.querySelector('.edu-subtitle')?.value.trim() || '',
                date: card.querySelector('.edu-date')?.value.trim() || '',
                description: card.querySelector('.edu-desc')?.value.trim() || ''
            });
        });
        portfolioData.education = arr;
        return arr;
    }

    function loadEducationTab() {
        const container = document.getElementById('educationList');
        if (!container) return;

        function renderList() {
            const items = portfolioData.education || [];
            container.innerHTML = items.map((item, idx) => `
                <div class="item-card" data-idx="${idx}">
                    <div class="item-card-header">
                        <span class="item-card-title">Education #${idx + 1}: ${escapeHTML(item.title || 'Untitled')}</span>
                        <div class="item-card-actions">
                            ${idx > 0 ? `<button class="btn-secondary btn-sm move-up-edu-btn" data-idx="${idx}">⬆️ Move Up</button>` : ''}
                            ${idx < items.length - 1 ? `<button class="btn-secondary btn-sm move-down-edu-btn" data-idx="${idx}">⬇️ Move Down</button>` : ''}
                            <button class="btn-danger btn-sm delete-edu-btn" data-idx="${idx}">🗑️ Delete</button>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label>Degree / Degree Title</label>
                            <input type="text" class="form-control edu-title" value="${escapeHTML(item.title)}">
                        </div>
                        <div class="form-group">
                            <label>Institution / University</label>
                            <input type="text" class="form-control edu-subtitle" value="${escapeHTML(item.subtitle)}">
                        </div>
                    </div>
                    <div class="form-group">
                        <label>Date Range / Years</label>
                        <input type="text" class="form-control edu-date" value="${escapeHTML(item.date)}">
                    </div>
                    <div class="form-group">
                        <label>Description / Details</label>
                        <textarea class="form-control edu-desc" rows="2">${escapeHTML(item.description)}</textarea>
                    </div>
                </div>
            `).join('');

            container.querySelectorAll('.delete-edu-btn').forEach(btn => {
                btn.onclick = (e) => {
                    syncEducationTab();
                    const idx = parseInt(e.currentTarget.getAttribute('data-idx'));
                    portfolioData.education.splice(idx, 1);
                    renderList();
                };
            });

            container.querySelectorAll('.move-up-edu-btn').forEach(btn => {
                btn.onclick = (e) => {
                    syncEducationTab();
                    const idx = parseInt(e.currentTarget.getAttribute('data-idx'));
                    if (idx > 0) {
                        const temp = portfolioData.education[idx];
                        portfolioData.education[idx] = portfolioData.education[idx - 1];
                        portfolioData.education[idx - 1] = temp;
                        renderList();
                    }
                };
            });

            container.querySelectorAll('.move-down-edu-btn').forEach(btn => {
                btn.onclick = (e) => {
                    syncEducationTab();
                    const idx = parseInt(e.currentTarget.getAttribute('data-idx'));
                    if (idx < portfolioData.education.length - 1) {
                        const temp = portfolioData.education[idx];
                        portfolioData.education[idx] = portfolioData.education[idx + 1];
                        portfolioData.education[idx + 1] = temp;
                        renderList();
                    }
                };
            });
        }

        renderList();

        const addBtn = document.getElementById('addEducationBtn');
        if (addBtn) {
            addBtn.onclick = () => {
                syncEducationTab();
                if (!portfolioData.education) portfolioData.education = [];
                portfolioData.education.push({
                    id: 'edu-' + Date.now(),
                    date: '2024 - 2025',
                    title: 'New Degree / Course',
                    subtitle: 'Institution Name',
                    description: 'Course summary...'
                });
                renderList();
            };
        }
    }

    function saveEducationTab() {
        syncEducationTab();
    }

    /* --- 8. Training Handler --- */
    function syncTrainingTab() {
        const cards = document.querySelectorAll('#trainingList .item-card');
        if (cards.length === 0) return portfolioData.training || [];
        const arr = [];
        cards.forEach((card, idx) => {
            const rawTags = card.querySelector('.train-tags')?.value || '';
            const tags = rawTags.split(',').map(t => t.trim()).filter(Boolean);
            arr.push({
                id: 'train-' + (idx + 1),
                icon: card.querySelector('.train-icon')?.value.trim() || '🎓',
                title: card.querySelector('.train-title')?.value.trim() || '',
                subtitle: card.querySelector('.train-subtitle')?.value.trim() || '',
                date: card.querySelector('.train-date')?.value.trim() || '',
                description: card.querySelector('.train-desc')?.value.trim() || '',
                tags: tags
            });
        });
        portfolioData.training = arr;
        return arr;
    }

    function loadTrainingTab() {
        const container = document.getElementById('trainingList');
        if (!container) return;

        function renderList() {
            const items = portfolioData.training || [];
            container.innerHTML = items.map((item, idx) => `
                <div class="item-card" data-idx="${idx}">
                    <div class="item-card-header">
                        <span class="item-card-title">Training #${idx + 1}: ${escapeHTML(item.title || 'Untitled')}</span>
                        <div class="item-card-actions">
                            ${idx > 0 ? `<button class="btn-secondary btn-sm move-up-train-btn" data-idx="${idx}">⬆️ Move Up</button>` : ''}
                            ${idx < items.length - 1 ? `<button class="btn-secondary btn-sm move-down-train-btn" data-idx="${idx}">⬇️ Move Down</button>` : ''}
                            <button class="btn-danger btn-sm delete-train-btn" data-idx="${idx}">🗑️ Delete</button>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label>Icon Emoji</label>
                            <input type="text" class="form-control train-icon" value="${escapeHTML(item.icon || '🎓')}">
                        </div>
                        <div class="form-group">
                            <label>Training Title</label>
                            <input type="text" class="form-control train-title" value="${escapeHTML(item.title)}">
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label>Organization / Academy</label>
                            <input type="text" class="form-control train-subtitle" value="${escapeHTML(item.subtitle)}">
                        </div>
                        <div class="form-group">
                            <label>Date Range</label>
                            <input type="text" class="form-control train-date" value="${escapeHTML(item.date)}">
                        </div>
                    </div>
                    <div class="form-group">
                        <label>Description</label>
                        <textarea class="form-control train-desc" rows="2">${escapeHTML(item.description)}</textarea>
                    </div>
                    <div class="form-group">
                        <label>Skill Tags (comma separated)</label>
                        <input type="text" class="form-control train-tags" value="${escapeHTML((item.tags || []).join(', '))}">
                    </div>
                </div>
            `).join('');

            container.querySelectorAll('.delete-train-btn').forEach(btn => {
                btn.onclick = (e) => {
                    syncTrainingTab();
                    const idx = parseInt(e.currentTarget.getAttribute('data-idx'));
                    portfolioData.training.splice(idx, 1);
                    renderList();
                };
            });

            container.querySelectorAll('.move-up-train-btn').forEach(btn => {
                btn.onclick = (e) => {
                    syncTrainingTab();
                    const idx = parseInt(e.currentTarget.getAttribute('data-idx'));
                    if (idx > 0) {
                        const temp = portfolioData.training[idx];
                        portfolioData.training[idx] = portfolioData.training[idx - 1];
                        portfolioData.training[idx - 1] = temp;
                        renderList();
                    }
                };
            });

            container.querySelectorAll('.move-down-train-btn').forEach(btn => {
                btn.onclick = (e) => {
                    syncTrainingTab();
                    const idx = parseInt(e.currentTarget.getAttribute('data-idx'));
                    if (idx < portfolioData.training.length - 1) {
                        const temp = portfolioData.training[idx];
                        portfolioData.training[idx] = portfolioData.training[idx + 1];
                        portfolioData.training[idx + 1] = temp;
                        renderList();
                    }
                };
            });
        }

        renderList();

        const addBtn = document.getElementById('addTrainingBtn');
        if (addBtn) {
            addBtn.onclick = () => {
                syncTrainingTab();
                if (!portfolioData.training) portfolioData.training = [];
                portfolioData.training.push({
                    id: 'train-' + Date.now(),
                    icon: '🎓',
                    date: 'June 2026',
                    title: 'New Training Program',
                    subtitle: 'Academy Name',
                    description: 'Details...',
                    tags: ['Java', 'Web']
                });
                renderList();
            };
        }
    }

    function saveTrainingTab() {
        syncTrainingTab();
    }

    /* --- 9. Skills Handler --- */
    function syncSkillsTab() {
        const cards = document.querySelectorAll('#skillsList .item-card');
        if (cards.length === 0) return portfolioData.skills || [];
        const arr = [];
        cards.forEach((card, idx) => {
            const norm = (card.querySelector('.skill-tags-input')?.value || '').split(',').map(s => s.trim()).filter(Boolean);
            const high = (card.querySelector('.skill-highlights-input')?.value || '').split(',').map(s => s.trim()).filter(Boolean);
            arr.push({
                id: 'skill-cat-' + (idx + 1),
                title: card.querySelector('.skill-cat-title')?.value.trim() || '',
                tags: norm,
                highlights: high
            });
        });
        portfolioData.skills = arr;
        return arr;
    }

    function loadSkillsTab() {
        const container = document.getElementById('skillsList');
        if (!container) return;

        function renderList() {
            const items = portfolioData.skills || [];
            container.innerHTML = items.map((cat, idx) => `
                <div class="item-card" data-idx="${idx}">
                    <div class="item-card-header">
                        <span class="item-card-title">Category #${idx + 1}: ${escapeHTML(cat.title || 'Untitled')}</span>
                        <div class="item-card-actions">
                            ${idx > 0 ? `<button class="btn-secondary btn-sm move-up-skill-btn" data-idx="${idx}">⬆️ Move Up</button>` : ''}
                            ${idx < items.length - 1 ? `<button class="btn-secondary btn-sm move-down-skill-btn" data-idx="${idx}">⬇️ Move Down</button>` : ''}
                            <button class="btn-danger btn-sm delete-skill-btn" data-idx="${idx}">🗑️ Delete Category</button>
                        </div>
                    </div>
                    <div class="form-group">
                        <label>Category Title</label>
                        <input type="text" class="form-control skill-cat-title" value="${escapeHTML(cat.title)}">
                    </div>
                    <div class="form-group">
                        <label>Normal Skills (comma-separated)</label>
                        <input type="text" class="form-control skill-tags-input" value="${escapeHTML((cat.tags || []).join(', '))}">
                    </div>
                    <div class="form-group">
                        <label>Highlighted Skills (comma-separated, e.g. "★ Java")</label>
                        <input type="text" class="form-control skill-highlights-input" value="${escapeHTML((cat.highlights || []).join(', '))}">
                    </div>
                </div>
            `).join('');

            container.querySelectorAll('.delete-skill-btn').forEach(btn => {
                btn.onclick = (e) => {
                    syncSkillsTab();
                    const idx = parseInt(e.currentTarget.getAttribute('data-idx'));
                    portfolioData.skills.splice(idx, 1);
                    renderList();
                };
            });

            container.querySelectorAll('.move-up-skill-btn').forEach(btn => {
                btn.onclick = (e) => {
                    syncSkillsTab();
                    const idx = parseInt(e.currentTarget.getAttribute('data-idx'));
                    if (idx > 0) {
                        const temp = portfolioData.skills[idx];
                        portfolioData.skills[idx] = portfolioData.skills[idx - 1];
                        portfolioData.skills[idx - 1] = temp;
                        renderList();
                    }
                };
            });

            container.querySelectorAll('.move-down-skill-btn').forEach(btn => {
                btn.onclick = (e) => {
                    syncSkillsTab();
                    const idx = parseInt(e.currentTarget.getAttribute('data-idx'));
                    if (idx < portfolioData.skills.length - 1) {
                        const temp = portfolioData.skills[idx];
                        portfolioData.skills[idx] = portfolioData.skills[idx + 1];
                        portfolioData.skills[idx + 1] = temp;
                        renderList();
                    }
                };
            });
        }

        renderList();

        const addBtn = document.getElementById('addSkillCatBtn');
        if (addBtn) {
            addBtn.onclick = () => {
                syncSkillsTab();
                if (!portfolioData.skills) portfolioData.skills = [];
                portfolioData.skills.push({
                    id: 'skill-cat-' + Date.now(),
                    title: 'New Skill Category',
                    tags: ['Skill 1', 'Skill 2'],
                    highlights: []
                });
                renderList();
            };
        }
    }

    function saveSkillsTab() {
        syncSkillsTab();
    }

    /* --- 10. Projects Handler --- */
    function syncProjectsTab() {
        const cards = document.querySelectorAll('#projectsList .item-card');
        if (cards.length === 0) return portfolioData.projects || [];
        const arr = [];
        cards.forEach((card, idx) => {
            const tech = (card.querySelector('.proj-tech')?.value || '').split(',').map(t => t.trim()).filter(Boolean);
            arr.push({
                id: 'proj-' + (idx + 1),
                title: card.querySelector('.proj-title')?.value.trim() || '',
                type: card.querySelector('.proj-type')?.value.trim() || '',
                image: card.querySelector('.proj-img')?.value.trim() || '',
                description: card.querySelector('.proj-desc')?.value.trim() || '',
                tech: tech,
                liveUrl: card.querySelector('.proj-live')?.value.trim() || '',
                githubUrl: card.querySelector('.proj-github')?.value.trim() || ''
            });
        });
        portfolioData.projects = arr;
        return arr;
    }

    function loadProjectsTab() {
        const container = document.getElementById('projectsList');
        if (!container) return;

        function renderList() {
            const items = portfolioData.projects || [];
            container.innerHTML = items.map((proj, idx) => `
                <div class="item-card" data-idx="${idx}">
                    <div class="item-card-header">
                        <span class="item-card-title">Project #${idx + 1}: ${escapeHTML(proj.title || 'Untitled')}</span>
                        <div class="item-card-actions">
                            ${idx > 0 ? `<button class="btn-secondary btn-sm move-up-proj-btn" data-idx="${idx}">⬆️ Move Up</button>` : ''}
                            ${idx < items.length - 1 ? `<button class="btn-secondary btn-sm move-down-proj-btn" data-idx="${idx}">⬇️ Move Down</button>` : ''}
                            <button class="btn-danger btn-sm delete-proj-btn" data-idx="${idx}">🗑️ Delete Project</button>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label>Project Title</label>
                            <input type="text" class="form-control proj-title" value="${escapeHTML(proj.title)}">
                        </div>
                        <div class="form-group">
                            <label>Project Category / Type</label>
                            <input type="text" class="form-control proj-type" value="${escapeHTML(proj.type)}">
                        </div>
                    </div>
                    <div class="form-group">
                        <label>Image File Path / Thumbnail URL</label>
                        <input type="text" class="form-control proj-img" value="${escapeHTML(proj.image)}">
                    </div>
                    <div class="form-group">
                        <label>Description</label>
                        <textarea class="form-control proj-desc" rows="3">${escapeHTML(proj.description)}</textarea>
                    </div>
                    <div class="form-group">
                        <label>Tech Stack Tags (comma separated)</label>
                        <input type="text" class="form-control proj-tech" value="${escapeHTML((proj.tech || []).join(', '))}">
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label>Live View / Analysis Link</label>
                            <input type="url" class="form-control proj-live" value="${escapeHTML(proj.liveUrl)}">
                        </div>
                        <div class="form-group">
                            <label>GitHub Repository Link</label>
                            <input type="url" class="form-control proj-github" value="${escapeHTML(proj.githubUrl)}">
                        </div>
                    </div>
                </div>
            `).join('');

            container.querySelectorAll('.delete-proj-btn').forEach(btn => {
                btn.onclick = (e) => {
                    syncProjectsTab();
                    const idx = parseInt(e.currentTarget.getAttribute('data-idx'));
                    portfolioData.projects.splice(idx, 1);
                    renderList();
                };
            });

            container.querySelectorAll('.move-up-proj-btn').forEach(btn => {
                btn.onclick = (e) => {
                    syncProjectsTab();
                    const idx = parseInt(e.currentTarget.getAttribute('data-idx'));
                    if (idx > 0) {
                        const temp = portfolioData.projects[idx];
                        portfolioData.projects[idx] = portfolioData.projects[idx - 1];
                        portfolioData.projects[idx - 1] = temp;
                        renderList();
                    }
                };
            });

            container.querySelectorAll('.move-down-proj-btn').forEach(btn => {
                btn.onclick = (e) => {
                    syncProjectsTab();
                    const idx = parseInt(e.currentTarget.getAttribute('data-idx'));
                    if (idx < portfolioData.projects.length - 1) {
                        const temp = portfolioData.projects[idx];
                        portfolioData.projects[idx] = portfolioData.projects[idx + 1];
                        portfolioData.projects[idx + 1] = temp;
                        renderList();
                    }
                };
            });
        }

        renderList();

        const addBtn = document.getElementById('addProjectBtn');
        if (addBtn) {
            addBtn.onclick = () => {
                syncProjectsTab();
                if (!portfolioData.projects) portfolioData.projects = [];
                portfolioData.projects.push({
                    id: 'proj-' + Date.now(),
                    type: 'Web Development',
                    title: 'New Awesome Project',
                    image: 'covid_analysis.png',
                    description: 'Project description goes here...',
                    tech: ['HTML', 'CSS', 'JavaScript'],
                    liveUrl: '',
                    githubUrl: ''
                });
                renderList();
            };
        }
    }

    function saveProjectsTab() {
        syncProjectsTab();
    }

    /* --- 11. Achievements Handler --- */
    function syncAchievementsTab() {
        const cards = document.querySelectorAll('#achievementsList .item-card');
        if (cards.length === 0) return portfolioData.achievements || [];
        const arr = [];
        cards.forEach((card, idx) => {
            arr.push({
                id: 'ach-' + (idx + 1),
                badge: card.querySelector('.ach-badge')?.value.trim() || '🏆',
                date: card.querySelector('.ach-date')?.value.trim() || '',
                title: card.querySelector('.ach-title')?.value.trim() || '',
                description: card.querySelector('.ach-desc')?.value.trim() || ''
            });
        });
        portfolioData.achievements = arr;
        return arr;
    }

    function loadAchievementsTab() {
        const container = document.getElementById('achievementsList');
        if (!container) return;

        function renderList() {
            const items = portfolioData.achievements || [];
            container.innerHTML = items.map((ach, idx) => `
                <div class="item-card" data-idx="${idx}">
                    <div class="item-card-header">
                        <span class="item-card-title">Achievement #${idx + 1}: ${escapeHTML(ach.title || 'Untitled')}</span>
                        <div class="item-card-actions">
                            ${idx > 0 ? `<button class="btn-secondary btn-sm move-up-ach-btn" data-idx="${idx}">⬆️ Move Up</button>` : ''}
                            ${idx < items.length - 1 ? `<button class="btn-secondary btn-sm move-down-ach-btn" data-idx="${idx}">⬇️ Move Down</button>` : ''}
                            <button class="btn-danger btn-sm delete-ach-btn" data-idx="${idx}">🗑️ Delete</button>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label>Badge Emoji</label>
                            <input type="text" class="form-control ach-badge" value="${escapeHTML(ach.badge || '🏆')}">
                        </div>
                        <div class="form-group">
                            <label>Year / Date</label>
                            <input type="text" class="form-control ach-date" value="${escapeHTML(ach.date)}">
                        </div>
                    </div>
                    <div class="form-group">
                        <label>Achievement Title</label>
                        <input type="text" class="form-control ach-title" value="${escapeHTML(ach.title)}">
                    </div>
                    <div class="form-group">
                        <label>Description</label>
                        <textarea class="form-control ach-desc" rows="2">${escapeHTML(ach.description)}</textarea>
                    </div>
                </div>
            `).join('');

            container.querySelectorAll('.delete-ach-btn').forEach(btn => {
                btn.onclick = (e) => {
                    syncAchievementsTab();
                    const idx = parseInt(e.currentTarget.getAttribute('data-idx'));
                    portfolioData.achievements.splice(idx, 1);
                    renderList();
                };
            });

            container.querySelectorAll('.move-up-ach-btn').forEach(btn => {
                btn.onclick = (e) => {
                    syncAchievementsTab();
                    const idx = parseInt(e.currentTarget.getAttribute('data-idx'));
                    if (idx > 0) {
                        const temp = portfolioData.achievements[idx];
                        portfolioData.achievements[idx] = portfolioData.achievements[idx - 1];
                        portfolioData.achievements[idx - 1] = temp;
                        renderList();
                    }
                };
            });

            container.querySelectorAll('.move-down-ach-btn').forEach(btn => {
                btn.onclick = (e) => {
                    syncAchievementsTab();
                    const idx = parseInt(e.currentTarget.getAttribute('data-idx'));
                    if (idx < portfolioData.achievements.length - 1) {
                        const temp = portfolioData.achievements[idx];
                        portfolioData.achievements[idx] = portfolioData.achievements[idx + 1];
                        portfolioData.achievements[idx + 1] = temp;
                        renderList();
                    }
                };
            });
        }

        renderList();

        const addBtn = document.getElementById('addAchievementBtn');
        if (addBtn) {
            addBtn.onclick = () => {
                syncAchievementsTab();
                if (!portfolioData.achievements) portfolioData.achievements = [];
                portfolioData.achievements.push({
                    id: 'ach-' + Date.now(),
                    badge: '🏆',
                    date: '2026',
                    title: 'New Achievement',
                    description: 'Details...'
                });
                renderList();
            };
        }
    }

    function saveAchievementsTab() {
        syncAchievementsTab();
    }

    /* --- 12. Certificates Handler --- */
    function syncCertificatesTab() {
        const cards = document.querySelectorAll('#certificatesList .item-card');
        if (cards.length === 0) return portfolioData.certificates || [];
        const arr = [];
        cards.forEach((card, idx) => {
            arr.push({
                id: 'cert-' + (idx + 1),
                title: card.querySelector('.cert-title')?.value.trim() || '',
                issuer: card.querySelector('.cert-issuer')?.value.trim() || '',
                date: card.querySelector('.cert-date')?.value.trim() || '',
                logo: card.querySelector('.cert-logo')?.value.trim() || '',
                pdfUrl: card.querySelector('.cert-pdf')?.value.trim() || '',
                verifyUrl: card.querySelector('.cert-verify')?.value.trim() || ''
            });
        });
        portfolioData.certificates = arr;
        return arr;
    }

    function loadCertificatesTab() {
        const container = document.getElementById('certificatesList');
        if (!container) return;

        function renderList() {
            const items = portfolioData.certificates || [];
            container.innerHTML = items.map((cert, idx) => `
                <div class="item-card" data-idx="${idx}">
                    <div class="item-card-header">
                        <span class="item-card-title">Certificate #${idx + 1}: ${escapeHTML(cert.title || 'Untitled')}</span>
                        <div class="item-card-actions">
                            ${idx > 0 ? `<button class="btn-secondary btn-sm move-up-cert-btn" data-idx="${idx}">⬆️ Move Up</button>` : ''}
                            ${idx < items.length - 1 ? `<button class="btn-secondary btn-sm move-down-cert-btn" data-idx="${idx}">⬇️ Move Down</button>` : ''}
                            <button class="btn-danger btn-sm delete-cert-btn" data-idx="${idx}">🗑️ Delete</button>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label>Certificate Title</label>
                            <input type="text" class="form-control cert-title" value="${escapeHTML(cert.title)}">
                        </div>
                        <div class="form-group">
                            <label>Issuer / Academy</label>
                            <input type="text" class="form-control cert-issuer" value="${escapeHTML(cert.issuer)}">
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label>Date Range / Year</label>
                            <input type="text" class="form-control cert-date" value="${escapeHTML(cert.date)}">
                        </div>
                        <div class="form-group">
                            <label>Logo Image File</label>
                            <input type="text" class="form-control cert-logo" value="${escapeHTML(cert.logo)}">
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label>View Certificate PDF Path</label>
                            <input type="text" class="form-control cert-pdf" value="${escapeHTML(cert.pdfUrl)}">
                        </div>
                        <div class="form-group">
                            <label>Verification Link URL</label>
                            <input type="url" class="form-control cert-verify" value="${escapeHTML(cert.verifyUrl)}">
                        </div>
                    </div>
                </div>
            `).join('');

            container.querySelectorAll('.delete-cert-btn').forEach(btn => {
                btn.onclick = (e) => {
                    syncCertificatesTab();
                    const idx = parseInt(e.currentTarget.getAttribute('data-idx'));
                    portfolioData.certificates.splice(idx, 1);
                    renderList();
                };
            });

            container.querySelectorAll('.move-up-cert-btn').forEach(btn => {
                btn.onclick = (e) => {
                    syncCertificatesTab();
                    const idx = parseInt(e.currentTarget.getAttribute('data-idx'));
                    if (idx > 0) {
                        const temp = portfolioData.certificates[idx];
                        portfolioData.certificates[idx] = portfolioData.certificates[idx - 1];
                        portfolioData.certificates[idx - 1] = temp;
                        renderList();
                    }
                };
            });

            container.querySelectorAll('.move-down-cert-btn').forEach(btn => {
                btn.onclick = (e) => {
                    syncCertificatesTab();
                    const idx = parseInt(e.currentTarget.getAttribute('data-idx'));
                    if (idx < portfolioData.certificates.length - 1) {
                        const temp = portfolioData.certificates[idx];
                        portfolioData.certificates[idx] = portfolioData.certificates[idx + 1];
                        portfolioData.certificates[idx + 1] = temp;
                        renderList();
                    }
                };
            });
        }

        renderList();

        const addBtn = document.getElementById('addCertificateBtn');
        if (addBtn) {
            addBtn.onclick = () => {
                syncCertificatesTab();
                if (!portfolioData.certificates) portfolioData.certificates = [];
                portfolioData.certificates.push({
                    id: 'cert-' + Date.now(),
                    logo: 'cipherschool.png',
                    date: 'June 2026',
                    title: 'New Certification',
                    issuer: 'Certification Authority',
                    pdfUrl: '',
                    verifyUrl: ''
                });
                renderList();
            };
        }
    }

    function saveCertificatesTab() {
        syncCertificatesTab();
    }

    /* --- 13. Contact Handler --- */
    function loadContactTab() {
        const c = portfolioData.contact || {};
        const headerEl = document.getElementById('contactHeader');
        const subtextEl = document.getElementById('contactSubtext');
        const emailEl = document.getElementById('contactEmail');
        const locEl = document.getElementById('contactLocation');
        const githubEl = document.getElementById('contactGithub');
        const linkedinEl = document.getElementById('contactLinkedin');
        const leetcodeEl = document.getElementById('contactLeetcode');
        const formspreeEl = document.getElementById('contactFormspree');

        if (headerEl) headerEl.value = c.talkHeader || "Let's talk";
        if (subtextEl) subtextEl.value = c.talkSubtext || '';
        if (emailEl) emailEl.value = c.email || '';
        if (locEl) locEl.value = c.location || '';
        if (githubEl) githubEl.value = c.github || '';
        if (linkedinEl) linkedinEl.value = c.linkedin || '';
        if (leetcodeEl) leetcodeEl.value = c.leetcode || '';
        if (formspreeEl) formspreeEl.value = c.formspreeUrl || '';
    }

    function saveContactTab() {
        portfolioData.contact = {
            talkHeader: (document.getElementById('contactHeader')?.value || '').trim(),
            talkSubtext: (document.getElementById('contactSubtext')?.value || '').trim(),
            email: (document.getElementById('contactEmail')?.value || '').trim(),
            location: (document.getElementById('contactLocation')?.value || '').trim(),
            github: (document.getElementById('contactGithub')?.value || '').trim(),
            linkedin: (document.getElementById('contactLinkedin')?.value || '').trim(),
            leetcode: (document.getElementById('contactLeetcode')?.value || '').trim(),
            formspreeUrl: (document.getElementById('contactFormspree')?.value || '').trim()
        };
    }

    /* --- 14. Save All Changes Handler --- */
    function saveAll() {
        saveHeroTab();
        saveAboutTab();
        saveEducationTab();
        saveTrainingTab();
        saveSkillsTab();
        saveProjectsTab();
        saveAchievementsTab();
        saveCertificatesTab();
        saveContactTab();

        const success = window.PortfolioStore.save(portfolioData);
        if (success) {
            showToast('All portfolio changes saved successfully! 🎉', 'success');
        } else {
            showToast('Failed to save changes.', 'error');
        }
    }

    if (saveAllBtn) {
        saveAllBtn.addEventListener('click', saveAll);
    }

    /* --- 15. Security & Backup Handlers --- */
    const pinSettingsForm = document.getElementById('pinSettingsForm');
    if (pinSettingsForm) {
        pinSettingsForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const usernameEl = document.getElementById('adminUsernameInput');
            const passEl = document.getElementById('newPinInput');
            const confirmPassEl = document.getElementById('confirmPinInput');

            const newUsername = (usernameEl?.value || '').trim() || portfolioData.adminUsername || 'lakshyanunia';
            const newPass = (passEl?.value || '').trim();
            const confirmPass = (confirmPassEl?.value || '').trim();

            if (newPass || confirmPass) {
                if (newPass.length < 4) {
                    showToast('Password must be at least 4 characters.', 'error');
                    return;
                }
                if (newPass !== confirmPass) {
                    showToast('New Password and Confirm Password do not match.', 'error');
                    return;
                }
                portfolioData.adminPassword = newPass;
            }

            portfolioData.adminUsername = newUsername;
            window.PortfolioStore.save(portfolioData);
            if (passEl) passEl.value = '';
            if (confirmPassEl) confirmPassEl.value = '';
            showToast('Admin security credentials updated successfully!', 'success');
        });
    }

    const exportJsonBtn = document.getElementById('exportJsonBtn');
    if (exportJsonBtn) {
        exportJsonBtn.addEventListener('click', () => {
            saveAll();
            window.PortfolioStore.export();
            showToast('Portfolio JSON exported successfully!', 'success');
        });
    }

    const importJsonInput = document.getElementById('importJsonInput');
    if (importJsonInput) {
        importJsonInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = (event) => {
                const res = window.PortfolioStore.import(event.target.result);
                if (res.success) {
                    showToast('Portfolio data imported successfully!', 'success');
                    initDashboard();
                } else {
                    showToast('Import failed: ' + res.error, 'error');
                }
            };
            reader.readAsText(file);
        });
    }

    const resetDefaultsBtn = document.getElementById('resetDefaultsBtn');
    if (resetDefaultsBtn) {
        resetDefaultsBtn.addEventListener('click', () => {
            if (confirm('Are you sure you want to reset all portfolio content to default values? Any custom edits will be restored to original defaults.')) {
                portfolioData = window.PortfolioStore.reset();
                initDashboard();
                showToast('Portfolio data reset to default values.', 'info');
            }
        });
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

    // Run auth check on load
    checkAuth();
});
