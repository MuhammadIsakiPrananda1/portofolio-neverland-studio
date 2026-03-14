import React, { useEffect, useRef } from 'react';
import '../../css/custom-cursor.css';

const CustomCursor = () => {
    const dotRef = useRef(null);
    const trailerRef = useRef(null);

    useEffect(() => {
        const dot = dotRef.current;
        const trailer = trailerRef.current;

        if (!dot || !trailer) return;

        let mouseX = 0;
        let mouseY = 0;
        let trailerX = 0;
        let trailerY = 0;

        // Event listener untuk posisi mouse
        const onMouseMove = (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            // Deteksi jika mouse berada di atas elemen interaktif
            const interactable = e.target.closest('a, button, input, select, textarea, .cursor-interactive');
            const interacting = interactable !== null;
            
            if (interacting) {
                trailer.classList.add('hover');
            } else {
                trailer.classList.remove('hover');
            }
        };

        // Loop animasi untuk pergerakan halus (Lerp)
        const animate = () => {
            // Menghitung jarak untuk efek trailing (delay 15%)
            const dx = mouseX - trailerX;
            const dy = mouseY - trailerY;
            
            trailerX += dx * 0.15;
            trailerY += dy * 0.15;

            // Update posisi elemen
            dot.style.transform = `translate(${mouseX - dot.offsetWidth / 2}px, ${mouseY - dot.offsetHeight / 2}px)`;
            trailer.style.transform = `translate(${trailerX - trailer.offsetWidth / 2}px, ${trailerY - trailer.offsetHeight / 2}px)`;
            
            requestAnimationFrame(animate);
        };

        window.addEventListener('mousemove', onMouseMove);
        const animationFrame = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            cancelAnimationFrame(animationFrame);
        };
    }, []);

    return (
        <>
            <div ref={dotRef} className="cursor-dot"></div>
            <div ref={trailerRef} className="cursor-trailer"></div>
        </>
    );
};

export default CustomCursor;