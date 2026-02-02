'use client';

import { useState } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { Menu, Volume2, VolumeX } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import MobileMenu from './MobileMenu';
import Button from '@/components/ui/Button';
import { useAudio } from '@/components/ui/AudioProvider';

const navLinks = [
    { href: '#work', label: 'Work' },
    { href: '#about', label: 'About' },
    { href: '#services', label: 'Services' },
    { href: '#contact', label: 'Contact' },
];

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isHidden, setIsHidden] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { scrollY } = useScroll();
    const { playClick, isMuted, toggleMute } = useAudio();

    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious() || 0;
        if (latest > previous && latest > 150) {
            setIsHidden(true);
        } else {
            setIsHidden(false);
        }

        if (latest > 50) {
            setIsScrolled(true);
        } else {
            setIsScrolled(false);
        }
    });

    return (
        <>
            <motion.header
                variants={{
                    visible: { y: 0 },
                    hidden: { y: '-100%' },
                }}
                animate={isHidden ? 'hidden' : 'visible'}
                transition={{ duration: 0.35, ease: 'easeInOut' }}
                className={cn(
                    "fixed top-0 left-0 right-0 z-40 transition-all duration-300 w-full",
                    isScrolled ? "bg-background/80 backdrop-blur-md border-b border-white/5 py-4" : "bg-transparent py-6"
                )}
            >
                <div className="container mx-auto px-6 flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" onClick={() => playClick()} className="relative z-50 group">
                        <div className="font-display font-bold text-2xl tracking-tighter leading-none">
                            <span className="text-white group-hover:text-primary transition-colors">SUPER</span>
                            <span className="text-primary group-hover:text-white transition-colors">SMILE</span>
                        </div>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => playClick()}
                                className="text-sm font-medium text-gray-300 hover:text-primary transition-colors relative group"
                            >
                                {link.label}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
                            </Link>
                        ))}

                        {/* Sound Toggle */}
                        <button
                            onClick={() => { toggleMute(); playClick(); }}
                            className="text-gray-300 hover:text-primary transition-colors"
                        >
                            {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                        </button>

                        <Button
                            size="sm"
                            variant="primary"
                            onClick={() => {
                                playClick();
                                window.open('https://open.kakao.com/o/gU25oQdi', '_blank');
                            }}
                        >
                            Let's Talk
                        </Button>
                    </nav>

                    {/* Mobile Toggle */}
                    <div className="flex items-center gap-4 md:hidden">
                        <button
                            onClick={() => { toggleMute(); playClick(); }}
                            className="text-gray-300 hover:text-primary transition-colors"
                        >
                            {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                        </button>
                        <button
                            onClick={() => { setIsMobileMenuOpen(true); playClick(); }}
                            className="text-white hover:text-primary transition-colors"
                        >
                            <Menu size={24} />
                        </button>
                    </div>
                </div>
            </motion.header>

            <MobileMenu
                isOpen={isMobileMenuOpen}
                onClose={() => setIsMobileMenuOpen(false)}
                links={navLinks}
            />
        </>
    );
}
