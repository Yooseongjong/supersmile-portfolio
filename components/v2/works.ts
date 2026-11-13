import { projects, Project } from '@/lib/data';
import type { ModalTarget } from './VideoModal';

/** 메인 Director's Monitor 대표작 7선 */
export const FEATURED_IDS = [31, 402, 403, 404, 405, 29, 406];

export const FEATURED_ROLES_FALLBACK: Record<number, string[]> = {
    31: ['Directing', 'Editing', 'In-House DI'],
    29: ['POST-PRODUCTION', 'Editing', 'Subtitles', 'DI'],
};

/** 기존 /work 페이지에 있던 전체 포트폴리오 메타데이터 보존 매핑 */
const LEGACY_WORK_CATALOG: Array<{
    id: number;
    title: string;
    category: string;
    client: string;
    image: string;
    link: string;
    year?: string;
}> = [
    // WEB SERIES
    { id: 29, title: 'Dear My X (디어마이엑스)_POST', category: 'WEB SERIES', client: 'ENA', image: '/assets/project-dear-my-x-final.png', link: 'https://youtu.be/mQMc-aAt0eA', year: 'DEC 2025' },
    { id: 22, title: '캐시미 이프 유캔 브랜디드 시리즈', category: 'WEB SERIES', client: 'Carrot', image: '/assets/cash_me_if_you_can.png', link: 'https://youtu.be/VyjF8BvnsYA' },
    { id: 25, title: '테크룸', category: 'WEB SERIES', client: '이마트', image: '/assets/tech_room.png', link: 'https://youtu.be/0_CP7th0ZUM' },
    { id: 16, title: '동계스포츠의 모든 것!', category: 'WEB SERIES', client: '한국관광공사', image: '/assets/winter_sports_new.png', link: 'https://youtu.be/GPiJaSyHjbE' },
    { id: 28, title: '숲 깊은 이야기_Post', category: 'WEB SERIES', client: '하이원리조트', image: '/assets/forest_story_new.png', link: 'https://youtu.be/HqJGRgxTz3w' },
    { id: 30, title: '국립과천과학관 《심심할 땐 과학》 시리즈_POST', category: 'WEB SERIES', client: '국립과천과학관', image: '/assets/science_when_bored_new.png', link: 'https://youtu.be/DB7bCtOUerE', year: '2025 – 2026' },
    { id: 26, title: '여행 소개팅 썸팅', category: 'WEB SERIES', client: 'DIA tv', image: '/assets/something_dating.png', link: 'https://youtu.be/4xmlF-mBb5M' },
    { id: 14, title: '괜찮아, 다시시작이야 시리즈', category: 'WEB SERIES', client: '행정안전부', image: '/assets/its_okay_restart.png', link: 'https://youtu.be/p88Rz2cpXE0' },

    // COMMERCIAL
    { id: 19, title: 'Optimum Nutrition 홍보영상', category: 'COMMERCIAL', client: '글렌비아', image: '/assets/optimum_nutrition.png', link: 'https://youtu.be/NDuah2bAShc' },
    { id: 21, title: '아무튼 샴페인 브랜디드 시리즈', category: 'COMMERCIAL', client: '페리에주에 코리아', image: '/assets/anyway_champagne.png', link: 'https://youtu.be/HtM9KkbhnOw' },
    { id: 20, title: '일타강사 문쌤의 DooubleX2특강', category: 'COMMERCIAL', client: '롯데리아', image: '/assets/lotteria_doublex2.png', link: 'https://youtu.be/HfxZFiH2rZ0' },
    { id: 311, title: '교보헬스케어 홍보영상', category: 'COMMERCIAL', client: '교보생명', image: '/assets/kyobo_healthcare.png', link: 'https://youtu.be/7XkXPAcp-yA' },
    { id: 310, title: '인천중앙여고 홍보영상', category: 'COMMERCIAL', client: '인천중앙여고', image: '/assets/incheon_girls_high.png', link: 'https://youtu.be/EP8-znuEPbs' },
    { id: 200, title: '"눈물을 마시는 새" 아트북 비하인드 씬', category: 'COMMERCIAL', client: 'KRAFTON', image: '/images/project-three-birds.png', link: 'https://youtu.be/SRDr5jMZziU' },
    { id: 308, title: "경기씨네 영화관'독백'", category: 'COMMERCIAL', client: '경기콘텐츠진흥원', image: '/assets/gyeonggi_cine_monologue.png', link: 'https://youtu.be/tytV-UEA5dE' },
    { id: 17, title: '메이플스토리 웡스토랑 시리즈', category: 'COMMERCIAL', client: '넥슨', image: '/assets/wong_restaurant_new.png', link: 'https://youtu.be/gWGQt9ZGda4' },
    { id: 201, title: '메이플x글자네pc방 실황 모음.ZIP', category: 'COMMERCIAL', client: '넥슨', image: '/images/project-maple-geulja.png', link: 'https://youtu.be/X8XgMMpq6xU' },
    { id: 27, title: '톡톡한 정리', category: 'COMMERCIAL', client: 'DIA tv', image: '/assets/toktok_organizing.png', link: 'https://youtu.be/MJDOKGffNHo' },
    { id: 12, title: '365mc 챌린지방의 쉽지 않았던 도전', category: 'COMMERCIAL', client: '365mc', image: '/assets/365mc_challenge.png', link: 'https://youtu.be/_6S43gEHJwY' },
    { id: 13, title: "2022 Let's DMZ 특별한만남", category: 'COMMERCIAL', client: "Let's DMZ", image: '/assets/lets_dmz.png', link: 'https://youtu.be/3ZYt2pCMpoA' },

    // PERFORMANCE
    { id: 24, title: 'L1STEN.JAMIE 메타버스 콘서트', category: 'PERFORMANCE', client: 'Genie music x Play together', image: '/assets/listen_jamie_final.png', link: 'https://youtu.be/NylH_k2Q-8w' },
    { id: 102, title: '2017, 2018 World DJ Festival', category: 'PERFORMANCE', client: 'SBSMTV', image: '/images/project-wdjf.png', link: 'https://youtu.be/PYAMWgzKMuk' },
    { id: 101, title: '2023 One Hoop', category: 'PERFORMANCE', client: 'MGTV', image: '/images/project-one-hoop.png', link: 'https://youtu.be/k5hDsLhtkL8' },
    { id: 23, title: '싱어미닛_Post', category: 'PERFORMANCE', client: '틱톡&한국음악저작권협회', image: '/assets/sing_a_minute_new.png', link: 'https://youtu.be/SV8G9mbfpHA' },
    { id: 15, title: '슬로프의 모든 것 시리즈', category: 'PERFORMANCE', client: '한국관광공사', image: '/assets/slope_series.png', link: 'https://youtu.be/r50ctGvayqk' },
    { id: 7, title: 'Agust D in Asia_Post', category: 'PERFORMANCE', client: '하이브', image: '/assets/agustd.png', link: 'https://youtu.be/na1vAkq3bSA' },
    { id: 8, title: '세븐틴 "음악의신" MV비하인드_Post', category: 'PERFORMANCE', client: '하이브', image: '/assets/seventeen_god_of_music.png', link: 'https://youtu.be/PpDTqpD2AUk' },
    { id: 10, title: "TWS 'Sparkling Blue'일본 프로모션 비하인드_Post", category: 'PERFORMANCE', client: '하이브', image: '/assets/tws_sparkling_blue.png', link: 'https://youtu.be/4gDAN94wOZQ' },
    { id: 9, title: '엔하이픈_2024WeverseCon 비하인드_Post', category: 'PERFORMANCE', client: '하이브', image: '/assets/enhypen_new.png', link: 'https://youtu.be/cnfjW4A9gKo' },

    // LIVE
    { id: 106, title: '마비노기 2025 겨울 쇼케이스_OAP', category: 'LIVE', client: '넥슨', image: '/images/project-mabinogi-2025.png', link: 'https://youtu.be/7wJR_P7uYHM', year: 'NOV 2025' },
    { id: 110, title: '마비노기 2023 겨울 라이브 쇼케이스', category: 'LIVE', client: '넥슨', image: '/images/project-mabinogi.png', link: 'https://youtu.be/1jx6YYNfv-8' },
    { id: 111, title: '메이플스토리 팡글대전', category: 'LIVE', client: '넥슨', image: '/images/project-maplestory-panggle.png', link: 'https://youtu.be/tr0OKOiv8eA' },
    { id: 105, title: 'AFK 슬기로운 아레나생활', category: 'LIVE', client: 'AFK아레나', image: '/images/project-afk-arena.png', link: 'https://youtu.be/MiPtakEMKqw' },

    // CORPORATE
    { id: 313, title: '2026 Stylus', category: 'CORPORATE', client: 'Stylus', image: '/assets/stylus.jpg', link: 'https://youtu.be/BoAQlG00eow', year: '2026' },
    { id: 312, title: '2025DDP Seoul light', category: 'CORPORATE', client: 'Freedots', image: '/assets/seoul_light.png', link: 'https://youtu.be/fsanteE8fzA', year: '2025' },
    { id: 302, title: '한화생명 미래금융인재 공모전', category: 'CORPORATE', client: '한화생명', image: '/assets/hanwha_finance_new.png', link: 'https://youtu.be/7ZMJ_EIrHQY', year: 'NOV 2025' },
    { id: 107, title: 'Stylus 화보촬영', category: 'CORPORATE', client: 'Stylus', image: '/images/project-stylus.png', link: 'https://youtu.be/Vk_L494o66A' },
    { id: 103, title: 'World ID KOREA 오픈 행사', category: 'CORPORATE', client: 'World ID', image: '/images/project-world-id.png', link: 'https://www.youtube.com/watch?v=uLk3-_WCa2Y' },
    { id: 108, title: '매치스x미국감자협회', category: 'CORPORATE', client: '미국감자협회', image: '/images/project-us-potatoes.png', link: 'https://youtu.be/c916GVygOss' },
    { id: 109, title: '윌로드 x 미국감자협회', category: 'CORPORATE', client: '미국감자협회', image: '/images/project-wilload-us-potatoes.png', link: 'https://youtu.be/h92jemAZAWc' },
    { id: 306, title: '샤이오스케어 샴푸', category: 'CORPORATE', client: '샤이오스케어', image: '/assets/syosscare_shampoo.png', link: 'https://youtu.be/wZuvADbOUaE' },
    { id: 307, title: '2020 하반기 SK채용 소개', category: 'CORPORATE', client: 'SK', image: '/assets/sk_recruitment_2020.png', link: 'https://youtu.be/PUxVHavd6x8' },
    { id: 301, title: '데상트 코리아 2019', category: 'CORPORATE', client: '데상트', image: '/assets/descente_korea_2019.png', link: 'https://youtu.be/JG0zSmowMVA' },
    { id: 309, title: 'AUTOMATCH 홍보영상', category: 'CORPORATE', client: 'AUTOMATCH', image: '/assets/automatch_promo.png', link: 'https://youtu.be/I4RDEvablFw' },
    { id: 6, title: '호관원 홍보영상', category: 'CORPORATE', client: '호관원', image: '/assets/hoguanwon.jpg', link: 'https://youtu.be/lYFJEFdf4Rw' },
    { id: 11, title: '2020 SKT 채용영상시리즈', category: 'CORPORATE', client: 'SKT', image: '/assets/skt_recruitment.png', link: 'https://youtu.be/mDVF2Dr-l78' },
    { id: 104, title: '현대카드TECH TALK', category: 'CORPORATE', client: '현대카드x원티드', image: '/images/project-hyundaicard-techtalk.png', link: 'https://youtu.be/tk_8n500hi0' },
    { id: 303, title: '2024 Wanted recruiting carnival', category: 'CORPORATE', client: 'Wanted', image: '/assets/wanted_recruiting_carnival.png', link: 'https://youtu.be/V65i1ccJq_0' },
    { id: 304, title: '2024~2025HR메가트랜드', category: 'CORPORATE', client: 'HR INSIGHT', image: '/assets/hr_insight_mega_trend.png', link: 'https://youtu.be/7mP2x5F92kg' },
    { id: 305, title: 'SK교육특강 시리즈', category: 'CORPORATE', client: 'SK', image: '/assets/sk_education_lecture.png', link: 'https://youtu.be/JUIAJT_hPk4' },
];

export const CATEGORY_ORDER = ['ALL', 'AI CINEMA', 'WEB SERIES', 'COMMERCIAL', 'PERFORMANCE', 'LIVE', 'CORPORATE'] as const;

function normalizeCategory(cat: string): string {
    const upper = cat.trim().toUpperCase();
    if (upper === 'BRANDED' || upper === 'COMMERCIAL' || upper === 'TVCF & BRANDED') return 'COMMERCIAL';
    if (upper === 'CORPORATE') return 'CORPORATE';
    if (upper === 'WEB SERIES' || upper === 'WEB ORIGINAL & LIVE') return 'WEB SERIES';
    if (upper === 'PERFORMANCE' || upper === 'MUSIC') return 'PERFORMANCE';
    if (upper === 'LIVE') return 'LIVE';
    if (upper === 'AI CINEMA') return 'AI CINEMA';
    return upper;
}

export function getFeaturedWorks(): Project[] {
    return FEATURED_IDS.map((id) => projects.find((p) => p.id === id)).filter(Boolean) as Project[];
}

/** lib/data.ts + 기존 전체 포트폴리오를 누락/중복 없이 병합 (최신 주요작 최상단 정렬) */
export function getAllWorks(): Project[] {
    const merged: Project[] = projects.map((dp) => {
        const match = LEGACY_WORK_CATALOG.find((hp) => hp.id === dp.id);
        return {
            ...dp,
            category: normalizeCategory(match ? match.category : dp.category),
            title: dp.id === 29 || dp.id === 30 ? dp.title : match ? match.title : dp.title,
            image: dp.image || (match ? match.image : ''),
            roles: dp.roles ?? FEATURED_ROLES_FALLBACK[dp.id],
        };
    });

    for (const hp of LEGACY_WORK_CATALOG) {
        if (!merged.some((m) => m.id === hp.id)) {
            merged.push({
                id: hp.id,
                title: hp.title,
                category: normalizeCategory(hp.category),
                client: hp.client,
                youtubeLink: hp.link,
                image: hp.image,
                description: '',
                year: hp.year || '2024',
            });
        }
    }

    // 대표 최신작을 최상단에 우선 정렬
    return merged.sort((a, b) => {
        const ia = FEATURED_IDS.indexOf(a.id);
        const ib = FEATURED_IDS.indexOf(b.id);
        if (ia !== -1 && ib !== -1) return ia - ib;
        if (ia !== -1) return -1;
        if (ib !== -1) return 1;
        return 0;
    });
}

export function getVideoLink(p: Project): string {
    return p.youtubeLink || p.videoUrl || '';
}

export function getYoutubeId(link?: string): string | null {
    return link?.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=))([^&?]+)/)?.[1] ?? null;
}

/** YouTube면 스크리닝 모달 재생, 그 외(인스타 릴스 등)는 새 탭 오픈 */
export function playProject(p: Project, openModal: (target: ModalTarget) => void) {
    const link = getVideoLink(p);
    const id = getYoutubeId(link);
    if (id) {
        openModal({ kind: 'youtube', videoId: id, title: p.title, client: p.client });
    } else if (link) {
        window.open(link, '_blank', 'noopener,noreferrer');
    }
}
