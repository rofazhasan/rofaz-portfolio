export const WaterVertexShader = `
  uniform float uTime;
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vWorldPosition;

  void main() {
    vUv = uv;
    vec3 pos = position;
    
    // Wave calculations
    float wave1 = sin(pos.x * 2.0 + uTime * 2.5) * 0.08;
    float wave2 = cos(pos.z * 1.8 + uTime * 2.0) * 0.06;
    pos.y += wave1 + wave2;

    vNormal = normal;
    vec4 worldPos = modelMatrix * vec4(pos, 1.0);
    vWorldPosition = worldPos.xyz;
    
    gl_Position = projectionMatrix * viewMatrix * worldPos;
  }
`;

export const WaterFragmentShader = `
  uniform float uTime;
  uniform vec3 uDeepColor;
  uniform vec3 uShallowColor;
  uniform vec3 uFoamColor;

  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vWorldPosition;

  void main() {
    // Dynamic noise ripple effect
    float noise = sin(vWorldPosition.x * 10.0 + uTime * 3.0) * cos(vWorldPosition.z * 10.0 + uTime * 3.0);
    
    vec3 waterColor = mix(uShallowColor, uDeepColor, smoothstep(-0.2, 0.2, noise));
    
    // Specular highlight
    vec3 lightDir = normalize(vec3(0.5, 1.0, 0.5));
    float specular = pow(max(0.0, dot(vNormal, lightDir)), 32.0);
    
    // Edge foam
    float foam = step(0.12, abs(noise)) * 0.2;
    waterColor += uFoamColor * foam + vec3(specular * 0.4);
    
    gl_FragColor = vec4(waterColor, 0.85);
  }
`;
