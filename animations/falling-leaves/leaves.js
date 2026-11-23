import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const CONFIG = {
  desktopLeaves: 44, // Maximum desktop density.
  mobileLeaves: 24, // Lower density on narrow screens.
  mobileQuery: "(max-width: 767px)", // Match the compact viewport breakpoint.
  viewHeight: 10, // Height in world units, independent of aspect ratio.
  size: [0.38, 0.9], // Diameter range relative to the orthographic view.
  fallSpeed: [0.65, 1.45], // World units per second.
  sway: [0.12, 0.52], // Horizontal flutter amplitude.
  flutter: [0.8, 2.25], // Flutter radians per second.
  spin: [0.25, 0.85], // Base tumble radians per second.
  repulsionRadius: 1.8, // Size of the pointer influence in world units.
  repulsionStrength: 23, // Peak outward acceleration.
  returnSpring: 8, // Pull back toward the natural falling path.
  drag: 4.5, // Damping of displacement velocity per second.
  maxDpr: 1.6, // Limit GPU fill rate on high-density screens.
  maxPixels: 2560000, // Upper limit for backing-buffer pixels.
  inspectAngle: Math.PI / 7, // Rotation per keyboard button activation.
  inspectZoom: 1.18, // Zoom ratio per keyboard activation.
};

const modelUrl = new URL("./assets/leaves.glb", import.meta.url).href;
const random = (min, max) => THREE.MathUtils.lerp(min, max, Math.random());
const tau = Math.PI * 2;
let modelPromise;
let modelUsers = 0;

function loadLeaves() {
  // The GLB also contains a large woodland scene and its baked animation.
  // Decode only the authored web leaf scene, once for all section instances.
  modelPromise ??= new GLTFLoader()
    .register((parser) => ({
      name: "WebLeafScene",
      beforeRoot() {
        const index = parser.json.scenes.findIndex(
          (scene) => scene.name === "Web Leaf Assets",
        );
        if (index < 0) throw new Error("Missing Web Leaf Assets scene.");
        parser.json.scenes = [parser.json.scenes[index]];
        parser.json.scene = 0;
        parser.json.animations = [];
      },
    }))
    .loadAsync(modelUrl)
    .then(({ scene }) => {
      const variants = [];
      scene.traverse((object) => {
        if (object.isMesh && object.name.startsWith("Leaf_")) {
          const geometry = object.geometry;
          geometry.center();
          geometry.computeBoundingSphere();
          const scale = 0.5 / geometry.boundingSphere.radius;
          geometry.scale(scale, scale, scale);
          if (object.material.normalMap)
            object.material.normalMap.anisotropy = 4;
          variants.push({
            name: object.name,
            geometry,
            material: object.material,
          });
        }
      });
      if (!variants.length) throw new Error("Missing leaf meshes.");
      return variants;
    })
    .catch((error) => {
      modelPromise = undefined;
      throw error;
    });
  return modelPromise;
}

function releaseLeaves() {
  modelUsers -= 1;
  const pending = modelPromise;
  pending
    ?.then((variants) => {
      if (modelUsers || modelPromise !== pending) return;
      modelPromise = undefined;
      const geometries = new Set(variants.map((variant) => variant.geometry));
      const materials = new Set(variants.map((variant) => variant.material));
      const textures = new Set();
      for (const material of materials) {
        for (const value of Object.values(material)) {
          if (value?.isTexture) textures.add(value);
        }
        material.dispose();
      }
      for (const geometry of geometries) geometry.dispose();
      for (const texture of textures) {
        texture.source.data?.close?.();
        texture.dispose();
      }
    })
    .catch(() => {});
}

export function mountAnimation(container, options = {}) {
  const config = { ...CONFIG, ...options };
  const stage = container.querySelector(".leaves-stage");
  const buttons = container.querySelector(".leaves-controls");
  const inspector = container.querySelector(".leaves-inspector");
  const pauseButton = buttons.querySelector('[data-action="pause"]');
  const inspectButton = buttons.querySelector('[data-action="inspect"]');
  const motion = matchMedia("(prefers-reduced-motion: reduce)");
  const mobile = matchMedia(config.mobileQuery);
  const controller = new AbortController();
  const { signal } = controller;

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
  } catch {
    return { play() {}, pause() {}, destroy() {} };
  }

  modelUsers += 1;
  const canvas = renderer.domElement;
  canvas.setAttribute("aria-hidden", "true");
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  stage.append(canvas);

  const scene = new THREE.Scene();
  const inspectionScene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 50);
  const inspectionCamera = new THREE.PerspectiveCamera(34, 1, 0.1, 20);
  camera.position.z = 12;
  inspectionCamera.position.set(0, 1.15, 2.7);
  const controls = new OrbitControls(inspectionCamera, canvas);
  controls.enabled = false;
  controls.enablePan = false;
  controls.minDistance = 1.35;
  controls.maxDistance = 4.6;
  controls.update();
  controls.saveState();
  // OrbitControls captures touches during inspection only.
  canvas.style.touchAction = "";

  for (const lighting of [scene, inspectionScene]) {
    lighting.add(new THREE.HemisphereLight(0xfff2d8, 0x907c64, 2.05));
    const sun = new THREE.DirectionalLight(0xffe0a9, 2.4);
    sun.position.set(-4, 7, 5);
    lighting.add(sun);
  }

  const dummy = new THREE.Object3D();
  const sphere = new THREE.Spherical();
  const relative = new THREE.Vector3();
  const timer = new THREE.Timer();
  const batches = [];
  const halfHeight = config.viewHeight / 2;
  const pointer = new THREE.Vector2();
  let pointerPresent = false;
  let halfWidth = 0;
  let width = 0;
  let height = 0;
  let frame = 0;
  let ready = false;
  let paused = false;
  let inspecting = false;
  let onScreen = true;
  let running = false;
  const on = (target, type, listener) =>
    target.addEventListener(type, listener, { signal });

  function reset(leaf, initial = false) {
    leaf.x = random(-0.98, 0.98);
    leaf.y = initial
      ? random(-halfHeight, halfHeight)
      : halfHeight + random(0.65, 1.65);
    leaf.z = random(-2.7, 2.7);
    leaf.size = random(...config.size);
    leaf.speed = random(...config.fallSpeed);
    leaf.sway = random(...config.sway);
    leaf.flutter = random(...config.flutter);
    leaf.spin = random(...config.spin) * (Math.random() < 0.5 ? -1 : 1);
    leaf.phase = random(0, tau);
    leaf.roll = random(0, tau);
    leaf.pitch = random(-0.6, 0.6);
    leaf.dx = leaf.dy = leaf.vx = leaf.vy = 0;
  }

  function updateInstances(dt) {
    const compact = mobile.matches;
    const total = compact ? config.mobileLeaves : config.desktopLeaves;
    const radius = Math.min(config.repulsionRadius, halfWidth * 0.65);
    const friction = Math.exp(-config.drag * dt);
    for (let group = 0; group < batches.length; group++) {
      const { mesh, leaves } = batches[group];
      mesh.count = Math.floor(
        (total + batches.length - 1 - group) / batches.length,
      );
      for (let index = 0; index < mesh.count; index++) {
        const leaf = leaves[index];
        leaf.phase = (leaf.phase + dt * leaf.flutter) % tau;
        leaf.roll = (leaf.roll + dt * leaf.spin) % tau;
        leaf.y -= leaf.speed * dt;
        const sway = Math.sin(leaf.phase) * leaf.sway;
        const baseX = leaf.x * halfWidth + sway * Math.min(1, halfWidth / 4);

        // Apply a squared falloff in the image plane. The spring always
        // pulls the offset to zero, including after the pointer leaves.
        let ax = -leaf.dx * config.returnSpring;
        let ay = -leaf.dy * config.returnSpring;
        if (pointerPresent && dt) {
          const dx = baseX + leaf.dx - pointer.x;
          const dy = leaf.y + leaf.dy - pointer.y;
          const distance = Math.hypot(dx, dy);
          if (distance < radius) {
            const force =
              config.repulsionStrength * (1 - distance / radius) ** 2;
            ax +=
              force *
              (distance > 0.0001 ? dx / distance : Math.cos(leaf.phase));
            ay +=
              force *
              (distance > 0.0001 ? dy / distance : Math.sin(leaf.phase));
          }
        }
        leaf.vx = (leaf.vx + ax * dt) * friction;
        leaf.vy = (leaf.vy + ay * dt) * friction;
        leaf.dx += leaf.vx * dt;
        leaf.dy += leaf.vy * dt;

        const y = leaf.y + leaf.dy;
        dummy.position.set(baseX + leaf.dx, y, leaf.z);
        dummy.rotation.set(
          Math.PI / 2 + leaf.pitch + Math.sin(leaf.phase) * 0.57,
          Math.cos(leaf.phase * 2) * 0.37,
          leaf.roll,
          "ZYX",
        );
        dummy.scale.setScalar(leaf.size * (compact ? 0.82 : 1));
        dummy.updateMatrix();
        mesh.setMatrixAt(index, dummy.matrix);
        if (y + leaf.size < -halfHeight && leaf.y < -halfHeight) reset(leaf);
      }
      mesh.instanceMatrix.needsUpdate = true;
    }
  }

  function draw() {
    if (ready && width && height && onScreen && !document.hidden) {
      renderer.render(
        inspecting ? inspectionScene : scene,
        inspecting ? inspectionCamera : camera,
      );
    }
  }

  function render(time) {
    timer.update(time);
    updateInstances(Math.min(timer.getDelta(), 0.05));
    draw();
  }

  function sync() {
    const shouldRun =
      ready &&
      width > 0 &&
      height > 0 &&
      onScreen &&
      !document.hidden &&
      !motion.matches &&
      !paused &&
      !inspecting;
    if (shouldRun !== running) {
      running = shouldRun;
      timer.reset();
      renderer.setAnimationLoop(running ? render : null);
    }
    if (!running) draw();
    pauseButton.hidden = inspecting || motion.matches;
    pauseButton.textContent = paused ? "Play animation" : "Pause animation";
    pauseButton.setAttribute("aria-pressed", String(paused));
  }

  function resize() {
    frame = 0;
    width = stage.clientWidth;
    height = stage.clientHeight;
    if (width && height) {
      halfWidth = (halfHeight * width) / height;
      Object.assign(camera, {
        left: -halfWidth,
        right: halfWidth,
        top: halfHeight,
        bottom: -halfHeight,
      });
      camera.updateProjectionMatrix();
      inspectionCamera.aspect = width / height;
      const halfFov = THREE.MathUtils.degToRad(inspectionCamera.fov / 2);
      const shortHalfFov = Math.atan(
        Math.tan(halfFov) * Math.min(1, inspectionCamera.aspect),
      );
      controls.minDistance = Math.max(1.35, 0.54 / Math.sin(shortHalfFov));
      controls.maxDistance = Math.max(4.6, controls.minDistance * 2);
      inspectionCamera.updateProjectionMatrix();
      controls.update();
      renderer.setPixelRatio(
        Math.min(
          devicePixelRatio,
          config.maxDpr,
          Math.sqrt(config.maxPixels / (width * height)),
        ),
      );
      renderer.setSize(width, height, false);
      updateInstances(0);
    }
    sync();
  }

  function inspect(value) {
    inspecting = value;
    pointerPresent = false;
    container.classList.toggle("is-inspecting", value);
    controls.enabled = value;
    canvas.style.touchAction = value ? "none" : "";
    inspector.hidden = !value;
    inspectButton.textContent = value
      ? "Back to falling leaves"
      : "Inspect leaf";
    inspectButton.setAttribute("aria-pressed", String(value));
    canvas.setAttribute("aria-hidden", String(!value));
    if (value) {
      canvas.setAttribute("role", "img");
      canvas.setAttribute("aria-label", "A three-dimensional autumn leaf");
    }
    sync();
  }

  on(container, "pointermove", (event) => {
    if (
      event.pointerType === "touch" ||
      inspecting ||
      event.target.closest("button")
    ) {
      pointerPresent = false;
      return;
    }
    const bounds = stage.getBoundingClientRect();
    pointer.set(
      (((event.clientX - bounds.left) / bounds.width) * 2 - 1) * halfWidth,
      (1 - ((event.clientY - bounds.top) / bounds.height) * 2) * halfHeight,
    );
    pointerPresent = true;
  });
  for (const event of ["pointerleave", "pointercancel"]) {
    on(container, event, () => {
      pointerPresent = false;
    });
  }
  on(document, "visibilitychange", () => {
    pointerPresent = false;
    sync();
  });
  on(motion, "change", sync);
  on(mobile, "change", resize);

  on(container, "click", (event) => {
    const action = event.target.closest("[data-action]")?.dataset.action;
    if (action === "pause") {
      paused = !paused;
      sync();
    } else if (action === "inspect") {
      inspect(!inspecting);
    } else if (inspecting && action) {
      if (action === "reset") {
        controls.reset();
        return;
      }
      sphere.setFromVector3(
        relative.copy(inspectionCamera.position).sub(controls.target),
      );
      if (action === "left") sphere.theta -= config.inspectAngle;
      if (action === "right") sphere.theta += config.inspectAngle;
      if (action === "up") sphere.phi -= config.inspectAngle;
      if (action === "down") sphere.phi += config.inspectAngle;
      if (action === "closer") sphere.radius /= config.inspectZoom;
      if (action === "farther") sphere.radius *= config.inspectZoom;
      sphere.makeSafe();
      sphere.radius = THREE.MathUtils.clamp(
        sphere.radius,
        controls.minDistance,
        controls.maxDistance,
      );
      inspectionCamera.position.setFromSpherical(sphere).add(controls.target);
      controls.update();
    }
  });
  on(document, "keydown", (event) => {
    if (
      event.key === "Escape" &&
      inspecting &&
      (container.contains(event.target) || event.target === document.body)
    ) {
      inspect(false);
      inspectButton.focus();
    }
  });
  controls.addEventListener("change", draw);

  const sizes = new ResizeObserver(() => {
    if (!frame) frame = requestAnimationFrame(resize);
  });
  sizes.observe(stage);
  const visibility = new IntersectionObserver(
    ([entry]) => {
      onScreen = entry.intersectionRatio >= 0.001;
      if (!onScreen) pointerPresent = false;
      sync();
    },
    { threshold: 0.001 },
  );
  visibility.observe(container);

  loadLeaves()
    .then(async (variants) => {
      if (signal.aborted) return;
      const capacity = Math.ceil(
        Math.max(config.desktopLeaves, config.mobileLeaves) / variants.length,
      );
      for (const variant of variants) {
        const mesh = new THREE.InstancedMesh(
          variant.geometry,
          variant.material,
          capacity,
        );
        mesh.frustumCulled = false;
        mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
        scene.add(mesh);
        const leaves = Array.from({ length: capacity }, () => {
          const leaf = {};
          reset(leaf, true);
          return leaf;
        });
        batches.push({ mesh, leaves });
      }
      const { geometry, material } =
        variants.find((variant) => variant.name === "Leaf_Crimson_Maple") ??
        variants[0];
      const specimen = new THREE.Mesh(geometry, material);
      specimen.rotation.x = Math.PI * 0.34;
      inspectionScene.add(specimen);
      resize();
      await Promise.all([
        renderer.compileAsync(scene, camera),
        renderer.compileAsync(inspectionScene, inspectionCamera),
      ]);
      if (signal.aborted) return;
      ready = true;
      buttons.hidden = false;
      cancelAnimationFrame(frame);
      resize();
    })
    .catch(() => {
      // The landscape remains visible if loading or decoding fails.
      canvas.hidden = true;
    });

  return {
    play() {
      if (signal.aborted) return;
      paused = false;
      sync();
    },
    pause() {
      if (signal.aborted) return;
      paused = true;
      sync();
    },
    destroy() {
      if (signal.aborted) return;
      controller.abort();
      cancelAnimationFrame(frame);
      renderer.setAnimationLoop(null);
      sizes.disconnect();
      visibility.disconnect();
      controls.removeEventListener("change", draw);
      controls.dispose();
      timer.dispose();
      releaseLeaves();
      for (const { mesh } of batches) mesh.dispose();
      scene.clear();
      inspectionScene.clear();
      renderer.dispose();
      canvas.remove();
      buttons.hidden = inspector.hidden = true;
      inspectButton.textContent = "Inspect leaf";
      inspectButton.setAttribute("aria-pressed", "false");
      pauseButton.hidden = false;
      pauseButton.textContent = "Pause animation";
      pauseButton.setAttribute("aria-pressed", "false");
      container.classList.remove("is-inspecting");
    },
  };
}
