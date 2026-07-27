import * as THREE from 'three';

export const GrassVertexShader = `
  uniform float uTime;
  uniform float uWindSpeed;
  attribute vec3 instanceOffset;
  attribute float instanceScale;
  
  varying vec2 vUv;
  varying float vHeight;

  void main() {
    vUv = uv;
    vHeight = position.y;

    vec3 pos = position * instanceScale;
    
    // Wind displacement based on height (tip sways more than root)
    float wind = sin(uTime * uWindSpeed + instanceOffset.x * 0.5 + instanceOffset.z * 0.5) * 0.25;
    float windZ = cos(uTime * uWindSpeed * 0.8 + instanceOffset.x * 0.3) * 0.15;
    
    pos.x += wind * pow(uv.y, 1.5);
    pos.z += windZ * pow(uv.y, 1.5);
    
    vec3 worldPosition = pos + instanceOffset;
    vec4 mvPosition = modelViewMatrix * vec4(worldPosition, 1.0);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

export const GrassFragmentShader = `
  uniform vec3 uColorBase;
  uniform vec3 uColorTip;
  varying vec2 vUv;
  varying float vHeight;

  void main() {
    // Gradient from dark root to bright Pixar green tip
    vec3 color = mix(uColorBase, uColorTip, pow(vUv.y, 0.8));
    
    // Add subtle ambient shadow at base
    color *= 0.6 + 0.4 * vUv.y;
    
    gl_FragColor = vec4(color, 1.0);
  }
`;
