import type { Metadata, Viewport } from 'next';
import { Inter, Outfit } from 'next/font/google';
import './globals.css';
import { ReactNode } from 'react';
import CustomCursor from '@/components/ui/CustomCursor';
import SmoothScrollProvider from '@/components/ui/SmoothScrollProvider';
import Preloader from '@/components/ui/Preloader';
import Navbar from '@/components/layout/Navbar';
import AudioProvider from '@/components/ui/AudioProvider';
import CinematicBackground from '@/components/ui/CinematicBackground';
// import Intro from '@/components/ui/Intro';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit' });

export const metadata: Metadata = {
    metadataBase: new URL('https://www.supersmile.kr'),
    title: {
        default: 'Supersmile Creative | Cinematic Video Production',
        template: '%s | Supersmile Creative',
    },
    description: 'Supersmile Creative is a premier video production agency in Seoul, specializing in cinematic commercials, brand films, and motion graphics that defy gravity.',
    keywords: ['Production', 'Video', 'Cinematic', 'Creative Agency', 'Seoul', 'Motion Graphics', 'Commercials', 'Brand Films'],
    authors: [{ name: 'Supersmile Creative' }],
    creator: 'Supersmile Creative',
    openGraph: {
        type: 'website',
        locale: 'ko_KR',
        url: 'https://www.supersmile.kr',
        title: 'Supersmile Creative | Cinematic Video Production',
        description: 'We craft cinematic experiences that defy gravity. A new breed of production studio.',
        siteName: 'Supersmile Creative',
        images: [
            {
                url: '/assets/og-image.jpg',
                width: 1200,
                height: 630,
                alt: 'Supersmile Creative Portfolio',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Supersmile Creative',
        description: 'Deep Dark & Cinematic visual production.',
        images: ['/assets/og-image.jpg'],
        creator: '@supersmile',
    },
    icons: {
        icon: '/favicon.ico',
        shortcut: '/favicon-16x16.png',
        apple: '/apple-touch-icon.png',
    },
    verification: {
        google: 'VIgUYWAtXu7IG_9cGs5fpOu6TV0VW2qpY2wGD4jNOLY',
        other: {
            'naver-site-verification': 'f699ed618fe9f08eb46a868c9d20a7a3793de51c',
        },
    },
};

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
};

export default function RootLayout({
    children,
}: {
    children: ReactNode;
}) {
    return (
        <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
            <body className="font-sans bg-background text-foreground overflow-x-hidden selection:bg-primary selection:text-black">
                <SmoothScrollProvider>
                    <AudioProvider>
                        <CinematicBackground />
                        <Preloader />
                        {/* <Intro /> */}
                        <CustomCursor />
                        <Navbar />
                        {children}
                    </AudioProvider>
                </SmoothScrollProvider>
            </body>
        </html>
    );
}
