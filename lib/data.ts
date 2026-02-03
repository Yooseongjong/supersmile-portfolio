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
        id: 30,
        title: "심심할 땐 과학 시즌2,3,4,5_후반작업",
        category: "Branded",
        image: "/assets/science_when_bored.png",
        description: "국립과천과학관의 과학 예능 시리즈 '심심할 땐 과학'의 시즌 2, 3, 4, 5 후반작업을 담당했습니다. 유익한 과학 지식을 재미있고 이해하기 쉽게 편집했습니다.",
        year: "2024",
        client: "국립과천과학관",
        youtubeLink: "https://youtu.be/DB7bCtOUerE"
    },
    {
        id: 29,
        title: "디어마이엑스_후반작업",
        category: "Branded",
        image: "/assets/dear_my_x.png",
        description: "ENA의 예능 '디어마이엑스' 후반작업에 참여했습니다. 감정선을 섬세하게 살리는 편집과 색보정으로 프로그램의 완성도를 높였습니다.",
        year: "2024",
        client: "ENA",
        youtubeLink: "https://youtu.be/Le3T_pgn734"
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
        title: "Optimum Nutrition 홍보영상",
        category: "Branded",
        image: "/assets/optimum_nutrition.png",
        description: "글렌비아(Optimum Nutrition)의 브랜드 가치를 전달하는 홍보영상입니다. 역동적인 비주얼로 브랜드 아이덴티티를 표현했습니다.",
        year: "2024",
        client: "글렌비아",
        youtubeLink: "https://youtu.be/NDuah2bAShc"
    },
    {
        id: 18,
        title: "이장군xOptimum Nutrition",
        category: "Branded",
        image: "/assets/lee_jang_kun_optimum.png",
        description: "글렌비아(Optimum Nutrition)와 이장군 선수가 함께한 브랜드 캠페인 영상입니다. 강렬한 퍼포먼스와 브랜드 아이덴티티를 역동적으로 담았습니다.",
        year: "2023",
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
