'use client';

import Image, { ImageProps } from 'next/image';
import { useEffect, useState } from 'react';

/**
 * next/image wrapper: YouTube maxresdefault.jpg가 404일 때 hqdefault.jpg로 자동 폴백.
 */
export default function SafeImage({ src, alt, onError, ...rest }: ImageProps) {
    const [current, setCurrent] = useState(src);

    useEffect(() => {
        setCurrent(src);
    }, [src]);

    return (
        <Image
            {...rest}
            src={current}
            alt={alt}
            onError={(e) => {
                if (typeof current === 'string' && current.includes('/maxresdefault.jpg')) {
                    setCurrent(current.replace('/maxresdefault.jpg', '/hqdefault.jpg'));
                }
                onError?.(e);
            }}
        />
    );
}
