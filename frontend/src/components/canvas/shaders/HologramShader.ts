export const HologramVertexShader = `
  uniform float uTime;
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vViewPosition;

  void main() {
    vUv = uv;
    vNormal = normalize(normalMatrix * normal);
    
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    vViewPosition = -mvPosition.xyz;
    
    // Subtle digital glitch jitter
    vec3 pos = position;
    float jitter = sin(uTime * 15.0 + position.y * 10.0) * 0.005;
    pos.x += jitter;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

export const HologramFragmentShader = `
  uniform float uTime;
  uniform vec3 uColor;
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vViewPosition;

  void main() {
    // Scanlines
    float scanline = sin(vUv.y * 120.0 - uTime * 6.0) * 0.5 + 0.5;
    scanline = pow(scanline, 1.5);
    
    // Fresnel edge glow
    vec3 normal = normalize(vNormal);
    vec3 viewDir = normalize(vViewPosition);
    float fresnel = pow(1.0 - abs(dot(normal, viewDir)), 2.5);
    
    // Combine hologram effect
    float alpha = (scanline * 0.4 + fresnel * 0.6 + 0.2);
    vec3 finalColor = uColor + vec3(fresnel * 0.5);
    
    gl_FragColor = vec4(finalColor, alpha);
  }
`;
