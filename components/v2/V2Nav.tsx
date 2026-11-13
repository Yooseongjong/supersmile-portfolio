'use client';

import Link from 'next/link';
import { Play, Sparkles, ArrowUpRight } from 'lucide-react';

export default function V2Nav({ onOpenShowreel }: { onOpenShowreel: () => void }) {
    return (
        <header className="fixed top-4 inset-x-0 z-[100] px-4 md:px-8 pointer-events-none">
            <div className="pointer-events-auto mx-auto max-w-[1560px] h-16 rounded-full border border-white/[0.12] bg-[#09090B]/85 backdrop-blur-2xl px-5 md:px-7 flex items-center justify-between shadow-[0_20px_50px_rgba(0,0,0,0.65)]">
                <div className="flex items-center gap-4">
                    <Link
                        href="/"
                        className="font-display font-extrabold tracking-[-0.04em] text-lg md:text-xl text-[#FAFAFA] flex items-center gap-2"
                    >
                        <span>SUPERSMILE</span>
                        <span className="inline-block h-2 w-2 rounded-full bg-[#EF4444]" />
                    </Link>
                </div>

                <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-zinc-400">
                    <Link
                        href="/work"
                        className="text-[#FAFAFA] hover:text-[#F59E0B] transition-colors flex items-center gap-1"
                    >
                        <span>작업 모두보기</span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-[#F59E0B]" />
                    </Link>
                    <a href="#works" className="hover:text-[#FAFAFA] transition-colors">
                        2026. 최신작
                    </a>
                    <a href="#direct-di" className="hover:text-[#FAFAFA] transition-colors">
                        마스터 색보정
                    </a>
                    <a href="#services" className="hover:text-[#FAFAFA] transition-colors">
                        제작 역량
                    </a>
                    <a href="#contact" className="hover:text-[#FAFAFA] transition-colors">
                        제작 문의
                    </a>
                </nav>

                <div className="flex items-center gap-2">
                    <Link
                        href="/work"
                        className="press-tactile md:hidden h-9 inline-flex items-center rounded-full border border-white/[0.15] px-3.5 text-xs font-semibold text-[#FAFAFA]"
                    >
                        작업 모두보기
                    </Link>
                    <button
                        type="button"
                        onClick={onOpenShowreel}
                        className="press-tactile h-9 inline-flex items-center gap-2 rounded-full bg-[#FAFAFA] text-[#09090B] px-4 text-xs md:text-sm font-bold hover:bg-[#F59E0B] transition-colors"
                    >
                        <Sparkles className="w-3.5 h-3.5 text-[#EF4444]" />
                        <span>2026 쇼릴</span>
                        <Play className="w-3 h-3 fill-current" />
                    </button>
                </div>
            </div>
        </header>
    );
}
