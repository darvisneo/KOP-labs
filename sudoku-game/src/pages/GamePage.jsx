import { useState, useContext } from 'react';
import SudokuGrid from '../components/SudokuGrid';
import Modal from '../components/Modal';
import { useSudoku } from '../hooks/useSudoku';
import { useTimer } from '../hooks/useTimer';
import { SettingsContext } from '../context/SettingsContext';

function GamePage({ onFinish }) {
    const { board, initialBoard, updateCell, isBoardFull } = useSudoku();
    const { settings } = useContext(SettingsContext);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

    // таймер зупиняєт, якщо модалка відкрита
    const { formattedTime } = useTimer(!isModalOpen);

    const handleCheckGame = () => {
        if (isBoardFull()) {
            setModalMessage('Чудова робота! Ви вирішили головоломку.');
            setIsModalOpen(true);
        } else {
            alert('Поле ще не заповнене!');
        }
    };

    const handleGiveUp = () => {
        setModalMessage('Ви здалися. Не засмучуйтесь, спробуйте ще раз!');
        setIsModalOpen(true);
    };

    return (
        <div className="page game-page">
            <div className="game-header">
                <h2>Гравець: {settings.playerName} ({settings.difficulty})</h2>
                <div className="timer">Час: {formattedTime}</div>
            </div>

            <div className="game-board-container">
                <SudokuGrid board={board} initialBoard={initialBoard} onCellChange={updateCell} />
            </div>

            <div className="game-controls">
                <button onClick={handleGiveUp} className="btn danger-btn">Здатися</button>
                <button onClick={handleCheckGame} className="btn primary-btn">Перевірити</button>
            </div>

            {/* модальне вікно */}
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Гру завершено!">
                <p>{modalMessage}</p>
                <p>Ваш час: <strong>{formattedTime}</strong></p>
                <div className="modal-actions">
                    <button onClick={() => window.location.reload()} className="btn secondary-btn">Почати цей тур заново</button>
                    <button onClick={() => onFinish()} className="btn primary-btn">Нова гра (На головну)</button>
                </div>
            </Modal>
        </div>
    );
}

export default GamePage;