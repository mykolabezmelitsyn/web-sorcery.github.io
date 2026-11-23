export const earthVertex = `
varying vec2 vUv; varying vec3 vNormalW; varying vec3 vNormalL; varying vec3 vViewDir;
void main() {
  vUv = uv;
  vNormalW = normalize(mat3(modelMatrix) * normal);
  vNormalL = normalize(position);            // geometry-local dir (ocean ripple centre)
  vec4 wp = modelMatrix * vec4(position, 1.0);
  vViewDir = normalize(cameraPosition - wp.xyz);
  gl_Position = projectionMatrix * viewMatrix * wp;
}
`;

export const earthFragment = `
precision highp float;
uniform sampler2D dayTex, nightTex, specTex, uIdMap;
uniform vec3 sunDir;
uniform float uHoverId, uHoverPrevId, uHoverMix, uSelectId;
uniform vec3 uOceanDir; uniform float uOceanActive, uOceanTime;
varying vec2 vUv; varying vec3 vNormalW; varying vec3 vNormalL; varying vec3 vViewDir;

void main() {
  vec3 n = normalize(vNormalW);
  vec3 s = normalize(sunDir);
  float day = smoothstep(-0.32, 0.18, dot(n, s));      // soft, wide terminator → mostly lit

  vec3 dayCol   = texture2D(dayTex,   vUv).rgb;
  vec3 nightCol = texture2D(nightTex, vUv).rgb;

  // ocean sun-glint (specular is bright over water)
  float ocean = texture2D(specTex, vUv).r;
  vec3  hlf   = normalize(s + vViewDir);
  float spec  = pow(max(dot(n, hlf), 0.0), 42.0) * ocean * day;

  vec3 col = dayCol * (0.48 + 1.05 * day);             // ambient fill + strong day side
  col += nightCol * (1.0 - day) * 0.5;                 // city lights only where dark
  col += spec * vec3(0.7, 0.82, 1.0) * 0.28;           // restrained glint (not a wash)
  col = mix(col, col * vec3(0.72, 0.86, 1.12), texture2D(specTex, vUv).r * 0.5); // deepen oceans blue

  // limb darkening — a hint of shadow at the silhouette (no dark ring, no glow)
  float facing = max(dot(n, vViewDir), 0.0);
  col *= mix(0.86, 1.0, smoothstep(0.0, 0.5, facing));

  // country id map (red channel = id). hover cross-fades old→new; selected holds a brighter red + rim
  float sid = texture2D(uIdMap, vUv).r * 255.0;
  float hovCur  = step(0.5, uHoverId)     * (1.0 - step(0.5, abs(sid - uHoverId)));
  float hovPrev = step(0.5, uHoverPrevId) * (1.0 - step(0.5, abs(sid - uHoverPrevId)));
  float hov = max(hovCur * uHoverMix, hovPrev * (1.0 - uHoverMix));
  float sel = step(0.5, uSelectId) * (1.0 - step(0.5, abs(sid - uSelectId)));
  col = mix(col, vec3(0.86, 0.09, 0.10), max(hov * 0.5, sel * 0.62));
  col += sel * pow(1.0 - facing, 3.0) * vec3(0.9, 0.2, 0.2) * 0.4;

  // ocean hover: concentric ripples from the cursor (finger-in-water). GEODESIC distance
  // (acos of the dot) → true circles on the sphere. Masked to water (id 0).
  if (uOceanActive > 0.001) {
    float water = 1.0 - step(0.5, sid);
    float d = acos(clamp(dot(normalize(vNormalL), uOceanDir), -1.0, 1.0));
    float env   = 1.0 - smoothstep(0.0, 0.16, d);                    // compact reach
    float wave  = sin(d * 78.0 - uOceanTime * 3.0);                  // rings travelling out
    float crest = pow(max(wave, 0.0), 3.2) * smoothstep(0.014, 0.05, d);
    float touch = 1.0 - smoothstep(0.0, 0.02, d);                    // contact point
    col += (crest * env * 0.72 + touch * 0.32) * water * uOceanActive * vec3(0.52, 0.80, 1.0);
  }

  col = pow(max(col, 0.0), vec3(0.4545));               // ⚠ linear → sRGB (the #1 gotcha)
  gl_FragColor = vec4(col, 1.0);
}
`;

export const cloudFragment = `
uniform sampler2D cloudsTex; uniform vec3 sunDir; varying vec2 vUv; varying vec3 vNormalW;
void main() {
  float c   = smoothstep(0.66, 0.99, texture2D(cloudsTex, vUv).r);
  float day = smoothstep(-0.05, 0.45, dot(normalize(vNormalW), normalize(sunDir)));
  gl_FragColor = vec4(vec3(0.85) * (0.5 + day * 0.5), c * day * 0.08);
}
`;

export const starVertex = `
attribute float aSize; attribute float aPhase; uniform float uTime; uniform float uDpr;
varying float vTw;
void main() {
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  vTw = 0.72 + 0.28 * sin(uTime * 1.5 + aPhase);      // subtle twinkle
  gl_PointSize = aSize * uDpr * (0.92 + 0.25 * vTw);  // ×DPR so it matches on retina
}
`;

export const starFragment = `
// Soft round dot with a crisp bright centre.
varying float vTw;
void main() {
  float d = length(gl_PointCoord - 0.5);
  float a = pow((1.0 - smoothstep(0.0, 0.5, d)), 2.0);
  gl_FragColor = vec4(vec3(0.9, 0.94, 1.0), min(1.0, a * vTw * 1.15));
}
`;
