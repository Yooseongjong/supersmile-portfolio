'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import ProjectCard from './ProjectCard';
import ProjectDetailModal from './ProjectDetailModal';

// Specific Selected Works for Main Page
const SELECTED_WORKS = [
    {
        id: 402,
        title: "MAPLESTORY ESCAPE (메이플스토리 방탈출 예능)",
        category: "WEB SERIES",
        client: "NEXON (메이플스토리)",
        year: "SEP 2026",
        roles: ["Planning", "Scriptwriting", "Directing", "Post-Production"],
        youtubeLink: "https://www.youtube.com/watch?v=TCPzqfWmoV8",
        videoUrl: "https://www.youtube.com/watch?v=TCPzqfWmoV8",
        image: "https://i.ytimg.com/vi/TCPzqfWmoV8/hqdefault.jpg",
        description: "넥슨 메이플스토리 방탈출 프로모션 웹예능 시리즈.",
        slogan: "High-Tension Survival Escape Game Show"
    },
    {
        id: 403,
        title: "ENA 《식장앞》 시리즈_POST",
        category: "WEB SERIES",
        client: "ENA",
        year: "SEP 2026 (Series)",
        roles: ["POST-PRODUCTION", "Editing", "Subtitles", "DI"],
        youtubeLink: "https://www.youtube.com/watch?v=G6an5C6a0AA",
        videoUrl: "https://www.youtube.com/watch?v=G6an5C6a0AA",
        image: "https://i.ytimg.com/vi/G6an5C6a0AA/hqdefault.jpg",
        description: "ENA 오리지널 웹예능 《식장앞》 후반 종편.",
        slogan: "Trendy Talk Variety Post-Production"
    },
    {
        id: 404,
        title: "배틀그라운드 《치킨한마리》 시리즈_편집",
        category: "WEB SERIES",
        client: "KRAFTON (PUBG: BATTLEGROUNDS Korea)",
        year: "JUL 2026 (Series)",
        roles: ["Editing"],
        youtubeLink: "https://www.youtube.com/watch?v=rjfb-qAA9pA",
        videoUrl: "https://www.youtube.com/watch?v=rjfb-qAA9pA",
        image: "https://i.ytimg.com/vi/rjfb-qAA9pA/hqdefault.jpg",
        description: "배틀그라운드 공식 웹예능 《치킨한마리》 편집.",
        slogan: "Dynamic Game Survival Editing"
    },
    {
        id: 405,
        title: "DEVELON Global 브랜드 필름 & 《밀착꿀착》 시리즈",
        category: "COMMERCIAL",
        client: "HD현대인프라코어 (DEVELON Global / Korea)",
        year: "2025 – 2026 (Ongoing)",
        roles: ["Directing", "Cinematography", "Editing", "DI"],
        youtubeLink: "https://www.youtube.com/watch?v=SP7N_z9glng",
        videoUrl: "https://www.youtube.com/watch?v=SP7N_z9glng",
        image: "https://i.ytimg.com/vi/SP7N_z9glng/hqdefault.jpg",
        description: "DEVELON Global 브랜드 필름 및 《밀착꿀착》 시리즈 제작.",
        slogan: "Heavy Duty Dynamic Cinematography"
    },
    {
        id: 29,
        title: "Dear My X (디어마이엑스)_POST",
        category: "WEB SERIES",
        client: "ENA",
        year: "DEC 2025",
        roles: ["POST-PRODUCTION", "Editing", "Subtitles", "DI"],
        youtubeLink: "https://youtu.be/mQMc-aAt0eA",
        image: "/assets/project-dear-my-x-final.png",
        description: "ENA의 예능 '디어마이엑스' 후반작업에 참여했습니다. 감정선을 섬세하게 살리는 편집과 색보정으로 프로그램의 완성도를 높였습니다.",
        slogan: "Trend-leading Content"
    },
    {
        id: 31,
        title: "미스트롯4 x 진탁막걸리 TVCF",
        category: "COMMERCIAL",
        client: "TV조선, 대학내일",
        year: "2026",
        roles: ["Directing", "Editing", "In-House DI"],
        youtubeLink: "https://youtu.be/v8zzD7QmClU",
        image: "/assets/mistrot_jintak_main.jpg",
        description: "미스트롯4와 진탁막걸리가 함께한 TVCF 영상입니다.",
        slogan: "Creative Brand Storytelling"
    },
    {
        id: 24,
        title: "L1STEN: Jamie (L1STEN:제이미)",
        category: "PERFORMANCE",
        client: "Genie music x playtogether",
        year: "FEB 2022",
        youtubeLink: "https://youtu.be/NylH_k2Q-8w",
        image: "/assets/listen_jamie_final.png",
        description: "Gene music과 Play together가 함께한 메타버스 콘서트입니다. 가상 공간에서의 몰입감 넘치는 공연 경험을 선사했습니다.",
        slogan: "Dynamic Visual Experience"
    },
    {
        id: 106,
        title: "2025 Mabinogi Showcase_OAP",
        category: "LIVE",
        client: "NEXON",
        year: "NOV 2025",
        youtubeLink: "https://youtu.be/7wJR_P7uYHM",
        image: "/images/project-mabinogi-2025.png",
        description: "마비노기 2025 겨울 쇼케이스 OAP 영상입니다.",
        slogan: "Vivid Moments, Live"
    },
    {
        id: 302,
        title: "Hanwha Life Future Finance Talent",
        category: "CORPORATE",
        client: "Hanwha Life",
        year: "NOV 2025",
        youtubeLink: "https://youtu.be/7ZMJ_EIrHQY",
        image: "/assets/hanwha_future_finance.png",
        description: "한화생명 미래금융인재 공모전 영상입니다.",
        slogan: "Professional Identity"
    }
];

// 메인 노출 우선순위 (목록에 없는 기존 항목은 원래 순서대로 뒤에 노출)
const PRIORITY_IDS = [31, 402, 403, 404, 405, 29];
const SORTED_WORKS = [...SELECTED_WORKS].sort((a, b) => {
    const ia = PRIORITY_IDS.indexOf(a.id);
    const ib = PRIORITY_IDS.indexOf(b.id);
    return (ia === -1 ? 999 : ia) - (ib === -1 ? 999 : ib);
});

const getYoutubeId = (link?: string) =>
    link?.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=))([^&?]+)/)?.[1] ?? null;

export default function Portfolio() {
    const [selectedProject, setSelectedProject] = useState<any | null>(null);
    const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setSelectedVideo(null);
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, []);

    return (
        <section id="work" className="relative min-h-screen bg-background py-24 md:py-32">
            <div className="container mx-auto px-6">

                {/* Section Header */}
                <div className="mb-12 md:mb-16 md:pl-6">
                    <p className="font-mono text-xs tracking-[0.3em] text-primary uppercase mb-4">[ 05 / Selected Works ]</p>
                    <h2 className="font-display text-4xl md:text-7xl font-bold text-white mb-4 tracking-tight leading-[0.95]">
                        SELECTED <span className="text-primary">WORKS</span>
                    </h2>
                    <div className="h-1 w-24 bg-primary" />
                </div>

                {/* Bento Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-6 gap-4 w-full">
                    {SORTED_WORKS.map((project, index) => {
                        // 우선순위 6개 + 기존 3개 = 3열 균등 그리드
                        const colSpanClass = "md:col-span-2";

                        return (
                            <motion.div
                                key={project.id}
                                className={`${colSpanClass} w-full h-full min-h-[300px] md:min-h-[400px]`}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                            >
                                <div
                                    className="block w-full h-full"
                                    onClick={() => {
                                        const vid = getYoutubeId(project.youtubeLink || (project as any).videoUrl);
                                        if (vid) setSelectedVideo(vid);
                                    }}
                                >
                                    <ProjectCard
                                        index={index}
                                        title={project.title}
                                        category={project.category}
                                        image={project.image}
                                        client={project.client}
                                        released={project.year}
                                        slogan={project.slogan}
                                        roles={(project as any).roles}
                                    />
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            {/* Video Modal */}
            <AnimatePresence>
                {selectedVideo && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12 bg-black/90 backdrop-blur-sm"
                    >
                        <div className="absolute inset-0" onClick={() => setSelectedVideo(null)} />
                        <button
                            onClick={() => setSelectedVideo(null)}
                            className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors z-[110] text-4xl leading-none"
                            aria-label="Close"
                        >
                            &times;
                        </button>
                        <div className="relative w-full max-w-6xl aspect-video bg-black rounded-lg overflow-hidden shadow-2xl z-10">
                            <iframe
                                className="w-full h-full"
                                src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1&rel=0&modestbranding=1`}
                                title="Project Video"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Project Detail Modal */}
            <ProjectDetailModal
                project={selectedProject}
                onClose={() => setSelectedProject(null)}
            />
        </section>
    );
}
