'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader() {
    const [isLoading, setIsLoading] = useState(true);
    const [showStatic, setShowStatic] = useState(false);

    useEffect(() => {
        // Timeline:
        // 0s: Start
        // 2s: Loading Bar Completes
        // 3s (2s + 1s delay): Trigger Static
        // 3.2s: Hide Everything

        const loadingDuration = 2000;
        const delayBeforeStatic = 1000;
        const staticDuration = 300; // 0.3s for glitch

        const staticTimer = setTimeout(() => {
            setShowStatic(true);
        }, loadingDuration + delayBeforeStatic);

        const finishTimer = setTimeout(() => {
            setIsLoading(false);
            setShowStatic(false);
            window.scrollTo(0, 0);
        }, loadingDuration + delayBeforeStatic + staticDuration);

        return () => {
            clearTimeout(staticTimer);
            clearTimeout(finishTimer);
        };
    }, []);

    return (
        <AnimatePresence mode="wait">
            {isLoading && (
                <motion.div
                    className="fixed inset-0 z-[9999] flex items-center justify-center bg-black"
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }} // Faster fade out after glitch
                >
                    {/* Main Content (Text + Line) */}
                    <div className="relative overflow-visible">
                        <motion.div
                            initial={{ opacity: 1 }}
                            exit={{ opacity: 0, filter: 'blur(10px)', scale: 1.1 }}
                            transition={{ duration: 0.2 }}
                            className="flex items-center justify-center gap-2"
                        >
                            <span className="font-display text-4xl md:text-6xl font-bold text-white tracking-tighter">
                                SUPER
                            </span>
                            <span className="font-display text-4xl md:text-6xl font-bold text-primary tracking-tighter">
                                SMILE
                            </span>
                        </motion.div>

                        {/* Loading Line */}
                        <motion.div
                            className="absolute bottom-0 left-0 h-1 bg-primary"
                            initial={{ width: 0 }}
                            animate={{ width: '100%' }}
                            transition={{ duration: 1.8, ease: "easeInOut" }}
                        />
                    </div>

                    {/* TV Static Overlay */}
                    <AnimatePresence>
                        {showStatic && (
                            <motion.div
                                className="absolute inset-0 w-full h-full z-[10001] bg-white mix-blend-difference"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: [0, 1, 0.5, 1, 0] }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3, times: [0, 0.2, 0.5, 0.8, 1] }}
                            >
                                <svg className="w-full h-full opacity-50">
                                    <filter id="staticNoise">
                                        <feTurbulence
                                            type="fractalNoise"
                                            baseFrequency="1.5"
                                            numOctaves="3"
                                            stitchTiles="stitch"
                                        />
                                        <feColorMatrix type="saturate" values="0" />
                                    </filter>
                                    <rect width="100%" height="100%" filter="url(#staticNoise)" />
                                </svg>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
