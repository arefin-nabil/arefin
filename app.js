/**
 * Nurul Arefin Nabil — Portfolio, ICT Syllabus & Projects Portal Logic
 * Includes Dual Theme, Dynamic Language Switcher (BN <-> EN), Particle Canvas, Custom Cursor & WhatsApp Launcher.
 */

// 📱 আপনার নিজস্ব হোয়াটসঅ্যাপ নম্বর (01881196146)
const MY_WHATSAPP_NUMBER = '8801881196146';

document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    initTheme();
    initLanguageSwitcher();
    initBackgroundParticles();
    initCustomCursor();
    initScrollReveal();
    initGitHubProjects();
    initVisitorCounter();
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

    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

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

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const icon = mobileToggle.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-xmark');
            }
        });

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
   2. Refined Dual Theme Switcher (Dark & Light)
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
    if (themeBtn) {
        const icon = themeBtn.querySelector('i');
        if (icon) {
            if (theme === 'light') {
                icon.className = 'fa-solid fa-moon';
            } else {
                icon.className = 'fa-solid fa-sun';
            }
        }
    }
}

/* ==========================================================================
   3. Comprehensive Language Switcher (Bangla <-> English)
   ========================================================================== */
function initLanguageSwitcher() {
    const langBtn = document.getElementById('langToggle');
    if (!langBtn) return;

    let currentLang = localStorage.getItem('nabil_lang') || 'bn';

    applyLanguage(currentLang);

    langBtn.addEventListener('click', () => {
        currentLang = currentLang === 'bn' ? 'en' : 'bn';
        localStorage.setItem('nabil_lang', currentLang);
        applyLanguage(currentLang);
    });
}

function applyLanguage(lang) {
    const langText = document.getElementById('langText');
    if (langText) {
        langText.textContent = lang === 'bn' ? 'EN' : 'বাংলা';
    }

    document.documentElement.setAttribute('lang', lang);

    const i18nDictionary = {
        bn: {
            brandSubtitle: "ICT & CSE Educator",
            navHome: "হোম",
            navWhy: "কেন শিখবেন?",
            navEdu: "শিক্ষাগত যোগ্যতা",
            navTuition: "টিউশন বিষয়সমূহ",
            navSyllabus: "সিলেবাস পেজ",
            navProjects: "প্রজেক্টস পেজ",
            navContact: "যোগাযোগ",
            statusBadge: "বরমী, মাওনা ও শ্রীপুরে ICT (আইসিটি) স্পেশালিস্ট টিউশন চালু আছে",
            heroTitle: "হাই, আমি <span class=\"text-gradient\">নূরুল আরেফিন নাবিল</span>",
            heroFocusTag: "<i class=\"fa-solid fa-star\"></i> ICT (আইসিটি) স্পেশালিস্ট প্রাইভেট টিউটর — শ্রীপুর, মাওনা ও বরমী",
            heroDesc: "আমি একজন <strong>কম্পিউটার সায়েন্স অ্যান্ড ইঞ্জিনিয়ারিং (B.Sc in CSE) গ্র্যাজুয়েট</strong>। আমার মূল অগ্রাধিকার হল ৯ম-১০ম (SSC) ও একাদশ-দ্বাদশ (HSC) শিক্ষার্থীদের <strong>ICT (আইসিটি)</strong> বিষয়ে প্র্যাকটিক্যাল কোডিং ও ১০০% এ+ উপযোগী প্রস্তুতি প্রদান করা। পাশাপাশি বরমী, মাওনা ও শ্রীপুর এলাকায় <strong>বাংলা, ইংরেজি ও বিজ্ঞান বিষয়সমূহ (পদার্থ, রসায়ন, গণিত)</strong>-এর বিশেষ প্রাইভেট টিচিং দেওয়া হয়।",
            heroBtnTalk: "<i class=\"fa-brands fa-whatsapp\"></i> হোয়াটসঅ্যাপে কথা বলুন",
            heroBtnSyllabus: "<i class=\"fa-solid fa-book-open\"></i> SSC ও HSC এর সম্পূর্ণ সিলেবাস পেজ দেখুন ➔",
            statSreepurRank: "SSC-তে শ্রীপুর উপজেলায় ১ম স্থান",
            statExp: "আইসিটি ও একাডেমিক টিচিং",
            statStudents: "সফল শিক্ষার্থী মেন্টরড",
            whyTitle: "আমার কাছে <span class=\"text-gradient\">কেন শিখবেন?</span>",
            whySubtitle: "অন্ধের মতো মুখস্থ নয়, প্র্যাকটিক্যালি কোডিং ও প্রযুক্তিকে ভালোবাসতে শেখানোই আমার মূল লক্ষ্য",
            whyPt1Title: "কম্পিউটার/ল্যাপটপে প্র্যাকটিক্যাল কোডিং",
            whyPt1Desc: "পড়ার টেবিলে বসেই নিজের ল্যাপটপ ও কম্পিউটারের মাধ্যমে সরাসরি কোড টাইপ করে স্ক্রীনে আউটপুট দেখা এবং প্র্যাকটিক্যালি শেখানো হয়।",
            whyPt2Title: "হ্যান্ডরাইটিং ও ডিজিটাল স্পেশাল নোটস",
            whyPt2Desc: "প্রতিটি অধ্যায়ের সহজ ভাষায় গোছানো স্পেশাল নোটস তৈরি করে দেওয়া হয়, যা পরীক্ষার আগে রিভিশনের জন্য অত্যন্ত কার্যকরী।",
            whyPt3Title: "অধ্যায়ভিত্তিক কুইজ ও মডেল টেস্ট",
            whyPt3Desc: "প্রতিটি অধ্যায় শেষ হওয়ার পর CQ ও MCQ প্রশ্নের ওপর স্পেশাল টেস্ট নেওয়া হয় এবং প্রতিটি ভুলের আলাদা সলিউশন শিট দেওয়া হয়।",
            whyPt4Title: "বিগত সালের বোর্ড প্রশ্ন সমাধান",
            whyPt4Desc: "ঢাকা, চট্টগ্রাম, রাজশাহী সহ সকল শিক্ষা বোর্ডের বিগত ৫-১০ বছরের প্রশ্নপত্র টাইপ ধরে ধরে পারফেক্টভাবে সমাধান করানো হয়।",
            whyPt5Title: "এআই (AI) ভিত্তিক স্মার্ট লার্নিং সুযোগ",
            whyPt5Desc: "আর্টিফিশিয়াল ইন্টেলিজেন্স (AI) যুগে কীভাবে ChatGPT, Claude & GitHub Copilot এর মাধ্যমে কঠিন লজিক দ্রুত বোঝা, কোডের ভুল (Bug) ধরা এবং স্মার্ট স্টাডি টেকনিক ব্যবহার করা যায়—তার প্র্যাকটিক্যাল গাইডলাইন দেওয়া হয়।",
            eduTitle: "শিক্ষাগত <span class=\"text-accent-gradient\">যোগ্যতা ও ব্যাকগ্রাউন্ড</span>",
            eduSubtitle: "কম্পিউটার সায়েন্স অ্যান্ড ইঞ্জিনিয়ারিং (CSE) ব্যাকগ্রাউন্ড ও শিক্ষাগত কৃতিত্ব",
            bscDesc: "কম্পিউটার সায়েন্স অ্যান্ড ইঞ্জিনিয়ারিং (CSE)-এ বি.এস.সি সম্পন্ন করা (CGPA 3.70+ Out of 4.00)। সফটওয়্যার ইঞ্জিনিয়ারিং, মোবাইল অ্যাপ ডেভেলপমেন্ট (Flutter/Android), ডেটা স্ট্রাকচার ও সি প্রোগ্রামিং অ্যালগরিদমে বিশেষ পারদর্শিতা।",
            hscDesc: "বিজ্ঞান বিভাগ (Science Group) থেকে জিপিএ ৫.০০ (GPA 5.00) অর্জন। আইসিটি (ICT), গণিত ও পদার্থবিজ্ঞানে বিশেষ কৃতিত্ব।",
            sscDesc: "বিজ্ঞান বিভাগ (Science Group) থেকে জিপিএ ৫.০০ (GPA 5.00) অর্জন এবং শ্রীপুর উপজেলায় ১ম স্থান অর্জন।",
            tuitionTitle: "টিউশন <span class=\"text-accent-gradient\">বিষয়সমূহ ও সেবা</span>",
            tuitionSubtitle: "৯ম-১০ম ও একাদশ-দ্বাদশ শ্রেণীর বিষয়ভিত্তিক বিশেষ টিচিং সার্ভিসেস",
            catAcademicTitle: "একাডেমিক টিউশন (মূল প্রায়োরিটি)",
            catSkillTitle: "স্কিল ডেভেলপমেন্ট ও প্রোগ্রামিং (অতিরিক্ত সেবা)",
            subjIctDesc: "C প্রোগ্রামিং, HTML ওয়েব পেজ, সংখ্যা পদ্ধতি (Binary/Hex), লজিক গেট, বুলিয়ান অ্যালজেব্রা এবং ডেটাবেজ (SQL)-এর এ টু জেড প্র্যাকটিক্যালি ল্যাপটপে কোড টাইপ করে ১০০% পারফেক্ট প্রস্তুতি।",
            subjBanglaDesc: "ব্যাকরণ, গ্রামার, ফ্রি রাইটিং, রিডিং কমপ্রিহেনশন এবং সাহিত্য অংশের পূর্ণাঙ্গ ক্লাস ও নিয়মিত হোমওয়ার্ক চেকিং।",
            subjScienceDesc: "পদার্থবিজ্ঞান, রসায়ন ও উচ্চতর গণিতের মূল থিওরি, গাণিতিক প্রবলেম সলভিং এবং CQ গাণিতিক কনসেপ্ট ক্লিয়ারিং।",
            subjAppDesc: "নিজের ফোনে রান করার মতো রিয়েল অ্যাপ বানানো, UI কাস্টমাইজেশন ও বেসিক মোবাইল অ্যাপস ডেভেলপমেন্ট কোর্স।",
            subjCppDesc: "প্রোগ্রামিংয়ের লজিক তৈরি, লুপ, অ্যারে, পয়েন্টার, ফাংশন ও বেসিক অবজেক্ট ওরিয়েন্টেড কনসেপ্ট।",
            teachingModeHeading: "🏠 কোথায় কোথায় পড়ানো হয়?",
            parentAssuranceHeading: "👨‍👩‍👧 অভিভাবকদের প্রতি নিশ্চয়তা",
            formTitle: "টিউশন ও ফ্রি ডেমো ক্লাসের <span class=\"text-accent-gradient\">সহজ আবেদন</span>",
            formSubtitle: "মাত্র ৪টি তথ্য পূরণ করে ১-ক্লিকে হোয়াটসঅ্যাপে আবেদন বা ফ্রি ডেমো ক্লাস বুক করুন",
            lblStudentName: "১. শিক্ষার্থীর নাম *",
            lblPhone: "২. মোবাইল নম্বর *",
            lblSubject: "৩. প্রয়োজনীয় বিষয় / ডেমো ক্লাস নির্বাচন করুন *",
            lblArea: "৪. আপনার এলাকা *",
            btnSubmitForm: "<i class=\"fa-brands fa-whatsapp\"></i> সরাসরি হোয়াটসঅ্যাপে কথা বলুন ➔",
            projPreviewTitle: "লাইভ অ্যাপস ও <span class=\"text-gradient\">প্রজেক্টসমূহ</span>",
            projPreviewSub: "প্লে-স্টোরে লাইভ মোবাইল অ্যাপ \"সাপ ও বন্যপ্রাণী রেসকিউ বিডি\", আপকামিং প্রজেক্টস ও গিটহাব সোর্স কোড আলাদা পেজে দেখুন",
            btnViewAllProjects: "<i class=\"fa-solid fa-laptop-code\"></i> সকল প্রজেক্টস ও লাইভ অ্যাপস পেজে যান ➔",
            contactTitle: "সরাসরি <span class=\"text-gradient\">যোগাযোগ করুন</span>",
            contactSubtitle: "আইসিটি ও একাডেমিক টিউশনি বা প্রজেক্টের বিষয়ে কথা বলুন",
            contactCardTitle: "যোগাযোগের ঠিকানা",
            directMessageTitle: "সরাসরি মেসেজ পাঠান",
            directMessageDesc: "ফরম পূরণ করে সাবমিট করলেই ১-ক্লিকে হোয়াটসঅ্যাপ মেসেজ তৈরি হয়ে যাবে।",
            contactNameLbl: "আপনার নাম",
            contactPhoneLbl: "ইমেইল / ফোন নম্বর",
            contactMsgLbl: "মেসেজ",
            btnSendWhatsApp: "<i class=\"fa-brands fa-whatsapp\"></i> হোয়াটসঅ্যাপে মেসেজ পাঠান ➔"
        },
        en: {
            brandSubtitle: "ICT & CSE Educator",
            navHome: "Home",
            navWhy: "Why Me?",
            navEdu: "Education",
            navTuition: "Tuition Subjects",
            navSyllabus: "Syllabus Page",
            navProjects: "Projects Page",
            navContact: "Contact",
            statusBadge: "Specialist ICT Tuition Available in Barmi, Mawna & Sreepur",
            heroTitle: "Hi, I am <span class=\"text-gradient\">Nurul Arefin Nabil</span>",
            heroFocusTag: "<i class=\"fa-solid fa-star\"></i> Specialist ICT Private Educator — Sreepur, Mawna & Barmi",
            heroDesc: "I am a <strong>Computer Science & Engineering (B.Sc in CSE) Graduate</strong>. My primary priority is providing 100% board exam preparation and practical coding for Class 9-10 (SSC) and Class 11-12 (HSC) in <strong>ICT</strong> alongside private tuition for <strong>Bangla, English & Science subjects</strong>.",
            heroBtnTalk: "<i class=\"fa-brands fa-whatsapp\"></i> Chat on WhatsApp",
            heroBtnSyllabus: "<i class=\"fa-solid fa-book-open\"></i> View Complete SSC & HSC ICT Syllabus ➔",
            statSreepurRank: "Ranked 1st in Sreepur Upazila (SSC)",
            statExp: "ICT & Academic Teaching Exp.",
            statStudents: "Successful Students Mentored",
            whyTitle: "Why <span class=\"text-gradient\">Learn With Me?</span>",
            whySubtitle: "Not blind memorization, but practical learning and mastering technology is my primary goal",
            whyPt1Title: "Practical Coding on Computer/Laptop",
            whyPt1Desc: "Learn hands-on by typing code directly on laptops/computers, observing real-time screen outputs and practical execution.",
            whyPt2Title: "Handwritten & Digital Special Notes",
            whyPt2Desc: "Structured chapter notes provided in simple language for rapid and effective exam revisions.",
            whyPt3Title: "Chapter Tests & Model Exams",
            whyPt3Desc: "Regular CQ & MCQ exams after completing each chapter with individualized solution sheets.",
            whyPt4Title: "Past Board Question Solutions",
            whyPt4Desc: "Comprehensive solution coverage for past 5-10 years board questions across Dhaka, Chittagong & Rajshahi boards.",
            whyPt5Title: "AI-Powered Smart Learning",
            whyPt5Desc: "Learn how to leverage ChatGPT, Claude & GitHub Copilot for rapid logic understanding and smart study techniques.",
            eduTitle: "Academic <span class=\"text-accent-gradient\">Qualifications & Background</span>",
            eduSubtitle: "Computer Science & Engineering (CSE) academic achievements",
            bscDesc: "Graduated with B.Sc in CSE (CGPA 3.70+ Out of 4.00). Specialized in Software Engineering, Mobile App Development (Flutter/Android), and Data Structures.",
            hscDesc: "Achieved GPA 5.00 Out of 5.00 in HSC Science. Outstanding grades in ICT, Mathematics & Physics.",
            sscDesc: "Achieved GPA 5.00 Out of 5.00 in SSC Science. Ranked 1st place in Sreepur Upazila.",
            tuitionTitle: "Tuition <span class=\"text-accent-gradient\">Subjects & Offerings</span>",
            tuitionSubtitle: "Specialized academic teaching services for Class 9-10 (SSC) and Class 11-12 (HSC)",
            catAcademicTitle: "Academic Tuition (Primary Priority)",
            catSkillTitle: "Skill Development & Coding (Secondary Priority)",
            subjIctDesc: "100% complete board preparation for C Programming, HTML Web Design, Number Systems, Logic Gates, and SQL Databases with practical laptop coding.",
            subjBanglaDesc: "Comprehensive grammar, free writing, reading comprehension, and literature analysis with regular homework feedback.",
            subjScienceDesc: "Core theories, mathematical problem solving, and CQ math concept clearing for Physics, Chemistry & Higher Math.",
            subjAppDesc: "Hands-on cross-platform Flutter/Android mobile app development course from UI design to building real apps.",
            subjCppDesc: "Programming logic construction, loops, arrays, functions, pointers, and Object-Oriented Programming (OOP) basics.",
            teachingModeHeading: "🏠 Teaching Locations & Modes",
            parentAssuranceHeading: "👨‍👩‍👧 Assurance to Parents",
            formTitle: "Tuition & Free Demo Class <span class=\"text-accent-gradient\">Application Hub</span>",
            formSubtitle: "Fill out 4 simple details to send a 1-click application or book a free trial demo class via WhatsApp",
            lblStudentName: "1. Student Name *",
            lblPhone: "2. Mobile Number *",
            lblSubject: "3. Select Required Subject / Free Demo *",
            lblArea: "4. Your Location *",
            btnSubmitForm: "<i class=\"fa-brands fa-whatsapp\"></i> Chat Directly on WhatsApp ➔",
            projPreviewTitle: "Live Apps & <span class=\"text-gradient\">Projects Showcase</span>",
            projPreviewSub: "View Play Store live mobile app \"Rescue BD\", upcoming projects, and open-source GitHub repositories on dedicated page",
            btnViewAllProjects: "<i class=\"fa-solid fa-laptop-code\"></i> Go to Projects & Live Apps Page ➔",
            contactTitle: "Get in <span class=\"text-gradient\">Touch Directly</span>",
            contactSubtitle: "Contact for private tuition inquiries or software projects",
            contactCardTitle: "Contact Details",
            directMessageTitle: "Send Direct Message",
            directMessageDesc: "Fill form and submit to create a 1-click WhatsApp message.",
            contactNameLbl: "Your Name",
            contactPhoneLbl: "Email / Phone Number",
            contactMsgLbl: "Message",
            btnSendWhatsApp: "<i class=\"fa-brands fa-whatsapp\"></i> Send Message via WhatsApp ➔"
        }
    };

    const dict = i18nDictionary[lang] || i18nDictionary['bn'];

    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (dict[key]) {
            el.innerHTML = dict[key];
        }
    });
}

/* ==========================================================================
   4. Live Website Visitor Counter System
   ========================================================================== */
function initVisitorCounter() {
    let count = localStorage.getItem('nabil_visitor_count');

    if (!count) {
        count = Math.floor(Math.random() * (790 - 750 + 1)) + 750;
    } else {
        count = parseInt(count, 10) + 1;
    }

    localStorage.setItem('nabil_visitor_count', count.toString());

    const visitorEls = document.querySelectorAll('.visitor-count-number');
    visitorEls.forEach(el => {
        el.textContent = count.toLocaleString('bn-BD');
    });
}

/* ==========================================================================
   5. Interactive Particle Canvas Background Engine
   ========================================================================== */
function initBackgroundParticles() {
    const canvas = document.getElementById('bgCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    let particles = [];
    const particleCount = Math.min(Math.floor(width / 22), 65);

    const mouse = {
        x: null,
        y: null,
        radius: 140
    };

    window.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    window.addEventListener('mouseleave', () => {
        mouse.x = null;
        mouse.y = null;
    });

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = (Math.random() - 0.5) * 0.75;
            this.vy = (Math.random() - 0.5) * 0.75;
            this.radius = Math.random() * 2 + 1.2;
        }

        draw() {
            const isLight = document.documentElement.getAttribute('data-theme') === 'light';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = isLight ? 'rgba(99, 102, 241, 0.45)' : 'rgba(99, 102, 241, 0.65)';
            ctx.fill();
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            if (this.x < 0 || this.x > width) this.vx *= -1;
            if (this.y < 0 || this.y > height) this.vy *= -1;

            if (mouse.x && mouse.y) {
                let dx = mouse.x - this.x;
                let dy = mouse.y - this.y;
                let dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < mouse.radius) {
                    let angle = Math.atan2(dy, dx);
                    let force = (mouse.radius - dist) / mouse.radius;
                    this.x -= Math.cos(angle) * force * 3;
                    this.y -= Math.sin(angle) * force * 3;
                }
            }

            this.draw();
        }
    }

    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);
        const isLight = document.documentElement.getAttribute('data-theme') === 'light';

        for (let i = 0; i < particles.length; i++) {
            particles[i].update();

            for (let j = i + 1; j < particles.length; j++) {
                let dx = particles[i].x - particles[j].x;
                let dy = particles[i].y - particles[j].y;
                let dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 115) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    let alpha = (1 - dist / 115) * 0.22;
                    ctx.strokeStyle = isLight ? `rgba(99, 102, 241, ${alpha * 0.8})` : `rgba(99, 102, 241, ${alpha})`;
                    ctx.lineWidth = 0.8;
                    ctx.stroke();
                }
            }
        }
        requestAnimationFrame(animate);
    }
    animate();
}

/* ==========================================================================
   6. Custom Cursor Ring & Follower
   ========================================================================== */
function initCustomCursor() {
    const cursor = document.getElementById('customCursor');
    const follower = document.getElementById('cursorFollower');
    if (!cursor || !follower) return;

    let mouseX = 0, mouseY = 0;
    let posX = 0, posY = 0;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
    });

    function renderFollower() {
        posX += (mouseX - posX) * 0.16;
        posY += (mouseY - posY) * 0.16;
        follower.style.transform = `translate3d(${posX}px, ${posY}px, 0) translate(-50%, -50%)`;
        requestAnimationFrame(renderFollower);
    }
    renderFollower();

    const hoverables = document.querySelectorAll('a, button, .glass-card, input, select, textarea');
    hoverables.forEach(el => {
        el.addEventListener('mouseenter', () => {
            follower.style.transform = `translate3d(${posX}px, ${posY}px, 0) translate(-50%, -50%) scale(1.6)`;
            follower.style.borderColor = 'var(--secondary)';
            follower.style.backgroundColor = 'rgba(6, 182, 212, 0.12)';
        });
        el.addEventListener('mouseleave', () => {
            follower.style.transform = `translate3d(${posX}px, ${posY}px, 0) translate(-50%, -50%) scale(1)`;
            follower.style.borderColor = 'var(--primary)';
            follower.style.backgroundColor = 'transparent';
        });
    });
}

/* ==========================================================================
   7. Scroll Reveal Animation
   ========================================================================== */
function initScrollReveal() {
    const revealEls = document.querySelectorAll('.glass-card, .section-header, .stat-item, .contact-item, .timeline-item');
    revealEls.forEach(el => el.classList.add('reveal'));

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, { threshold: 0.1 });

    revealEls.forEach(el => observer.observe(el));
}

/* ==========================================================================
   8. GitHub Repos Showcase Loader with User Provided URLs
   ========================================================================== */
function initGitHubProjects() {
    const grid = document.getElementById('projectsGrid');
    if (!grid) return;

    const actualUserRepos = [
        {
            name: "Beetech_Supershop",
            description: "POS (Point of Sale) Management Software designed for supershop operations, product inventory, billing, and sales analytics.",
            language: "Html / Css / JavaScript / SQL",
            stars: 18,
            category: "web",
            url: "https://github.com/arefin-nabil/Beetech_Supershop"
        },
        {
            name: "Data_Structure",
            description: "Complete Data Structure implementations including LinkedList, Trees, Graphs, Stacks & Queues in C/C++.",
            language: "C / C++",
            stars: 22,
            category: "cpp",
            url: "https://github.com/arefin-nabil/Data_Structure"
        },
        {
            name: "Algorithm",
            description: "Advanced Competitive Programming Algorithms, Searching, Sorting, and Dynamic Programming Solutions.",
            language: "C++",
            stars: 27,
            category: "cpp",
            url: "https://github.com/arefin-nabil/Algorithm"
        }
    ];

    renderRepos(actualUserRepos);
}

function renderRepos(repos) {
    const grid = document.getElementById('projectsGrid');
    if (!grid) return;

    grid.innerHTML = repos.map(repo => `
        <div class="glass-card project-card">
            <div class="project-top">
                <div class="project-header-row">
                    <i class="fa-regular fa-folder-open project-folder-icon"></i>
                    <div class="project-links">
                        <a href="${repo.url}" target="_blank" class="project-link-icon" title="View Source on GitHub">
                            <i class="fa-brands fa-github"></i>
                        </a>
                    </div>
                </div>
                <h4 class="project-name">${repo.name}</h4>
                <p class="project-description">${repo.description}</p>
            </div>
            <div class="project-footer">
                <div class="project-lang">
                    <span class="lang-dot"></span>
                    <span>${repo.language}</span>
                </div>
                <div class="project-stars">
                    <i class="fa-regular fa-star"></i>
                    <span>${repo.stars}</span>
                </div>
            </div>
        </div>
    `).join('');
}

/* ==========================================================================
   9. Simplified 1-Click WhatsApp Application Handler
   ========================================================================== */
function initTuitionModal() {
    const modal = document.getElementById('tuitionModal');
    const closeBtn = document.getElementById('modalCloseBtn');
    const openBtns = document.querySelectorAll('.open-tuition-modal');
    const form = document.getElementById('tuitionApplyForm');

    openBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const href = btn.getAttribute('href');
            if (href === '#tuition-apply') {
                return;
            }
            e.preventDefault();
            if (modal) modal.classList.add('active');
        });
    });

    if (closeBtn && modal) {
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('active');
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    }

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const studentName = document.getElementById('appStudentName').value;
            const phone = document.getElementById('appPhone').value;
            const studentClass = document.getElementById('appClass').value;
            const location = document.getElementById('appLocation').value;

            const formattedMessage = `আসসালামু আলাইকুম নাবিল স্যার,
আমি আপনার পোর্টফোলিও ওয়েবসাইট থেকে প্রাইভেট টিউশনি / ফ্রি ডেমো ক্লাসের জন্য আবেদন করছি।

📋 **আবেদনের বিবরণ:**
• শিক্ষার্থীর নাম: ${studentName}
• মোবাইল নম্বর: ${phone}
• বিষয় / ডেমো ক্লাস: ${studentClass}
• এলাকা/ঠিকানা: ${location}

দয়া করে বিষয় ও সময়সূচী নিয়ে কথা বলার উপযুক্ত সময়টি জানিয়ে দিবেন। ধন্যবাদ!`;

            const encodedMessage = encodeURIComponent(formattedMessage);
            const whatsappUrl = `https://wa.me/${MY_WHATSAPP_NUMBER}?text=${encodedMessage}`;

            window.open(whatsappUrl, '_blank');

            if (modal) modal.classList.remove('active');
        });
    }

    const directContactForm = document.getElementById('directContactForm');
    if (directContactForm) {
        directContactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('contactName').value;
            const phone = document.getElementById('contactPhone').value;
            const msg = document.getElementById('contactMsg').value;

            const formattedMessage = `আসসালামু আলাইকুম নাবিল ভাই/স্যার,
আমি ওয়েবসাইট থেকে সরাসরি মেসেজ পাঠাচ্ছি:

👤 নাম: ${name}
📞 মোবাইল/ইমেইল: ${phone}
💬 মেসেজ:
"${msg}"

ধন্যবাদ!`;

            const encodedMessage = encodeURIComponent(formattedMessage);
            const whatsappUrl = `https://wa.me/${MY_WHATSAPP_NUMBER}?text=${encodedMessage}`;

            window.open(whatsappUrl, '_blank');
            directContactForm.reset();
        });
    }
}
