export interface Project {
    id: number;
    title: string;
    category: string;
    image: string;
    description: string;
    year: string;
    awards?: string;
    client?: string;
    youtubeLink?: string;
}

export interface Service {
    title: string;
    description: string;
    number: string;
}

export const projects: Project[] = [
    {
        id: 12,
        title: "365mc 챌린지방의 쉽지 않았던 도전",
        category: "Branded",
        image: "/assets/365mc_challenge.jpg",
        description: "365mc의 대표 캐릭터 '지방이'가 펼치는 유쾌하고 감동적인 도전기를 담은 브랜디드 콘텐츠입니다.",
        year: "2024",
        client: "365mc",
        youtubeLink: "https://youtu.be/_6S43gEHJwY"
    },
    {
        id: 11,
        title: "2020 SKT 채용영상시리즈",
        category: "Branded",
        image: "/assets/skt_recruitment.png",
        description: "SKT의 2020년 채용을 위한 시리즈 영상입니다. 5G 전문가들의 생생한 이야기를 담아 SKT의 기술력과 문화를 소개했습니다.",
        year: "2020",
        client: "SKT",
        youtubeLink: "https://youtu.be/mDVF2Dr-l78"
    },
    {
        id: 10,
        title: "TWS 'Sparkling Blue'일본 프로모션 비하인드 편집",
        category: "Event",
        image: "/assets/tws_sparkling_blue.png",
        description: "TWS의 'Sparkling Blue' 일본 프로모션 현장의 설렘과 열정을 담은 비하인드 영상입니다.",
        year: "2024",
        client: "하이브",
        youtubeLink: "https://youtu.be/4gDAN94wOZQ"
    },
    {
        id: 9,
        title: "엔하이픈_2024WeverseCon 비하인드 편집",
        category: "Event",
        image: "/assets/enhypen_weverse.png",
        description: "2024 Weverse Con Festival에 참여한 엔하이픈 위버스콘 비하인드 영상입니다.",
        year: "2024",
        client: "하이브",
        youtubeLink: "https://youtu.be/cnfjW4A9gKo"
    },
    {
        id: 8,
        title: "세븐틴 \"음악의신\" MV비하인드 편집",
        category: "Event",
        image: "/assets/seventeen_god_of_music.png",
        description: "세븐틴의 '음악의 신' 뮤직비디오 촬영 현장의 생생함과 멤버들의 유쾌한 모습을 담은 비하인드 영상입니다.",
        year: "2023",
        client: "하이브",
        youtubeLink: "https://youtu.be/PpDTqpD2AUk"
    },
    {
        id: 7,
        title: "Agust D in Asia - 편집",
        category: "Event",
        image: "/assets/agustd.png",
        description: "Agust D 아시아 투어의 폭발적인 에너지와 현장의 열기를 담은 하이라이트 편집 영상입니다.",
        year: "2024",
        client: "하이브",
        youtubeLink: "https://youtu.be/na1vAkq3bSA"
    },
    {
        id: 6,
        title: "호관원 홍보영상",
        category: "Branded",
        image: "/assets/hoguanwon.jpg",
        description: "호관원 브랜드의 프리미엄 가치를 전달하는 홍보영상입니다. 제품의 고급스러움과 효능을 시네마틱한 연출로 표현했습니다.",
        year: "2024",
        client: "호관원",
        youtubeLink: "https://youtu.be/lYFJEFdf4Rw"
    },
    {
        id: 1,
        title: "Neon Tokyo",
        category: "Music Video",
        image: "/assets/p1.png",
        description: "A cyberpunk visual odyssey capturing the pulse of the metropolis. We utilized custom anamorphic lenses to create unique flares and a sense of dystopian scale.",
        year: "2024",
        awards: "Best MV - K-Indie Awards"
    },
    {
        id: 2,
        title: "Cyber Limits",
        category: "Commercial",
        image: "/assets/p2.png",
        description: "High-octane commercial for the next-gen gaming console. Blending live-action with Unreal Engine CGI to blur the line between reality and the virtual world.",
        year: "2023"
    },
    {
        id: 3,
        title: "Void Walker",
        category: "Short Film",
        image: "/assets/p3.png",
        description: "An experimental sci-fi short exploring isolation in deep space. Shot entirely on a virtual production stage to achieve photorealistic zero-gravity environments.",
        year: "2024",
        awards: "Official Selection - Sci-Fi Seoul"
    },
    {
        id: 4,
        title: "Echo Drift",
        category: "Documentary",
        image: "/assets/p1.png",
        description: "A raw look into the underground drift racing culture. We captured the sound and fury of the track using custom-mounted camera rigs.",
        year: "2023"
    },
    {
        id: 5,
        title: "Solar Punk",
        category: "Brand Film",
        image: "/assets/p2.png",
        description: "A visionary campaign for sustainable energy. Using organic lighting and practical effects to visualize a harmonious future between tech and nature.",
        year: "2024"
    }
];

export const services: Service[] = [
    {
        title: "Pre-Production",
        description: "Conceptualization, Scriptwriting, Storyboarding, Casting, Location Scouting",
        number: "01"
    },
    {
        title: "Production",
        description: "Cinematography, Art Direction, Lighting Design, High-speed Camera Work",
        number: "02"
    },
    {
        title: "Post-Production",
        description: "Offline/Online Editing, Color Grading (DI), VFX & CGI, Motion Graphics",
        number: "03"
    },
    {
        title: "Sound Design",
        description: "Original Score, SFX, Mixing & Mastering, Voice Over",
        number: "04"
    }
];
