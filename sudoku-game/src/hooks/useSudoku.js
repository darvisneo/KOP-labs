import { useState, useCallback } from 'react';

const INITIAL_BOARD = [
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9],
];

export const useSudoku = () => {
    const [board, setBoard] = useState(INITIAL_BOARD);
    const [initialBoard] = useState(INITIAL_BOARD);

    const updateCell = useCallback((row, col, value) => {
        // введення цифр від 1 до 9 або очищати поле
        if (value !== '' && (!/^[1-9]$/.test(value))) return;

        const numValue = value === '' ? 0 : parseInt(value, 10);

        setBoard((prevBoard) => {
            const newBoard = prevBoard.map((r) => [...r]);
            newBoard[row][col] = numValue;
            return newBoard;
        });
    }, []);

    // перевірка на заповненість поля
    const isBoardFull = () => {
        return board.every((row) => row.every((cell) => cell !== 0));
    };

    return {
        board,
        initialBoard,
        updateCell,
        isBoardFull,
    };
};