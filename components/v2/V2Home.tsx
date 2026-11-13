'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import V2Nav from './V2Nav';
import V2Hero from './V2Hero';
import V2StampManifesto from './V2StampManifesto';
import V2Works from './V2Works';
import V2DirectDI from './V2DirectDI';
import V2Services from './V2Services';
import V2Contact from './V2Contact';
import VideoModal, { ModalTarget } from './VideoModal';
import { getFeaturedWorks, playProject } from './works';
import { Project } from '@/lib/data';

export default function V2Home() {
    const [modalTarget, setModalTarget] = useState<ModalTarget>(null);
    const works = useMemo(() => getFeaturedWorks(), []);

    useEffect(() => {
        document.body.classList.add('v2-home');
        return () => document.body.classList.remove('v2-home');
    }, []);

    const onPlayProject = useCallback((p: Project) => playProject(p, setModalTarget), []);
    const onOpenShowreel = useCallback(
        (variant: 'stomp20' | 'full' = 'full') => setModalTarget({ kind: 'showreel', variant }),
        []
    );

    return (
        <div className="relative bg-[#050507] text-white">
            <V2Nav onOpenShowreel={() => onOpenShowreel('full')} />
            <V2Hero onOpenShowreel={() => onOpenShowreel('full')} />
            <V2StampManifesto onOpenShowreel={() => onOpenShowreel('stomp20')} />
            <V2Works works={works} onPlay={onPlayProject} />
            <V2DirectDI />
            <V2Services />
            <V2Contact />
            <VideoModal target={modalTarget} onClose={() => setModalTarget(null)} />
        </div>
    );
}
