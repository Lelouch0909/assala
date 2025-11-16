import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import './Heart3D.css';

const Heart3D = () => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const container = containerRef.current;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);

    const camera = new THREE.PerspectiveCamera(
      75,
      container.offsetWidth / container.offsetHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 3.5);
    scene.add(camera);

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.offsetWidth, container.offsetHeight);

    const clock = new THREE.Clock();
    const textureLoader = new THREE.TextureLoader();
    let heartModel = null;
    let heartMaterial = null;

    // Load 3D heart model
    const loader = new GLTFLoader();
    loader.load(
      'https://assets.codepen.io/74321/heart.glb',
      (gltf) => {
        heartModel = gltf.scene.children[0];
        heartModel.scale.set(0.001, 0.001, 0.001);

        textureLoader.load(
          'https://assets.codepen.io/74321/3.png',
          (texture) => {
            heartModel.material = new THREE.MeshMatcapMaterial({
              matcap: texture,
              color: 0xff3366
            });

            // Animation d'échelle avec elastic easing
            let startTime = Date.now();
            const duration = 1500;
            const targetScale = 0.25;

            const animateScale = () => {
              const elapsed = Date.now() - startTime;
              if (elapsed < duration) {
                // Simple easing out
                const progress = elapsed / duration;
                const easeProgress = 1 - Math.pow(1 - progress, 3);
                const scale = targetScale * easeProgress;
                heartModel.scale.set(scale, scale, scale);
                requestAnimationFrame(animateScale);
              } else {
                heartModel.scale.set(targetScale, targetScale, targetScale);
              }
            };
            animateScale();
          }
        );

        scene.add(heartModel);
      },
      undefined,
      (error) => {
        console.error('Error loading heart model:', error);
      }
    );

    // Heart particles shader (exactly from original)
    const vertexShader = `
      #define M_PI 3.1415926535897932384626433832795
      uniform float uTime;
      uniform float uSize;
      attribute float aScale;
      attribute vec3 aColor;
      attribute float random;
      attribute float random1;
      attribute float aSpeed;
      varying vec3 vColor;
      varying vec2 vUv;

      void main() {
        float sign = 2.0 * (step(random, 0.5) - 0.5);
        float t = sign * mod(-uTime * aSpeed * 0.005 + 10.0 * aSpeed * aSpeed, M_PI);
        float a = pow(t, 2.0) * pow((t - sign * M_PI), 2.0);
        float radius = 0.08;
        vec3 myOffset = vec3(
          radius * 16.0 * pow(sin(t), 3.0),
          radius * (13.0 * cos(t) - 5.0 * cos(2.0 * t) - 2.0 * cos(3.0 * t) - cos(4.0 * t)),
          0.15 * (a * (random1 - 0.5)) * sin(abs(10.0 * (sin(0.2 * uTime + 0.2 * random))) * t)
        );
        vec4 modelPosition = modelMatrix * vec4(myOffset, 1.0);
        
        vec4 viewPosition = viewMatrix * modelPosition;
        viewPosition.xyz += position * aScale * uSize * pow(a, 0.5) * 0.5;
        gl_Position = projectionMatrix * viewPosition;
        
        vColor = aColor;
        vUv = uv;
      }
    `;

    const fragmentShader = `
      varying vec3 vColor;
      varying vec2 vUv;

      void main() {
        vec2 uv = vUv;
        vec3 color = vColor;
        float strength = distance(uv, vec2(0.5));
        strength *= 2.0;
        strength = 1.0 - strength;
        gl_FragColor = vec4(strength * color, 1.0);
      }
    `;

    heartMaterial = new THREE.ShaderMaterial({
      fragmentShader,
      vertexShader,
      uniforms: {
        uTime: { value: 0 },
        uSize: { value: 0.2 }
      },
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      transparent: true
    });

    const count = 3000;
    const scales = new Float32Array(count);
    const colors = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    const randoms = new Float32Array(count);
    const randoms1 = new Float32Array(count);
    const colorChoices = [
      '#ff66cc',
      '#ff99ff',
      '#ffccff',
      '#ff3366',
      '#ffffff'
    ];

    const squareGeometry = new THREE.PlaneGeometry(1, 1);
    const instancedGeometry = new THREE.InstancedBufferGeometry();
    Object.keys(squareGeometry.attributes).forEach(attr => {
      instancedGeometry.attributes[attr] = squareGeometry.attributes[attr];
    });
    instancedGeometry.index = squareGeometry.index;
    instancedGeometry.maxInstancedCount = count;

    for (let i = 0; i < count; i++) {
      const i3 = 3 * i;
      randoms[i] = Math.random();
      randoms1[i] = Math.random();
      scales[i] = Math.random() * 0.35;
      const colorIndex = Math.floor(Math.random() * colorChoices.length);
      const color = new THREE.Color(colorChoices[colorIndex]);
      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;
      speeds[i] = Math.random() * 12.5 * Math.PI;
    }

    instancedGeometry.setAttribute('random', new THREE.InstancedBufferAttribute(randoms, 1, false));
    instancedGeometry.setAttribute('random1', new THREE.InstancedBufferAttribute(randoms1, 1, false));
    instancedGeometry.setAttribute('aScale', new THREE.InstancedBufferAttribute(scales, 1, false));
    instancedGeometry.setAttribute('aSpeed', new THREE.InstancedBufferAttribute(speeds, 1, false));
    instancedGeometry.setAttribute('aColor', new THREE.InstancedBufferAttribute(colors, 3, false));

    const heartParticles = new THREE.Mesh(instancedGeometry, heartMaterial);
    scene.add(heartParticles);

    // Mouse movement
    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const width = rect.width;
      const height = rect.height;

      mouseX = (x / width - 0.5) * 0.4;
      mouseY = -(y / height - 0.5) * 0.4;
    };

    container.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    let animationId;
    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      if (heartMaterial) {
        heartMaterial.uniforms.uTime.value = elapsedTime;
      }

      if (heartModel) {
        heartModel.rotation.y = elapsedTime * 0.2;
      }

      // Smooth camera follow mouse
      camera.position.x += (mouseX - camera.position.x) * 0.05;
      camera.position.y += (mouseY - camera.position.y) * 0.05;

      camera.lookAt(scene.position);
      renderer.render(scene, camera);
      animationId = requestAnimationFrame(animate);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      if (!container) return;
      const width = container.offsetWidth;
      const height = container.offsetHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationId);
      renderer.dispose();
      instancedGeometry.dispose();
      heartMaterial.dispose();
      squareGeometry.dispose();
    };
  }, []);

  return (
    <div className="heart3d-container" ref={containerRef}>
      <canvas className="heart3d-canvas" ref={canvasRef} />
      <h1 className="heart3d-title">Para Ti</h1>
    </div>
  );
};

export default Heart3D;

