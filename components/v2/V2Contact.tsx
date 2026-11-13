'use client';

import { useState } from 'react';
import ContactForm from '@/components/sections/ContactForm';
import { ArrowUpRight, Copy, Check, MapPin, Mail, MessageSquare } from 'lucide-react';
import KineticStampHeader from './KineticStampHeader';

export default function V2Contact() {
    const [copied, setCopied] = useState(false);

    const copyEmail = () => {
        navigator.clipboard?.writeText('seongjongman@gmail.com');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <section
            id="contact"
            className="relative bg-[#09090C] border-t border-white/10 text-[#FAFAFA] px-5 md:px-10 pt-24 md:pt-32 pb-12 overflow-hidden"
        >
            <div className="mx-auto max-w-[1560px]">
                <KineticStampHeader
                    code="STAMP 04"
                    kicker="START A PROJECT"
                    titleLine1="WE CRAFT"
                    titleAccent="SMILES."
                    sealText="SONGDO BT SUITE"
                    sealVariant="amber"
                    krSub="프로젝트 문의 및 제작 가견적 상담"
                    description="예상 일정, 레퍼런스, 제작 편수를 남겨주시면 메인 프로듀서가 확인 후 직접 회신드립니다."
                />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
                    {/* Left Bento Contact Cards */}
                    <div className="lg:col-span-5 space-y-4">
                        <div className="rounded-3xl border border-white/12 bg-[#0E0E13] p-7">
                            <div className="flex items-center justify-between mb-2">
                                <span className="inline-flex items-center gap-2 font-mono text-xs text-[#F59E0B]">
                                    <Mail className="w-3.5 h-3.5" />
                                    <span>DIRECT PRODUCER EMAIL</span>
                                </span>
                                <button
                                    type="button"
                                    onClick={copyEmail}
                                    className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.05] px-3 py-1 font-mono text-[11px] text-white/80 hover:bg-white hover:text-black transition-colors"
                                >
                                    {copied ? (
                                        <>
                                            <Check className="w-3 h-3 text-[#22C55E]" />
                                            <span>복사됨</span>
                                        </>
                                    ) : (
                                        <>
                                            <Copy className="w-3 h-3" />
                                            <span>이메일 복사</span>
                                        </>
                                    )}
                                </button>
                            </div>
                            <a
                                href="mailto:seongjongman@gmail.com"
                                className="font-display font-bold text-xl sm:text-2xl text-white hover:text-[#F59E0B] transition-colors break-all"
                            >
                                seongjongman@gmail.com
                            </a>
                        </div>

                        <div className="rounded-3xl border border-white/12 bg-[#0E0E13] p-7">
                            <div className="inline-flex items-center gap-2 font-mono text-xs text-[#F59E0B] mb-2">
                                <MapPin className="w-3.5 h-3.5" />
                                <span>SONGDO PRODUCTION SUITE</span>
                            </div>
                            <p className="text-sm md:text-base text-white/85 leading-relaxed break-keep font-medium">
                                인천광역시 연수구 송도과학로 56, 송도BT센터 210호
                            </p>
                        </div>

                        <div className="rounded-3xl border border-[#F59E0B]/30 bg-gradient-to-br from-[#F59E0B]/15 to-transparent p-7 flex items-center justify-between gap-4">
                            <div>
                                <div className="inline-flex items-center gap-2 font-mono text-xs text-[#F59E0B] mb-1">
                                    <MessageSquare className="w-3.5 h-3.5" />
                                    <span>REAL-TIME KAKAO INQUIRY</span>
                                </div>
                                <div className="font-display font-bold text-lg text-white">
                                    빠른 일정 확인 및 가견적 상담
                                </div>
                            </div>
                            <a
                                href="https://open.kakao.com/o/gU25oQdi"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="press-tactile shrink-0 inline-flex items-center gap-2 rounded-full bg-[#FAFAFA] text-[#09090B] px-5 py-3 text-xs font-bold hover:bg-[#F59E0B] transition-colors"
                            >
                                <span>오픈채팅 열기</span>
                                <ArrowUpRight className="w-4 h-4" />
                            </a>
                        </div>
                    </div>

                    {/* Right Inquiry Form */}
                    <div className="lg:col-span-7 rounded-3xl border border-white/12 bg-[#0E0E13] p-7 sm:p-10">
                        <ContactForm />
                    </div>
                </div>

                {/* Editorial Brutalist-Luxury Wordmark Footer */}
                <div className="mt-20 pt-10 border-t border-white/10">
                    <div className="font-display font-black tracking-[-0.055em] text-[10vw] leading-[0.88] text-white/[0.07] select-none uppercase text-center">
                        SUPERSMILE CREATIVE
                    </div>
                    <footer className="mt-6 flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-xs text-white/45">
                        <span>© {new Date().getFullYear()} SUPERSMILE CREATIVE. ALL RIGHTS RESERVED.</span>
                        <span>인천광역시 연수구 송도과학로 56, 송도BT센터 210호</span>
                        <span className="flex gap-5">
                            <a href="/privacy" className="hover:text-white transition-colors">
                                PRIVACY
                            </a>
                            <a href="/terms" className="hover:text-white transition-colors">
                                TERMS
                            </a>
                        </span>
                    </footer>
                </div>
            </div>
        </section>
    );
}
