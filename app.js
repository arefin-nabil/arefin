/**
 * Nurul Arefin Nabil — Portfolio, ICT Syllabus & Projects Portal Logic
 * Includes Dual Theme, Dynamic Language Switcher (BN <-> EN), Particle Canvas, Custom Cursor & WhatsApp Launcher.
 */

// 📱 আপনার নিজস্ব হোয়াটসঅ্যাপ নম্বর (01881196146)
var MY_WHATSAPP_NUMBER = window.MY_WHATSAPP_NUMBER || '8801881196146';

document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    initTheme();
    initLanguageSwitcher();
    initBackgroundParticles();
    initCustomCursor();
    initGitHubProjects();
    initScrollReveal();
    initVisitorCounter();
    initAnimatedStats();
    initStickyCardStacking();
    initScrollProgressBar();
    initTuitionModal();
    initTypewriter();
    initCardSpotlightHover();
    initScrollToTopButton();
    initSectionProgressDots();
});

/* ==========================================================================
   1. Navbar & Mobile Menu
   ========================================================================== */
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    const isHomePage = document.getElementById('home') !== null;
    const sections = isHomePage ? document.querySelectorAll('section[id]') : [];
    let sectionOffsets = [];

    function updateSectionOffsets() {
        if (!isHomePage) return;
        sectionOffsets = Array.from(sections).map(section => ({
            id: section.getAttribute('id'),
            top: section.offsetTop,
            height: section.offsetHeight
        }));
    }

    if (isHomePage) {
        updateSectionOffsets();
        window.addEventListener('resize', updateSectionOffsets);
        window.addEventListener('load', updateSectionOffsets);
        setTimeout(updateSectionOffsets, 100);
        setTimeout(updateSectionOffsets, 500);
    }

    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        if (isHomePage && sectionOffsets.length > 0) {
            let currentSection = '';
            const scrollPos = window.scrollY;

            for (let i = 0; i < sectionOffsets.length; i++) {
                const sec = sectionOffsets[i];
                const sectionTop = sec.top - 120;
                if (scrollPos >= sectionTop && scrollPos < sectionTop + sec.height) {
                    currentSection = sec.id;
                }
            }

            navLinks.forEach(link => {
                const href = link.getAttribute('href');
                link.classList.remove('active');
                if (href === `#${currentSection}` || href === `index.html#${currentSection}`) {
                    link.classList.add('active');
                }
            });
        }
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
window.currentTheme = 'dark';

function initTheme() {
    const savedTheme = localStorage.getItem('nabil_portfolio_theme') || 'dark';
    window.currentTheme = savedTheme;

    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    const themeBtns = document.querySelectorAll('.theme-toggle-action, #themeToggle');
    themeBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            if (e) e.stopPropagation();
            const curr = document.documentElement.getAttribute('data-theme') || window.currentTheme;
            const newTheme = curr === 'dark' ? 'light' : 'dark';
            window.currentTheme = newTheme;

            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('nabil_portfolio_theme', newTheme);
            updateThemeIcon(newTheme);
        });
    });
}

function updateThemeIcon(theme) {
    const themeBtns = document.querySelectorAll('.theme-toggle-action, #themeToggle');
    themeBtns.forEach(btn => {
        const icon = btn.querySelector('i');
        if (icon) {
            if (theme === 'light') {
                icon.className = 'fa-solid fa-moon';
            } else {
                icon.className = 'fa-solid fa-sun';
            }
        }
    });
}

/* ==========================================================================
   3. Comprehensive Language Switcher (Bangla <-> English)
   ========================================================================== */
function initLanguageSwitcher() {
    const langBtns = document.querySelectorAll('.lang-toggle-action, #langToggle');
    if (!langBtns || langBtns.length === 0) return;

    let currentLang = localStorage.getItem('nabil_lang') || 'bn';

    applyLanguage(currentLang);

    langBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            currentLang = currentLang === 'bn' ? 'en' : 'bn';
            localStorage.setItem('nabil_lang', currentLang);
            applyLanguage(currentLang);
        });
    });
}

function applyLanguage(lang) {
    document.querySelectorAll('.langText, #langText').forEach(el => {
        el.textContent = lang === 'bn' ? 'EN' : 'বাংলা';
    });

    document.documentElement.setAttribute('lang', lang);

    const i18nDictionary = {
        bn: {
            brandSubtitle: "ICT & CSE Educator",
            navHome: "হোম",
            navWhy: "কেন শিখবেন?",
            navEdu: "শিক্ষাগত যোগ্যতা",
            navTuition: "টিউশন বিষয়সমূহ",
            navSyllabus: "ICT সিলেবাস",
            navProjects: "প্রজেক্ট",
            navContact: "যোগাযোগ",
            navTalkBtn: "<i class=\"fa-brands fa-whatsapp\"></i> কথা বলুন",
            cardViewSyllabusBtn: "সম্পূর্ণ আইসিটি সিলেবাস পেজ দেখুন ➔",
            themeText: "থিম",
            statusBadge: "বরমী, মাওনা ও শ্রীপুরে ICT (আইসিটি) স্পেশালিস্ট টিউশন চালু আছে",
            heroTitle: "হাই, আমি <span class=\"text-gradient\">নূরুল আরেফিন নাবিল</span>",
            heroFocusTag: "<i class=\"fa-solid fa-star\"></i> ICT (আইসিটি) স্পেশালিস্ট প্রাইভেট টিউটর — শ্রীপুর, মাওনা ও বরমী",
            heroDesc: "আমি একজন <strong>কম্পিউটার সায়েন্স অ্যান্ড ইঞ্জিনিয়ারিং (B.Sc in CSE) গ্র্যাজুয়েট</strong>। আমার মূল অগ্রাধিকার হল ৯ম-১০ম (SSC) ও একাদশ-দ্বাদশ (HSC) শিক্ষার্থীদের <strong>ICT (আইসিটি)</strong> বিষয়ে প্র্যাকটিক্যাল কোডিং ও ১০০% এ+ উপযোগী প্রস্তুতি প্রদান করা। পাশাপাশি বরমী, মাওনা ও শ্রীপুর এলাকায় <strong>বাংলা, ইংরেজি ও বিজ্ঞান বিষয়সমূহ (পদার্থ, রসায়ন, গণিত)</strong>-এর বিশেষ প্রাইভেট টিচিং দেওয়া হয়।",
            heroBtnTalk: "<i class=\"fa-brands fa-whatsapp\"></i> হোয়াটসঅ্যাপে কথা বলুন",
            heroBtnSyllabus: "<i class=\"fa-solid fa-book-open\"></i> SSC ও HSC এর সম্পূর্ণ সিলেবাস পেজ দেখুন ➔",
            statOneOnOneNum: "১-অন-১",
            statExpNum: "৪+ বছর",
            statStudentsNum: "৫০+",
            statPersonalCare: "ব্যক্তিগত স্পেশাল কেয়ার",
            statVisitorLabel: "মোট ওয়েবসাইট ভিজিটর",
            badgeBscSub: "কম্পিউটার সায়েন্স গ্র্যাজুয়েট",
            badgeIctSub: "প্র্যাকটিক্যাল কোডিং ও বোর্ড প্রস্তুতি",
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
            eduSubtitle: "কম্পিউটার সায়েন্স অ্যান্ড ইঞ্জিনিয়ারিং (CSE) ব্যাকগ্রাউন্ড ও शिक्षাগত কৃতিত্ব",
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
            btnSendWhatsApp: "<i class=\"fa-brands fa-whatsapp\"></i> হোয়াটসঅ্যাপে মেসেজ পাঠান ➔",
            
            // Syllabus Page Keys
            sylTag: "Complete ICT Course Curriculum",
            sylTitle: "৯ম-১০ম ও HSC <span class=\"text-gradient\">আইসিটি সম্পূর্ণ সিলেবাস</span>",
            sylSub: "বোর্ড কারিকুলাম অনুযায়ী প্রতিটি অধ্যায়ের প্র্যাকটিক্যাল লার্নিং, এআই-সহায়ক স্টাডি প্রম্পটিং এবং বিগত সকল বোর্ডের CQ/MCQ সমাধান (বরমী, শ্রীপুর, মাওনা, গাজীপুর)",
            ch1Badge: "১ম অধ্যায়",
            ch1Title: "তথ্য ও যোগাযোগ প্রযুক্তি: বিশ্ব ও বাংলাদেশ",
            ch1t1: "লেটেস্ট তথ্য প্রযুক্তির আধুনিক ধারণা ও বাস্তব ব্যবহার",
            ch1t2: "বিশ্বগ্রাম (Global Village) ও তথ্য প্রযুক্তির সার্বিক অবদান",
            ch1t3: "আর্টিফিশিয়াল ইন্টেলিজেন্স (AI), প্রম্পট ইঞ্জিনিয়ারিং, VR ও রোবোটিক্স",
            ch1t4: "বায়োমেট্রিক্স, বায়োইনফরমেটিক্স ও ন্যানোটেকনোলজি",
            ch1t5: "ই-লার্নিং, এআই ভিত্তিক স্মার্ট পড়াশোনা ও ফিউচার আইসিটি ক্যারিয়ার",
            ch1Foot: "থিওরি + প্র্যাকটিক্যাল কনসেপ্ট",
            ch2Badge: "২য় অধ্যায়",
            ch2Title: "কমিউনিকেশন সিস্টেমস ও নেটওয়ার্কিং",
            ch2t1: "ব্যান্ডউইথ, ডাটা ট্রান্সমিশন স্পিড ও সিমপ্লেক্স/ডুপ্লেক্স মেথড",
            ch2t2: "ডাটা কমিউনিকেশন মাধ্যম (Optical Fiber, Microwave, Satellite)",
            ch2t3: "ওয়ারলেস নেটওয়ার্ক প্রযুক্তি (Bluetooth, Wi-Fi, WiMAX, Mobile Gen)",
            ch2t4: "নেটওয়ার্ক টপোলজি (Star, Ring, Bus, Tree, Mesh & Hybrid)",
            ch2t5: "ক্লাউড কম্পিউটিং, হাইব্রিড নেটওয়ার্কিং ও সাইবার সিকিউরিটি",
            ch2Foot: "নেটওয়ার্কিং রিয়েল ডায়াগ্রাম",
            ch3Badge: "৩য় অধ্যায়",
            ch3Title: "সংখ্যা পদ্ধতি ও ডিজিটাল ডিভাইস",
            ch3t1: "সংখ্যা পদ্ধতির ইতিহাস ও প্রকারভেদ (Binary, Octal, Hex, Dec)",
            ch3t2: "সংখ্যা পদ্ধতির রূপান্তর এবং ২-এর পরিপূরক (2's Complement)",
            ch3t3: "মৌলিক ও সার্বজনীন লজিক গেট (AND, OR, NOT, NAND, NOR, XOR)",
            ch3t4: "এনকোডার, ডিকোডার, অ্যাডার, রেজিস্টার ও কাউন্টার সার্কিট",
            ch3t5: "বুলিয়ান অ্যালজেব্রা, ডিমরগানের উপপাদ্য ও লজিক ফাংশন সরলীকরণ",
            ch3Foot: "গাণিতিক ও লজিক সমাধান",
            ch4Badge: "৪র্থ অধ্যায়",
            ch4Title: "ওয়েব ডিজাইন পরিচিতি ও HTML",
            ch4t1: "ওয়েবসাইটের কাঠামো ও লেআউট (Static vs Dynamic Web)",
            ch4t2: "HTML5 ট্যাগ ব্যবহার করে ওয়েব পেজ তৈরি (Formatting, Hyperlink)",
            ch4t3: "ওয়েব পেজে ছবি (Image), টেবিল (Table) ও ইনপুট ফরম তৈরি",
            ch4t4: "CSS স্টাইলিং দিয়ে সুন্দর ডিজাইন ও রেসপন্সিভ মোবাইল ভিউ",
            ch4t5: "ফ্রিতে ওয়েবসাইট লাইভ ডোমেইন ও হোস্টিং পাবলিশিং",
            ch4Foot: "লাইভ ওয়েব প্রজেক্ট তৈরি",
            ch5Badge: "৫ম অধ্যায় — বিশেষ হাইলাইট",
            ch5Title: "প্রোগ্রামিং ভাষা (C, C++, Java, Python)",
            ch5t1: "অ্যালগরিদম ও ফ্লোচার্ট (Flowchart) তৈরি ও প্রবলেম সলভিং লজিক",
            ch5t2: "C প্রোগ্রামিং সম্পূর্ণ: ডাটা টাইপ, ইনপুট/আউটপুট (`printf/scanf`)",
            ch5t3: "কন্ডিশনাল স্টেটমেন্ট (`if-else`, `switch`), লুপ (`for`, `while`) ও অ্যারে",
            ch5t4: "ফানশন, পয়েন্টার ও অবজেক্ট ওরিয়েন্টেড প্রোগ্রামিং (OOP)",
            ch5t5: "জাভা, পাইথন ও মোবাইল অ্যাপস (Flutter/Android) বেসিকস",
            ch5Foot: "সরাসরি কম্পিউটারে কোডিং প্র্যাকটিস",
            ch6Badge: "৬ষ্ঠ অধ্যায়",
            ch6Title: "ডেটাবেজ ম্যানেজমেন্ট সিস্টেম (DBMS)",
            ch6t1: "ডেটাবেজের মৌলিক ধারণা, ফিল্ড, রেকর্ড ও রিলেশনশিপ",
            ch6t2: "প্রাইমারি কি, ফরেন কি ও রিলেশনাল ডেটাবেজ (RDBMS)",
            ch6t3: "SQL কোয়েরির কাজ (`SELECT`, `INSERT`, `UPDATE`, `DELETE`)",
            ch6t4: "ডেটা সিকিউরিটি, এনক্রিপশন ও আইটি ইন্ডাস্ট্রিতে ক্যোয়ারির ব্যবহার",
            ch6Foot: "SQL ডাটা কোয়েরি সমাধান",
            boardBannerTitle: "🎯 বিগত সকল বোর্ড পরীক্ষার প্রশ্নপত্র সমাধান",
            boardBannerSub: "ঢাকা, চট্টগ্রাম, রাজশাহী, কুমিল্লা, দিনাজপুর, যশোর, সিলেট ও বরিশাল বোর্ডের বিগত সকল বছরের <strong>সৃজনশীল (CQ)</strong> ও <strong>বহুনির্বাচনী (MCQ)</strong> প্রশ্ন টাইপ ধরে ধরে নিখুঁতভাবে সলভ করানো হয়।",
            boardWaBtn: "<i class=\"fa-brands fa-whatsapp\"></i> সরাসরি হোয়াটসঅ্যাপে মেসেজ দিন",
            boardFormBtn: "<i class=\"fa-solid fa-file-signature\"></i> অনলাইন ফরম পূরণ করুন",

            // Projects Page Keys
            projTag: "Software & Mobile App Showcase",
            projTitle: "লাইভ অ্যাপস ও <span class=\"text-gradient\">প্রজেক্ট পোর্টফোলিও</span>",
            projSub: "গুগল প্লে-স্টোরে প্রকাশিত লাইভ অ্যান্ড্রয়েড অ্যাপ্লিকেশন, আপকামিং সফটওয়্যার ও ওপেন সোর্স গিটহাব সোর্স কোড।",
            pLiveTag: "Live Mobile App",
            pLiveTitle: "📱 গুগল প্লে-স্টোরে লাইভ অ্যাপস",
            pSnakeAppName: "সাপ ও বন্যপ্রাণী — রেসকিউ বিডি",
            pSnakeAppDesc: "বাংলাদেশ বন্যপ্রাণী ও বিষধর সাপ প্রতিরোধ, উদ্ধার কাজ পরিচালনা এবং সাধারণ মানুষের মধ্যে তাৎক্ষণিক সচেতনতা তৈরির লক্ষ্যে প্রস্তুতকৃত গুগলে প্রকাশিত অফিসিয়াল মোবাইল অ্যাপ্লিকেশন।",
            pSnakePlayBtn: "<i class=\"fa-brands fa-google-play\"></i> প্লে-স্টোরে অ্যাপটি দেখুন ➔",
            pSnakeWebBtn: "<i class=\"fa-solid fa-globe\"></i> অ্যাপের ওয়েবসাইট দেখুন",
            pUpTag: "In Development",
            pUpTitle: "🚀 আপকামিং প্রজেক্টসমূহ (Upcoming Projects)",
            pUpSub: "বর্তমানে যেসব উচ্চতর সফটওয়্যার ও প্রজেক্টের কাজ চলছে",
            pEduTechTitle: "Higher Education and Admission Tracking Software",
            pEduTechDesc: "উচ্চশিক্ষা, বিশ্ববিদ্যালয় ভর্তি পরীক্ষা, এডমিশন ট্র্যাকিং ও শিক্ষার্থীদের গাইডলাইন প্রদানের জন্য একটি ডিজিটাল ইন্টেলিজেন্ট সফটওয়্যার প্ল্যাটফর্ম।",
            pWarrantyTitle: "Warranty Book Mobile Application",
            pWarrantyDesc: "প্রোডাক্ট ও যেকোনো ডিভাইসের ওয়ারেন্টি স্লিপ ট্র্যাকিং, এক্সপায়ারি নোটিফিকেশন ও ডিজিটাল কাস্টমার সাপোর্ট রেকর্ড ম্যানেজমেন্ট অ্যাপ।",
            pGitTag: "Open Source Code Repositories",
            pGitTitle: "💻 অন্যান্য প্রজেক্টসমূহ"
        },
        en: {
            brandSubtitle: "ICT & CSE Educator",
            navHome: "Home",
            navWhy: "Why Me?",
            navEdu: "Education",
            navTuition: "Tuition Subjects",
            navSyllabus: "ICT Syllabus",
            navProjects: "Projects",
            navContact: "Contact",
            navTalkBtn: "<i class=\"fa-brands fa-whatsapp\"></i> Contact",
            cardViewSyllabusBtn: "View Complete ICT Syllabus ➔",
            themeText: "Theme",
            statusBadge: "Specialist ICT Tuition Available in Barmi, Mawna & Sreepur",
            heroTitle: "Hi, I am <span class=\"text-gradient\">Nurul Arefin Nabil</span>",
            heroFocusTag: "<i class=\"fa-solid fa-star\"></i> Specialist ICT Private Educator — Sreepur, Mawna & Barmi",
            heroDesc: "I am a <strong>Computer Science & Engineering (B.Sc in CSE) Graduate</strong>. My primary priority is providing 100% board exam preparation and practical coding for Class 9-10 (SSC) and Class 11-12 (HSC) in <strong>ICT</strong> alongside private tuition for <strong>Bangla, English & Science subjects</strong>.",
            heroBtnTalk: "<i class=\"fa-brands fa-whatsapp\"></i> Chat on WhatsApp",
            heroBtnSyllabus: "<i class=\"fa-solid fa-book-open\"></i> View Complete SSC & HSC ICT Syllabus ➔",
            statOneOnOneNum: "1-on-1",
            statExpNum: "4+ Yrs",
            statStudentsNum: "50+",
            statPersonalCare: "Personal 1-on-1 Care",
            statVisitorLabel: "Total Website Visitors",
            badgeBscSub: "Computer Science Graduate",
            badgeIctSub: "Practical Coding & Board Prep",
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
            btnSendWhatsApp: "<i class=\"fa-brands fa-whatsapp\"></i> Send Message via WhatsApp ➔",

            // Syllabus Page Keys
            sylTag: "Complete ICT Course Curriculum",
            sylTitle: "Class 9-10 & HSC <span class=\"text-gradient\">Complete ICT Syllabus</span>",
            sylSub: "Board curriculum-aligned practical learning, AI-assisted study techniques, and past board CQ/MCQ solutions (Barmi, Sreepur, Mawna, Gazipur)",
            ch1Badge: "Chapter 1",
            ch1Title: "Information & Communication Tech: World & Bangladesh",
            ch1t1: "Modern concepts and practical applications of latest IT",
            ch1t2: "Global Village concepts and overall contributions of IT",
            ch1t3: "Artificial Intelligence (AI), Prompt Engineering, VR & Robotics",
            ch1t4: "Biometrics, Bioinformatics & Nanotechnology",
            ch1t5: "E-Learning, AI-driven smart study and future ICT careers",
            ch1Foot: "Theory + Practical Concepts",
            ch2Badge: "Chapter 2",
            ch2Title: "Communication Systems & Networking",
            ch2t1: "Bandwidth, Data Transmission Speed & Simplex/Duplex methods",
            ch2t2: "Data Communication Media (Optical Fiber, Microwave, Satellite)",
            ch2t3: "Wireless Network Technologies (Bluetooth, Wi-Fi, WiMAX, 5G)",
            ch2t4: "Network Topologies (Star, Ring, Bus, Tree, Mesh & Hybrid)",
            ch2t5: "Cloud Computing, Hybrid Networking & Cybersecurity",
            ch2Foot: "Networking Real Diagrams",
            ch3Badge: "Chapter 3",
            ch3Title: "Number Systems & Digital Devices",
            ch3t1: "History and types of Number Systems (Binary, Octal, Hex, Dec)",
            ch3t2: "Number conversions and 2's Complement arithmetic",
            ch3t3: "Basic & Universal Logic Gates (AND, OR, NOT, NAND, NOR, XOR)",
            ch3t4: "Encoders, Decoders, Adders, Registers & Counter Circuits",
            ch3t5: "Boolean Algebra, De Morgan's Laws & Logic Simplification",
            ch3Foot: "Mathematical & Logic Solving",
            ch4Badge: "Chapter 4",
            ch4Title: "Introduction to Web Design & HTML",
            ch4t1: "Website structures & layouts (Static vs Dynamic Web)",
            ch4t2: "Building web pages using HTML5 tags (Formatting, Hyperlinks)",
            ch4t3: "Creating Web Images, Data Tables & HTML Input Forms",
            ch4t4: "CSS styling for beautiful design & responsive mobile view",
            ch4t5: "Publishing live website with free domain & hosting",
            ch4Foot: "Building Live Web Projects",
            ch5Badge: "Chapter 5 — Special Highlight",
            ch5Title: "Programming Languages (C, C++, Java, Python)",
            ch5t1: "Algorithms, Flowcharts & Problem-Solving logic",
            ch5t2: "Complete C Programming: Data types, Input/Output (`printf/scanf`)",
            ch5t3: "Conditionals (`if-else`, `switch`), Loops (`for`, `while`) & Arrays",
            ch5t4: "Functions, Pointers & Object-Oriented Programming (OOP)",
            ch5t5: "Java, Python & Mobile Apps (Flutter/Android) basics",
            ch5Foot: "Direct Computer Coding Practice",
            ch6Badge: "Chapter 6",
            ch6Title: "Database Management Systems (DBMS)",
            ch6t1: "Database fundamentals, Fields, Records & Relationships",
            ch6t2: "Primary Key, Foreign Key & Relational Databases (RDBMS)",
            ch6t3: "SQL Queries (`SELECT`, `INSERT`, `UPDATE`, `DELETE`)",
            ch6t4: "Data Security, Encryption & IT Industry query usage",
            ch6Foot: "SQL Data Query Solutions",
            boardBannerTitle: "🎯 All Past Board Question Paper Solutions",
            boardBannerSub: "Comprehensive solution coverage for Creative (CQ) and Multiple Choice (MCQ) questions across all education boards (Dhaka, Chittagong, Rajshahi, Comilla, Dinajpur, Jessore, Sylhet, Barisal).",
            boardWaBtn: "<i class=\"fa-brands fa-whatsapp\"></i> Message Directly on WhatsApp",
            boardFormBtn: "<i class=\"fa-solid fa-file-signature\"></i> Fill Online Form",

            // Projects Page Keys
            projTag: "Software & Mobile App Showcase",
            projTitle: "Live Apps & <span class=\"text-gradient\">Project Portfolio</span>",
            projSub: "Live Google Play Store Android applications, upcoming software platforms, and open-source GitHub source codes.",
            pLiveTag: "Live Mobile App",
            pLiveTitle: "📱 Live Apps on Google Play Store",
            pSnakeAppName: "Snakes & Wildlife — Rescue BD",
            pSnakeAppDesc: "Official Google Play Store mobile application published for wildlife protection, venomous snake rescue operations, and instant public awareness in Bangladesh.",
            pSnakePlayBtn: "<i class=\"fa-brands fa-google-play\"></i> View App on Play Store ➔",
            pSnakeWebBtn: "<i class=\"fa-solid fa-globe\"></i> Visit App Website",
            pUpTag: "In Development",
            pUpTitle: "🚀 Upcoming Projects",
            pUpSub: "Advanced software and mobile platforms currently under active development",
            pEduTechTitle: "Higher Education and Admission Tracking Software",
            pEduTechDesc: "A digital intelligent software platform designed for tracking university admissions, higher education, and student career guidelines.",
            pWarrantyTitle: "Warranty Book Mobile Application",
            pWarrantyDesc: "Digital device warranty tracker, expiry notification, and customer record management app.",
            pGitTag: "Open Source Code Repositories",
            pGitTitle: "💻 Open Source GitHub Repositories"
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
   4. Live Global Website Visitor Counter System (Cloud API Integration)
   ========================================================================== */
function initVisitorCounter() {
    const visitorEls = document.querySelectorAll('.visitor-count-number');
    if (!visitorEls || visitorEls.length === 0) return;

    const BASE_OFFSET = 780; // Base starting offset
    let cachedCount = parseInt(localStorage.getItem('nabil_global_visitor_count') || '0', 10);

    if (cachedCount > 0) {
        updateVisitorUI(cachedCount);
    }

    const counterKey = 'arefin_nabil_portfolio_hits_2026';
    const apiUrl = `https://countapi.mileshilliard.com/api/v1/hit/${counterKey}`;

    fetch(apiUrl)
        .then(res => res.json())
        .then(data => {
            if (data && typeof data.value === 'number') {
                const totalGlobalCount = BASE_OFFSET + data.value;
                localStorage.setItem('nabil_global_visitor_count', totalGlobalCount.toString());
                updateVisitorUI(totalGlobalCount);
            }
        })
        .catch(err => {
            console.warn('Global visitor API fallback used:', err);
            if (!cachedCount) {
                let fallback = Math.floor(Math.random() * (790 - 750 + 1)) + 750;
                localStorage.setItem('nabil_global_visitor_count', fallback.toString());
                updateVisitorUI(fallback);
            }
        });
}

function updateVisitorUI(count) {
    const visitorEls = document.querySelectorAll('.visitor-count-number');
    const lang = localStorage.getItem('nabil_lang') || 'bn';
    const isBn = lang === 'bn';

    function toBnDigits(num) {
        const bnDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
        return num.toString().replace(/\d/g, d => bnDigits[d]);
    }

    visitorEls.forEach(el => {
        if (isBn) {
            el.textContent = `${toBnDigits(count)}+`;
        } else {
            el.textContent = `${count.toLocaleString('en-US')}+`;
        }
    });
}

/* ==========================================================================
   4b. Animated Count-Up Engine for Hero Stats
   ========================================================================== */
function initAnimatedStats() {
    const statsContainer = document.getElementById('heroStats');
    if (!statsContainer) return;

    let hasAnimated = false;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimated) {
                hasAnimated = true;
                runCountUpAnimation();
            }
        });
    }, { threshold: 0.15 });

    observer.observe(statsContainer);
}

function runCountUpAnimation() {
    const lang = localStorage.getItem('nabil_lang') || 'bn';
    const isBn = lang === 'bn';

    const statElements = document.querySelectorAll('.hero-stats .stat-anim');
    const duration = 1800; // 1.8 seconds animation
    const startTime = performance.now();

    function toBnDigits(num) {
        const bnDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
        return num.toString().replace(/\d/g, d => bnDigits[d]);
    }

    function animate(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeProgress = 1 - Math.pow(1 - progress, 3); // ease-out cubic

        statElements.forEach(el => {
            const type = el.getAttribute('data-type');
            const targetAttr = el.getAttribute('data-target');

            if (type === 'visitor') {
                const totalVisitors = parseInt(localStorage.getItem('nabil_global_visitor_count') || '785', 10);
                const val = Math.floor(easeProgress * totalVisitors);
                el.textContent = isBn ? `${toBnDigits(val)}+` : `${val.toLocaleString('en-US')}+`;
            } else if (type === 'one-on-one') {
                if (progress >= 1) {
                    el.textContent = isBn ? '১-অন-১' : '1-on-1';
                } else {
                    const val = Math.floor(easeProgress * 1);
                    el.textContent = isBn ? `${toBnDigits(val)}-অন-১` : `${val}-on-1`;
                }
            } else if (targetAttr) {
                const target = parseInt(targetAttr, 10);
                const val = Math.floor(easeProgress * target);
                const suffixBn = el.getAttribute('data-suffix') || '';
                const suffixEn = el.getAttribute('data-suffix-en') || suffixBn;
                el.textContent = isBn ? `${toBnDigits(val)}${suffixBn}` : `${val}${suffixEn}`;
            }
        });

        if (progress < 1) {
            requestAnimationFrame(animate);
        }
    }

    requestAnimationFrame(animate);
}

/* ==========================================================================
   4c. Sticky Card Stacking Auto Indexer
   ========================================================================== */
function initStickyCardStacking() {
    const stackWrappers = document.querySelectorAll('.stack-cards-wrapper');
    stackWrappers.forEach(wrapper => {
        const cards = wrapper.querySelectorAll('.stacked-card');
        cards.forEach((card, index) => {
            card.style.setProperty('--card-index', index);
        });
    });
}

function initScrollProgressBar() {
    const progressBar = document.getElementById('scrollProgressBar');
    if (!progressBar) return;

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        if (scrollHeight > 0) {
            const progress = (scrollTop / scrollHeight) * 100;
            progressBar.style.width = `${progress}%`;
        }
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
    const isMobile = window.innerWidth <= 768;
    // Balanced starry density: 65 on desktop, 22 on mobile for super smooth performance
    const particleCount = isMobile ? 22 : Math.min(Math.floor(width / 24), 65);

    const mouse = {
        x: null,
        y: null,
        radius: 160
    };

    window.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    }, { passive: true });

    window.addEventListener('mouseleave', () => {
        mouse.x = null;
        mouse.y = null;
    });

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }, { passive: true });

    // Star Palette Colors (Indigo, Cyan, Violet, Pink Accent)
    const starColorsDark = [
        'rgba(99, 102, 241, ',   // Indigo
        'rgba(6, 182, 212, ',    // Cyan
        'rgba(168, 85, 247, ',   // Violet / Purple
        'rgba(236, 72, 153, '    // Pink Accent
    ];

    const starColorsLight = [
        'rgba(79, 70, 229, ',    // Deeper Indigo
        'rgba(14, 116, 144, ',   // Deeper Cyan
        'rgba(147, 51, 234, '    // Deeper Purple
    ];

    // Shooting Star / Meteor State
    let meteor = null;
    let nextMeteorTime = Date.now() + 3000 + Math.random() * 4000;

    class Star {
        constructor() {
            this.reset();
            // Stagger initial positions across canvas
            this.x = Math.random() * width;
            this.y = Math.random() * height;
        }

        reset() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = (Math.random() - 0.5) * 0.45;
            this.vy = (Math.random() - 0.5) * 0.45;
            
            // Randomize star sizes: 70% small dust stars (0.8-1.5px), 30% glowing stars (1.8-2.8px)
            this.isGlowingStar = Math.random() > 0.7;
            this.baseRadius = this.isGlowingStar ? (Math.random() * 1.2 + 1.8) : (Math.random() * 0.7 + 0.8);
            this.radius = this.baseRadius;

            // Twinkle parameters (Zero CPU overhead flickering)
            this.twinklePhase = Math.random() * Math.PI * 2;
            this.twinkleSpeed = Math.random() * 0.03 + 0.015;
            this.colorIdx = Math.floor(Math.random() * 4);
        }

        draw() {
            const isLight = window.currentTheme === 'light';
            const palette = isLight ? starColorsLight : starColorsDark;
            const baseColor = palette[this.colorIdx % palette.length];

            // Twinkle Alpha calculation
            this.twinklePhase += this.twinkleSpeed;
            const twinkleAlphaFactor = 0.55 + Math.sin(this.twinklePhase) * 0.45;
            const finalAlpha = (this.isGlowingStar ? 0.75 : 0.45) * twinkleAlphaFactor;

            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = `${baseColor}${finalAlpha})`;
            ctx.fill();

            // Additional Radial Aura Glow for Bright Stars
            if (this.isGlowingStar && !isLight && twinkleAlphaFactor > 0.6) {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius * 2.2, 0, Math.PI * 2);
                ctx.fillStyle = `${baseColor}${finalAlpha * 0.22})`;
                ctx.fill();
            }
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            // Clamping boundaries to prevent escaping or getting stuck off-screen
            if (this.x < 0) {
                this.x = 0;
                this.vx *= -1;
            } else if (this.x > width) {
                this.x = width;
                this.vx *= -1;
            }
            if (this.y < 0) {
                this.y = 0;
                this.vy *= -1;
            } else if (this.y > height) {
                this.y = height;
                this.vy *= -1;
            }

            // Mouse Interaction: Subtle Gravitational Push
            if (mouse.x && mouse.y) {
                let dx = mouse.x - this.x;
                let dy = mouse.y - this.y;
                let distSq = dx * dx + dy * dy;
                // Squared Distance check (160 * 160 = 25600)
                if (distSq < 25600) {
                    let dist = Math.sqrt(distSq);
                    let angle = Math.atan2(dy, dx);
                    let force = (mouse.radius - dist) / mouse.radius;
                    // Push stars away smoothly
                    this.x -= Math.cos(angle) * force * 2.2;
                    this.y -= Math.sin(angle) * force * 2.2;
                }
            }

            this.draw();
        }
    }

    for (let i = 0; i < particleCount; i++) {
        particles.push(new Star());
    }

    // Shooting Star / Meteor logic
    function createMeteor() {
        const startX = Math.random() * width * 0.8 + width * 0.1;
        const startY = Math.random() * height * 0.4;
        const length = Math.random() * 90 + 70;
        const angle = Math.PI / 4 + (Math.random() - 0.5) * 0.2; // ~45 deg downward
        return {
            x: startX,
            y: startY,
            dx: Math.cos(angle) * 12,
            dy: Math.sin(angle) * 12,
            length: length,
            life: 0,
            maxLife: Math.random() * 25 + 20
        };
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);
        const isLight = window.currentTheme === 'light';

        // 1. Draw Star Constellation Lines & Cursor Beams
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();

            // Connection with other stars
            for (let j = i + 1; j < particles.length; j++) {
                let dx = particles[i].x - particles[j].x;
                let dy = particles[i].y - particles[j].y;
                let distSq = dx * dx + dy * dy;

                // Squared distance check: 115 * 115 = 13225
                if (distSq < 13225) {
                    let dist = Math.sqrt(distSq);
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    let alpha = (1 - dist / 115) * 0.22;
                    ctx.strokeStyle = isLight ? `rgba(99, 102, 241, ${alpha * 0.8})` : `rgba(99, 102, 241, ${alpha})`;
                    ctx.lineWidth = 0.7;
                    ctx.stroke();
                }
            }

            // Starlight Connection Beams directly to Cursor
            if (mouse.x && mouse.y) {
                let dx = mouse.x - particles[i].x;
                let dy = mouse.y - particles[i].y;
                let distSq = dx * dx + dy * dy;
                // Beam connection radius: 130 * 130 = 16900
                if (distSq < 16900) {
                    let dist = Math.sqrt(distSq);
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(mouse.x, mouse.y);
                    let beamAlpha = (1 - dist / 130) * 0.35;
                    ctx.strokeStyle = isLight ? `rgba(6, 182, 212, ${beamAlpha * 0.9})` : `rgba(6, 182, 212, ${beamAlpha})`;
                    ctx.lineWidth = 0.85;
                    ctx.stroke();
                }
            }
        }

        // 2. Render Shooting Star (Meteor)
        const now = Date.now();
        if (!meteor && now > nextMeteorTime) {
            meteor = createMeteor();
            nextMeteorTime = now + 4000 + Math.random() * 5000;
        }

        if (meteor) {
            meteor.x += meteor.dx;
            meteor.y += meteor.dy;
            meteor.life++;

            const opacity = 1 - (meteor.life / meteor.maxLife);
            const tailX = meteor.x - meteor.dx * (meteor.length / 12);
            const tailY = meteor.y - meteor.dy * (meteor.length / 12);

            const gradient = ctx.createLinearGradient(meteor.x, meteor.y, tailX, tailY);
            gradient.addColorStop(0, isLight ? `rgba(6, 182, 212, ${opacity})` : `rgba(255, 255, 255, ${opacity})`);
            gradient.addColorStop(0.3, isLight ? `rgba(99, 102, 241, ${opacity * 0.6})` : `rgba(99, 102, 241, ${opacity * 0.7})`);
            gradient.addColorStop(1, 'rgba(99, 102, 241, 0)');

            ctx.beginPath();
            ctx.moveTo(meteor.x, meteor.y);
            ctx.lineTo(tailX, tailY);
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 1.6;
            ctx.stroke();

            if (meteor.life >= meteor.maxLife) {
                meteor = null;
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
    // Disable custom cursor on mobile/touch screens to save GPU/CPU and prevent touch interference
    if (window.innerWidth <= 768) {
        return;
    }

    const cursor = document.getElementById('customCursor');
    const follower = document.getElementById('cursorFollower');
    if (!cursor || !follower) return;

    let mouseX = 0, mouseY = 0;
    let posX = 0, posY = 0;
    let scale = 1;
    let borderColor = 'var(--primary)';
    let bgColor = 'transparent';

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
    });

    function renderFollower() {
        posX += (mouseX - posX) * 0.16;
        posY += (mouseY - posY) * 0.16;
        follower.style.transform = `translate3d(${posX}px, ${posY}px, 0) translate(-50%, -50%) scale(${scale})`;
        follower.style.borderColor = borderColor;
        follower.style.backgroundColor = bgColor;
        requestAnimationFrame(renderFollower);
    }
    renderFollower();

    document.addEventListener('mouseover', (e) => {
        const hoverable = e.target.closest('a, button, .glass-card, input, select, textarea');
        if (hoverable) {
            scale = 1.6;
            borderColor = 'var(--secondary)';
            bgColor = 'rgba(6, 182, 212, 0.12)';
        }
    });

    document.addEventListener('mouseout', (e) => {
        const hoverable = e.target.closest('a, button, .glass-card, input, select, textarea');
        const leavingTo = e.relatedTarget ? e.relatedTarget.closest('a, button, .glass-card, input, select, textarea') : null;
        if (hoverable && hoverable !== leavingTo) {
            scale = 1;
            borderColor = 'var(--primary)';
            bgColor = 'transparent';
        }
    });
}

/* ==========================================================================
   7. Scroll Reveal Animation
   ========================================================================== */
function initScrollReveal() {
    const revealEls = document.querySelectorAll('.glass-card, .section-header, .stat-item, .contact-item, .timeline-item, .reveal-left, .reveal-right, .reveal-up, .reveal-grid, .reveal-pop-up, .reveal-fade-zoom, .reveal-glow-border, .footer');
    
    revealEls.forEach(el => {
        const hasSpecificReveal = el.classList.contains('reveal-left') ||
                                 el.classList.contains('reveal-right') ||
                                 el.classList.contains('reveal-up') ||
                                 el.classList.contains('reveal-grid') ||
                                 el.classList.contains('reveal-pop-up') ||
                                 el.classList.contains('reveal-fade-zoom') ||
                                 el.classList.contains('reveal-glow-border');
        if (!hasSpecificReveal) {
            el.classList.add('reveal');
        }
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                // Unobserve once revealed to eliminate any possibility of layout feedback loops
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.05,
        rootMargin: '0px 0px -4% 0px'
    });

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
        <div class="glass-card project-card reveal-up">
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
            if (modal) {
                e.preventDefault();
                modal.classList.add('active');
            }
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

/* ==========================================================================
   13. Hero Dynamic Typewriter Animation
   ========================================================================== */
function initTypewriter() {
    const el = document.getElementById('typewriterText');
    if (!el) return;

    const roles = [
        "ICT (আইসিটি) স্পেশালিস্ট প্রাইভেট টিউটর",
        "B.Sc in CSE Graduate (CGPA 3.70)",
        "প্র্যাকটিক্যাল কোডিং ও অ্যাপ ডেভেলপার",
        "বরমী, মাওনা ও শ্রীপুর এলাকার শিক্ষক"
    ];

    let roleIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    let speed = 80;

    function type() {
        const currentRole = roles[roleIdx];

        if (isDeleting) {
            el.textContent = currentRole.substring(0, charIdx - 1);
            charIdx--;
            speed = 40;
        } else {
            el.textContent = currentRole.substring(0, charIdx + 1);
            charIdx++;
            speed = 90;
        }

        if (!isDeleting && charIdx === currentRole.length) {
            speed = 1800; // Pause at full word
            isDeleting = true;
        } else if (isDeleting && charIdx === 0) {
            isDeleting = false;
            roleIdx = (roleIdx + 1) % roles.length;
            speed = 400;
        }

        setTimeout(type, speed);
    }

    type();
}

/* ==========================================================================
   14. Card Mouse-Tracking Spotlight Glow Effect
   ========================================================================== */
function initCardSpotlightHover() {
    const cards = document.querySelectorAll('.glass-card');

    cards.forEach(card => {
        let rect = null;

        card.addEventListener('mouseenter', () => {
            rect = card.getBoundingClientRect();
        });

        card.addEventListener('mousemove', (e) => {
            if (!rect) {
                rect = card.getBoundingClientRect();
            }
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const isLight = window.currentTheme === 'light';

            const glowColor = isLight 
                ? `radial-gradient(circle at ${x}px ${y}px, rgba(99, 102, 241, 0.18) 0%, rgba(255, 255, 255, 0.78) 70%)`
                : `radial-gradient(circle at ${x}px ${y}px, rgba(99, 102, 241, 0.22) 0%, rgba(18, 25, 41, 0.75) 70%)`;

            card.style.background = glowColor;

            // Subtle 3D Perspective Card Tilt (Desktop Only width > 768)
            if (window.innerWidth > 768 && rect.width > 0 && rect.height > 0) {
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = ((y - centerY) / centerY) * -3.5; // Max -3.5 to +3.5 deg tilt
                const rotateY = ((x - centerX) / centerX) * 3.5;  // Max -3.5 to +3.5 deg tilt

                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
            }
        });

        card.addEventListener('mouseleave', () => {
            card.style.background = '';
            card.style.transform = '';
            rect = null;
        });
    });
}

/* ==========================================================================
   15. Floating Scroll-to-Top Button
   ========================================================================== */
function initScrollToTopButton() {
    const btn = document.getElementById('scrollTopBtn');
    if (!btn) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 280) {
            btn.classList.add('visible');
        } else {
            btn.classList.remove('visible');
        }
    });

    btn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/* ==========================================================================
   16. Sticky Section Progress Dots (Left Side Desktop Indicator)
   ========================================================================== */
function initSectionProgressDots() {
    const dotsContainer = document.getElementById('sectionDots');
    if (!dotsContainer) return;

    const dots = dotsContainer.querySelectorAll('.progress-dot');
    const sections = document.querySelectorAll('section[id]');
    let sectionOffsets = [];

    function updateOffsets() {
        sectionOffsets = Array.from(sections).map(section => ({
            id: section.getAttribute('id'),
            top: section.offsetTop,
            height: section.offsetHeight
        }));
    }

    updateOffsets();
    window.addEventListener('resize', updateOffsets);
    window.addEventListener('load', updateOffsets);
    setTimeout(updateOffsets, 100);
    setTimeout(updateOffsets, 500);

    window.addEventListener('scroll', () => {
        let current = '';
        const scrollPos = window.scrollY;

        for (let i = 0; i < sectionOffsets.length; i++) {
            const sec = sectionOffsets[i];
            const sectionTop = sec.top - 140;
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sec.height) {
                current = sec.id;
            }
        }

        dots.forEach(dot => {
            dot.classList.remove('active');
            if (dot.getAttribute('href') === `#${current}`) {
                dot.classList.add('active');
            }
        });
    });
}
