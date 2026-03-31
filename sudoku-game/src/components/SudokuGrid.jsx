import '../styles/Sudoku.css';

function SudokuGrid({ board, initialBoard, onCellChange }) {
    return (
        <div className="sudoku-grid">
            {board.map((row, rowIndex) =>
                row.map((cellValue, colIndex) => {
                    const isRightBorder = colIndex === 2 || colIndex === 5;
                    const isBottomBorder = rowIndex === 2 || rowIndex === 5;
                    const isEditable = initialBoard[rowIndex][colIndex] === 0;

                    let cellClasses = 'sudoku-cell';
                    if (isRightBorder) cellClasses += ' border-right';
                    if (isBottomBorder) cellClasses += ' border-bottom';
                    if (!isEditable) cellClasses += ' readonly';

                    return (
                        <div key={`${rowIndex}-${colIndex}`} className={cellClasses}>
                            {isEditable ? (
                                <input
                                    type="text"
                                    maxLength="1"
                                    value={cellValue === 0 ? '' : cellValue}
                                    onChange={(e) => onCellChange(rowIndex, colIndex, e.target.value)}
                                    className="sudoku-input"
                                />
                            ) : (
                                <span className="sudoku-fixed-value">{cellValue}</span>
                            )}
                        </div>
                    );
                })
            )}
        </div>
    );
}

export default SudokuGrid;