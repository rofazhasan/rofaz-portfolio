/**
 * ROFAZ HASAN RAFIU — AI ENGINEER PORTFOLIO
 * Main Controller Script (ES Module)
 */

import { sound } from './audio.js';
import { TagSphere } from './tag-sphere.js';
import { TerminalConsole } from './terminal.js';

document.addEventListener('DOMContentLoaded', () => {
  initNavbarScroll();
  initMobileMenu();
  initScrollProgress();
  initSpotlight();
  initSoundToggle();
  initExperienceTabs();
  initAILabSandbox();
  initTagSphere();
  initTerminalConsole();
  initScrollReveal();
});

/**
 * 01b. Mobile Drawer & Hamburger Menu
 */
function initMobileMenu() {
  const hamburger = document.getElementById('hamburger-btn');
  const navMenu = document.getElementById('nav-menu');
  const backdrop = document.getElementById('nav-backdrop');
  if (!hamburger || !navMenu) return;

  const toggleMenu = (open) => {
    const isOpen = open !== undefined ? open : !navMenu.classList.contains('open');
    if (isOpen) {
      hamburger.classList.add('active');
      hamburger.setAttribute('aria-expanded', 'true');
      navMenu.classList.add('open');
      if (backdrop) backdrop.classList.add('active');
      document.body.style.overflow = 'hidden';
      sound.playWhoosh();
    } else {
      hamburger.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
      navMenu.classList.remove('open');
      if (backdrop) backdrop.classList.remove('active');
      document.body.style.overflow = '';
      sound.playTick();
    }
  };

  hamburger.addEventListener('click', () => toggleMenu());
  if (backdrop) backdrop.addEventListener('click', () => toggleMenu(false));

  // Close when clicking any nav link
  document.querySelectorAll('.nav-link-item, .nav-resume-btn').forEach(link => {
    link.addEventListener('click', () => {
      toggleMenu(false);
    });
  });

  // Close on Escape key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('open')) {
      toggleMenu(false);
    }
  });
}

/**
 * 01. Navbar Shadow & Blur on Scroll
 */
function initNavbarScroll() {
  const nav = document.getElementById('site-nav');
  if (!nav) return;

  const handleScroll = () => {
    if (window.scrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/**
 * 02. Scroll Progress Bar
 */
function initScrollProgress() {
  const progressBar = document.getElementById('scroll-progress');
  if (!progressBar) return;

  window.addEventListener('scroll', () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
    progressBar.style.width = `${progress}%`;
  }, { passive: true });
}

/**
 * 03. Mouse Spotlight Follower (Velvety Smooth Spring Lerp)
 */
function initSpotlight() {
  const spotlight = document.getElementById('spotlight');
  if (!spotlight) return;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 3;
  let curX = mouseX;
  let curY = mouseY;
  let active = false;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (!active) {
      active = true;
      requestAnimationFrame(animateSpotlight);
    }
  }, { passive: true });

  function animateSpotlight() {
    curX += (mouseX - curX) * 0.12;
    curY += (mouseY - curY) * 0.12;

    spotlight.style.setProperty('--mouse-x', `${curX.toFixed(1)}px`);
    spotlight.style.setProperty('--mouse-y', `${curY.toFixed(1)}px`);

    if (Math.abs(mouseX - curX) > 0.5 || Math.abs(mouseY - curY) > 0.5) {
      requestAnimationFrame(animateSpotlight);
    } else {
      active = false;
    }
  }
}

/**
 * 04. Sound Toggle Feedback
 */
function initSoundToggle() {
  const btn = document.getElementById('sound-toggle');
  const label = document.getElementById('sound-label');
  if (!btn || !label) return;

  // Initialize state
  if (sound.enabled) {
    btn.classList.add('sound-on');
    label.textContent = 'Audio: ON';
  } else {
    btn.classList.remove('sound-on');
    label.textContent = 'Audio: OFF';
  }

  btn.addEventListener('click', () => {
    const active = sound.toggle();
    if (active) {
      btn.classList.add('sound-on');
      label.textContent = 'Audio: ON';
    } else {
      btn.classList.remove('sound-on');
      label.textContent = 'Audio: OFF';
    }
  });

  // Attach sound to interactive links & buttons
  document.querySelectorAll('a, button, .jobs-tab-btn, .lab-tab-btn').forEach(el => {
    el.addEventListener('mouseenter', () => sound.playTick());
    el.addEventListener('click', () => sound.playClick());
  });
}

/**
 * 05. Experience / Jobs Tabs (Brittany Chiang style)
 */
function initExperienceTabs() {
  const tabBtns = document.querySelectorAll('.jobs-tab-btn');
  const tabPanels = document.querySelectorAll('.job-panel');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-tab');

      tabBtns.forEach(b => b.classList.remove('active'));
      tabPanels.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const targetPanel = document.getElementById(targetId);
      if (targetPanel) {
        targetPanel.classList.add('active');
      }
      sound.playWhoosh();
    });
  });
}

/**
 * 06. AI Systems Laboratory Sandbox
 */
function initAILabSandbox() {
  // Sandbox Tab Switching
  const labTabs = document.querySelectorAll('.lab-tab-btn');
  const labPanels = document.querySelectorAll('.sandbox-panel');

  labTabs.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-sandbox');

      labTabs.forEach(b => b.classList.remove('active'));
      labPanels.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const targetPanel = document.getElementById(`sandbox-${target}`);
      if (targetPanel) {
        targetPanel.classList.add('active');
      }
      sound.playWhoosh();
    });
  });

  // 1. SLM Preset Runner
  const slmPreset = document.getElementById('slm-preset');
  const slmPromptPreview = document.getElementById('slm-prompt-preview');
  const slmRunBtn = document.getElementById('run-slm-btn');
  const slmOutput = document.getElementById('slm-output');
  const slmLatency = document.getElementById('slm-latency');

  const slmPrompts = {
    calc: `// Input Vector: Calculus Integration Error
{
  "student_id": "ug_2103042",
  "question_id": "math_211_q4",
  "error_pattern": "Failed to apply chain rule in d/dx[sin(3x^2)]; missed inner derivative (6x).",
  "score": 0,
  "time_spent_sec": 142
}`,
    dsa: `// Input Vector: Graph Algorithm Out of Bounds
{
  "student_id": "ug_2103042",
  "question_id": "dsa_204_q2",
  "error_pattern": "Dijkstra PriorityQueue comparator inverted min-heap to max-heap; cycle infinite loop.",
  "score": 0,
  "time_spent_sec": 310
}`,
    cv: `// Input Vector: Perspective Distortion Uncalibrated
{
  "student_id": "ug_2103042",
  "question_id": "cv_310_q1",
  "error_pattern": "Intrinsic matrix focal length fx, fy omitted during 2D-to-3D projection.",
  "score": 0,
  "time_spent_sec": 85
}`
  };

  const slmOutputs = {
    calc: `{
  "topic": "Calculus // Differential Calculus",
  "conceptual_gap": "Chain Rule Composition",
  "severity": "CRITICAL",
  "recommended_remediation": [
    "Review composite function differentiation d/dx[f(g(x))]",
    "Interactive visualization: inner derivative rate of change"
  ],
  "confidence_score": 0.984,
  "deterministic_fallback_invoked": false
}`,
    dsa: `{
  "topic": "Data Structures // Heap Ordering",
  "conceptual_gap": "Min-Heap Comparator Inversion",
  "severity": "HIGH",
  "recommended_remediation": [
    "Dijkstra greedy invariant: expand minimum distance node",
    "Comparator polarity test in C++ priority_queue"
  ],
  "confidence_score": 0.991,
  "deterministic_fallback_invoked": false
}`,
    cv: `{
  "topic": "Computer Vision // Camera Geometry",
  "conceptual_gap": "Camera Intrinsic Calibration",
  "severity": "MEDIUM",
  "recommended_remediation": [
    "Pinhole camera model projection equations",
    "OpenCV calibrateCamera checkerboard workflow"
  ],
  "confidence_score": 0.967,
  "deterministic_fallback_invoked": false
}`
  };

  if (slmPreset && slmPromptPreview) {
    slmPreset.addEventListener('change', () => {
      slmPromptPreview.textContent = slmPrompts[slmPreset.value] || '';
    });
    slmPromptPreview.textContent = slmPrompts.calc;
  }

  if (slmRunBtn && slmOutput) {
    slmRunBtn.addEventListener('click', () => {
      slmOutput.textContent = 'Streaming tokens from Ollama worker (Qwen 2.5 3B)...';
      slmOutput.style.color = 'var(--text-light)';
      if (slmLatency) slmLatency.textContent = 'LATENCY: COMPUTING...';

      setTimeout(() => {
        const val = slmPreset ? slmPreset.value : 'calc';
        slmOutput.textContent = slmOutputs[val];
        slmOutput.style.color = 'var(--green)';
        if (slmLatency) slmLatency.textContent = 'LATENCY: 42ms (Local Ollama)';
        sound.playChirp(600, 900, 0.1, 'sine');
      }, 350);
    });
  }

  // 2. CV Homography Runner
  const cvRunBtn = document.getElementById('run-cv-btn');
  const cvOutput = document.getElementById('cv-output');
  const cvLatency = document.getElementById('cv-latency');
  const cvDistortion = document.getElementById('cv-distortion');

  if (cvRunBtn && cvOutput) {
    cvRunBtn.addEventListener('click', () => {
      cvOutput.textContent = 'Running OpenCV.js C++ WebAssembly perspectiveTransform()...';
      cvOutput.style.color = 'var(--text-light)';

      setTimeout(() => {
        const isSevere = cvDistortion && cvDistortion.value === 'severe';
        cvOutput.textContent = `// 3x3 Computed Perspective Projection Matrix
H = [
  [ ${isSevere ? '1.4284' : '1.1042'},  0.0381,  -42.500 ],
  [ 0.0210,  ${isSevere ? '1.5812' : '1.1294'},  -38.120 ],
  [ 0.0001,  0.0003,   1.0000 ]
]

Homography Status: RECTIFIED
Bubble ROIs Segmented: 100 / 100
Edge Warp Error: 0.42 px (Sub-pixel accuracy)`;
        cvOutput.style.color = 'var(--green)';
        if (cvLatency) cvLatency.textContent = 'WASM LATENCY: 12ms (Client Edge)';
        sound.playChirp(700, 1100, 0.1, 'sine');
      }, 300);
    });
  }

  // 3. Schema Guardrail Runner
  const schemaRunBtn = document.getElementById('run-schema-btn');
  const schemaOutput = document.getElementById('schema-output');
  const schemaPayload = document.getElementById('schema-payload');

  if (schemaRunBtn && schemaOutput) {
    schemaRunBtn.addEventListener('click', () => {
      schemaOutput.textContent = 'Validating output buffer through Zod schema guardrails...';
      schemaOutput.style.color = 'var(--text-light)';

      setTimeout(() => {
        const isCorrupt = schemaPayload && schemaPayload.value === 'corrupt';
        if (isCorrupt) {
          schemaOutput.textContent = `[SCHEMA VIOLATION DETECTED]
Error: Field 'confidence_score' missing. Expected float, received null.
Trigger: Prompt injection or model truncation.

==> DETERMINISTIC FALLBACK INITIATED:
Sub-10ms PostgreSQL topic distribution algorithm executed.
Report served with verified historical topic distribution.
Zero student assessment interruption.`;
          schemaOutput.style.color = '#fb7185';
        } else {
          schemaOutput.textContent = `[SCHEMA VALIDATION PASSED]
DiagnosticsSchema: 100% compliant.
Memory sanitized. Zero serialization exceptions.
Database write committed via Prisma transaction.`;
          schemaOutput.style.color = 'var(--green)';
        }
        sound.playChirp(500, 800, 0.1, 'sine');
      }, 250);
    });
  }
}

/**
 * 07. 3D Canvas Tag Sphere
 */
function initTagSphere() {
  const canvas = document.getElementById('sphereCanvas');
  if (canvas) {
    new TagSphere('sphereCanvas');
  }
}

/**
 * 08. Cyber Terminal Console
 */
function initTerminalConsole() {
  const modal = document.getElementById('terminal-modal');
  const trigger = document.getElementById('terminal-trigger');
  const closeBtn = document.getElementById('terminal-close');
  const input = document.getElementById('terminal-input');
  const output = document.getElementById('terminal-output');

  if (!modal || !trigger) return;

  const terminal = new TerminalConsole('terminal-modal', 'terminal-input', 'terminal-output');

  trigger.addEventListener('click', () => {
    modal.classList.add('open');
    if (input) input.focus();
    sound.playBlip();
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      modal.classList.remove('open');
      sound.playClick();
    });
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      modal.classList.remove('open');
    }
  });
}

/**
 * 09. Production Scroll Reveal Observer
 */
function initScrollReveal() {
  const targets = document.querySelectorAll(
    '.section-container, .project-item, .other-project-card, .lab-container, .about-pic-wrapper'
  );

  targets.forEach(el => el.classList.add('reveal-on-scroll'));

  if (!('IntersectionObserver' in window)) {
    targets.forEach(el => el.classList.add('is-revealed'));
    return;
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.02,
    rootMargin: '0px 0px 100px 0px'
  });

  targets.forEach(el => {
    // If element is already above or in viewport, reveal immediately
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight) {
      el.classList.add('is-revealed');
    } else {
      observer.observe(el);
    }
  });
}

