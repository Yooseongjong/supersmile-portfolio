import { Suspense } from 'react';
import Work3DStage from '@/components/v2/Work3DStage';

export default function WorkPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-black" />}>
            <Work3DStage />
        </Suspense>
    );
}
