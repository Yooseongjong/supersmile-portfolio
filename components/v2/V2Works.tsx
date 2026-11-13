'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Play, ArrowUpRight } from 'lucide-react';
import SafeImage from '@/components/ui/SafeImage';
import { Project } from '@/lib/data';
import { FEATURED_ROLES_FALLBACK, getYoutubeId, getVideoLink } from './works';
import KineticStampHeader from './KineticStampHeader';

export default function V2Works({ works, onPlay }: { works: Project[]; onPlay: (p: Project) => void }) {
    const [activeIdx, setActiveIdx] = useState(0);
    const active = works[activeIdx] || works[0];
    if (!active) return null;

    const activeRoles = active.roles ?? FEATURED_ROLES_FALLBACK[active.id] ?? [];
    const isExternal = !getYoutubeId(getVideoLink(active));

    return (
        <section id="works" className="relative bg-[#060608] text-[#FAFAFA] py-24 md:py-32 px-5 md:px-10">
            <div className="mx-auto max-w-[1560px]">
                <KineticStampHeader
                    titleLine1="SUPER SMILE"
                    titleAccent="포트폴리오"
                    krSub="2026 최신작부터 브랜드 필름, 웹예능, AI 시네마까지"
                    description="슬라이스 위에 마우스를 올리면 실시간으로 시네마 프리뷰가 확장됩니다."
                    rightSlot={
                        <Link
                            href="/work"
                            className="press-tactile inline-flex items-center gap-2 rounded-full bg-[#FAFAFA] text-[#09090B] px-6 py-3 text-xs sm:text-sm font-bold hover:bg-[#F59E0B] transition-colors"
                        >
                            <span>전체 작품 보기</span>
                            <ArrowUpRight className="w-4 h-4" />
                        </Link>
                    }
                />

                {/* Top Interactive Expanding Filmstrip Accordion */}
                <div className="flex gap-2.5 h-[220px] sm:h-[300px] lg:h-[360px] w-full mb-6">
                    {works.map((w, i) => {
                        const on = i === activeIdx;
                        const roles = w.roles ?? FEATURED_ROLES_FALLBACK[w.id] ?? [];
                        return (
                            <div
                                key={w.id}
                                onMouseEnter={() => setActiveIdx(i)}
                                onClick={() => onPlay(w)}
                                role="button"
                                tabIndex={0}
                                onKeyDown={(e) => e.key === 'Enter' && onPlay(w)}
                                className={`group relative h-full rounded-3xl overflow-hidden cursor-pointer transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                                    on
                                        ? 'flex-[4.2] ring-2 ring-[#F59E0B] shadow-[0_24px_70px_rgba(0,0,0,0.85)]'
                                        : 'flex-[1] opacity-60 hover:opacity-90 ring-1 ring-white/12'
                                }`}
                            >
                                {w.image && (
                                    <SafeImage
                                        src={w.image}
                                        alt={w.title}
                                        fill
                                        priority={i < 2}
                                        sizes="(max-width: 1024px) 80vw, 45vw"
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                )}

                                <div
                                    className={`absolute inset-0 transition-opacity duration-300 ${
                                        on
                                            ? 'bg-gradient-to-t from-black/90 via-black/25 to-black/20'
                                            : 'bg-black/55'
                                    }`}
                                />

                                {/* Top Index Badge */}
                                <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                                    <span
                                        className={`font-mono text-xs font-extrabold px-2.5 py-1 rounded-full ${
                                            on
                                                ? 'bg-[#F59E0B] text-black'
                                                : 'bg-black/70 text-white/75 border border-white/15'
                                        }`}
                                    >
                                        {String(i + 1).padStart(2, '0')}
                                    </span>

                                    {on && (
                                        <span className="inline-flex items-center gap-1.5 rounded-full bg-white text-black px-3.5 py-1.5 text-xs font-bold shadow-lg">
                                            <Play className="w-3 h-3 fill-current" />
                                            <span>{isExternal ? '릴스 열기' : '재생'}</span>
                                        </span>
                                    )}
                                </div>

                                {/* Expanded Details */}
                                <div
                                    className={`absolute inset-x-5 bottom-5 transition-all duration-300 ${
                                        on ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
                                    }`}
                                >
                                    <div className="flex flex-wrap items-center gap-2 font-mono text-[11px] text-white/80 mb-1.5">
                                        {w.client && (
                                            <span className="text-[#F59E0B] font-bold">{w.client}</span>
                                        )}
                                        {w.year && <span>· {w.year}</span>}
                                        {roles.length > 0 && (
                                            <span className="hidden sm:inline text-white/60">
                                                · {roles.join(', ')}
                                            </span>
                                        )}
                                    </div>
                                    <h3 className="font-display font-bold text-lg sm:text-2xl md:text-3xl text-white leading-tight truncate">
                                        {w.title}
                                    </h3>
                                    {w.description && (
                                        <p className="hidden sm:block mt-1.5 text-xs md:text-sm text-white/70 line-clamp-2 max-w-xl break-keep">
                                            {w.description}
                                        </p>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Bottom Active Work Spec Bar */}
                <div className="rounded-3xl border border-white/12 bg-[#0C0C11] p-5 sm:p-7 flex flex-col lg:flex-row lg:items-center justify-between gap-5">
                    <div className="space-y-1.5">
                        <div className="flex flex-wrap items-center gap-2">
                            <span className="rounded bg-[#EF4444] text-black font-mono text-[11px] font-black px-2.5 py-0.5">
                                NOW SELECTED #{String(activeIdx + 1).padStart(2, '0')}
                            </span>
                            {active.client && (
                                <span className="font-mono text-xs font-bold text-[#F59E0B]">
                                    {active.client}
                                </span>
                            )}
                            {activeRoles.map((r) => (
                                <span
                                    key={r}
                                    className="rounded-full border border-white/15 bg-white/[0.04] px-3 py-0.5 font-mono text-[11px] text-white/80"
                                >
                                    {r}
                                </span>
                            ))}
                        </div>
                        <h3 className="font-display font-bold text-xl sm:text-2xl text-white">
                            {active.title}
                        </h3>
                        {active.description && (
                            <p className="text-xs sm:text-sm text-white/60 break-keep">
                                {active.description}
                            </p>
                        )}
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                        <button
                            type="button"
                            onClick={() => onPlay(active)}
                            className="press-tactile inline-flex items-center gap-2 rounded-full bg-white text-black px-6 py-3 text-xs sm:text-sm font-bold hover:bg-[#F59E0B] transition-colors"
                        >
                            <Play className="w-3.5 h-3.5 fill-current" />
                            <span>{isExternal ? '원본 릴스 보러가기' : '이 작품 바로 재생'}</span>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
