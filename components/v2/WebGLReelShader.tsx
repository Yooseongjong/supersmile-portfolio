'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface WebGLReelShaderProps {
    videoEl: HTMLVideoElement | null;
    className?: string;
}

/**
 * Three.js WebGL Shader Canvas for Live Showreel Video
 * - Uses sRGBTransferEOTF() on VideoTexture samples per threejs-shaders spec
 * - Cursor-reactive anamorphic lens distortion & subtle velocity RGB split
 * - Clean GPU resource disposal on unmount
 */
export default function WebGLReelShader({ videoEl, className }: WebGLReelShaderProps) {
    const mountRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = mountRef.current;
        if (!container || !videoEl) return;

        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (reducedMotion) return;

        let renderer: THREE.WebGLRenderer;
        try {
            renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true, powerPreference: 'high-performance' });
        } catch {
            return;
        }

        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.domElement.style.width = '100%';
        renderer.domElement.style.height = '100%';
        renderer.domElement.style.display = 'block';
        container.appendChild(renderer.domElement);

        const scene = new THREE.Scene();
        const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

        const videoTexture = new THREE.VideoTexture(videoEl);
        videoTexture.minFilter = THREE.LinearFilter;
        videoTexture.magFilter = THREE.LinearFilter;

        const uniforms = {
            uVideo: { value: videoTexture },
            uPointer: { value: new THREE.Vector2(0.5, 0.5) },
            uVelocity: { value: 0 },
            uHover: { value: 0 },
            uCanvasAspect: { value: container.clientWidth / Math.max(1, container.clientHeight) },
            uVideoAspect: { value: 16 / 9 },
            uTime: { value: 0 },
        };

        const material = new THREE.ShaderMaterial({
            uniforms,
            vertexShader: /* glsl */ `
                varying vec2 vUv;
                void main() {
                    vUv = uv;
                    gl_Position = vec4(position, 1.0);
                }
            `,
            fragmentShader: /* glsl */ `
                uniform sampler2D uVideo;
                uniform vec2 uPointer;
                uniform float uVelocity;
                uniform float uHover;
                uniform float uCanvasAspect;
                uniform float uVideoAspect;
                uniform float uTime;
                varying vec2 vUv;

                vec2 coverUv(vec2 uv, float canvasAsp, float videoAsp) {
                    vec2 s = vec2(1.0);
                    if (canvasAsp > videoAsp) {
                        s.y = videoAsp / canvasAsp;
                    } else {
                        s.x = canvasAsp / videoAsp;
                    }
                    return (uv - 0.5) * s + 0.5;
                }

                void main() {
                    vec2 uv = coverUv(vUv, uCanvasAspect, uVideoAspect);

                    vec2 delta = vUv - uPointer;
                    delta.x *= uCanvasAspect;
                    float dist = length(delta);

                    // Subtle liquid anamorphic lens ripple near cursor
                    float ripple = exp(-dist * 5.5) * uHover;
                    float wave = sin(dist * 24.0 - uTime * 5.0) * 0.0045 * ripple;
                    vec2 displacedUv = clamp(uv - normalize(delta + 0.0001) * (ripple * 0.018 * (0.35 + uVelocity) + wave), 0.002, 0.998);

                    // Anamorphic horizontal RGB chromatic aberration on pointer motion
                    float shift = (0.0015 + uVelocity * 0.012) * ripple;
                    vec4 cr = sRGBTransferEOTF(texture(uVideo, clamp(displacedUv + vec2(shift, 0.0), 0.002, 0.998)));
                    vec4 cg = sRGBTransferEOTF(texture(uVideo, displacedUv));
                    vec4 cb = sRGBTransferEOTF(texture(uVideo, clamp(displacedUv - vec2(shift, 0.0), 0.002, 0.998)));

                    vec3 col = vec3(cr.r, cg.g, cb.b);

                    // Subtle cinema edge vignette
                    float vig = smoothstep(1.28, 0.35, length((vUv - 0.5) * vec2(1.15, 1.0)));
                    col *= mix(0.72, 1.04, vig);

                    gl_FragColor = vec4(col, 1.0);
                    #include <tonemapping_fragment>
                    #include <colorspace_fragment>
                }
            `,
        });

        const geometry = new THREE.PlaneGeometry(2, 2);
        const mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);

        const targetPointer = new THREE.Vector2(0.5, 0.5);
        const prevPointer = new THREE.Vector2(0.5, 0.5);
        let targetHover = 0;

        const onPointerMove = (e: PointerEvent) => {
            const rect = container.getBoundingClientRect();
            if (rect.width === 0 || rect.height === 0) return;
            const nx = (e.clientX - rect.left) / rect.width;
            const ny = 1.0 - (e.clientY - rect.top) / rect.height;
            if (nx >= 0 && nx <= 1 && ny >= 0 && ny <= 1) {
                targetPointer.set(nx, ny);
                targetHover = 1;
            } else {
                targetHover = 0;
            }
        };

        const onResize = () => {
            if (!container) return;
            const w = container.clientWidth;
            const h = Math.max(1, container.clientHeight);
            renderer.setSize(w, h);
            uniforms.uCanvasAspect.value = w / h;
        };

        const ro = new ResizeObserver(onResize);
        ro.observe(container);
        window.addEventListener('pointermove', onPointerMove, { passive: true });

        const clock = new THREE.Clock();
        renderer.setAnimationLoop(() => {
            const elapsed = clock.getElapsedTime();
            uniforms.uTime.value = elapsed;

            if (videoEl.videoWidth > 0 && videoEl.videoHeight > 0) {
                uniforms.uVideoAspect.value = videoEl.videoWidth / videoEl.videoHeight;
            }

            uniforms.uPointer.value.lerp(targetPointer, 0.12);
            const speed = uniforms.uPointer.value.distanceTo(prevPointer) * 18.0;
            prevPointer.copy(uniforms.uPointer.value);

            uniforms.uVelocity.value = THREE.MathUtils.lerp(uniforms.uVelocity.value, Math.min(1.0, speed), 0.14);
            uniforms.uHover.value = THREE.MathUtils.lerp(uniforms.uHover.value, targetHover, 0.08);

            renderer.render(scene, camera);
        });

        return () => {
            renderer.setAnimationLoop(null);
            window.removeEventListener('pointermove', onPointerMove);
            ro.disconnect();
            geometry.dispose();
            material.dispose();
            videoTexture.dispose();
            renderer.dispose();
            if (renderer.domElement.parentNode === container) {
                container.removeChild(renderer.domElement);
            }
        };
    }, [videoEl]);

    return <div ref={mountRef} className={className} aria-hidden />;
}
