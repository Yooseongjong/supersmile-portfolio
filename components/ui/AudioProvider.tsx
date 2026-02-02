'use client';

import { createContext, useContext, useEffect, useRef, useState } from 'react';

interface AudioContextType {
    playHover: () => void;
    playClick: () => void;
    isMuted: boolean;
    toggleMute: () => void;
}

const AudioContext = createContext<AudioContextType | null>(null);

export function useAudio() {
    const context = useContext(AudioContext);
    if (!context) {
        throw new Error('useAudio must be used within an AudioProvider');
    }
    return context;
}

export default function AudioProvider({ children }: { children: React.ReactNode }) {
    const [isMuted, setIsMuted] = useState(false);
    const audioContextRef = useRef<AudioContext | null>(null);
    const bgmRef = useRef<HTMLAudioElement | null>(null);
    const [hasInteracted, setHasInteracted] = useState(false);

    useEffect(() => {
        // Initialize AudioContext and BGM on user interaction
        const initAudio = () => {
            if (typeof window !== 'undefined') {
                // Audio Context
                if (!audioContextRef.current) {
                    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
                    if (AudioContext) {
                        audioContextRef.current = new AudioContext();
                    }
                }

                // BGM Initialization
                if (!bgmRef.current) {
                    bgmRef.current = new Audio('/sounds/bgm.mp3');
                    bgmRef.current.loop = true;
                    bgmRef.current.volume = 0.5; // Default volume
                }

                setHasInteracted(true);
            }
        };

        window.addEventListener('click', initAudio, { once: true });
        return () => window.removeEventListener('click', initAudio);
    }, []);

    // Handle BGM Playback based on Mute state and Interaction
    useEffect(() => {
        if (!bgmRef.current || !hasInteracted) return;

        if (isMuted) {
            bgmRef.current.pause();
        } else {
            // Attempt to play, handling potential auto-play errors
            bgmRef.current.play().catch(e => console.log("BGM Playback failed (likely due to interaction policy):", e));
        }
    }, [isMuted, hasInteracted]);

    const playTone = (freq: number, type: 'sine' | 'square' | 'triangle', duration: number, volume: number = 0.05) => {
        if (isMuted || !audioContextRef.current) return;

        try {
            // Resume if suspended (browser autoplay policy)
            if (audioContextRef.current.state === 'suspended') {
                audioContextRef.current.resume();
            }

            const osc = audioContextRef.current.createOscillator();
            const gainNode = audioContextRef.current.createGain();

            osc.type = type;
            osc.frequency.setValueAtTime(freq, audioContextRef.current.currentTime);

            gainNode.gain.setValueAtTime(volume, audioContextRef.current.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.001, audioContextRef.current.currentTime + duration);

            osc.connect(gainNode);
            gainNode.connect(audioContextRef.current.destination);

            osc.start();
            osc.stop(audioContextRef.current.currentTime + duration);
        } catch (e) {
            console.error("Audio play error", e);
        }
    };

    const playHover = () => {
        // Subtle high-pitch blip
        playTone(800, 'sine', 0.1, 0.03);
    };

    const playClick = () => {
        // Deeper, more substantial click
        playTone(300, 'triangle', 0.15, 0.08);
    };

    const toggleMute = () => setIsMuted(!isMuted);

    return (
        <AudioContext.Provider value={{ playHover, playClick, isMuted, toggleMute }}>
            {children}
        </AudioContext.Provider>
    );
}
