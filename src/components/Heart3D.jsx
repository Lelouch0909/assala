import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import './Heart3D.css';

const Heart3D = () => {
  const canvasRef = useRef(null);
  const sceneRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);
    sceneRef.current = scene;

    // caméra un peu plus proche, FOV réduit pour mieux voir le coeur
    const camera = new THREE.PerspectiveCamera(
      60,
      canvasRef.current.offsetWidth / canvasRef.current.offsetHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 3);
    scene.add(camera);
    camera.lookAt(scene.position);

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(canvasRef.current.offsetWidth, canvasRef.current.offsetHeight);

    const clock = new THREE.Clock();

    // Créer une géométrie de cœur 3D procédurale
    const createHeartShape = () => {
      const shape = new THREE.Shape();
      const x = 0, y = 0;
      shape.moveTo(x + 0.5, y + 0.5);
      shape.bezierCurveTo(x + 0.5, y + 0.5, x + 0.4, y, x, y);
      shape.bezierCurveTo(x - 0.6, y, x - 0.6, y + 0.7, x - 0.6, y + 0.7);
      shape.bezierCurveTo(x - 0.6, y + 1.1, x - 0.3, y + 1.54, x + 0.5, y + 1.9);
      shape.bezierCurveTo(x + 1.2, y + 1.54, x + 1.6, y + 1.1, x + 1.6, y + 0.7);
      shape.bezierCurveTo(x + 1.6, y + 0.7, x + 1.6, y, x + 1.0, y);
      shape.bezierCurveTo(x + 0.7, y, x + 0.5, y + 0.5, x + 0.5, y + 0.5);
      return shape;
    };

    const heartShape = createHeartShape();
    const extrudeSettings = { depth: 0.4, bevelEnabled: true, bevelSegments: 2, steps: 2, bevelSize: 0.1, bevelThickness: 0.1 };
    const heartGeometry = new THREE.ExtrudeGeometry(heartShape, extrudeSettings);
    heartGeometry.center();

    const heartMeshMaterial = new THREE.MeshStandardMaterial({
      color: 0xff3366,
      metalness: 0.3,
      roughness: 0.4,
      emissive: 0xff1144,
      emissiveIntensity: 0.2
    });

    const heartMesh = new THREE.Mesh(heartGeometry, heartMeshMaterial);
    heartMesh.scale.set(0.4, 0.4, 0.4);
    heartMesh.rotation.z = Math.PI;
    scene.add(heartMesh);

    // Ajouter des lumières pour voir le cœur 3D
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0xff99cc, 1, 100);
    pointLight1.position.set(2, 2, 2);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xffccff, 0.8, 100);
    pointLight2.position.set(-2, -1, 2);
    scene.add(pointLight2);

    // Create heart particles using shaders
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
        vec3 myOffset = vec3(t, 1.0, 0.0);
        myOffset = vec3(
          radius * 16.0 * pow(sin(t), 2.0) * sin(t),
          radius * (13.0 * cos(t) - 5.0 * cos(2.0 * t) - 2.0 * cos(3.0 * t) - cos(4.0 * t)),
          0.15 * (a * (random1 - 0.5)) * sin(abs(10.0 * (sin(0.2 * uTime + 0.2 * random))) * t)
        );
        vec3 displacedPosition = myOffset;
        vec4 modelPosition = modelMatrix * vec4(displacedPosition.xyz, 1.0);
        
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

    const heartMaterial = new THREE.ShaderMaterial({
      fragmentShader,
      vertexShader,
      uniforms: {
        uTime: { value: 0 },
        // coeur plus grand pour être bien visible
        uSize: { value: 0.5 }
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
      colors[i3 + 0] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;
      speeds[i] = Math.random() * 12.5 * Math.PI;
    }

    instancedGeometry.setAttribute(
      'random',
      new THREE.InstancedBufferAttribute(randoms, 1, false)
    );
    instancedGeometry.setAttribute(
      'random1',
      new THREE.InstancedBufferAttribute(randoms1, 1, false)
    );
    instancedGeometry.setAttribute(
      'aScale',
      new THREE.InstancedBufferAttribute(scales, 1, false)
    );
    instancedGeometry.setAttribute(
      'aSpeed',
      new THREE.InstancedBufferAttribute(speeds, 1, false)
    );
    instancedGeometry.setAttribute(
      'aColor',
      new THREE.InstancedBufferAttribute(colors, 3, false)
    );

    const particles = new THREE.Mesh(instancedGeometry, heartMaterial);
    scene.add(particles);

    // Animation loop
    let animationId;
    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      // Update shader time
      heartMaterial.uniforms.uTime.value = elapsedTime;

      // Animer le cœur 3D principal
      heartMesh.rotation.y = Math.sin(elapsedTime * 0.3) * 0.1;
      heartMesh.scale.set(
        0.4 + Math.sin(elapsedTime * 2) * 0.02,
        0.4 + Math.sin(elapsedTime * 2) * 0.02,
        0.4 + Math.sin(elapsedTime * 2) * 0.02
      );

      // Petite rotation pour les particules
      particles.rotation.y += 0.002;
      particles.rotation.x += 0.001;

      // Render
      renderer.render(scene, camera);
      animationId = requestAnimationFrame(animate);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      if (!canvasRef.current) return;
      const width = canvasRef.current.offsetWidth;
      const height = canvasRef.current.offsetHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // Mouse movement for camera
    const handleMouseMove = (e) => {
      if (!canvasRef.current) return;
      const rect = canvasRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const normalizedX = (x / rect.width) * 2 - 1;
      const normalizedY = -(y / rect.height) * 2 + 1;

      camera.position.x += (normalizedX * 0.2 - camera.position.x) * 0.05;
      camera.position.y += (normalizedY * 0.2 - camera.position.y) * 0.05;
      camera.lookAt(scene.position);
    };

    canvasRef.current.addEventListener('mousemove', handleMouseMove);

    // Cleanup
    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
      window.removeEventListener('resize', handleResize);
      if (canvasRef.current) {
        canvasRef.current.removeEventListener('mousemove', handleMouseMove);
      }
      renderer.dispose();
      instancedGeometry.dispose();
      heartMaterial.dispose();
    };
  }, []);

  return (
    <div className="heart3d-container">
      <canvas ref={canvasRef} className="heart3d-canvas" />
      <h1 className="heart3d-title">Pour Toi ❤️</h1>
    </div>
  );
};

export default Heart3D;
