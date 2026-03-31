import { createContext, useState, useEffect } from 'react';

export const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
    // Зберігання і зчитування даних з localStorage
    const [settings, setSettings] = useState(() => {
        const saved = localStorage.getItem('sudokuSettings');
        return saved ? JSON.parse(saved) : { playerName: '', difficulty: 'easy' };
    });

    useEffect(() => {
        localStorage.setItem('sudokuSettings', JSON.stringify(settings));
    }, [settings]);

    return (
        <SettingsContext.Provider value={{ settings, setSettings }}>
            {children}
        </SettingsContext.Provider>
    );
};