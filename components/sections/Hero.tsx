'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Button from '@/components/ui/Button';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

const pad = (n: number) => String(n).padStart(2, '0');

/** 실시간 타임코드 01:00:SS:FF (24fps) */
function useTimecode() {
    const [tc, setTc] = useState('01:00:00:00');
    useEffect(() => {
        const start = performance.now();
        const id = setInterval(() => {
            const elapsed = (performance.now() - start) / 1000;
            const total = Math.floor(elapsed);
            const frames = Math.floor((elapsed - total) * 24);
            const s = total % 60;
            const m = Math.floor(total / 60) % 60;
            setTc(`01:${pad(m)}:${pad(s)}:${pad(frames)}`);
        }, 1000 / 24);
        return () => clearInterval(id);
    }, []);
    return tc;
}

const corner = 'absolute w-8 h-8 md:w-12 md:h-12 border-white/40';

export default function Hero() {
    const ref = useRef<HTMLElement>(null);
    const tc = useTimecode();
    const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });

    const titleY = useTransform(scrollYProgress, [0, 1], [0, 160]);
    const titleScale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);
    const fade = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
    const bgScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.2]);

    return (
        <section
            ref={ref}
            id="home"
            className="relative h-screen w-full overflow-hidden flex flex-col items-center justify-center bg-background"
        >
            {/* Background */}
            <motion.div style={{ scale: bgScale }} className="absolute inset-0 z-0 select-none">
                <Image
                    src="/images/hero-studio-bg.jpg"
                    alt="Studio Background"
                    fill
                    className="object-cover opacity-50 grayscale-[40%] contrast-110"
                    priority
                    quality={90}
                />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(9,9,11,0.92)_100%)]" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/60" />
            </motion.div>

            {/* Viewfinder HUD */}
            <motion.div style={{ opacity: fade }} className="absolute inset-0 z-10 pointer-events-none p-4 md:p-10 font-mono text-[10px] md:text-xs tracking-[0.2em] text-white/70">
                {/* 16:9 crop guide */}
                <div className="absolute inset-x-4 md:inset-x-10 top-1/2 -translate-y-1/2 aspect-video max-h-[calc(100%-5rem)] border border-white/10" />
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6">
                    <div className="absolute left-1/2 top-0 h-full w-px bg-white/30" />
                    <div className="absolute top-1/2 left-0 w-full h-px bg-white/30" />
                </div>

                {/* corner brackets */}
                <div className={`${corner} top-4 left-4 md:top-10 md:left-10 border-t border-l`} />
                <div className={`${corner} top-4 right-4 md:top-10 md:right-10 border-t border-r`} />
                <div className={`${corner} bottom-4 left-4 md:bottom-10 md:left-10 border-b border-l`} />
                <div className={`${corner} bottom-4 right-4 md:bottom-10 md:right-10 border-b border-r`} />

                {/* top-left: REC */}
                <div className="absolute top-8 left-8 md:top-16 md:left-16 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
                    <span className="text-white">REC</span>
                </div>
                {/* top-right: format */}
                <div className="absolute top-8 right-8 md:top-16 md:right-16 text-right leading-relaxed">
                    <div>24fps</div>
                    <div className="text-white/40">4K UHD</div>
                </div>
                {/* bottom-left: DI */}
                <div className="absolute bottom-8 left-8 md:bottom-16 md:left-16 leading-relaxed">
                    <div className="text-amber">DIRECT DI</div>
                    <div className="text-white/40">REC.709 / ACES</div>
                </div>
                {/* bottom-right: timecode */}
                <div className="absolute bottom-8 right-8 md:bottom-16 md:right-16 text-right">
                    <div className="text-white/40">TC</div>
                    <div className="text-white tabular-nums text-sm md:text-base">{tc}</div>
                </div>
            </motion.div>

            {/* Center: Kinetic Typography */}
            <motion.div
                style={{ y: titleY, scale: titleScale, opacity: fade }}
                className="z-20 flex flex-col items-center text-center px-6 max-w-[95vw] relative"
            >
                <h1 className="font-display font-extrabold tracking-tighter leading-[0.85] text-white text-[17vw] md:text-[12.5vw]">
                    <span className="block overflow-hidden">
                        <motion.span
                            className="block"
                            initial={{ y: '110%' }}
                            animate={{ y: 0 }}
                            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
                        >
                            WE CRAFT
                        </motion.span>
                    </span>
                    <span className="block overflow-hidden">
                        <motion.span
                            className="block text-primary"
                            initial={{ y: '110%' }}
                            animate={{ y: 0 }}
                            transition={{ duration: 1.1, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
                        >
                            SMILES.
                        </motion.span>
                    </span>
                </h1>

                <motion.p
                    className="mt-8 md:mt-10 text-sm md:text-xl text-white/70 max-w-2xl leading-relaxed break-keep"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.7 }}
                >
                    장르의 경계를 지우는 하이엔드 시네마틱 &amp; AI 크리에이티브 스튜디오
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.9 }}
                    className="flex flex-col md:flex-row gap-4 md:gap-6 mt-8 md:mt-10 pointer-events-auto"
                >
                    <Link href="/work">
                        <Button size="lg" variant="primary">View Our Work</Button>
                    </Link>
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

            {/* Scroll hint */}
            <motion.div
                style={{ opacity: fade }}
                className="absolute bottom-3 md:bottom-4 z-20 text-white/40 font-mono text-[10px] tracking-[0.3em] uppercase"
            >
                Scroll
            </motion.div>
        </section>
    );
}
