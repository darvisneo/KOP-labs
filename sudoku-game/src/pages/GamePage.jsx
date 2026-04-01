import { useState, useContext } from 'react';
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

    const { board, initialBoard, updateCell, isBoardFull } = useSudoku();
    const { settings } = useContext(SettingsContext);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
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

    const goToHome = () => {
        navigate('/');
    };

    return (
        <div className={styles.page}>
            <div>
                <h2>Гравець: {settings.playerName}</h2>
                <p style={{ fontSize: '12px', color: 'gray' }}>ID сесії: {userId}</p>
                <div>Час: {formattedTime} | Складність: {settings.difficulty}</div>
            </div>

            <div>
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
                    <button onClick={() => window.location.reload()} className={`${styles.btn} ${styles.secondaryBtn}`}>Заново</button>
                    <button onClick={goToHome} className={`${styles.btn} ${styles.primaryBtn}`}>Нова гра</button>
                </div>
            </Modal>
        </div>
    );
}

export default GamePage;