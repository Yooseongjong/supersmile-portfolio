'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
            window.scrollTo(0, 0);
        }, 2000); // 2 seconds loading time

        return () => clearTimeout(timer);
    }, []);

    return (
        <AnimatePresence mode="wait">
            {isLoading && (
                <motion.div
                    className="fixed inset-0 z-[9999] flex items-center justify-center bg-black"
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                >
                    <div className="relative overflow-hidden">
                        <motion.div
                            initial={{ y: 0 }}
                            exit={{ y: -100, opacity: 0 }}
                            transition={{ duration: 0.5 }}
                            className="flex items-center gap-2"
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
                </motion.div>
            )}
        </AnimatePresence>
    );
}
