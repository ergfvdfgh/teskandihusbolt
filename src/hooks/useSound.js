import { useRef, useEffect } from 'react';
export default function useSound(soundPath) {
    const audioPool = useRef([]);
    
    useEffect(() => {
        for (let i = 0; i < 3; i++) {
            const audio = new Audio(soundPath);
            audio.preload = 'auto';
            audioPool.current.push(audio);
        }
        return () => {
            audioPool.current.forEach(audio => {
                audio.pause();
                audio.src = '';
            });
            audioPool.current = [];
        };
    }, [soundPath]);
    
    const play = () => {
        const audio = audioPool.current.find(a => a.paused);
        if (audio) {
            audio.currentTime = 0;
            audio.play().catch(console.error);
        } else {
            const newAudio = new Audio(soundPath);
            newAudio.play().catch(console.error);
        }
    };
    
    return play;
}