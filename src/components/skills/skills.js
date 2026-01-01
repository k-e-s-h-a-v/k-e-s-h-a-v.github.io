import { skillsData } from '../../data/skillsData.js';

// Function to create a chip element
function createChip(skill) {
  const chip = document.createElement('span');
  chip.className = 'skill-chip';

  const iconUrl = `https://cdn.jsdelivr.net/npm/simple-icons@v${skill.version || '16'}/icons/${skill.icon}.svg`;
  const altText = skill.name;

  chip.innerHTML = `
    <span class="chip-icon">
      <img src="${iconUrl}" alt="${altText}" />
    </span>
    ${skill.name}
  `;

  return chip;
}

// Function to create a skill card
function createSkillCard(category) {
  const card = document.createElement('div');
  card.className = 'skill-card';

  const chipsContainer = document.createElement('div');
  chipsContainer.className = 'skill-chips';

  // Create chips for each skill
  category.skills.forEach(skill => {
    const chip = createChip(skill);
    chipsContainer.appendChild(chip);
  });

  card.innerHTML = `
    <div class="skill-card-header">
      <div class="skill-icon">${category.icon}</div>
      <h3 class="skill-card-title">${category.title}</h3>
    </div>
  `;

  card.appendChild(chipsContainer);
  return card;
}

// Function to render all skills
function renderSkills() {
  const skillsGrid = document.querySelector('.skills-grid');
  if (!skillsGrid) return;

  // Clear existing content
  skillsGrid.innerHTML = '';

  // Create and append cards
  skillsData.forEach((category, index) => {
    const card = createSkillCard(category);
    // Add animation delay
    card.style.animationDelay = `${(index + 1) * 0.1}s`;
    skillsGrid.appendChild(card);
  });
}

// Function to initialize skills rendering
function initSkills() {
  // Small delay to ensure DOM is ready after HTMX swap
  setTimeout(() => {
    renderSkills();
  }, 10);
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initSkills);
} else {
  initSkills();
}

// Re-render when HTMX swaps in the skills section
document.body.addEventListener('htmx:afterSwap', (e) => {
  if (e.detail.target.id === 'content' && document.querySelector('.skills-grid')) {
    initSkills();
  }
});

