/**
 * CASE STUDY DEEP DIVE ENGINE
 * Renders comprehensive technical case studies for Digital School, OMRView, FocusGuard, and Krishi Bondhu AI
 */

import { PORTFOLIO_DATA } from '../data/portfolio-data.js';

export function initCaseStudies() {
  const overlay = document.getElementById('case-modal-overlay');
  const modalContainer = document.getElementById('case-modal-container');
  const closeBtn = document.getElementById('case-close-btn');

  if (!overlay || !modalContainer || !closeBtn) return;

  function closeModal() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  closeBtn.addEventListener('click', closeModal);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('open')) closeModal();
  });

  // Attach click events to "View Case Study" buttons
  document.querySelectorAll('.open-case-study-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projectId = btn.dataset.projectId;
      openCaseStudy(projectId);
    });
  });

  function openCaseStudy(projectId) {
    const project = PORTFOLIO_DATA.featuredProjects.find(p => p.id === projectId);
    if (!project) return;

    modalContainer.innerHTML = `
      <div style="margin-bottom: 24px;">
        <span class="project-badge">${project.badge}</span>
        <h2 style="font-size: 28px; font-weight: 800; color: #f8fafc; margin-top: 8px; margin-bottom: 4px;">${project.title}</h2>
        <div style="font-family: var(--font-mono); font-size: 13px; color: var(--accent-indigo); margin-bottom: 12px;">
          ${project.role} &bull; ${project.period} &bull; ${project.category}
        </div>
        <p style="font-size: 15px; color: var(--text-secondary); line-height: 1.6;">${project.summary}</p>
      </div>

      <!-- Links -->
      <div style="display: flex; gap: 12px; margin-bottom: 28px; padding-bottom: 20px; border-bottom: 1px solid var(--border-subtle);">
        ${project.liveUrl ? `<a href="${project.liveUrl}" target="_blank" rel="noopener" class="btn-primary" style="font-size: 12.5px; padding: 6px 14px;">Visit Production &rarr;</a>` : ''}
        ${project.githubUrl ? `<a href="${project.githubUrl}" target="_blank" rel="noopener" class="btn-secondary" style="font-size: 12.5px; padding: 6px 14px;">View Repository &nearr;</a>` : ''}
      </div>

      <!-- Section 1: Architecture Pipeline -->
      <div style="margin-bottom: 30px;">
        <h3 style="font-size: 16px; font-weight: 700; color: #f8fafc; margin-bottom: 14px; text-transform: uppercase; letter-spacing: 0.05em;">01 // End-to-End Systems Architecture</h3>
        <div style="display: flex; flex-direction: column; gap: 10px;">
          ${project.architecture.map(a => `
            <div style="background: var(--bg-surface-elevated); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 12px 16px;">
              <div style="font-family: var(--font-mono); font-size: 12px; font-weight: 700; color: var(--accent-cyan); margin-bottom: 2px;">${a.step}</div>
              <div style="font-size: 13px; color: var(--text-secondary);">${a.desc}</div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Section 2: Technical Highlights -->
      <div style="margin-bottom: 30px;">
        <h3 style="font-size: 16px; font-weight: 700; color: #f8fafc; margin-bottom: 14px; text-transform: uppercase; letter-spacing: 0.05em;">02 // Verified Engineering Decisions</h3>
        <ul style="list-style: none; display: flex; flex-direction: column; gap: 12px;">
          ${project.highlights.map(h => `
            <li style="font-size: 13.5px; color: var(--text-secondary); line-height: 1.6; position: relative; padding-left: 18px;">
              <span style="position: absolute; left: 0; color: var(--accent-cyan); font-weight: bold;">•</span>
              ${h}
            </li>
          `).join('')}
        </ul>
      </div>

      <!-- Section 3: Verified Source Code Snippet -->
      <div style="margin-bottom: 20px;">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
          <h3 style="font-size: 16px; font-weight: 700; color: #f8fafc; text-transform: uppercase; letter-spacing: 0.05em;">03 // Implementation Architecture</h3>
          <span style="font-family: var(--font-mono); font-size: 11px; color: var(--text-muted);">${project.codeSnippet.filename}</span>
        </div>
        <pre class="code-pre" style="max-height: 340px;"><code>${escapeHtml(project.codeSnippet.code)}</code></pre>
      </div>
    `;

    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
}

function escapeHtml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
