'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import Footer from '@/components/layout/Footer';

// Dummy Categories
const CATEGORIES = ["ALL", "Entertainment", "Branded", "Live", "Event"];

// Dummy Data
const PROJECTS = [
    { id: 1, title: "Samsung Galaxy S24", category: "Branded", client: "Samsung" },
    { id: 2, title: "Neon City", category: "Entertainment", client: "YouTube Original" },
    { id: 3, title: "2023 One Hoop", category: "Live", client: "MGTV", youtubeId: "k5hDsLhtkL8", image: "/images/project-one-hoop.png", link: "https://youtu.be/k5hDsLhtkL8" },
    { id: 17, title: "2017, 2018 World DJ Festival", category: "Event", client: "SBSMTV", youtubeId: "PYAMWgzKMuk", image: "/images/project-wdjf.png", link: "https://youtu.be/PYAMWgzKMuk" },
    { id: 4, title: "World ID KOREA 오픈 행사", category: "Event", client: "World ID", youtubeId: "uLk3-_WCa2Y", image: "/images/project-world-id.png", link: "https://www.youtube.com/watch?v=uLk3-_WCa2Y" },
    { id: 16, title: "현대카드TECH TALK", category: "Event", client: "현대카드x원티드", youtubeId: "tk_8n500hi0", image: "/images/project-hyundaicard-techtalk.png", link: "https://youtu.be/tk_8n500hi0" },
    { id: 5, title: "Nike Air Max", category: "Branded", client: "Nike" },
    { id: 6, title: "Late Night Show", category: "Entertainment", client: "TVN" },
    { id: 7, title: "AFK 슬기로운 아레나생활", category: "Live", client: "AFK아레나", youtubeId: "MiPtakEMKqw", image: "/images/project-afk-arena.png", link: "https://youtu.be/MiPtakEMKqw" },

    { id: 9, title: "Coca Cola Zero", category: "Branded", client: "Coca Cola" },
    { id: 10, title: "Web Series Pilot", category: "Entertainment", client: "Netflix" },
    { id: 11, title: "마비노기 2025 겨울 쇼케이스 OAP", category: "Live", client: "넥슨", youtubeId: "7wJR_P7uYHM", image: "/images/project-mabinogi-2025.png", link: "https://youtu.be/7wJR_P7uYHM" },

    { id: 13, title: "Stylus 화보촬영", category: "Event", client: "Stylus", youtubeId: "Vk_L494o66A", image: "/images/project-stylus.png", link: "https://youtu.be/Vk_L494o66A" },
    { id: 14, title: "매치스x미국감자협회", category: "Event", client: "미국감자협회", youtubeId: "c916GVygOss", image: "/images/project-us-potatoes.png", link: "https://youtu.be/c916GVygOss" },
    { id: 15, title: "윌로드 x 미국감자협회", category: "Event", client: "미국감자협회", youtubeId: "h92jemAZAWc", image: "/images/project-wilload-us-potatoes.png", link: "https://youtu.be/h92jemAZAWc" },
    { id: 18, title: "마비노기 2023 겨울 라이브 쇼케이스", category: "Live", client: "넥슨", youtubeId: "1jx6YYNfv-8", image: "/images/project-mabinogi.png", link: "https://youtu.be/1jx6YYNfv-8" },
    { id: 19, title: "메이플스토리 팡글대전", category: "Live", client: "넥슨", youtubeId: "tr0OKOiv8eA", image: "/images/project-maplestory-panggle.png", link: "https://youtu.be/tr0OKOiv8eA" },
];

export default function WorkPage() {
    const [selectedCategory, setSelectedCategory] = useState("ALL");
    const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

    const filteredProjects = selectedCategory === "ALL"
        ? PROJECTS
        : PROJECTS.filter(p => p.category === selectedCategory);

    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setSelectedVideo(null);
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, []);

    return (
        <main className="min-h-screen bg-[#050505] text-white pt-24">
            <div className="container mx-auto px-6 py-12 relative z-10">
                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Sidebar Filter (Left Column) */}
                    <div className="lg:w-1/5">
                        <div className="sticky top-32 flex flex-col space-y-4">
                            <h2 className="text-xl font-display font-bold mb-4 text-white/50 tracking-wider">WORK</h2>
                            {CATEGORIES.map((category) => (
                                <button
                                    key={category}
                                    onClick={() => setSelectedCategory(category)}
                                    className={cn(
                                        "text-left text-lg transition-all duration-300 font-medium",
                                        selectedCategory === category
                                            ? "text-primary font-bold pl-4 border-l-2 border-primary"
                                            : "text-gray-400 hover:text-white"
                                    )}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Gallery Grid (Right Column) */}
                    <div className="lg:w-4/5">
                        <motion.div
                            layout
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        >
                            <AnimatePresence mode="popLayout">
                                {filteredProjects.map((project: any) => (
                                    <motion.div
                                        layout
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        transition={{ duration: 0.3 }}
                                        key={project.id}
                                        onClick={() => {
                                            if (project.youtubeId) {
                                                setSelectedVideo(project.youtubeId);
                                            } else if (project.link) {
                                                // Extract ID if possible or just fallback to link
                                                const match = project.link.match(/v=([^&]+)/);
                                                if (match) {
                                                    setSelectedVideo(match[1]);
                                                } else {
                                                    window.open(project.link, '_blank');
                                                }
                                            }
                                        }}
                                        className="group relative aspect-video bg-neutral-900 border border-white/5 overflow-hidden rounded-sm cursor-pointer hover:border-primary/50 transition-colors"
                                    >
                                        {/* Image or Placeholder Visual */}
                                        {project.image ? (
                                            <div className="absolute inset-0">
                                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                                <img
                                                    src={project.image}
                                                    alt={project.title}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                />
                                                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500" />
                                            </div>
                                        ) : (
                                            <div className="absolute inset-0 bg-gradient-to-br from-neutral-800 to-neutral-900 group-hover:scale-105 transition-transform duration-500 flex items-center justify-center">
                                                <div className="font-display text-4xl font-bold text-white/5 group-hover:text-white/10 transition-colors">
                                                    {project.title.substring(0, 2).toUpperCase()}
                                                </div>
                                            </div>
                                        )}

                                        {/* Overlay Content */}
                                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4 text-center">
                                            <span className="text-primary text-xs tracking-widest uppercase mb-2 font-bold">{project.category}</span>
                                            <h3 className="font-display text-xl font-bold">{project.title}</h3>
                                            <p className="text-sm text-gray-300 mt-1">{project.client}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Video Modal */}
            <AnimatePresence>
                {selectedVideo && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-12 bg-black/90 backdrop-blur-sm"
                    >
                        {/* Backdrop Click to Close */}
                        <div className="absolute inset-0" onClick={() => setSelectedVideo(null)} />

                        {/* Close Button */}
                        <button
                            onClick={() => setSelectedVideo(null)}
                            className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors z-[60]"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </button>

                        {/* Video Container */}
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="relative w-full max-w-6xl aspect-video bg-black rounded-lg overflow-hidden shadow-2xl z-10"
                        >
                            <iframe
                                className="w-full h-full"
                                src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1&rel=0&modestbranding=1`}
                                title="Project Video"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <Footer />
        </main>
    );
}
