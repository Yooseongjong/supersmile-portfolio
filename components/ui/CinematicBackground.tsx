'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function CinematicBackground() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return <div className="fixed inset-0 z-[-1] bg-[#030303]" />;

    return (
        <div className="fixed inset-0 z-[-1] pointer-events-none bg-[#030303] overflow-hidden">
            {/* 1. Subtle Animated Gradient Orbs */}
            <motion.div
                animate={{
                    x: ["-20%", "20%", "-20%"],
                    y: ["0%", "10%", "0%"],
                    opacity: [0.05, 0.12, 0.05],
                }}
                transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] bg-primary/20 blur-[150px] rounded-full mix-blend-screen"
            />
            <motion.div
                animate={{
                    x: ["20%", "-20%", "20%"],
                    y: ["0%", "-10%", "0%"],
                    opacity: [0.04, 0.10, 0.04],
                }}
                transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                className="absolute bottom-[-20%] right-[-10%] w-[80vw] h-[80vw] bg-blue-500/10 blur-[180px] rounded-full mix-blend-screen"
            />

            {/* 2. Floating Dust Particles */}
            {Array.from({ length: 20 }).map((_, i) => (
                <Particle key={i} index={i} />
            ))}

            {/* 3. Noise Texture Layer (Top Most) */}
            <div
                className="absolute inset-0 opacity-[0.04] mix-blend-overlay"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                }}
            />

            {/* 4. Vignette */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.6)_100%)]" />
        </div>
    );
}

function Particle({ index }: { index: number }) {
    // Deterministic randomness based on index for consistent server/client rendering if possible,
    // but here we are mounting only after client load, so math.random is fine inside state or just use fixed values.
    // Actually, to make it look organic, random is better. Since we render only after mount, Math.random is safe.

    const randomX = Math.random() * 100; // vw
    const randomY = Math.random() * 100; // vh
    const duration = 10 + Math.random() * 20; // 10-30s
    const delay = Math.random() * 5;

    return (
        <motion.div
            className="absolute bg-white rounded-full opacity-50"
            style={{
                left: `${randomX}%`,
                top: `${randomY}%`,
                width: Math.random() > 0.5 ? '2px' : '3px',
                height: Math.random() > 0.5 ? '2px' : '3px',
            }}
            animate={{
                y: [0, -100], // move up 100px
                x: [0, (Math.random() - 0.5) * 50], // subtle drift
                opacity: [0, 0.8, 0],
            }}
            transition={{
                duration: duration,
                repeat: Infinity,
                ease: "linear",
                delay: delay,
            }}
        />
    );
}
