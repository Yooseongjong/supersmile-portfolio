'use client';

interface KineticStampHeaderProps {
    code?: string;
    kicker?: string;
    titleLine1: string;
    titleAccent?: string;
    sealText?: string;
    sealVariant?: 'red' | 'amber';
    krSub?: string;
    description?: string;
    rightSlot?: React.ReactNode;
}

export default function KineticStampHeader({
    titleLine1,
    titleAccent,
    krSub,
    description,
    rightSlot,
}: KineticStampHeaderProps) {
    return (
        <div className="mb-10 pb-8 border-b border-white/10">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
                <div>
                    <h2 className="font-display font-black tracking-[-0.04em] leading-[1.02] text-3xl sm:text-5xl md:text-6xl text-[#FAFAFA]">
                        {titleLine1}{' '}
                        {titleAccent && <span className="text-[#F59E0B]">{titleAccent}</span>}
                    </h2>
                    {(krSub || description) && (
                        <div className="mt-4 flex flex-col gap-1.5">
                            {krSub && (
                                <p className="text-base sm:text-lg font-semibold text-white/90 break-keep">
                                    {krSub}
                                </p>
                            )}
                            {description && (
                                <p className="text-sm text-white/55 max-w-2xl leading-relaxed break-keep">
                                    {description}
                                </p>
                            )}
                        </div>
                    )}
                </div>

                {rightSlot && <div className="shrink-0">{rightSlot}</div>}
            </div>
        </div>
    );
}
