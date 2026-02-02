export interface Project {
    id: number;
    title: string;
    category: string;
    image: string;
    description: string;
    year: string;
    awards?: string;
}

export interface Service {
    title: string;
    description: string;
    number: string;
}

export const projects: Project[] = [
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
