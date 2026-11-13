'use client';

import { usePathname } from 'next/navigation';
import { useEffect, type ReactNode } from 'react';

/** 홈(/) 및 3D 워크룸(/work)에서는 구형 네비·커서·프리로더를 비활성화하고 네이티브 커서를 복원 */
export default function ChromeGate({ children }: { children: ReactNode }) {
    const pathname = usePathname();
    const isHome = pathname === '/';
    const isWork = Boolean(pathname?.startsWith('/work'));
    const isV2Route = isHome || isWork;

    useEffect(() => {
        document.body.classList.toggle('v2-home', isV2Route);
        document.body.classList.toggle('v2-work', isWork);
        return () => {
            document.body.classList.remove('v2-home', 'v2-work');
        };
    }, [isV2Route, isWork]);

    if (isV2Route) return null;
    return <>{children}</>;
}
