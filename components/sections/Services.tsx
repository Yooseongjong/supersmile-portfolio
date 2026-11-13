'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import type { MouseEvent } from 'react';

const TRACKS = [
    {
        no: 'TRACK 01',
        title: 'High-End Cinema & Broadcast',
        accent: 'text-primary',
        items: ['TVCF', '브랜드 필름', '웹 오리지널 예능', '프로덕션 & 마스터 DI / 종편'],
        desc: '기획부터 촬영, 편집, 인하우스 DI까지. 방송과 브랜드 캠페인의 퀄리티를 한 팀이 끝까지 책임집니다.',
        span: 'md:col-span-3',
        },
    {
        no: 'TRACK 02',
        title: 'Next-Gen AI & B2B Studio',
        accent: 'text-amber',
        items: ['송도 BT센터 스튜디오 기반 제품 필름', '글로벌 단편', '시네마틱 AI 콘텐츠', '초고속 종편 파이프라인'],
        desc: '송도 BT센터 스튜디오에서 제품 필름과 글로벌 단편을, 생성형 AI 파이프라인과 결합해 빠르고 시네마틱하게 완성합니다.',
        span: 'md:col-span-3',
    },
];

function onMove(e: MouseEvent<HTMLElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`);
}

export default function Services() {
    return (
        <section id="services" className="py-24 md:py-32 bg-background text-white overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="mb-12 md:mb-16">
                    <p className="font-mono text-xs tracking-[0.3em] text-primary uppercase mb-4">[ 04 / What We Do ]</p>
                    <h2 className="font-display text-4xl md:text-7xl font-bold leading-[0.95] tracking-tight">
                        DUAL-TRACK <span className="text-white/30">SERVICES</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
                    {TRACKS.map((t, i) => (
                        <motion.article
                            key={t.no}
                            onMouseMove={onMove}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: i * 0.1 }}
                            className={`spotlight-card ${t.span} group overflow-hidden rounded-sm border border-white/10 hover:border-white/25 transition-colors p-8 md:p-10 min-h-[420px] flex flex-col justify-between`}
                        >
                            <div className="relative z-10 flex items-start justify-between">
                                <span className={`font-mono text-xs tracking-[0.3em] ${t.accent}`}>{t.no}</span>
                                <ArrowUpRight className="text-white/20 group-hover:text-white transition-all group-hover:translate-x-1 group-hover:-translate-y-1" />
                            </div>

                            <div className="relative z-10">
                                <h3 className="font-display text-3xl md:text-5xl font-bold leading-tight mb-5">{t.title}</h3>
                                <p className="text-white/50 group-hover:text-white/75 transition-colors leading-relaxed mb-8 max-w-xl break-keep">{t.desc}</p>
                                <ul className="flex flex-wrap gap-2">
                                    {t.items.map((it) => (
                                        <li key={it} className="font-mono text-[11px] tracking-wider border border-white/15 px-3 py-1.5 text-white/70 bg-black/30">
                                            {it}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </motion.article>
                    ))}
                </div>
            </div>
        </section>
    );
}
