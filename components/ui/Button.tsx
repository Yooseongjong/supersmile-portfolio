'use client';

import { ReactNode } from 'react';
import { HTMLMotionProps, motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';
import { useAudio } from './AudioProvider';

interface ButtonProps extends HTMLMotionProps<"button"> {
    children: ReactNode;
    variant?: 'primary' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    isLoading?: boolean;
}

export default function Button({
    children,
    className,
    variant = 'primary',
    size = 'md',
    isLoading,
    onMouseEnter,
    onClick,
    ...props
}: ButtonProps) {
    const { playHover, playClick } = useAudio();

    const baseStyles = "relative inline-flex items-center justify-center rounded-full font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:pointer-events-none disabled:opacity-50 overflow-hidden";

    // ... variants and sizes are unchanged

    const variants = {
        primary: "bg-primary text-black hover:bg-opacity-90",
        outline: "border border-primary text-primary hover:bg-primary hover:text-black",
        ghost: "hover:bg-primary/10 text-primary",
    };

    const sizes = {
        sm: "h-9 px-4 text-xs",
        md: "h-11 px-8 text-sm",
        lg: "h-14 px-10 text-base",
    };

    const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
        playHover();
        onMouseEnter?.(e);
    };

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        playClick();
        onClick?.(e);
    };

    return (
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={cn(baseStyles, variants[variant], sizes[size], className)}
            disabled={isLoading || props.disabled}
            onMouseEnter={handleMouseEnter}
            onClick={isLoading ? undefined : handleClick}
            {...props}
        >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            <span className="relative z-10">{children}</span>
            {variant === 'primary' && (
                <div className="absolute inset-0 -z-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 transform -translate-x-full hover:translate-x-full" />
            )}
        </motion.button>
    );
}
