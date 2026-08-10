import { useEffect, type RefObject } from 'react';
import * as THREE from 'three';
import { getLenis } from './useLenis';
import { usePrefersReducedMotion } from './useMediaQuery';

export function useThreeScene(canvasRef: RefObject<HTMLCanvasElement | null>): void {
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || reduced) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      55,
      window.innerWidth / window.innerHeight,
      0.1,
      100,
    );
    camera.position.z = 6;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);

    const sphereGeo = new THREE.IcosahedronGeometry(1.6, 2);
    const sphereMat = new THREE.MeshBasicMaterial({
      color: 0x00d4ff,
      wireframe: true,
      transparent: true,
      opacity: 0.22,
    });
    const sphere = new THREE.Mesh(sphereGeo, sphereMat);
    sphere.position.set(2.2, 0.4, 0);
    scene.add(sphere);

    const coreGeo = new THREE.IcosahedronGeometry(0.9, 1);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0x0088aa,
      transparent: true,
      opacity: 0.08,
    });
    const core = new THREE.Mesh(coreGeo, coreMat);
    core.position.copy(sphere.position);
    scene.add(core);

    const ringGeo = new THREE.TorusGeometry(2.15, 0.012, 16, 100);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xffc93c,
      transparent: true,
      opacity: 0.35,
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.position.copy(sphere.position);
    ring.rotation.x = Math.PI / 2.4;
    scene.add(ring);

    const ring2 = ring.clone();
    ring2.rotation.x = Math.PI / 1.6;
    ring2.material = ringMat.clone();
    (ring2.material as THREE.MeshBasicMaterial).color.set(0xff2d95);
    (ring2.material as THREE.MeshBasicMaterial).opacity = 0.2;
    scene.add(ring2);

    const particleCount = 900;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const colorA = new THREE.Color(0x00d4ff);
    const colorB = new THREE.Color(0xffc93c);
    const colorC = new THREE.Color(0xff2d95);

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      const radius = 3 + Math.random() * 8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta) * 0.6;
      positions[i3 + 2] = radius * Math.cos(phi) - 2;

      const mix = Math.random();
      const c =
        mix < 0.6
          ? colorA.clone().lerp(colorB, mix / 0.6)
          : colorB.clone().lerp(colorC, (mix - 0.6) / 0.4);
      colors[i3] = c.r;
      colors[i3 + 1] = c.g;
      colors[i3 + 2] = c.b;
    }

    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.025,
      vertexColors: true,
      transparent: true,
      opacity: 0.7,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    let scrollY = 0;
    let frame = 0;
    let rafId = 0;
    let alive = true;
    let unsubLenis: (() => void) | undefined;
    let retryId: ReturnType<typeof setInterval> | undefined;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = (e.clientY / window.innerHeight) * 2 - 1;
    };

    const onScroll = () => {
      scrollY = window.scrollY;
    };

    const bindLenis = () => {
      const lenis = getLenis();
      if (!lenis || unsubLenis) return Boolean(unsubLenis);
      const handler = ({ scroll }: { scroll: number }) => {
        scrollY = scroll;
      };
      lenis.on('scroll', handler);
      unsubLenis = () => lenis.off('scroll', handler);
      return true;
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('scroll', onScroll, { passive: true });
    if (!bindLenis()) {
      retryId = setInterval(() => {
        if (bindLenis() && retryId) clearInterval(retryId);
      }, 50);
      setTimeout(() => {
        if (retryId) clearInterval(retryId);
      }, 2000);
    }

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };
    window.addEventListener('resize', onResize);

    const animate = () => {
      if (!alive) return;
      frame += 0.005;
      targetX += (mouseX - targetX) * 0.04;
      targetY += (mouseY - targetY) * 0.04;

      sphere.rotation.y = frame * 0.6 + targetX * 0.4;
      sphere.rotation.x = frame * 0.25 + targetY * 0.3;
      core.rotation.y = -frame * 0.4;
      core.rotation.z = frame * 0.2;

      ring.rotation.z = frame * 0.3;
      ring2.rotation.z = -frame * 0.2;

      particles.rotation.y = frame * 0.08 + targetX * 0.15;
      particles.rotation.x = targetY * 0.1;

      const scrollOffset = scrollY * 0.0008;
      sphere.position.y = 0.4 - scrollOffset;
      core.position.y = sphere.position.y;
      ring.position.y = sphere.position.y;
      ring2.position.y = sphere.position.y;

      camera.position.x = targetX * 0.35;
      camera.position.y = -targetY * 0.2;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
      rafId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      alive = false;
      cancelAnimationFrame(rafId);
      if (retryId) clearInterval(retryId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('scroll', onScroll);
      unsubLenis?.();
      sphereGeo.dispose();
      sphereMat.dispose();
      coreGeo.dispose();
      coreMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      (ring2.material as THREE.Material).dispose();
      particleGeo.dispose();
      particleMat.dispose();
      renderer.dispose();
    };
  }, [canvasRef, reduced]);
}
