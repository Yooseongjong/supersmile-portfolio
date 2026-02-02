'use client';

import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';
import { ArrowUpRight } from 'lucide-react';
import ContactForm from './ContactForm';

export default function Contact() {
    return (
        <section id="contact" className="min-h-screen bg-black flex flex-col justify-center items-center px-4 relative overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="container mx-auto max-w-5xl text-center z-10">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <p className="text-primary font-medium tracking-widest uppercase mb-8">Ready to Start?</p>

                    <h2 className="font-display text-6xl md:text-8xl lg:text-9xl font-bold text-white mb-12 tracking-tighter leading-none hover:text-white/90 transition-colors cursor-pointer group">
                        LET'S CREATE <br />
                        <span className="text-white group-hover:text-primary transition-colors duration-500">TOGETHER</span>
                    </h2>

                    <div className="mb-16">
                        <ContactForm />
                    </div>

                    <div className="flex flex-col items-center justify-center gap-4">
                        <p className="text-white/40 text-sm tracking-widest uppercase">Or email us directly</p>
                        <a href="mailto:haha3418@nate.com" className="group relative inline-flex items-center justify-center px-8 py-3 overflow-hidden font-bold rounded-full border border-white/20 hover:border-primary text-white transition-colors duration-300">
                            <span className="relative flex items-center gap-2 text-sm">
                                haha3418@nate.com
                                <ArrowUpRight className="w-4 h-4" />
                            </span>
                        </a>
                    </div>


                </motion.div>
            </div>
        </section>
    );
}
