import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.187.0/build/three.module.js';
import { applyThemeMaterials } from './theme-materials.js';
import { createScrollPathMapping } from './scroll-path.js';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.187.0/examples/jsm/loaders/GLTFLoader.js';

export const CONFIG = {
  modelUrl: new URL('./Soldier.glb', import.meta.url).href, // Original model, loaded immediately.
  clipName: 'Idle', // Embedded stationary animation.
  speed: 1, // Playback speed multiplier.
  fieldOfView: 45, // Camera angle in degrees.
  rotation: Math.PI, // Face the viewer.
  pixelRatio: 2, // Maximum rendering pixel ratio.
  lightIntensity: 3, // Neutral key and fill light intensity.
  armorShadow: '#101722', // Deep navy for joints and the visor in both themes.
  themeTokens: { armor: '--color-muted', highlight: '--color-art-glow', accent: '--color-accent' }, // Existing site colors.
  themeFallbacks: {
    // Matching colors for embeds without the site's CSS variables.
    light: { armor: '#5b6980', highlight: '#d6e5ff', accent: '#285bd4' },
    dark: { armor: '#a2b0c7', highlight: '#d6e5ff', accent: '#91b4ff' },
  },
  textureExposure: 2, // Preserve the atlas's value variation in the new palette.
  textureContrast: 0.8, // Balance readable armor plates and dark seams.
  armorRoughness: 0.7, // Restrained sheen on the armor.
  armorMetalness: 0.2, // Slight metallic response on armor plates.
  visorRoughness: 0.3, // Smoother visor surface.
  visorMetalness: 0.3, // Subtle visor reflections.
  visorMaterial: 'Vanguard_VisorMat', // Original GLB material name.
  scrollContainer: null, // Null uses the document; pass an HTMLElement for a custom scroller.
  scrollPathSamples: 2048, // Arc-length lookup resolution, also suitable for curved paths.
  scrollInset: 24, // Keep the canvas stage this many pixels inside the page edges.
  endScale: 4.5, // Uniform model scale at the bottom of the scroller.
  initialModelHeight: 360, // Initial full-body height in CSS pixels.
  initialViewportFraction: 0.55, // Initial model height cap relative to the viewport.
  endFrameHeight: 600, // Reserve enough corner space for the complete opaque body.
  endFrameViewportFraction: 0.8, // Responsive height cap for the final full-body view.
  endFrameAspect: 0.5, // Reserved full-body width relative to its height.
  boundsPadding: 0.035, // Conservative geometry padding relative to model height.
  jumpLabel: 'Jump soldier', // Keyboard/screen-reader action for the model, not the overlay.
  endTurnStart: 0.7, // Begin replacing cursor gaze with the final leftward head turn.
  endHeadYaw: -Math.PI / 3, // Look toward the left side of the page at the bottom.
  jumpHeight: 0.2, // Jump height as a fraction of model height.
  jumpDuration: 0.8, // Takeoff-to-landing duration in seconds.
  headBone: 'mixamorig:Head', // Original model joint to steer.
  neckBone: 'mixamorig:Neck', // Joint sharing a small portion of the look direction.
  headYawLimit: Math.PI / 5, // Maximum left/right head turn, in radians.
  headPitchUp: 0.25, // Maximum upward tilt, in radians.
  headPitchDown: 0.32, // Maximum downward tilt, in radians.
  headResponse: 8, // Frame-rate-independent tracking and return speed.
  headPointerRange: 0.8, // Pointer travel relative to canvas size before reaching the turn limit.
  neckShare: 0.25, // Fraction of the head turn distributed through the neck.
  label:
    'Animated 3D soldier. The head follows the cursor. Hover, tap, or press Enter or Space to jump.', // Accessible interaction help.
  loadingText: 'Loading 3D soldier…', // Loading status.
  errorText: 'The 3D soldier could not load. Please reload to try again.', // Model loading fallback.
  webglText: '3D soldier preview requires WebGL.', // Renderer fallback.
};

function disposeScene(scene) {
  const resources = new Set();
  scene.traverse((object) => {
    if (object.geometry) resources.add(object.geometry);
    if (object.skeleton) resources.add(object.skeleton);
    for (const material of [].concat(object.material || [])) {
      resources.add(material);
      for (const value of Object.values(material)) if (value?.isTexture) resources.add(value);
    }
  });
  resources.forEach((resource) => resource.dispose());
}

export function mountAnimation(container, options = {}) {
  const config = { ...CONFIG, ...options };
  const suppliedCanvas = container instanceof HTMLCanvasElement;
  const canvas = suppliedCanvas ? container : document.createElement('canvas');
  const originalAttributes = [...canvas.attributes].map(({ name, value }) => [name, value]);
  const originalNext = canvas.nextSibling;
  const originalParent = canvas.parentNode;
  const existingStage = canvas.closest('.soldier-stage');
  const stage = existingStage || document.createElement('div');
  const stageAttributes = [...stage.attributes].map(({ name, value }) => [name, value]);
  const stageParent = stage.parentNode,
    stageNext = stage.nextSibling;
  stage.classList.add('soldier-stage');
  Object.assign(stage.style, {
    position: 'fixed',
    inset: '0px',
    width: '100%',
    height: '100%',
    transform: 'none',
    pointerEvents: 'none',
  });
  // Keep the full-page overlay outside ancestors that might clip or transform it.
  document.body.append(stage);
  stage.append(canvas);
  Object.assign(canvas.style, {
    position: 'absolute',
    inset: '0px',
    width: '100%',
    height: '100%',
    transform: 'none',
    pointerEvents: 'none',
  });
  canvas.removeAttribute('tabindex');
  canvas.setAttribute('role', 'img');
  canvas.setAttribute('aria-label', config.label);
  canvas.dataset.state = 'loading';
  const status = document.createElement('p');
  status.className = 'soldier-status';
  status.setAttribute('role', 'status');
  status.textContent = config.loadingText;
  const modelAction = document.createElement('button');
  modelAction.className = 'soldier-model-action';
  modelAction.type = 'button';
  modelAction.setAttribute('aria-label', config.jumpLabel);
  modelAction.hidden = true;
  stage.append(status, modelAction);
  let renderer,
    mixer,
    model,
    size,
    themeMaterials,
    frame = 0,
    last = null;
  let destroyed = false,
    paused = false,
    visible = true;
  let resizeObserver,
    pageObserver,
    contentObserver,
    intersection,
    positionFrame = 0;
  const scrollElement =
    config.scrollContainer || document.scrollingElement || document.documentElement;
  const documentScroll = scrollElement === document.scrollingElement;
  const scrollTarget = documentScroll ? window : scrollElement;
  let scrollMapping, scrollGeometryKey;
  const pathPoint = new THREE.Vector3();
  const scene = new THREE.Scene();
  const presentationRoot = new THREE.Group();
  const jumpRoot = new THREE.Group();
  presentationRoot.add(jumpRoot);
  scene.add(presentationRoot);
  let scrollProgress = 0,
    cameraDistance = 0,
    baseCameraDistance = 0;
  let pathOffsetX = 0,
    pathOffsetY = 0,
    viewportWidth = 1,
    viewportHeight = 1;
  const fullBounds = new THREE.Box3();
  const frameBounds = new THREE.Box3();
  const frameSize = new THREE.Vector3(),
    frameCenter = new THREE.Vector3();
  const cornerPoint = new THREE.Vector3();
  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();
  let hovered = false,
    jumping = false,
    jumpElapsed = 0;
  let lookActive = false,
    cursorX = 0,
    cursorY = 0,
    lookYaw = 0,
    lookPitch = 0;
  let head, neck;
  const lookJoints = [];
  const headPoint = new THREE.Vector3();
  const parentRotation = new THREE.Quaternion();
  const worldRotation = new THREE.Quaternion();
  const lookRotation = new THREE.Quaternion();
  const lookEuler = new THREE.Euler(0, 0, 0, 'YXZ');
  const camera = new THREE.PerspectiveCamera(config.fieldOfView, 1, 0.1, 100);
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const draw = () => {
    if (!destroyed && model && visible && !document.hidden) renderer.render(scene, camera);
  };

  function destroy() {
    if (destroyed) return;
    destroyed = true;
    renderer?.setAnimationLoop(null);
    cancelAnimationFrame(frame);
    cancelAnimationFrame(positionFrame);
    resizeObserver?.disconnect();
    pageObserver?.disconnect();
    contentObserver?.disconnect();
    scrollTarget.removeEventListener('scroll', schedulePosition);
    scrollTarget.removeEventListener('load', schedulePosition, true);
    document.fonts?.removeEventListener('loadingdone', schedulePosition);
    window.removeEventListener('resize', schedulePosition);
    intersection?.disconnect();
    document.removeEventListener('visibilitychange', sync);
    reduced.removeEventListener('change', sync);
    document.removeEventListener('pointermove', hover);
    document.removeEventListener('pointerdown', tap, true);
    document.removeEventListener('pointerout', leave);
    modelAction.removeEventListener('keydown', keydown);
    modelAction.removeEventListener('click', jump);
    document.removeEventListener('click', clickModel, true);
    window.removeEventListener('blur', resetLookTarget);
    themeMaterials?.destroy();
    if (mixer) {
      mixer.stopAllAction();
      mixer.uncacheRoot(model);
    }
    disposeScene(scene);
    renderer?.clear();
    renderer?.dispose();
    if (suppliedCanvas) {
      if (originalNext?.parentNode === originalParent)
        originalParent.insertBefore(canvas, originalNext);
      else originalParent.append(canvas);
      for (const { name } of [...canvas.attributes]) canvas.removeAttribute(name);
      for (const [name, value] of originalAttributes) canvas.setAttribute(name, value);
    }
    status.remove();
    modelAction.remove();
    if (existingStage) {
      for (const { name } of [...stage.attributes]) stage.removeAttribute(name);
      for (const [name, value] of stageAttributes) stage.setAttribute(name, value);
      if (stageNext?.parentNode === stageParent) stageParent.insertBefore(stage, stageNext);
      else stageParent?.append(stage);
    } else stage.remove();
  }
  const api = {
    play() {
      if (!destroyed) {
        paused = false;
        sync();
      }
    },
    pause() {
      if (!destroyed) {
        paused = true;
        sync();
      }
    },
    destroy,
  };
  try {
    renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
  } catch {
    canvas.dataset.state = 'error';
    status.textContent = config.webglText;
    return api;
  }
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.setPixelRatio(Math.min(devicePixelRatio, config.pixelRatio));
  scene.add(new THREE.HemisphereLight(0xffffff, 0x687080, config.lightIntensity));
  const light = new THREE.DirectionalLight(0xffffff, config.lightIntensity);
  light.position.set(3, 5, 4);
  scene.add(light);
  function updateScrollPosition() {
    positionFrame = 0;
    if (destroyed) return;
    const { width, height } = canvas.getBoundingClientRect();
    const endFrameHeight = Math.min(
      config.endFrameHeight,
      height * config.endFrameViewportFraction,
    );
    const endFrameWidth = Math.min(
      endFrameHeight * config.endFrameAspect,
      width - 2 * config.scrollInset,
    );
    const availableX = Math.max(0, (width - endFrameWidth) / 2 - config.scrollInset);
    const availableY = Math.max(0, (height - endFrameHeight) / 2 - config.scrollInset);
    const range = Math.max(0, scrollElement.scrollHeight - scrollElement.clientHeight);
    const key = [availableX, availableY, range].join(':');
    const geometryChanged = key !== scrollGeometryKey;
    if (geometryChanged) {
      const curve = new THREE.LineCurve3(
        new THREE.Vector3(),
        new THREE.Vector3(availableX, availableY, 0),
      );
      scrollMapping = createScrollPathMapping(curve, range, config.scrollPathSamples);
      scrollGeometryKey = key;
    }
    // Full scroll range, no easing, fixed duration, or early corner clamp.
    // Each scroll pixel is one scaled path unit; CSS projection preserves the existing endpoints.
    const position = scrollMapping.sample(reduced.matches ? 0 : scrollElement.scrollTop, pathPoint);
    const changed =
      geometryChanged ||
      position.progress !== scrollProgress ||
      position.x !== pathOffsetX ||
      position.y !== pathOffsetY;
    pathOffsetX = position.x;
    pathOffsetY = position.y;
    scrollProgress = position.progress;
    updatePresentation();
    if (changed && (paused || reduced.matches)) draw();
  }
  function endTurnWeight() {
    return THREE.MathUtils.clamp(
      (scrollProgress - config.endTurnStart) / (1 - config.endTurnStart),
      0,
      1,
    );
  }
  function updatePresentation() {
    if (!size || !baseCameraDistance) return;
    const progress = reduced.matches ? 0 : scrollProgress;
    const scale = THREE.MathUtils.lerp(1, config.endScale, progress);
    // Keep full-body fitting active at every scroll position; the body never dissolves.
    frameBounds.copy(fullBounds);
    const jumpMargin = size.y * config.jumpHeight * (1 - endTurnWeight());
    frameBounds.min.y -= jumpMargin;
    frameBounds.max.y += jumpMargin;
    frameBounds.getSize(frameSize).multiplyScalar(scale);
    frameBounds.getCenter(frameCenter).multiplyScalar(scale);
    const padding = size.y * config.boundsPadding * scale;
    frameSize.addScalar(padding * 2);
    const nx = (pathOffsetX * 2) / viewportWidth;
    const ny = (-pathOffsetY * 2) / viewportHeight;
    const safeX = Math.max(0.05, 1 - (2 * config.scrollInset) / viewportWidth);
    const safeY = Math.max(0.05, 1 - (2 * config.scrollInset) / viewportHeight);
    const tangent = Math.tan(THREE.MathUtils.degToRad(config.fieldOfView / 2));
    // Fit the visible geometry around its scroll anchor, including perspective depth.
    // This prevents viewport clipping while the real rig grows inside the full-page canvas.
    const fitX =
      frameSize.z / 2 +
      frameSize.x / (2 * tangent * camera.aspect * Math.max(0.01, safeX - Math.abs(nx)));
    const fitY =
      frameSize.z / 2 + frameSize.y / (2 * tangent * Math.max(0.01, safeY - Math.abs(ny)));
    cameraDistance = Math.max(baseCameraDistance, fitX, fitY);
    camera.position.set(0, 0, cameraDistance);
    // Shift the projection's principal point for the scroll anchor. This keeps the
    // corner model fully visible without off-axis perspective inflating its safety bounds.
    camera.setViewOffset(
      viewportWidth,
      viewportHeight,
      -pathOffsetX,
      -pathOffsetY,
      viewportWidth,
      viewportHeight,
    );
    camera.updateMatrixWorld(true);
    presentationRoot.scale.setScalar(scale);
    presentationRoot.position.copy(frameCenter).multiplyScalar(-1);
    presentationRoot.updateWorldMatrix(true, true);
    // A keyboard focus target follows model bounds; the full-page canvas never takes focus.
    let minX = Infinity,
      minY = Infinity,
      maxX = -Infinity,
      maxY = -Infinity;
    for (let corner = 0; corner < 8; corner++) {
      cornerPoint.set(
        corner & 1 ? frameBounds.max.x : frameBounds.min.x,
        corner & 2 ? frameBounds.max.y : frameBounds.min.y,
        corner & 4 ? frameBounds.max.z : frameBounds.min.z,
      );
      cornerPoint.applyMatrix4(presentationRoot.matrixWorld).project(camera);
      const x = ((cornerPoint.x + 1) * viewportWidth) / 2,
        y = ((1 - cornerPoint.y) * viewportHeight) / 2;
      minX = Math.min(minX, x);
      minY = Math.min(minY, y);
      maxX = Math.max(maxX, x);
      maxY = Math.max(maxY, y);
    }
    modelAction.style.transform = `translate3d(${minX}px,${minY}px,0)`;
    modelAction.style.width = `${maxX - minX}px`;
    modelAction.style.height = `${maxY - minY}px`;
  }
  function schedulePosition() {
    if (!destroyed && !positionFrame) positionFrame = requestAnimationFrame(updateScrollPosition);
  }
  function resize() {
    frame = 0;
    if (destroyed) return;
    const { width, height } = canvas.getBoundingClientRect();
    if (!width || !height) return;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height, false);
    viewportWidth = width;
    viewportHeight = height;
    if (size) {
      const tangent = Math.tan(THREE.MathUtils.degToRad(config.fieldOfView / 2));
      const pixels = Math.min(config.initialModelHeight, height * config.initialViewportFraction);
      baseCameraDistance = (size.y * height) / (2 * tangent * Math.max(1, pixels)) + size.z / 2;
      camera.position.set(0, 0, baseCameraDistance);
      camera.lookAt(0, 0, 0);
    }
    updateScrollPosition();
    draw();
  }
  function sync() {
    if (destroyed || !renderer) return;
    schedulePosition();
    if (document.hidden) lookActive = false;
    if (reduced.matches) {
      land();
      restoreLookPose();
      lookYaw = lookPitch = 0;
      lookActive = false;
    }
    const running =
      (!!mixer || jumping || !!head) && !paused && !reduced.matches && visible && !document.hidden;
    last = null;
    renderer.setAnimationLoop(
      running
        ? (time) => {
            // Recheck at frame boundaries as well as media/visibility events.
            if (reduced.matches || document.hidden || !visible || paused) {
              sync();
              return;
            }
            const delta = last === null ? 0 : Math.min((time - last) / 1000, 0.1);
            // Restore last frame's offsets before sampling Idle to prevent rotation accumulation.
            restoreLookPose();
            mixer?.update(delta * config.speed);
            if (jumping) {
              jumpElapsed += delta;
              const progress = Math.min(jumpElapsed / config.jumpDuration, 1);
              // A parabolic arc lifts the whole rig and lands exactly at its original position.
              jumpRoot.position.y =
                size.y * config.jumpHeight * 4 * progress * (1 - progress) * (1 - endTurnWeight());
              if (progress === 1) {
                land();
                if (!mixer) sync();
              }
            }
            updatePresentation();
            updateHeadLook(delta);
            updatePresentation();
            last = time;
            draw();
          }
        : null,
    );
    draw();
  }
  function restoreLookPose() {
    for (const joint of lookJoints) joint.bone.quaternion.copy(joint.base);
  }
  function resetLookTarget() {
    lookActive = false;
  }
  function updateHeadLook(delta) {
    if (!head || reduced.matches) return;
    // Sample the animated local poses; the look offset is layered on top of Idle.
    for (const joint of lookJoints) joint.base.copy(joint.bone.quaternion);
    model.updateWorldMatrix(true, true);
    camera.updateMatrixWorld(true);
    head.getWorldPosition(headPoint).project(camera);
    const rect = canvas.getBoundingClientRect();
    const headX = rect.left + ((headPoint.x + 1) * rect.width) / 2;
    const headY = rect.top + ((1 - headPoint.y) * rect.height) / 2;
    const x = lookActive
      ? THREE.MathUtils.clamp((cursorX - headX) / (rect.width * config.headPointerRange), -1, 1)
      : 0;
    const y = lookActive
      ? THREE.MathUtils.clamp((cursorY - headY) / (rect.height * config.headPointerRange), -1, 1)
      : 0;
    const targetYaw = x * config.headYawLimit;
    const targetPitch = y * (y < 0 ? config.headPitchUp : config.headPitchDown);
    const blend = 1 - Math.exp(-config.headResponse * delta);
    lookYaw = THREE.MathUtils.lerp(lookYaw, targetYaw, blend);
    lookPitch = THREE.MathUtils.lerp(lookPitch, targetPitch, blend);
    const finalTurn = endTurnWeight();
    const yaw = THREE.MathUtils.lerp(lookYaw, config.endHeadYaw, finalTurn);
    const pitch = THREE.MathUtils.lerp(lookPitch, 0, finalTurn);
    // Use screen-aligned world axes: the GLB's local bone axes are not Y-up.
    for (const joint of lookJoints) {
      const share = joint.bone === neck ? config.neckShare : neck ? 1 - config.neckShare : 1;
      lookEuler.set(pitch * share, yaw * share, 0, 'YXZ');
      lookRotation.setFromEuler(lookEuler);
      joint.bone.getWorldQuaternion(worldRotation);
      joint.bone.parent.getWorldQuaternion(parentRotation).invert();
      joint.bone.quaternion.copy(parentRotation.multiply(lookRotation).multiply(worldRotation));
      joint.bone.updateWorldMatrix(false, true);
    }
  }
  function land() {
    jumping = false;
    jumpElapsed = 0;
    jumpRoot.position.y = 0;
    if (model) canvas.dataset.state = 'ready';
  }
  function jump() {
    if (
      !model ||
      jumping ||
      paused ||
      reduced.matches ||
      !visible ||
      document.hidden ||
      destroyed ||
      endTurnWeight() === 1
    )
      return;
    jumping = true;
    jumpElapsed = 0;
    canvas.dataset.state = 'jumping';
    sync();
  }
  function hitsModel(event) {
    if (
      !model ||
      destroyed ||
      !visible ||
      stage.hidden ||
      getComputedStyle(stage).visibility === 'hidden'
    )
      return false;
    const target = modelAction.getBoundingClientRect();
    if (
      event.clientX < target.left - 8 ||
      event.clientX > target.right + 8 ||
      event.clientY < target.top - 8 ||
      event.clientY > target.bottom + 8
    )
      return false;
    const rect = canvas.getBoundingClientRect();
    if (
      !rect.width ||
      !rect.height ||
      event.clientX < rect.left ||
      event.clientX > rect.right ||
      event.clientY < rect.top ||
      event.clientY > rect.bottom
    )
      return false;
    pointer.set(
      ((event.clientX - rect.left) / rect.width) * 2 - 1,
      (-(event.clientY - rect.top) / rect.height) * 2 + 1,
    );
    scene.updateMatrixWorld(true);
    camera.updateMatrixWorld(true);
    raycaster.setFromCamera(pointer, camera);
    return raycaster.intersectObject(model, true).length > 0;
  }
  function hover(event) {
    if (event.pointerType === 'touch') return;
    cursorX = event.clientX;
    cursorY = event.clientY;
    lookActive = true;
    const over = hitsModel(event);
    if (over && !hovered) jump();
    hovered = over;
  }
  function tap(event) {
    if (!hitsModel(event)) return;
    if (event.cancelable) event.preventDefault();
    event.stopPropagation();
    jump();
  }
  function clickModel(event) {
    if (event.target === modelAction || !hitsModel(event)) return;
    event.preventDefault();
    event.stopPropagation();
  }
  function leave(event) {
    if (!event.relatedTarget) {
      hovered = false;
      resetLookTarget();
    }
  }
  function keydown(event) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      if (!event.repeat) jump();
    }
  }
  document.addEventListener('pointermove', hover, { passive: true });
  document.addEventListener('pointerdown', tap, { capture: true });
  document.addEventListener('click', clickModel, { capture: true });
  document.addEventListener('pointerout', leave, { passive: true });
  modelAction.addEventListener('keydown', keydown);
  modelAction.addEventListener('click', jump);
  window.addEventListener('blur', resetLookTarget);
  resizeObserver = new ResizeObserver(() => {
    if (!frame) frame = requestAnimationFrame(resize);
  });
  resizeObserver.observe(canvas);
  pageObserver = new ResizeObserver(schedulePosition);
  pageObserver.observe(document.documentElement);
  pageObserver.observe(document.body);
  pageObserver.observe(scrollElement);
  contentObserver = new MutationObserver((records) => {
    // Ignore our own transform/status writes, preventing an observer feedback loop.
    if (
      records.some(
        (record) =>
          !(record.target.nodeType === 1 ? record.target : record.target.parentElement)?.closest(
            '.soldier-stage',
          ),
      )
    )
      schedulePosition();
  });
  contentObserver.observe(documentScroll ? document.body : scrollElement, {
    subtree: true,
    childList: true,
    characterData: true,
    attributes: true,
    attributeFilter: ['style', 'class', 'hidden', 'open'],
  });
  scrollTarget.addEventListener('scroll', schedulePosition, { passive: true });
  scrollTarget.addEventListener('load', schedulePosition, true);
  document.fonts?.addEventListener('loadingdone', schedulePosition);
  window.addEventListener('resize', schedulePosition, { passive: true });
  intersection = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    sync();
  });
  intersection.observe(stage);
  document.addEventListener('visibilitychange', sync);
  reduced.addEventListener('change', sync);
  resize();
  // Start loading immediately; Idle, cursor tracking and scroll placement remain independent.
  new GLTFLoader().load(
    config.modelUrl,
    (gltf) => {
      if (destroyed) {
        disposeScene(gltf.scene);
        return;
      }
      model = gltf.scene;
      model.rotation.y = config.rotation;
      jumpRoot.add(model);
      model.traverse((node) => {
        if (!node.isBone) return;
        const name = node.name.replace(/:/g, '');
        if (name === config.headBone.replace(/:/g, '')) head = node;
        if (name === config.neckBone.replace(/:/g, '')) neck = node;
      });
      for (const bone of [neck, head])
        if (bone) lookJoints.push({ bone, base: bone.quaternion.clone() });
      const clip = THREE.AnimationClip.findByName(gltf.animations, config.clipName);
      if (clip) {
        mixer = new THREE.AnimationMixer(model);
        mixer.clipAction(clip).play();
        mixer.update(0);
      }
      for (const joint of lookJoints) joint.base.copy(joint.bone.quaternion);
      model.updateMatrixWorld(true);
      const bounds = new THREE.Box3().setFromObject(model, true);
      size = bounds.getSize(new THREE.Vector3());
      model.position.sub(bounds.getCenter(new THREE.Vector3()));
      model.updateWorldMatrix(true, true);
      fullBounds.copy(bounds).translate(model.position);
      themeMaterials = applyThemeMaterials(model, config, draw);
      modelAction.hidden = false;
      status.hidden = true;
      canvas.dataset.state = 'ready';
      resize();
      sync();
    },
    undefined,
    () => {
      if (!destroyed) {
        canvas.dataset.state = 'error';
        status.textContent = config.errorText;
      }
    },
  );
  return api;
}

const canvas = document.querySelector('#webgl-soldier');
if (canvas) mountAnimation(canvas);
