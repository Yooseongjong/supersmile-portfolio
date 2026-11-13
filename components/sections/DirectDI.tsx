'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';

const STILL = '/assets/dear_my_x_v2.png';

const LOG_FILTER = 'grayscale(65%) contrast(75%) brightness(95%)';
const GRADED_FILTER = 'contrast(1.12) saturate(1.3) brightness(1.02)';

const COLS = 64;

/** 결정적(deterministic) 파형 — SSR/CSR 불일치 방지 */
function wave(i: number, seed: number, amp: number) {
    const x = i / COLS;
    const v = 0.5 + 0.28 * Math.sin(x * 6.2 + seed) + 0.14 * Math.sin(x * 17 + seed * 2.3) + 0.06 * Math.sin(x * 41 + seed);
    const mid = 0.5;
    return mid + (v - mid) * amp;
}

function Waveform({ graded }: { graded: number }) {
    // graded: 0 (LOG, 압축된 파형) ~ 1 (DI, 확장된 파형)
    const amp = 0.55 + 0.6 * graded;
    const W = 320;
    const H = 90;
    const channels = [
        { color: '#EF4444', seed: 0.2, off: 0.04 },
        { color: '#22C55E', seed: 1.4, off: 0 },
        { color: '#3B82F6', seed: 2.6, off: -0.04 },
    ];
    return (
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-24 bg-black/60 border border-white/10" preserveAspectRatio="none">
            {[0.25, 0.5, 0.75].map((g) => (
                <line key={g} x1="0" x2={W} y1={H * g} y2={H * g} stroke="white" strokeOpacity="0.08" strokeDasharray="2 3" />
            ))}
            {channels.map((c) => {
                const pts = Array.from({ length: COLS }, (_, i) => {
                    const y = Math.min(0.98, Math.max(0.02, wave(i, c.seed, amp) + c.off * graded));
                    return `${(i / (COLS - 1)) * W},${H - y * H}`;
                }).join(' ');
                return <polyline key={c.color} points={pts} fill="none" stroke={c.color} strokeOpacity="0.85" strokeWidth="1.2" style={{ mixBlendMode: 'screen' }} />;
            })}
        </svg>
    );
}

function ColorWheel({ label, dx, dy, tint }: { label: string; dx: number; dy: number; tint: string }) {
    return (
        <div className="flex flex-col items-center gap-2">
            <div
                className="relative w-16 h-16 md:w-20 md:h-20 rounded-full border border-white/20"
                style={{ background: 'conic-gradient(from 90deg, #f00, #ff0, #0f0, #0ff, #00f, #f0f, #f00)' }}
            >
                <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,#18181b_8%,rgba(24,24,27,0.55)_60%,rgba(24,24,27,0.2)_100%)]" />
                <div
                    className="absolute w-2.5 h-2.5 rounded-full border border-white transition-all duration-150"
                    style={{ left: `${50 + dx}%`, top: `${50 + dy}%`, transform: 'translate(-50%,-50%)', background: tint }}
                />
            </div>
            <span className="font-mono text-[10px] tracking-[0.25em] text-white/50">{label}</span>
        </div>
    );
}

export default function DirectDI() {
    const boxRef = useRef<HTMLDivElement>(null);
    const [pos, setPos] = useState(50); // LOG가 보이는 비율(%)
    const dragging = useRef(false);

    const update = useCallback((clientX: number) => {
        const el = boxRef.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        setPos(Math.min(100, Math.max(0, ((clientX - r.left) / r.width) * 100)));
    }, []);

    useEffect(() => {
        const move = (e: PointerEvent) => dragging.current && update(e.clientX);
        const up = () => (dragging.current = false);
        window.addEventListener('pointermove', move);
        window.addEventListener('pointerup', up);
        return () => {
            window.removeEventListener('pointermove', move);
            window.removeEventListener('pointerup', up);
        };
    }, [update]);

    const graded = 1 - pos / 100;

    return (
        <section id="direct-di" className="relative bg-background py-24 md:py-32 overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="mb-12 md:mb-16 max-w-3xl">
                    <p className="font-mono text-xs tracking-[0.3em] text-primary uppercase mb-4">[ 03 / Color Suite ]</p>
                    <h2 className="font-display text-4xl md:text-7xl font-bold text-white leading-[0.95] tracking-tight">
                        Visual Identity <br />
                        <span className="text-amber">by Direct DI</span>
                    </h2>
                    <p className="mt-6 text-white/60 leading-relaxed break-keep">
                        17년 차 메인 감독이 직접 수행하는 인하우스 DI. 슬라이더를 움직여 LOG 원본과 마스터 DI의 차이를 확인하세요.
                    </p>
                </div>

                {/* Compare slider */}
                <div
                    ref={boxRef}
                    className="relative w-full aspect-video max-w-6xl mx-auto overflow-hidden border border-white/10 bg-carbon select-none touch-none"
                    onPointerDown={(e) => {
                        dragging.current = true;
                        update(e.clientX);
                    }}
                    role="slider"
                    aria-label="Before / After comparison"
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-valuenow={Math.round(pos)}
                    tabIndex={0}
                    onKeyDown={(e) => {
                        if (e.key === 'ArrowLeft') setPos((p) => Math.max(0, p - 3));
                        if (e.key === 'ArrowRight') setPos((p) => Math.min(100, p + 3));
                    }}
                >
                    {/* AFTER (full) */}
                    <div className="absolute inset-0" style={{ filter: GRADED_FILTER }}>
                        <Image src={STILL} alt="In-House Master DI" fill sizes="(max-width:1200px) 100vw, 1152px" className="object-cover" draggable={false} />
                        <div className="absolute inset-0 bg-gradient-to-tr from-amber/15 via-transparent to-primary/10 mix-blend-soft-light" />
                    </div>

                    {/* BEFORE (clipped) */}
                    <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
                        <div className="absolute inset-0" style={{ filter: LOG_FILTER }}>
                            <Image src={STILL} alt="LOG / RAW footage" fill sizes="(max-width:1200px) 100vw, 1152px" className="object-cover" draggable={false} />
                        </div>
                    </div>

                    {/* labels */}
                    <span className="absolute top-4 left-4 font-mono text-[10px] md:text-xs tracking-[0.25em] bg-black/60 px-3 py-1.5 text-white/80 border border-white/10">
                        LOG / RAW FOOTAGE
                    </span>
                    <span className="absolute top-4 right-4 font-mono text-[10px] md:text-xs tracking-[0.25em] bg-primary/90 px-3 py-1.5 text-white">
                        IN-HOUSE MASTER DI
                    </span>

                    {/* handle */}
                    <div className="absolute top-0 bottom-0 w-px bg-white shadow-[0_0_12px_rgba(255,255,255,0.6)]" style={{ left: `${pos}%` }}>
                        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-black/70 border border-white flex items-center justify-center text-white text-xs backdrop-blur">
                            ◀ ▶
                        </div>
                    </div>
                </div>

                {/* Scopes */}
                <div className="max-w-6xl mx-auto mt-4 grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-4">
                    <div className="bg-carbon border border-white/10 p-4">
                        <div className="flex justify-between font-mono text-[10px] tracking-[0.25em] text-white/40 mb-3">
                            <span>RGB PARADE / WAVEFORM</span>
                            <span className="text-white/60">{graded > 0.5 ? 'GRADED' : 'LOG'}</span>
                        </div>
                        <Waveform graded={graded} />
                    </div>
                    <div className="bg-carbon border border-white/10 p-4">
                        <div className="font-mono text-[10px] tracking-[0.25em] text-white/40 mb-3">PRIMARIES — COLOR WHEELS</div>
                        <div className="flex justify-between">
                            <ColorWheel label="LIFT" dx={-8 * graded} dy={6 * graded} tint="#3B82F6" />
                            <ColorWheel label="GAMMA" dx={4 * graded} dy={-3 * graded} tint="#F59E0B" />
                            <ColorWheel label="GAIN" dx={12 * graded} dy={-9 * graded} tint="#EF4444" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
