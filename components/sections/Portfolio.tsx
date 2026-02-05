'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Link from 'next/link';
import ProjectCard from './ProjectCard';
import ProjectDetailModal from './ProjectDetailModal';

// Specific Selected Works for Main Page
const SELECTED_WORKS = [
    {
        id: 29,
        title: "Dear My X (디어마이엑스)_POST",
        category: "WEB SERIES",
        client: "ENA",
        year: "DEC 2025",
        youtubeLink: "https://youtu.be/Le3T_pgn734",
        image: "/assets/dear_my_x.png",
        description: "ENA의 예능 '디어마이엑스' 후반작업에 참여했습니다. 감정선을 섬세하게 살리는 편집과 색보정으로 프로그램의 완성도를 높였습니다.",
        slogan: "Trend-leading Content"
    },
    {
        id: 21,
        title: "Anyway Champagne (아무튼샴페인)",
        category: "COMMERCIAL",
        client: "Perrier-Jouët",
        year: "AUG 2021",
        youtubeLink: "https://youtu.be/HtM9KkbhnOw",
        image: "/assets/anyway_champagne.png",
        description: "페리에주에 코리아와 함께한 럭셔리 샴페인 브랜디드 콘텐츠 시리즈입니다. 아름다운 영상미로 브랜드의 우아함을 담아냈습니다.",
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

export default function Portfolio() {
    const [selectedProject, setSelectedProject] = useState<any | null>(null);

    return (
        <section id="work" className="relative min-h-screen bg-neutral-950 py-24 md:py-32">
            <div className="container mx-auto px-6">

                {/* Section Header */}
                <div className="mb-12 md:mb-16 md:pl-6">
                    <h2 className="font-display text-4xl md:text-6xl font-bold text-white mb-4">
                        SELECTED <span className="text-primary-glow text-primary">WORKS</span>
                    </h2>
                    <div className="h-1 w-24 bg-primary" />
                </div>

                {/* Bento Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-6 gap-4 w-full">
                    {SELECTED_WORKS.map((project, index) => {
                        // Bento Grid Logic:
                        // Row 1: First 2 items (50% width each -> col-span-3)
                        // Row 2: Next 3 items (33% width each -> col-span-2)
                        const isLarge = index < 2;
                        const colSpanClass = isLarge ? "md:col-span-3" : "md:col-span-2";

                        return (
                            <motion.div
                                key={project.id}
                                className={`${colSpanClass} w-full h-full min-h-[300px] md:min-h-[400px]`}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                            >
                                <Link href={`/work?category=${project.category}`} className="block w-full h-full">
                                    <ProjectCard
                                        index={index}
                                        title={project.title}
                                        category={project.category}
                                        image={project.image}
                                        client={project.client}
                                        released={project.year}
                                        slogan={project.slogan}
                                    />
                                </Link>
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            {/* Project Detail Modal */}
            <ProjectDetailModal
                project={selectedProject}
                onClose={() => setSelectedProject(null)}
            />
        </section>
    );
}
