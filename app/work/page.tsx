'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import Footer from '@/components/layout/Footer';

// Dummy Categories
const CATEGORIES = ["ALL", "Branded", "Entertainment", "Live", "Event"];

// Dummy Data
const PROJECTS = [
    { id: 1, title: "Samsung Galaxy S24", category: "Branded", client: "Samsung" },
    { id: 2, title: "Neon City", category: "Entertainment", client: "YouTube Original" },
    { id: 3, title: "Summer Vibes Festival", category: "Live", client: "Red Bull" },
    { id: 4, title: "Tech Conference 2024", category: "Event", client: "Google" },
    { id: 5, title: "Nike Air Max", category: "Branded", client: "Nike" },
    { id: 6, title: "Late Night Show", category: "Entertainment", client: "TVN" },
    { id: 7, title: "Live Concert 2023", category: "Live", client: "Melon" },
    { id: 8, title: "Corporate Awards", category: "Event", client: "Hyundai" },
    { id: 9, title: "Coca Cola Zero", category: "Branded", client: "Coca Cola" },
    { id: 10, title: "Web Series Pilot", category: "Entertainment", client: "Netflix" },
    { id: 11, title: "Street Dance Battle", category: "Live", client: "Mnet" },
    { id: 12, title: "Product Launch", category: "Event", client: "LG" },
];

export default function WorkPage() {
    const [selectedCategory, setSelectedCategory] = useState("ALL");

    const filteredProjects = selectedCategory === "ALL"
        ? PROJECTS
        : PROJECTS.filter(p => p.category === selectedCategory);

    return (
        <main className="min-h-screen bg-[#050505] text-white pt-24">
            <div className="container mx-auto px-6 py-12">
                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Sidebar Filter (Left Column) */}
                    <div className="lg:w-1/5">
                        <div className="sticky top-32 flex flex-col space-y-4">
                            <h2 className="text-xl font-display font-bold mb-4 text-white/50 tracking-wider">WORK</h2>
                            {CATEGORIES.map((category) => (
                                <button
                                    key={category}
                                    onClick={() => setSelectedCategory(category)}
                                    className={cn(
                                        "text-left text-lg transition-all duration-300 font-medium",
                                        selectedCategory === category
                                            ? "text-primary font-bold pl-4 border-l-2 border-primary"
                                            : "text-gray-400 hover:text-white"
                                    )}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Gallery Grid (Right Column) */}
                    <div className="lg:w-4/5">
                        <motion.div
                            layout
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        >
                            <AnimatePresence mode="popLayout">
                                {filteredProjects.map((project) => (
                                    <motion.div
                                        layout
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        transition={{ duration: 0.3 }}
                                        key={project.id}
                                        className="group relative aspect-video bg-neutral-900 border border-white/5 overflow-hidden rounded-sm cursor-pointer hover:border-primary/50 transition-colors"
                                    >
                                        {/* Placeholder Image Visual */}
                                        <div className="absolute inset-0 bg-gradient-to-br from-neutral-800 to-neutral-900 group-hover:scale-105 transition-transform duration-500 flex items-center justify-center">
                                            <div className="font-display text-4xl font-bold text-white/5 group-hover:text-white/10 transition-colors">
                                                {project.title.substring(0, 2).toUpperCase()}
                                            </div>
                                        </div>

                                        {/* Overlay Content */}
                                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4 text-center">
                                            <span className="text-primary text-xs tracking-widest uppercase mb-2 font-bold">{project.category}</span>
                                            <h3 className="font-display text-xl font-bold">{project.title}</h3>
                                            <p className="text-sm text-gray-300 mt-1">{project.client}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </motion.div>
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    );
}
