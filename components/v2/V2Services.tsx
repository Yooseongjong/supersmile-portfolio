'use client';

import { useState } from 'react';
import { Film, Tv, Sliders, Cpu, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import KineticStampHeader from './KineticStampHeader';

const BENTO_CAPABILITIES = [
    {
        code: '01',
        tag: 'COMMERCIAL & BRANDED',
        title: 'TVCF · 브랜드 필름 · 글로벌 B2B',
        desc: 'DEVELON 중장비 글로벌 필름부터 미스트롯4 X 진탁막걸리 TVCF까지, 브랜드의 핵심 메시지를 시네마틱 타격감으로 시각화합니다.',
        deliverables: ['TVCF & 디지털 캠페인', '글로벌 제품 마스터 필름', '현장 연출 · 시네마 카메라 운용'],
        href: '/work?category=COMMERCIAL',
        span: 'lg:col-span-7',
        icon: Film,
    },
    {
        code: '02',
        tag: 'WEB ORIGINALS & VARIETY',
        title: '웹예능 · 게임 IP 오리지널 콘텐츠',
        desc: '넥슨 메이플스토리, 크래프톤 배틀그라운드, ENA 오리지널 등 높은 텐션과 도파민을 설계하는 웹 오리지널 시리즈를 제작합니다.',
        deliverables: ['유튜브 오리지널 예능', '게임 IP 쇼케이스 & 브랜디드', '트렌디 자막 · 사운드 디자인'],
        href: '/work?category=WEB%20SERIES',
        span: 'lg:col-span-5',
        icon: Tv,
    },
    {
        code: '03',
        tag: 'IN-HOUSE POST & DIRECT DI',
        title: '17년 차 감독의 인하우스 종편 & 마스터 DI',
        desc: '외주 하청 없이 촬영 원본(S-Log3 / RAW)의 의도를 가장 정확히 이해하는 메인 감독이 직접 컷 편집과 DaVinci Resolve 색보정을 총괄합니다.',
        deliverables: ['DaVinci Resolve 마스터 그레이딩', '고속 종편 파이프라인', '온에어(OAP) 마스터링'],
        href: '#direct-di',
        span: 'lg:col-span-5',
        icon: Sliders,
    },
    {
        code: '04',
        tag: 'NEXT-GEN AI & SONGDO STUDIO',
        title: '생성형 AI 시네마 · 송도 BT센터 스튜디오',
        desc: 'SK브로드밴드 AI 다큐드라마 [루프 : LOOP] 등 Flow Omni 기반 시네마틱 AI 파이프라인과 송도 자체 스튜디오 인프라를 결합합니다.',
        deliverables: ['AI 다큐드라마 & 하이브리드 연출', '송도 BT센터 전용 스튜디오', '라이브 쇼케이스 송출'],
        href: '/work?category=FEATURED',
        span: 'lg:col-span-7',
        icon: Cpu,
    },
];

export default function V2Services() {
    const [hovered, setHovered] = useState<number | null>(null);

    const handlePointerMove = (e: React.PointerEvent<HTMLElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
        e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
    };

    return (
        <section id="services" className="relative bg-[#060608] text-[#FAFAFA] py-24 md:py-32 px-5 md:px-10">
            <div className="mx-auto max-w-[1560px]">
                <KineticStampHeader
                    code="STAMP 03"
                    kicker="CORE CAPABILITIES"
                    titleLine1="CUT. RHYTHM."
                    titleAccent="BEYOND REALITY."
                    sealText="TOTAL STUDIO MATRIX"
                    sealVariant="red"
                    krSub="텐션을 설계하는 압도적 종편 & 차세대 AI 스튜디오"
                    description="기획·연출·촬영·종편·마스터 DI·생성형 AI까지, 분절 없는 원팀 파이프라인으로 속도와 퀄리티를 동시에 보증합니다."
                />

                {/* 4-Card Asymmetric Bento Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                    {BENTO_CAPABILITIES.map((card, i) => {
                        const Icon = card.icon;
                        const isHover = hovered === i;
                        return (
                            <article
                                key={card.code}
                                onPointerMove={handlePointerMove}
                                onMouseEnter={() => setHovered(i)}
                                onMouseLeave={() => setHovered(null)}
                                className={`group relative overflow-hidden rounded-3xl border border-white/12 bg-[#0B0B10] p-7 sm:p-9 flex flex-col justify-between transition-all duration-300 hover:border-[#F59E0B]/50 ${card.span}`}
                            >
                                {/* Pointer Spotlight */}
                                <div
                                    className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                    style={{
                                        background:
                                            'radial-gradient(560px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(245,158,11,0.12), transparent 45%)',
                                    }}
                                />

                                <div className="relative z-10 flex items-center justify-between">
                                    <div className="inline-flex items-center gap-2.5">
                                        <span className="font-mono text-xs font-extrabold px-2.5 py-1 rounded bg-[#F59E0B] text-black">
                                            {card.code}
                                        </span>
                                        <span className="font-mono text-xs tracking-wider text-white/55">
                                            {card.tag}
                                        </span>
                                    </div>

                                    <div
                                        className={`h-11 w-11 rounded-2xl border flex items-center justify-center transition-colors ${
                                            isHover
                                                ? 'border-[#F59E0B] bg-[#F59E0B] text-black'
                                                : 'border-white/12 bg-white/[0.04] text-white/75'
                                        }`}
                                    >
                                        <Icon className="w-5 h-5" />
                                    </div>
                                </div>

                                <div className="relative z-10 mt-10">
                                    <h3 className="font-display font-bold text-2xl sm:text-3xl text-white leading-snug mb-3 break-keep">
                                        {card.title}
                                    </h3>
                                    <p className="text-sm md:text-base text-white/65 leading-relaxed break-keep mb-6">
                                        {card.desc}
                                    </p>

                                    <div className="flex flex-wrap items-center justify-between gap-4 pt-5 border-t border-white/10">
                                        <ul className="flex flex-wrap gap-2">
                                            {card.deliverables.map((d) => (
                                                <li
                                                    key={d}
                                                    className="rounded-full border border-white/12 bg-white/[0.04] px-3.5 py-1 text-xs text-white/85"
                                                >
                                                    {d}
                                                </li>
                                            ))}
                                        </ul>

                                        <Link
                                            href={card.href}
                                            className="inline-flex items-center gap-1.5 font-mono text-xs font-bold text-[#F59E0B] hover:underline shrink-0"
                                        >
                                            <span>EXPLORE</span>
                                            <ArrowUpRight className="w-3.5 h-3.5" />
                                        </Link>
                                    </div>
                                </div>
                            </article>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
