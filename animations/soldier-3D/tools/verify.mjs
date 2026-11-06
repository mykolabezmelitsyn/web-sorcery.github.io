import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
process.on('uncaughtException', (error) => {
  console.error(
    error.code || error.name,
    error.stack
      .split('\n')
      .filter((line) => line.trim().startsWith('at '))
      .join('\n'),
  );
  process.exit(1);
});
const out = new URL('../checks/', import.meta.url);
const tabs = await (await fetch('http://localhost:9223/json')).json();
const socket = new WebSocket(tabs.find((t) => t.type === 'page').webSocketDebuggerUrl);
await new Promise((resolve) => socket.addEventListener('open', resolve, { once: true }));
let serial = 0;
const pending = new Map(),
  errors = [],
  warnings = [];
socket.addEventListener('message', ({ data }) => {
  const message = JSON.parse(data);
  if (message.id) {
    const item = pending.get(message.id);
    pending.delete(message.id);
    if (message.error) item.reject(new Error(JSON.stringify(message.error)));
    else item.resolve(message.result);
  }
  if (message.method === 'Runtime.exceptionThrown')
    errors.push(
      message.params.exceptionDetails.text +
        ': ' +
        (message.params.exceptionDetails.exception?.description || ''),
    );
  if (
    message.method === 'Runtime.consoleAPICalled' &&
    ['error', 'warning'].includes(message.params.type)
  ) {
    (message.params.type === 'error' ? errors : warnings).push(
      message.params.args.map((a) => a.value || a.description).join(' '),
    );
  }
});
const send = (method, params = {}) =>
  new Promise((resolve, reject) => {
    const id = ++serial;
    pending.set(id, { resolve, reject });
    socket.send(JSON.stringify({ id, method, params }));
  });
const evaluate = async (expression) => {
  const result = await send('Runtime.evaluate', {
    expression,
    awaitPromise: true,
    returnByValue: true,
  });
  if (result.exceptionDetails)
    throw new Error(result.exceptionDetails.exception?.description || result.exceptionDetails.text);
  return result.result.value;
};
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
async function waitFor(expression) {
  for (let i = 0; i < 600; i++) {
    if (await evaluate(expression)) return;
    await delay(30);
  }
  throw new Error('Timed out waiting for ' + expression);
}
async function screenshot(name, clip) {
  const { data } = await send('Page.captureScreenshot', {
    format: 'png',
    ...(clip ? { clip: { ...clip, scale: 1 } } : {}),
  });
  if (name) await fs.writeFile(new URL(name + '.png', out), Buffer.from(data, 'base64'));
  return data;
}
await send('Runtime.enable');
await send('Page.enable');
await send('Page.addScriptToEvaluateOnNewDocument', {
  source: `
    window.checkMetrics = { draws: 0, longTasks: [] };
    const draw = WebGL2RenderingContext.prototype.drawElements;
    WebGL2RenderingContext.prototype.drawElements = function (...args) {
      checkMetrics.draws++;
      return draw.apply(this, args);
    };
    new PerformanceObserver((list) =>
      checkMetrics.longTasks.push(
        ...list.getEntries().map((e) => ({ start: e.startTime, duration: e.duration })),
      ),
    ).observe({ type: 'longtask', buffered: true });
  `,
});
const results = { checks: [], errors, warnings };
const record = (name, details = {}) => {
  results.checks.push({ name, passed: true, ...details });
  console.log(name + ': passed');
};
async function mountFixture(custom = false, existing = false) {
  await evaluate(`
    (async () => {
      window.originalStage = document.querySelector('.soldier-stage');
      originalStage.remove();
      window.T = await import('https://cdn.jsdelivr.net/npm/three@0.187.0/build/three.module.js');
      const { GLTFLoader } = await import(
        'https://cdn.jsdelivr.net/npm/three@0.187.0/examples/jsm/loaders/GLTFLoader.js'
      );
      const load = GLTFLoader.prototype.load,
        projection = T.PerspectiveCamera.prototype.updateProjectionMatrix;
      GLTFLoader.prototype.load = function (url, onLoad, ...args) {
        return load.call(
          this,
          url,
          (gltf) => {
            window.testModel = gltf.scene;
            onLoad(gltf);
          },
          ...args,
        );
      };
      T.PerspectiveCamera.prototype.updateProjectionMatrix = function () {
        window.testCamera = this;
        return projection.call(this);
      };
      window.fixtureCanvas = document.createElement('canvas');
      fixtureCanvas.id = 'fixture';
      window.stageMarker = document.createElement('span');
      stageMarker.hidden = true;
      document.body.append(stageMarker);
      ${
        existing
          ? `
            window.existingStage = document.createElement('div');
            existingStage.className = 'soldier-stage';
            existingStage.dataset.preserved = 'yes';
            existingStage.style.cssText = 'width:100px;height:100px;transform:translate(30px,20px)';
            existingStage.append(fixtureCanvas);
            document.body.insertBefore(existingStage, stageMarker);
          `
          : `
            document.body.insertBefore(fixtureCanvas, stageMarker);
          `
      }
      window.originalCanvasHTML = fixtureCanvas.outerHTML;
      ${
        custom
          ? `
            window.testScroller = document.createElement('div');
            testScroller.style.cssText = 'position:fixed;left:0;top:0;width:100px;height:100px;overflow:auto';
            const content = document.createElement('div');
            content.style.height = '1100px';
            testScroller.append(content);
            document.body.append(testScroller);
          `
          : ''
      }
      const { mountAnimation } = await import('http://localhost:8080/animations/soldier-3D/soldier.js');
      window.fixture = mountAnimation(fixtureCanvas, {
        speed: 0,
        scrollContainer: ${custom ? 'testScroller' : 'null'},
      });
      GLTFLoader.prototype.load = load;
      T.PerspectiveCamera.prototype.updateProjectionMatrix = projection;
      window.modelBounds = () => {
        testModel.updateWorldMatrix(true, true);
        testCamera.updateMatrixWorld(true);
        let minX = Infinity,
          minY = Infinity,
          maxX = -Infinity,
          maxY = -Infinity,
          count = 0,
          total = 0;
        testModel.traverse((mesh) => {
          if (!mesh.isSkinnedMesh) return;
          if (mesh.material.alphaHash || mesh.material.transparent || mesh.material.opacity !== 1)
            throw new Error('Body/visor must remain fully opaque');
          for (let i = 0; i < mesh.geometry.getAttribute('position').count; i++) {
            total++;
            const point = mesh
              .getVertexPosition(i, new T.Vector3())
              .applyMatrix4(mesh.matrixWorld)
              .project(testCamera);
            const x = ((point.x + 1) * innerWidth) / 2,
              y = ((1 - point.y) * innerHeight) / 2;
            minX = Math.min(minX, x);
            maxX = Math.max(maxX, x);
            minY = Math.min(minY, y);
            maxY = Math.max(maxY, y);
            count++;
          }
        });
        return {
          minX,
          minY,
          maxX,
          maxY,
          count,
          total,
          scale: testModel.parent.parent.scale.x,
          aspect: testCamera.aspect,
        };
      };
      window.bonePoint = (name) => {
        let bone;
        testModel.traverse((n) => {
          if (n.name.replace(/:/g, '') === 'mixamorig' + name) bone = n;
        });
        const point = bone.getWorldPosition(new T.Vector3()).project(testCamera);
        return { x: ((point.x + 1) * innerWidth) / 2, y: ((1 - point.y) * innerHeight) / 2 };
      };
    })();
  `);
  await waitFor(`
    document.querySelector('#fixture')?.dataset.state === 'ready';
  `);
  await delay(150);
}
function assertInside(bounds, width, height) {
  assert(bounds.count > 0);
  assert.equal(bounds.count, bounds.total);
  assert(
    bounds.minX >= -1 && bounds.minY >= -1 && bounds.maxX <= width + 1 && bounds.maxY <= height + 1,
    JSON.stringify(bounds),
  );
  assert(Math.abs(bounds.aspect - width / height) < 1e-8);
}
for (const [name, width, height] of [
  ['mobile', 375, 667],
  ['tablet', 768, 1024],
  ['desktop', 1440, 900],
]) {
  await send('Emulation.setDeviceMetricsOverride', {
    width,
    height,
    deviceScaleFactor: 1,
    mobile: false,
  });
  await send('Emulation.setEmulatedMedia', { features: [] });
  await send('Page.navigate', { url: 'http://localhost:8080/gsap-animations.html' });
  await waitFor(`
    document.querySelector('#webgl-soldier')?.dataset.state === 'ready';
  `);
  await evaluate(`
    window.scrollTo(0, 0);
  `);
  await delay(300);
  const overlay = await evaluate(
    `
      (() => {
        const canvas = document.querySelector('#webgl-soldier'),
          stage = canvas.closest('.soldier-stage'),
          r = canvas.getBoundingClientRect();
        return {
          x: r.x,
          y: r.y,
          width: r.width,
          height: r.height,
          parent: stage.parentElement.tagName,
          insidePortfolio: !!stage.closest('.portfolio__content'),
          canvasEvents: getComputedStyle(canvas).pointerEvents,
          stageEvents: getComputedStyle(stage).pointerEvents,
          tabIndex: canvas.tabIndex,
        };
      })();
    `,
  );
  assert.equal(overlay.x, 0);
  assert.equal(overlay.y, 0);
  assert.equal(overlay.width, width);
  assert.equal(overlay.height, height);
  assert.equal(overlay.parent, 'BODY');
  assert.equal(overlay.insidePortfolio, false);
  assert.equal(overlay.canvasEvents, 'none');
  assert.equal(overlay.stageEvents, 'none');
  assert.equal(overlay.tabIndex, -1);
  await mountFixture();
  const samples = [];
  for (const fraction of [0, 0.25, 0.5, 0.7, 0.8, 0.9, 1, 0.5, 0]) {
    await evaluate(
      `
        window.scrollTo(
          0,
          (document.scrollingElement.scrollHeight - document.scrollingElement.clientHeight) *
            ${fraction},
        );
      `,
    );
    await delay(180);
    const bounds = await evaluate(`
      modelBounds();
    `);
    assertInside(bounds, width, height);
    samples.push({ fraction, ...bounds });
    const rect = await evaluate(
      `
        (() => {
          const r = fixtureCanvas.getBoundingClientRect();
          return { x: r.x, y: r.y, width: r.width, height: r.height };
        })();
      `,
    );
    assert.deepEqual(rect, { x: 0, y: 0, width, height });
    if (fraction === 0 && samples.length === 1) await screenshot(name);
    if (fraction === 0.5 && samples.length === 3) await screenshot('scroll-middle-' + name);
    if (fraction === 1) await screenshot('scroll-corner-' + name);
  }
  await send('Emulation.setEmulatedMedia', {
    features: [{ name: 'prefers-reduced-motion', value: 'reduce' }],
  });
  await evaluate(`
    window.scrollTo(0, document.scrollingElement.scrollHeight);
  `);
  await delay(350);
  assert.equal(
    await evaluate(`
    modelBounds().scale;
  `),
    1,
  );
  const still = await evaluate(`
    checkMetrics.draws;
  `);
  await delay(250);
  assert.equal(
    await evaluate(`
    checkMetrics.draws;
  `),
    still,
  );
  await send('Emulation.setEmulatedMedia', { features: [] });
  await evaluate(
    `
      fixture.destroy();
      fixtureCanvas.remove();
      stageMarker.remove();
      document.body.append(originalStage);
    `,
  );
  record(name + ' full-page canvas, opaque full body and unclipped geometry throughout scroll', {
    overlay,
    samples,
  });
}
// Test a specific scroll container, host-owned stage preservation and model-only interaction.
await send('Page.navigate', { url: 'http://localhost:8080/animations/soldier-3D/index.html' });
await waitFor(`
  document.querySelector('#webgl-soldier')?.dataset.state === 'ready';
`);
await mountFixture(true, true);
await evaluate(`
  testScroller.scrollTop = 500;
`);
await delay(150);
assert(
  Math.abs(
    (await evaluate(`
  modelBounds().scale;
`)) - 2.75,
  ) < 1e-6,
);
await evaluate(`
  testScroller.firstElementChild.style.height = '2100px';
`);
await delay(180);
assert(
  Math.abs(
    (await evaluate(`
  modelBounds().scale;
`)) - 1.875,
  ) < 1e-6,
);
await send('Emulation.setDeviceMetricsOverride', {
  width: 1024,
  height: 768,
  deviceScaleFactor: 1,
  mobile: false,
});
await delay(250);
assertInside(
  await evaluate(`
  modelBounds();
`),
  1024,
  768,
);
await send('Emulation.setDeviceMetricsOverride', {
  width: 1440,
  height: 900,
  deviceScaleFactor: 1,
  mobile: false,
});
await evaluate(`
  testScroller.scrollTop = 0;
`);
await delay(200);
record('custom scroll range, content-height changes and live resize');
await evaluate(
  `
    window.backgroundClicks = 0;
    window.backgroundButton = document.createElement('button');
    backgroundButton.textContent = 'Background action';
    backgroundButton.style.cssText =
      'position:fixed;left:20px;top:20px;width:100px;height:40px;z-index:1';
    backgroundButton.addEventListener('click', () => backgroundClicks++);
    document.body.append(backgroundButton);
  `,
);
assert(
  await evaluate(`
  document.elementFromPoint(30, 30) === backgroundButton;
`),
);
await send('Input.dispatchMouseEvent', { type: 'mouseMoved', x: 30, y: 30 });
await send('Input.dispatchMouseEvent', {
  type: 'mousePressed',
  x: 30,
  y: 30,
  button: 'left',
  clickCount: 1,
});
await send('Input.dispatchMouseEvent', {
  type: 'mouseReleased',
  x: 30,
  y: 30,
  button: 'left',
  clickCount: 1,
});
assert.equal(
  await evaluate(`
  backgroundClicks;
`),
  1,
);
assert.equal(
  await evaluate(`
  fixtureCanvas.dataset.state;
`),
  'ready',
);
const chest = await evaluate(`
  bonePoint('Spine2');
`);
await send('Input.dispatchMouseEvent', { type: 'mouseMoved', ...chest });
await waitFor(`
  fixtureCanvas.dataset.state === 'jumping';
`);
await delay(200);
assert(
  (await evaluate(`
  testModel.parent.position.y;
`)) > 0,
);
assertInside(
  await evaluate(`
  modelBounds();
`),
  1440,
  900,
);
await waitFor(`
  fixtureCanvas.dataset.state === 'ready';
`);
await evaluate(
  `
    window.underModelClicks = 0;
    window.underModel = document.createElement('button');
    underModel.textContent = 'Behind model';
    underModel.style.cssText =
      'position:fixed;left:${chest.x - 30}px;top:${chest.y - 30}px;width:60px;height:60px;z-index:1';
    underModel.addEventListener('click', () => underModelClicks++);
    document.body.append(underModel);
  `,
);
await send('Input.dispatchMouseEvent', {
  type: 'mousePressed',
  ...chest,
  button: 'left',
  clickCount: 1,
});
await send('Input.dispatchMouseEvent', {
  type: 'mouseReleased',
  ...chest,
  button: 'left',
  clickCount: 1,
});
assert.equal(
  await evaluate(`
  underModelClicks;
`),
  0,
);
await waitFor(`
  fixtureCanvas.dataset.state === 'ready';
`);
await evaluate(`
  document.querySelector('.soldier-model-action').focus();
`);
await send('Input.dispatchKeyEvent', { type: 'keyDown', key: 'Enter', code: 'Enter' });
await waitFor(`
  fixtureCanvas.dataset.state === 'jumping';
`);
await send('Input.dispatchKeyEvent', { type: 'keyUp', key: 'Enter', code: 'Enter' });
await waitFor(`
  fixtureCanvas.dataset.state === 'ready';
`);
await evaluate(`
  backgroundButton.remove();
  underModel.remove();
`);
record(
  'background clicks pass through, mesh hover/click/keyboard jump work, and clicks on the model do not activate links behind it',
);
// Check head direction on the frozen Idle baseline.
await evaluate(
  `
    document.dispatchEvent(new PointerEvent('pointerout', { bubbles: true, relatedTarget: null }));
  `,
);
await delay(900);
await evaluate(
  `
    window.testHead = null;
    testModel.traverse((n) => {
      if (n.name.replace(/:/g, '') === 'mixamorigHead') testHead = n;
    });
    window.forward = new T.Vector3(0, 0, 1).applyQuaternion(
      testHead.getWorldQuaternion(new T.Quaternion()).invert(),
    );
  `,
);
const facing = () =>
  evaluate(
    `
      (() => {
        const v = forward.clone().applyQuaternion(testHead.getWorldQuaternion(new T.Quaternion()));
        return { x: v.x, y: v.y, z: v.z };
      })();
    `,
  );
const headResults = {};
for (const [name, x, y] of [
  ['left', 5, 285],
  ['right', 1435, 285],
  ['up', 720, 5],
  ['down', 720, 895],
]) {
  await send('Input.dispatchMouseEvent', { type: 'mouseMoved', x, y });
  await delay(800);
  headResults[name] = await facing();
}
assert(headResults.left.x < -0.25);
assert(headResults.right.x > 0.25);
assert(headResults.up.y > 0.03);
assert(headResults.down.y < -0.1);
await evaluate(
  `
    document.dispatchEvent(new PointerEvent('pointerout', { bubbles: true, relatedTarget: null }));
  `,
);
await delay(850);
const neutral = await facing();
assert(Math.abs(neutral.x) < 0.02 && Math.abs(neutral.y) < 0.02);
await evaluate(`
  testScroller.scrollTop = 2000;
`);
await delay(250);
const terminal = await facing();
assert(terminal.x < -0.75);
assertInside(
  await evaluate(`
  modelBounds();
`),
  1440,
  900,
);
results.headTracking = { ...headResults, neutral, terminal };
record('head tracking, neutral return and final leftward head turn');
// Theme shader uniforms remain live without replacing either original map.
await evaluate(
  `
    testScroller.scrollTop = 0;
    fixture.pause();
    window.bodyMaterial = null;
    testModel.traverse((n) => {
      if (n.material?.name === 'VanguardBodyMat') bodyMaterial = n.material;
    });
    window.colorMap = bodyMaterial.map;
    window.normalMap = bodyMaterial.normalMap;
    window.themeShader = {
      uniforms: {},
      vertexShader: '#include <begin_vertex>',
      fragmentShader: '#include <map_fragment>',
    };
    bodyMaterial.onBeforeCompile(themeShader);
  `,
);
const palettes = {};
for (const theme of ['light', 'dark']) {
  await evaluate(`
    document.documentElement.dataset.theme = '${theme}';
  `);
  await delay(150);
  palettes[theme] = await evaluate(
    `
      ({
        armor: themeShader.uniforms.uSoldierArmor.value.getHexString(),
        accent: themeShader.uniforms.uSoldierAccent.value.getHexString(),
        mapsPreserved: bodyMaterial.map === colorMap && bodyMaterial.normalMap === normalMap,
      });
    `,
  );
}
assert.equal(palettes.light.accent, '285bd4');
assert.equal(palettes.dark.accent, '91b4ff');
assert(palettes.light.mapsPreserved && palettes.dark.mapsPreserved);
results.materialPalettes = palettes;
record('theme palette and original atlas/normal preservation');
await evaluate(`
  fixture.play();
  checkMetrics.longTasks = [];
  checkMetrics.draws = 0;
`);
await delay(2000);
results.performance = await evaluate(
  `
    ({ drawCallsOver2Seconds: checkMetrics.draws, longTasks: checkMetrics.longTasks });
  `,
);
assert(results.performance.drawCallsOver2Seconds > 20);
assert.equal(results.performance.longTasks.length, 0);
await evaluate(`
  fixture.destroy();
  fixture.destroy();
  fixture.play();
  fixture.pause();
`);
assert(
  await evaluate(`
  fixtureCanvas.outerHTML === originalCanvasHTML;
`),
);
assert(
  await evaluate(
    `
      existingStage.dataset.preserved === 'yes' &&
        existingStage.style.width === '100px' &&
        existingStage.style.transform === 'translate(30px, 20px)' &&
        existingStage.nextSibling === stageMarker &&
        existingStage.querySelectorAll('.soldier-model-action,.soldier-status').length === 0;
    `,
  ),
);
await evaluate(
  `
    existingStage.remove();
    stageMarker.remove();
    testScroller.remove();
    document.body.append(originalStage);
  `,
);
record('host stage, canvas attributes and placement restored on destroy');
assert.equal(errors.length, 0, JSON.stringify(errors));
await fs.writeFile(new URL('results.json', out), JSON.stringify(results, null, 2));
console.log(
  JSON.stringify({
    checks: results.checks.length,
    errors,
    warnings,
    performance: results.performance,
  }),
);
socket.close();
