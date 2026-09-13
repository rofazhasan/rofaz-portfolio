/**
 * MAIN CLIENT APPLICATION CONTROLLER
 * Blended 25 Top-Notch Portfolios Style
 * Initializes UI rendering, sound feedback, 3D tag sphere, interactive terminal,
 * cursor spotlight, dual-lens switcher, live telemetry, and navigation observers.
 */

import { PORTFOLIO_DATA } from '../data/portfolio-data.js';
import { initSystemGraph } from './system-graph.js';
import { initAILab } from './ai-lab.js';
import { initCaseStudies } from './case-studies.js';
import { sound } from './audio.js';
import { TagSphere } from './tag-sphere.js';
import { TerminalConsole } from './terminal.js';

document.addEventListener('DOMContentLoaded', () => {
  renderPhilosophy();
  renderProjects();
  renderTechStack();
  renderEducationAndHonors();
  renderRepositories();

  initNavigation();
  initCommandPalette();
  initSystemGraph();
  initAILab();
  initCaseStudies();

  // Blended Showcase Features
  initSpotlight();
  initScrollProgress();
  initSoundToggle();
  initDhakaClock();
  initDualLens();
  initTagSphere();
  initTerminal();
  initAudioInteractions();
  initMagneticButtons();
});

/**
 * 01. Render Engineering Philosophy
 */
function renderPhilosophy() {
  const container = document.getElementById('philosophy-grid');
  if (!container) return;

  container.innerHTML = PORTFOLIO_DATA.philosophy.map(p => `
    <div class="philosophy-card">
      <span class="phil-number">${p.number} // PRINCIPLE</span>
      <h3 class="phil-title">${p.title}</h3>
      <p class="phil-summary">${p.summary}</p>
    </div>
  `).join('');
}

/**
 * 02. Render Featured Projects
 */
function renderProjects() {
  const container = document.getElementById('projects-container');
  if (!container) return;

  container.innerHTML = PORTFOLIO_DATA.featuredProjects.map(project => {
    const lensCategory = project.id === 'focusguard' ? 'sys' : (project.id === 'omrview' ? 'ai' : 'both');
    return `
    <article class="project-card" id="project-${project.id}" data-lens-cat="${lensCategory}">
      <div class="project-content">
        <div>
          <div class="project-header-meta">
            <span class="project-badge">${project.badge}</span>
            <span class="project-period">${project.period}</span>
          </div>
          <h3 class="project-name">${project.title}</h3>
          <div class="project-role-cat">${project.role} &bull; ${project.category}</div>
          <p class="project-summary">${project.summary}</p>

          <ul class="project-highlights">
            ${project.highlights.slice(0, 3).map(h => `<li>${h}</li>`).join('')}
          </ul>
        </div>

        <div>
          <div class="project-tags">
            ${project.tags.map(t => `<span class="tag-pill">${t}</span>`).join('')}
          </div>

          <div class="project-actions">
            <button class="btn-primary open-case-study-btn" data-project-id="${project.id}">
              <span>View Case Study</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </button>
            ${project.liveUrl ? `<a href="${project.liveUrl}" target="_blank" rel="noopener" class="btn-secondary">Production Live &nearr;</a>` : ''}
            ${project.githubUrl ? `<a href="${project.githubUrl}" target="_blank" rel="noopener" class="btn-secondary">Code &nearr;</a>` : ''}
          </div>
        </div>
      </div>

      <div class="project-visual">
        <div style="margin-bottom: 12px; font-family: var(--font-mono); font-size: 11px; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.08em;">
          Pipeline Architecture
        </div>
        <div class="pipeline-diagram">
          ${project.architecture.map(a => `
            <div class="pipeline-node">
              <div class="pipe-title">${a.step}</div>
              <div class="pipe-desc">${a.desc}</div>
            </div>
          `).join('')}
        </div>
      </div>
    </article>
    `;
  }).join('');
}

/**
 * 03. Render Tech Stack Taxonomy
 */
function renderTechStack() {
  const container = document.getElementById('tech-grid');
  if (!container) return;

  container.innerHTML = PORTFOLIO_DATA.techStack.map(cat => `
    <div class="tech-cat-card">
      <h3 class="tech-cat-name">${cat.category}</h3>
      <div class="tech-items-list">
        ${cat.items.map(item => `
          <div class="tech-item">
            <div class="tech-name-row">
              <span>${item.name}</span>
              <span class="tech-project-cite">[${item.project}]</span>
            </div>
            <div class="tech-context">${item.context}</div>
          </div>
        `).join('')}
      </div>
    </div>
  `).join('');
}

/**
 * 04. Render Education & Honors
 */
function renderEducationAndHonors() {
  const eduContainer = document.getElementById('edu-container');
  const honorsContainer = document.getElementById('honors-container');

  if (eduContainer) {
    eduContainer.innerHTML = PORTFOLIO_DATA.education.map(e => `
      <div class="edu-card" style="margin-bottom: 16px;">
        <span class="edu-time">${e.period}</span>
        <h3 class="edu-inst">${e.institution}</h3>
        <div class="edu-degree">${e.degree}</div>
        <ul class="edu-bullets">
          ${e.details.map(d => `<li>${d}</li>`).join('')}
        </ul>
      </div>
    `).join('');
  }

  if (honorsContainer) {
    honorsContainer.innerHTML = PORTFOLIO_DATA.honors.map(h => `
      <div class="edu-card" style="margin-bottom: 16px;">
        <span class="edu-time">${h.year} &bull; ${h.issuer}</span>
        <h3 class="edu-inst" style="font-size: 17px;">${h.title}</h3>
        <p style="font-size: 13px; color: var(--text-secondary); margin-top: 6px; line-height: 1.55;">${h.summary}</p>
      </div>
    `).join('');
  }
}

/**
 * 05. Render Open Source Repositories
 */
function renderRepositories() {
  const container = document.getElementById('repos-grid');
  if (!container) return;

  container.innerHTML = PORTFOLIO_DATA.repositories.map(repo => `
    <a href="${repo.url}" target="_blank" rel="noopener" class="repo-card">
      <div>
        <div class="repo-top">
          <span class="repo-name">${repo.name}</span>
          <span class="repo-arrow">&nearr;</span>
        </div>
        <p class="repo-desc">${repo.description}</p>
      </div>
      <div class="repo-tech">${repo.tech}</div>
    </a>
  `).join('');
}

/**
 * 06. Dynamic Cursor Spotlight (Brittany Chiang & Rauno Freiberg)
 */
function initSpotlight() {
  let ticking = false;

  window.addEventListener('mousemove', (e) => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
        document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
}

/**
 * 07. Top Scroll Reading Progress Bar
 */
function initScrollProgress() {
  const progressBar = document.getElementById('scroll-progress');
  if (!progressBar) return;

  window.addEventListener('scroll', () => {
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (docHeight > 0) {
      const scrolled = (window.scrollY / docHeight) * 100;
      progressBar.style.width = `${scrolled}%`;
    }
  }, { passive: true });
}

/**
 * 08. Sound Feedback Toggle (Josh Comeau & Rauno Freiberg)
 */
function initSoundToggle() {
  const toggleBtn = document.getElementById('sound-toggle');
  const label = document.getElementById('sound-label');
  if (!toggleBtn) return;

  function updateUI() {
    const isEnabled = sound.isEnabled();
    if (isEnabled) {
      toggleBtn.classList.add('active');
      if (label) label.textContent = 'Audio: ON';
    } else {
      toggleBtn.classList.remove('active');
      if (label) label.textContent = 'Audio: OFF';
    }
  }

  updateUI();

  toggleBtn.addEventListener('click', () => {
    sound.toggle();
    updateUI();
  });
}

/**
 * 09. Real-Time Dhaka BST Clock (Lee Robinson style)
 */
function initDhakaClock() {
  const clockEl = document.getElementById('dhaka-clock');
  if (!clockEl) return;

  function updateTime() {
    const now = new Date();
    // Format in Dhaka timezone UTC+6
    const options = {
      timeZone: 'Asia/Dhaka',
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    };
    clockEl.textContent = `${now.toLocaleTimeString('en-GB', options)} BST`;
  }

  updateTime();
  setInterval(updateTime, 1000);
}

/**
 * 10. Dual-Lens Perspective Filter (Adham Dannaway style)
 */
function initDualLens() {
  const lensButtons = document.querySelectorAll('.lens-btn');
  if (lensButtons.length === 0) return;

  lensButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      sound.playLensSwitch();
      const lens = btn.getAttribute('data-lens');

      lensButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const projectCards = document.querySelectorAll('.project-card');
      projectCards.forEach(card => {
        const cat = card.getAttribute('data-lens-cat');
        if (lens === 'all') {
          card.classList.remove('filtered-out');
        } else if (lens === 'ai') {
          if (cat === 'ai' || cat === 'both') {
            card.classList.remove('filtered-out');
          } else {
            card.classList.add('filtered-out');
          }
        } else if (lens === 'sys') {
          if (cat === 'sys' || cat === 'both') {
            card.classList.remove('filtered-out');
          } else {
            card.classList.add('filtered-out');
          }
        }
      });
    });
  });
}

/**
 * 11. 3D Interactive Tech Sphere (Jack Jeznach style)
 */
function initTagSphere() {
  const canvas = document.getElementById('sphere-canvas');
  if (canvas) {
    new TagSphere('sphere-canvas');
  }
}

/**
 * 12. Cyber-Engineering Interactive Terminal (Jesse Zhou & Tamal Sen style)
 */
function initTerminal() {
  const termTrigger = document.getElementById('term-trigger-btn');
  const termCloseBtn = document.getElementById('term-close-btn');
  const termCloseDot = document.getElementById('term-close-dot');

  const term = new TerminalConsole('terminal-drawer', 'term-input', 'term-output');

  if (termTrigger) {
    termTrigger.addEventListener('click', () => term.toggle());
  }

  if (termCloseBtn) {
    termCloseBtn.addEventListener('click', () => term.close());
  }

  if (termCloseDot) {
    termCloseDot.addEventListener('click', () => term.close());
  }
}

/**
 * 13. Subtle Sound FX Hook for Interactive Elements
 */
function initAudioInteractions() {
  document.addEventListener('click', (e) => {
    const target = e.target.closest('button, a, .repo-card, .sample-select');
    if (target && !target.id?.includes('sound-toggle')) {
      if (target.classList.contains('lab-tab-btn') || target.classList.contains('cv-stage-btn')) {
        sound.playBlip();
      } else {
        sound.playClick();
      }
    }
  });
}

/**
 * 14. Magnetic Button Micro-Physics (Olaolu Olawuyi style)
 */
function initMagneticButtons() {
  const buttons = document.querySelectorAll('.btn-primary');

  buttons.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0px, 0px)';
    });
  });
}

/**
 * 15. Navigation Scroll & Active Section Highlighting
 */
function initNavigation() {
  const nav = document.getElementById('site-nav');
  const toggle = document.getElementById('mobile-toggle');
  const drawer = document.getElementById('mobile-drawer');
  const links = document.querySelectorAll('.nav-link, .drawer-link');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  });

  if (toggle && drawer) {
    toggle.addEventListener('click', () => {
      drawer.classList.toggle('open');
    });

    document.querySelectorAll('.drawer-link').forEach(l => {
      l.addEventListener('click', () => drawer.classList.remove('open'));
    });
  }

  // Active section tracking
  const sections = document.querySelectorAll('section[id]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        links.forEach(l => {
          if (l.getAttribute('href') === `#${id}`) {
            l.classList.add('active');
          } else {
            l.classList.remove('active');
          }
        });
      }
    });
  }, { threshold: 0.3 });

  sections.forEach(s => observer.observe(s));
}

/**
 * 16. Keyboard Command Palette (Shortcut: "/" or "Cmd+K")
 */
function initCommandPalette() {
  const overlay = document.getElementById('cmd-overlay');
  const input = document.getElementById('cmd-input');
  const resultsContainer = document.getElementById('cmd-results');
  const triggers = document.querySelectorAll('.cmd-trigger');

  if (!overlay || !input || !resultsContainer) return;

  const commands = [
    { label: "Go to Digital School (AI Platform)", shortcut: "Projects", action: () => scrollToId('project-digital-school') },
    { label: "Go to OMRView (Computer Vision)", shortcut: "Projects", action: () => scrollToId('project-omrview') },
    { label: "Go to FocusGuard (Systems Daemon)", shortcut: "Projects", action: () => scrollToId('project-focusguard') },
    { label: "Open AI Lab Playground", shortcut: "Lab", action: () => scrollToId('ai-lab') },
    { label: "Explore Technical Stack", shortcut: "Skills", action: () => scrollToId('engineering') },
    { label: "View Verified Education & RUET Details", shortcut: "Bio", action: () => scrollToId('education') },
    { label: "Download Resume PDF", shortcut: "PDF", action: () => window.open(PORTFOLIO_DATA.profile.contacts.resumePdf, '_blank') },
    { label: "Open GitHub Profile", shortcut: "External", action: () => window.open(PORTFOLIO_DATA.profile.contacts.github, '_blank') },
    { label: "Send Direct Email", shortcut: "Contact", action: () => window.location.href = `mailto:${PORTFOLIO_DATA.profile.contacts.email}` }
  ];

  function openPalette() {
    sound.playBlip();
    overlay.classList.add('open');
    input.value = '';
    renderResults(commands);
    setTimeout(() => input.focus(), 50);
  }

  function closePalette() {
    overlay.classList.remove('open');
  }

  triggers.forEach(t => t.addEventListener('click', openPalette));

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closePalette();
  });

  document.addEventListener('keydown', (e) => {
    if ((e.key === '/' && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') ||
        (e.key === 'k' && (e.metaKey || e.ctrlKey))) {
      e.preventDefault();
      if (overlay.classList.contains('open')) closePalette();
      else openPalette();
    } else if (e.key === 'Escape' && overlay.classList.contains('open')) {
      closePalette();
    }
  });

  input.addEventListener('input', () => {
    const query = input.value.toLowerCase().trim();
    const filtered = commands.filter(c => c.label.toLowerCase().includes(query) || c.shortcut.toLowerCase().includes(query));
    renderResults(filtered);
  });

  function renderResults(list) {
    if (list.length === 0) {
      resultsContainer.innerHTML = `<li style="padding: 14px; text-align: center; color: var(--text-muted); font-size: 13px;">No commands matching query</li>`;
      return;
    }

    resultsContainer.innerHTML = list.map((c, i) => `
      <li class="cmd-item" data-index="${i}">
        <span>${c.label}</span>
        <span class="cmd-item-shortcut">${c.shortcut}</span>
      </li>
    `).join('');

    resultsContainer.querySelectorAll('.cmd-item').forEach(item => {
      item.addEventListener('click', () => {
        const idx = parseInt(item.dataset.index, 10);
        list[idx].action();
        closePalette();
      });
    });
  }

  function scrollToId(id) {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
