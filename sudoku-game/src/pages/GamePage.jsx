import { useState, useContext, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import SudokuGrid from '../components/SudokuGrid';
import Modal from '../components/Modal';
import { useSudoku } from '../hooks/useSudoku';
import { useTimer } from '../hooks/useTimer';
import { SettingsContext } from '../context/SettingsContext';
import styles from '../styles/App.module.css';

function GamePage() {
    const { userId } = useParams();
    const navigate = useNavigate();

    const { board, initialBoard, updateCell, isBoardFull, mistakes, maxMistakes, resetBoard } = useSudoku();
    const { settings } = useContext(SettingsContext);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [gameStatus, setGameStatus] = useState('playing'); // 'playing', 'won', 'lost'

    const { formattedTime, resetTimer } = useTimer(gameStatus === 'playing' && !isModalOpen);

    useEffect(() => {
        if (mistakes >= maxMistakes) {
            setGameStatus('lost');
            setModalMessage('Ви програли! Допущено забагато помилок.');
            setIsModalOpen(true);
        }
    }, [mistakes, maxMistakes]);

    const handleCheckGame = () => {
        if (isBoardFull()) {
            setGameStatus('won');
            setModalMessage('Чудова робота! Ви вирішили головоломку.');
            setIsModalOpen(true);
        } else {
            alert('Поле ще не заповнене!');
        }
    };

    const handleGiveUp = () => {
        setGameStatus('lost');
        setModalMessage('Ви здалися. Не засмучуйтесь, спробуйте ще раз!');
        setIsModalOpen(true);
    };

    const handleRestartSameGame = () => {
        resetBoard();
        resetTimer();
        setGameStatus('playing');
        setIsModalOpen(false);
    };

    const goToHome = () => navigate('/');

    return (
        <div className={styles.page}>
            <div>
                <h2>Гравець: {settings.playerName}</h2>
                <p style={{ fontSize: '12px', color: 'gray' }}>ID сесії: {userId}</p>
                <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', marginTop: '10px' }}>
                    <span>Час: <strong>{formattedTime}</strong></span>
                    <span>|</span>
                    <span>Складність: <strong>{settings.difficulty}</strong></span>
                    <span>|</span>
                    <span style={{ color: mistakes > 0 ? '#f44336' : 'inherit' }}>
            Помилки: <strong>{mistakes} / {maxMistakes}</strong>
          </span>
                </div>
            </div>

            <div style={{ marginTop: '20px' }}>
                <SudokuGrid board={board} initialBoard={initialBoard} onCellChange={updateCell} />
            </div>

            <div style={{ display: 'flex', gap: '15px', marginTop: '20px' }}>
                <button onClick={handleGiveUp} className={`${styles.btn} ${styles.dangerBtn}`}>Здатися</button>
                <button onClick={handleCheckGame} className={`${styles.btn} ${styles.primaryBtn}`}>Перевірити</button>
            </div>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Гру завершено!">
                <p>{modalMessage}</p>
                <p>Ваш час: <strong>{formattedTime}</strong></p>
                <div style={{ display: 'flex', gap: '15px', marginTop: '20px', justifyContent: 'center' }}>
                    <button onClick={handleRestartSameGame} className={`${styles.btn} ${styles.secondaryBtn}`}>
                        Спробувати цю ж дошку
                    </button>
                    <button onClick={goToHome} className={`${styles.btn} ${styles.primaryBtn}`}>Нова гра</button>
                </div>
            </Modal>
        </div>
    );
}

export default GamePage;