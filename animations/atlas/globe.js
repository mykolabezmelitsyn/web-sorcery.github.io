import * as THREE from "three";
import { gsap } from "gsap";
import { buildCountries, oceanName } from "./countries.js";
import {
  earthVertex,
  earthFragment,
  cloudFragment,
  starVertex,
  starFragment,
} from "./shaders.js";

const images = [
  new URL("./assets/earth-day.jpg", import.meta.url).href,
  new URL("./assets/earth_lights_2048.png", import.meta.url).href,
  new URL("./assets/earth_specular_2048.jpg", import.meta.url).href,
  new URL("./assets/earth_clouds_1024.png", import.meta.url).href,
];
const boundaries = new URL("./assets/countries.geojson", import.meta.url).href;
const { clamp, euclideanModulo } = THREE.MathUtils;

export async function loadGlobe(config, signal) {
  const loader = new THREE.TextureLoader();
  const assets = await Promise.allSettled([
    ...images.map((url) => loader.loadAsync(url)),
    fetch(boundaries, { signal }).then((response) => {
      if (!response.ok) throw new Error("Country boundaries could not load.");
      return response.json();
    }),
  ]);
  const textures = assets
    .slice(0, 4)
    .filter((asset) => asset.status === "fulfilled")
    .map((asset) => asset.value);
  if (signal.aborted || assets.some((asset) => asset.status === "rejected")) {
    textures.forEach((texture) => texture.dispose());
    throw new Error("Globe assets could not load.");
  }
  const countries = buildCountries(assets[4].value, ...config.idMap);
  return { textures, countries };
}

export function createGlobe(
  stage,
  { textures, countries },
  config,
  events,
  signal,
) {
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
  } catch (error) {
    textures.forEach((texture) => texture.dispose());
    countries.texture.dispose();
    throw error;
  }
  const canvas = renderer.domElement;
  canvas.setAttribute("role", "img");
  canvas.setAttribute(
    "aria-label",
    "Interactive Earth. Search countries to explore with a keyboard.",
  );
  stage.append(canvas);
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  const [day, night, spec, cloudMap] = textures;
  day.colorSpace = night.colorSpace = THREE.SRGBColorSpace;
  for (const texture of textures) {
    texture.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());
  }

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(config.fov, 1, 0.1, 100);
  const world = new THREE.Group();
  const tilt = new THREE.Group();
  const spin = new THREE.Group();
  scene.add(world);
  world.add(tilt);
  tilt.add(spin);
  tilt.rotation.z = config.axialTilt;
  spin.rotation.y = config.initialYaw;

  const sunDir = { value: new THREE.Vector3(...config.sun).normalize() };
  const uniforms = {
    dayTex: { value: day },
    nightTex: { value: night },
    specTex: { value: spec },
    uIdMap: { value: countries.texture },
    sunDir,
    uHoverId: { value: 0 },
    uHoverPrevId: { value: 0 },
    uHoverMix: { value: 1 },
    uSelectId: { value: 0 },
    uOceanDir: { value: new THREE.Vector3() },
    uOceanActive: { value: 0 },
    uOceanTime: { value: 0 },
  };
  const sphere = new THREE.SphereGeometry(1, 96, 64);
  const earth = new THREE.Mesh(
    sphere,
    new THREE.ShaderMaterial({
      uniforms,
      vertexShader: earthVertex,
      fragmentShader: earthFragment,
    }),
  );
  const clouds = new THREE.Mesh(
    sphere,
    new THREE.ShaderMaterial({
      uniforms: { cloudsTex: { value: cloudMap }, sunDir },
      vertexShader: earthVertex,
      fragmentShader: cloudFragment,
      transparent: true,
      depthWrite: false,
    }),
  );
  clouds.scale.setScalar(1.006);
  spin.add(earth, clouds);

  const stars = new THREE.BufferGeometry();
  const positions = [];
  const sizes = [];
  const phases = [];
  const direction = new THREE.Vector3();
  for (let index = 0; index < config.stars; index++) {
    direction.randomDirection().multiplyScalar(45 + Math.random() * 25);
    positions.push(...direction);
    sizes.push(1.8 + Math.pow(Math.random(), 2.6) * 4.4);
    phases.push(Math.random() * Math.PI * 2);
  }
  stars.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(positions, 3),
  );
  stars.setAttribute("aSize", new THREE.Float32BufferAttribute(sizes, 1));
  stars.setAttribute("aPhase", new THREE.Float32BufferAttribute(phases, 1));
  const sky = new THREE.Points(
    stars,
    new THREE.ShaderMaterial({
      uniforms: { uTime: { value: 0 }, uDpr: { value: 1 } },
      vertexShader: starVertex,
      fragmentShader: starFragment,
      transparent: true,
      depthWrite: false,
    }),
  );
  sky.frustumCulled = false;
  scene.add(sky);

  const motion = matchMedia("(prefers-reduced-motion: reduce)");
  const ray = new THREE.Raycaster();
  const ndc = new THREE.Vector2();
  const local = new THREE.Vector3();
  const unitSphere = new THREE.Sphere(new THREE.Vector3(), 1);
  const localRay = new THREE.Ray();
  const inverse = new THREE.Matrix4();
  let last = 0;
  let frame = 0;
  let visible = true;
  let paused = false;
  let started = false;
  let ocean = false;
  let pointer = null;
  let drag = null;
  let yawVelocity = 0;
  let pitchVelocity = 0;
  let selected = null;
  let flight;
  let glide;
  let intro;
  let mobile;

  const active = () =>
    started && visible && !document.hidden && !signal.aborted;
  const animated = () => active() && !paused && !motion.matches;
  const render = () => {
    if (active()) renderer.render(scene, camera);
  };
  const browseX = () => (mobile ? 0 : config.browseX);
  const panelX = () => {
    if (mobile) return 0;
    const halfWidth =
      camera.position.z *
      Math.tan(THREE.MathUtils.degToRad(config.fov / 2)) *
      camera.aspect;
    return Math.max(config.openX, Math.min(0, 1.12 - halfWidth));
  };
  const stopFlight = () => {
    flight?.kill();
    flight = null;
  };

  function resize() {
    const { clientWidth: width, clientHeight: height } = stage;
    if (!width || !height) return;
    mobile = width < config.breakpoint;
    const dpr = Math.min(devicePixelRatio, config.dpr);
    renderer.setPixelRatio(dpr);
    sky.material.uniforms.uDpr.value = dpr;
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.position.z = Math.max(
      6,
      1 /
        ((mobile ? config.mobileWidth : config.desktopWidth) *
          Math.tan(THREE.MathUtils.degToRad(config.fov / 2)) *
          camera.aspect),
    );
    camera.updateProjectionMatrix();
    camera.updateMatrixWorld();
    glide?.kill();
    world.position.x = selected ? panelX() : browseX();
    render();
  }

  function hitTest(x, y) {
    const bounds = canvas.getBoundingClientRect();
    ndc.set(
      ((x - bounds.left) / bounds.width) * 2 - 1,
      -(((y - bounds.top) / bounds.height) * 2 - 1),
    );
    earth.updateWorldMatrix(true, false);
    ray.setFromCamera(ndc, camera);
    inverse.copy(earth.matrixWorld).invert();
    localRay.copy(ray.ray).applyMatrix4(inverse);
    if (!localRay.intersectSphere(unitSphere, local)) return null;
    const u = euclideanModulo(Math.atan2(local.z, -local.x) / (2 * Math.PI), 1);
    const v = 1 - Math.acos(clamp(local.y, -1, 1)) / Math.PI;
    return {
      country: countries.pick(u, v),
      lon: 360 * u - 180,
      lat: 180 * v - 90,
    };
  }

  function hover(hit) {
    const id = hit?.country?.id ?? 0;
    if (uniforms.uHoverId.value !== id) {
      uniforms.uHoverPrevId.value = uniforms.uHoverId.value;
      uniforms.uHoverId.value = id;
      uniforms.uHoverMix.value = animated() ? 0 : 1;
    }
    ocean = Boolean(hit && !hit.country && pointer);
    if (ocean) uniforms.uOceanDir.value.copy(local);
    if (pointer) {
      const name =
        hit?.country?.name ?? (ocean ? oceanName(hit.lon, hit.lat) : "");
      events.hover(name, ocean, pointer.x, pointer.y);
    } else {
      events.hover("");
    }
    canvas.style.cursor = drag
      ? "grabbing"
      : id
        ? "pointer"
        : hit
          ? "grab"
          : "";
  }

  function tick(time) {
    frame = 0;
    if (!animated()) return;
    const dt = last ? clamp((time - last) / 1000, 0, 0.05) : 0;
    last = time;
    if (!drag && !flight?.isActive()) {
      if (!selected && !intro?.isActive())
        spin.rotation.y += config.autoSpin * dt;
      const decay = Math.pow(config.decay, dt * 60);
      const movement = (1 - decay) / (1 - config.decay);
      spin.rotation.y += yawVelocity * movement;
      tilt.rotation.x = clamp(
        tilt.rotation.x + pitchVelocity * movement,
        -config.pitchLimit,
        config.pitchLimit,
      );
      yawVelocity *= decay;
      pitchVelocity *= decay;
    }
    clouds.rotation.y += dt * config.cloudSpeed;
    sky.material.uniforms.uTime.value += dt;
    if (pointer && !drag) hover(hitTest(pointer.x, pointer.y));
    uniforms.uHoverMix.value = Math.min(1, uniforms.uHoverMix.value + dt * 5);
    uniforms.uOceanActive.value +=
      (Number(ocean) - uniforms.uOceanActive.value) * Math.min(1, dt * 9);
    if (uniforms.uOceanActive.value > 0.001) uniforms.uOceanTime.value += dt;
    render();
    frame = requestAnimationFrame(tick);
  }

  function synchronize() {
    cancelAnimationFrame(frame);
    frame = 0;
    last = 0;
    if (motion.matches) {
      intro?.progress(1);
      flight?.progress(1);
      glide?.progress(1);
    }
    if (animated()) frame = requestAnimationFrame(tick);
    else render();
  }

  function select(country) {
    selected = country;
    pointer = null;
    hover(null);
    yawVelocity = pitchVelocity = 0;
    uniforms.uSelectId.value = country?.id ?? 0;
    stopFlight();
    glide?.kill();

    let yaw = spin.rotation.y;
    let pitch = 0;
    if (country) {
      // Solve roll-adjusted yaw, then pitch, to bring the label point toward the camera.
      const lon = THREE.MathUtils.degToRad(country.lon);
      const lat = THREE.MathUtils.degToRad(country.lat);
      const x = Math.cos(lat) * Math.cos(lon);
      const y = Math.sin(lat);
      const z = -Math.cos(lat) * Math.sin(lon);
      const targetX = clamp(
        y * Math.tan(config.axialTilt),
        -Math.cos(lat),
        Math.cos(lat),
      );
      const targetZ = Math.sqrt(Math.max(0, Math.cos(lat) ** 2 - targetX ** 2));
      const targetYaw = Math.atan2(z, x) - Math.atan2(targetZ, targetX);
      yaw += euclideanModulo(targetYaw - yaw + Math.PI, 2 * Math.PI) - Math.PI;
      pitch = Math.atan2(
        Math.sin(config.axialTilt) * targetX + Math.cos(config.axialTilt) * y,
        targetZ,
      );
    }
    const x = country ? panelX() : browseX();
    if (motion.matches || paused) {
      spin.rotation.y = yaw;
      tilt.rotation.x = pitch;
      world.position.x = x;
      render();
      return;
    }
    const duration = country ? config.flySeconds : config.closeSeconds;
    flight = gsap.timeline({ defaults: { duration, ease: "power3.inOut" } });
    flight.to(spin.rotation, { y: yaw }, 0);
    flight.to(tilt.rotation, { x: pitch }, 0);
    glide = gsap.to(world.position, { x, duration, ease: "power2.inOut" });
  }

  const on = (target, type, handler, options) => {
    target.addEventListener(type, handler, { ...options, signal });
  };
  on(canvas, "pointerdown", (event) => {
    if (drag || event.button !== 0 || !hitTest(event.clientX, event.clientY))
      return;
    pointer = null;
    stopFlight();
    hover(null);
    yawVelocity = pitchVelocity = 0;
    drag = {
      id: event.pointerId,
      x: event.clientX,
      y: event.clientY,
      distance: 0,
      lastMove: 0,
    };
    canvas.setPointerCapture(event.pointerId);
  });
  on(canvas, "pointermove", (event) => {
    if (!drag) {
      if (event.pointerType !== "touch") {
        pointer = { x: event.clientX, y: event.clientY };
        if (!animated()) {
          hover(hitTest(pointer.x, pointer.y));
          render();
        }
      }
      return;
    }
    if (drag.id !== event.pointerId) return;
    const dx = event.clientX - drag.x;
    const dy = event.clientY - drag.y;
    drag.x = event.clientX;
    drag.y = event.clientY;
    drag.distance += Math.hypot(dx, dy);
    drag.lastMove = event.timeStamp;
    if (drag.distance < config.clickDistance) return;
    yawVelocity = dx * config.dragSensitivity;
    pitchVelocity = dy * config.dragSensitivity;
    spin.rotation.y += yawVelocity;
    tilt.rotation.x = clamp(
      tilt.rotation.x + pitchVelocity,
      -config.pitchLimit,
      config.pitchLimit,
    );
    render();
  });
  on(canvas, "pointerup", (event) => {
    if (drag?.id !== event.pointerId) return;
    const clicked = drag.distance < config.clickDistance;
    if (!animated() || event.timeStamp - drag.lastMove > 90)
      yawVelocity = pitchVelocity = 0;
    drag = null;
    const hit = hitTest(event.clientX, event.clientY);
    if (clicked && hit?.country) events.select(hit.country);
  });
  const cancelDrag = (event) => {
    if (drag?.id !== event.pointerId) return;
    drag = null;
    yawVelocity = pitchVelocity = 0;
    hover(null);
  };
  on(canvas, "pointercancel", cancelDrag);
  on(canvas, "lostpointercapture", cancelDrag);
  on(canvas, "pointerleave", () => {
    pointer = null;
    hover(null);
    render();
  });
  on(
    canvas,
    "wheel",
    (event) => {
      if (!hitTest(event.clientX, event.clientY)) return;
      event.preventDefault();
      stopFlight();
      const multiplier = [1, 16, stage.clientHeight][event.deltaMode] ?? 1;
      yawVelocity = clamp(
        yawVelocity + event.deltaY * multiplier * config.wheelSensitivity,
        -0.16,
        0.16,
      );
      if (!animated()) {
        spin.rotation.y += yawVelocity;
        yawVelocity = 0;
        render();
      }
    },
    { passive: false },
  );
  on(document, "visibilitychange", synchronize);
  on(motion, "change", synchronize);
  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(stage);
  const intersectionObserver = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    synchronize();
  });
  intersectionObserver.observe(stage);
  resize();

  return {
    select,
    async start() {
      await renderer.compileAsync(scene, camera);
      if (signal.aborted) return;
      started = true;
      if (!motion.matches && !paused) {
        world.scale.setScalar(0.001);
        intro = gsap.to(world.scale, {
          x: 1,
          y: 1,
          z: 1,
          duration: config.introSeconds,
          ease: "power3.out",
        });
      }
      synchronize();
    },
    setPaused(value) {
      paused = value;
      if (value) {
        intro?.progress(1);
        flight?.progress(1);
        glide?.progress(1);
        yawVelocity = pitchVelocity = 0;
      }
      synchronize();
    },
    destroy() {
      started = false;
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      intro?.kill();
      stopFlight();
      glide?.kill();
      for (const texture of [...textures, countries.texture]) texture.dispose();
      sphere.dispose();
      stars.dispose();
      earth.material.dispose();
      clouds.material.dispose();
      sky.material.dispose();
      countries.texture.image.width = countries.texture.image.height = 0;
      renderer.dispose();
      canvas.remove();
    },
  };
}
