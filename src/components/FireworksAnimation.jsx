import { useEffect, useRef } from 'react';
import './FireworksAnimation.css';
const FireworksAnimation = () => {
  const canvasRef = useRef(null);
  const animationIdRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let canvasWidth = canvas.width = canvas.offsetWidth;
    let canvasHeight = canvas.height = canvas.offsetHeight;
    const fireworks = [];
    const particles = [];
    class Firework {
      constructor() {
        this.x = Math.random() * canvasWidth;
        this.y = canvasHeight;
        this.targetY = Math.random() * canvasHeight * 0.4 + 50;
        this.speed = Math.random() * 2 + 5;
        this.radius = 3;
        this.color = `hsl(${Math.random() * 360}, 100%, 60%)`;
        this.trail = [];
      }
      update() {
        if (this.y > this.targetY) {
          this.y -= this.speed;
          this.trail.push({ x: this.x, y: this.y });
          if (this.trail.length > 10) this.trail.shift();
          return false;
        }
        return true;
      }
      draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        this.trail.forEach((point, index) => {
          ctx.fillStyle = this.color.replace('60%', `${60 * (index / this.trail.length)}%`);
          ctx.beginPath();
          ctx.arc(point.x, point.y, this.radius * (index / this.trail.length), 0, Math.PI * 2);
          ctx.fill();
        });
      }
    }
    class Particle {
      constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.velocity = {
          x: (Math.random() - 0.5) * 8,
          y: (Math.random() - 0.5) * 8
        };
        this.radius = Math.random() * 3 + 1;
        this.alpha = 1;
        this.decay = Math.random() * 0.02 + 0.01;
        this.gravity = 0.1;
      }
      update() {
        this.velocity.y += this.gravity;
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.alpha -= this.decay;
        return this.alpha > 0;
      }
      draw() {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }
    const createFirework = () => {
      if (fireworks.length < 5) {
        fireworks.push(new Firework());
      }
    };
    const createParticles = (x, y, color) => {
      const particleCount = 50;
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle(x, y, color));
      }
    };
    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvasWidth, canvasHeight);
      if (Math.random() < 0.03) {
        createFirework();
      }
      for (let i = fireworks.length - 1; i >= 0; i--) {
        fireworks[i].draw();
        if (fireworks[i].update()) {
          createParticles(fireworks[i].x, fireworks[i].y, fireworks[i].color);
          fireworks.splice(i, 1);
        }
      }
      for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].draw();
        if (!particles[i].update()) {
          particles.splice(i, 1);
        }
      }
      animationIdRef.current = requestAnimationFrame(animate);
    };
    const handleResize = () => {
      canvasWidth = canvas.width = canvas.offsetWidth;
      canvasHeight = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', handleResize);
    animate();
    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return (
    <div className="fireworks-container">
      <canvas ref={canvasRef} className="fireworks-canvas" />
    </div>
  );
};
export default FireworksAnimation;
