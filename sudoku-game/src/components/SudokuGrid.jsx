import '../styles/Sudoku.css';

function SudokuGrid() {
    const cells = Array.from({ length: 81 }, (_, i) => i);

    return (
        <div className="sudoku-grid">
            {cells.map((index) => {
                const row = Math.floor(index / 9);
                const col = index % 9;

                const isRightBorder = col === 2 || col === 5;
                const isBottomBorder = row === 2 || row === 5;

                let cellClasses = 'sudoku-cell';
                if (isRightBorder) cellClasses += ' border-right';
                if (isBottomBorder) cellClasses += ' border-bottom';

                return (
                    <div key={index} className={cellClasses}>
                    </div>
                );
            })}
        </div>
    );
}

export default SudokuGrid;