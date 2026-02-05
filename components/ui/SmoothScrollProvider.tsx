'use client';

import { ReactLenis } from '@studio-freight/react-lenis';

export default function SmoothScrollProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        // @ts-ignore
        <ReactLenis root options={{ lerp: 0.1, duration: 2.2, smoothWheel: true, smoothTouch: false, wheelMultiplier: 0.9 }}>
            {children}
        </ReactLenis>
    );
}
