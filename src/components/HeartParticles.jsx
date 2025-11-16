import { useEffect, useRef } from 'react';
import './HeartParticles.css';

const HeartParticles = () => {
  const canvasRef = useRef(null);
  const animationIdRef = useRef(null);
  const configRef = useRef({
    particleCount: 32,
    speed: 1,
    colorScheme: 'rainbow',
    mouseInfluence: 50,
    particleSize: 10
  });
  const stateRef = useRef({
    trails: [],
    heartPath: [],
    mouseX: 0,
    mouseY: 0,
    mouseActive: false,
    animationRunning: false
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let canvasWidth = canvas.width = canvas.offsetWidth;
    let canvasHeight = canvas.height = canvas.offsetHeight;

    const config = configRef.current;
    const state = stateRef.current;

    // Initialize heart path points
    const initHeartPath = () => {
      state.heartPath = [];
      const PI2 = 6.28318;
      const steps = Math.max(32, config.particleCount);

      for (let i = 0; i < steps; i++) {
        const t = (i / steps) * PI2;
        state.heartPath.push([
          canvasWidth/2 + 180 * Math.pow(Math.sin(t), 3),
          canvasHeight/2 + 10 * (-(15 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t)))
        ]);
      }
    };

    // Initialize particles
    const initParticles = () => {
      state.trails = [];
      if (state.heartPath.length === 0) initHeartPath();

      for (let i = 0; i < config.particleCount; i++) {
        const particles = [];
        const x = Math.random() * canvasWidth;
        const y = Math.random() * canvasHeight;

        for (let k = 0; k < config.particleCount; k++) {
          let hue, saturation = Math.random() * 40 + 60;
          let brightness = Math.random() * 60 + 20;

          switch(config.colorScheme) {
            case 'red': hue = Math.random() * 20 + 350; break;
            case 'blue': hue = Math.random() * 20 + 200; break;
            case 'green': hue = Math.random() * 20 + 100; break;
            case 'monochrome': hue = 0; saturation = 0; break;
            default: hue = i/config.particleCount * 360;
          }

          particles.push({
            x, y,
            velX: 0, velY: 0,
            radius: ((1 - k/config.particleCount) + 1) * config.particleSize/2,
            speed: Math.random() + 1,
            targetIndex: Math.floor(Math.random() * state.heartPath.length),
            direction: i % 2 * 2 - 1,
            friction: Math.random() * 0.2 + 0.7,
            color: `hsla(${hue},${saturation}%,${brightness}%,0.1)`
          });
        }
        state.trails.push(particles);
      }
    };

    // Render a single particle
    const renderParticle = (particle) => {
      ctx.fillStyle = particle.color;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      ctx.fill();
    };

    // Main animation loop
    const animationLoop = () => {
      if (!state.animationRunning) return;

      try {
        ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
        ctx.fillRect(0, 0, canvasWidth, canvasHeight);

        state.trails.forEach(trail => {
          if (!trail || !trail.length) return;

          const leader = trail[0];
          const target = state.heartPath[leader.targetIndex % state.heartPath.length];
          if (!target) return;

          // Mouse influence
          if (state.mouseActive && config.mouseInfluence > 0) {
            const dx = state.mouseX - leader.x;
            const dy = state.mouseY - leader.y;
            const dist = Math.sqrt(dx*dx + dy*dy);

            if (dist < 300) {
              const force = (1 - dist/300) * (config.mouseInfluence/20);
              leader.velX += dx/dist * force;
              leader.velY += dy/dist * force;
            }
          }

          // Move toward target
          const dx = leader.x - target[0];
          const dy = leader.y - target[1];
          const dist = Math.sqrt(dx*dx + dy*dy);

          if (dist < 10) {
            if (Math.random() > 0.95) {
              leader.targetIndex = Math.floor(Math.random() * state.heartPath.length);
            } else {
              if (Math.random() > 0.99) leader.direction *= -1;
              leader.targetIndex += leader.direction;
              leader.targetIndex = (leader.targetIndex + state.heartPath.length) % state.heartPath.length;
            }
          }

          // Update physics
          leader.velX += -dx/dist * leader.speed * config.speed;
          leader.velY += -dy/dist * leader.speed * config.speed;
          leader.x += leader.velX;
          leader.y += leader.velY;
          leader.velX *= leader.friction;
          leader.velY *= leader.friction;

          // Render trail
          renderParticle(leader);
          for (let k = 1; k < trail.length; k++) {
            trail[k].x -= (trail[k].x - trail[k-1].x) * 0.7;
            trail[k].y -= (trail[k].y - trail[k-1].y) * 0.7;
            renderParticle(trail[k]);
          }
        });
      } catch (error) {
        console.error("Animation error:", error);
      }

      animationIdRef.current = requestAnimationFrame(animationLoop);
    };

    // Mouse tracking
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      state.mouseX = e.clientX - rect.left;
      state.mouseY = e.clientY - rect.top;
      state.mouseActive = true;
    };

    const handleMouseLeave = () => {
      state.mouseActive = false;
    };

    // Window resize
    const handleResize = () => {
      canvasWidth = canvas.width = canvas.offsetWidth;
      canvasHeight = canvas.height = canvas.offsetHeight;
      initHeartPath();
    };

    // Initialize
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('resize', handleResize);

    state.animationRunning = true;
    state.mouseX = canvasWidth / 2;
    state.mouseY = canvasHeight / 2;

    initHeartPath();
    initParticles();
    animationLoop();

    // Cleanup
    return () => {
      state.animationRunning = false;
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="heart-particles-container">
      <canvas ref={canvasRef} className="heart-particles-canvas" />
    </div>
  );
};

export default HeartParticles;

