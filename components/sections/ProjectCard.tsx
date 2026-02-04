'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useAudio } from '@/components/ui/AudioProvider';

interface ProjectCardProps {
    title: string;
    category: string;
    image: string;
    index: number;
    client?: string;
    released?: string;
    slogan?: string;
}

export default function ProjectCard({ title, category, image, index, client, released, slogan }: ProjectCardProps) {
    const { playHover, playClick } = useAudio();

    return (
        <motion.div
            className="group relative w-full aspect-video overflow-hidden rounded-lg bg-neutral-900 cursor-pointer border border-white/5 hover:border-primary transition-all duration-500 ease-out"
            onMouseEnter={() => playHover()}
            onClick={() => playClick()}
        >
            {/* Image with Cinematic Effect: Grayscale & Dimmed -> Color & Bright & Slow Zoom */}
            <div className="absolute inset-0 w-full h-full overflow-hidden">
                <motion.div
                    className="w-full h-full grayscale-[80%] brightness-75 group-hover:grayscale-0 group-hover:brightness-100 group-hover:scale-110 transition-all duration-[2000ms] ease-out"
                >
                    {/* Standard Next.js Image */}
                    <div className="w-full h-full bg-neutral-800 relative">
                        <Image
                            src={image}
                            alt={title}
                            fill
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500 z-20" />
                    </div>
                </motion.div>
            </div>

            {/* Content */}
            <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end z-30">
                <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                    {/* Category Tag */}
                    <div className="mb-2 md:mb-3">
                        <span className="text-primary font-bold tracking-widest text-[10px] md:text-xs uppercase bg-black/50 backdrop-blur-md px-2 py-1 rounded-sm border border-primary/20 shadow-[0_0_10px_rgba(34,197,94,0.2)]">
                            {category}
                        </span>
                    </div>

                    {/* Slogan - Slide Up Effect */}
                    {slogan && (
                        <div className="overflow-hidden mb-1 md:mb-2">
                            <h4 className="text-white/90 font-medium text-sm md:text-lg italic tracking-wide font-serif transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 delay-100">
                                &quot;{slogan}&quot;
                            </h4>
                        </div>
                    )}

                    {/* Title */}
                    <h3 className="font-display text-xl md:text-3xl font-bold text-white mb-2 md:mb-3 leading-tight line-clamp-2 shadow-black drop-shadow-lg">
                        {title}
                    </h3>

                    {/* Meta Info */}
                    {(client || released) && (
                        <div className="flex items-center gap-4 text-[10px] md:text-xs font-medium text-white/50 border-t border-white/10 pt-3 opacity-60 group-hover:opacity-100 transition-opacity duration-500">
                            {client && (
                                <p className="flex items-center">
                                    <span className="text-white/30 uppercase tracking-wider mr-2">CLIENT</span>
                                    <span className="text-white/70">{client}</span>
                                </p>
                            )}
                            {released && (
                                <p className="flex items-center">
                                    <span className="text-white/30 uppercase tracking-wider mr-2">RELEASED</span>
                                    <span className="text-white/70">{released}</span>
                                </p>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
}
