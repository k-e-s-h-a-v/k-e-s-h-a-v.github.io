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

function initExperience() {
    const container = document.querySelector('.milestones-container');
    const expContainer = document.querySelector('.experience-container');
    const svg = document.querySelector('.road-svg');
    const svgPath = document.querySelector('.road-path');

    if (!container || !svg || !svgPath || !expContainer) return;

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

    // Create a separate container for popups to avoid transform issues
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
            ${exp.logo ? `<img src="${exp.logo}" class="popup-logo" alt="${exp.company}">` : ''}
            <div class="popup-header">
                <div class="popup-title">${exp.role}</div>
                <div class="popup-company">${exp.company}</div>
                <div class="popup-date-loc">
                    <span>${exp.date}</span>
                    <span>${exp.location}</span>
                </div>
            </div>
            <ul class="popup-bullets">
                ${exp.bullets.map(b => `<li>${b}</li>`).join('')}
            </ul>
        `;

        container.appendChild(milestoneEl);
        popupsOverlay.appendChild(popupEl);
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

            if (distance < 200) {
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

document.body.addEventListener('htmx:afterSwap', (e) => {
    if (e.detail.target.id === 'content' && document.querySelector('.experience-container')) {
        initExperience();
    }
});

if (document.querySelector('.experience-container')) {
    initExperience();
}
