'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import Image from 'next/image';

export default function CustomCursor() {
    const [isHovered, setIsHovered] = useState(false);
    const [isClicked, setIsClicked] = useState(false);
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    // Fast Physics
    const springConfig = { damping: 40, stiffness: 2000 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    const [isTouchDevice, setIsTouchDevice] = useState(false);

    useEffect(() => {
        // Detect touch device
        const checkTouch = () => {
            setIsTouchDevice(window.matchMedia("(pointer: coarse)").matches);
        };
        checkTouch();
        window.addEventListener('resize', checkTouch);
        return () => window.removeEventListener('resize', checkTouch);
    }, []);

    if (isTouchDevice) return null;

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
        };

        const handleMouseDown = () => setIsClicked(true);
        const handleMouseUp = () => setIsClicked(false);

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            // Check for buttons, links, or any element with 'cursor-pointer' class
            const clickable = target.closest('button') || target.closest('a') || target.closest('.cursor-pointer');

            if (clickable) {
                setIsHovered(true);
            } else {
                setIsHovered(false);
            }
        };

        window.addEventListener('mousemove', moveCursor);
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);
        window.addEventListener('mouseover', handleMouseOver);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
            window.removeEventListener('mouseover', handleMouseOver);
        };
    }, [cursorX, cursorY]);

    return (
        <motion.div
            className="fixed top-0 left-0 pointer-events-none z-[100]"
            style={{
                x: cursorXSpring,
                y: cursorYSpring,
                scale: isClicked ? 0.8 : isHovered ? 1.1 : 1,
            }}
        >
            {/* Character Cursor - Massively Increased Size (w-64 = 256px) */}
            <div className="relative w-64 h-64 -ml-32 -mt-32"> {/* Centered */}
                <Image
                    src="/images/hero-smiley-char-new.png"
                    alt="Cursor"
                    fill
                    className="object-contain drop-shadow-[0_0_40px_rgba(212,255,0,0.6)]"
                />

                {/* CLICK!! Comic Text */}
                <motion.div
                    className="absolute top-10 -right-20 bg-black/80 backdrop-blur-sm text-primary font-display font-black text-4xl italic tracking-tighter px-4 py-2 rounded-xl border-2 border-primary rotate-12 whitespace-nowrap z-[101]"
                    initial={{ opacity: 0, scale: 0.5, rotate: 0 }}
                    animate={{
                        opacity: isHovered ? 1 : 0,
                        scale: isHovered ? 1.2 : 0.5,
                        rotate: isHovered ? 12 : 0,
                        x: isHovered ? 0 : -20
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                    CLICK!!
                </motion.div>
            </div>
        </motion.div>
    );
}
