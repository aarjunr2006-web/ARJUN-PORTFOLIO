import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ThreeCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Check for reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const container = containerRef.current;
    const width = window.innerWidth;
    const height = window.innerHeight;

    // 1. Scene setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0A0A0E, 0.0015);

    // 2. Camera setup
    const camera = new THREE.PerspectiveCamera(60, width / height, 1, 3000);
    camera.position.z = 800;
    camera.position.y = 200;

    // 3. Renderer setup
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 4. 3D Wave Particle System
    const particleCount = 1800;
    const particlesGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const scales = new Float32Array(particleCount);

    let idx = 0;
    const rows = 45;
    const cols = 40;
    const spacing = 45;

    for (let ix = 0; ix < cols; ix++) {
      for (let iy = 0; iy < rows; iy++) {
        positions[idx] = ix * spacing - (cols * spacing) / 2; // x
        positions[idx + 1] = 0; // y
        positions[idx + 2] = iy * spacing - (rows * spacing) / 2; // z
        scales[ix * rows + iy] = 1;
        idx += 3;
      }
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    // Custom Particle Material with Red Glow
    const particleMaterial = new THREE.PointsMaterial({
      color: 0xEF4444,
      size: 3.5,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
    });

    const particleSystem = new THREE.Points(particlesGeometry, particleMaterial);
    particleSystem.position.y = -200;
    scene.add(particleSystem);

    // 5. Floating 3D Geometries (Wireframe Dodecahedrons & Octahedrons)
    const floatGroup = new THREE.Group();
    const geom1 = new THREE.IcosahedronGeometry(60, 1);
    const mat1 = new THREE.MeshBasicMaterial({
      color: 0xE11D48,
      wireframe: true,
      transparent: true,
      opacity: 0.15,
    });

    const geom2 = new THREE.OctahedronGeometry(45, 0);
    const mat2 = new THREE.MeshBasicMaterial({
      color: 0xFFFFFF,
      wireframe: true,
      transparent: true,
      opacity: 0.1,
    });

    const meshes: { mesh: THREE.Mesh; rotSpeedX: number; rotSpeedY: number; floatSpeed: number; basePosY: number }[] = [];

    for (let i = 0; i < 6; i++) {
      const isAlt = i % 2 === 0;
      const mesh = new THREE.Mesh(isAlt ? geom1 : geom2, isAlt ? mat1 : mat2);
      mesh.position.x = (Math.random() - 0.5) * 1400;
      mesh.position.y = (Math.random() - 0.5) * 800;
      mesh.position.z = (Math.random() - 0.5) * 1000;
      floatGroup.add(mesh);

      meshes.push({
        mesh,
        rotSpeedX: (Math.random() - 0.5) * 0.008,
        rotSpeedY: (Math.random() - 0.5) * 0.008,
        floatSpeed: (Math.random() + 0.5) * 0.003,
        basePosY: mesh.position.y,
      });
    }

    scene.add(floatGroup);

    // 6. Dynamic Lighting
    const pointLight = new THREE.PointLight(0xEF4444, 2, 1000);
    pointLight.position.set(0, 200, 400);
    scene.add(pointLight);

    const ambientLight = new THREE.AmbientLight(0x0A0A0E, 1);
    scene.add(ambientLight);

    // 7. Mouse Parallax Control
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX - width / 2) * 0.4;
      mouseY = (e.clientY - height / 2) * 0.4;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // 8. Resize Handler
    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // 9. Animation Loop
    let animationFrameId: number;
    let count = 0;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      count += 0.03;

      // Update Particle Sine Waves
      const posAttr = particleSystem.geometry.attributes.position as THREE.BufferAttribute;
      const posArray = posAttr.array as Float32Array;

      let i = 0;
      for (let ix = 0; ix < cols; ix++) {
        for (let iy = 0; iy < rows; iy++) {
          posArray[i + 1] = Math.sin((ix + count) * 0.3) * 35 + Math.sin((iy + count) * 0.5) * 35;
          i += 3;
        }
      }
      posAttr.needsUpdate = true;

      // Animate Floating Geometries
      meshes.forEach(({ mesh, rotSpeedX, rotSpeedY, floatSpeed, basePosY }) => {
        mesh.rotation.x += rotSpeedX;
        mesh.rotation.y += rotSpeedY;
        mesh.position.y = basePosY + Math.sin(count * floatSpeed * 2) * 25;
      });

      // Smooth Camera Parallax Lerp
      targetX += (mouseX - targetX) * 0.05;
      targetY += (-mouseY - targetY) * 0.05;

      camera.position.x = targetX;
      camera.position.y = 200 + targetY * 0.5;
      camera.lookAt(scene.position);

      pointLight.position.x = targetX * 1.5;
      pointLight.position.y = 200 + targetY * 1.5;

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      scene.clear();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-80"
      aria-hidden="true"
    />
  );
}
