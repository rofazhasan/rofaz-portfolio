/**
 * AI LAB — Interactive Engineering Sandbox
 * 4 Working Demonstrations:
 * 1. Local SLM Error Diagnosis (Qwen 2.5 Structured Prompting)
 * 2. Document Geometry Rectification (OpenCV.js Canvas Pipeline)
 * 3. Structured Output Validation (Zod Schema Enforcement)
 * 4. Deterministic Fallback Simulator (Latency Threshold Failover)
 */

import { PORTFOLIO_DATA } from '../data/portfolio-data.js';

export function initAILab() {
  const tabs = document.querySelectorAll('.lab-tab-btn');
  const panels = document.querySelectorAll('.lab-panel');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.target;
      tabs.forEach(t => t.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));

      tab.classList.add('active');
      const activePanel = document.getElementById(target);
      if (activePanel) activePanel.classList.add('active');
    });
  });

  // Init Lab Experiment 1: Local SLM
  initSLMExperiment();

  // Init Lab Experiment 2: CV Rectification Canvas
  initCVPipelineExperiment();

  // Init Lab Experiment 3: Schema Validator
  initSchemaValidatorExperiment();

  // Init Lab Experiment 4: Fallback Simulator
  initFallbackSimulatorExperiment();
}

/**
 * 01. Local SLM Diagnostic Simulator
 */
function initSLMExperiment() {
  const select = document.getElementById('slm-sample-select');
  const runBtn = document.getElementById('slm-run-btn');
  const promptView = document.getElementById('slm-prompt-view');
  const outputView = document.getElementById('slm-output-view');
  const statusIndicator = document.getElementById('slm-status');

  if (!select || !runBtn || !promptView || !outputView) return;

  const samples = PORTFOLIO_DATA.aiLabExperiments[0].sampleInputs;

  function updatePrompt() {
    const selectedIdx = parseInt(select.value, 10);
    const item = samples[selectedIdx];
    promptView.textContent = `SYSTEM: You are a diagnostic evaluation engine for academic exams.
TASK: Analyze the following student answer error vector and classify conceptual mistakes into academic topic clusters.
CONSTRAINTS: Output strict JSON matching DiagnosticSchema. Temperature: 0.3.

INPUT_VECTOR:
"${item.value}"`;
  }

  select.addEventListener('change', updatePrompt);
  updatePrompt();

  runBtn.addEventListener('click', () => {
    statusIndicator.textContent = "INFERENCE RUNNING [qwen2.5:3b]...";
    statusIndicator.style.color = "var(--accent-amber)";
    outputView.textContent = "// Awaiting local SLM token streaming...";

    setTimeout(() => {
      const selectedIdx = parseInt(select.value, 10);
      let resultObj = {};

      if (selectedIdx === 0) {
        resultObj = {
          evaluationId: "diag_calc_9801",
          model: "qwen2.5:3b-instruct",
          inferenceLatencyMs: 342,
          confidenceScore: 0.94,
          primaryWeakness: "Composite Function Differentials & Integration by Parts Signs",
          conceptBreakdown: [
            { topic: "Chain Rule", severity: "HIGH", detail: "Missed inner function derivative d/dx[3x^2] in trigonometric argument." },
            { topic: "Integration by Parts", severity: "MEDIUM", detail: "Sign error in -∫v*du term." }
          ],
          recommendedRemediation: "Focus on 2-step substitution drills before progressing to trigonometric integrals.",
          deterministicFallbackEngaged: false
        };
      } else if (selectedIdx === 1) {
        resultObj = {
          evaluationId: "diag_phys_4412",
          model: "qwen2.5:3b-instruct",
          inferenceLatencyMs: 388,
          confidenceScore: 0.96,
          primaryWeakness: "Inclined Plane Free-Body Vector Decomposition",
          conceptBreakdown: [
            { topic: "Newtonian Friction", severity: "HIGH", detail: "Omitted static coefficient threshold calculation before motion onset." },
            { topic: "Normal Force Projection", severity: "HIGH", detail: "Confused perpendicular force component with gravitational vertical vector." }
          ],
          recommendedRemediation: "Resolve orthogonal components explicitly before applying F_net = m*a.",
          deterministicFallbackEngaged: false
        };
      } else {
        resultObj = {
          evaluationId: "diag_algo_2309",
          model: "qwen2.5:3b-instruct",
          inferenceLatencyMs: 315,
          confidenceScore: 0.98,
          primaryWeakness: "Dynamic Programming Memoization Boundaries",
          conceptBreakdown: [
            { topic: "Overlapping Subproblems", severity: "HIGH", detail: "Exponential recursive call tree without memo table lookup." },
            { topic: "Knapsack State Dimensions", severity: "MEDIUM", detail: "Off-by-one boundary on remaining capacity index." }
          ],
          recommendedRemediation: "Tabulate subproblem dependencies before translating state transition to code.",
          deterministicFallbackEngaged: false
        };
      }

      outputView.textContent = JSON.stringify(resultObj, null, 2);
      statusIndicator.textContent = "INFERENCE COMPLETED (200 OK)";
      statusIndicator.style.color = "var(--accent-emerald)";
    }, 450);
  });
}

/**
 * 02. Computer Vision Geometry Rectification Simulator
 */
function initCVPipelineExperiment() {
  const canvas = document.getElementById('cv-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const stageBtns = document.querySelectorAll('.cv-stage-btn');
  const stageDesc = document.getElementById('cv-stage-desc');

  let currentStage = 0;

  function renderCVStage(stage) {
    currentStage = stage;
    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    // Background workspace
    ctx.fillStyle = "#070a12";
    ctx.fillRect(0, 0, w, h);

    if (stage === 0) {
      // Stage 0: Raw Skewed Capture
      stageDesc.textContent = "Stage 01: Raw smartphone capture of answer sheet exhibiting severe camera perspective distortion and uneven illumination.";
      
      ctx.beginPath();
      ctx.moveTo(w * 0.18, h * 0.22);
      ctx.lineTo(w * 0.88, h * 0.12);
      ctx.lineTo(w * 0.78, h * 0.88);
      ctx.lineTo(w * 0.08, h * 0.78);
      ctx.closePath();
      ctx.fillStyle = "rgba(255, 255, 255, 0.06)";
      ctx.fill();
      ctx.strokeStyle = "rgba(255, 255, 255, 0.3)";
      ctx.lineWidth = 2;
      ctx.stroke();

      // Draw skewed mock rows
      ctx.strokeStyle = "rgba(255, 255, 255, 0.12)";
      for (let i = 1; i <= 4; i++) {
        const t = i / 5;
        ctx.beginPath();
        ctx.moveTo(w * (0.18 + (0.08 - 0.18) * t), h * (0.22 + (0.78 - 0.22) * t));
        ctx.lineTo(w * (0.88 + (0.78 - 0.88) * t), h * (0.12 + (0.88 - 0.12) * t));
        ctx.stroke();
      }
    } else if (stage === 1) {
      // Stage 1: Canny Edge Detection
      stageDesc.textContent = "Stage 02: Adaptive thresholding & Canny edge detection highlighting high-frequency geometric document perimeter gradients.";
      
      ctx.strokeStyle = "#38bdf8";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(w * 0.18, h * 0.22);
      ctx.lineTo(w * 0.88, h * 0.12);
      ctx.lineTo(w * 0.78, h * 0.88);
      ctx.lineTo(w * 0.08, h * 0.78);
      ctx.closePath();
      ctx.stroke();

      // Internal noisy edges
      ctx.strokeStyle = "rgba(56, 189, 248, 0.25)";
      ctx.beginPath();
      ctx.arc(w * 0.4, h * 0.45, 18, 0, Math.PI * 2);
      ctx.arc(w * 0.6, h * 0.52, 18, 0, Math.PI * 2);
      ctx.stroke();
    } else if (stage === 2) {
      // Stage 2: 4-Corner Douglas-Peucker Approximation
      stageDesc.textContent = "Stage 03: Douglas-Peucker polygon approximation isolating 4 extreme document vertices [TL, TR, BR, BL] for homography calculation.";

      ctx.strokeStyle = "rgba(56, 189, 248, 0.4)";
      ctx.beginPath();
      ctx.moveTo(w * 0.18, h * 0.22);
      ctx.lineTo(w * 0.88, h * 0.12);
      ctx.lineTo(w * 0.78, h * 0.88);
      ctx.lineTo(w * 0.08, h * 0.78);
      ctx.closePath();
      ctx.stroke();

      const corners = [
        { x: w * 0.18, y: h * 0.22, label: "TL" },
        { x: w * 0.88, y: h * 0.12, label: "TR" },
        { x: w * 0.78, y: h * 0.88, label: "BR" },
        { x: w * 0.08, y: h * 0.78, label: "BL" }
      ];

      corners.forEach(c => {
        ctx.beginPath();
        ctx.arc(c.x, c.y, 6, 0, Math.PI * 2);
        ctx.fillStyle = "#6366f1";
        ctx.fill();
        ctx.strokeStyle = "#ffffff";
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.font = "bold 11px JetBrains Mono, monospace";
        ctx.fillStyle = "#ffffff";
        ctx.fillText(c.label, c.x + 8, c.y - 8);
      });
    } else if (stage === 3) {
      // Stage 3: Homography Perspective Warp
      stageDesc.textContent = "Stage 04: cv.warpPerspective applied. The document is geometrically rectified to a standardized rectangular coordinate space.";

      const rx = w * 0.15;
      const ry = h * 0.10;
      const rw = w * 0.70;
      const rh = h * 0.80;

      ctx.fillStyle = "rgba(255, 255, 255, 0.08)";
      ctx.fillRect(rx, ry, rw, rh);
      ctx.strokeStyle = "#10b981";
      ctx.lineWidth = 2;
      ctx.strokeRect(rx, ry, rw, rh);

      // Rectified rows
      ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
      ctx.lineWidth = 1;
      for (let i = 1; i <= 5; i++) {
        ctx.beginPath();
        ctx.moveTo(rx + 16, ry + (rh / 6) * i);
        ctx.lineTo(rx + rw - 16, ry + (rh / 6) * i);
        ctx.stroke();
      }

      ctx.font = "bold 11px JetBrains Mono, monospace";
      ctx.fillStyle = "#10b981";
      ctx.fillText("RECTIFIED PLANE: 100% UN-WARPED", rx + 14, ry + 24);
    } else if (stage === 4) {
      // Stage 4: ROI Bubble Segmentation & Classification
      stageDesc.textContent = "Stage 05: Mathematical ROI segmentation. Bubble fill density calculated against row baseline luminance to classify marks.";

      const rx = w * 0.15;
      const ry = h * 0.10;
      const rw = w * 0.70;
      const rh = h * 0.80;

      ctx.fillStyle = "rgba(255, 255, 255, 0.05)";
      ctx.fillRect(rx, ry, rw, rh);
      ctx.strokeStyle = "#38bdf8";
      ctx.lineWidth = 1.5;
      ctx.strokeRect(rx, ry, rw, rh);

      // Render bubble choices (A, B, C, D)
      const options = ['A', 'B', 'C', 'D'];
      for (let row = 0; row < 4; row++) {
        const rowY = ry + 40 + row * 46;
        ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
        ctx.font = "bold 11px JetBrains Mono";
        ctx.fillText(`Q0${row + 1}`, rx + 20, rowY + 4);

        for (let col = 0; col < 4; col++) {
          const bx = rx + 80 + col * 48;
          const isFilled = (row === 0 && col === 1) || (row === 1 && col === 3) || (row === 2 && col === 0) || (row === 3 && col === 2);

          ctx.beginPath();
          ctx.arc(bx, rowY, 11, 0, Math.PI * 2);
          ctx.fillStyle = isFilled ? "#38bdf8" : "rgba(255, 255, 255, 0.04)";
          ctx.fill();
          ctx.strokeStyle = isFilled ? "#38bdf8" : "rgba(255, 255, 255, 0.35)";
          ctx.stroke();

          ctx.fillStyle = isFilled ? "#070a12" : "rgba(255, 255, 255, 0.6)";
          ctx.font = "9.5px JetBrains Mono";
          ctx.textAlign = "center";
          ctx.fillText(options[col], bx, rowY + 3.5);
          ctx.textAlign = "left";
        }

        // Classification badge
        ctx.fillStyle = "#10b981";
        ctx.font = "10px JetBrains Mono";
        const ans = (row === 0) ? "B (98% fill)" : (row === 1) ? "D (95% fill)" : (row === 2) ? "A (99% fill)" : "C (94% fill)";
        ctx.fillText(`-> ${ans}`, rx + rw - 130, rowY + 3.5);
      }
    }
  }

  stageBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      stageBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderCVStage(parseInt(btn.dataset.stage, 10));
    });
  });

  // Initial stage
  renderCVStage(0);
}

/**
 * 03. Structured Output Guardrail Experiment
 */
function initSchemaValidatorExperiment() {
  const toggleBtn = document.getElementById('schema-toggle-btn');
  const schemaDisplay = document.getElementById('schema-display');
  const schemaBadge = document.getElementById('schema-badge');

  if (!toggleBtn || !schemaDisplay || !schemaBadge) return;

  let validatedState = true;

  toggleBtn.addEventListener('click', () => {
    validatedState = !validatedState;
    if (validatedState) {
      schemaBadge.textContent = "ZOD_SCHEMA_ENFORCED";
      schemaBadge.style.color = "var(--accent-emerald)";
      toggleBtn.textContent = "View Unvalidated Raw Model Output";
      schemaDisplay.textContent = PORTFOLIO_DATA.aiLabExperiments[2].validatedSchema;
    } else {
      schemaBadge.textContent = "RAW_UNSTRUCTURED_OUTPUT (HIGH RISK)";
      schemaBadge.style.color = "var(--accent-amber)";
      toggleBtn.textContent = "Enforce Zod Schema Validation";
      schemaDisplay.textContent = `// WARNING: Raw LLM Output (no schema validation)
"The student did pretty poorly on calculus. In question 4 they missed the chain rule because of the inner derivative of sin(3x^2). On problem 7 they made a minus sign mistake when integrating x*e^(-x). Score is about 68%. They should practice more composite functions."`;
    }
  });
}

/**
 * 04. Deterministic Fallback Resilience Simulator
 */
function initFallbackSimulatorExperiment() {
  const slider = document.getElementById('latency-slider');
  const latencyVal = document.getElementById('latency-val');
  const routeStatus = document.getElementById('fallback-route-status');
  const routeDesc = document.getElementById('fallback-route-desc');
  const testBtn = document.getElementById('fallback-test-btn');

  if (!slider || !latencyVal || !routeStatus || !routeDesc || !testBtn) return;

  slider.addEventListener('input', () => {
    const ms = parseInt(slider.value, 10);
    latencyVal.textContent = `${ms}ms`;

    if (ms <= 800) {
      routeStatus.textContent = "ROUTE: PRIMARY LOCAL SLM [Ollama / Qwen 2.5]";
      routeStatus.style.color = "var(--accent-cyan)";
      routeDesc.textContent = "Normal operation. Inference completed well within 800ms SLA threshold. Model-driven personalized report generated.";
    } else {
      routeStatus.textContent = "ROUTE: DETERMINISTIC POSTGRESQL FALLBACK ENGAGED";
      routeStatus.style.color = "var(--accent-emerald)";
      routeDesc.textContent = `CRITICAL LATENCY SPIKE (${ms}ms > 800ms SLA). Local model inference bypassed automatically. PostgreSQL deterministic topic distribution algorithm generated report in 8ms (100% uptime preserved).`;
    }
  });

  testBtn.addEventListener('click', () => {
    const ms = parseInt(slider.value, 10);
    testBtn.textContent = "Evaluating Request...";
    setTimeout(() => {
      testBtn.textContent = "Simulate Request";
      if (ms > 800) {
        alert(`FAILOVER TRIGGERED:\nLatency ${ms}ms exceeded 800ms timeout threshold.\nPostgreSQL deterministic fallback served the exam diagnostic report in 7.4ms with zero service interruption.`);
      } else {
        alert(`NORMAL INFERENCE:\nLocal Qwen 2.5 model completed evaluation in ${ms}ms.`);
      }
    }, 250);
  });
}
