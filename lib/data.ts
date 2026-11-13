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
    videoUrl?: string;
    thumbnailUrl?: string;
    roles?: string[];
    slug?: string;
    subCategory?: string;
    tagline?: string;
    relatedUrls?: string[];
}

export interface Service {
    title: string;
    description: string;
    number: string;
}

export const projects: Project[] = [
    // [임시 비활성화] 《루프 (LOOP)》 - 이번 주 최신 에피소드(본편) 업로드 후 링크/썸네일 추가하여 주석 해제
    // {
    //     id: 401,
    //     slug: "work-loop-ai",
    //     title: "AI 다큐드라마 시리즈 《루프 (LOOP)》",
    //     category: "AI CINEMA",
    //     subCategory: "AI DOCUDRAMA SERIES",
    //     tagline: "Next-Gen AI Filmmaking & Storytelling",
    //     image: "", // TODO: 썸네일 확정 시 지정 (예: https://i.ytimg.com/vi/[VIDEO_ID]/hqdefault.jpg)
    //     thumbnailUrl: "",
    //     description: "SK브로드밴드 발주 오리지널 AI 다큐드라마 시리즈. Google Flow Omni 1.2 기반의 시네마틱 생성형 AI 파이프라인과 정교한 연출·후반 DI를 결합한 차세대 하이브리드 콘텐츠입니다.",
    //     year: "2026",
    //     client: "SK브로드밴드 (SK broadband)",
    //     roles: ["AI Directing", "Flow Omni 1.2", "DI & Post"],
    //     youtubeLink: "" // TODO: 최신 본편 에피소드 링크
    // },
    {
        id: 402,
        slug: "work-maplestory-escape",
        title: "MAPLESTORY ESCAPE (메이플스토리 방탈출 예능)",
        category: "WEB SERIES",
        subCategory: "BRANDED WEB VARIETY",
        tagline: "High-Tension Survival Escape Game Show",
        image: "https://i.ytimg.com/vi/TCPzqfWmoV8/hqdefault.jpg",
        thumbnailUrl: "https://i.ytimg.com/vi/TCPzqfWmoV8/hqdefault.jpg",
        description: "서바이벌 레전드 서출구·허성범 팀과 크리에이터 이라333·타요 팀의 맞대결을 그린 넥슨 메이플스토리 방탈출 프로모션 웹예능 시리즈(출사표 및 방탈출기 본편).",
        year: "SEP 2026",
        client: "NEXON (메이플스토리)",
        roles: ["Planning", "Scriptwriting", "Directing", "Post-Production"],
        youtubeLink: "https://www.youtube.com/watch?v=TCPzqfWmoV8",
        videoUrl: "https://www.youtube.com/watch?v=TCPzqfWmoV8",
        relatedUrls: [
            "https://www.youtube.com/watch?v=wx3gOwKm_jg",
            "https://www.youtube.com/watch?v=0SXc1yWMiC4",
            "https://www.youtube.com/watch?v=OZ1a6J7k7Es"
        ]
    },
    {
        id: 403,
        slug: "work-ena-weddinghall-post",
        title: "ENA 《식장앞》 시리즈_POST",
        category: "WEB SERIES",
        subCategory: "WEB VARIETY SERIES (POST)",
        tagline: "Trendy Talk Variety Post-Production",
        image: "https://i.ytimg.com/vi/G6an5C6a0AA/hqdefault.jpg",
        thumbnailUrl: "https://i.ytimg.com/vi/G6an5C6a0AA/hqdefault.jpg",
        description: "ENA 오리지널 웹예능 시리즈 《식장앞》의 후반 종편(컷 편집, 예능 자막 디자인, DI 색보정) 전담 제작으로 프로그램의 리듬감과 비주얼 완성도를 극대화했습니다.",
        year: "SEP 2026 (Series)",
        client: "ENA",
        roles: ["POST-PRODUCTION", "Editing", "Subtitles", "DI"],
        youtubeLink: "https://www.youtube.com/watch?v=G6an5C6a0AA",
        videoUrl: "https://www.youtube.com/watch?v=G6an5C6a0AA"
    },
    {
        id: 404,
        slug: "work-pubg-chicken-post",
        title: "배틀그라운드 《치킨한마리》 시리즈_편집",
        category: "WEB SERIES",
        subCategory: "GAME WEB VARIETY (EDITING)",
        tagline: "Dynamic Game Survival Editing",
        image: "https://i.ytimg.com/vi/rjfb-qAA9pA/hqdefault.jpg",
        thumbnailUrl: "https://i.ytimg.com/vi/rjfb-qAA9pA/hqdefault.jpg",
        description: "곽범, 말왕, 이선민, 루다가 출연한 배틀그라운드 공식 웹예능 시리즈 《치킨한마리》의 편집 작업을 진행해 게임 예능 특유의 타격감과 텐션을 완성했습니다.",
        year: "JUL 2026 (Series)",
        client: "KRAFTON (PUBG: BATTLEGROUNDS Korea)",
        roles: ["Editing"],
        youtubeLink: "https://www.youtube.com/watch?v=rjfb-qAA9pA",
        videoUrl: "https://www.youtube.com/watch?v=rjfb-qAA9pA"
    },
    {
        id: 405,
        slug: "work-develon-global-kr",
        title: "DEVELON Global 브랜드 필름 & 《밀착꿀착》 시리즈",
        category: "COMMERCIAL",
        subCategory: "GLOBAL PRODUCT FILM & SERIES",
        tagline: "Heavy Duty Dynamic Cinematography",
        image: "https://i.ytimg.com/vi/SP7N_z9glng/hqdefault.jpg",
        thumbnailUrl: "https://i.ytimg.com/vi/SP7N_z9glng/hqdefault.jpg",
        description: "DEVELON Global 채널의 차세대 장비(DX400LC-9 등) 글로벌 단편 홍보 필름 및 국내 공식 채널의 대표 오리지널 시리즈 《밀착꿀착》을 지속적으로 전담 제작하고 있습니다.",
        year: "2025 – 2026 (Ongoing)",
        client: "HD현대인프라코어 (DEVELON Global / Korea)",
        roles: ["Directing", "Cinematography", "Editing", "DI"],
        youtubeLink: "https://www.youtube.com/watch?v=SP7N_z9glng",
        videoUrl: "https://www.youtube.com/watch?v=SP7N_z9glng",
        relatedUrls: ["https://www.youtube.com/watch?v=6iCg_BKARk4"]
    },
    {
        id: 406,
        slug: "work-musical-thedays",
        title: "뮤지컬 《그날들》 숏폼 콘텐츠 전담 제작",
        category: "COMMERCIAL",
        subCategory: "SHORT-FORM CAMPAIGN",
        tagline: "High-Impact Viral Short-Form Production",
        image: "/assets/musical_thedays.jpg",
        thumbnailUrl: "/assets/musical_thedays.jpg",
        description: "대한민국 대표 창작 뮤지컬 《그날들》의 프로모션 숏폼(Shorts/Reels) 콘텐츠를 전담 제작하여 배우들의 매력과 공연의 현장감을 트렌디한 호흡으로 전달했습니다.",
        year: "2026",
        client: "뮤지컬 《그날들》",
        roles: ["Short-Form Directing", "Shooting", "Editing", "DI"],
        youtubeLink: "https://www.instagram.com/reel/DX5wvjrp2Ra/",
        videoUrl: "https://www.instagram.com/reel/DX5wvjrp2Ra/"
    },
    {
        id: 31,
        title: "미스트롯4 x 진탁막걸리 TVCF",
        category: "COMMERCIAL",
        image: "/assets/mistrot_jintak.jpg",
        description: "미스트롯4와 진탁막걸리가 함께한 TVCF 영상입니다.",
        year: "2026",
        client: "TV조선, 대학내일",
        roles: ["Directing", "Editing", "In-House DI"],
        youtubeLink: "https://youtu.be/v8zzD7QmClU"
    },
    {
        id: 313,
        title: "2026 Stylus",
        category: "Corporate",
        image: "/assets/stylus.jpg",
        description: "2026 Stylus",
        year: "2026",
        client: "Stylus",
        youtubeLink: "https://youtu.be/BoAQlG00eow"
    },
    {
        id: 312,
        title: "2025DDP Seoul light",
        category: "Corporate",
        image: "/assets/seoul_light.png",
        description: "2025DDP Seoul light",
        year: "2025",
        client: "Freedots",
        youtubeLink: "https://youtu.be/fsanteE8fzA"
    },
    {
        id: 30,
        title: "국립과천과학관 《심심할 땐 과학》 시리즈_POST",
        category: "Branded",
        image: "/assets/science_when_bored.png",
        description: "국립과천과학관 대표 유튜브 오리지널 시리즈(시즌 2~5 및 2026년 시즌 8)의 후반 작업(편집, 자막 디자인, DI 색보정)을 전담했습니다.",
        year: "2025 – 2026 (Season 2~5, 8)",
        client: "국립과천과학관",
        subCategory: "YOUTUBE ORIGINAL SERIES (POST)",
        tagline: "Long-Running Edutainment Post-Production",
        roles: ["POST-PRODUCTION", "Editing", "Subtitles", "DI"],
        youtubeLink: "https://youtu.be/DB7bCtOUerE"
    },
    {
        id: 29,
        title: "Dear My X (디어마이엑스)_POST",
        category: "Branded",
        image: "/assets/dear_my_x_v2.png",
        description: "ENA의 예능 '디어마이엑스' 후반작업에 참여했습니다. 감정선을 섬세하게 살리는 편집과 색보정으로 프로그램의 완성도를 높였습니다.",
        year: "DEC 2025",
        client: "ENA",
        roles: ["POST-PRODUCTION", "Editing", "Subtitles", "DI"],
        youtubeLink: "https://youtu.be/mQMc-aAt0eA"
    },
    {
        id: 28,
        title: "숲 깊은 이야기_편집",
        category: "Branded",
        image: "/assets/forest_story.png",
        description: "하이원리조트의 '숲 깊은 이야기' 편집을 담당했습니다. 자연 속에서의 치유와 휴식을 감성적인 편집으로 담아냈습니다.",
        year: "2024",
        client: "하이원리조트",
        youtubeLink: "https://youtu.be/HqJGRgxTz3w"
    },
    {
        id: 27,
        title: "톡톡한 정리",
        category: "Branded",
        image: "/assets/toktok_organizing.png",
        description: "DIA tv의 정리 컨설팅 프로그램 '톡톡한 정리'입니다. 효율적인 공간 활용과 정리 노하우를 재미있게 전달했습니다.",
        year: "2024",
        client: "DIA tv",
        youtubeLink: "https://youtu.be/MJDOKGffNHo"
    },
    {
        id: 26,
        title: "여행 소개팅 썸팅",
        category: "Branded",
        image: "/assets/something_dating.png",
        description: "DIA tv의 여행 연애 리얼리티 '썸팅'입니다. 대만 여행지에서의 남녀 간의 설렘과 낭만을 리얼하게 담아냈습니다.",
        year: "2024",
        client: "DIA tv",
        youtubeLink: "https://youtu.be/4xmlF-mBb5M"
    },
    {
        id: 25,
        title: "테크룸",
        category: "Branded",
        image: "/assets/tech_room.png",
        description: "이마트의 웹예능 '테크룸'입니다. 전자기기 제한 구역에서의 생존기를 담은 독특한 컨셉의 브랜디드 콘텐츠입니다.",
        year: "2024",
        client: "이마트",
        youtubeLink: "https://youtu.be/0_CP7th0ZUM"
    },
    {
        id: 24,
        title: "L1STEN.JAMIE 메타버스 콘서트",
        category: "Branded",
        image: "/assets/listen_jamie_metaverse.png",
        description: "Gene music과 Play together가 함께한 메타버스 콘서트입니다. 가상 공간에서의 몰입감 넘치는 공연 경험을 선사했습니다.",
        year: "2024",
        client: "Gene music x Play together",
        youtubeLink: "https://youtu.be/NylH_k2Q-8w"
    },
    {
        id: 23,
        title: "싱어미닛 편집",
        category: "Branded",
        image: "/assets/sing_a_minute.png",
        description: "틱톡과 한국음악저작권협회가 함께한 '싱어미닛' 프로젝트의 편집을 담당했습니다. 음악과 무대의 감동을 세련된 편집으로 전달했습니다.",
        year: "2024",
        client: "틱톡&한국음악저작권협회",
        youtubeLink: "https://youtu.be/SV8G9mbfpHA"
    },
    {
        id: 22,
        title: "캐시미 이프 유캔 브랜디드 시리즈",
        category: "Branded",
        image: "/assets/cash_me_if_you_can.png",
        description: "Carrot과 함께한 여행 예능 브랜디드 콘텐츠입니다. 유쾌한 스토리텔링으로 브랜드 메시지를 자연스럽게 녹여냈습니다.",
        year: "2024",
        client: "Carrot",
        youtubeLink: "https://youtu.be/VyjF8BvnsYA"
    },
    {
        id: 21,
        title: "아무튼 샴페인 브랜디드 시리즈",
        category: "Branded",
        image: "/assets/anyway_champagne.png",
        description: "페리에주에 코리아와 함께한 럭셔리 샴페인 브랜디드 콘텐츠 시리즈입니다. 아름다운 영상미로 브랜드의 우아함을 담아냈습니다.",
        year: "2024",
        client: "페리에주에 코리아",
        youtubeLink: "https://youtu.be/HtM9KkbhnOw"
    },
    {
        id: 20,
        title: "일타강사 문쌤의 DooubleX2특강",
        category: "Branded",
        image: "/assets/lotteria_doublex2.png",
        description: "롯데리아의 DoubleX2 버거 출시 기념 '일타강사 문쌤' 컨셉의 유머러스한 브랜디드 콘텐츠입니다.",
        year: "2024",
        client: "롯데리아",
        youtubeLink: "https://youtu.be/HfxZFiH2rZ0"
    },
    {
        id: 19,
        title: "Optimum Nutrition Brand Film",
        category: "Branded",
        image: "/assets/optimum_nutrition.png",
        description: "글렌비아(Optimum Nutrition)의 브랜드 가치를 전달하는 홍보영상입니다. 역동적인 비주얼로 브랜드 아이덴티티를 표현했습니다.",
        year: "2024",
        client: "글렌비아",
        youtubeLink: "https://youtu.be/NDuah2bAShc"
    },
    {
        id: 17,
        title: "메이플스토리 웡스토랑 시리즈",
        category: "Branded",
        image: "/assets/maplestory_wong_restaurant.png",
        description: "넥슨 메이플스토리의 '웡스토랑' 캠페인 시리즈 영상입니다. 스타 셰프들의 화려한 요리와 함께하는 특별한 미식 이벤트를 담았습니다.",
        year: "2023",
        client: "넥슨",
        youtubeLink: "https://youtu.be/gWGQt9ZGda4"
    },
    {
        id: 16,
        title: "나미춘의 동계스포츠 도전기! 시리즈",
        category: "Branded",
        image: "/assets/winter_sports_challenge.png",
        description: "윤태진 아나운서(나미춘)가 직접 에버랜드 스노우버스터를 체험하며 동계스포츠의 즐거움을 전하는 예능형 브랜디드 콘텐츠입니다.",
        year: "2022",
        client: "한국관광공사",
        youtubeLink: "https://youtu.be/GPiJaSyHjbE"
    },
    {
        id: 15,
        title: "슬로프의 모든 것 시리즈",
        category: "Event",
        image: "/assets/slope_series.png",
        description: "한국관광공사와 함께한 겨울 스포츠 캠페인 '슬로프의 모든 것' 시리즈입니다. 스키와 보드의 매력을 생동감 있게 담아냈습니다.",
        year: "2023",
        client: "한국관광공사",
        youtubeLink: "https://youtu.be/r50ctGvayqk"
    },
    {
        id: 14,
        title: "괜찮아, 다시시작이야 시리즈",
        category: "Branded",
        image: "/assets/its_okay_restart.png",
        description: "행정안전부와 함께한 '괜찮아, 다시 시작이야' 캠페인 영상 시리즈입니다. 실패를 딛고 다시 도전하는 이들의 희망찬 이야기를 담았습니다.",
        year: "2021",
        client: "행정안전부",
        youtubeLink: "https://youtu.be/p88Rz2cpXE0"
    },
    {
        id: 13,
        title: "2022 Let's DMZ 특별한만남",
        category: "Branded",
        image: "/assets/lets_dmz.png",
        description: "2022 Let's DMZ 평화예술제의 일환으로 진행된 특별 대담 영상입니다. 평화와 화합의 메시지를 전합니다.",
        year: "2022",
        client: "Let's DMZ",
        youtubeLink: "https://youtu.be/3ZYt2pCMpoA"
    },
    {
        id: 12,
        title: "365mc 챌린지방의 쉽지 않았던 도전",
        category: "Branded",
        image: "/assets/365mc_challenge.png",
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
