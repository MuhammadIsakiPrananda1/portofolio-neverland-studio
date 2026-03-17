import { useEffect, useRef } from 'react';
import './custom-cursor.css';

const TRAIL_LENGTH = 16;
const LERP_FACTOR = 0.12;

const isTouchDevice = () =>
  typeof window !== 'undefined' &&
  (window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window);

export default function CustomCursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Skip rendering on touch/mobile — saves DOM nodes + CSS cost
  if (typeof window !== 'undefined' && isTouchDevice()) return null;

  useEffect(() => {
    if (isTouchDevice()) return;

    const ring = ringRef.current;
    const canvas = canvasRef.current;
    if (!ring || !canvas) return;

    const ctx = canvas.getContext('2d')!;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    let mouseX = -200;
    let mouseY = -200;
    let ringX = -200;
    let ringY = -200;
    let isVisible = false;
    const trail: { x: number; y: number }[] = [];

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!isVisible) {
        ringX = mouseX;
        ringY = mouseY;
        isVisible = true;
        ring.style.opacity = '1';
        canvas.style.opacity = '1';
      }

      const interactable = (e.target as Element).closest(
        'a, button, input, select, textarea, [role="button"], [data-cursor]',
      );
      ring.classList.toggle('hover', interactable !== null);
    };

    const onMouseDown = () => ring.classList.add('clicking');
    const onMouseUp = () => ring.classList.remove('clicking');

    const onMouseLeave = () => {
      ring.style.opacity = '0';
      canvas.style.opacity = '0';
      isVisible = false;
    };

    const onMouseEnter = () => {
      ring.style.opacity = '1';
      canvas.style.opacity = '1';
      isVisible = true;
    };

    let rafId: number;
    const animate = () => {
      const dx = mouseX - ringX;
      const dy = mouseY - ringY;
      ringX += dx * LERP_FACTOR;
      ringY += dy * LERP_FACTOR;

      const rw = ring.offsetWidth;
      const rh = ring.offsetHeight;
      ring.style.transform = `translate(${ringX - rw / 2}px, ${ringY - rh / 2}px)`;

      trail.push({ x: mouseX, y: mouseY });
      if (trail.length > TRAIL_LENGTH) trail.shift();

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      trail.forEach((point, i) => {
        const progress = i / (TRAIL_LENGTH - 1);
        const alpha = Math.pow(progress, 2) * 0.75;
        const radius = Math.pow(progress, 0.6) * 5;

        if (alpha < 0.01 || radius < 0.3) return;

        const hue = 10 - progress * 10;
        const grad = ctx.createRadialGradient(point.x, point.y, 0, point.x, point.y, radius * 3.5);
        grad.addColorStop(0, `hsla(${hue}, 90%, 70%, ${alpha})`);
        grad.addColorStop(0.4, `hsla(${hue}, 80%, 60%, ${alpha * 0.5})`);
        grad.addColorStop(1, `hsla(${hue}, 70%, 55%, 0)`);

        ctx.beginPath();
        ctx.arc(point.x, point.y, radius * 3.5, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      });

      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.documentElement.addEventListener('mouseleave', onMouseLeave);
    document.documentElement.addEventListener('mouseenter', onMouseEnter);
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.documentElement.removeEventListener('mouseleave', onMouseLeave);
      document.documentElement.removeEventListener('mouseenter', onMouseEnter);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <canvas ref={canvasRef} className="cursor-canvas" style={{ opacity: 0 }} />
      <div ref={ringRef} className="cursor-ring" style={{ opacity: 0 }} />
    </>
  );
}
