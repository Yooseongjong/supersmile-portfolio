'use client';

import { motion } from 'framer-motion';

export default function TvStatic() {
    return (
        <motion.div
            className="fixed inset-0 z-[10000] pointer-events-none opacity-50 mix-blend-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <svg className="w-full h-full">
                <filter id="noiseFilter">
                    <feTurbulence
                        type="fractalNoise"
                        baseFrequency="0.85"
                        numOctaves="3"
                        stitchTiles="stitch"
                    />
                </filter>
                <rect width="100%" height="100%" filter="url(#noiseFilter)" />
            </svg>
            <div className="absolute inset-0 bg-white/10 mix-blend-difference animate-pulse" />
        </motion.div>
    );
}
