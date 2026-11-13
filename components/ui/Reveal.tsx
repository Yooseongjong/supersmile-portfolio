'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

/** 섹션 진입 시 GSAP ScrollTrigger로 부드럽게 등장시키는 래퍼 */
export default function Reveal({ children, className }: { children: React.ReactNode; className?: string }) {
    const ref = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!ref.current) return;
        gsap.from(ref.current, {
            opacity: 0,
            y: 60,
            duration: 1.1,
            ease: 'power3.out',
            scrollTrigger: { trigger: ref.current, start: 'top 85%', once: true },
        });
    }, { scope: ref });

    return <div ref={ref} className={className}>{children}</div>;
}
