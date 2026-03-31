import { useState, useCallback, useContext } from 'react';
import { SettingsContext } from '../context/SettingsContext';

const FULL_BOARD = [
    [5, 3, 4, 6, 7, 8, 9, 1, 2],
    [6, 7, 2, 1, 9, 5, 3, 4, 8],
    [1, 9, 8, 3, 4, 2, 5, 6, 7],
    [8, 5, 9, 7, 6, 1, 4, 2, 3],
    [4, 2, 6, 8, 5, 3, 7, 9, 1],
    [7, 1, 3, 9, 2, 4, 8, 5, 6],
    [9, 6, 1, 5, 3, 7, 2, 8, 4],
    [2, 8, 7, 4, 1, 9, 6, 3, 5],
    [3, 4, 5, 2, 8, 6, 1, 7, 9],
];

export const useSudoku = () => {
    const { settings } = useContext(SettingsContext);

    const generateBoard = useCallback(() => {
        let attempts = settings.difficulty === 'easy' ? 20 : settings.difficulty === 'medium' ? 40 : 60;
        const newBoard = FULL_BOARD.map(row => [...row]);

        while (attempts > 0) {
            const row = Math.floor(Math.random() * 9);
            const col = Math.floor(Math.random() * 9);
            if (newBoard[row][col] !== 0) {
                newBoard[row][col] = 0;
                attempts--;
            }
        }
        return newBoard;
    }, [settings.difficulty]);

    const [initialBoard] = useState(generateBoard);
    const [board, setBoard] = useState(initialBoard);

    const updateCell = useCallback((row, col, value) => {
        if (value !== '' && !/^[1-9]$/.test(value)) return;
        const numValue = value === '' ? 0 : parseInt(value, 10);

        setBoard((prevBoard) => {
            const newBoard = prevBoard.map((r) => [...r]);
            newBoard[row][col] = numValue;
            return newBoard;
        });
    }, []);

    const isBoardFull = () => board.every((row) => row.every((cell) => cell !== 0));

    return { board, initialBoard, updateCell, isBoardFull };
};