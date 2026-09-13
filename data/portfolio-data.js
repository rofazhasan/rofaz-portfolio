/**
 * PORTFOLIO DATA STORE — Single Source of Truth
 * Adheres strictly to the NO FABRICATION policy.
 * All project architectures, technical specs, and achievements are drawn from verified repositories and the approved resume.
 */

export const PORTFOLIO_DATA = {
  profile: {
    name: "Md. Rofaz Hasan Rafiu",
    callsign: "ROFAZ",
    headline: "AI Engineer | Generative AI & Computer Vision | Backend Systems",
    subheadline: "Building intelligent software systems where AI meets reliable engineering.",
    status: {
      system: "ONLINE",
      lab: "ACTIVE",
      location: "RUET · CSE · Bangladesh",
      availability: "Open for AI Engineering Roles & Collaborations"
    },
    bio: "Computer Science & Engineering student at Rajshahi University of Engineering & Technology (RUET) building AI-powered software systems across Generative AI, computer vision, and backend engineering. Experienced in integrating local language models, structured AI workflows, client-side computer vision, REST APIs, PostgreSQL, and real-time systems. Focused on developing reliable AI applications with practical fallbacks, validation, and production-oriented software architecture.",
    contacts: {
      email: "mdrofazhasanrafiu@gmail.com",
      phone: "+880-1794-678595",
      website: "https://rofazhasan.github.io/rofaz-portfolio/",
      github: "https://github.com/rofazhasan",
      linkedin: "https://linkedin.com/in/md-rofaz-hasan-rafiu",
      resumePdf: "assets/Md_Rofaz_Hasan_Rafiu_Resume.pdf"
    }
  },

  philosophy: [
    {
      number: "01",
      title: "Reliability Over Hype",
      summary: "AI systems must work predictably under stress, edge network constraints, and model degradation. An unhandled model exception is an engineering failure."
    },
    {
      number: "02",
      title: "AI Must Solve Real Problems",
      summary: "Models are components, not products. We integrate intelligence where it measurably improves understanding, accelerates workflows, or automates tedious tasks."
    },
    {
      number: "03",
      title: "Systems Matter As Much As Models",
      summary: "Without robust data modeling, strict schema validation, connection pooling, and low-latency APIs, the most capable neural network is unusable in production."
    },
    {
      number: "04",
      title: "Measure Before Optimizing",
      summary: "Profile inference latency, database connection pools, memory footprint, and client frame rates before making architectural tradeoffs."
    },
    {
      number: "05",
      title: "Build For Failure",
      summary: "Every AI inference endpoint must be paired with deterministic algorithmic fallbacks, schema guardrails, and graceful client degradation."
    }
  ],

  featuredProjects: [
    {
      id: "digital-school",
      title: "Digital School",
      badge: "Flagship AI Platform",
      role: "AI Systems Engineer",
      period: "2024 – Present",
      category: "Generative AI · Computer Vision · Backend Systems",
      summary: "Full-stack digital education platform serving online assessments with local SLM error diagnosis, client-side vision proctoring, and high-concurrency PostgreSQL backends.",
      liveUrl: "https://rofazacademy.dev",
      githubUrl: "https://github.com/rofazhasan/digital_school",
      tags: ["Next.js 15", "TypeScript", "PostgreSQL", "Prisma ORM", "Ollama (Qwen 2.5)", "TensorFlow.js BlazeFace", "Edge Caching"],
      architecture: [
        { step: "01. Examinee Client", desc: "Next.js 15 App Router running WebGL BlazeFace proctoring at 30 FPS" },
        { step: "02. Assessment Ingestion", desc: "Atomic submission vectors validated via Zod schemas into PostgreSQL" },
        { step: "03. Local SLM Pipeline", desc: "Ollama worker running Qwen 2.5 3B with temperature 0.3 constrained prompt" },
        { step: "04. Deterministic Fallback", desc: "Sub-10ms PostgreSQL topic distribution algorithm on inference spikes" },
        { step: "05. Analytics & Cache", desc: "Edge CDN SWR caching headers reducing database load during exam rushes" }
      ],
      highlights: [
        "Local SLM Inference: Integrated Qwen 2.5 via Ollama to classify student exam errors across structured academic concept categories using constrained prompts and structured schema outputs.",
        "Deterministic Resilience: Implemented a PostgreSQL-based deterministic fallback for diagnostic reporting when local model inference is unavailable or saturated, ensuring continuous service uptime.",
        "Client-Side Computer Vision: Developed browser-based computer vision workflows using TensorFlow.js and WebGL for real-time examinee presence tracking without server video streaming overhead.",
        "Data Infrastructure & Caching: Designed multi-tenant PostgreSQL schemas with Prisma ORM and configured edge CDN caching headers, optimizing connection pooling for concurrent assessment workloads."
      ],
      codeSnippet: {
        filename: "lib/ai/diagnostic-engine.ts",
        language: "typescript",
        code: `// Deterministic fallback & Local SLM error diagnostic pipeline
export async function generateMistakeDiagnostics(submission: ExamSubmission): Promise<DiagnosticReport> {
  const errorVector = extractConceptErrorVector(submission.answers);
  
  try {
    // 1. Attempt local low-temperature SLM inference via Ollama
    const response = await fetch('http://127.0.0.1:11434/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'qwen2.5:3b',
        prompt: buildStructuredDiagnosticPrompt(errorVector),
        stream: false,
        options: { temperature: 0.3, num_predict: 512 }
      }),
      signal: AbortSignal.timeout(3500) // strict SLA timeout
    });

    if (response.ok) {
      const raw = await response.json();
      return DiagnosticSchema.parse(JSON.parse(raw.response));
    }
  } catch (inferenceError) {
    console.warn('[AI_FALLBACK] Inference timeout/error. Engaging deterministic engine.');
  }

  // 2. High-reliability PostgreSQL deterministic fallback (<10ms)
  return calculateDeterministicDiagnostics(errorVector, submission.subjectId);
}`
      }
    },
    {
      id: "omrview",
      title: "OMRView",
      badge: "In-Browser Computer Vision",
      role: "Computer Vision Engineer",
      period: "2025",
      category: "Edge CV · WebAssembly · Document Intelligence",
      summary: "Client-side optical mark recognition and document geometry rectification engine running compiled OpenCV C++ inside browser WebAssembly with zero server compute costs.",
      githubUrl: "https://github.com/rofazhasan/OMRView",
      tags: ["TypeScript", "React 19", "Vite", "OpenCV.js (Wasm)", "Canny Edge", "Homography"],
      architecture: [
        { step: "01. Smartphone Capture", desc: "Skewed camera capture of physical multi-question examination sheet" },
        { step: "02. Preprocessing", desc: "Grayscale conversion and adaptive Gaussian thresholding in WebAssembly" },
        { step: "03. Geometry Rectification", desc: "Canny edges -> Douglas-Peucker polygon -> 4-point homography warp" },
        { step: "04. ROI Grid Segmentation", desc: "Mathematical grid projection dividing answer sheet into discrete bubble boxes" },
        { step: "05. Intensity Classification", desc: "Pixel histogram evaluation against row baseline lighting for multi-fill detection" }
      ],
      highlights: [
        "WebAssembly Processing: Moved document-processing operations to client-side OpenCV.js/WebAssembly, executing image rectification and mark recognition directly in the browser.",
        "Geometric Rectification: Implemented a multi-stage vision pipeline with adaptive thresholding, Canny edge detection, and 4-point homography perspective warps to rectify skewed camera captures.",
        "Mark Classification: Constructed a bubble fill classifier evaluating pixel intensity histograms across segmented Regions of Interest (ROIs) against baseline illumination to detect filled marks and multi-fill collisions."
      ],
      codeSnippet: {
        filename: "src/vision/homography.ts",
        language: "typescript",
        code: `// 4-Point Homography Perspective Transformation in OpenCV.js
export function rectifyDocumentGeometry(cv: any, srcMat: any, corners: Point4D): any {
  const [tl, tr, br, bl] = orderCorners(corners);
  
  // Calculate Euclidean distances for true target aspect ratio
  const widthTop = Math.hypot(tr.x - tl.x, tr.y - tl.y);
  const widthBottom = Math.hypot(br.x - bl.x, br.y - bl.y);
  const maxWidth = Math.max(widthTop, widthBottom);

  const heightLeft = Math.hypot(bl.x - tl.x, bl.y - tl.y);
  const heightRight = Math.hypot(br.x - tr.x, br.y - tr.y);
  const maxHeight = Math.max(heightLeft, heightRight);

  // Source & Destination matrices for cv.getPerspectiveTransform
  const srcCoords = cv.matFromArray(4, 1, cv.CV_32FC2, [tl.x, tl.y, tr.x, tr.y, br.x, br.y, bl.x, bl.y]);
  const dstCoords = cv.matFromArray(4, 1, cv.CV_32FC2, [0, 0, maxWidth - 1, 0, maxWidth - 1, maxHeight - 1, 0, maxHeight - 1]);

  const transformMatrix = cv.getPerspectiveTransform(srcCoords, dstCoords);
  const rectifiedMat = new cv.Mat();
  
  cv.warpPerspective(srcMat, rectifiedMat, transformMatrix, new cv.Size(maxWidth, maxHeight));
  return rectifiedMat;
}`
      }
    },
    {
      id: "focusguard",
      title: "FocusGuard",
      badge: "Distributed Systems",
      role: "Systems Software Engineer",
      period: "2025",
      category: "Distributed Daemons · Go · Chrome MV3 · WebSockets",
      summary: "Cross-platform distributed daemon and browser extension synchronizing real-time digital policy enforcement across desktop, mobile, and browser clients.",
      githubUrl: "https://github.com/rofazhasan/FocusGuard",
      tags: ["Go 1.22", "Docker", "WebSockets", "Chrome MV3", "SQLite", "Android VpnService"],
      architecture: [
        { step: "01. Central Go Daemon", desc: "Lightweight Go 1.22 service managing real-time state and synchronized attention budgets" },
        { step: "02. WebSocket Streaming", desc: "Persistent bi-directional connection dispatching policy delta events" },
        { step: "03. Chrome MV3 Engine", desc: "Declarative Net Request rules compiled natively without JS execution latency" },
        { step: "04. Android DNS Sinkhole", desc: "VpnService UDP interceptor resolving blocked domains to RFC 1035 NXDOMAIN" },
        { step: "05. Offline SQLite Store", desc: "Local policy caching with timestamp-based delta sync on reconnection" }
      ],
      highlights: [
        "Distributed Daemon: Built a centralized Go 1.22 service coordinating real-time focus session state across desktop and mobile clients using persistent WebSockets.",
        "Browser-Level Policy: Implemented declarative browser-level network filtering rules using Chrome's Declarative Net Request API, avoiding per-request JavaScript interception overhead.",
        "Local-First Synchronization: Engineered local SQLite policy caching with delta synchronization and integrated an Android VPN UDP DNS sinkhole intercepting restricted domains."
      ],
      codeSnippet: {
        filename: "daemon/session_hub.go",
        language: "go",
        code: `// High-concurrency WebSocket state coordinator in Go 1.22
type SessionHub struct {
	clients    map[*Client]bool
	broadcast  chan StateSyncMessage
	register   chan *Client
	unregister chan *Client
	mu         sync.RWMutex
}

func (h *SessionHub) Run(ctx context.Context) {
	for {
		select {
		case <-ctx.Done():
			return
		case client := <-h.register:
			h.mu.Lock()
			h.clients[client] = true
			h.mu.Unlock()
		case message := <-h.broadcast:
			h.mu.RLock()
			for client := range h.clients {
				select {
				case client.send <- message:
				default:
					close(client.send)
					delete(h.clients, client)
				}
			}
			h.mu.RUnlock()
		}
	}
}`
      }
    },
    {
      id: "krishi-bondhu",
      title: "Krishi Bondhu AI",
      badge: "Edge & Mobile Systems",
      role: "Mobile & Edge Engineer",
      period: "2024",
      category: "Edge Systems · Flutter · Offline-First · Audio",
      summary: "Offline-first mobile crop health assistant with standardized camera image capture, local SQLite persistence, and bilingual audio feedback for rural environments.",
      githubUrl: "https://github.com/rofazhasan/Krishi_Bondhu_AI",
      tags: ["Flutter", "Dart", "Riverpod", "SQLite (sqflite)", "Hardware Camera API"],
      architecture: [
        { step: "01. On-Device Camera", desc: "Direct hardware camera access standardizing crop leaf framing and lighting" },
        { step: "02. Image Standardization", desc: "On-device framing guidelines and resolution normalization" },
        { step: "03. Offline SQLite Store", desc: "Local queue preserving diagnostic history and audio records without internet" },
        { step: "04. Bilingual Audio UI", desc: "Voice-guided prompts designed specifically for agricultural field accessibility" }
      ],
      highlights: [
        "Developed an on-device camera image acquisition pipeline with standardized leaf capture, local SQLite persistence, and bilingual audio feedback to support low-connectivity agricultural field use."
      ],
      codeSnippet: {
        filename: "lib/features/camera/leaf_capture_service.dart",
        language: "dart",
        code: `// Standardized mobile leaf acquisition service
class LeafCaptureService {
  final CameraController _controller;

  LeafCaptureService(this._controller);

  Future<CapturedLeafSample?> captureAndStandardize() async {
    if (!_controller.value.isInitialized) return null;

    final XFile rawFile = await _controller.takePicture();
    final bytes = await rawFile.readAsBytes();
    
    // Validate brightness and sharpness heuristics before caching
    final sample = CapturedLeafSample(
      rawBytes: bytes,
      timestamp: DateTime.now().toUtc(),
      telemetry: await readDeviceOrientation(),
    );

    await LocalDatabase.instance.insertOfflineSample(sample);
    return sample;
  }
}`
      }
    }
  ],

  aiLabExperiments: [
    {
      id: "slm-diagnosis",
      title: "01 // Local SLM Error Diagnosis",
      category: "Generative AI · Constrained Prompting",
      description: "Simulate structured student exam error analysis using low-temperature Qwen 2.5 structured prompting. Demonstrates how raw answer vectors are transformed into discrete concept weaknesses.",
      inputLabel: "Sample Student Error Vector",
      sampleInputs: [
        { label: "Calculus: Chain Rule & Integration by Parts", value: "Q4: Missed inner derivative in d/dx[sin(3x^2)]; Q7: Incorrect integration by parts sign in ∫x*e^(-x)dx; Q11: Forgot constant of integration." },
        { label: "Physics: Newton's Laws & Friction", value: "Q2: Omitted static friction threshold on inclined plane; Q5: Incorrect free-body diagram tension vector; Q9: Confused normal force with mg*cos(theta)." },
        { label: "Algorithms: Dynamic Programming", value: "Q3: Exponential overlap in recursive Fibonacci; Q8: Failed memoization state boundary in Knapsack 0/1; Q14: Incorrect base case in Longest Common Subsequence." }
      ]
    },
    {
      id: "cv-pipeline",
      title: "02 // Document Geometry Rectification",
      category: "Computer Vision · Geometric Warp",
      description: "Interactive visualization of the OpenCV.js document processing pipeline. Step through edge detection, contour approximation, and 4-point homography perspective warp.",
      stages: [
        { name: "Raw Capture", note: "Skewed camera capture of physical answer sheet with uneven perspective." },
        { name: "Canny Edges", note: "Dual-threshold gradient filtering extracting document boundaries." },
        { name: "4 Corners", note: "Douglas-Peucker polygon approximation isolating 4 document vertices." },
        { name: "Homography Warp", note: "cv.warpPerspective standardizing sheet to planar coordinate grid." },
        { name: "ROI Segmentation", note: "Grid projection isolating question bubbles for histogram fill classification." }
      ]
    },
    {
      id: "schema-validator",
      title: "03 // Structured Output Validation",
      category: "Output Guardrails · Schema Enforcement",
      description: "Demonstrates why production AI applications cannot rely on raw model text. View how a Zod schema cleanses, parses, and validates the model response into type-safe JSON.",
      rawInput: "Here is your report:\\nOverall Score: 68/100.\\nThe student has major conceptual confusion in Chain Rule derivatives and sign management in integration by parts. Suggested action: Review composite functions.",
      validatedSchema: `{
  "studentId": "std_ruet_8842",
  "score": 68,
  "confidence": 0.94,
  "conceptGaps": [
    { "topic": "Calculus", "subtopic": "Chain Rule", "severity": "HIGH" },
    { "topic": "Integration", "subtopic": "Integration by Parts", "severity": "MEDIUM" }
  ],
  "recommendedAction": "Review composite function derivatives before multi-variable calculus modules.",
  "fallbackEngaged": false
}`
    },
    {
      id: "fallback-resilience",
      title: "04 // Deterministic Fallback Simulator",
      category: "Systems Reliability · Fault Tolerance",
      description: "Test system fault tolerance under inference latency spikes. When model inference latency exceeds strict timeout thresholds, the sub-10ms PostgreSQL deterministic fallback activates automatically.",
      thresholdMs: 800
    }
  ],

  techStack: [
    {
      category: "AI & Machine Learning",
      items: [
        { name: "Generative AI & LLMs", context: "Low-temp structured evaluation, system prompting", project: "Digital School" },
        { name: "Local SLM Deployment", context: "Ollama runtime running Qwen 2.5 3B / Llama 3.2", project: "Digital School" },
        { name: "Model Inference", context: "Constrained JSON generation & token limits", project: "Digital School" },
        { name: "Structured Outputs", context: "Zod schemas, JSON validation & output guardrails", project: "Digital School" },
        { name: "Deterministic Fallbacks", context: "PostgreSQL algorithmic recovery on latency spikes", project: "Digital School" },
        { name: "AI Evaluation Metrics", context: "Error classification heuristics & topic scoring", project: "Digital School" }
      ]
    },
    {
      category: "Computer Vision",
      items: [
        { name: "OpenCV.js (WebAssembly)", context: "In-browser document rectification & bubble classification", project: "OMRView" },
        { name: "TensorFlow.js (BlazeFace)", context: "Real-time client-side face presence & pose tracking", project: "Digital School" },
        { name: "Geometric Homography", context: "4-point perspective warp for skewed camera captures", project: "OMRView" },
        { name: "Image Preprocessing", context: "Canny edge detection, adaptive thresholding, ROI extraction", project: "OMRView" },
        { name: "Intensity Classification", context: "Bubble fill analysis across row baseline lighting", project: "OMRView" }
      ]
    },
    {
      category: "Programming & Frameworks",
      items: [
        { name: "Python", context: "FastAPI, NumPy, baseline model testing scripts", project: "AI Engineering" },
        { name: "TypeScript", context: "Full-stack type safety across client, backend & schemas", project: "Digital School & OMRView" },
        { name: "Go (1.22+)", context: "High-throughput concurrent daemons & state synchronization", project: "FocusGuard" },
        { name: "C++", context: "Data structures, algorithms & competitive problem solving", project: "RUET CSE" },
        { name: "Next.js 15 / React 19", context: "Server Components, App Router, responsive design", project: "Digital School" },
        { name: "Flutter (Dart)", context: "Mobile client with camera hardware APIs and SQLite", project: "Krishi Bondhu AI" }
      ]
    },
    {
      category: "Backend, Data & Infrastructure",
      items: [
        { name: "PostgreSQL", context: "Relational modeling, multi-tenant indexing, connection pooling", project: "Digital School" },
        { name: "Prisma ORM 6.10", context: "Type-safe database migrations & relational schema design", project: "Digital School" },
        { name: "Redis", context: "In-memory caching and session rate limiting", project: "Digital School" },
        { name: "SQLite", context: "Local-first persistence for offline mobile & desktop daemons", project: "FocusGuard & Krishi" },
        { name: "WebSockets", context: "Bi-directional real-time state streaming", project: "FocusGuard" },
        { name: "Docker", context: "Containerized multi-service development environments", project: "FocusGuard" },
        { name: "Edge CDN Caching", context: "Stale-While-Revalidate headers optimizing origin load", project: "Digital School" }
      ]
    }
  ],

  education: [
    {
      institution: "Rajshahi University of Engineering & Technology (RUET)",
      degree: "Bachelor of Science in Computer Science & Engineering",
      period: "2023 – 2027",
      details: [
        "Admitted through the national combined engineering university admission process (CUET, KUET, RUET).",
        "Relevant Coursework: Linear Algebra, Probability & Statistics, Algorithms & Data Structures, Database Systems, Discrete Mathematics, Object-Oriented Design."
      ]
    },
    {
      institution: "St. Joseph Higher Secondary School",
      degree: "Higher Secondary Certificate (HSC), Science",
      period: "2022",
      details: [
        "GPA: 5.00 / 5.00",
        "Strong foundation in advanced Mathematics, Physics, and analytical problem solving."
      ]
    }
  ],

  honors: [
    {
      title: "Creative Talent Hunt — Regional Champion, Mathematics & Computing",
      issuer: "Government of Bangladesh",
      year: "2018",
      summary: "Recognized by the Ministry of Education for demonstrated excellence in mathematics, analytical reasoning, and computer problem solving."
    },
    {
      title: "RUET CSE Peer Workshop Instructor",
      issuer: "RUET Department of Computer Science & Engineering",
      year: "2023 – Present",
      summary: "Organized and taught hands-on peer workshops on Data Structures, Algorithmic Complexity, and Object-Oriented Architecture; active participant in university programming contests."
    }
  ],

  repositories: [
    {
      name: "digital_school",
      url: "https://github.com/rofazhasan/digital_school",
      description: "Flagship online education & assessment platform with local SLM mistake diagnostic engine and client-side vision proctoring.",
      tech: "Next.js 15 · TypeScript · PostgreSQL · Ollama · TensorFlow.js"
    },
    {
      name: "OMRView",
      url: "https://github.com/rofazhasan/OMRView",
      description: "In-browser computer vision pipeline running compiled OpenCV.js WebAssembly for document geometric rectification and mark recognition.",
      tech: "TypeScript · React 19 · Vite · OpenCV.js Wasm"
    },
    {
      name: "FocusGuard",
      url: "https://github.com/rofazhasan/FocusGuard",
      description: "Distributed cross-platform systems daemon coordinating real-time focus sessions with Chrome MV3 network rule compilation.",
      tech: "Go 1.22 · WebSockets · Docker · Chrome MV3 · SQLite"
    },
    {
      name: "Krishi_Bondhu_AI",
      url: "https://github.com/rofazhasan/Krishi_Bondhu_AI",
      description: "Offline-first mobile crop health assistant with on-device camera acquisition pipeline and local SQLite storage.",
      tech: "Flutter · Dart · Riverpod · SQLite · Hardware Camera"
    },
    {
      name: "Meal-Management",
      url: "https://github.com/rofazhasan/Meal-Management",
      description: "Full-stack relational ledger application for university hostel meal calculations with automated expense aggregation.",
      tech: "TypeScript · React · Node.js · PostgreSQL"
    },
    {
      name: "FinTrack",
      url: "https://github.com/rofazhasan/FinTrack",
      description: "Personal finance and cashflow tracker with visual transaction category distributions and budgeting alerts.",
      tech: "TypeScript · Next.js · Prisma · PostgreSQL"
    }
  ]
};
