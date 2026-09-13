/**
 * SYSTEM ARCHITECTURE GRAPH — Interactive Computational Dataflow Canvas
 * Visualizes: INPUT -> VISION / LANGUAGE MODEL -> REASONING -> VALIDATION -> BACKEND -> USER
 */

export function initSystemGraph() {
  const canvas = document.getElementById('system-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const inspectorTag = document.getElementById('inspector-tag');
  const inspectorDesc = document.getElementById('inspector-desc');

  const nodes = [
    { id: 'input', label: 'INPUT', x: 0.12, y: 0.5, tech: 'Telemetry & Captures', desc: 'Raw student exam answer vectors, smartphone test sheet photos, and client state focus logs.' },
    { id: 'model', label: 'MODEL / VISION', x: 0.30, y: 0.28, tech: 'Qwen 2.5 & OpenCV.js', desc: 'Local SLM inference (Ollama/Qwen 2.5 3B) and compiled OpenCV WebAssembly document geometry engine.' },
    { id: 'reasoning', label: 'REASONING', x: 0.50, y: 0.72, tech: 'Structured Evaluation', desc: 'Low-temperature prompted diagnostic pattern classification and Douglas-Peucker contour polygon analysis.' },
    { id: 'validation', label: 'VALIDATION', x: 0.68, y: 0.28, tech: 'Zod & Fallback Logic', desc: 'Zod JSON schema guardrails and sub-10ms PostgreSQL topic distribution fallbacks on model latency spikes.' },
    { id: 'backend', label: 'BACKEND', x: 0.82, y: 0.68, tech: 'PostgreSQL & Go Daemon', desc: 'Prisma ORM 6.10 multi-tenant database connection pooling, edge CDN caching headers, and Go 1.22 daemon.' },
    { id: 'user', label: 'CLIENT', x: 0.92, y: 0.40, tech: 'PWA & Native Browser', desc: 'Instant student weakness analytics, zero-latency declarative network filtering, and offline SQLite synchronization.' }
  ];

  const connections = [
    [0, 1],
    [1, 2],
    [2, 3],
    [3, 4],
    [4, 5],
    [1, 3] // direct bypass / fallback route
  ];

  let width = 0;
  let height = 0;
  let activeNodeIndex = 1; // Default to MODEL / VISION
  let hoverNodeIndex = -1;
  let particles = [];

  function resize() {
    const rect = canvas.parentElement.getBoundingClientRect();
    width = rect.width;
    height = rect.height;
    canvas.width = width * window.devicePixelRatio;
    canvas.height = height * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
  }

  // Initialize animated signal pulses
  for (let i = 0; i < 8; i++) {
    particles.push({
      connectionIndex: i % connections.length,
      progress: (i / 8) + Math.random() * 0.1,
      speed: 0.005 + Math.random() * 0.004
    });
  }

  function updateInspector(node) {
    if (!inspectorTag || !inspectorDesc) return;
    inspectorTag.textContent = `${node.label} // ${node.tech}`;
    inspectorDesc.textContent = node.desc;
  }

  // Set initial inspector text
  updateInspector(nodes[activeNodeIndex]);

  function draw() {
    ctx.clearRect(0, 0, width, height);

    // Draw connection paths
    connections.forEach(([fromIdx, toIdx], index) => {
      const from = nodes[fromIdx];
      const to = nodes[toIdx];
      const x1 = from.x * width;
      const y1 = from.y * height;
      const x2 = to.x * width;
      const y2 = to.y * height;

      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.strokeStyle = (index === 5) ? 'rgba(99, 102, 241, 0.25)' : 'rgba(56, 189, 248, 0.22)';
      ctx.lineWidth = (index === 5) ? 1.2 : 1.5;
      if (index === 5) ctx.setLineDash([4, 4]);
      else ctx.setLineDash([]);
      ctx.stroke();
      ctx.setLineDash([]);
    });

    // Animate moving data pulses
    particles.forEach(p => {
      p.progress += p.speed;
      if (p.progress > 1) p.progress = 0;

      const [fromIdx, toIdx] = connections[p.connectionIndex];
      const from = nodes[fromIdx];
      const to = nodes[toIdx];
      const px = from.x * width + (to.x * width - from.x * width) * p.progress;
      const py = from.y * height + (to.y * height - from.y * height) * p.progress;

      ctx.beginPath();
      ctx.arc(px, py, 2.5, 0, Math.PI * 2);
      ctx.fillStyle = '#38bdf8';
      ctx.shadowColor = '#38bdf8';
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.shadowBlur = 0;
    });

    // Draw nodes
    nodes.forEach((n, idx) => {
      const nx = n.x * width;
      const ny = n.y * height;
      const isActive = idx === activeNodeIndex;
      const isHover = idx === hoverNodeIndex;

      // Outer glow circle
      ctx.beginPath();
      ctx.arc(nx, ny, isActive ? 16 : (isHover ? 14 : 11), 0, Math.PI * 2);
      ctx.fillStyle = isActive ? 'rgba(56, 189, 248, 0.22)' : 'rgba(15, 23, 42, 0.85)';
      ctx.strokeStyle = isActive ? '#38bdf8' : (isHover ? '#818cf8' : 'rgba(255, 255, 255, 0.25)');
      ctx.lineWidth = isActive ? 2 : 1.2;
      ctx.fill();
      ctx.stroke();

      // Center core
      ctx.beginPath();
      ctx.arc(nx, ny, isActive ? 5 : 3.5, 0, Math.PI * 2);
      ctx.fillStyle = isActive ? '#38bdf8' : (isHover ? '#c7d2fe' : 'rgba(255, 255, 255, 0.7)');
      ctx.fill();

      // Node Label
      ctx.font = `${isActive ? 'bold' : '600'} 10.5px JetBrains Mono, monospace`;
      ctx.fillStyle = isActive ? '#38bdf8' : (isHover ? '#f8fafc' : '#94a3b8');
      ctx.textAlign = 'center';
      ctx.fillText(n.label, nx, ny + (n.y > 0.5 ? -18 : 22));
    });

    requestAnimationFrame(draw);
  }

  // Pointer interactions
  function getNodeAtCoords(clientX, clientY) {
    const rect = canvas.getBoundingClientRect();
    const mx = clientX - rect.left;
    const my = clientY - rect.top;

    for (let i = 0; i < nodes.length; i++) {
      const n = nodes[i];
      const nx = n.x * width;
      const ny = n.y * height;
      const dist = Math.hypot(mx - nx, my - ny);
      if (dist < 22) return i;
    }
    return -1;
  }

  canvas.addEventListener('mousemove', (e) => {
    hoverNodeIndex = getNodeAtCoords(e.clientX, e.clientY);
    canvas.style.cursor = hoverNodeIndex !== -1 ? 'pointer' : 'default';
  });

  canvas.addEventListener('click', (e) => {
    const clicked = getNodeAtCoords(e.clientX, e.clientY);
    if (clicked !== -1) {
      activeNodeIndex = clicked;
      updateInspector(nodes[clicked]);
    }
  });

  window.addEventListener('resize', resize);
  resize();
  draw();
}
