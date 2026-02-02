'use client';

import Link from 'next/link';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-black py-12 border-t border-white/5">
            <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between text-white/30 text-sm">

                <div className="mb-4 md:mb-0">
                    <Link href="/" className="font-display font-bold text-lg text-white hover:text-primary transition-colors">
                        SS<span className="text-primary">.</span>
                    </Link>
                </div>

                <div className="flex flex-col md:flex-row items-center gap-6">
                    <span>&copy; {currentYear} SUPERSMILE CREATIVE</span>
                    <span className="hidden md:inline">|</span>
                    <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                    <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
                </div>

                <button
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="hover:text-primary transition-colors text-xs uppercase tracking-widest mt-4 md:mt-0"
                >
                    Back to Top
                </button>

            </div>
        </footer>
    );
}
