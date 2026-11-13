'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { Volume2, VolumeX, Play, ArrowUpRight } from 'lucide-react';
import WebGLReelShader from './WebGLReelShader';

export default function V2Hero({ onOpenShowreel }: { onOpenShowreel: () => void }) {
    const stageRef = useRef<HTMLElement>(null);
    const puckRef = useRef<HTMLDivElement>(null);

    const [videoEl, setVideoEl] = useState<HTMLVideoElement | null>(null);
    const [liveAudio, setLiveAudio] = useState(false);
    const [hoveringReel, setHoveringReel] = useState(false);
    const audioVideoRef = useRef<HTMLVideoElement | null>(null);

    useEffect(() => {
        const puck = puckRef.current;
        if (!puck) return;
        const xTo = gsap.quickTo(puck, 'x', { duration: 0.22, ease: 'power3.out' });
        const yTo = gsap.quickTo(puck, 'y', { duration: 0.22, ease: 'power3.out' });

        const onMove = (e: PointerEvent) => {
            const rect = stageRef.current?.getBoundingClientRect();
            if (!rect) return;
            xTo(e.clientX - rect.left);
            yTo(e.clientY - rect.top);
        };
        window.addEventListener('pointermove', onMove, { passive: true });
        return () => window.removeEventListener('pointermove', onMove);
    }, []);

    const toggleInlineSound = (e: React.MouseEvent) => {
        e.stopPropagation();
        const fullVid = audioVideoRef.current;
        if (!fullVid) return;
        if (!liveAudio) {
            if (videoEl) fullVid.currentTime = videoEl.currentTime;
            fullVid.muted = false;
            fullVid.play().catch(() => {});
            setLiveAudio(true);
        } else {
            fullVid.muted = true;
            fullVid.pause();
            setLiveAudio(false);
        }
    };

    return (
        <section
            ref={stageRef}
            id="top"
            onMouseEnter={() => setHoveringReel(true)}
            onMouseLeave={() => setHoveringReel(false)}
            className="relative h-screen w-full overflow-hidden bg-[#060608] text-[#FAFAFA] select-none"
        >
            {/* Fullscreen Showreel Viewport */}
            <div
                onClick={onOpenShowreel}
                className="absolute inset-0 z-20 cursor-pointer overflow-hidden bg-black"
            >
                <video
                    ref={setVideoEl}
                    src="/videos/showreel-loop-typo.mp4"
                    poster="/videos/showreel-poster.jpg"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    className="absolute inset-0 h-full w-full object-cover"
                />

                <video
                    ref={audioVideoRef}
                    src="/videos/showreel-2026-typo.mp4"
                    preload="metadata"
                    loop
                    playsInline
                    muted
                    className="hidden"
                />

                <WebGLReelShader videoEl={videoEl} className="pointer-events-none absolute inset-0 z-10" />

                <div className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-t from-black/75 via-transparent to-black/25" />

                {/* Minimal Bottom Action Bar */}
                <div className="absolute bottom-6 left-6 right-6 z-30 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex flex-wrap items-center gap-2.5">
                        <button
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation();
                                onOpenShowreel();
                            }}
                            className="press-tactile inline-flex items-center gap-2 rounded-full bg-[#FAFAFA] text-[#09090B] px-5 py-2.5 text-xs sm:text-sm font-bold shadow-xl hover:bg-[#F59E0B] transition-colors"
                        >
                            <Play className="w-3.5 h-3.5 fill-current" />
                            <span>전체 쇼릴 재생 (01:37)</span>
                        </button>

                        <button
                            type="button"
                            onClick={toggleInlineSound}
                            className="press-tactile inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/65 backdrop-blur-xl px-4 py-2.5 text-xs font-semibold text-white hover:bg-black/85"
                        >
                            {liveAudio ? (
                                <>
                                    <Volume2 className="w-3.5 h-3.5 text-[#F59E0B]" />
                                    <span>사운드 켜짐</span>
                                </>
                            ) : (
                                <>
                                    <VolumeX className="w-3.5 h-3.5 text-white/60" />
                                    <span>배경 사운드 켜기</span>
                                </>
                            )}
                        </button>
                    </div>

                    <Link
                        href="/work"
                        onClick={(e) => e.stopPropagation()}
                        className="press-tactile inline-flex items-center gap-2 rounded-full border border-white/25 bg-black/65 backdrop-blur-xl px-5 py-2.5 text-xs sm:text-sm font-bold text-[#FAFAFA] hover:bg-[#FAFAFA] hover:text-[#09090B] transition-colors"
                    >
                        <span>작업 모두보기</span>
                        <ArrowUpRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>

            {/* Cursor Follower Pill */}
            <div
                ref={puckRef}
                className={`pointer-events-none hidden md:flex absolute top-0 left-0 z-40 -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-full border border-[#F59E0B]/60 bg-black/80 backdrop-blur-xl px-4 py-2 text-xs font-bold text-white transition-opacity duration-200 ${
                    hoveringReel ? 'opacity-100' : 'opacity-0'
                }`}
            >
                <Play className="w-3 h-3 fill-current text-[#F59E0B]" />
                <span>OPEN SHOWREEL</span>
            </div>
        </section>
    );
}
