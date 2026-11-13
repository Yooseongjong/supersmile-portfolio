'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import KineticStampHeader from './KineticStampHeader';

const LOG_FILTER = 'grayscale(65%) contrast(74%) brightness(98%)';
const GRADED_FILTER = 'contrast(1.16) saturate(1.34) brightness(1.03)';
const N = 72;

const wave = (i: number, seed: number, amp: number) => {
    const x = i / N;
    const v = 0.5 + 0.28 * Math.sin(x * 6.2 + seed) + 0.14 * Math.sin(x * 17 + seed * 2.3) + 0.06 * Math.sin(x * 41 + seed);
    return 0.5 + (v - 0.5) * amp;
};

function Parade({ graded }: { graded: number }) {
    const amp = 0.55 + 0.6 * graded;
    const W = 360, H = 84;
    return (
        <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" className="w-full h-20 rounded-lg bg-black/70 border border-white/10">
            {[0.25, 0.5, 0.75].map((g) => (
                <line key={g} x1="0" x2={W} y1={H * g} y2={H * g} stroke="white" strokeOpacity="0.07" strokeDasharray="2 3" />
            ))}
            {[['#FF453A', 0.2, 0.04], ['#30D158', 1.4, 0], ['#0A84FF', 2.6, -0.04]].map(([c, s, o]) => (
                <polyline
                    key={c as string}
                    fill="none"
                    stroke={c as string}
                    strokeWidth="1.2"
                    strokeOpacity="0.85"
                    style={{ mixBlendMode: 'screen' }}
                    points={Array.from({ length: N }, (_, i) => {
                        const y = Math.min(0.98, Math.max(0.02, wave(i, s as number, amp) + (o as number) * graded));
                        return `${(i / (N - 1)) * W},${H - y * H}`;
                    }).join(' ')}
                />
            ))}
        </svg>
    );
}

function Wheel({ label, dx, dy, tint }: { label: string; dx: number; dy: number; tint: string }) {
    return (
        <div className="flex flex-col items-center gap-1.5">
            <div
                className="relative w-14 h-14 rounded-full border border-white/15"
                style={{ background: 'conic-gradient(from 90deg,#f00,#ff0,#0f0,#0ff,#00f,#f0f,#f00)' }}
            >
                <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,#0A0A0E_12%,rgba(10,10,14,0.62)_64%,rgba(10,10,14,0.22)_100%)]" />
                <div
                    className="absolute w-2.5 h-2.5 rounded-full border border-white transition-transform duration-150"
                    style={{ left: `${50 + dx}%`, top: `${50 + dy}%`, transform: 'translate(-50%,-50%)', background: tint }}
                />
            </div>
            <span className="text-[11px] text-white/45">{label}</span>
        </div>
    );
}

export default function V2DirectDI() {
    const box = useRef<HTMLDivElement>(null);
    const masterVid = useRef<HTMLVideoElement>(null);
    const logVid = useRef<HTMLVideoElement>(null);
    const dragging = useRef(false);
    const [pos, setPos] = useState(46);

    const update = useCallback((x: number) => {
        const r = box.current?.getBoundingClientRect();
        if (r) setPos(Math.min(100, Math.max(0, ((x - r.left) / r.width) * 100)));
    }, []);

    useEffect(() => {
        const mv = (e: PointerEvent) => dragging.current && update(e.clientX);
        const up = () => (dragging.current = false);
        window.addEventListener('pointermove', mv);
        window.addEventListener('pointerup', up);
        return () => {
            window.removeEventListener('pointermove', mv);
            window.removeEventListener('pointerup', up);
        };
    }, [update]);

    const syncVideos = () => {
        const a = masterVid.current;
        const b = logVid.current;
        if (!a || !b) return;
        if (Math.abs(a.currentTime - b.currentTime) > 0.08) {
            b.currentTime = a.currentTime;
        }
    };

    const graded = 1 - pos / 100;

    return (
        <section id="direct-di" className="relative bg-[#09090C] border-y border-white/10 text-[#FAFAFA] py-24 md:py-32 px-5 md:px-10">
            <div className="mx-auto max-w-[1560px]">
                <KineticStampHeader
                    code="STAMP 02"
                    kicker="IN-HOUSE MASTER COLOR SUITE"
                    titleLine1="THE LAST 1%"
                    titleAccent="DIRECT DI."
                    sealText="4K ACEScct MASTER"
                    sealVariant="amber"
                    krSub="17년 차 메인 감독의 인하우스 마스터 색보정"
                    description="슬라이더를 좌우로 드래그하거나 우측 프리셋을 눌러 S-Log3 원본과 마스터 그레이딩의 톤 차이를 비교해 보세요."
                    rightSlot={
                        <div className="flex flex-wrap items-center gap-2">
                            {[
                                { label: 'S-Log3 Raw', val: 92 },
                                { label: '50 : 50 Split', val: 50 },
                                { label: 'Full Master Grade', val: 8 },
                            ].map((preset) => (
                                <button
                                    key={preset.label}
                                    type="button"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setPos(preset.val);
                                    }}
                                    className={`press-tactile rounded-full px-4 py-2 font-mono text-xs font-bold transition-colors ${
                                        Math.abs(pos - preset.val) < 12
                                            ? 'bg-[#F59E0B] text-black'
                                            : 'border border-white/15 bg-white/[0.04] text-white/70 hover:text-white'
                                    }`}
                                >
                                    {preset.label}
                                </button>
                            ))}
                        </div>
                    }
                />

                <div
                    ref={box}
                    className="relative w-full aspect-video md:aspect-[21/9] overflow-hidden rounded-2xl bg-black select-none touch-none ring-1 ring-white/12 cursor-ew-resize shadow-[0_30px_90px_rgba(0,0,0,0.8)]"
                    onPointerDown={(e) => {
                        dragging.current = true;
                        update(e.clientX);
                    }}
                    role="slider"
                    aria-label="Log vs Graded comparison"
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-valuenow={Math.round(pos)}
                    tabIndex={0}
                    onKeyDown={(e) => {
                        if (e.key === 'ArrowLeft') setPos((p) => Math.max(0, p - 3));
                        if (e.key === 'ArrowRight') setPos((p) => Math.min(100, p + 3));
                    }}
                >
                    <div className="absolute inset-0" style={{ filter: GRADED_FILTER }}>
                        <video
                            ref={masterVid}
                            src="/videos/showreel-di-clip.mp4"
                            poster="/videos/showreel-poster.jpg"
                            autoPlay
                            muted
                            loop
                            playsInline
                            onTimeUpdate={syncVideos}
                            className="h-full w-full object-cover"
                        />
                    </div>

                    <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
                        <div className="absolute inset-0" style={{ filter: LOG_FILTER }}>
                            <video
                                ref={logVid}
                                src="/videos/showreel-di-clip.mp4"
                                poster="/videos/showreel-poster.jpg"
                                autoPlay
                                muted
                                loop
                                playsInline
                                className="h-full w-full object-cover"
                            />
                        </div>
                    </div>

                    <span className="pointer-events-none absolute top-4 left-4 rounded-full bg-black/65 backdrop-blur-xl px-3.5 py-1 text-xs text-white/80 border border-white/12">
                        S-Log3 Raw
                    </span>
                    <span className="pointer-events-none absolute top-4 right-4 rounded-full bg-white/90 text-black font-semibold px-3.5 py-1 text-xs">
                        Master Grade
                    </span>

                    <div
                        className="pointer-events-none absolute inset-y-0 w-px bg-white/90"
                        style={{ left: `${pos}%` }}
                    >
                        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-black/75 border border-white/80 backdrop-blur-xl flex items-center justify-center text-[11px] text-white shadow-xl">
                            ◀ ▶
                        </div>
                    </div>
                </div>

                <div className="mt-4 grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-4">
                    <div className="rounded-2xl bg-[#0E0E12] border border-white/8 p-5">
                        <div className="flex justify-between text-xs text-white/45 mb-3">
                            <span>RGB Parade</span>
                            <span className="text-white/75">{graded > 0.5 ? 'ACEScct Graded' : 'Log Signal'}</span>
                        </div>
                        <Parade graded={graded} />
                    </div>
                    <div className="rounded-2xl bg-[#0E0E12] border border-white/8 p-5">
                        <div className="text-xs text-white/45 mb-3">Primary Wheels</div>
                        <div className="flex justify-around items-center">
                            <Wheel label="Lift" dx={-8 * graded} dy={6 * graded} tint="#0A84FF" />
                            <Wheel label="Gamma" dx={4 * graded} dy={-3 * graded} tint="#FF9F0A" />
                            <Wheel label="Gain" dx={12 * graded} dy={-9 * graded} tint="#FF453A" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
