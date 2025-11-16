import { useEffect, useRef } from 'react';
import './ConfettiAnimation.css';
const ConfettiAnimation = () => {
  const canvasRef = useRef(null);
  const animationIdRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let canvasWidth = canvas.width = canvas.offsetWidth;
    let canvasHeight = canvas.height = canvas.offsetHeight;
    const confetti = [];
    const confettiCount = 100;
    const gravity = 0.5;
    const terminalVelocity = 5;
    const drag = 0.075;
    const colors = [
      '#ff69b4', '#ff1493', '#ff6eb4', '#ffc0cb', '#ffb6c1',
      '#ffd700', '#ffeb3b', '#fff176', '#ff9800', '#ff5722'
    ];
    class Confetto {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * canvasWidth;
        this.y = Math.random() * canvasHeight - canvasHeight;
        this.rotation = Math.random() * 360;
        this.rotationSpeed = Math.random() * 10 - 5;
        this.velocity = {
          x: Math.random() * 6 - 3,
          y: Math.random() * -4 - 2
        };
        this.width = Math.random() * 8 + 6;
        this.height = Math.random() * 4 + 3;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.opacity = 1;
      }
      update() {
        this.velocity.y += gravity;
        this.velocity.x += Math.random() * 0.4 - 0.2;
        this.velocity.y = Math.min(this.velocity.y, terminalVelocity);
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.rotation += this.rotationSpeed;
        this.velocity.x *= (1 - drag);
        this.velocity.y *= (1 - drag);
        if (this.y > canvasHeight + 20) {
          this.reset();
        }
      }
      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate((this.rotation * Math.PI) / 180);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.opacity;
        ctx.fillRect(-this.width / 2, -this.height / 2, this.width, this.height);
        ctx.restore();
      }
    }
    for (let i = 0; i < confettiCount; i++) {
      confetti.push(new Confetto());
    }
    const animate = () => {
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      confetti.forEach(c => {
        c.update();
        c.draw();
      });
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
    <div className="confetti-container">
      <canvas ref={canvasRef} className="confetti-canvas" />
    </div>
  );
};
export default ConfettiAnimation;
