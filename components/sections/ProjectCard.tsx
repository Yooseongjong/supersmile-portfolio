'use client';

import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import Image from 'next/image';
import { useAudio } from '@/components/ui/AudioProvider';

interface ProjectCardProps {
    title: string;
    category: string;
    image: string;
    index: number;
}

export default function ProjectCard({ title, category, image, index }: ProjectCardProps) {
    const { playHover, playClick } = useAudio();

    return (
        <motion.div
            className="group relative h-[400px] w-[300px] md:h-[600px] md:w-[450px] flex-shrink-0 overflow-hidden rounded-lg bg-neutral-900 cursor-pointer"
            whileHover={{ scale: 0.98 }}
            transition={{ duration: 0.4 }}
            onMouseEnter={() => playHover()}
            onClick={() => playClick()}
        >
            {/* Image with slight parallax or zoom on hover */}
            <motion.div
                className="absolute inset-0 w-full h-full"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.6 }}
            >
                {/* Placeholder for standard Next.js Image - using a simple div for now since we don't have assets yet */}
                <div className="w-full h-full bg-neutral-800 relative">
                    <Image
                        src={image}
                        alt={title}
                        fill
                        className="object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center text-neutral-700 font-display text-9xl opacity-20 font-bold z-10">
                        {index + 1}
                    </div>
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500 z-20" />
                </div>
            </motion.div>

            {/* Content */}
            <div className="absolute inset-0 p-8 flex flex-col justify-between">
                <div className="self-end opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                    <div className="w-12 h-12 rounded-full bg-primary/90 flex items-center justify-center text-black">
                        <Play fill="currentColor" size={16} className="ml-0.5" />
                    </div>
                </div>

                <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                    <h3 className="font-display text-3xl md:text-4xl font-bold text-white mb-2">{title}</h3>
                    <p className="text-primary font-medium tracking-widest text-sm uppercase">{category}</p>
                </div>
            </div>
        </motion.div>
    );
}
