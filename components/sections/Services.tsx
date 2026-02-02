'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

import { services } from '@/lib/data';

export default function Services() {
    return (
        <section id="services" className="py-24 bg-black text-white overflow-hidden">
            <div className="container mx-auto px-6">

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="mb-16"
                >
                    <p className="text-primary font-medium tracking-widest uppercase mb-4">What We Do</p>
                    <h2 className="font-display text-4xl md:text-6xl font-bold">OUR <span className="text-neutral-500">SERVICES</span></h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="group border-t border-white/10 pt-8 hover:border-primary/50 transition-colors duration-300"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <span className="font-display text-2xl text-primary/50 group-hover:text-primary transition-colors">{service.number}</span>
                                <ArrowUpRight className="text-white/20 group-hover:text-primary transition-colors transform group-hover:translate-x-1 group-hover:-translate-y-1 duration-300" />
                            </div>
                            <h3 className="font-display text-3xl font-bold mb-4">{service.title}</h3>
                            <p className="text-white/50 group-hover:text-white/80 transition-colors leading-relaxed">
                                {service.description}
                            </p>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
}
