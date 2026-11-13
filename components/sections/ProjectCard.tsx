'use client';

import { motion } from 'framer-motion';
import SafeImage from '@/components/ui/SafeImage';
import { useAudio } from '@/components/ui/AudioProvider';

interface ProjectCardProps {
    title: string;
    category: string;
    image: string;
    index: number;
    client?: string;
    released?: string;
    slogan?: string;
    roles?: string[];
}

export default function ProjectCard({ title, category, image, index, client, released, slogan, roles }: ProjectCardProps) {
    const { playHover, playClick } = useAudio();

    return (
        <motion.div
            className="group relative w-full h-full min-h-[300px] aspect-video overflow-hidden rounded-sm bg-carbon cursor-pointer border border-white/10 hover:border-primary/70 transition-colors duration-500 ease-out"
            onMouseEnter={() => playHover()}
            onClick={() => playClick()}
        >
            {/* Thumbnail */}
            <div className="absolute inset-0 w-full h-full overflow-hidden">
                <div className="w-full h-full bg-carbon relative transition-transform duration-700 ease-out group-hover:scale-105">
                    {image && (
                        <SafeImage
                            src={image}
                            alt={title}
                            fill
                            sizes="(max-width: 768px) 100vw, 33vw"
                            className="object-cover"
                        />
                    )}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent z-20" />
            </div>

            {/* Play overlay */}
            <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <span className="font-mono text-xs md:text-sm tracking-[0.3em] text-white border border-white/60 px-5 py-3 backdrop-blur-sm">
                    [ PLAY VIDEO <span className="text-primary">●</span> ]
                </span>
            </div>

            {/* Top meta */}
            <div className="absolute top-4 left-4 right-4 z-30 flex items-start justify-between gap-2">
                <span className="font-mono text-[10px] tracking-[0.25em] text-white/70 bg-black/50 backdrop-blur-md px-2 py-1 border border-white/10">
                    {String(index + 1).padStart(2, '0')} / {category}
                </span>
            </div>

            {/* Content */}
            <div className="absolute inset-x-0 bottom-0 p-5 md:p-6 z-30">
                {roles && roles.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-3">
                        {roles.map((r) => (
                            <span key={r} className="font-mono text-[9px] md:text-[10px] tracking-wider uppercase text-amber border border-amber/40 bg-black/50 px-2 py-0.5">
                                [{r}]
                            </span>
                        ))}
                    </div>
                )}

                {slogan && (
                    <h4 className="text-white/60 text-xs md:text-sm italic font-serif mb-1 line-clamp-1">&quot;{slogan}&quot;</h4>
                )}

                <h3 className="font-display text-lg md:text-2xl font-bold text-white leading-tight line-clamp-2 drop-shadow-lg">
                    {title}
                </h3>

                {(client || released) && (
                    <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-[10px] md:text-xs text-white/50 border-t border-white/10 pt-3">
                        {client && <span className="line-clamp-1"><span className="text-white/30 mr-2 tracking-wider">CLIENT</span>{client}</span>}
                        {released && <span><span className="text-white/30 mr-2 tracking-wider">RELEASED</span>{released}</span>}
                    </div>
                )}
            </div>
        </motion.div>
    );
}
