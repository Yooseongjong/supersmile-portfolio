'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface MobileMenuProps {
    isOpen: boolean;
    onClose: () => void;
    links: { href: string; label: string }[];
}

export default function MobileMenu({ isOpen, onClose, links }: MobileMenuProps) {
    const menuVariants = {
        closed: {
            opacity: 0,
            x: '100%',
            transition: {
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
                staggerChildren: 0.1,
                staggerDirection: -1
            }
        },
        open: {
            opacity: 1,
            x: '0%',
            transition: {
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const linkVariants = {
        closed: { opacity: 0, x: 50 },
        open: { opacity: 1, x: 0 }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial="closed"
                    animate="open"
                    exit="closed"
                    variants={menuVariants}
                    className="fixed inset-0 z-50 bg-background flex flex-col justify-center items-center"
                >
                    <button
                        onClick={onClose}
                        className="absolute top-8 right-8 p-2 text-white hover:text-primary transition-colors"
                    >
                        <X size={32} />
                    </button>

                    <nav className="flex flex-col space-y-8 text-center">
                        {links.map((link) => (
                            <motion.div key={link.href} variants={linkVariants}>
                                <Link
                                    href={link.href}
                                    onClick={onClose}
                                    className="font-display text-5xl md:text-7xl font-bold text-white hover:text-primary transition-colors block"
                                >
                                    {link.label}
                                </Link>
                            </motion.div>
                        ))}
                    </nav>

                    <motion.div
                        variants={linkVariants}
                        className="absolute bottom-10 text-gray-500 text-sm"
                    >
                        © 2024 SuperSmile Creative
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
