'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Intro() {
    const [showIntro, setShowIntro] = useState(true);

    useEffect(() => {
        // Check if intro has already been shown in this session
        const hasShownIntro = sessionStorage.getItem('hasShownIntro');
        if (hasShownIntro) {
            setShowIntro(false);
            return;
        }

        // Set flag in session storage
        sessionStorage.setItem('hasShownIntro', 'true');

        // Hide intro after animation duration
        const timer = setTimeout(() => {
            setShowIntro(false);
        }, 3500); // 3.5 seconds

        return () => clearTimeout(timer);
    }, []);

    return (
        <AnimatePresence>
            {showIntro && (
                <motion.div
                    className="fixed inset-0 z-[99999] bg-black flex items-center justify-center pointer-events-none"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                >
                    <div className="flex flex-col items-center">
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="relative mb-4"
                        >
                            {/* Logo or Text */}
                            <h1 className="font-display text-4xl md:text-6xl font-bold text-white tracking-tighter">
                                SUPERSMILE
                            </h1>
                        </motion.div>

                        <div className="overflow-hidden">
                            <motion.p
                                initial={{ y: "100%" }}
                                animate={{ y: 0 }}
                                transition={{ duration: 0.8, delay: 0.5, ease: "circOut" }}
                                className="font-sans text-primary text-sm md:text-base tracking-[0.3em] font-medium"
                            >
                                CREATIVE STUDIO
                            </motion.p>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
