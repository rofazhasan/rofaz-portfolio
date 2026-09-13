/**
 * 3D Interactive Tech Sphere (Jack Jeznach style)
 * Projects engineering skills onto a 3D rotating spherical shell in HTML5 Canvas.
 * Features momentum drag, auto-rotation, depth scaling, and hover attraction.
 */

export class TagSphere {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;

    this.ctx = this.canvas.getContext('2d');
    this.tags = [
      { text: 'PyTorch', category: 'ai' },
      { text: 'OpenCV.js', category: 'ai' },
      { text: 'TensorRT', category: 'ai' },
      { text: 'Qwen 2.5', category: 'ai' },
      { text: 'Ollama', category: 'ai' },
      { text: 'ONNX Runtime', category: 'ai' },
      { text: 'WebAssembly', category: 'ai' },
      { text: 'Computer Vision', category: 'ai' },
      { text: 'Local SLM', category: 'ai' },
      { text: 'Go / Golang', category: 'sys' },
      { text: 'PostgreSQL', category: 'sys' },
      { text: 'Redis', category: 'sys' },
      { text: 'Docker', category: 'sys' },
      { text: 'Linux / POSIX', category: 'sys' },
      { text: 'FastAPI', category: 'sys' },
      { text: 'Zod Guardrails', category: 'ai' },
      { text: 'C++ / STL', category: 'sys' },
      { text: 'TypeScript', category: 'sys' },
      { text: 'Python 3.12', category: 'ai' },
      { text: 'CUDA', category: 'ai' },
      { text: 'SQLite', category: 'sys' },
      { text: 'gRPC / Proto', category: 'sys' },
      { text: 'Git / CI/CD', category: 'sys' },
      { text: 'WebRTC', category: 'sys' }
    ];

    this.items = [];
    this.radius = 160;
    this.dtr = Math.PI / 180;
    this.angleX = 0.002;
    this.angleY = 0.003;
    this.targetAngleX = 0.002;
    this.targetAngleY = 0.003;
    this.mouseX = 0;
    this.mouseY = 0;
    this.isDragging = false;
    this.lastMouseX = 0;
    this.lastMouseY = 0;
    this.hoveredItem = null;

    this.init();
  }

  init() {
    this.resize();
    window.addEventListener('resize', () => this.resize());

    // Generate equidistant points on sphere using Fibonacci Spiral
    const phi = Math.PI * (3 - Math.sqrt(5)); // Golden angle
    const count = this.tags.length;

    this.items = this.tags.map((tag, i) => {
      const y = 1 - (i / (count - 1)) * 2; // y goes from 1 to -1
      const radiusAtY = Math.sqrt(1 - y * y); // radius at y
      const theta = phi * i; // golden angle increment

      const x = Math.cos(theta) * radiusAtY;
      const z = Math.sin(theta) * radiusAtY;

      return {
        text: tag.text,
        category: tag.category,
        x: x * this.radius,
        y: y * this.radius,
        z: z * this.radius,
        screenX: 0,
        screenY: 0,
        scale: 1,
        alpha: 1
      };
    });

    this.bindEvents();
    this.animate();
  }

  resize() {
    if (!this.canvas) return;
    const rect = this.canvas.parentElement.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.width = rect.width || 280;
    const isMobile = window.innerWidth <= 768;
    this.height = isMobile 
      ? Math.max(260, Math.min(320, this.width * 1.05))
      : Math.max(340, Math.min(420, rect.height || 380));

    this.canvas.width = this.width * dpr;
    this.canvas.height = this.height * dpr;
    this.canvas.style.width = `${this.width}px`;
    this.canvas.style.height = `${this.height}px`;

    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    this.ctx.scale(dpr, dpr);
    this.radius = Math.min(this.width, this.height) * (isMobile ? 0.35 : 0.38);
  }

  bindEvents() {
    const parent = this.canvas.parentElement;

    parent.addEventListener('mousedown', (e) => {
      this.isDragging = true;
      this.lastMouseX = e.clientX;
      this.lastMouseY = e.clientY;
      parent.style.cursor = 'grabbing';
    });

    window.addEventListener('mousemove', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      const clientX = e.clientX - rect.left;
      const clientY = e.clientY - rect.top;

      if (this.isDragging) {
        const dx = e.clientX - this.lastMouseX;
        const dy = e.clientY - this.lastMouseY;
        this.targetAngleY = dx * 0.0003;
        this.targetAngleX = -dy * 0.0003;
        this.lastMouseX = e.clientX;
        this.lastMouseY = e.clientY;
      } else if (clientX >= 0 && clientX <= this.width && clientY >= 0 && clientY <= this.height) {
        // Slow rotation influenced by mouse position
        const cx = this.width / 2;
        const cy = this.height / 2;
        this.targetAngleY = ((clientX - cx) / cx) * 0.004;
        this.targetAngleX = -((clientY - cy) / cy) * 0.004;
      }
    });

    window.addEventListener('mouseup', () => {
      this.isDragging = false;
      if (parent) parent.style.cursor = 'grab';
    });

    // Touch support for mobile
    parent.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) {
        this.isDragging = true;
        this.lastMouseX = e.touches[0].clientX;
        this.lastMouseY = e.touches[0].clientY;
      }
    }, { passive: true });

    window.addEventListener('touchmove', (e) => {
      if (this.isDragging && e.touches.length === 1) {
        const dx = e.touches[0].clientX - this.lastMouseX;
        const dy = e.touches[0].clientY - this.lastMouseY;
        this.targetAngleY = dx * 0.0005;
        this.targetAngleX = -dy * 0.0005;
        this.lastMouseX = e.touches[0].clientX;
        this.lastMouseY = e.touches[0].clientY;
      }
    }, { passive: true });

    window.addEventListener('touchend', () => {
      this.isDragging = false;
    });
  }

  rotateX(angle) {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    this.items.forEach(item => {
      const y1 = item.y * cos - item.z * sin;
      const z1 = item.z * cos + item.y * sin;
      item.y = y1;
      item.z = z1;
    });
  }

  rotateY(angle) {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    this.items.forEach(item => {
      const x1 = item.x * cos - item.z * sin;
      const z1 = item.z * cos + item.x * sin;
      item.x = x1;
      item.z = z1;
    });
  }

  animate() {
    requestAnimationFrame(() => this.animate());

    // Interpolate towards target angles for smooth momentum
    this.angleX += (this.targetAngleX - this.angleX) * 0.08;
    this.angleY += (this.targetAngleY - this.angleY) * 0.08;

    this.rotateX(this.angleX);
    this.rotateY(this.angleY);

    this.render();
  }

  render() {
    const cx = this.width / 2;
    const cy = this.height / 2;

    this.ctx.clearRect(0, 0, this.width, this.height);

    // Sort items by Z (back to front) for accurate painter's algorithm
    this.items.sort((a, b) => a.z - b.z);

    const fov = 340;

    for (const item of this.items) {
      const scale = fov / (fov + item.z);
      const alpha = Math.max(0.18, Math.min(1, (item.z + this.radius) / (2 * this.radius)));
      const screenX = cx + item.x * scale;
      const screenY = cy + item.y * scale;

      item.screenX = screenX;
      item.screenY = screenY;
      item.scale = scale;

      const isAI = item.category === 'ai';
      const baseFontSize = this.width < 320 ? 11.5 : 13;
      const fontSize = Math.max(8.5, Math.floor(baseFontSize * scale));

      this.ctx.font = `600 ${fontSize}px "Fira Code", monospace`;
      this.ctx.textAlign = 'center';
      this.ctx.textBaseline = 'middle';

      // Subtle shadow/halo for depth
      if (item.z > 0) {
        this.ctx.shadowColor = isAI ? 'rgba(56, 189, 248, 0.4)' : 'rgba(99, 102, 241, 0.4)';
        this.ctx.shadowBlur = 8 * scale;
      } else {
        this.ctx.shadowBlur = 0;
      }

      // Color mapping based on depth & category
      if (item.z > 20) {
        this.ctx.fillStyle = isAI 
          ? `rgba(56, 189, 248, ${alpha})` 
          : `rgba(165, 180, 252, ${alpha})`;
      } else {
        this.ctx.fillStyle = `rgba(148, 163, 184, ${alpha * 0.8})`;
      }

      this.ctx.fillText(item.text, screenX, screenY);
      this.ctx.shadowBlur = 0;
    }
  }
}
