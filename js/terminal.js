/**
 * Interactive Cyber-Engineering Terminal (Jesse Zhou & Tamal Sen style)
 * Provides a real interactive shell for engineers and recruiters to query capabilities,
 * run simulated benchmarks, inspect codebases, and view system diagnostic logs.
 */

import { sound } from './audio.js';

export class TerminalConsole {
  constructor(containerId, inputId, outputId) {
    this.container = document.getElementById(containerId);
    this.input = document.getElementById(inputId);
    this.output = document.getElementById(outputId);
    this.history = [];
    this.historyIndex = -1;
    this.isOpen = false;

    if (!this.input || !this.output) return;

    this.init();
  }

  init() {
    this.input.addEventListener('keydown', (e) => this.handleKeydown(e));

    // Welcome banner
    this.printLine('SYSTEM INITIALIZED // ROFAZ AI SYSTEMS SHELL v2.6.4', 'term-accent');
    this.printLine('Type "help" to view available diagnostic commands.\n', 'term-dim');

    if (window.location.hash === '#term') {
      setTimeout(() => this.open(), 250);
    }
  }

  open() {
    if (!this.container) return;
    this.container.classList.add('active');
    this.isOpen = true;
    sound.playBlip();
    setTimeout(() => {
      if (this.input) this.input.focus();
    }, 100);
  }

  close() {
    if (!this.container) return;
    this.container.classList.remove('active');
    this.isOpen = false;
    sound.playClick();
  }

  toggle() {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }

  handleKeydown(e) {
    sound.playKeypress();

    if (e.key === 'Enter') {
      const cmd = this.input.value.trim();
      this.input.value = '';
      if (cmd) {
        this.history.push(cmd);
        this.historyIndex = this.history.length;
        this.executeCommand(cmd);
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (this.historyIndex > 0) {
        this.historyIndex--;
        this.input.value = this.history[this.historyIndex];
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (this.historyIndex < this.history.length - 1) {
        this.historyIndex++;
        this.input.value = this.history[this.historyIndex];
      } else {
        this.historyIndex = this.history.length;
        this.input.value = '';
      }
    } else if (e.key === 'Escape') {
      this.close();
    }
  }

  executeCommand(rawCmd) {
    const parts = rawCmd.split(' ');
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1);

    this.printLine(`aish@rofaz:~$ ${rawCmd}`, 'term-user-line');

    switch (cmd) {
      case 'help':
        this.printLine('AVAILABLE COMMANDS:', 'term-highlight');
        this.printLine('  bio         - Print engineering background and education');
        this.printLine('  skills      - Categorized technical stack and systems proficiency');
        this.printLine('  projects    - Inspect production AI platforms and repositories');
        this.printLine('  benchmark   - Run live simulated model vs fallback latency benchmark');
        this.printLine('  resume      - Open single-page ATS-calibrated resume PDF');
        this.printLine('  contact     - Direct contact points (Email, LinkedIn, GitHub)');
        this.printLine('  clear       - Clear the terminal console buffer');
        this.printLine('  exit        - Close the interactive terminal drawer');
        break;

      case 'bio':
      case 'whoami':
        this.printLine('CANDIDATE: Md. Rofaz Hasan Rafiu', 'term-highlight');
        this.printLine('TITLE: AI & Machine Learning Systems Engineer');
        this.printLine('ALMA MATER: Rajshahi University of Engineering & Technology (RUET)');
        this.printLine('DEGREE: B.Sc. in Computer Science & Engineering (2022 - 2026+)');
        this.printLine('CORE SPECIALTY: Local SLM Orchestration (Qwen/Ollama), Computer Vision (OpenCV.js), Resilient Backend Systems.');
        break;

      case 'skills':
        this.printLine('TECHNICAL CAPABILITY MATRIX:', 'term-highlight');
        this.printLine('• AI / LLM: Local SLM (Qwen 2.5 3B), Ollama, Constrained Decoding, Zod Guardrails, PyTorch, TensorRT-LLM');
        this.printLine('• VISION: OpenCV.js, Canny Edge Detection, 4-Point Homography Warp, WebAssembly, ONNX');
        this.printLine('• SYSTEMS: Go (Golang), Python 3.12, C++, PostgreSQL (ACID/Transactions), Redis, SQLite');
        this.printLine('• DEVOPS: Docker containerization, POSIX Daemons, Git CI/CD, Microservices');
        break;

      case 'projects':
        this.printLine('CORE REPOSITORIES & SYSTEMS:', 'term-highlight');
        this.printLine('1. Digital School (Production AI Platform)');
        this.printLine('   - Sub-800ms local SLM error categorization + deterministic PostgreSQL fallback');
        this.printLine('   - GitHub: https://github.com/rofazhasan/digital_school');
        this.printLine('2. OMRView (Edge Computer Vision Engine)');
        this.printLine('   - Client-side OpenCV.js document perspective rectification & bubble grading in Wasm');
        this.printLine('   - GitHub: https://github.com/rofazhasan/OMRView');
        this.printLine('3. FocusGuard (Distributed System Monitoring Daemon)');
        this.printLine('   - Go native daemon tracking multi-process focus state under <20MB RAM');
        this.printLine('   - GitHub: https://github.com/rofazhasan/FocusGuard');
        this.printLine('4. Krishi Bondhu AI (Edge Mobile Agricultural Diagnostic)');
        this.printLine('   - Offline-first SQLite persistence + camera leaf capture pipeline');
        this.printLine('   - GitHub: https://github.com/rofazhasan/Krishi_Bondhu_AI');
        break;

      case 'benchmark':
        this.runBenchmarkSimulation();
        break;

      case 'resume':
        this.printLine('Opening single-page ATS-calibrated resume PDF...', 'term-accent');
        window.open('assets/Md_Rofaz_Hasan_Rafiu_Resume.pdf', '_blank');
        break;

      case 'contact':
        this.printLine('CONTACT & CONNECT:', 'term-highlight');
        this.printLine('• Email: mdrofazhasanrafiu@gmail.com');
        this.printLine('• LinkedIn: https://linkedin.com/in/md-rofaz-hasan-rafiu');
        this.printLine('• GitHub: https://github.com/rofazhasan');
        break;

      case 'clear':
      case 'cls':
        this.output.innerHTML = '';
        break;

      case 'exit':
      case 'quit':
        this.close();
        break;

      default:
        this.printLine(`Command not recognized: "${cmd}". Type "help" for a list of commands.`, 'term-error');
        break;
    }

    this.scrollToBottom();
  }

  runBenchmarkSimulation() {
    this.printLine('Initiating benchmark sequence: Primary SLM vs Fallback Engine...', 'term-accent');
    this.printLine('[TEST 1/2] Routing to Local SLM (Ollama / Qwen 2.5 3B)...');
    
    setTimeout(() => {
      this.printLine('  -> SLM Response Time: 342ms | Validation: ZOD_PASS | Tokens: 68', 'term-success');
      this.printLine('[TEST 2/2] Inducing Model Saturation (>800ms) -> Deterministic Fallback Triggered...');
      
      setTimeout(() => {
        this.printLine('  -> Fallback Engaged: PostgreSQL Rule Engine | Execution Time: 4.8ms | Availability: 100.0%', 'term-success');
        this.printLine('BENCHMARK COMPLETE: Zero downtime guarantee validated.', 'term-highlight');
        this.scrollToBottom();
      }, 400);
    }, 300);
  }

  printLine(text, className = '') {
    const line = document.createElement('div');
    line.className = `term-line ${className}`;
    line.textContent = text;
    this.output.appendChild(line);
  }

  scrollToBottom() {
    if (this.output) {
      this.output.scrollTop = this.output.scrollHeight;
    }
  }
}
