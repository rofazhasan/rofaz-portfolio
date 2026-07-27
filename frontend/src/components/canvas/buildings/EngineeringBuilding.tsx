import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Float } from '@react-three/drei';
import { RigidBody } from '@react-three/rapier';
import * as THREE from 'three';
import { useGameStore, ProjectData } from '@/store/useGameStore';
import { audioManager } from '@/audio/AudioManager';

export const EngineeringBuilding: React.FC = () => {
  const setActiveZone = useGameStore((s) => s.setActiveZone);
  const openProjectModal = useGameStore((s) => s.openProjectModal);
  const unlockAchievement = useGameStore((s) => s.unlockAchievement);
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);

  const projectsData: (ProjectData & { pos: [number, number, number] })[] = [
    {
      id: 'antigravity-ai',
      title: 'Antigravity AI Agent Platform',
      subtitle: 'Autonomous Multi-Agent Orchestration Framework',
      category: 'AI & Neural Systems',
      description: 'An advanced autonomous AI agent system capable of distributed reasoning, multi-tool orchestration, real-time code synthesis, and automated task execution.',
      techStack: ['Python', 'PyTorch', 'TypeScript', 'FastAPI', 'Redis', 'Docker'],
      features: ['Autonomous Task Planning', 'Multi-Agent Collaboration', 'Real-Time Vector Memory', 'Streaming WebSockets API'],
      metrics: '10x Faster Task Execution',
      githubUrl: 'https://github.com/rofazhasan',
      liveUrl: 'https://github.com/rofazhasan',
      awards: ['Best AI Innovation Award 2025', 'Open Source Highlight'],
      modelType: 'robot',
      pos: [-6, 1.2, 0],
    },
    {
      id: 'nexus-3d-engine',
      title: 'Nexus 3D Web Graphics Engine',
      subtitle: 'Photorealistic WebGL/WebGPU Rendering Pipeline',
      category: 'Computer Graphics & 3D',
      description: 'Ultra high-performance 3D graphics rendering engine for browser-based interactive web games, digital twins, and immersive spatial applications.',
      techStack: ['Three.js', 'React Three Fiber', 'GLSL Shaders', 'WebGPU', 'TypeScript', 'GSAP'],
      features: ['Physically Based Shaders', 'Volumetric Lighting & Fog', 'Instanced Foilage System', 'Spatial Audio Engine'],
      metrics: 'Constant 60 FPS WebGL',
      githubUrl: 'https://github.com/rofazhasan',
      liveUrl: 'https://github.com/rofazhasan',
      awards: ['Awwwards Site of the Day Candidate', 'FWA of the Month'],
      modelType: 'web',
      pos: [-2, 1.2, -5],
    },
    {
      id: 'shield-cloud',
      title: 'ShieldCloud Zero-Trust Telemetry',
      subtitle: 'Enterprise Security & Infrastructure Monitoring',
      category: 'Cloud Infrastructure & Security',
      description: 'Distributed zero-trust monitoring platform providing millisecond-level threat detection, automated container isolation, and real-time observability.',
      techStack: ['Go', 'Rust', 'Kubernetes', 'PostgreSQL', 'Grafana', 'eBPF'],
      features: ['eBPF Packet Inspection', 'Automated Threat Mitigation', 'Zero-Trust Encryption', 'Microsecond Metrics'],
      metrics: '99.999% Uptime Monitored',
      githubUrl: 'https://github.com/rofazhasan',
      liveUrl: 'https://github.com/rofazhasan',
      awards: ['Cloud Security Tech Showcase'],
      modelType: 'server',
      pos: [2, 1.2, -5],
    },
    {
      id: 'visionx-edge',
      title: 'VisionX Edge AI Camera Unit',
      subtitle: 'Real-Time Edge Computer Vision System',
      category: 'Robotics & Computer Vision',
      description: 'Compact hardware edge computer vision solution for real-time object tracking, autonomous drone navigation, and high-speed industrial quality control.',
      techStack: ['C++', 'TensorRT', 'OpenCV', 'ROS2', 'CUDA', 'Python'],
      features: ['Sub-10ms Inference Latency', 'Multi-Object Tracking (YOLOv9)', 'ROS2 Robotics Middleware', 'Stereo Depth Estimation'],
      metrics: '< 8ms Frame Latency',
      githubUrl: 'https://github.com/rofazhasan',
      liveUrl: 'https://github.com/rofazhasan',
      awards: ['Robotics Tech Challenge Finalist'],
      modelType: 'chip',
      pos: [6, 1.2, 0],
    },
  ];

  const handleProjectSelect = (project: ProjectData) => {
    audioManager.playHologram();
    setActiveProjectId(project.id);
    unlockAchievement('project_inspected', 'Engineer At Work', 'Inspected a physical project exhibition in Engineering', 200);
    openProjectModal(project);
  };

  return (
    <group position={[25, 0, -15]}>
      {/* Zone Trigger */}
      <mesh visible={false} onPointerEnter={() => setActiveZone('Engineering Building')}>
        <boxGeometry args={[20, 10, 20]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>

      {/* Building Base & Glass Architecture */}
      <RigidBody type="fixed">
        <mesh position={[0, 0.4, 0]} castShadow receiveShadow>
          <boxGeometry args={[18, 0.8, 16]} />
          <meshStandardMaterial color="#0f172a" roughness={0.2} metalness={0.8} />
        </mesh>

        {/* Back Wall Exhibition Panel */}
        <mesh position={[0, 4.5, -7.5]} castShadow receiveShadow>
          <boxGeometry args={[17.5, 7.5, 0.8]} />
          <meshStandardMaterial color="#1e293b" roughness={0.3} />
        </mesh>
      </RigidBody>

      {/* Building Header Title */}
      <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.3}>
        <Text
          position={[0, 9.2, 0]}
          fontSize={0.85}
          color="#38bdf8"
          anchorX="center"
          anchorY="middle"
          font="https://fonts.gstatic.com/s/spacegrotesk/v16/V8mQoBoA4D13U4yBnKzX413uh4-U4I3G.woff2"
        >
          ENGINEERING & PROJECTS EXHIBITION
        </Text>
      </Float>

      {/* Physical Project Exhibitions */}
      {projectsData.map((project) => {
        const isActive = activeProjectId === project.id;
        return (
          <group key={project.id} position={project.pos}>
            {/* Exhibition Pedestal */}
            <mesh position={[0, -0.4, 0]} castShadow receiveShadow>
              <cylinderGeometry args={[1.2, 1.4, 0.8, 32]} />
              <meshStandardMaterial color="#1e293b" metalness={0.8} />
            </mesh>

            {/* Spotlight Beam */}
            <spotLight
              position={[0, 4, 0]}
              target-position={[0, 0, 0]}
              color={isActive ? '#38bdf8' : '#64748b'}
              intensity={isActive ? 8 : 3}
              angle={0.6}
              penumbra={0.5}
            />

            {/* Physical 3D Model Representation */}
            <Float speed={2} rotationIntensity={0.4} floatIntensity={0.5}>
              <group
                onClick={() => handleProjectSelect(project)}
                onPointerOver={() => setActiveProjectId(project.id)}
                onPointerOut={() => setActiveProjectId(null)}
              >
                {project.modelType === 'robot' && (
                  <mesh castShadow>
                    <cylinderGeometry args={[0.5, 0.6, 1.2, 16]} />
                    <meshStandardMaterial color="#38bdf8" emissive="#0284c7" emissiveIntensity={isActive ? 1.5 : 0.4} metalness={0.9} />
                  </mesh>
                )}
                {project.modelType === 'web' && (
                  <mesh castShadow>
                    <boxGeometry args={[1.2, 0.8, 0.8]} />
                    <meshStandardMaterial color="#a855f7" emissive="#7e22ce" emissiveIntensity={isActive ? 1.5 : 0.4} roughness={0.1} />
                  </mesh>
                )}
                {project.modelType === 'server' && (
                  <mesh castShadow>
                    <boxGeometry args={[0.7, 1.4, 0.7]} />
                    <meshStandardMaterial color="#22c55e" emissive="#15803d" emissiveIntensity={isActive ? 1.5 : 0.4} metalness={0.8} />
                  </mesh>
                )}
                {project.modelType === 'chip' && (
                  <mesh castShadow>
                    <octahedronGeometry args={[0.7]} />
                    <meshStandardMaterial color="#f59e0b" emissive="#b45309" emissiveIntensity={isActive ? 1.5 : 0.4} wireframe />
                  </mesh>
                )}
              </group>
            </Float>

            {/* Floating Holographic Info Sign */}
            <Float speed={1.8} rotationIntensity={0.1} floatIntensity={0.2}>
              <group position={[0, 1.6, 0]}>
                <Text
                  fontSize={0.28}
                  color={isActive ? '#38bdf8' : '#f8fafc'}
                  anchorX="center"
                  anchorY="middle"
                >
                  {project.title}
                </Text>
                <Text
                  position={[0, -0.25, 0]}
                  fontSize={0.18}
                  color="#94a3b8"
                  anchorX="center"
                  anchorY="middle"
                >
                  [ Click or Press E to Inspect ]
                </Text>
              </group>
            </Float>
          </group>
        );
      })}
    </group>
  );
};
