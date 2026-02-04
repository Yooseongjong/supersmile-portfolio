'use client';

import { useState, useEffect, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { cn } from '@/lib/utils';
import Footer from '@/components/layout/Footer';

// Dummy Categories
const CATEGORIES = ["ALL", "WEB SERIES", "COMMERCIAL", "PERFORMANCE", "LIVE", "CORPORATE"];

// Dummy Data
const PROJECTS = [
    // WEB SERIES
    { id: 29, title: "디어마이엑스_Post", category: "WEB SERIES", client: "ENA", youtubeId: "Le3T_pgn734", image: "/assets/dear_my_x_new.png", link: "https://youtu.be/Le3T_pgn734" },
    { id: 22, title: "캐시미 이프 유캔 브랜디드 시리즈", category: "WEB SERIES", client: "Carrot", youtubeId: "VyjF8BvnsYA", image: "/assets/cash_me_if_you_can.png", link: "https://youtu.be/VyjF8BvnsYA" },
    { id: 25, title: "테크룸", category: "WEB SERIES", client: "이마트", youtubeId: "0_CP7th0ZUM", image: "/assets/tech_room.png", link: "https://youtu.be/0_CP7th0ZUM" },
    { id: 16, title: "동계스포츠의 모든 것!", category: "WEB SERIES", client: "한국관광공사", youtubeId: "GPiJaSyHjbE", image: "/assets/winter_sports_new.png", link: "https://youtu.be/GPiJaSyHjbE" },
    { id: 28, title: "숲 깊은 이야기_Post", category: "WEB SERIES", client: "하이원리조트", youtubeId: "HqJGRgxTz3w", image: "/assets/forest_story_new.png", link: "https://youtu.be/HqJGRgxTz3w" },
    { id: 30, title: "심심할 땐 과학 시즌2,3,4,5_Post", category: "WEB SERIES", client: "국립과천과학관", youtubeId: "DB7bCtOUerE", image: "/assets/science_when_bored_new.png", link: "https://youtu.be/DB7bCtOUerE" },
    { id: 26, title: "여행 소개팅 썸팅", category: "WEB SERIES", client: "DIA tv", youtubeId: "4xmlF-mBb5M", image: "/assets/something_dating.png", link: "https://youtu.be/4xmlF-mBb5M" },
    { id: 14, title: "괜찮아, 다시시작이야 시리즈", category: "WEB SERIES", client: "행정안전부", youtubeId: "p88Rz2cpXE0", image: "/assets/its_okay_restart.png", link: "https://youtu.be/p88Rz2cpXE0" },

    // COMMERCIAL
    { id: 19, title: "Optimum Nutrition 홍보영상", category: "COMMERCIAL", client: "글렌비아", youtubeId: "NDuah2bAShc", image: "/assets/optimum_nutrition.png", link: "https://youtu.be/NDuah2bAShc" },
    { id: 21, title: "아무튼 샴페인 브랜디드 시리즈", category: "COMMERCIAL", client: "페리에주에 코리아", youtubeId: "HtM9KkbhnOw", image: "/assets/anyway_champagne.png", link: "https://youtu.be/HtM9KkbhnOw" },
    { id: 20, title: "일타강사 문쌤의 DooubleX2특강", category: "COMMERCIAL", client: "롯데리아", youtubeId: "HfxZFiH2rZ0", image: "/assets/lotteria_doublex2.png", link: "https://youtu.be/HfxZFiH2rZ0" },
    { id: 310, title: "인천중앙여고 홍보영상", category: "COMMERCIAL", client: "인천중앙여고", youtubeId: "EP8-znuEPbs", image: "/assets/incheon_girls_high.png", link: "https://youtu.be/EP8-znuEPbs" },
    { id: 200, title: "\"눈물을 마시는 새\" 아트북 비하인드 씬", category: "COMMERCIAL", client: "KRAFTON", youtubeId: "SRDr5jMZziU", image: "/images/project-three-birds.png", link: "https://youtu.be/SRDr5jMZziU" },
    { id: 308, title: "경기씨네 영화관'독백'", category: "COMMERCIAL", client: "경기콘텐츠진흥원", youtubeId: "tytV-UEA5dE", image: "/assets/gyeonggi_cine_monologue.png", link: "https://youtu.be/tytV-UEA5dE" },
    { id: 17, title: "메이플스토리 웡스토랑 시리즈", category: "COMMERCIAL", client: "넥슨", youtubeId: "gWGQt9ZGda4", image: "/assets/wong_restaurant_new.png", link: "https://youtu.be/gWGQt9ZGda4" },
    { id: 201, title: "메이플x글자네pc방 실황 모음.ZIP", category: "COMMERCIAL", client: "넥슨", youtubeId: "X8XgMMpq6xU", image: "/images/project-maple-geulja.png", link: "https://youtu.be/X8XgMMpq6xU" },
    { id: 27, title: "톡톡한 정리", category: "COMMERCIAL", client: "DIA tv", youtubeId: "MJDOKGffNHo", image: "/assets/toktok_organizing.png", link: "https://youtu.be/MJDOKGffNHo" },
    { id: 12, title: "365mc 챌린지방의 쉽지 않았던 도전", category: "COMMERCIAL", client: "365mc", youtubeId: "_6S43gEHJwY", image: "/assets/365mc_challenge.png", link: "https://youtu.be/_6S43gEHJwY" },
    { id: 13, title: "2022 Let's DMZ 특별한만남", category: "COMMERCIAL", client: "Let's DMZ", youtubeId: "3ZYt2pCMpoA", image: "/assets/lets_dmz.png", link: "https://youtu.be/3ZYt2pCMpoA" },

    // PERFORMANCE
    { id: 24, title: "L1STEN.JAMIE 메타버스 콘서트", category: "PERFORMANCE", client: "Gene music x Play together", youtubeId: "NylH_k2Q-8w", image: "/assets/listen_jamie_final.png", link: "https://youtu.be/NylH_k2Q-8w" },
    { id: 102, title: "2017, 2018 World DJ Festival", category: "PERFORMANCE", client: "SBSMTV", youtubeId: "PYAMWgzKMuk", image: "/images/project-wdjf.png", link: "https://youtu.be/PYAMWgzKMuk" },
    { id: 101, title: "2023 One Hoop", category: "PERFORMANCE", client: "MGTV", youtubeId: "k5hDsLhtkL8", image: "/images/project-one-hoop.png", link: "https://youtu.be/k5hDsLhtkL8" },
    { id: 23, title: "싱어미닛_Post", category: "PERFORMANCE", client: "틱톡&한국음악저작권협회", youtubeId: "SV8G9mbfpHA", image: "/assets/sing_a_minute_new.png", link: "https://youtu.be/SV8G9mbfpHA" },
    { id: 15, title: "슬로프의 모든 것 시리즈", category: "PERFORMANCE", client: "한국관광공사", youtubeId: "r50ctGvayqk", image: "/assets/slope_series.png", link: "https://youtu.be/r50ctGvayqk" },
    { id: 7, title: "Agust D in Asia_Post", category: "PERFORMANCE", client: "하이브", youtubeId: "na1vAkq3bSA", image: "/assets/agustd.png", link: "https://youtu.be/na1vAkq3bSA" },
    { id: 8, title: "세븐틴 \"음악의신\" MV비하인드_Post", category: "PERFORMANCE", client: "하이브", youtubeId: "PpDTqpD2AUk", image: "/assets/seventeen_god_of_music.png", link: "https://youtu.be/PpDTqpD2AUk" },
    { id: 10, title: "TWS 'Sparkling Blue'일본 프로모션 비하인드_Post", category: "PERFORMANCE", client: "하이브", youtubeId: "4gDAN94wOZQ", image: "/assets/tws_sparkling_blue.png", link: "https://youtu.be/4gDAN94wOZQ" },
    { id: 9, title: "엔하이픈_2024WeverseCon 비하인드_Post", category: "PERFORMANCE", client: "하이브", youtubeId: "cnfjW4A9gKo", image: "/assets/enhypen_new.png", link: "https://youtu.be/cnfjW4A9gKo" },

    // LIVE
    { id: 106, title: "마비노기 2025 겨울 쇼케이스 OAP", category: "LIVE", client: "넥슨", youtubeId: "7wJR_P7uYHM", image: "/images/project-mabinogi-2025.png", link: "https://youtu.be/7wJR_P7uYHM" },
    { id: 110, title: "마비노기 2023 겨울 라이브 쇼케이스", category: "LIVE", client: "넥슨", youtubeId: "1jx6YYNfv-8", image: "/images/project-mabinogi.png", link: "https://youtu.be/1jx6YYNfv-8" },
    { id: 111, title: "메이플스토리 팡글대전", category: "LIVE", client: "넥슨", youtubeId: "tr0OKOiv8eA", image: "/images/project-maplestory-panggle.png", link: "https://youtu.be/tr0OKOiv8eA" },
    { id: 105, title: "AFK 슬기로운 아레나생활", category: "LIVE", client: "AFK아레나", youtubeId: "MiPtakEMKqw", image: "/images/project-afk-arena.png", link: "https://youtu.be/MiPtakEMKqw" },

    // CORPORATE
    { id: 302, title: "한화생명 미래금융인재 공모전", category: "CORPORATE", client: "한화생명", youtubeId: "7ZMJ_EIrHQY", image: "/assets/hanwha_finance_new.png", link: "https://youtu.be/7ZMJ_EIrHQY" },
    { id: 107, title: "Stylus 화보촬영", category: "CORPORATE", client: "Stylus", youtubeId: "Vk_L494o66A", image: "/images/project-stylus.png", link: "https://youtu.be/Vk_L494o66A" },
    { id: 103, title: "World ID KOREA 오픈 행사", category: "CORPORATE", client: "World ID", youtubeId: "uLk3-_WCa2Y", image: "/images/project-world-id.png", link: "https://www.youtube.com/watch?v=uLk3-_WCa2Y" },
    { id: 108, title: "매치스x미국감자협회", category: "CORPORATE", client: "미국감자협회", youtubeId: "c916GVygOss", image: "/images/project-us-potatoes.png", link: "https://youtu.be/c916GVygOss" },
    { id: 109, title: "윌로드 x 미국감자협회", category: "CORPORATE", client: "미국감자협회", youtubeId: "h92jemAZAWc", image: "/images/project-wilload-us-potatoes.png", link: "https://youtu.be/h92jemAZAWc" },
    { id: 306, title: "샤이오스케어 샴푸", category: "CORPORATE", client: "샤이오스케어", youtubeId: "wZuvADbOUaE", image: "/assets/syosscare_shampoo.png", link: "https://youtu.be/wZuvADbOUaE" },
    { id: 307, title: "2020 하반기 SK채용 소개", category: "CORPORATE", client: "SK", youtubeId: "PUxVHavd6x8", image: "/assets/sk_recruitment_2020.png", link: "https://youtu.be/PUxVHavd6x8" },
    { id: 301, title: "데상트 코리아 2019", category: "CORPORATE", client: "데상트", youtubeId: "JG0zSmowMVA", image: "/assets/descente_korea_2019.png", link: "https://youtu.be/JG0zSmowMVA" },
    { id: 309, title: "AUTOMATCH 홍보영상", category: "CORPORATE", client: "AUTOMATCH", youtubeId: "I4RDEvablFw", image: "/assets/automatch_promo.png", link: "https://youtu.be/I4RDEvablFw" },
    { id: 6, title: "호관원 홍보영상", category: "CORPORATE", client: "호관원", youtubeId: "lYFJEFdf4Rw", image: "/assets/hoguanwon.jpg", link: "https://youtu.be/lYFJEFdf4Rw" },
    { id: 11, title: "2020 SKT 채용영상시리즈", category: "CORPORATE", client: "SKT", youtubeId: "mDVF2Dr-l78", image: "/assets/skt_recruitment.png", link: "https://youtu.be/mDVF2Dr-l78" },
    { id: 104, title: "현대카드TECH TALK", category: "CORPORATE", client: "현대카드x원티드", youtubeId: "tk_8n500hi0", image: "/images/project-hyundaicard-techtalk.png", link: "https://youtu.be/tk_8n500hi0" },
    { id: 303, title: "2024 Wanted recruiting carnival", category: "CORPORATE", client: "Wanted", youtubeId: "V65i1ccJq_0", image: "/assets/wanted_recruiting_carnival.png", link: "https://youtu.be/V65i1ccJq_0" },
    { id: 304, title: "2024~2025HR메가트랜드", category: "CORPORATE", client: "HR INSIGHT", youtubeId: "7mP2x5F92kg", image: "/assets/hr_insight_mega_trend.png", link: "https://youtu.be/7mP2x5F92kg" },
    { id: 305, title: "SK교육특강 시리즈", category: "CORPORATE", client: "SK", youtubeId: "JUIAJT_hPk4", image: "/assets/sk_education_lecture.png", link: "https://youtu.be/JUIAJT_hPk4" },
];

function WorkContent() {
    const searchParams = useSearchParams();
    const [selectedCategory, setSelectedCategory] = useState("ALL");
    const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

    useEffect(() => {
        const category = searchParams.get('category');
        if (category && CATEGORIES.includes(category)) {
            setSelectedCategory(category);
        } else {
            setSelectedCategory("ALL");
        }
    }, [searchParams]);

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
                                                <Image
                                                    src={project.image}
                                                    alt={project.title}
                                                    fill
                                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                    className={cn(
                                                        "object-cover transition-transform duration-500",
                                                        [17, 12].includes(project.id) ? "scale-110 group-hover:scale-125" : "group-hover:scale-105"
                                                    )}
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

export default function WorkPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-[#050505] text-white flex items-center justify-center">Loading...</div>}>
            <WorkContent />
        </Suspense>
    );
}
