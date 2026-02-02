'use client';

import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import Button from '@/components/ui/Button';
import Image from 'next/image';
import { useEffect } from 'react';

export default function Hero() {
    const { scrollY } = useScroll();

    // Mouse Position State
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth Spring Physics
    const springConfig = { damping: 30, stiffness: 200, mass: 0.5 };
    const mouseXSpring = useSpring(mouseX, springConfig);
    const mouseYSpring = useSpring(mouseY, springConfig);

    // Parallax Calculations
    // Screen center is (0,0). Mouse movement creates inverse movement for the character
    const charX = useTransform(mouseXSpring, [-0.5, 0.5], ["25px", "-25px"]);
    const charY = useTransform(mouseYSpring, [-0.5, 0.5], ["25px", "-25px"]);
    const charRotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
    const charRotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

    // Text parallax
    const textY = useTransform(scrollY, [0, 500], [0, 200]);
    const opacity = useTransform(scrollY, [0, 300], [1, 0]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const { clientX, clientY, currentTarget } = e;
        const { width, height, left, top } = currentTarget.getBoundingClientRect();

        const xPct = (clientX - left) / width - 0.5;
        const yPct = (clientY - top) / height - 0.5;

        mouseX.set(xPct);
        mouseY.set(yPct);
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
    };

    return (
        <section
            id="home"
            className="relative h-screen w-full overflow-hidden flex flex-col items-center justify-center bg-[#050505] [perspective:2000px]"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            {/* LAYER 1: Static Background */}
            <div className="absolute inset-0 z-0 select-none">
                <Image
                    src="/images/hero-studio-bg.jpg"
                    alt="Studio Background"
                    fill
                    className="object-cover opacity-80"
                    priority
                    quality={100}
                />
                {/* Vignette Overlay for focus */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)]" />
                <div className="absolute inset-0 bg-black/30" /> {/* General darkening */}
            </div>

            {/* LAYER 2: Interactive Character - Shifted Right on Desktop */}
            <motion.div
                className="absolute z-10 w-full h-full flex items-center justify-center md:justify-end md:pr-[5%] pointer-events-none"
                style={{
                    x: charX,
                    y: charY,
                    rotateX: charRotateX,
                    rotateY: charRotateY,
                    opacity
                }}
            >
                <div className="relative w-[80vw] md:w-[45vw] aspect-square max-w-[800px] md:translate-x-10">
                    <Image
                        src="/images/hero-smiley-char-new.png"
                        alt="SuperSmile Character"
                        fill
                        className="object-contain drop-shadow-2xl"
                        priority
                    />
                </div>
            </motion.div>

            {/* LAYER 3: Content Overlay - Centered Original Style */}
            <motion.div
                style={{ opacity, y: textY }}
                className="z-20 flex flex-col items-center text-center space-y-8 max-w-6xl px-4 pointer-events-none relative mt-24 md:mt-0"
            >
                <div>
                    <motion.h1
                        className="font-display text-7xl md:text-9xl font-bold tracking-tighter leading-none text-white mix-blend-overlay drop-shadow-[0_4px_24px_rgba(0,0,0,0.5)]"
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    >
                        WE CRAFT
                    </motion.h1>
                    <motion.h1
                        className="font-display text-7xl md:text-9xl font-bold tracking-tighter leading-none text-primary drop-shadow-[0_0_30px_rgba(212,255,0,0.3)]"
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                    >
                        SMILES.
                    </motion.h1>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="flex flex-col md:flex-row gap-6 mt-8 pointer-events-auto"
                >
                    <Button size="lg" variant="primary">
                        View Our Work
                    </Button>
                    <Button
                        size="lg"
                        variant="outline"
                        className="bg-black/20 backdrop-blur-sm border-white/20 text-white hover:bg-white hover:text-black"
                        onClick={() => window.open('https://open.kakao.com/o/gU25oQdi', '_blank')}
                    >
                        Contact Studio
                    </Button>
                </motion.div>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
                className="absolute bottom-10 z-20 text-white/50"
                animate={{
                    y: [0, 10, 0],
                    opacity: [0.5, 1, 0.5]
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            >
                <div className="flex flex-col items-center gap-2">
                    <span className="text-xs tracking-widest uppercase font-medium">Scroll</span>
                    <ChevronDown className="w-6 h-6" />
                </div>
            </motion.div>
        </section>
    );
}
