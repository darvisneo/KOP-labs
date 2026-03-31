import SudokuGrid from '../components/SudokuGrid';

function GamePage({ onFinish }) {
    return (
        <div className="page game-page">
            <h2>Гра триває</h2>

            <div className="game-board-container">
                {/* Ігрове поле буде */}
                <SudokuGrid />
            </div>

            <div className="game-controls">
                <button className="btn secondary-btn">Пауза (плейсхолдер)</button>
                <button onClick={onFinish} className="btn danger-btn">Завершити гру</button>
            </div>
        </div>
    );
}

export default GamePage;