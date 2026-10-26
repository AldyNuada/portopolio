(function () {
    'use strict';

    const data = window.PORTFOLIO;
    const { profile } = data;
    const INITIAL_PROJECTS = 4;

    // Every page shares the hero, navbar, contact and footer; only the
    // components inside [data-page-content] change when navigating.
    const PAGES = {
        'index.html': { id: 'home', title: `${profile.name} — ${profile.title}`, components: ['about', 'experience', 'projects', 'techstack'] },
        'experience.html': { id: 'experience', title: `Experience — ${profile.name}`, components: ['experience'] },
        'projects.html': { id: 'projects', title: `Projects — ${profile.name}`, components: ['project-list'] },
        'project.html': { id: 'project', title: `Project — ${profile.name}`, components: ['project-detail'] },
    };

    function pageFromUrl(url) {
        return PAGES[url.pathname.split('/').pop() || 'index.html'];
    }

    // Opened straight from disk (file://), browsers refuse pushState to another
    // file, so the route lives in the hash instead: index.html#!/experience.html
    const HASH_ROUTING = window.location.protocol === 'file:';
    const HASH_PREFIX = '#!/';

    function currentUrl() {
        if (HASH_ROUTING && window.location.hash.startsWith(HASH_PREFIX)) {
            return new URL(window.location.hash.slice(HASH_PREFIX.length), window.location.href);
        }
        return new URL(window.location.href);
    }

    function pushUrl(url) {
        if (!HASH_ROUTING) {
            history.pushState(null, '', url.href);
            return;
        }

        const file = url.pathname.split('/').pop() || 'index.html';
        history.pushState(null, '', HASH_PREFIX + file + url.search + url.hash);
    }

    /* ------------------------------------------------------------------
       Helpers
       ------------------------------------------------------------------ */
    function esc(value) {
        return String(value ?? '')
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    function svg(paths, cls = 'icon') {
        return `<svg xmlns="http://www.w3.org/2000/svg" class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths}</svg>`;
    }

    const ICONS = {
        home: '<path d="M3 9.5 12 3l9 6.5V21a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1V9.5Z"/>',
        briefcase: '<rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>',
        folder: '<path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z"/>',
        mail: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/>',
        pin: '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
        whatsapp: '<path d="M13.5 2A9.5 9.5 0 0 0 4.3 15.6L2 22l6.6-2.2A9.5 9.5 0 1 0 13.5 2Z"/><path d="M8.5 8.5c0 4 3 7 7 7l1-2-2.5-1-1 1a5 5 0 0 1-3.5-3.5l1-1-1-2.5Z"/>',
        instagram: '<rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1"/>',
        sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>',
        moon: '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>',
        arrowRight: '<path d="M5 12h14M13 5l7 7-7 7"/>',
        arrowLeft: '<path d="M19 12H5M12 19l-7-7 7-7"/>',
        chevronLeft: '<path d="m15 18-6-6 6-6"/>',
        chevronRight: '<path d="m9 18 6-6-6-6"/>',
        close: '<path d="M6 6l12 12M6 18L18 6"/>',
    };

    const whatsappUrl = profile.whatsapp ? `https://wa.me/${profile.whatsapp}` : null;
    const instagramUrl = `https://instagram.com/${profile.instagram}`;
    const handle = '@' + profile.shortName.toLowerCase().replace(/ /g, '');

    const projectUrl = (slug) => `project.html?slug=${encodeURIComponent(slug)}`;
    const bulletList = (items, cls = 'bullets') => `<ul class="${cls}">${items.map((item) => `<li><span>${esc(item)}</span></li>`).join('')}</ul>`;
    const chips = (items, cls = 'chip') => `<div class="chips">${items.map((item) => `<span class="${cls}">${esc(item)}</span>`).join('')}</div>`;
    const placeholder = (name) => `<div class="placeholder">${esc(Array.from(name)[0] || '')}</div>`;

    /* ------------------------------------------------------------------
       Components
       ------------------------------------------------------------------ */
    const components = {
        hero: () => `
            <section id="home">
                <div class="hero-banner"><img src="${esc(profile.banner)}" alt=""></div>
                <div class="hero-body">
                    <img class="hero-avatar" src="${esc(profile.avatar)}" alt="${esc(profile.name)}">
                    <div class="hero-head">
                        <div>
                            <h1 class="hero-name">${esc(profile.name)}</h1>
                            <p class="hero-handle">${esc(handle)}</p>
                        </div>
                    </div>
                    <p class="hero-tagline">${esc(profile.tagline)}</p>
                    <div class="hero-meta">
                        <span>${svg(ICONS.briefcase)}${esc(profile.title)}</span>
                        <span>${svg(ICONS.pin)}${esc(profile.location)}</span>
                    </div>
                    <div class="hero-links">
                        <a class="icon-link" href="mailto:${esc(profile.email)}" aria-label="Email">${svg(ICONS.mail)}</a>
                        ${whatsappUrl ? `<a class="icon-link" href="${whatsappUrl}" target="_blank" rel="noopener" aria-label="WhatsApp">${svg(ICONS.whatsapp)}</a>` : ''}
                        <a class="icon-link" href="${instagramUrl}" target="_blank" rel="noopener" aria-label="Instagram">${svg(ICONS.instagram)}</a>
                        ${whatsappUrl ? `<a class="btn ml-auto" href="${whatsappUrl}" target="_blank" rel="noopener">Hubungi Saya</a>` : ''}
                    </div>
                </div>
            </section>`,

        navbar: () => {
            const tabs = [
                { id: 'home', href: 'index.html', label: 'Home', icon: ICONS.home },
                { id: 'experience', href: 'experience.html', label: 'Experience', icon: ICONS.briefcase },
                { id: 'projects', href: 'projects.html', label: 'Projects', icon: ICONS.folder },
                { id: 'contact', href: 'index.html#contact', label: 'Contact', icon: ICONS.mail },
            ];

            return `
                <div class="navbar">
                    <nav aria-label="Navigasi utama">
                        ${tabs.map((tab) => `
                            <a class="nav-link" href="${tab.href}" data-nav-link data-tab-id="${tab.id}" aria-label="${tab.label}">
                                ${svg(tab.icon, 'icon-md')}<span class="nav-label">${tab.label}</span>
                            </a>`).join('')}
                        <button type="button" class="theme-toggle" data-theme-toggle aria-label="Toggle dark mode">
                            ${svg(ICONS.sun, 'icon-md icon-sun')}${svg(ICONS.moon, 'icon-md icon-moon')}
                        </button>
                    </nav>
                </div>`;
        },

        about: () => `
            <section id="about" class="section">
                <h2 class="section-title">Tentang Saya</h2>
                <div class="prose">${data.about.map((p) => `<p>${esc(p)}</p>`).join('')}</div>

                <h3 class="section-subtitle" style="margin-top: 2rem">Pendidikan</h3>
                <div class="edu-list">
                    ${data.education.map((edu) => `
                        <div class="edu-item">
                            <p class="edu-name">${esc(edu.institution)}</p>
                            <p class="edu-degree">${esc(edu.degree)}</p>
                            <p class="edu-period">${esc(edu.period)}</p>
                        </div>`).join('')}
                </div>
            </section>`,

        experience: () => `
            <section id="experience" class="section">
                <h2 class="section-title">Pengalaman Kerja</h2>
                <div class="job-list">
                    ${data.experience.map((job) => `
                        <div class="job">
                            <p class="job-period">${esc(job.period)}</p>
                            <h3 class="job-role">${esc(job.role)}</h3>
                            <p class="job-company">${esc(job.company)}</p>
                            ${bulletList(job.points)}
                        </div>`).join('')}
                </div>
            </section>`,

        // Home: first few projects as buttons that open the detail modal.
        projects: () => {
            const extra = data.projects.length - INITIAL_PROJECTS;

            return `
                <section id="projects" class="section">
                    <h2 class="section-title">Proyek</h2>
                    <p class="lead">Sebagian proyek yang pernah saya kerjakan, baik saat bekerja maupun sebagai freelance developer. Klik salah satu untuk lihat detailnya.</p>
                    <div class="project-grid">
                        ${data.projects.map((project, i) => projectCard(project, {
                            tag: 'button',
                            attrs: `type="button" data-project-index="${i}"${i >= INITIAL_PROJECTS ? ' hidden data-extra' : ''}`,
                        })).join('')}
                    </div>
                    ${extra > 0 ? `
                        <div class="center">
                            <button type="button" class="btn-outline" data-toggle-projects
                                data-more="Tampilkan Lebih Banyak (${extra})" data-less="Tampilkan Lebih Sedikit">Tampilkan Lebih Banyak (${extra})</button>
                        </div>` : ''}
                </section>`;
        },

        // Projects page: every project links to its own detail page.
        'project-list': () => `
            <div class="section">
                <h1 class="section-title">Proyek</h1>
                <p class="lead">Semua proyek yang pernah saya kerjakan, baik saat bekerja maupun sebagai freelance developer. Klik salah satu untuk lihat detailnya.</p>
                <div class="project-grid">
                    ${data.projects.map((project) => projectCard(project, {
                        tag: 'a',
                        attrs: `href="${projectUrl(project.slug)}" data-nav-link`,
                    })).join('')}
                </div>
            </div>`,

        'project-detail': () => {
            const slug = currentUrl().searchParams.get('slug');
            const project = data.projects.find((p) => p.slug === slug);

            if (!project) {
                return `
                    <div class="empty">
                        <h1>Proyek tidak ditemukan</h1>
                        <p>Proyek yang Anda cari tidak ada atau sudah dihapus.</p>
                        <a class="btn" href="projects.html">Lihat semua proyek</a>
                    </div>`;
            }

            document.title = `${project.name} — ${profile.name}`;

            return `
                <a class="back-link" href="projects.html" data-nav-link>${svg(ICONS.arrowLeft)}Kembali ke semua proyek</a>
                ${gallery(project)}
                <div class="detail">
                    <span class="category">${esc(project.category)}</span>
                    <h1>${esc(project.name)}</h1>
                    <p class="desc">${esc(project.description)}</p>
                    ${chips(project.tags)}
                    ${project.tasks.length ? `<div class="detail-block"><h2 class="label">Tugas</h2>${bulletList(project.tasks)}</div>` : ''}
                    ${project.features.length ? `<div class="detail-block"><h2 class="label">Fitur</h2>${bulletList(project.features)}</div>` : ''}
                    ${project.stack.length ? `<div class="detail-block"><h2 class="label">Tech Stack</h2>${chips(project.stack, 'tech')}</div>` : ''}
                </div>`;
        },

        techstack: () => `
            <section id="tech-stack" class="section">
                <h2 class="section-title">Tech Stack</h2>
                <div class="stack-grid">
                    ${data.techStack.filter((cat) => cat.skills.length).map((cat) => `
                        <div>
                            <h3>${esc(cat.name)}</h3>
                            ${chips(cat.skills, 'tech tech-lg')}
                        </div>`).join('')}
                </div>
            </section>`,

        contact: () => `
            <section id="contact" class="contact">
                <div class="contact-box">
                    <h2>Mari Berkolaborasi</h2>
                    <p>Terbuka untuk peluang kerja penuh waktu maupun proyek freelance seputar pengembangan web dengan Laravel dan JavaScript.</p>
                    <div class="contact-actions">
                        ${whatsappUrl ? `<a class="solid" href="${whatsappUrl}" target="_blank" rel="noopener">Chat via WhatsApp</a>` : ''}
                        <a class="ghost" href="mailto:${esc(profile.email)}">${esc(profile.email)}</a>
                    </div>
                </div>
            </section>`,

        footer: () => `
            <footer class="footer">
                <div class="footer-inner">
                    <div class="footer-top">
                        <div>
                            <p class="footer-name">${esc(profile.name)}</p>
                            <p class="footer-loc">${esc(profile.location)} &middot; ${esc(profile.timezone)}</p>
                        </div>
                        <div class="footer-links">
                            <a href="mailto:${esc(profile.email)}">Email</a>
                            ${whatsappUrl ? `<a href="${whatsappUrl}" target="_blank" rel="noopener">WhatsApp</a>` : ''}
                            <a href="${instagramUrl}" target="_blank" rel="noopener">Instagram</a>
                        </div>
                    </div>
                    <div class="footer-bottom">
                        <p>&copy; ${new Date().getFullYear()} ${esc(profile.shortName)}. All rights reserved.</p>
                    </div>
                </div>
            </footer>`,

        modal: () => `
            <div class="modal" data-modal role="dialog" aria-modal="true" aria-hidden="true">
                <div class="modal-panel" data-modal-panel></div>
            </div>`,
    };

    function projectCard(project, { tag, attrs }) {
        return `
            <${tag} class="project-card" ${attrs}>
                <span class="category">${esc(project.category)}</span>
                <h3>${esc(project.name)}</h3>
                <p>${esc(project.description)}</p>
                ${chips(project.tags)}
                <span class="more-link">Lihat Detail ${svg(ICONS.arrowRight, 'icon-sm')}</span>
            </${tag}>`;
    }

    function gallery(project) {
        const images = project.images || [];

        if (images.length === 0) {
            return `<div class="gallery"><div class="gallery-main">${placeholder(project.name)}</div></div>`;
        }

        if (images.length === 1) {
            return `
                <div class="gallery">
                    <a class="gallery-main" href="${esc(images[0])}" target="_blank" rel="noopener">
                        <img src="${esc(images[0])}" alt="${esc(project.name)}">
                    </a>
                </div>`;
        }

        return `
            <div class="gallery" data-gallery>
                <div class="gallery-main">
                    <a href="${esc(images[0])}" target="_blank" rel="noopener" data-gallery-link>
                        <img src="${esc(images[0])}" alt="${esc(project.name)}" data-gallery-image>
                    </a>
                    <button type="button" class="gallery-nav prev" data-gallery-step="-1" aria-label="Gambar sebelumnya">${svg(ICONS.chevronLeft)}</button>
                    <button type="button" class="gallery-nav next" data-gallery-step="1" aria-label="Gambar berikutnya">${svg(ICONS.chevronRight)}</button>
                    <span class="gallery-count" data-gallery-count>1 / ${images.length}</span>
                </div>
                <div class="thumbs">
                    ${images.map((src, i) => `
                        <button type="button" class="thumb${i === 0 ? ' is-active' : ''}" data-gallery-index="${i}" aria-label="Lihat gambar ${i + 1}">
                            <img src="${esc(src)}" alt="">
                        </button>`).join('')}
                </div>
            </div>`;
    }

    function modalContent(project) {
        const cover = (project.images || [])[0];

        return `
            <div class="modal-cover">
                ${cover ? `<img src="${esc(cover)}" alt="${esc(project.name)}">` : placeholder(project.name)}
                <button type="button" class="modal-close" data-modal-close aria-label="Tutup">${svg(ICONS.close)}</button>
            </div>
            <div class="modal-body">
                <span class="category">${esc(project.category)}</span>
                <h3>${esc(project.name)}</h3>
                <p class="desc">${esc(project.description)}</p>
                <div class="modal-block"><h4 class="label">Tugas</h4>${bulletList(project.tasks, 'bullets tight')}</div>
                <div class="modal-block"><h4 class="label">Fitur</h4>${bulletList(project.features, 'bullets tight')}</div>
                <div class="modal-block"><h4 class="label">Tech Stack</h4>${chips(project.stack, 'tech')}</div>
                <a class="btn btn-block" href="${projectUrl(project.slug)}" data-nav-link>Lihat Detail Proyek ${svg(ICONS.arrowRight)}</a>
            </div>`;
    }

    function renderComponents() {
        document.querySelectorAll('[data-component]').forEach((slot) => {
            const render = components[slot.dataset.component];
            if (render) slot.outerHTML = render();
        });

        // The project modal is shared by every page so it survives navigation.
        if (!document.querySelector('[data-modal]')) {
            document.body.insertAdjacentHTML('beforeend', components.modal());
        }
    }

    function renderPage(page) {
        document.body.dataset.page = page.id;
        document.title = page.title;
        document.querySelector('[data-page-content]').innerHTML = page.components
            .map((name) => components[name]())
            .join('');
    }

    /* ------------------------------------------------------------------
       Theme (the initial class is set by the inline script in <head>)
       ------------------------------------------------------------------ */
    function initTheme() {
        document.addEventListener('click', (event) => {
            if (!event.target.closest('[data-theme-toggle]')) return;

            const dark = document.documentElement.classList.toggle('dark');
            try {
                localStorage.setItem('theme', dark ? 'dark' : 'light');
            } catch (error) {
                // Storage unavailable (private mode) — theme just won't persist.
            }
        });
    }

    /* ------------------------------------------------------------------
       Navigation: active tab + click sound
       ------------------------------------------------------------------ */
    const navSound = new Audio('assets/sounds/nav-tick.mp3');

    function playMenuSound() {
        try {
            navSound.currentTime = 0;
            navSound.play().catch((error) => console.warn('Nav sound was blocked:', error));
        } catch (error) {
            console.warn('Nav sound failed:', error);
        }
    }

    function getActiveTabId() {
        const page = document.body.dataset.page;
        if (page === 'home') return currentUrl().hash === '#contact' ? 'contact' : 'home';
        if (page === 'project') return 'projects';
        return page;
    }

    function scrollToHash(hash, behavior) {
        const target = hash ? document.getElementById(hash.slice(1)) : null;
        if (target) target.scrollIntoView({ behavior, block: 'start' });
        else window.scrollTo({ top: 0, behavior });
    }

    function highlightActiveTab() {
        const activeId = getActiveTabId();

        document.querySelectorAll('[data-tab-id]').forEach((link) => {
            const isActive = link.dataset.tabId === activeId;
            link.classList.toggle('is-active', isActive);
            if (isActive) link.setAttribute('aria-current', 'page');
            else link.removeAttribute('aria-current');
        });
    }

    // Swaps the page content in place instead of reloading (like wire:navigate).
    function navigate(url, { push = true } = {}) {
        const page = pageFromUrl(url);
        const from = currentUrl();
        const samePage = url.pathname === from.pathname && url.search === from.search;

        if (push) {
            try {
                pushUrl(url);
            } catch (error) {
                // pushState is refused for some file:// setups — fall back to a normal load.
                window.location.href = url.href;
                return;
            }
        }

        closeModal();

        if (samePage && push) {
            scrollToHash(url.hash, 'smooth');
        } else {
            renderPage(page);
            scrollToHash(url.hash, 'instant');
        }

        highlightActiveTab();
    }

    function initNavigation() {
        document.addEventListener('click', (event) => {
            const link = event.target.closest('a[href]');
            if (!link || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
            if (link.target || link.hasAttribute('download')) return;

            const url = new URL(link.href, window.location.href);
            if (url.origin !== window.location.origin || !pageFromUrl(url)) return;

            event.preventDefault();
            if (link.hasAttribute('data-nav-link')) playMenuSound();
            navigate(url);
        });

        window.addEventListener('popstate', () => navigate(currentUrl(), { push: false }));
        highlightActiveTab();
    }

    /* ------------------------------------------------------------------
       Home projects: show more + detail modal
       ------------------------------------------------------------------ */
    // Handlers are delegated from document so they keep working after the
    // page content is re-rendered by navigate().
    let lastModalTrigger = null;

    function openModal(index) {
        const modal = document.querySelector('[data-modal]');
        const panel = modal.querySelector('[data-modal-panel]');

        panel.innerHTML = modalContent(data.projects[index]);
        panel.scrollTop = 0;
        modal.classList.add('is-open');
        modal.setAttribute('aria-hidden', 'false');
        document.body.classList.add('no-scroll');
        panel.querySelector('[data-modal-close]').focus();
    }

    function closeModal({ restoreFocus = false } = {}) {
        const modal = document.querySelector('[data-modal]');
        if (!modal || !modal.classList.contains('is-open')) return;

        modal.classList.remove('is-open');
        modal.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('no-scroll');
        if (restoreFocus && lastModalTrigger?.isConnected) lastModalTrigger.focus();
    }

    function initProjects() {
        document.addEventListener('click', (event) => {
            const toggle = event.target.closest('[data-toggle-projects]');
            if (toggle) {
                const showAll = toggle.textContent === toggle.dataset.more;
                document.querySelectorAll('[data-extra]').forEach((card) => {
                    card.hidden = !showAll;
                });
                toggle.textContent = showAll ? toggle.dataset.less : toggle.dataset.more;
                return;
            }

            const card = event.target.closest('[data-project-index]');
            if (card) {
                lastModalTrigger = card;
                openModal(Number(card.dataset.projectIndex));
                return;
            }

            if (event.target.closest('[data-modal-close]') || event.target.matches('[data-modal]')) {
                closeModal({ restoreFocus: true });
            }
        });

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') closeModal({ restoreFocus: true });
        });
    }

    /* ------------------------------------------------------------------
       Project detail gallery
       ------------------------------------------------------------------ */
    function initGallery() {
        document.addEventListener('click', (event) => {
            const root = event.target.closest('[data-gallery]');
            if (!root) return;

            const thumbs = Array.from(root.querySelectorAll('[data-gallery-index]'));
            const images = thumbs.map((thumb) => thumb.querySelector('img').getAttribute('src'));
            const current = thumbs.findIndex((thumb) => thumb.classList.contains('is-active'));
            const step = event.target.closest('[data-gallery-step]');
            const thumb = event.target.closest('[data-gallery-index]');

            let next;
            if (step) next = current + Number(step.dataset.galleryStep);
            else if (thumb) next = Number(thumb.dataset.galleryIndex);
            else return;

            next = (next + images.length) % images.length;
            root.querySelector('[data-gallery-image]').src = images[next];
            root.querySelector('[data-gallery-link]').href = images[next];
            root.querySelector('[data-gallery-count]').textContent = `${next + 1} / ${images.length}`;
            thumbs.forEach((item, i) => {
                item.classList.toggle('is-active', i === next);
                if (i === next) item.setAttribute('aria-current', 'true');
                else item.removeAttribute('aria-current');
            });
        });
    }

    /* ------------------------------------------------------------------
       Space background: twinkling stars, a planet and shooting stars.
       Colours come from CSS tokens, so it follows light/dark mode.
       ------------------------------------------------------------------ */
    const random = (min, max) => min + Math.random() * (max - min);
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function renderStars(container) {
        const count = Math.min(180, Math.round((window.innerWidth * window.innerHeight) / 7000));

        container.innerHTML = Array.from({ length: count }, () => {
            const roll = Math.random();
            // Mostly tiny stars, a few medium ones, and rare sparkling ones.
            const size = roll < 0.7 ? random(1, 1.6) : roll < 0.95 ? random(1.8, 2.4) : random(2.6, 3.2);
            const sparkle = roll >= 0.95 ? ' star-sparkle' : '';
            const tone = ['', ' star-2', ' star-3'][Math.floor(Math.random() * 3)];
            const style = [
                `left:${random(0, 100).toFixed(2)}%`,
                `top:${random(0, 100).toFixed(2)}%`,
                `--size:${size.toFixed(1)}px`,
                `--duration:${random(2.5, 7).toFixed(2)}s`,
                `--delay:-${random(0, 7).toFixed(2)}s`,
                `--min:${random(0.1, 0.4).toFixed(2)}`,
                `--peak:${random(0.6, 1).toFixed(2)}`,
            ].join(';');

            return `<span class="star${tone}${sparkle}" style="${style}"></span>`;
        }).join('');
    }

    function launchShootingStar(bg) {
        const star = document.createElement('span');
        star.className = 'shooting-star';
        star.style.left = `${random(35, 100).toFixed(2)}%`;
        star.style.top = `${random(0, 45).toFixed(2)}%`;
        star.addEventListener('animationend', () => star.remove());
        bg.appendChild(star);
    }

    function initSpace() {
        const bg = document.querySelector('.page-bg');
        if (!bg) return;

        bg.innerHTML = '<div class="planet"></div><div data-stars></div>';
        const stars = bg.querySelector('[data-stars]');
        renderStars(stars);

        // Star positions are percentages, so only re-scatter when the width changes —
        // mobile browsers fire resize on scroll as the address bar hides/shows.
        let lastWidth = window.innerWidth;
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                if (window.innerWidth === lastWidth) return;
                lastWidth = window.innerWidth;
                renderStars(stars);
            }, 250);
        });

        if (prefersReducedMotion) return;

        (function scheduleShootingStar() {
            setTimeout(() => {
                if (!document.hidden) launchShootingStar(bg);
                scheduleShootingStar();
            }, random(4000, 10000));
        })();
    }

    /* ------------------------------------------------------------------
       Boot
       ------------------------------------------------------------------ */
    renderComponents();

    // A hash route (file:// mode) may point at a different page than the file that was opened.
    const initialPage = pageFromUrl(currentUrl());
    if (initialPage && initialPage.id !== document.body.dataset.page) renderPage(initialPage);

    initTheme();
    initNavigation();
    initProjects();
    initGallery();
    initSpace();

    // Opening index.html#contact directly: scroll once the content is rendered.
    if (currentUrl().hash) scrollToHash(currentUrl().hash, 'instant');
})();
