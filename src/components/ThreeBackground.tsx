import { useEffect, useRef } from 'react';
import * as THREE from 'three';

/** A quiet orbital backdrop. Its static gradient also works without WebGL. */
export default function ThreeBackground() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const coarsePointer = window.matchMedia('(pointer: coarse)');
    const compact = window.innerWidth < 768 || coarsePointer.matches;
    let renderer: THREE.WebGLRenderer;

    // WebGL can be unavailable on older devices or restricted browsers.
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: !compact,
        powerPreference: 'low-power',
      });
    } catch {
      return;
    }

    renderer.setClearColor(0x000000, 0);
    renderer.domElement.style.display = 'block';
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(52, 1, 0.1, 180);
    camera.position.z = 78;

    const world = new THREE.Group();
    const globe = new THREE.Group();
    const orbits = new THREE.Group();
    globe.rotation.set(0.3, 0, -0.35);
    orbits.rotation.set(0.65, 0.2, -0.3);
    world.add(globe, orbits);
    scene.add(world);

    const geometries: THREE.BufferGeometry[] = [];
    const materials: THREE.Material[] = [];
    const segments = compact ? 48 : 80;
    const radius = 24;
    const positions: number[] = [];
    const colors: number[] = [];
    const sky = new THREE.Color('#38bdf8');
    const blue = new THREE.Color('#1d4ed8');
    const vertexColor = new THREE.Color();

    const addCircle = (pointAt: (angle: number) => THREE.Vector3) => {
      for (let segment = 0; segment < segments; segment++) {
        for (const step of [segment, segment + 1]) {
          const angle = (step / segments) * Math.PI * 2;
          const point = pointAt(angle);
          positions.push(point.x, point.y, point.z);
          vertexColor.copy(blue).lerp(sky, (Math.sin(angle) + 1) / 2);
          colors.push(vertexColor.r, vertexColor.g, vertexColor.b);
        }
      }
    };

    const latitudeCount = compact ? 8 : 12;
    const longitudeCount = compact ? 8 : 12;
    for (let latitude = 1; latitude < latitudeCount; latitude++) {
      const angle = (latitude / latitudeCount) * Math.PI;
      const ringRadius = Math.sin(angle) * radius;
      const y = Math.cos(angle) * radius;
      addCircle((phase) => new THREE.Vector3(
        Math.cos(phase) * ringRadius,
        y,
        Math.sin(phase) * ringRadius,
      ));
    }
    for (let longitude = 0; longitude < longitudeCount; longitude++) {
      const angle = (longitude / longitudeCount) * Math.PI;
      addCircle((phase) => new THREE.Vector3(
        Math.cos(phase) * Math.cos(angle) * radius,
        Math.sin(phase) * radius,
        Math.cos(phase) * Math.sin(angle) * radius,
      ));
    }

    // The entire wireframe is one draw call; no per-frame geometry allocation.
    const globeGeometry = new THREE.BufferGeometry();
    globeGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    globeGeometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    const globeMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.17,
      depthWrite: false,
    });
    geometries.push(globeGeometry);
    materials.push(globeMaterial);
    globe.add(new THREE.LineSegments(globeGeometry, globeMaterial));

    for (let index = 0; index < 3; index++) {
      const orbitPoints = Array.from({ length: segments }, (_, segment) => {
        const angle = (segment / segments) * Math.PI * 2;
        const orbitRadius = radius + 7 + index * 5;
        return new THREE.Vector3(
          Math.cos(angle) * orbitRadius,
          Math.sin(angle) * orbitRadius * (0.7 + index * 0.09),
          0,
        );
      });
      const geometry = new THREE.BufferGeometry().setFromPoints(orbitPoints);
      const material = new THREE.LineBasicMaterial({
        color: index === 1 ? 0x38bdf8 : 0x2563eb,
        transparent: true,
        opacity: index === 1 ? 0.15 : 0.08,
        depthWrite: false,
      });
      const orbit = new THREE.LineLoop(geometry, material);
      orbit.rotation.set(index * 0.35, index * 0.5, index * 0.25);
      geometries.push(geometry);
      materials.push(material);
      orbits.add(orbit);
    }

    // A deterministic distribution avoids flashes when StrictMode remounts.
    const particleCount = compact ? 36 : 72;
    const particlePositions = new Float32Array(particleCount * 3);
    let seed = 2718;
    const random = () => {
      seed = (seed * 16807) % 2147483647;
      return (seed - 1) / 2147483646;
    };
    for (let index = 0; index < particleCount; index++) {
      particlePositions[index * 3] = (random() - 0.5) * 160;
      particlePositions[index * 3 + 1] = (random() - 0.5) * 110;
      particlePositions[index * 3 + 2] = -15 - random() * 45;
    }
    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMaterial = new THREE.PointsMaterial({
      color: 0x93c5fd,
      size: 0.12,
      transparent: true,
      opacity: 0.35,
      depthWrite: false,
      sizeAttenuation: true,
    });
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    geometries.push(particleGeometry);
    materials.push(particleMaterial);
    scene.add(particles);

    let frameId = 0;
    let previousTime: number | null = null;
    let elapsed = 0;
    let disposed = false;
    let contextLost = false;
    let targetX = 0;
    let targetY = 0;
    let pointerX = 0;
    let pointerY = 0;
    let width = 0;
    let height = 0;
    let pixelRatio = 0;

    const render = (time: number) => {
      frameId = 0;
      if (disposed || contextLost || document.hidden) return;

      // Capped delta prevents jumps after a suspended tab or a slow frame.
      const delta = previousTime === null ? 0 : Math.min((time - previousTime) / 1000, 0.05);
      previousTime = time;
      if (!motionPreference.matches) elapsed += delta;

      const damping = 1 - Math.exp(-delta * 2.8);
      pointerX += (targetX - pointerX) * damping;
      pointerY += (targetY - pointerY) * damping;
      globe.rotation.y = elapsed * 0.045;
      globe.rotation.x = 0.3 + Math.sin(elapsed * 0.08) * 0.1;
      orbits.rotation.y = 0.2 - elapsed * 0.025;
      orbits.rotation.z = -0.3 + Math.sin(elapsed * 0.06) * 0.12;
      particles.rotation.y = elapsed * 0.006;
      world.rotation.y = pointerX * 0.045;
      world.rotation.x = pointerY * 0.035;

      renderer.render(scene, camera);
      if (!motionPreference.matches) frameId = requestAnimationFrame(render);
    };

    const schedule = () => {
      if (!frameId && !disposed && !contextLost && !document.hidden) {
        frameId = requestAnimationFrame(render);
      }
    };

    const resize = () => {
      const nextWidth = Math.max(container.clientWidth, 1);
      const nextHeight = Math.max(container.clientHeight, 1);
      const nextRatio = Math.min(window.devicePixelRatio || 1, nextWidth < 768 ? 1 : 1.5);
      if (width === nextWidth && height === nextHeight && pixelRatio === nextRatio) return;
      width = nextWidth;
      height = nextHeight;
      pixelRatio = nextRatio;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setPixelRatio(pixelRatio);
      renderer.setSize(width, height, false);
      // Preserve the composition on narrow screens without enlarging the canvas.
      world.position.set(width < 768 ? 17 : 29, width < 768 ? 6 : 3, -8);
      world.scale.setScalar(width < 768 ? 0.8 : 1);
      schedule();
    };

    const syncAnimation = () => {
      cancelAnimationFrame(frameId);
      frameId = 0;
      previousTime = null;
      if (motionPreference.matches) {
        targetX = targetY = pointerX = pointerY = 0;
      }
      schedule();
    };

    const handlePointer = (event: PointerEvent) => {
      if (motionPreference.matches || coarsePointer.matches || event.pointerType !== 'mouse') return;
      targetX = (event.clientX / Math.max(window.innerWidth, 1)) * 2 - 1;
      targetY = (event.clientY / Math.max(window.innerHeight, 1)) * 2 - 1;
    };
    const resetPointer = () => {
      targetX = targetY = 0;
    };
    const handleContextLost = (event: Event) => {
      event.preventDefault();
      contextLost = true;
      renderer.domElement.style.opacity = '0';
      syncAnimation();
    };
    const handleContextRestored = () => {
      contextLost = false;
      renderer.domElement.style.opacity = '1';
      syncAnimation();
    };

    window.addEventListener('resize', resize, { passive: true });
    window.addEventListener('pointermove', handlePointer, { passive: true });
    window.addEventListener('blur', resetPointer);
    document.addEventListener('visibilitychange', syncAnimation);
    motionPreference.addEventListener('change', syncAnimation);
    renderer.domElement.addEventListener('webglcontextlost', handleContextLost);
    renderer.domElement.addEventListener('webglcontextrestored', handleContextRestored);
    const observer = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(resize) : null;
    observer?.observe(container);
    resize();

    return () => {
      disposed = true;
      cancelAnimationFrame(frameId);
      observer?.disconnect();
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', handlePointer);
      window.removeEventListener('blur', resetPointer);
      document.removeEventListener('visibilitychange', syncAnimation);
      motionPreference.removeEventListener('change', syncAnimation);
      renderer.domElement.removeEventListener('webglcontextlost', handleContextLost);
      renderer.domElement.removeEventListener('webglcontextrestored', handleContextRestored);
      geometries.forEach((geometry) => geometry.dispose());
      materials.forEach((material) => material.dispose());
      renderer.dispose();
      renderer.forceContextLoss();
      renderer.domElement.remove();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse at 82% 20%, rgba(37, 99, 235, 0.06), transparent 52%), radial-gradient(ellipse at 8% 75%, rgba(14, 165, 233, 0.04), transparent 46%)',
      }}
    />
  );
}
