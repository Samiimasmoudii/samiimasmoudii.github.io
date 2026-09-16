import {
  WebGLRenderer,
  Scene,
  PerspectiveCamera,
  BufferGeometry,
  BufferAttribute,
  Color,
  PointsMaterial,
  AdditiveBlending,
  Points,
  Vector2,
  Vector3,
  Raycaster,
  Plane,
  CanvasTexture,
  Clock,
  type Texture,
} from 'three';

/**
 * Interactive point-cloud hero.
 * Particles drift in space, morph between a scatter, a sphere, and the
 * initials "SM", and are repelled by the cursor. Degrades gracefully:
 *  - no WebGL        → canvas stays hidden, CSS gradient shows through
 *  - reduced motion  → one static sphere frame, no animation loop
 *  - small screens   → fewer particles
 *
 * Returns a cleanup function.
 */
export function initPointCloud(canvas: HTMLCanvasElement): () => void {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isMobile = window.innerWidth < 768;
  const COUNT = isMobile ? 1500 : 5000;

  // --- Renderer (guarded: bail cleanly if WebGL is unavailable) ---
  let renderer: WebGLRenderer;
  try {
    renderer = new WebGLRenderer({ canvas, alpha: true, antialias: true });
  } catch {
    return () => {};
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);

  const scene = new Scene();
  const camera = new PerspectiveCamera(55, canvas.clientWidth / canvas.clientHeight, 0.1, 100);
  camera.position.set(0, 0, 8);

  // --- Target shapes: each is a flat [x,y,z,...] array of length COUNT*3 ---
  const scatter = new Float32Array(COUNT * 3);
  const sphere = new Float32Array(COUNT * 3);
  for (let i = 0; i < COUNT; i++) {
    // Scatter — random inside a soft box
    scatter[i * 3] = (Math.random() - 0.5) * 12;
    scatter[i * 3 + 1] = (Math.random() - 0.5) * 8;
    scatter[i * 3 + 2] = (Math.random() - 0.5) * 8;
    // Sphere — fibonacci distribution for even coverage
    const t = i / COUNT;
    const phi = Math.acos(1 - 2 * t);
    const theta = Math.PI * (1 + Math.sqrt(5)) * i;
    const r = 3.5;
    sphere[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    sphere[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    sphere[i * 3 + 2] = r * Math.cos(phi);
  }

  // "SM" initials are sampled from a 2D canvas once the display font is ready.
  let initials: Float32Array | null = null;

  // --- Geometry + per-vertex colors (a warm-amber subset for depth) ---
  const current = new Float32Array(scatter); // live positions we animate
  const geometry = new BufferGeometry();
  geometry.setAttribute('position', new BufferAttribute(current, 3));

  const colors = new Float32Array(COUNT * 3);
  const amber = new Color('#ffb454');
  const dim = new Color('#5a534a');
  for (let i = 0; i < COUNT; i++) {
    const c = Math.random() < 0.32 ? amber : dim;
    colors[i * 3] = c.r;
    colors[i * 3 + 1] = c.g;
    colors[i * 3 + 2] = c.b;
  }
  geometry.setAttribute('color', new BufferAttribute(colors, 3));

  const material = new PointsMaterial({
    size: isMobile ? 0.06 : 0.05,
    sizeAttenuation: true,
    map: makeSoftSprite(),
    vertexColors: true,
    transparent: true,
    depthWrite: false,
    blending: AdditiveBlending,
    opacity: 0.95,
  });

  const points = new Points(geometry, material);
  scene.add(points);

  // --- Pointer tracking (world position on the z=0 plane) ---
  const pointerNDC = new Vector2(-10, -10);
  const pointerWorld = new Vector3(9999, 9999, 9999);
  const raycaster = new Raycaster();
  const plane = new Plane(new Vector3(0, 0, 1), 0);

  const onPointerMove = (e: PointerEvent) => {
    const rect = canvas.getBoundingClientRect();
    pointerNDC.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    pointerNDC.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
  };
  const onPointerLeave = () => {
    pointerNDC.set(-10, -10);
    pointerWorld.set(9999, 9999, 9999);
  };
  window.addEventListener('pointermove', onPointerMove, { passive: true });
  window.addEventListener('pointerleave', onPointerLeave);

  // --- Morph scheduling ---
  let activeTarget: Float32Array = sphere;
  let targetCycle: Float32Array[] = [sphere, scatter];
  let cycleIndex = 0;
  const clock = new Clock();
  let nextMorphAt = 4.5;

  const REPEL_RADIUS = isMobile ? 1.1 : 1.6;
  const REPEL_STRENGTH = 1.5;

  const setReady = () => canvas.classList.add('is-ready');

  const renderStatic = () => {
    // Reduced motion: settle straight onto the sphere and draw one frame.
    current.set(sphere);
    geometry.attributes.position.needsUpdate = true;
    renderer.render(scene, camera);
    setReady();
  };

  if (prefersReduced) {
    renderStatic();
  } else {
    // Build the "SM" target after the font loads, then widen the cycle.
    document.fonts.ready.then(() => {
      initials = sampleInitials(COUNT);
      if (initials) targetCycle = [sphere, initials, scatter];
    });
  }

  let raf = 0;

  const tick = () => {
    const elapsed = clock.getElapsedTime();

    // Advance the morph target on schedule.
    if (elapsed > nextMorphAt) {
      cycleIndex = (cycleIndex + 1) % targetCycle.length;
      activeTarget = targetCycle[cycleIndex];
      nextMorphAt = elapsed + 5;
    }

    // Update pointer world position on the z=0 plane.
    if (pointerNDC.x > -5) {
      raycaster.setFromCamera(pointerNDC, camera);
      raycaster.ray.intersectPlane(plane, pointerWorld);
    }

    const pos = geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < COUNT; i++) {
      const ix = i * 3;
      // Ease current position toward the active shape.
      let x = current[ix] + (activeTarget[ix] - current[ix]) * 0.035;
      let y = current[ix + 1] + (activeTarget[ix + 1] - current[ix + 1]) * 0.035;
      let z = current[ix + 2] + (activeTarget[ix + 2] - current[ix + 2]) * 0.035;
      current[ix] = x;
      current[ix + 1] = y;
      current[ix + 2] = z;

      // Organic drift.
      const wob = Math.sin(elapsed * 0.6 + i) * 0.03;
      y += wob;

      // Cursor repel (falls off with distance).
      const dx = x - pointerWorld.x;
      const dy = y - pointerWorld.y;
      const dz = z - pointerWorld.z;
      const d2 = dx * dx + dy * dy + dz * dz;
      if (d2 < REPEL_RADIUS * REPEL_RADIUS) {
        const d = Math.sqrt(d2) || 0.0001;
        const f = (1 - d / REPEL_RADIUS) * REPEL_STRENGTH;
        x += (dx / d) * f;
        y += (dy / d) * f;
        z += (dz / d) * f;
      }

      pos[ix] = x;
      pos[ix + 1] = y;
      pos[ix + 2] = z;
    }
    geometry.attributes.position.needsUpdate = true;

    // Gentle whole-field breathing rotation.
    points.rotation.y = Math.sin(elapsed * 0.08) * 0.35;
    points.rotation.x = Math.cos(elapsed * 0.06) * 0.12;

    renderer.render(scene, camera);
    raf = requestAnimationFrame(tick);
  };

  if (!prefersReduced) {
    setReady();
    raf = requestAnimationFrame(tick);
  }

  // --- Resize ---
  const onResize = () => {
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h, false);
  };
  window.addEventListener('resize', onResize);

  // --- Pause when tab is hidden ---
  const onVisibility = () => {
    if (document.hidden) {
      cancelAnimationFrame(raf);
      raf = 0;
    } else if (!prefersReduced && raf === 0) {
      clock.getDelta(); // discard the gap so the morph doesn't jump
      raf = requestAnimationFrame(tick);
    }
  };
  document.addEventListener('visibilitychange', onVisibility);

  // --- Cleanup ---
  return () => {
    cancelAnimationFrame(raf);
    window.removeEventListener('pointermove', onPointerMove);
    window.removeEventListener('pointerleave', onPointerLeave);
    window.removeEventListener('resize', onResize);
    document.removeEventListener('visibilitychange', onVisibility);
    geometry.dispose();
    material.dispose();
    material.map?.dispose();
    renderer.dispose();
  };
}

/** A soft radial-gradient sprite so each particle reads as a glowing dot. */
function makeSoftSprite(): Texture {
  const size = 64;
  const c = document.createElement('canvas');
  c.width = c.height = size;
  const ctx = c.getContext('2d')!;
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  g.addColorStop(0, 'rgba(255,255,255,1)');
  g.addColorStop(0.25, 'rgba(255,255,255,0.85)');
  g.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  const tex = new CanvasTexture(c);
  tex.needsUpdate = true;
  return tex;
}

/** Sample opaque pixels of "SM" into COUNT world-space points. */
function sampleInitials(count: number): Float32Array | null {
  const w = 320;
  const h = 160;
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  const ctx = c.getContext('2d');
  if (!ctx) return null;

  ctx.fillStyle = '#fff';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.font = '700 120px "Space Grotesk", system-ui, sans-serif';
  ctx.fillText('SM', w / 2, h / 2 + 4);

  const data = ctx.getImageData(0, 0, w, h).data;
  const hits: number[] = [];
  for (let y = 0; y < h; y += 2) {
    for (let x = 0; x < w; x += 2) {
      if (data[(y * w + x) * 4 + 3] > 128) hits.push(x, y);
    }
  }
  const m = hits.length / 2;
  if (m < 200) return null; // font didn't render — skip initials

  const out = new Float32Array(count * 3);
  const spanX = 8; // world width of the "SM"
  const spanY = 4;
  for (let i = 0; i < count; i++) {
    const j = (i % m) * 2;
    out[i * 3] = (hits[j] / w - 0.5) * spanX;
    out[i * 3 + 1] = -(hits[j + 1] / h - 0.5) * spanY;
    out[i * 3 + 2] = (Math.random() - 0.5) * 0.6;
  }
  return out;
}
