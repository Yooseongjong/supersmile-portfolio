'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function About() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const variants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <section id="about" ref={containerRef} className="relative min-h-[150vh] bg-[#050505] text-white">
            <div className="sticky top-0 h-screen flex items-center overflow-hidden">
                <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

                    {/* Text Content - Stays Sticky */}
                    <div className="space-y-10 z-10">
                        <motion.h2
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="font-display text-6xl md:text-8xl font-bold leading-none tracking-tighter"
                        >
                            WE CRAFT <br />
                            <span className="text-primary">SMILES.</span>
                        </motion.h2>

                        <div className="space-y-8 max-w-lg">
                            <motion.div
                                initial="hidden"
                                whileInView="visible"
                                variants={variants}
                                transition={{ duration: 0.6, delay: 0.2 }}
                            >
                                <h3 className="text-xl md:text-2xl font-bold text-white mb-2">&quot;장르의 경계를 지우는 크리에이티브&quot;</h3>
                                <p className="text-[#CCCCCC] leading-relaxed text-lg">
                                    방송 콘텐츠의 대중적 감각과 브랜드 필름의 시네마틱한 미학을 동시에 구현합니다.
                                    삼성, SK 등 국내 유수 대기업 및 주요 정부 기관과의 수많은 프로젝트가 우리의 역량을 증명합니다.
                                </p>
                            </motion.div>

                            <motion.div
                                initial="hidden"
                                whileInView="visible"
                                variants={variants}
                                transition={{ duration: 0.6, delay: 0.4 }}
                            >
                                <h3 className="text-xl md:text-2xl font-bold text-white mb-2">&quot;Visual Identity by Direct DI&quot;</h3>
                                <p className="text-[#CCCCCC] leading-relaxed text-lg">
                                    남들과 다른 퀄리티의 비밀은 &apos;마지막 1%&apos;에 있습니다.
                                    전문 PD가 직접 수행하는 섬세한 DI(색보정) 작업을 통해, 브랜드 고유의 트렌디하고 독보적인 톤앤매너를 완성합니다.
                                </p>
                            </motion.div>

                            <motion.div
                                initial="hidden"
                                whileInView="visible"
                                variants={variants}
                                transition={{ duration: 0.6, delay: 0.6 }}
                            >
                                <h3 className="text-xl md:text-2xl font-bold text-white mb-2">&quot;Veteran Squad, Smart Budget&quot;</h3>
                                <p className="text-[#CCCCCC] leading-relaxed text-lg">
                                    최고의 결과물은 최고의 팀에서 나옵니다.
                                    업계 베테랑들로 구성된 최적의 팀 세팅으로, 불필요한 비용은 줄이고 영상의 가치는 극대화합니다.
                                </p>
                            </motion.div>
                        </div>

                    </div>

                    {/* Visuals - Controlled by Scroll */}
                    <div className="relative w-full aspect-video hidden md:block">
                        <motion.div
                            style={{ y: useTransform(scrollYProgress, [0, 1], [100, -100]), opacity: useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]) }}
                            className="absolute inset-0 border border-white/10 rounded-xl overflow-hidden group"
                        >
                            <iframe
                                className="w-full h-full object-cover"
                                src="https://www.youtube.com/embed/kXGcqs_XV4s?rel=0&modestbranding=1&controls=1"
                                title="Showreel"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        </motion.div>

                        <motion.div
                            style={{ y: useTransform(scrollYProgress, [0, 1], [400, -400]), rotate: useTransform(scrollYProgress, [0, 1], [10, -10]), zIndex: -1 }}
                            className="absolute top-1/2 -right-12 w-64 h-64 bg-primary/5 rounded-full blur-3xl"
                        />
                    </div>

                </div>
            </div>

            {/* Scroll extensions */}
            <div className="h-[50vh]" />
        </section>
    );
}
