import { skillsData } from '../../data/skillsData.js';

// All skill icons from the portfolio
const allSkills = skillsData.flatMap(category => category.skills);

// Physics engine for Brownian motion with collision detection
let particles = [];
let animationFrameId = null;

class Particle {
    constructor(skill, containerWidth, containerHeight, existingParticles) {
        this.skill = skill;
        this.size = 40 + Math.random() * 60; // 40-100px
        this.radius = this.size / 2;
        this.opacity = 0.15 + Math.random() * 0.2;

        // Find a non-overlapping position
        let attempts = 0;
        let validPosition = false;
        while (!validPosition && attempts < 100) {
            this.x = this.radius + Math.random() * (containerWidth - this.size);
            this.y = this.radius + Math.random() * (containerHeight - this.size);

            validPosition = true;
            for (let other of existingParticles) {
                const dx = this.x - other.x;
                const dy = this.y - other.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < this.radius + other.radius + 10) { // 10px padding
                    validPosition = false;
                    break;
                }
            }
            attempts++;
        }

        // Brownian motion: random initial velocity
        this.vx = (Math.random() - 0.5) * 2; // -1 to 1 px/frame
        this.vy = (Math.random() - 0.5) * 2;

        // Random rotation
        this.rotation = Math.random() * 360;
        this.rotationSpeed = (Math.random() - 0.5) * 2; // degrees per frame

        this.element = null;
        this.hovered = false;
    }

    createDOMElement(container) {
        const logo = document.createElement('div');
        logo.className = 'floating-logo';

        logo.style.cssText = `
      position: absolute;
      width: ${this.size}px;
      height: ${this.size}px;
      opacity: ${this.opacity};
      filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.3));
      transition: opacity 0.3s ease, filter 0.3s ease;
      pointer-events: auto;
      cursor: pointer;
    `;

        const iconUrl = `https://cdn.jsdelivr.net/npm/simple-icons@v${this.skill.version || '16'}/icons/${this.skill.icon}.svg`;
        logo.innerHTML = `<img src="${iconUrl}" alt="${this.skill.name}" style="width: 100%; height: 100%; object-fit: contain; filter: invert(1); user-select: none;" draggable="false" />`;

        // Hover effects
        logo.addEventListener('mouseenter', () => {
            this.hovered = true;
            logo.style.opacity = '0.6';
            logo.style.filter = 'drop-shadow(0 0 20px rgba(255, 255, 255, 0.6))';
            logo.style.transform = `translate(${this.x}px, ${this.y}px) rotate(${this.rotation}deg) scale(1.2)`;
        });

        logo.addEventListener('mouseleave', () => {
            this.hovered = false;
            logo.style.opacity = this.opacity;
            logo.style.filter = 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.3))';
            logo.style.transform = `translate(${this.x}px, ${this.y}px) rotate(${this.rotation}deg) scale(1)`;
        });

        container.appendChild(logo);
        this.element = logo;
        this.updatePosition();
    }

    updatePosition() {
        if (this.element) {
            const scale = this.hovered ? 1.2 : 1;
            this.element.style.transform = `translate(${this.x}px, ${this.y}px) rotate(${this.rotation}deg) scale(${scale})`;
        }
    }

    update(containerWidth, containerHeight, allParticles) {
        // Add Brownian motion: small random forces
        this.vx += (Math.random() - 0.5) * 0.3;
        this.vy += (Math.random() - 0.5) * 0.3;

        // Limit velocity (damping)
        const maxVelocity = 3;
        const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
        if (speed > maxVelocity) {
            this.vx = (this.vx / speed) * maxVelocity;
            this.vy = (this.vy / speed) * maxVelocity;
        }

        // Update position
        this.x += this.vx;
        this.y += this.vy;
        this.rotation += this.rotationSpeed;

        // Boundary collision detection and bounce
        if (this.x - this.radius < 0) {
            this.x = this.radius;
            this.vx = Math.abs(this.vx) * 0.8; // Bounce with some energy loss
        } else if (this.x + this.radius > containerWidth) {
            this.x = containerWidth - this.radius;
            this.vx = -Math.abs(this.vx) * 0.8;
        }

        if (this.y - this.radius < 0) {
            this.y = this.radius;
            this.vy = Math.abs(this.vy) * 0.8;
        } else if (this.y + this.radius > containerHeight) {
            this.y = containerHeight - this.radius;
            this.vy = -Math.abs(this.vy) * 0.8;
        }

        // Check collisions with other particles
        for (let other of allParticles) {
            if (other === this) continue;

            const dx = other.x - this.x;
            const dy = other.y - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const minDistance = this.radius + other.radius;

            if (distance < minDistance) {
                // Collision detected - resolve overlap
                const overlap = minDistance - distance;
                const angle = Math.atan2(dy, dx);

                // Move particles apart
                const moveX = Math.cos(angle) * overlap / 2;
                const moveY = Math.sin(angle) * overlap / 2;

                this.x -= moveX;
                this.y -= moveY;
                other.x += moveX;
                other.y += moveY;

                // Elastic collision response (simplified)
                const normalX = dx / distance;
                const normalY = dy / distance;

                const relativeVelocityX = this.vx - other.vx;
                const relativeVelocityY = this.vy - other.vy;

                const speed = relativeVelocityX * normalX + relativeVelocityY * normalY;

                if (speed < 0) continue; // Already separating

                // Apply impulse
                const impulse = 2 * speed / 2; // Assuming equal mass
                this.vx -= impulse * normalX;
                this.vy -= impulse * normalY;
                other.vx += impulse * normalX;
                other.vy += impulse * normalY;

                // Add some energy damping to prevent endless bouncing
                this.vx *= 0.95;
                this.vy *= 0.95;
                other.vx *= 0.95;
                other.vy *= 0.95;
            }
        }

        this.updatePosition();
    }
}

function createFloatingLogos() {
    const container = document.getElementById('floating-logos');
    if (!container) return;

    // Stop any existing animation
    if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
    }

    // Clear existing logos
    container.innerHTML = '';
    particles = [];

    // Get container dimensions
    const rect = container.getBoundingClientRect();
    const containerWidth = rect.width;
    const containerHeight = rect.height;

    // Create 25 particles with physics
    const logoCount = 25;

    for (let i = 0; i < logoCount; i++) {
        const skill = allSkills[Math.floor(Math.random() * allSkills.length)];
        const particle = new Particle(skill, containerWidth, containerHeight, particles);
        particle.createDOMElement(container);
        particles.push(particle);
    }

    // Start animation loop
    function animate() {
        const rect = container.getBoundingClientRect();
        const containerWidth = rect.width;
        const containerHeight = rect.height;

        for (let particle of particles) {
            particle.update(containerWidth, containerHeight, particles);
        }

        animationFrameId = requestAnimationFrame(animate);
    }

    animate();
}

let typingTimeout = null;

function initTypingEffect() {
    const typingText = document.getElementById('typing-text');
    const subtitleText = document.getElementById('subtitle-text');
    const welcomeMessage = document.getElementById('welcome-message');

    // Only run if welcome message is visible
    if (!typingText || !welcomeMessage || !welcomeMessage.parentElement) return;

    // Reset state
    if (typingTimeout) {
        clearTimeout(typingTimeout);
        typingTimeout = null;
    }

    // Clear text content immediately
    typingText.textContent = '';
    if (subtitleText) {
        subtitleText.textContent = '';
        subtitleText.classList.add('opacity-0');
        subtitleText.classList.remove('transition-opacity', 'duration-500', 'opacity-100');
    }

    const text = 'Welcome';
    const subtitle = 'Select a section from the sidebar to know me.';
    let charIndex = 0;

    function typeChar() {
        if (charIndex < text.length) {
            typingText.textContent += text[charIndex];
            charIndex++;
            typingTimeout = setTimeout(typeChar, 100); // Adjust speed here (milliseconds per character)
        } else {
            // Show subtitle after typing is complete
            typingTimeout = setTimeout(() => {
                if (subtitleText) {
                    subtitleText.textContent = subtitle;
                    subtitleText.classList.remove('opacity-0');
                    subtitleText.classList.add('transition-opacity', 'duration-500', 'opacity-100');
                }
            }, 300);
        }
    }

    // Create floating logos
    createFloatingLogos();

    // Start typing effect
    typeChar();
}

// Cleanup function to stop animations
function cleanupWelcome() {
    if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
    }
    if (typingTimeout) {
        clearTimeout(typingTimeout);
        typingTimeout = null;
    }
    particles = [];
}


// Export functions for external use
if (typeof window !== 'undefined') {
    window.welcomeComponent = {
        init: initTypingEffect,
        cleanup: cleanupWelcome,
        createFloatingLogos: createFloatingLogos
    };
}
