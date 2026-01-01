const experienceData = [
    {
        company: "Infor",
        logo: "https://raw.githubusercontent.com/k-e-s-h-a-v/k-e-s-h-a-v.github.io/refs/heads/main/public/assets/Infor.png",
        role: "Software Engineer II",
        date: "Jul 2024 – Present",
        location: "Hyderabad, India",
        bullets: [
            "Integrated <strong>Apache Superset</strong> with <strong>Delta Lake</strong> into the DataMesh platform, launching 20 real-time dashboards for <strong>20,000+ users</strong>.",
            "Implemented <strong>CDC (capture data change)</strong> on <strong>MongoDB</strong> to build audit trails.",
            "Diagnosed and resolved critical <strong>memory leaks</strong>, boosting performance by up to <strong>90%</strong>.",
            "Implemented <strong>React error boundary</strong> to proactively capture runtime errors.",
            "Developed <strong>Tiptap rich text editor</strong> and media viewer adopted by <strong>25,000 users</strong>.",
            "Built a <strong>WYSIWYG email template editor</strong>, saving users about <strong>5 hours weekly</strong>.",
            "Architected an <strong>invoice processing system</strong> using <strong>Qwen</strong>, reducing SLA from 48 hours to <strong>1.5 minutes</strong> and saving <strong>$50K/month</strong>."
        ]
    },
    {
        company: "Albanero (acquired by Infor)",
        logo: "https://raw.githubusercontent.com/k-e-s-h-a-v/k-e-s-h-a-v.github.io/refs/heads/main/public/assets/albanero.jfif",
        role: "Software Engineer II",
        date: "Jan 2024 – Jul 2024",
        location: "Hyderabad, India",
        bullets: [
            "Cut memory usage in <strong>CSV-to-Excel pipeline</strong> by <strong>90%</strong>, saving <strong>20 hours per week</strong>.",
            "Built <strong>custom React hooks</strong> and leveraged <strong>Context API</strong> to reduce code duplication from 40% to 5%.",
            "Engineered multi-GB CSV merging feature, processing over <strong>100K files</strong> to date."
        ]
    },
    {
        company: "Albanero (acquired by Infor)",
        logo: "https://raw.githubusercontent.com/k-e-s-h-a-v/k-e-s-h-a-v.github.io/refs/heads/main/public/assets/albanero.jfif",
        role: "Team Lead",
        date: "May 2023 – Jan 2024",
        location: "Hyderabad, India",
        bullets: [
            "Built a <strong>data mastering system</strong> using <strong>Jaro-Winkler algorithm</strong> to deduplicate 400K+ records.",
            "Led a team of <strong>6 engineers</strong> to deliver products in just <strong>6 weeks</strong>.",
            "Conducted <strong>80+ training sessions</strong> for 100+ employees on DataMesh.",
            "Standardized entity names using <strong>NER</strong> and <strong>spaCy</strong>, reducing manual effort by <strong>1 hour daily</strong>."
        ]
    },
    {
        company: "Albanero (acquired by Infor)",
        logo: "https://raw.githubusercontent.com/k-e-s-h-a-v/k-e-s-h-a-v.github.io/refs/heads/main/public/assets/albanero.jfif",
        role: "Software Engineer I",
        date: "Sep 2022 – May 2023",
        location: "Hyderabad, India",
        bullets: [
            "Upgraded Node.js and migrated 20+ microfrontends from <strong>Vue.js to ReactJS</strong>.",
            "Built a dynamic <strong>SQL query generator</strong> handling <strong>1M+ queries/day</strong>.",
            "Introduced <strong>smart validation</strong> with global time-aware scheduling, reducing errors by <strong>20%</strong>."
        ]
    },
    {
        company: "Albanero (acquired by Infor)",
        logo: "https://raw.githubusercontent.com/k-e-s-h-a-v/k-e-s-h-a-v.github.io/refs/heads/main/public/assets/albanero.jfif",
        role: "Software Engineer Intern",
        date: "Jun 2021 – Sep 2022",
        location: "Remote",
        bullets: [
            "Implemented <strong>multi-theme support</strong> and standardized SCSS practices.",
            "Built core <strong>IAM features</strong> and real-time status updates via <strong>Socket.io</strong>, serving 2,000+ users."
        ]
    }
];

// Desktop: Ancient map style with curved path
function initExperienceDesktop() {
    const container = document.querySelector('.milestones-container');
    const expContainer = document.querySelector('.experience-container');
    const svg = document.querySelector('.road-svg');
    const svgPath = document.querySelector('.road-path');

    if (!container || !svg || !svgPath || !expContainer) return;

    // Show SVG
    svg.style.display = 'block';

    let blurPath = svg.querySelector('.road-path-blur');
    if (!blurPath) {
        blurPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        blurPath.setAttribute('class', 'road-path-blur');
        svg.insertBefore(blurPath, svgPath);
    }

    const width = 800;
    const height = experienceData.length * 300;

    let pathD = `M ${width / 2} 0`;
    const milestones = [];

    for (let i = 0; i < experienceData.length; i++) {
        const y = (i + 0.5) * 300;
        const isLeft = i % 2 !== 0;
        const xOffset = isLeft ? -150 : 150;
        const x = width / 2 + xOffset;

        const prevY = i === 0 ? 0 : (i - 0.5) * 300;
        const cp1y = prevY + 150;
        const cp2y = y - 150;

        pathD += ` C ${width / 2} ${cp1y}, ${x} ${cp2y}, ${x} ${y}`;
        milestones.push({ x, y, isLeft });
    }

    pathD += ` C ${milestones[milestones.length - 1].x} ${height}, ${width / 2} ${height}, ${width / 2} ${height + 100}`;

    svgPath.setAttribute('d', pathD);
    blurPath.setAttribute('d', pathD);
    svgPath.parentElement.setAttribute('viewBox', `0 0 ${width} ${height + 100}`);

    container.innerHTML = '';

    let popupsOverlay = document.getElementById('experience-popups-overlay');
    if (!popupsOverlay) {
        popupsOverlay = document.createElement('div');
        popupsOverlay.id = 'experience-popups-overlay';
        document.body.appendChild(popupsOverlay);
    }
    popupsOverlay.innerHTML = '';

    experienceData.forEach((exp, i) => {
        const m = milestones[i];
        const milestoneId = `milestone-${i}`;

        const milestoneEl = document.createElement('div');
        milestoneEl.className = `milestone ${m.isLeft ? 'on-left' : 'on-right'}`;
        if (exp.company === "Infor" && exp.date.includes("Present")) {
            milestoneEl.classList.add('is-current');
        }
        milestoneEl.id = milestoneId;
        milestoneEl.style.left = `${(m.x / width) * 100}%`;
        milestoneEl.style.top = `${m.y}px`;

        milestoneEl.innerHTML = `
            <div class="milestone-marker"></div>
            <div class="milestone-label">
                <span class="label-role">
                    ${exp.logo ? `<img src="${exp.logo}" class="company-logo" alt="${exp.company}">` : ''}
                    ${exp.role}
                </span>
                <span class="label-meta">${exp.company} • ${exp.date.split(' – ')[1] || exp.date}</span>
                <span class="label-meta">${exp.location}</span>
            </div>
        `;

        const popupEl = document.createElement('div');
        popupEl.className = 'experience-popup';
        popupEl.dataset.for = milestoneId;
        popupEl.innerHTML = `
            <div class="popup-header">
                <div class="header-text">
                    <div class="popup-title">${exp.role}</div>
                    <div class="popup-company">${exp.company}</div>
                </div>
                ${exp.logo ? `<img src="${exp.logo}" class="popup-logo" alt="${exp.company}">` : ''}
            </div>
            <div class="popup-date-loc">
                <span>${exp.date}</span>
                <span>${exp.location}</span>
            </div>
            <ul class="popup-bullets">
                ${exp.bullets.map(b => `<li>${b}</li>`).join('')}
            </ul>
        `;

        container.appendChild(milestoneEl);
        popupsOverlay.appendChild(popupEl);
    });

    // Inject Map Artifacts
    const artifacts = [
        { type: 'mountain', x: 50, y: 100, size: 40 },
        { type: 'mountain', x: 100, y: 150, size: 60 },
        { type: 'mountain', x: 130, y: 180, size: 40 },
        { type: 'forest', x: 600, y: 100, size: 80 },
        { type: 'forest', x: 650, y: 140, size: 60 },
        { type: 'river', x: 200, y: 400, width: 400, height: 100 },
        { type: 'bridge', x: 380, y: 430, size: 50 },
        { type: 'fort', x: 680, y: 280, size: 70 },
        { type: 'ruins', x: 50, y: 500, size: 60 },
        { type: 'serpent', x: 550, y: 750, size: 100 },
        { type: 'lighthouse', x: 720, y: 900, size: 80 },
        { type: 'treasure', x: 150, y: 800, size: 40 },
        { type: 'ship', x: 600, y: 600, size: 50 },
        { type: 'ship', x: 100, y: 1200, size: 40 },
        { type: 'forest', x: 50, y: 1400, size: 100 },
        { type: 'mountain', x: 650, y: 1300, size: 90 },
        { type: 'compass', x: 50, y: height - 120, size: 120 }
    ];

    const getArtifactSVG = (type) => {
        const svgMap = {
            mountain: '<path d="M0,40 L20,0 L40,40 Z M15,40 L30,10 L45,40 Z" />',
            river: '<path d="M0,50 Q100,0 200,50 T400,50" fill="none" stroke="currentColor" stroke-width="4" stroke-dasharray="10,5" />',
            bridge: '<path d="M0,20 Q25,0 50,20 L50,30 Q25,10 0,30 Z" />',
            fort: '<path d="M0,50 L0,20 L10,20 L10,10 L20,10 L20,20 L30,20 L30,10 L40,10 L40,20 L50,20 L50,50 Z" />',
            treasure: '<path d="M0,30 L50,30 L50,50 L0,50 Z M5,30 Q25,0 45,30 Z" />',
            ship: '<path d="M10,30 Q25,50 40,30 L50,30 L40,10 L10,10 L0,30 Z M25,10 L25,0 L35,5 Z" />',
            compass: '<circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" stroke-width="2"/><path d="M50,10 L55,45 L50,50 L45,45 Z M50,90 L45,55 L50,50 L55,55 Z" fill="currentColor"/>',
            forest: '<path d="M10,40 L20,10 L30,40 Z M25,40 L35,15 L45,40 Z M40,40 L50,20 L60,40 Z" />',
            ruins: '<path d="M0,40 L0,10 L10,10 L10,40 M20,40 L20,20 L30,20 L30,40 M40,40 L40,5 L50,5 L50,40" fill="none" stroke="currentColor" stroke-width="2" />',
            serpent: '<path d="M0,50 Q25,0 50,50 T100,50 M80,30 Q90,20 100,30" fill="none" stroke="currentColor" stroke-width="3" />',
            lighthouse: '<path d="M10,50 L20,0 L30,0 L40,50 Z M20,10 L30,10 M20,20 L30,20" fill="none" stroke="currentColor" stroke-width="2" /><circle cx="25" cy="5" r="3" />'
        };
        return svgMap[type] || '';
    };

    artifacts.forEach(art => {
        const artEl = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        artEl.setAttribute('class', 'map-artifact');
        artEl.style.left = `${art.x}px`;
        artEl.style.top = `${art.y}px`;
        artEl.style.width = `${art.size || art.width}px`;
        artEl.style.height = `${art.size || art.height}px`;
        artEl.setAttribute('viewBox', `0 0 ${art.size || art.width || 60} ${art.size || art.height || 60}`);
        artEl.innerHTML = getArtifactSVG(art.type);
        container.appendChild(artEl);
    });

    expContainer.style.height = `${height + 200}px`;

    const handleMouseMove = (e) => {
        const allMilestones = container.querySelectorAll('.milestone');
        allMilestones.forEach(milestone => {
            const marker = milestone.querySelector('.milestone-marker');
            const popup = document.querySelector(`.experience-popup[data-for="${milestone.id}"]`);
            if (!marker || !popup) return;

            const rect = marker.getBoundingClientRect();
            const markerX = rect.left + rect.width / 2;
            const markerY = rect.top + rect.height / 2;

            const distance = Math.sqrt(Math.pow(e.clientX - markerX, 2) + Math.pow(e.clientY - markerY, 2));

            if (distance < 50) {
                popup.style.opacity = '1';
                popup.style.visibility = 'visible';

                const offset = 30;
                let x = e.clientX + offset;
                let y = e.clientY + offset;

                const popupWidth = 650;
                const popupHeight = popup.offsetHeight || 300;

                if (x + popupWidth > window.innerWidth - 40) {
                    x = e.clientX - popupWidth - offset;
                }
                if (y + popupHeight > window.innerHeight - 40) {
                    y = e.clientY - popupHeight - offset;
                }
                const headerLimit = 90;
                if (y < headerLimit) {
                    y = headerLimit + offset;
                }

                popup.style.left = `${x}px`;
                popup.style.top = `${y}px`;
            } else {
                popup.style.opacity = '0';
                popup.style.visibility = 'hidden';
            }
        });
    };

    if (window._experienceMouseMoveHandler) {
        window.removeEventListener('mousemove', window._experienceMouseMoveHandler);
    }
    window._experienceMouseMoveHandler = handleMouseMove;
    window.addEventListener('mousemove', handleMouseMove);
}

// Mobile: Modern card design with straight timeline
function initExperienceMobile() {
    const container = document.querySelector('.milestones-container');
    const expContainer = document.querySelector('.experience-container');
    const svg = document.querySelector('.road-svg');

    if (!container || !expContainer) return;

    // Hide SVG on mobile
    if (svg) svg.style.display = 'none';

    container.innerHTML = '';
    expContainer.style.height = 'auto';

    // Create modern timeline
    const timeline = document.createElement('div');
    timeline.className = 'modern-timeline';
    container.appendChild(timeline);

    experienceData.forEach((exp, i) => {
        const card = document.createElement('div');
        card.className = 'experience-card';
        if (exp.company === "Infor" && exp.date.includes("Present")) {
            card.classList.add('is-current');
        }

        card.innerHTML = `
            <div class="card-dot"></div>
            <div class="card-content">
                <div class="card-header">
                    ${exp.logo ? `<img src="${exp.logo}" class="card-logo" alt="${exp.company}">` : ''}
                    <div class="card-title-group">
                        <h3 class="card-title">${exp.role}</h3>
                        <p class="card-company">${exp.company}</p>
                    </div>
                </div>
                <div class="card-meta">
                    <span class="card-date">${exp.date}</span>
                    <span class="card-location">${exp.location}</span>
                </div>
                <ul class="card-bullets">
                    ${exp.bullets.map(b => `<li>${b}</li>`).join('')}
                </ul>
            </div>
        `;

        timeline.appendChild(card);
    });
}

function initExperience() {
    const mapHint = document.querySelector('.experience-map-hint');
    const isMobile = window.innerWidth < 768;

    if (mapHint) {
        mapHint.textContent = isMobile ? 'Tap to explore' : 'Hover over milestones to see details';
    }

    if (isMobile) {
        initExperienceMobile();
    } else {
        initExperienceDesktop();
    }

    // Re-initialize on window resize
    if (!window._experienceResizeHandler) {
        window._experienceResizeHandler = () => {
            clearTimeout(window._experienceResizeTimeout);
            window._experienceResizeTimeout = setTimeout(() => {
                initExperience();
            }, 250);
        };
        window.addEventListener('resize', window._experienceResizeHandler);
    }
}

document.body.addEventListener('htmx:afterSwap', (e) => {
    if (e.detail.target.id === 'content' && document.querySelector('.experience-container')) {
        initExperience();
    }
});

if (document.querySelector('.experience-container')) {
    initExperience();
}
