'use client';

import { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX, Play, Pause, X, Maximize2, Sparkles } from 'lucide-react';

export type ModalTarget =
    | { kind: 'showreel'; variant?: 'stomp20' | 'full' }
    | { kind: 'youtube'; videoId: string; title?: string; client?: string }
    | null;

const fmtTime = (sec: number) => {
    if (!Number.isFinite(sec) || sec < 0) return '00:00';
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
};

export default function VideoModal({ target, onClose }: { target: ModalTarget; onClose: () => void }) {
    const vidRef = useRef<HTMLVideoElement>(null);
    const [playing, setPlaying] = useState(true);
    const [muted, setMuted] = useState(false);
    const [cur, setCur] = useState(0);
    const [dur, setDur] = useState(20);
    const [reelMode, setReelMode] = useState<'stomp20' | 'full'>('stomp20');

    useEffect(() => {
        if (!target) return;
        setPlaying(true);
        setMuted(false);
        setCur(0);
        if (target.kind === 'showreel') {
            setReelMode(target.variant ?? 'stomp20');
        }
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
            if (e.key === ' ' && target.kind === 'showreel' && reelMode === 'full' && vidRef.current) {
                e.preventDefault();
                if (vidRef.current.paused) {
                    vidRef.current.play();
                    setPlaying(true);
                } else {
                    vidRef.current.pause();
                    setPlaying(false);
                }
            }
        };
        const onMsg = (e: MessageEvent) => {
            if (e.data?.type === 'SUPERSMILE_CLOSE_MODAL') onClose();
        };
        window.addEventListener('keydown', onKey);
        window.addEventListener('message', onMsg);
        return () => {
            window.removeEventListener('keydown', onKey);
            window.removeEventListener('message', onMsg);
        };
    }, [target, onClose, reelMode]);

    if (!target) return null;

    const togglePlay = () => {
        const v = vidRef.current;
        if (!v) return;
        if (v.paused) {
            v.play();
            setPlaying(true);
        } else {
            v.pause();
            setPlaying(false);
        }
    };

    const toggleMute = () => {
        const v = vidRef.current;
        if (!v) return;
        v.muted = !v.muted;
        setMuted(v.muted);
    };

    const seek = (e: React.MouseEvent<HTMLDivElement>) => {
        const v = vidRef.current;
        if (!v || !dur) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const pct = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
        v.currentTime = pct * dur;
        setCur(v.currentTime);
    };

    const isKineticEmbed = target.kind === 'showreel' && reelMode === 'stomp20';
    const videoSrc = '/videos/showreel-2026-typo.mp4?v=2';

    return (
        <div className="fixed inset-0 z-[200] flex flex-col items-center justify-center p-4 md:p-10 bg-[#040406]/95 backdrop-blur-2xl animate-fade-in">
            <div className="absolute inset-0" onClick={onClose} />

            {/* Top Screening Bar */}
            <div className="relative z-10 w-full max-w-6xl flex flex-wrap items-center justify-between gap-3 mb-3 px-1 font-mono text-xs tracking-[0.14em] text-white/70">
                <div className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-[#EF4444] animate-pulse" />
                    <span className="text-white font-semibold uppercase">
                        {target.kind === 'showreel'
                            ? reelMode === 'stomp20'
                                ? 'SUPERSMILE® KINETIC MV SHOWREEL (145 BPM · MASTER AUDIO)'
                                : 'SUPERSMILE® 2026 FULL SHOWREEL — MASTER AUDIO'
                            : target.title || 'SELECTED WORK SCREENING'}
                    </span>
                    {target.kind === 'youtube' && target.client && (
                        <span className="hidden md:inline text-white/40">/ {target.client}</span>
                    )}
                </div>

                <div className="flex items-center gap-2">
                    {target.kind === 'showreel' && (
                        <div className="inline-flex items-center rounded-full border border-white/15 bg-white/[0.04] p-0.5 text-[11px]">
                            <button
                                type="button"
                                onClick={() => setReelMode('stomp20')}
                                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-sans font-semibold transition-colors ${
                                    reelMode === 'stomp20'
                                        ? 'bg-[#FAFAFA] text-[#09090B]'
                                        : 'text-white/65 hover:text-white'
                                }`}
                            >
                                <Sparkles className="w-3 h-3 text-[#F59E0B]" />
                                <span>Kinetic MV Reel (01:22)</span>
                            </button>
                            <button
                                type="button"
                                onClick={() => setReelMode('full')}
                                className={`rounded-full px-3 py-1 font-sans font-semibold transition-colors ${
                                    reelMode === 'full'
                                        ? 'bg-[#FAFAFA] text-[#09090B]'
                                        : 'text-white/65 hover:text-white'
                                }`}
                            >
                                Full Showreel (01:37)
                            </button>
                        </div>
                    )}

                    <button
                        onClick={onClose}
                        aria-label="Close"
                        className="press-tactile flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.06] px-4 py-1.5 text-white hover:bg-white hover:text-black transition-colors"
                    >
                        <span>CLOSE</span>
                        <X className="w-3.5 h-3.5" />
                    </button>
                </div>
            </div>

            {/* Cinema Screen */}
            <div className="relative z-10 w-full max-w-6xl aspect-video bg-black rounded-2xl overflow-hidden ring-1 ring-white/15 shadow-[0_30px_100px_rgba(0,0,0,0.9)]">
                {isKineticEmbed ? (
                    <iframe
                        key="kinetic-showreel-embed"
                        src="/kinetic-showreel/index.html?autoplay=1"
                        title="SuperSmile Kinetic Typography Showreel"
                        allow="autoplay; fullscreen"
                        allowFullScreen
                        className="w-full h-full border-0"
                    />
                ) : target.kind === 'showreel' ? (
                    <>
                        <video
                            key={videoSrc}
                            ref={vidRef}
                            src={videoSrc}
                            poster="/videos/showreel-poster.jpg"
                            autoPlay
                            playsInline
                            onClick={togglePlay}
                            onTimeUpdate={(e) => setCur(e.currentTarget.currentTime)}
                            onLoadedMetadata={(e) => setDur(e.currentTarget.duration || 20)}
                            className="w-full h-full object-cover cursor-pointer"
                        />

                        {/* Custom Cinema Scrubber Controls */}
                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent pt-12 pb-4 px-5 flex flex-col gap-3">
                            <div
                                onClick={seek}
                                role="slider"
                                aria-label="Showreel timeline"
                                aria-valuemin={0}
                                aria-valuemax={Math.round(dur)}
                                aria-valuenow={Math.round(cur)}
                                tabIndex={0}
                                className="group relative h-2 w-full bg-white/20 rounded-full cursor-pointer flex items-center"
                            >
                                <div
                                    className="h-full bg-[#F59E0B] rounded-full relative"
                                    style={{ width: `${Math.min(100, (cur / Math.max(1, dur)) * 100)}%` }}
                                >
                                    <span className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-3.5 h-3.5 rounded-full bg-white shadow scale-90 group-hover:scale-125 transition-transform" />
                                </div>
                            </div>

                            <div className="flex items-center justify-between font-mono text-xs text-white/80">
                                <div className="flex items-center gap-4">
                                    <button onClick={togglePlay} className="press-tactile flex items-center gap-1.5 hover:text-[#F59E0B]">
                                        {playing ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                                        <span>{playing ? 'PAUSE' : 'PLAY'}</span>
                                    </button>
                                    <button onClick={toggleMute} className="press-tactile flex items-center gap-1.5 hover:text-[#F59E0B]">
                                        {muted ? <VolumeX className="w-4 h-4 text-white/50" /> : <Volume2 className="w-4 h-4 text-[#F59E0B]" />}
                                        <span>{muted ? 'MUTED' : 'MASTER AUDIO ON'}</span>
                                    </button>
                                    <span className="tabular-nums text-white/60">
                                        {fmtTime(cur)} <span className="text-white/30">/</span> {fmtTime(dur)}
                                    </span>
                                </div>

                                <button
                                    onClick={() => vidRef.current?.requestFullscreen?.()}
                                    className="press-tactile flex items-center gap-1.5 text-white/60 hover:text-white"
                                >
                                    <Maximize2 className="w-3.5 h-3.5" />
                                    <span className="hidden sm:inline">FULLSCREEN</span>
                                </button>
                            </div>
                        </div>
                    </>
                ) : (
                    <iframe
                        className="w-full h-full"
                        src={`https://www.youtube.com/embed/${target.videoId}?autoplay=1&rel=0&modestbranding=1`}
                        title={target.title || 'Project Video'}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    />
                )}
            </div>
        </div>
    );
}
