/**
 * Nurul Arefin Nabil — Portfolio & Tuition Application Logic
 * Interactive scripts for theme, GitHub projects, Tuition Fee estimator, & Modal handling.
 */

document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    initTheme();
    initGitHubProjects();
    initTuitionCalculator();
    initTuitionModal();
});

/* ==========================================================================
   1. Navbar & Mobile Menu
   ========================================================================== */
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Sticky glass header on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Active link scrollSpy
        let currentSection = '';
        const sections = document.querySelectorAll('section[id]');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.offsetHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    });

    // Mobile menu toggle
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const icon = mobileToggle.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-xmark');
            }
        });

        // Close mobile menu on link click
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                const icon = mobileToggle.querySelector('i');
                if (icon) {
                    icon.classList.add('fa-bars');
                    icon.classList.remove('fa-xmark');
                }
            });
        });
    }
}

/* ==========================================================================
   2. Dark / Light Theme Switcher
   ========================================================================== */
function initTheme() {
    const themeBtn = document.getElementById('themeToggle');
    const savedTheme = localStorage.getItem('nabil_portfolio_theme') || 'dark';

    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('nabil_portfolio_theme', newTheme);
            updateThemeIcon(newTheme);
        });
    }
}

function updateThemeIcon(theme) {
    const themeBtn = document.getElementById('themeToggle');
    if (!themeBtn) return;
    const icon = themeBtn.querySelector('i');
    if (icon) {
        if (theme === 'dark') {
            icon.className = 'fa-solid fa-sun';
        } else {
            icon.className = 'fa-solid fa-moon';
        }
    }
}

/* ==========================================================================
   3. GitHub Featured Repos Showcase
   ========================================================================== */
const FEATURED_REPOS_FALLBACK = [
    {
        name: 'ADS-POS_Web_Software',
        description: 'Comprehensive Web Point-of-Sale (POS) & Inventory Management software built with PHP, MySQL & responsive UI.',
        language: 'PHP',
        stargazers_count: 5,
        html_url: 'https://github.com/arefin-nabil/ADS-POS_Web_Software',
        category: 'web'
    },
    {
        name: 'BD-snakes',
        description: 'Interactive Snake Arcade Game created in Java with Object-Oriented Architecture, graphics rendering & high-score tracking.',
        language: 'Java',
        stargazers_count: 8,
        html_url: 'https://github.com/arefin-nabil/BD-snakes',
        category: 'java'
    },
    {
        name: 'Beetech_Supershop',
        description: 'E-commerce SuperShop backend & frontend solution with multi-role user dashboards, checkout & product catalog.',
        language: 'PHP',
        stargazers_count: 6,
        html_url: 'https://github.com/arefin-nabil/Beetech_Supershop',
        category: 'web'
    },
    {
        name: 'BuyNTAKE',
        description: 'Smart E-Commerce & Multi-Level Marketing (MLM) platform with 21 generation levels & 13 fund distributions.',
        language: 'JavaScript',
        stargazers_count: 12,
        html_url: 'https://github.com/arefin-nabil/BuyNTAKE',
        category: 'web'
    },
    {
        name: 'Algorithm',
        description: 'Comprehensive repository learning Data Structures & Algorithms using C++ with optimal time & space complexity solutions.',
        language: 'C++',
        stargazers_count: 4,
        html_url: 'https://github.com/arefin-nabil/Algorithm',
        category: 'cpp'
    },
    {
        name: 'BMI-Calculator',
        description: 'Mobile Health & BMI Utility App built with Java/Android featuring real-time BMI classification & ideal weight suggestions.',
        language: 'Java',
        stargazers_count: 3,
        html_url: 'https://github.com/arefin-nabil/BMI-Calculator',
        category: 'mobile'
    }
];

function initGitHubProjects() {
    const gridContainer = document.getElementById('projectsGrid');
    const filterBtns = document.querySelectorAll('.filter-btn');

    if (!gridContainer) return;

    renderProjects(FEATURED_REPOS_FALLBACK, 'all');

    // Live API fetch to enrich repository stars
    fetch('https://api.github.com/users/arefin-nabil/repos?per_page=100')
        .then(res => res.json())
        .then(data => {
            if (Array.isArray(data)) {
                // Update star counts if available
                FEATURED_REPOS_FALLBACK.forEach(repo => {
                    const match = data.find(r => r.name.toLowerCase() === repo.name.toLowerCase());
                    if (match && match.stargazers_count !== undefined) {
                        repo.stargazers_count = match.stargazers_count;
                    }
                });
                const currentFilter = document.querySelector('.filter-btn.active')?.dataset.filter || 'all';
                renderProjects(FEATURED_REPOS_FALLBACK, currentFilter);
            }
        })
        .catch(err => console.log('Using local fallback for GitHub repos:', err));

    // Filter Button listeners
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.dataset.filter;
            renderProjects(FEATURED_REPOS_FALLBACK, filter);
        });
    });
}

function renderProjects(projects, filter) {
    const gridContainer = document.getElementById('projectsGrid');
    if (!gridContainer) return;

    const filtered = filter === 'all' 
        ? projects 
        : projects.filter(p => p.category === filter || p.language?.toLowerCase() === filter);

    gridContainer.innerHTML = filtered.map(repo => `
        <div class="glass-card project-card">
            <div class="project-top">
                <div class="project-header-row">
                    <i class="fa-regular fa-folder-closed project-folder-icon"></i>
                    <div class="project-links">
                        <a href="${repo.html_url}" target="_blank" title="View Source Code" class="project-link-icon">
                            <i class="fa-brands fa-github"></i>
                        </a>
                        <a href="${repo.html_url}" target="_blank" title="Open Repository" class="project-link-icon">
                            <i class="fa-solid fa-arrow-up-right-from-square"></i>
                        </a>
                    </div>
                </div>
                <h3 class="project-name">${escapeHtml(repo.name)}</h3>
                <p class="project-description">${escapeHtml(repo.description)}</p>
            </div>
            <div class="project-footer">
                <span class="project-lang">
                    <span class="lang-dot"></span> ${repo.language || 'Code'}
                </span>
                <span class="project-stars">
                    <i class="fa-solid fa-star"></i> ${repo.stargazers_count || 0}
                </span>
            </div>
        </div>
    `).join('');
}

/* ==========================================================================
   4. Tuition Fee Estimator Logic
   ========================================================================== */
function initTuitionCalculator() {
    const classSelect = document.getElementById('calcClass');
    const daysSelect = document.getElementById('calcDays');
    const modeSelect = document.getElementById('calcMode');
    const resultElement = document.getElementById('calcResult');

    if (!classSelect || !daysSelect || !modeSelect || !resultElement) return;

    const calculateFee = () => {
        const classVal = classSelect.value; // e.g. '8-10', 'hsc', 'admission', 'coding'
        const days = parseInt(daysSelect.value) || 3;
        const mode = modeSelect.value; // 'home' or 'online'

        let baseRatePerDay = 1500;

        if (classVal === '8-10') baseRatePerDay = 1500;
        else if (classVal === 'hsc') baseRatePerDay = 2000;
        else if (classVal === 'admission') baseRatePerDay = 2500;
        else if (classVal === 'coding') baseRatePerDay = 3000;

        let totalFee = baseRatePerDay * days;

        if (mode === 'online') {
            totalFee = Math.round(totalFee * 0.8); // 20% discount for online live tuition
        }

        // Format to BDT string
        resultElement.textContent = `৳ ${totalFee.toLocaleString('en-BD')} / মাস`;
    };

    classSelect.addEventListener('change', calculateFee);
    daysSelect.addEventListener('change', calculateFee);
    modeSelect.addEventListener('change', calculateFee);

    calculateFee();
}

/* ==========================================================================
   5. Tuition Modal & Application Submission Handler
   ========================================================================== */
function initTuitionModal() {
    const modal = document.getElementById('tuitionModal');
    const openBtns = document.querySelectorAll('.open-tuition-modal');
    const closeBtn = document.getElementById('modalCloseBtn');
    const form = document.getElementById('tuitionApplyForm');

    openBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            if (modal) modal.classList.add('active');
        });
    });

    if (closeBtn && modal) {
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('active');
        });

        // Close on clicking overlay background
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    }

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const studentName = document.getElementById('appStudentName').value.trim();
            const guardianPhone = document.getElementById('appPhone').value.trim();
            const studentClass = document.getElementById('appClass').value;
            const medium = document.getElementById('appMedium').value;
            const location = document.getElementById('appLocation').value.trim();
            const mode = document.getElementById('appMode').value;
            const schedule = document.getElementById('appSchedule').value;
            const notes = document.getElementById('appNotes').value.trim();

            // Subjects multi-select checklist
            const selectedSubjects = Array.from(document.querySelectorAll('input[name="subject"]:checked'))
                .map(cb => cb.value);

            if (!studentName || !guardianPhone || selectedSubjects.length === 0) {
                alert('অনুগ্রহ করে শিক্ষার্থীর নাম, ফোন নম্বর এবং অন্তত ১টি বিষয় নির্বাচন করুন।');
                return;
            }

            const applicationData = {
                studentName,
                guardianPhone,
                studentClass,
                medium,
                location,
                mode,
                schedule,
                subjects: selectedSubjects.join(', '),
                notes,
                appliedAt: new Date().toLocaleString('bn-BD')
            };

            // Save to localStorage list
            const existingApps = JSON.parse(localStorage.getItem('nabil_tuition_apps') || '[]');
            existingApps.push(applicationData);
            localStorage.setItem('nabil_tuition_apps', JSON.stringify(existingApps));

            // Generate formatted WhatsApp message text
            const waText = encodeURIComponent(
                `*🎓 নতুন টিউশন আবেদন (Nurul Arefin Nabil Portfolio)*\n\n` +
                `👤 *শিক্ষার্থীর নাম:* ${studentName}\n` +
                `📞 *ফোন নম্বর:* ${guardianPhone}\n` +
                `📚 *শ্রেণী/লেভেল:* ${studentClass}\n` +
                `🏫 *মাধ্যম:* ${medium}\n` +
                `📖 *প্রয়োজনীয় বিষয়:* ${selectedSubjects.join(', ')}\n` +
                `📍 *লোকেশন:* ${location || 'N/A'}\n` +
                `💻 *পদ্ধতি:* ${mode}\n` +
                `🗓️ *সাপ্তাহিক দিন:* ${schedule}\n` +
                (notes ? `📝 *বিশেষ নোট:* ${notes}` : '')
            );

            // WhatsApp direct link for Nurul Arefin Nabil
            const whatsappNumber = '8801700000000'; // Target contact number
            const waUrl = `https://wa.me/${whatsappNumber}?text=${waText}`;

            // Show Confirmation Modal / Screen
            if (modal) modal.classList.remove('active');

            showApplicationSuccessModal(applicationData, waUrl);

            form.reset();
        });
    }
}

function showApplicationSuccessModal(data, waUrl) {
    const confirmOverlay = document.createElement('div');
    confirmOverlay.className = 'modal-overlay active';
    confirmOverlay.style.zIndex = '3000';

    confirmOverlay.innerHTML = `
        <div class="modal-container" style="max-width: 520px; text-align: center;">
            <div style="font-size: 3.5rem; color: #10b981; margin-bottom: 1rem;">
                <i class="fa-solid fa-circle-check"></i>
            </div>
            <h2 class="modal-title">আবেদন সফল হয়েছে! 🎉</h2>
            <p class="modal-subtitle" style="margin-bottom: 1.5rem;">
                ধন্যবাদ <strong>${escapeHtml(data.studentName)}</strong>! আপনার টিউশন আবেদনটি গ্রহণ করা হয়েছে।
            </p>
            
            <div style="background: rgba(255,255,255,0.05); padding: 1.25rem; border-radius: 12px; text-align: left; font-size: 0.9rem; margin-bottom: 1.5rem; border: 1px solid rgba(255,255,255,0.1);">
                <p><strong>শ্রেণী:</strong> ${escapeHtml(data.studentClass)} (${escapeHtml(data.medium)})</p>
                <p><strong>বিষয়:</strong> ${escapeHtml(data.subjects)}</p>
                <p><strong>ফোন:</strong> ${escapeHtml(data.guardianPhone)}</p>
                <p><strong>পদ্ধতি:</strong> ${escapeHtml(data.mode)}</p>
            </div>

            <div style="display: flex; flex-direction: column; gap: 0.75rem;">
                <a href="${waUrl}" target="_blank" class="btn btn-accent btn-lg" style="width: 100%;">
                    <i class="fa-brands fa-whatsapp" style="font-size: 1.3rem;"></i> হোয়াটসঅ্যাপে নিশ্চিত করুন (১-ক্লিক)
                </a>
                <button class="btn btn-secondary close-success-modal" style="width: 100%;">
                    বন্ধ করুন
                </button>
            </div>
        </div>
    `;

    document.body.appendChild(confirmOverlay);

    confirmOverlay.querySelector('.close-success-modal').addEventListener('click', () => {
        confirmOverlay.remove();
    });

    confirmOverlay.addEventListener('click', (e) => {
        if (e.target === confirmOverlay) {
            confirmOverlay.remove();
        }
    });
}

/* Helper function to prevent XSS injection */
function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/[&<>"']/g, function(m) {
        return {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        }[m];
    });
}
