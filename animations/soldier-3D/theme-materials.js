import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.187.0/build/three.module.js';

/** Recolor the original atlas in the material shader; retain UVs, wear and normal detail. */
export function applyThemeMaterials(model, config, onChange) {
  const systemTheme = matchMedia('(prefers-color-scheme: dark)');
  const uniforms = {
    uSoldierShadow: { value: new THREE.Color() },
    uSoldierArmor: { value: new THREE.Color() },
    uSoldierHighlight: { value: new THREE.Color() },
    uSoldierAccent: { value: new THREE.Color() },
    uSoldierExposure: { value: config.textureExposure },
    uSoldierContrast: { value: config.textureContrast },
  };
  const declarations = `
    uniform vec3 uSoldierShadow;
    uniform vec3 uSoldierArmor;
    uniform vec3 uSoldierHighlight;
    uniform vec3 uSoldierAccent;
    uniform float uSoldierExposure;
    uniform float uSoldierContrast;
  `;
  const materials = new Set();
  model.traverse((object) => {
    for (const material of [].concat(object.material || [])) materials.add(material);
  });
  for (const material of materials) {
    const visor = material.name === config.visorMaterial;
    // Both original GLB materials are opaque. Do not dither or dissolve the body on scroll.
    material.alphaHash = false;
    material.transparent = false;
    material.opacity = 1;
    material.depthWrite = true;
    material.roughness = visor ? config.visorRoughness : config.armorRoughness;
    material.metalness = visor ? config.visorMetalness : config.armorMetalness;
    material.onBeforeCompile = (shader) => {
      Object.assign(shader.uniforms, uniforms);
      shader.fragmentShader = declarations + shader.fragmentShader;
      shader.fragmentShader = shader.fragmentShader.replace(
        '#include <map_fragment>',
        `
        #include <map_fragment>
        // The atlas supplies surface variation. Its desert hue is replaced, not multiplied.
        float soldierLuma = dot(diffuseColor.rgb, vec3(0.2126, 0.7152, 0.0722));
        float soldierShade = pow(
          clamp(soldierLuma * uSoldierExposure, 0.0, 1.0),
          uSoldierContrast
        );
        // Red markings become the site's blue accent; tan armor remains steel/slate.
        float soldierRed = diffuseColor.r - diffuseColor.g
          - max(0.0, diffuseColor.g - diffuseColor.b) * 0.85;
        float soldierMark = smoothstep(0.05, 0.12, soldierRed);
        vec3 soldierArmor = mix(
          uSoldierShadow,
          uSoldierArmor,
          smoothstep(0.0, 0.6, soldierShade)
        );
        soldierArmor = mix(
          soldierArmor,
          uSoldierHighlight,
          smoothstep(0.6, 1.0, soldierShade) * 0.6
        );
        diffuseColor.rgb = ${
          visor
            ? 'mix(uSoldierShadow, uSoldierAccent, soldierShade * 0.22)'
            : 'mix(soldierArmor, uSoldierAccent * (0.55 + 0.45 * soldierShade), soldierMark)'
        };
      `,
      );
    };
    material.customProgramCacheKey = () => `soldier-theme-v3-opaque-${visor ? 'visor' : 'armor'}`;
    material.needsUpdate = true;
  }
  function refresh() {
    const style = getComputedStyle(document.documentElement);
    const explicit = document.documentElement.dataset.theme;
    const dark = explicit ? explicit === 'dark' : systemTheme.matches;
    const fallback = config.themeFallbacks[dark ? 'dark' : 'light'];
    const color = (token, value) => style.getPropertyValue(token).trim() || value;
    // THREE.Color converts CSS sRGB colors into the renderer's linear working space.
    uniforms.uSoldierShadow.value.set(config.armorShadow);
    uniforms.uSoldierArmor.value.set(color(config.themeTokens.armor, fallback.armor));
    uniforms.uSoldierHighlight.value.set(color(config.themeTokens.highlight, fallback.highlight));
    uniforms.uSoldierAccent.value.set(color(config.themeTokens.accent, fallback.accent));
    onChange(); // Also redraw a paused or reduced-motion still frame when the theme changes.
  }
  const observer = new MutationObserver(refresh);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme', 'class', 'style'],
  });
  systemTheme.addEventListener('change', refresh);
  refresh();
  return {
    destroy() {
      observer.disconnect();
      systemTheme.removeEventListener('change', refresh);
    },
  };
}
