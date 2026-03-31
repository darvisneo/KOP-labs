import SudokuGrid from '../components/SudokuGrid';
import { useSudoku } from '../hooks/useSudoku';
import { useTimer } from '../hooks/useTimer';

function GamePage({ onFinish }) {
    // виклтк хуків
    const { board, initialBoard, updateCell, isBoardFull } = useSudoku();
    const { formattedTime } = useTimer(true);

    const handleCheckGame = () => {
        if (isBoardFull()) {
            // якщо поле заповнене — це перемога
            onFinish(formattedTime, 'Перемога!');
        } else {
            alert('Поле ще не заповнене!');
        }
    };

    return (
        <div className="page game-page">
            <div className="game-header">
                <h2>Гра триває</h2>
                <div className="timer">Час: {formattedTime}</div>
            </div>

            <div className="game-board-container">
                <SudokuGrid
                    board={board}
                    initialBoard={initialBoard}
                    onCellChange={updateCell}
                />
            </div>

            <div className="game-controls">
                <button onClick={() => onFinish(formattedTime, 'Здалися')} className="btn danger-btn">Здатися</button>
                <button onClick={handleCheckGame} className="btn primary-btn">Перевірити</button>
            </div>
        </div>
    );
}

export default GamePage;