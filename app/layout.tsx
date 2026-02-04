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
    metadataBase: new URL('https://supersmile.creative'),
    title: {
        default: 'SuperSmile Creative | Cinematic Video Production',
        template: '%s | SuperSmile Creative',
    },
    description: 'SuperSmile Creative is a Deep Dark & Cinematic visual production agency based in Seoul. We blend technology with storytelling.',
    keywords: ['Production', 'Video', 'Cinematic', 'Creative Agency', 'Seoul', 'Motion Graphics'],
    authors: [{ name: 'SuperSmile Creative' }],
    creator: 'SuperSmile Creative',
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: 'https://supersmile.creative',
        title: 'SuperSmile Creative | Cinematic Video Production',
        description: 'We craft cinematic experiences that defy gravity. A new breed of production studio.',
        siteName: 'SuperSmile Creative',
        images: [
            {
                url: '/assets/og-image.jpg',
                width: 1200,
                height: 630,
                alt: 'SuperSmile Creative Portfolio',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'SuperSmile Creative',
        description: 'Deep Dark & Cinematic visual production.',
        images: ['/assets/og-image.jpg'],
        creator: '@supersmile',
    },
    icons: {
        icon: '/favicon.ico',
        shortcut: '/favicon-16x16.png',
        apple: '/apple-touch-icon.png',
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
