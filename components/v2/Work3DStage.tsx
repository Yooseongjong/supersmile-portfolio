'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import gsap from 'gsap';
import {
    Play,
    ArrowLeft,
    ArrowUpRight,
    ChevronLeft,
    ChevronRight,
    LayoutGrid,
    Columns3,
    ListVideo,
    Sparkles,
    Film,
} from 'lucide-react';
import SafeImage from '@/components/ui/SafeImage';
import { Project } from '@/lib/data';
import VideoModal, { ModalTarget } from './VideoModal';
import {
    FEATURED_ROLES_FALLBACK,
    getAllWorks,
    getVideoLink,
    getYoutubeId,
    playProject,
} from './works';

const TAB_DEFS = [
    { key: 'ALL', label: '전체 작업', code: '01' },
    { key: 'WEB SERIES', label: '웹 오리지널', code: '02' },
    { key: 'COMMERCIAL', label: '광고 · 브랜디드', code: '03' },
    { key: 'PERFORMANCE', label: '퍼포먼스 · 뮤직', code: '04' },
    { key: 'LIVE', label: '라이브', code: '05' },
    { key: 'CORPORATE', label: '기업 · B2B', code: '06' },
] as const;

type ViewMode = 'stage' | 'bento' | 'index';

export default function Work3DStage() {
    const searchParams = useSearchParams();
    const allWorks = useMemo(() => getAllWorks(), []);

    const initialCat = useMemo(() => {
        const q = searchParams?.get('category')?.toUpperCase();
        if (q === 'FEATURED') return 'ALL';
        const found = TAB_DEFS.find((t) => t.key === q);
        return found ? found.key : 'ALL';
    }, [searchParams]);

    const [category, setCategory] = useState<string>(initialCat);
    const [activeIdx, setActiveIdx] = useState(0);
    const [viewMode, setViewMode] = useState<ViewMode>('stage');
    const [modalTarget, setModalTarget] = useState<ModalTarget>(null);

    const ambientRef = useRef<HTMLDivElement>(null);
    const cursorCardRef = useRef<HTMLDivElement>(null);
    const [hoveringIndexRow, setHoveringIndexRow] = useState(false);
    const wheelCooldownRef = useRef(0);
    const prevIdxRef = useRef(0);

    const categoryCounts = useMemo(() => {
        const counts: Record<string, number> = { ALL: allWorks.length };
        for (const tab of TAB_DEFS) {
            if (tab.key !== 'ALL') {
                counts[tab.key] = allWorks.filter((w) => w.category === tab.key).length;
            }
        }
        return counts;
    }, [allWorks]);

    const filtered = useMemo(() => {
        if (category === 'ALL') return allWorks;
        return allWorks.filter((w) => w.category === category);
    }, [allWorks, category]);

    // Deep-link ?project= support
    useEffect(() => {
        const pid = Number(searchParams?.get('project'));
        if (!pid) return;
        const idxInAll = allWorks.findIndex((w) => w.id === pid);
        if (idxInAll >= 0) {
            setCategory('ALL');
            setActiveIdx(idxInAll);
        }
    }, [searchParams, allWorks]);

    const safeIdx = Math.min(activeIdx, Math.max(0, filtered.length - 1));
    const activeProject: Project | undefined = filtered[safeIdx] || filtered[0];

    useEffect(() => {
        prevIdxRef.current = safeIdx;
    }, [safeIdx]);

    const switchCategory = useCallback((nextCat: string) => {
        setCategory(nextCat);
        setActiveIdx(0);
    }, []);

    const stepItem = useCallback(
        (dir: number) => {
            if (!filtered.length) return;
            setActiveIdx((prev) => (prev + dir + filtered.length) % filtered.length);
        },
        [filtered.length]
    );

    // Keyboard navigation
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (modalTarget) return;
            if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                e.preventDefault();
                stepItem(1);
            } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                e.preventDefault();
                stepItem(-1);
            } else if (e.key === 'Enter' && activeProject) {
                playProject(activeProject, setModalTarget);
            }
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [modalTarget, stepItem, activeProject]);

    // Pointer parallax for Ambient Backdrop & Floating Cursor Preview
    useEffect(() => {
        const amb = ambientRef.current;
        const curCard = cursorCardRef.current;
        const ambX = amb ? gsap.quickTo(amb, 'x', { duration: 0.6, ease: 'power3.out' }) : null;
        const ambY = amb ? gsap.quickTo(amb, 'y', { duration: 0.6, ease: 'power3.out' }) : null;
        const curX = curCard ? gsap.quickTo(curCard, 'x', { duration: 0.22, ease: 'power3.out' }) : null;
        const curY = curCard ? gsap.quickTo(curCard, 'y', { duration: 0.22, ease: 'power3.out' }) : null;

        const onMove = (e: PointerEvent) => {
            const nx = (e.clientX / window.innerWidth - 0.5) * 2;
            const ny = (e.clientY / window.innerHeight - 0.5) * 2;
            ambX?.(-nx * 28);
            ambY?.(-ny * 18);
            curX?.(e.clientX + 28);
            curY?.(e.clientY - 90);
        };
        window.addEventListener('pointermove', onMove, { passive: true });
        return () => window.removeEventListener('pointermove', onMove);
    }, []);

    // Wheel scrub in Stage Deck mode
    const handleStageWheel = (e: React.WheelEvent) => {
        if (viewMode !== 'stage') return;
        const now = performance.now();
        if (now - wheelCooldownRef.current < 260) return;
        const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
        if (Math.abs(delta) < 18) return;
        wheelCooldownRef.current = now;
        stepItem(delta > 0 ? 1 : -1);
    };

    const handleBentoPointerMove = (e: React.PointerEvent<HTMLElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
        e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
    };

    const activeRoles = activeProject
        ? activeProject.roles ?? FEATURED_ROLES_FALLBACK[activeProject.id] ?? ['Production']
        : [];
    const activeIsExternal = activeProject ? !getYoutubeId(getVideoLink(activeProject)) : false;
    const currentTabDef = TAB_DEFS.find((t) => t.key === category) || TAB_DEFS[0];

    return (
        <div
            onWheel={handleStageWheel}
            className="relative min-h-screen w-full bg-[#060608] text-[#FAFAFA] selection:bg-[#F59E0B] selection:text-black overflow-x-hidden"
        >
            {/* Ambient Reactive Cinema Backdrop */}
            <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
                <div ref={ambientRef} className="absolute -inset-12 opacity-30 transition-opacity duration-700">
                    {activeProject?.image && (
                        <SafeImage
                            src={activeProject.image}
                            alt=""
                            fill
                            sizes="100vw"
                            className="object-cover blur-[85px] scale-110 saturate-150"
                        />
                    )}
                </div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_25%,rgba(9,9,11,0.35)_0%,rgba(6,6,8,0.92)_68%,#060608_100%)]" />
                <div
                    className="absolute inset-0 opacity-[0.06]"
                    style={{
                        backgroundImage:
                            'linear-gradient(to right, rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.5) 1px, transparent 1px)',
                        backgroundSize: '72px 72px',
                    }}
                />
                {/* Subtle Oversized Kinetic Watermark */}
                <div className="absolute inset-x-0 top-[14%] flex justify-center pointer-events-none select-none overflow-hidden">
                    <span className="font-display font-black tracking-[-0.06em] text-[13vw] leading-none text-white/[0.025] uppercase whitespace-nowrap">
                        SUPERSMILE ARCHIVE
                    </span>
                </div>
            </div>

            {/* Top Command Header & Category Dock */}
            <header className="sticky top-0 z-40 border-b border-white/[0.08] bg-[#060608]/80 backdrop-blur-2xl">
                <div className="mx-auto max-w-[1680px] px-4 sm:px-8 py-3.5 flex flex-col gap-3.5">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center gap-4">
                            <Link
                                href="/"
                                className="press-tactile inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-4 py-2 text-xs font-semibold text-white hover:bg-white hover:text-black transition-colors"
                            >
                                <ArrowLeft className="w-3.5 h-3.5" />
                                <span>HOME</span>
                            </Link>
                            <div className="hidden sm:flex items-center gap-2.5 font-mono text-xs text-white/55">
                                <span className="h-2 w-2 rounded-full bg-[#EF4444] animate-pulse" />
                                <span className="text-white font-semibold tracking-wider">DIRECTOR&apos;S SCREENING DECK</span>
                                <span className="text-white/25">{'//'}</span>
                                <span className="text-[#F59E0B]">{allWorks.length} MASTER WORKS</span>
                            </div>
                        </div>

                        {/* View Mode Switcher + 2026 Showreel Trigger */}
                        <div className="flex items-center gap-2">
                            <button
                                type="button"
                                onClick={() => setModalTarget({ kind: 'showreel', variant: 'stomp20' })}
                                className="press-tactile hidden md:inline-flex items-center gap-2 rounded-full border border-[#F59E0B]/40 bg-[#F59E0B]/10 px-4 py-2 text-xs font-semibold text-[#F59E0B] hover:bg-[#F59E0B] hover:text-black transition-colors"
                            >
                                <Sparkles className="w-3.5 h-3.5" />
                                <span>2026 Stomp Reel (00:20)</span>
                            </button>

                            <div
                                role="group"
                                aria-label="View mode selector"
                                className="inline-flex items-center rounded-full border border-white/12 bg-white/[0.04] p-1"
                            >
                                <button
                                    type="button"
                                    onClick={() => setViewMode('stage')}
                                    className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all ${
                                        viewMode === 'stage'
                                            ? 'bg-white text-black shadow'
                                            : 'text-white/60 hover:text-white'
                                    }`}
                                >
                                    <Columns3 className="w-3.5 h-3.5" />
                                    <span>스포트라이트 덱</span>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setViewMode('bento')}
                                    className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all ${
                                        viewMode === 'bento'
                                            ? 'bg-white text-black shadow'
                                            : 'text-white/60 hover:text-white'
                                    }`}
                                >
                                    <LayoutGrid className="w-3.5 h-3.5" />
                                    <span>벤토 매트릭스</span>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setViewMode('index')}
                                    className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all ${
                                        viewMode === 'index'
                                            ? 'bg-white text-black shadow'
                                            : 'text-white/60 hover:text-white'
                                    }`}
                                >
                                    <ListVideo className="w-3.5 h-3.5" />
                                    <span>인덱스 릴</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Prominent Category Pills */}
                    <nav
                        aria-label="Work categories"
                        className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-0.5"
                    >
                        {TAB_DEFS.map((tab) => {
                            const active = category === tab.key;
                            const count = categoryCounts[tab.key] ?? 0;
                            return (
                                <button
                                    key={tab.key}
                                    type="button"
                                    onClick={() => switchCategory(tab.key)}
                                    className={`press-tactile group shrink-0 inline-flex items-center gap-2.5 rounded-full px-4 sm:px-5 py-2.5 text-xs sm:text-sm font-semibold transition-all duration-200 ${
                                        active
                                            ? 'bg-[#FAFAFA] text-[#09090B] shadow-[0_0_30px_rgba(255,255,255,0.22)]'
                                            : 'border border-white/12 bg-white/[0.03] text-white/70 hover:border-white/30 hover:bg-white/[0.07] hover:text-white'
                                    }`}
                                >
                                    <span
                                        className={`font-mono text-[11px] ${
                                            active ? 'text-[#EF4444] font-bold' : 'text-white/35'
                                        }`}
                                    >
                                        {tab.code}
                                    </span>
                                    <span>{tab.label}</span>
                                    <span
                                        className={`rounded-full px-2 py-0.5 font-mono text-[11px] ${
                                            active
                                                ? 'bg-[#09090B] text-[#FAFAFA]'
                                                : 'bg-white/[0.07] text-white/55'
                                        }`}
                                    >
                                        {count}
                                    </span>
                                </button>
                            );
                        })}
                    </nav>
                </div>
            </header>

            {/* MAIN CONTENT AREA */}
            <main className="relative z-10 mx-auto max-w-[1680px] px-4 sm:px-8 pt-6 pb-20">
                {/* =====================================================================
                    MODE 1: INTERACTIVE SPOTLIGHT DECK & EXPANDING FILMSTRIP
                   ===================================================================== */}
                {viewMode === 'stage' && activeProject && (
                    <div className="flex flex-col gap-6">
                        {/* Hero Split Stage: Left Cinema Monitor (7 cols) + Right Live Spec & Cue Deck (5 cols) */}
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                            {/* Left: Active Screening Monitor */}
                            <div className="lg:col-span-8">
                                <div
                                    onClick={() => playProject(activeProject, setModalTarget)}
                                    role="button"
                                    tabIndex={0}
                                    onKeyDown={(e) =>
                                        e.key === 'Enter' && playProject(activeProject, setModalTarget)
                                    }
                                    className="group relative aspect-video w-full overflow-hidden rounded-3xl bg-[#0D0D11] ring-1 ring-white/15 hover:ring-[#F59E0B]/70 shadow-[0_32px_100px_rgba(0,0,0,0.85)] cursor-pointer transition-all duration-300"
                                >
                                    {filtered.map((item, idx) => {
                                        const isCurrent = idx === safeIdx;
                                        const isNearby =
                                            isCurrent ||
                                            idx === prevIdxRef.current ||
                                            Math.abs(idx - safeIdx) <= 2 ||
                                            (safeIdx === 0 && idx === filtered.length - 1) ||
                                            (safeIdx === filtered.length - 1 && idx === 0);
                                        if (!isNearby) return null;
                                        return (
                                            <div
                                                key={item.id}
                                                className={`absolute inset-0 transition-all duration-500 ${
                                                    isCurrent
                                                        ? 'opacity-100 scale-100 z-10'
                                                        : 'opacity-0 scale-105 z-0 pointer-events-none'
                                                }`}
                                            >
                                                {item.image && (
                                                    <SafeImage
                                                        src={item.image}
                                                        alt={item.title}
                                                        fill
                                                        priority={idx < 3}
                                                        sizes="(max-width: 1024px) 100vw, 66vw"
                                                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                                                    />
                                                )}
                                            </div>
                                        );
                                    })}

                                    <div className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-t from-black/90 via-black/20 to-black/40" />

                                    {/* Top ARRI Viewfinder HUD Bar */}
                                    <div className="pointer-events-none absolute top-5 inset-x-6 z-30 flex items-center justify-between font-mono text-xs">
                                        <div className="inline-flex items-center gap-2.5 rounded-full bg-black/70 backdrop-blur-xl border border-white/15 px-3.5 py-1.5">
                                            <span className="h-2 w-2 rounded-full bg-[#EF4444]" />
                                            <span className="font-bold text-white">{currentTabDef.label}</span>
                                            <span className="text-white/35">{'//'}</span>
                                            <span className="text-[#F59E0B]">
                                                {String(safeIdx + 1).padStart(2, '0')} / {String(filtered.length).padStart(2, '0')}
                                            </span>
                                        </div>

                                        <div className="hidden sm:inline-flex items-center gap-2 rounded-full bg-black/70 backdrop-blur-xl border border-white/15 px-3.5 py-1.5 text-white/75">
                                            <span>4K MASTER DI</span>
                                            <span className="text-white/30">·</span>
                                            <span>{activeProject.year || '2026'}</span>
                                        </div>
                                    </div>

                                    {/* Center Magnetic Play Button */}
                                    <div className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center">
                                        <div className="flex items-center gap-3 rounded-full border border-white/30 bg-black/65 backdrop-blur-2xl px-6 py-3.5 text-xs sm:text-sm font-bold text-white shadow-2xl transition-all duration-300 group-hover:scale-110 group-hover:bg-[#FAFAFA] group-hover:text-[#09090B]">
                                            <Play className="w-4 h-4 fill-current" />
                                            <span>{activeIsExternal ? '외부 원본 필름 열기' : '마스터 영상 재생'}</span>
                                            {activeIsExternal && <ArrowUpRight className="w-4 h-4" />}
                                        </div>
                                    </div>

                                    {/* Bottom Monitor Metadata Overlay */}
                                    <div className="pointer-events-none absolute inset-x-0 bottom-0 z-30 p-6 sm:p-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                                        <div>
                                            <div className="flex flex-wrap items-center gap-2 mb-2.5">
                                                {activeProject.client && (
                                                    <span className="rounded-md bg-[#F59E0B] text-black font-mono text-[11px] font-extrabold px-2.5 py-0.5 uppercase">
                                                        {activeProject.client}
                                                    </span>
                                                )}
                                                {activeRoles.map((r) => (
                                                    <span
                                                        key={r}
                                                        className="rounded-md border border-white/20 bg-black/60 backdrop-blur-md font-mono text-[11px] text-white/85 px-2.5 py-0.5"
                                                    >
                                                        {r}
                                                    </span>
                                                ))}
                                            </div>
                                            <h1 className="font-display font-bold tracking-tight text-2xl sm:text-4xl text-white leading-tight">
                                                {activeProject.title}
                                            </h1>
                                            {activeProject.description && (
                                                <p className="mt-2 text-xs sm:text-sm text-white/70 max-w-2xl line-clamp-2 break-keep">
                                                    {activeProject.description}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right: Interactive Quick-Scrub Cue Sheet */}
                            <div className="lg:col-span-4 flex flex-col justify-between rounded-3xl border border-white/12 bg-[#0B0B10]/90 backdrop-blur-2xl p-5 sm:p-6">
                                <div>
                                    <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
                                        <div>
                                            <div className="font-mono text-[11px] uppercase tracking-widest text-[#F59E0B]">
                                                LIVE CUE SHEET
                                            </div>
                                            <h2 className="font-display font-bold text-lg text-white mt-0.5">
                                                {currentTabDef.label} 라인업 ({filtered.length})
                                            </h2>
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <button
                                                type="button"
                                                onClick={() => stepItem(-1)}
                                                aria-label="Previous project"
                                                className="press-tactile h-9 w-9 rounded-full border border-white/15 bg-white/[0.04] flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors"
                                            >
                                                <ChevronLeft className="w-4 h-4" />
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => stepItem(1)}
                                                aria-label="Next project"
                                                className="press-tactile h-9 w-9 rounded-full border border-white/15 bg-white/[0.04] flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors"
                                            >
                                                <ChevronRight className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Scrollable Instant-Hover Cue List */}
                                    <div className="space-y-1.5 max-h-[380px] overflow-y-auto pr-1">
                                        {filtered.map((item, idx) => {
                                            const on = idx === safeIdx;
                                            return (
                                                <button
                                                    key={item.id}
                                                    type="button"
                                                    onMouseEnter={() => setActiveIdx(idx)}
                                                    onFocus={() => setActiveIdx(idx)}
                                                    onClick={() => playProject(item, setModalTarget)}
                                                    className={`group w-full text-left rounded-2xl p-2.5 flex items-center gap-3.5 transition-all duration-200 ${
                                                        on
                                                            ? 'bg-white text-black shadow-lg'
                                                            : 'hover:bg-white/[0.06] text-white'
                                                    }`}
                                                >
                                                    <span
                                                        className={`font-mono text-xs font-bold w-6 text-center shrink-0 ${
                                                            on ? 'text-[#EF4444]' : 'text-white/35'
                                                        }`}
                                                    >
                                                        {String(idx + 1).padStart(2, '0')}
                                                    </span>

                                                    <div className="relative h-12 w-20 shrink-0 overflow-hidden rounded-xl bg-black ring-1 ring-white/15">
                                                        {item.image && (
                                                            <SafeImage
                                                                src={item.image}
                                                                alt={item.title}
                                                                fill
                                                                sizes="80px"
                                                                className="object-cover"
                                                            />
                                                        )}
                                                    </div>

                                                    <div className="min-w-0 flex-1">
                                                        <div
                                                            className={`font-mono text-[10px] truncate ${
                                                                on ? 'text-black/65 font-semibold' : 'text-white/45'
                                                            }`}
                                                        >
                                                            {item.client || item.category} · {item.year}
                                                        </div>
                                                        <div
                                                            className={`font-display font-bold text-xs sm:text-sm truncate ${
                                                                on ? 'text-black' : 'text-white/85'
                                                            }`}
                                                        >
                                                            {item.title}
                                                        </div>
                                                    </div>

                                                    <Play
                                                        className={`w-3.5 h-3.5 shrink-0 mr-1 transition-transform ${
                                                            on
                                                                ? 'text-black fill-current scale-110'
                                                                : 'text-white/30 group-hover:text-white'
                                                        }`}
                                                    />
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>

                                <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-white/50">
                                    <span>마우스 오버 · 휠 · 방향키(←/→) 즉시 전환</span>
                                    <button
                                        type="button"
                                        onClick={() => setViewMode('bento')}
                                        className="font-semibold text-[#F59E0B] hover:underline"
                                    >
                                        벤토 그리드로 전체 보기 →
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Bottom Interactive Expanding Accordion Filmstrip Dock */}
                        <div className="mt-2">
                            <div className="flex items-center justify-between mb-3 px-1">
                                <div className="font-mono text-xs uppercase tracking-widest text-white/50">
                                    INTERACTIVE EXPANDING FILMSTRIP — 카드를 스치면 즉시 확장됩니다
                                </div>
                                <div className="font-mono text-xs text-white/45">
                                    {safeIdx + 1} OF {filtered.length}
                                </div>
                            </div>

                            <div className="flex gap-2.5 h-[140px] sm:h-[176px] w-full overflow-x-auto no-scrollbar py-1">
                                {filtered.map((item, idx) => {
                                    const on = idx === safeIdx;
                                    return (
                                        <div
                                            key={item.id}
                                            onMouseEnter={() => setActiveIdx(idx)}
                                            onClick={() => {
                                                if (on) {
                                                    playProject(item, setModalTarget);
                                                } else {
                                                    setActiveIdx(idx);
                                                }
                                            }}
                                            role="button"
                                            tabIndex={0}
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter') playProject(item, setModalTarget);
                                            }}
                                            className={`group relative h-full rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                                                on
                                                    ? 'flex-[3.2] min-w-[260px] sm:min-w-[340px] ring-2 ring-[#F59E0B] shadow-[0_16px_40px_rgba(0,0,0,0.75)]'
                                                    : 'flex-[1] min-w-[78px] sm:min-w-[110px] opacity-60 hover:opacity-95 ring-1 ring-white/12'
                                            }`}
                                        >
                                            {item.image && (
                                                <SafeImage
                                                    src={item.image}
                                                    alt={item.title}
                                                    fill
                                                    sizes="(max-width: 768px) 50vw, 25vw"
                                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                                />
                                            )}
                                            <div
                                                className={`absolute inset-0 transition-opacity duration-300 ${
                                                    on
                                                        ? 'bg-gradient-to-t from-black/90 via-black/20 to-transparent'
                                                        : 'bg-black/45 group-hover:bg-black/20'
                                                }`}
                                            />

                                            <div className="absolute top-2.5 left-3 font-mono text-[11px] font-bold px-2 py-0.5 rounded bg-black/70 text-white">
                                                {String(idx + 1).padStart(2, '0')}
                                            </div>

                                            <div
                                                className={`absolute inset-x-3 bottom-3 transition-all duration-300 ${
                                                    on ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                                                }`}
                                            >
                                                <div className="font-mono text-[10px] text-[#F59E0B] uppercase truncate">
                                                    {item.client || item.category}
                                                </div>
                                                <div className="font-display font-bold text-sm sm:text-base text-white truncate">
                                                    {item.title}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                )}

                {/* =====================================================================
                    MODE 2: ASYMMETRIC BENTO MATRIX (Apple / Awwwards Trend)
                   ===================================================================== */}
                {viewMode === 'bento' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 auto-rows-[270px] gap-4 sm:gap-5">
                        {filtered.map((item, idx) => {
                            // Asymmetric Bento span pattern
                            const spanClass =
                                idx === 0
                                    ? 'md:col-span-2 md:row-span-2'
                                    : idx === 3 || idx === 6
                                    ? 'md:col-span-2'
                                    : 'col-span-1';
                            const roles = item.roles ?? FEATURED_ROLES_FALLBACK[item.id] ?? ['Production'];

                            return (
                                <article
                                    key={item.id}
                                    onPointerMove={handleBentoPointerMove}
                                    onClick={() => playProject(item, setModalTarget)}
                                    role="button"
                                    tabIndex={0}
                                    onKeyDown={(e) =>
                                        e.key === 'Enter' && playProject(item, setModalTarget)
                                    }
                                    className={`group relative overflow-hidden rounded-3xl bg-[#0D0D12] border border-white/12 hover:border-[#F59E0B]/60 cursor-pointer transition-all duration-300 hover:-translate-y-1 shadow-[0_20px_50px_rgba(0,0,0,0.6)] ${spanClass}`}
                                >
                                    {item.image && (
                                        <SafeImage
                                            src={item.image}
                                            alt={item.title}
                                            fill
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                        />
                                    )}

                                    {/* Pointer-reactive spotlight overlay */}
                                    <div
                                        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                        style={{
                                            background:
                                                'radial-gradient(500px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(245,158,11,0.18), transparent 45%)',
                                        }}
                                    />

                                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-black/25" />

                                    <div className="absolute top-4 inset-x-4 flex items-center justify-between">
                                        <span className="rounded-full bg-black/70 backdrop-blur-md border border-white/15 px-3 py-1 font-mono text-[11px] font-bold text-white">
                                            {String(idx + 1).padStart(2, '0')} · {item.year || '2026'}
                                        </span>
                                        <span className="h-9 w-9 rounded-full bg-white text-black flex items-center justify-center opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 shadow-lg">
                                            <Play className="w-3.5 h-3.5 fill-current" />
                                        </span>
                                    </div>

                                    <div className="absolute inset-x-5 bottom-5">
                                        <div className="flex flex-wrap items-center gap-1.5 mb-2">
                                            {item.client && (
                                                <span className="rounded bg-[#F59E0B] text-black font-mono text-[10px] font-extrabold px-2 py-0.5 uppercase">
                                                    {item.client}
                                                </span>
                                            )}
                                            {roles.slice(0, 2).map((r) => (
                                                <span
                                                    key={r}
                                                    className="rounded border border-white/20 bg-black/60 font-mono text-[10px] text-white/80 px-2 py-0.5"
                                                >
                                                    {r}
                                                </span>
                                            ))}
                                        </div>
                                        <h3
                                            className={`font-display font-bold text-white leading-snug ${
                                                idx === 0 ? 'text-2xl sm:text-3xl' : 'text-lg sm:text-xl'
                                            }`}
                                        >
                                            {item.title}
                                        </h3>
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                )}

                {/* =====================================================================
                    MODE 3: EDITORIAL KINETIC INDEX REEL (With Floating Cursor Preview)
                   ===================================================================== */}
                {viewMode === 'index' && (
                    <div
                        onMouseEnter={() => setHoveringIndexRow(true)}
                        onMouseLeave={() => setHoveringIndexRow(false)}
                        className="relative rounded-3xl border border-white/12 bg-[#0B0B10]/90 backdrop-blur-2xl divide-y divide-white/10 overflow-hidden"
                    >
                        {filtered.map((item, idx) => {
                            const on = idx === safeIdx;
                            const roles = item.roles ?? FEATURED_ROLES_FALLBACK[item.id] ?? ['Production'];
                            return (
                                <button
                                    key={item.id}
                                    type="button"
                                    onMouseEnter={() => setActiveIdx(idx)}
                                    onFocus={() => setActiveIdx(idx)}
                                    onClick={() => playProject(item, setModalTarget)}
                                    className={`w-full text-left px-5 sm:px-8 py-5 sm:py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors duration-200 ${
                                        on ? 'bg-white/[0.08]' : 'hover:bg-white/[0.04]'
                                    }`}
                                >
                                    <div className="flex items-center gap-5 min-w-0">
                                        <span className="font-mono text-xs sm:text-sm font-bold text-[#F59E0B] w-8 shrink-0">
                                            {String(idx + 1).padStart(2, '0')}
                                        </span>
                                        <div className="min-w-0">
                                            <h3 className="font-display font-bold text-lg sm:text-2xl text-white truncate">
                                                {item.title}
                                            </h3>
                                            <p className="text-xs text-white/50 truncate mt-0.5">
                                                {item.description || item.client}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3 sm:gap-6 shrink-0">
                                        <span className="font-mono text-xs text-white/60">
                                            {item.client || item.category}
                                        </span>
                                        <div className="hidden md:flex items-center gap-1.5">
                                            {roles.map((r) => (
                                                <span
                                                    key={r}
                                                    className="rounded-full border border-white/15 bg-white/[0.04] px-3 py-1 font-mono text-[11px] text-white/80"
                                                >
                                                    {r}
                                                </span>
                                            ))}
                                        </div>
                                        <span className="font-mono text-xs text-white/45 w-12 text-right">
                                            {item.year}
                                        </span>
                                        <span className="h-9 w-9 rounded-full border border-white/20 flex items-center justify-center text-white">
                                            <Play className="w-3.5 h-3.5 fill-current" />
                                        </span>
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                )}
            </main>

            {/* Floating Cursor Preview Window for Index Mode */}
            <div
                ref={cursorCardRef}
                className={`pointer-events-none fixed top-0 left-0 z-50 hidden lg:block w-[340px] aspect-video rounded-2xl overflow-hidden ring-2 ring-[#F59E0B] bg-black shadow-[0_24px_70px_rgba(0,0,0,0.9)] transition-opacity duration-200 ${
                    viewMode === 'index' && hoveringIndexRow ? 'opacity-100' : 'opacity-0'
                }`}
            >
                {activeProject?.image && (
                    <SafeImage
                        src={activeProject.image}
                        alt={activeProject.title}
                        fill
                        sizes="340px"
                        className="object-cover"
                    />
                )}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 to-transparent p-3">
                    <div className="font-mono text-[10px] text-[#F59E0B]">{activeProject?.client}</div>
                    <div className="font-display font-bold text-xs text-white truncate">
                        {activeProject?.title}
                    </div>
                </div>
            </div>

            <VideoModal target={modalTarget} onClose={() => setModalTarget(null)} />
        </div>
    );
}
