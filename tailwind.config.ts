import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "#09090B", // Deep Matte Black
                foreground: "#ededed",
                carbon: "#121215", // Carbon Surface
                amber: {
                    DEFAULT: "#F59E0B", // Warm Amber
                },
                primary: {
                    DEFAULT: "#EF4444", // ARRI Rec Red
                    glow: "#EF444480", // Transparent for glow effects
                },
                secondary: "#1a1a1a",
                accent: "#ffffff",
            },
            fontFamily: {
                sans: ["var(--font-inter)", "Pretendard", "Apple SD Gothic Neo", "Malgun Gothic", "sans-serif"],
                display: ["var(--font-outfit)", "Pretendard", "Apple SD Gothic Neo", "Malgun Gothic", "sans-serif"],
            },
            animation: {
                "fade-in": "fadeIn 0.5s ease-in-out",
                "slide-up": "slideUp 0.5s ease-out",
                "pulse-glow": "pulseGlow 2s infinite",
            },
            keyframes: {
                fadeIn: {
                    "0%": { opacity: "0" },
                    "100%": { opacity: "1" },
                },
                slideUp: {
                    "0%": { transform: "translateY(20px)", opacity: "0" },
                    "100%": { transform: "translateY(0)", opacity: "1" },
                },
                pulseGlow: {
                    "0%, 100%": { boxShadow: "0 0 10px #EF444440" },
                    "50%": { boxShadow: "0 0 20px #EF444480" },
                },
            },
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
            },
        },
    },
    plugins: [],
};
export default config;
