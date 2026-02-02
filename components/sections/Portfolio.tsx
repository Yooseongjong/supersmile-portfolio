'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import ProjectCard from './ProjectCard';
import ProjectDetailModal from './ProjectDetailModal';

import { projects } from '@/lib/data';

export default function Portfolio() {
    const targetRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
    });
    const [selectedProject, setSelectedProject] = useState<(typeof projects)[0] | null>(null);

    const x = useTransform(scrollYProgress, [0, 1], ["1%", "-75%"]);

    return (
        <section id="work" ref={targetRef} className="relative h-[300vh] bg-neutral-950">
            <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">

                {/* Section Header */}
                <motion.div
                    style={{ opacity: useTransform(scrollYProgress, [0, 0.2], [1, 0]) }}
                    className="absolute top-12 left-6 md:left-24 z-10"
                >
                    <h2 className="font-display text-4xl md:text-6xl font-bold text-white mb-4">
                        SELECTED <span className="text-primary-glow text-primary">WORKS</span>
                    </h2>
                    <div className="h-1 w-24 bg-primary" />
                </motion.div>

                {/* Horizontal Scrolling List */}
                <motion.div style={{ x }} className="flex gap-8 px-6 md:px-24">
                    {projects.map((project, index) => (
                        <div key={project.id} onClick={() => setSelectedProject(project)}>
                            <ProjectCard
                                index={index}
                                title={project.title}
                                category={project.category}
                                image={project.image}
                            />
                        </div>
                    ))}
                </motion.div>

                {/* Progress Bar */}
                <div className="absolute bottom-12 left-0 right-0 max-w-md mx-auto h-1 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                        style={{ scaleX: scrollYProgress }}
                        className="h-full bg-primary origin-left"
                    />
                </div>
            </div>

            {/* Project Detail Modal */}
            <ProjectDetailModal
                project={selectedProject}
                onClose={() => setSelectedProject(null)}
            />
        </section>
    );
}
