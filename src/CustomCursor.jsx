import { useEffect, useRef } from 'react';
import './custom-cursor.css';

const TRAIL_LENGTH = 16;
const LERP_FACTOR = 0.12;

// Detect touch/mobile device — no custom cursor needed
const isTouchDevice = () =>
    typeof window !== 'undefined' &&
    (window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window);

export default function CustomCursor() {
    const ringRef = useRef(null);
    const canvasRef = useRef(null);

    // Don't render anything on touch/mobile — saves DOM nodes + CSS cost
    if (typeof window !== 'undefined' && isTouchDevice()) return null;

    useEffect(() => {
        // Skip entirely on touch/mobile devices
        if (isTouchDevice()) return;

        const ring = ringRef.current;
        const canvas = canvasRef.current;
        if (!ring || !canvas) return;

        const ctx = canvas.getContext('2d');

        // Resize canvas to fullscreen
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
        const trail = [];

        const onMouseMove = (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            if (!isVisible) {
                // Snap ring to mouse first time so it doesn't fly in from corner
                ringX = mouseX;
                ringY = mouseY;
                isVisible = true;
                ring.style.opacity = '1';
                canvas.style.opacity = '1';
            }

            const interactable = e.target.closest(
                'a, button, input, select, textarea, [role="button"], [data-cursor]'
            );
            const hovering = interactable !== null;

            if (hovering) {
                ring.classList.add('hover');
            } else {
                ring.classList.remove('hover');
            }
        };

        const onMouseDown = () => {
            ring.classList.add('clicking');
        };

        const onMouseUp = () => {
            ring.classList.remove('clicking');
        };

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

        let rafId;
        const animate = () => {
            // Smooth lerp of ring toward mouse
            const dx = mouseX - ringX;
            const dy = mouseY - ringY;
            ringX += dx * LERP_FACTOR;
            ringY += dy * LERP_FACTOR;

            // Move ring centered on lerp position
            const rw = ring.offsetWidth;
            const rh = ring.offsetHeight;
            ring.style.transform = `translate(${ringX - rw / 2}px, ${ringY - rh / 2}px)`;

            // Push current mouse into trail
            trail.push({ x: mouseX, y: mouseY });
            if (trail.length > TRAIL_LENGTH) trail.shift();

            // Draw particle trail on canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            trail.forEach((point, i) => {
                const progress = i / (TRAIL_LENGTH - 1); // 0 = oldest, 1 = newest
                const alpha = Math.pow(progress, 2) * 0.75;
                const radius = Math.pow(progress, 0.6) * 5;

                if (alpha < 0.01 || radius < 0.3) return;

                // Gradient: dark red old → bright red new
                const hue = 10 - progress * 10; // 10 orange-red → 0 pure red

                const grad = ctx.createRadialGradient(
                    point.x, point.y, 0,
                    point.x, point.y, radius * 3.5
                );
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
