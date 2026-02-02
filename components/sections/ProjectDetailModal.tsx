'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, PlayCircle, Share2, Calendar, Award } from 'lucide-react';
import Image from 'next/image';
import Button from '@/components/ui/Button';

interface Project {
    id: number;
    title: string;
    category: string;
    image: string;
    description: string;
    year: string;
    awards?: string;
}

interface ProjectDetailModalProps {
    project: Project | null;
    onClose: () => void;
}

export default function ProjectDetailModal({ project, onClose }: ProjectDetailModalProps) {
    if (!project) return null;

    return (
        <AnimatePresence>
            {project && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
                >
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/90 backdrop-blur-xl"
                        onClick={onClose}
                    />

                    {/* Modal Content */}
                    <motion.div
                        layoutId={`project-${project.id}`}
                        className="relative w-full max-w-6xl h-[90vh] bg-[#0a0a0a] rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row"
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    >
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-6 right-6 z-50 p-2 bg-black/50 text-white rounded-full hover:bg-white hover:text-black transition-colors"
                        >
                            <X size={24} />
                        </button>

                        {/* Visual Side (Left/Top) */}
                        <div className="relative w-full md:w-2/3 h-1/2 md:h-full bg-neutral-900">
                            <Image
                                src={project.image}
                                alt={project.title}
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent md:bg-gradient-to-r" />

                            {/* Play Button Overlay */}
                            <div className="absolute inset-0 flex items-center justify-center cursor-pointer group">
                                <div className="w-20 h-20 md:w-24 md:h-24 bg-primary/90 rounded-full flex items-center justify-center text-black group-hover:scale-110 transition-transform duration-300">
                                    <PlayCircle size={40} />
                                </div>
                            </div>
                        </div>

                        {/* Info Side (Right/Bottom) */}
                        <div className="w-full md:w-1/3 h-1/2 md:h-full p-8 md:p-12 overflow-y-auto flex flex-col justify-between border-l border-white/5 bg-[#0a0a0a]">
                            <div>
                                <motion.span
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="text-primary font-medium tracking-widest uppercase text-sm block mb-4"
                                >
                                    {project.category}
                                </motion.span>

                                <motion.h2
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                    className="font-display text-4xl md:text-5xl font-bold text-white mb-8 leading-tight"
                                >
                                    {project.title}
                                </motion.h2>

                                <motion.p
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 }}
                                    className="text-white/60 leading-relaxed mb-8"
                                >
                                    {project.description}
                                </motion.p>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5 }}
                                    className="space-y-6"
                                >
                                    <div className="flex items-center gap-4 text-white/80 border-b border-white/10 pb-4">
                                        <Calendar size={20} className="text-primary" />
                                        <span>Released: {project.year}</span>
                                    </div>
                                    {project.awards && (
                                        <div className="flex items-center gap-4 text-white/80 border-b border-white/10 pb-4">
                                            <Award size={20} className="text-primary" />
                                            <span>{project.awards}</span>
                                        </div>
                                    )}
                                </motion.div>
                            </div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6 }}
                                className="flex gap-4 mt-8"
                            >
                                <Button size="lg" variant="primary" className="flex-1">
                                    Watch Film
                                </Button>
                                <button className="p-4 border border-white/20 rounded-none hover:bg-white hover:text-black transition-colors text-white">
                                    <Share2 size={24} />
                                </button>
                            </motion.div>
                        </div>

                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
