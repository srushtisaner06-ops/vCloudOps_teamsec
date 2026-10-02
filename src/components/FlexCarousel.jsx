import { useEffect, useRef, useState } from 'react';
import { Renderer, Program, Mesh, Triangle, Plane, Texture, RenderTarget, Transform } from 'ogl';
import './FlexCarousel.css';

const BEND_PRESETS = {
  liquid: { lensWidth: 0.74, lensHeight: 1.18, tilt: 62, roundness: 1, bend: 0.34, reach: 0.38, curl: 'twist', dispersion: 0.45, liquid: 0, followCursor: false },
  ribbon: { lensWidth: 0.8,  lensHeight: 0.8,  tilt: 0,  roundness: 1, bend: 0.34, reach: 0.34, curl: 'twist', dispersion: 0.4,  liquid: 0, followCursor: false },
  vortex: { lensWidth: 0.7,  lensHeight: 0.95, tilt: 30, roundness: 1, bend: 0.46, reach: 0.3,  curl: 'twist', dispersion: 0.5,  liquid: 0, followCursor: false },
  arch:   { lensWidth: 0.8,  lensHeight: 0.8,  tilt: 0,  roundness: 1, bend: 0.3,  reach: 0.36, curl: 'rise',  dispersion: 0.4,  liquid: 0, followCursor: false },
};

const FIT_ASPECT      = { portrait: 0.75, square: 1, landscape: 4 / 3 };
const TAPS            = 12;
const INTRO_DURATION  = { rise: 2.1, bloom: 1.6, spin: 2.2, deal: 1.5, fade: 0.35 };

const wrap         = (v, s) => ((((v + s / 2) % s) + s) % s) - s / 2;
const clamp01      = v     => Math.min(Math.max(v, 0), 1);
const easeOut      = v     => 1 - Math.pow(1 - clamp01(v), 3);
const easeOutQuint = v     => 1 - Math.pow(1 - clamp01(v), 5);

/* ── GLSL shaders ─────────────────────────────────────────────────────────── */
const cardVertex = `#version 300 es
in vec3 position;
in vec2 uv;
uniform vec4 uRect;
uniform vec2 uResolution;
out vec2 vUv;
out vec2 vLocal;
void main() {
  vUv = uv;
  vLocal = vec2(position.x, -position.y) * uRect.zw;
  vec2 px = uRect.xy + vLocal;
  gl_Position = vec4(px.x / uResolution.x * 2.0 - 1.0, 1.0 - px.y / uResolution.y * 2.0, 0.0, 1.0);
}`;

const cardFragment = `#version 300 es
precision highp float;
uniform sampler2D tMap;
uniform vec2 uSize;
uniform vec2 uImage;
uniform float uRadius;
uniform float uAlpha;
uniform float uReady;
uniform float uShift;
uniform float uDpr;
uniform vec3 uPlaceholder;
in vec2 vUv;
in vec2 vLocal;
out vec4 fragColor;
float roundedBox(vec2 p, vec2 b, float r) {
  vec2 q = abs(p) - b + r;
  return length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - r;
}
void main() {
  float sd   = roundedBox(vLocal, uSize * 0.5, min(uRadius, min(uSize.x, uSize.y) * 0.5));
  float mask = clamp(0.5 - sd * uDpr, 0.0, 1.0);
  vec2 local = vLocal / uSize + 0.5;
  float cardAspect  = uSize.x / uSize.y;
  float imageAspect = uImage.x / max(uImage.y, 1.0);
  vec2 scale = imageAspect > cardAspect ? vec2(cardAspect / imageAspect, 1.0) : vec2(1.0, imageAspect / cardAspect);
  scale /= 1.08;
  vec2 uv2 = vec2(local.x, 1.0 - local.y);
  uv2 = (uv2 - 0.5) * scale + 0.5;
  uv2.x += uShift * (1.0 - scale.x) * 0.5;
  vec3 image = texture(tMap, uv2).rgb;
  vec3 color = mix(uPlaceholder, image, uReady);
  float alpha = mask * uAlpha;
  fragColor = vec4(color * alpha, alpha);
}`;

const lensVertex = `#version 300 es
in vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}`;

const lensFragment = `#version 300 es
precision highp float;
uniform sampler2D tScene;
uniform vec2 uResolution;
uniform float uDpr;
uniform vec2 uCenter;
uniform vec2 uHalf;
uniform float uAngle;
uniform float uExponent;
uniform float uInner;
uniform float uOuter;
uniform float uFlow;
uniform float uCurl;
uniform float uDispersion;
uniform float uStrength;
uniform float uSceneAlpha;
out vec4 fragColor;
void main() {
  vec2 frag = gl_FragCoord.xy / uDpr;
  vec2 uv   = frag / uResolution;
  vec2 rel  = frag - vec2(uCenter.x, uResolution.y - uCenter.y);
  float ca  = cos(uAngle);
  float sa  = sin(uAngle);
  vec2 local   = vec2(ca * rel.x + sa * rel.y, -sa * rel.x + ca * rel.y);
  vec2 k       = max(abs(local) / uHalf, vec2(1e-5));
  float nd     = pow(pow(k.x, uExponent) + pow(k.y, uExponent), 1.0 / uExponent);
  vec2 grad    = pow(k, vec2(uExponent - 1.0)) * sign(local) / uHalf * pow(nd, 1.0 - uExponent);
  float glen   = max(length(grad), 1e-6);
  float edge   = (nd - 1.0) / glen;
  vec2 outward = grad / glen;
  vec2 normal  = vec2(ca * outward.x - sa * outward.y, sa * outward.x + ca * outward.y);
  vec2 along   = vec2(-normal.y, normal.x);
  float t      = clamp((edge + uInner) / (uInner + uOuter), 0.0, 1.0);
  float ramp   = t * t * t * (t * (t * 6.0 - 15.0) + 10.0);
  float slope  = 16.0 * t * t * (1.0 - t) * (1.0 - t);
  float reachX = rel.x / (uResolution.x * 0.5);
  float side   = smoothstep(0.02, 0.3, abs(reachX)) * (uCurl == 0.0 ? sign(reachX) : uCurl);
  float lift   = ramp * side * uFlow * uStrength;
  vec2 swirl   = along * along.y * side * slope * uFlow * uStrength * 0.35;
  vec2 drift   = vec2(0.0, -lift) - swirl;
  vec2 shifted = uv + drift / uResolution;
  vec2 texels  = uResolution * uDpr;
  vec2 gx = dFdx(shifted);
  vec2 gy = dFdy(shifted);
  gx *= min(1.0, 3.0 / max(length(gx * texels), 1e-4));
  gy *= min(1.0, 3.0 / max(length(gy * texels), 1e-4));
  vec4 color = textureGrad(tScene, shifted, gx, gy);
  vec2 spread   = vec2(0.0, side * slope * uFlow * uStrength) / uResolution * uDispersion;
  float spreadPx = length(spread * texels);
  if (color.a > 0.002 && spreadPx > 0.25) {
    vec3 base = color.rgb / color.a;
    vec3 sumColor  = vec3(0.0);
    vec3 sumWeight = vec3(0.0);
    for (int i = 0; i < ${TAPS}; i++) {
      float s = (float(i) + 0.5) / float(${TAPS});
      vec4 c  = textureGrad(tScene, shifted + spread * (s - 0.5), gx, gy);
      vec3 w  = max(1.0 - abs(vec3(s) - vec3(0.15, 0.5, 0.85)) * 2.6, 0.0) * c.a;
      sumColor  += c.rgb * (w / max(c.a, 0.002));
      sumWeight += w;
    }
    vec3 split = mix(base, sumColor / max(sumWeight, vec3(1e-4)), clamp(sumWeight * 2.0, 0.0, 1.0));
    color.rgb = mix(color.rgb, clamp(split, 0.0, 1.0) * color.a, smoothstep(0.25, 1.5, spreadPx));
  }
  fragColor = color * uSceneAlpha;
}`;

/* ── Digits counter component ─────────────────────────────────────────────── */
const Digits = ({ value }) => (
  <span className="flex-carousel__digits">
    {String(value).padStart(2, '0').split('').map((digit, i) => (
      <span key={i} className="flex-carousel__digit">
        <span className="flex-carousel__reel" style={{ transform: `translateY(${-Number(digit) * 10}%)` }}>
          {'0123456789'.split('').map(n => <span key={n}>{n}</span>)}
        </span>
      </span>
    ))}
  </span>
);

/* ── Main component ───────────────────────────────────────────────────────── */
const FlexCarousel = ({
  items,
  preset       = 'liquid',
  intro        = 'rise',
  cardHeight   = 0.5,
  gap          = 12,
  radius       = 0,
  fit          = 'natural',
  lensWidth, lensHeight, tilt, roundness, bend, reach, curl, dispersion, liquid, followCursor,
  squeeze      = 0.2,
  focusOnClick = true,
  autoplay     = false,
  interval     = 4,
  captions     = true,
  captureWheel = true,
  onChange,
  onSelect,
  className    = '',
  style,
}) => {
  const containerRef = useRef(null);
  const settingsRef  = useRef(null);
  const itemsRef     = useRef(items || []);
  const engineRef    = useRef(null);
  const callbacksRef = useRef({ onChange, onSelect });
  const [active, setActive]       = useState(0);
  const [revealed, setRevealed]   = useState(false);

  const base = BEND_PRESETS[preset] || BEND_PRESETS.liquid;
  const pick = (v, k) => (v === undefined || v === null ? base[k] : v);

  const list     = items && items.length ? items : [];
  const itemsKey = list.map(i => i.src).join('|');

  /* sync settings on every render */
  useEffect(() => {
    itemsRef.current      = list;
    callbacksRef.current  = { onChange, onSelect };
    settingsRef.current   = {
      intro, cardHeight, gap, radius, fit,
      lensWidth:    pick(lensWidth,    'lensWidth'),
      lensHeight:   pick(lensHeight,   'lensHeight'),
      tilt:         pick(tilt,         'tilt'),
      roundness:    pick(roundness,    'roundness'),
      bend:         pick(bend,         'bend'),
      reach:        pick(reach,        'reach'),
      curl:         pick(curl,         'curl'),
      dispersion:   pick(dispersion,   'dispersion'),
      liquid:       pick(liquid,       'liquid'),
      followCursor: pick(followCursor, 'followCursor'),
      squeeze, focusOnClick, autoplay, interval, captureWheel,
    };
    engineRef.current?.setItems(list);
  });

  /* ── WebGL engine ── */
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const s   = settingsRef.current;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    /* renderer */
    const renderer = new Renderer({ dpr, alpha: true, premultipliedAlpha: true, antialias: false });
    const gl       = renderer.gl;
    gl.clearColor(0, 0, 0, 0);
    container.appendChild(gl.canvas);
    gl.canvas.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;display:block;pointer-events:none;';

    /* geometry */
    const fullscreenTri = new Triangle(gl);
    const cardPlane     = new Plane(gl, { width: 1, height: 1 });

    /* programs */
    const cardProg = new Program(gl, {
      vertex: cardVertex, fragment: cardFragment,
      uniforms: {
        tMap:         { value: new Texture(gl) },
        uRect:        { value: [0,0,0,0] },
        uResolution:  { value: [0,0] },
        uSize:        { value: [0,0] },
        uImage:       { value: [0,0] },
        uRadius:      { value: 0 },
        uAlpha:       { value: 1 },
        uReady:       { value: 0 },
        uShift:       { value: 0 },
        uDpr:         { value: dpr },
        uPlaceholder: { value: [0.05, 0.08, 0.14] },
      },
      transparent: true, depthTest: false,
    });

    const lensProg = new Program(gl, {
      vertex: lensVertex, fragment: lensFragment,
      uniforms: {
        tScene:       { value: new Texture(gl) },
        uResolution:  { value: [0,0] },
        uDpr:         { value: dpr },
        uCenter:      { value: [0,0] },
        uHalf:        { value: [0,0] },
        uAngle:       { value: 0 },
        uExponent:    { value: 2 },
        uInner:       { value: 0.1 },
        uOuter:       { value: 0.35 },
        uFlow:        { value: 0 },
        uCurl:        { value: 0 },
        uDispersion:  { value: 0.4 },
        uStrength:    { value: 0 },
        uSceneAlpha:  { value: 1 },
      },
      transparent: true, depthTest: false,
    });

    /* meshes */
    const cardMesh = new Mesh(gl, { geometry: cardPlane,      program: cardProg });
    const lensMesh = new Mesh(gl, { geometry: fullscreenTri,  program: lensProg });

    /* scene roots (OGL Transform objects so renderer.render works) */
    const cardScene = new Transform();
    cardMesh.setParent(cardScene);
    const lensScene = new Transform();
    lensMesh.setParent(lensScene);

    /* state */
    let W = 0, H = 0;
    let sceneTarget = null;
    let slots       = [];
    let metrics     = null;
    let offset      = 0;
    let velocity    = 0;
    let dragging    = false;
    let dragStart   = 0;
    let dragOff     = 0;
    let hoverSlot   = -1;
    let introT      = 0;
    let introDur    = 0;
    let introName   = 'none';
    let running     = false;
    let raf         = 0;
    let lensFlow    = 0;
    let lensTarget  = 0;

    /* slot loading */
    function loadSlot(item, index) {
      const tex  = new Texture(gl, { generateMipmaps: false });
      const slot = { item, index, texture: tex, aspect: 1, loaded: false, failed: false, ready: 0, color: [0.05, 0.08, 0.14], image: [0, 0], dispose: () => {} };
      const img  = new Image();
      img.crossOrigin = 'anonymous';
      img.onload  = () => { tex.image = img; tex.needsUpdate = true; slot.aspect = img.naturalWidth / img.naturalHeight; slot.image = [img.naturalWidth, img.naturalHeight]; slot.loaded = true; wake(); };
      img.onerror = () => { slot.failed = true; slot.loaded = true; };
      img.src     = item.src;
      slot.dispose = () => { img.src = ''; };
      return slot;
    }

    function buildSlots(its) {
      slots.forEach(s => s.dispose());
      slots = its.map((item, i) => loadSlot(item, i));
      buildMetrics();
    }

    /* metrics */
    function buildMetrics() {
      if (!W || !slots.length) return;
      const cfg   = settingsRef.current;
      const cardH = H * cfg.cardHeight;
      const g     = cfg.gap;
      const widths = slots.map(slot => {
        const fa = FIT_ASPECT[cfg.fit];
        const asp = fa !== undefined ? fa : (slot.aspect || 1);
        return cardH * asp;
      });
      const centers = [];
      let x = 0;
      for (let i = 0; i < widths.length; i++) {
        centers.push(x + widths[i] / 2);
        x += widths[i] + g;
      }
      const total = x - g;
      metrics = { cardH, widths, centers, gap: g, loop: total + g };
    }

    /* resize */
    function resize() {
      const rect = container.getBoundingClientRect();
      W = rect.width; H = rect.height;
      renderer.setSize(W, H);
      if (sceneTarget) {
        sceneTarget.setSize(W * dpr, H * dpr);
      } else {
        sceneTarget = new RenderTarget(gl, { width: Math.round(W * dpr), height: Math.round(H * dpr), depth: false });
      }
      buildMetrics();
      wake();
    }

    /* intro */
    function startIntro(name) {
      introName = name || 'none';
      introDur  = INTRO_DURATION[introName] || 0;
      introT    = 0;
    }

    function getIntroFx() {
      if (!introDur || introT >= introDur) return { sceneAlpha: 1, strength: 1, card: null };
      const p = introT / introDur;
      switch (introName) {
        case 'rise':  return { sceneAlpha: easeOut(p), strength: 1, card: rel => ({ alpha: easeOut(clamp01((p - rel * 0.25) * 4)), x: 0, y: (1 - easeOutQuint(clamp01((p - rel * 0.15) * 3))) * 80 }) };
        case 'bloom': return { sceneAlpha: 1, strength: easeOut(p), card: rel => ({ alpha: easeOut(clamp01((p - rel * 0.2) * 5)), x: 0, y: 0 }) };
        case 'deal':  return { sceneAlpha: 1, strength: 1, card: rel => { const q = easeOutQuint(clamp01((p - rel * 0.3) * 5)); return { alpha: q, x: (1-q)*-60, y: (1-q)*40 }; } };
        default:      return { sceneAlpha: easeOut(p / 0.35), strength: 1, card: null };
      }
    }

    /* instances */
    function getInstances() {
      if (!metrics || !slots.length) return [];
      const { centers, widths, cardH, loop } = metrics;
      const cx = W / 2;
      const n  = slots.length;
      const out = [];
      for (let rep = -2; rep <= 2; rep++) {
        for (let i = 0; i < n; i++) {
          const baseX = centers[i] + rep * loop - offset;
          const x0 = cx + baseX - widths[i] / 2;
          const x1 = cx + baseX + widths[i] / 2;
          if (x1 < -W || x0 > W * 2) continue;
          const y0 = (H - cardH) / 2;
          out.push({ index: i, x0, x1, y0, y1: y0 + cardH });
        }
      }
      return out;
    }

    /* draw one card — sets uniforms and issues draw call */
    function drawCard({ i, x, y, cw, ch, alpha }) {
      const slot = slots[i];
      if (!slot) return;
      const cfg = settingsRef.current;
      cardProg.uniforms.tMap.value        = slot.texture;
      cardProg.uniforms.uRect.value       = [x, y, cw, ch];
      cardProg.uniforms.uResolution.value = [W, H];
      cardProg.uniforms.uSize.value       = [cw, ch];
      cardProg.uniforms.uImage.value      = slot.image.length === 2 ? slot.image : [cw, ch];
      cardProg.uniforms.uRadius.value     = cfg.radius;
      cardProg.uniforms.uAlpha.value      = alpha;
      cardProg.uniforms.uReady.value      = slot.ready;
      cardProg.uniforms.uShift.value      = 0;
      cardProg.uniforms.uDpr.value        = dpr;
      cardProg.uniforms.uPlaceholder.value = slot.color;
      cardMesh.draw();
    }

    /* render frame */
    function frame(dt) {
      if (!W || !metrics || !slots.length) return;
      const cfg = settingsRef.current;

      /* intro timer */
      if (introT < introDur) introT = Math.min(introT + dt, introDur);
      const fx = getIntroFx();

      /* physics */
      if (!dragging) { velocity *= 0.9; offset += velocity; }
      lensFlow += (lensTarget - lensFlow) * 0.08;

      /* slot ready lerp */
      for (const slot of slots) {
        if (slot.loaded && slot.ready < 1) slot.ready = Math.min(slot.ready + dt * 2.5, 1);
      }

      /* wrap offset */
      const loop = metrics.loop;
      offset = wrap(offset, loop);

      /* find centred slot */
      let closestDist = Infinity, closestIdx = 0;
      for (let i = 0; i < slots.length; i++) {
        const d = Math.abs(wrap(metrics.centers[i] - offset, loop));
        if (d < closestDist) { closestDist = d; closestIdx = i; }
      }
      setActive(closestIdx);

      /* ── PASS 1: cards → offscreen RenderTarget ─────────────────────────── */
      // Bind the offscreen FBO directly through the renderer so OGL tracks state
      renderer.bindFramebuffer(sceneTarget);
      gl.viewport(0, 0, Math.round(W * dpr), Math.round(H * dpr));
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);

      const instances = getInstances();
      for (const inst of instances) {
        const { index, x0, x1, y0, y1 } = inst;
        const cw = x1 - x0, ch = y1 - y0;
        let alpha = 1, dx = 0, dy = 0;
        if (fx.card) {
          const rel = wrap(metrics.centers[index] - offset, loop) / (W * 0.6);
          const eff = fx.card(Math.abs(rel));
          alpha = eff.alpha; dx = eff.x || 0; dy = eff.y || 0;
        }
        drawCard({ i: index, x: x0 + dx, y: y0 + dy, cw, ch, alpha: alpha * fx.sceneAlpha });
      }

      // Unbind FBO → back to screen
      renderer.bindFramebuffer();


      /* ── PASS 2: lens distortion → screen ───────────────────────────────── */
      const lCfg  = settingsRef.current;
      const cx    = W / 2;
      const halfW = W * lCfg.lensWidth  / 2;
      const halfH = H * lCfg.lensHeight / 2;
      const angle = lCfg.tilt * Math.PI / 180;
      const curlMap = { twist: 0, rise: 1, fall: -1 };

      lensProg.uniforms.tScene.value      = sceneTarget.texture;
      lensProg.uniforms.uResolution.value = [W, H];
      lensProg.uniforms.uDpr.value        = dpr;
      lensProg.uniforms.uCenter.value     = [cx, H / 2];
      lensProg.uniforms.uHalf.value       = [halfW, halfH];
      lensProg.uniforms.uAngle.value      = angle;
      lensProg.uniforms.uExponent.value   = 2 + lCfg.roundness * 6;
      lensProg.uniforms.uInner.value      = 0.05;
      lensProg.uniforms.uOuter.value      = lCfg.reach;
      lensProg.uniforms.uFlow.value       = lensFlow;
      lensProg.uniforms.uCurl.value       = curlMap[lCfg.curl] ?? 0;
      lensProg.uniforms.uDispersion.value = lCfg.dispersion;
      lensProg.uniforms.uStrength.value   = lCfg.bend * fx.strength;
      lensProg.uniforms.uSceneAlpha.value = fx.sceneAlpha;

      renderer.render({
        scene:        lensScene,
        clear:        true,
        frustumCull:  false,
        sort:         false,
      });
    }

    /* RAF loop */
    let last = 0;
    function loop(ts) {
      raf  = requestAnimationFrame(loop);
      const dt = Math.min((ts - last) / 1000, 0.1);
      last = ts;
      if (!running) return;
      frame(dt);
    }

    function wake() { if (!running) { running = true; last = performance.now(); } }

    /* ── pointer / wheel / keyboard events ─────────────────────────────────── */
    function onPointerDown(e) {
      if (e.button !== 0 && e.pointerType === 'mouse') return;
      dragging = true; dragStart = e.clientX; dragOff = offset; velocity = 0;
      container.setPointerCapture(e.pointerId);
      container.dataset.dragging = '';
      wake();
    }

    function onPointerMove(e) {
      if (!dragging) {
        const insts = getInstances();
        hoverSlot = -1;
        for (const inst of insts) {
          if (e.clientX >= inst.x0 && e.clientX <= inst.x1 && e.clientY >= inst.y0 && e.clientY <= inst.y1) {
            hoverSlot = inst.index; break;
          }
        }
        container.dataset.hover = hoverSlot >= 0 ? 'open' : '';
        return;
      }
      const dx = dragStart - e.clientX;
      offset   = dragOff + dx;
      velocity = dx * 0.05;
      lensTarget = Math.sign(dx) * 0.6;
      wake();
    }

    function onPointerUp(e) {
      if (!dragging) return;
      dragging = false;
      delete container.dataset.dragging;
      lensTarget = 0;
      const moved = Math.abs(dragOff - offset);
      if (moved < 6 && settingsRef.current.focusOnClick && hoverSlot >= 0) {
        const item = itemsRef.current[hoverSlot];
        if (item) {
          callbacksRef.current.onSelect?.(hoverSlot, item);
          callbacksRef.current.onChange?.(hoverSlot, item);
        }
      }
    }

    function onWheel(e) {
      if (!settingsRef.current.captureWheel) return;
      e.preventDefault();
      offset    += e.deltaX * 0.8 + e.deltaY * 0.3;
      velocity   = (e.deltaX + e.deltaY * 0.3) * 0.15;
      lensTarget = Math.sign(e.deltaX || e.deltaY) * 0.5;
      setTimeout(() => { lensTarget = 0; }, 200);
      wake();
    }

    function onKeyDown(e) {
      const step = metrics?.widths[0] ?? 220;
      if (e.key === 'ArrowRight') { offset += step; velocity =  step * 0.1; wake(); }
      if (e.key === 'ArrowLeft')  { offset -= step; velocity = -step * 0.1; wake(); }
    }

    container.addEventListener('pointerdown',   onPointerDown);
    container.addEventListener('pointermove',   onPointerMove);
    container.addEventListener('pointerup',     onPointerUp);
    container.addEventListener('pointercancel', onPointerUp);
    container.addEventListener('wheel',         onWheel, { passive: false });
    container.addEventListener('keydown',       onKeyDown);

    const ro = new ResizeObserver(resize);
    ro.observe(container);
    resize();

    /* Engine API */
    engineRef.current = {
      wake,
      setItems: (its) => {
        buildSlots(its);
        resize();
        startIntro(settingsRef.current.intro);
        wake();
      },
    };

    buildSlots(itemsRef.current);
    startIntro(s.intro);
    raf = requestAnimationFrame(loop);
    wake();
    setRevealed(true);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      slots.forEach(s => s.dispose());
      container.removeEventListener('pointerdown',   onPointerDown);
      container.removeEventListener('pointermove',   onPointerMove);
      container.removeEventListener('pointerup',     onPointerUp);
      container.removeEventListener('pointercancel', onPointerUp);
      container.removeEventListener('wheel',         onWheel);
      container.removeEventListener('keydown',       onKeyDown);
      if (gl.canvas.parentNode) gl.canvas.remove();
      engineRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* re-load items when itemsKey changes */
  useEffect(() => {
    if (engineRef.current) engineRef.current.setItems(list);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemsKey]);

  return (
    <div
      ref={containerRef}
      className={`flex-carousel ${className}`}
      style={{ position: 'relative', overflow: 'hidden', width: '100%', height: '100%', ...style }}
      tabIndex={0}
      role="region"
      aria-label="Event image carousel"
    >
      {captions && list[active] && (
        <div className="flex-carousel__caption" aria-live="polite">
          {list[active].title    && <span className="flex-carousel__title">{list[active].title}</span>}
          {list[active].subtitle && <span className="flex-carousel__subtitle">{list[active].subtitle}</span>}
        </div>
      )}
    </div>
  );
};

export default FlexCarousel;
