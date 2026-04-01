import { useState, useEffect, useCallback } from 'react';

export const useTimer = (isActive) => {
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
        let interval = null;
        if (isActive) {
            interval = setInterval(() => setSeconds(s => s + 1), 1000);
        } else if (!isActive && seconds !== 0) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isActive, seconds]);

    const resetTimer = useCallback(() => setSeconds(0), []);

    const formattedTime = `${Math.floor(seconds / 60).toString().padStart(2, '0')}:${(seconds % 60).toString().padStart(2, '0')}`;

    return { seconds, formattedTime, resetTimer };
};