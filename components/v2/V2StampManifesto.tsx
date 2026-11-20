'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Play } from 'lucide-react';

const STAMP_MANIFESTO_ITEMS = [
    {
        en: 'BOUNDLESS',
        subEn: 'PRODUCTION.',
        kr: '장르의 경계를 지우는 크리에이티브 프로덕션',
    },
    {
        en: 'DOPAMINE',
        subEn: 'ENGINEERED.',
        kr: '넥슨 · 크래프톤 · 디벨론 · ENA 오리지널',
    },
    {
        en: 'THE LAST 1%',
        subEn: 'DIRECT DI.',
        kr: '장면의 밀도를 완성하는 인하우스 마스터 색보정',
    },
    {
        en: 'NEXT-GEN',
        subEn: 'AI STUDIO.',
        kr: 'SK브로드밴드 AI 다큐드라마 [루프] · 송도 스튜디오',
    },
];

export default function V2StampManifesto({ onOpenShowreel }: { onOpenShowreel: () => void }) {
    const [activeStamp, setActiveStamp] = useState(0);
    const previewWrapRef = useRef<HTMLDivElement>(null);
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const visibleRef = useRef(true);

    useEffect(() => {
        const el = previewWrapRef.current;
        if (!el || typeof IntersectionObserver === 'undefined') return;
        const obs = new IntersectionObserver(
            (entries) => {
                const entry = entries[0];
                if (!entry) return;
                visibleRef.current = entry.isIntersecting;
                iframeRef.current?.contentWindow?.postMessage(
                    { type: 'SUPERSMILE_VISIBLE', visible: entry.isIntersecting },
                    '*'
                );
            },
            { threshold: 0.05 }
        );
        obs.observe(el);
        return () => obs.disconnect();
    }, []);

    const handleStampClick = (idx: number, e: React.MouseEvent<HTMLButtonElement>) => {
        setActiveStamp(idx);
        const target = e.currentTarget;
        gsap.fromTo(
            target,
            { scale: 1.08 },
            { scale: 1.0, duration: 0.2, ease: 'back.out(2.6)' }
        );
    };

    return (
        <section className="relative bg-[#060608] border-b border-white/10 py-16 md:py-24 px-5 md:px-10 overflow-hidden">
            <div className="mx-auto max-w-[1560px]">
                {/* Top Label Bar */}
                <div className="flex flex-wrap items-center justify-between gap-4 mb-6 text-xs">
                    <span className="font-semibold tracking-wider text-white/70">
                        SUPERSMILE SHOWREEL ARCHIVE
                    </span>
                </div>

                {/* Main Split: Left Kinetic Typography Showreel + Right Clean 4-Card Manifesto */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center lg:items-stretch">
                    {/* SuperSmile Kinetic Typography MV Showreel (145 BPM) */}
                    <div
                        ref={previewWrapRef}
                        onClick={onOpenShowreel}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => e.key === 'Enter' && onOpenShowreel()}
                        aria-label="Open SuperSmile Kinetic Typography Showreel with Master Audio"
                        className="lg:col-span-7 w-full min-w-0 relative aspect-video overflow-hidden rounded-3xl border-2 border-white/20 bg-[#06070B] shadow-[0_28px_80px_rgba(0,0,0,0.85)] cursor-pointer group"
                    >
                        <iframe
                            ref={iframeRef}
                            src="/kinetic-showreel/index.html?preview=1&v=3"
                            title="SuperSmile Kinetic Typography Showreel Preview"
                            loading="lazy"
                            onLoad={() =>
                                iframeRef.current?.contentWindow?.postMessage(
                                    { type: 'SUPERSMILE_VISIBLE', visible: visibleRef.current },
                                    '*'
                                )
                            }
                            tabIndex={-1}
                            className="pointer-events-none h-full w-full border-0 transition-transform duration-500 group-hover:scale-[1.015]"
                        />
                        <div className="pointer-events-none absolute bottom-4 right-4 flex items-center gap-2 rounded-full bg-black/75 backdrop-blur-md border border-white/20 px-3.5 py-1.5 font-mono text-[11px] font-bold tracking-wider text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                            <Play className="w-3 h-3 fill-[#D4FF00] text-[#D4FF00]" />
                            <span>PLAY WITH SOUND · 01:22</span>
                        </div>
                        <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/15 rounded-3xl" />
                    </div>

                    {/* Right Interactive 4-Card Manifesto */}
                    <div className="lg:col-span-5 w-full min-w-0 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 lg:grid-rows-4 gap-3.5 h-full">
                        {STAMP_MANIFESTO_ITEMS.map((item, idx) => {
                            const on = activeStamp === idx;
                            return (
                                <button
                                    key={item.en}
                                    type="button"
                                    onMouseEnter={() => setActiveStamp(idx)}
                                    onClick={(e) => handleStampClick(idx, e)}
                                    className={`text-left rounded-2xl border-2 px-6 py-5 sm:px-7 sm:py-5 transition-all duration-150 flex flex-col justify-center gap-2 ${
                                        on
                                            ? 'bg-[#FAFAFA] text-[#09090B] border-[#F59E0B] shadow-[0_16px_40px_rgba(245,158,11,0.22)]'
                                            : 'bg-[#0C0C11] text-[#FAFAFA] border-white/12 hover:border-white/30'
                                    }`}
                                >
                                    <div className="flex items-baseline gap-x-2.5 gap-y-1 flex-wrap">
                                        <span className="font-display font-black tracking-[-0.045em] text-2xl sm:text-[28px] xl:text-[34px] uppercase leading-[1.05]">
                                            {item.en}
                                        </span>
                                        <span
                                            className={`font-display font-black tracking-[-0.045em] text-2xl sm:text-[28px] xl:text-[34px] uppercase leading-[1.05] ${
                                                on ? 'text-[#EF4444]' : 'text-[#F59E0B]'
                                            }`}
                                        >
                                            {item.subEn}
                                        </span>
                                    </div>

                                    <div
                                        className={`font-display font-bold text-sm sm:text-[15px] xl:text-base tracking-[-0.02em] ${
                                            on ? 'text-[#09090B]/85' : 'text-white/70'
                                        }`}
                                    >
                                        {item.kr}
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
