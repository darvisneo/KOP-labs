function ResultsPage({ onRestart }) {
    return (
        <div className="page results-page">
            <h2>Гру завершено!</h2>

            {/* Плейсхолдери для статистики? */}
            <div className="stats-container">
                <p>Статус: <strong>Перемога / Поразка</strong></p>
                <p>Час гри: <strong>12:34</strong></p>
                <p>Кількість помилок: <strong>1/3</strong></p>
            </div>

            <button onClick={onRestart} className="btn primary-btn">На головну</button>
        </div>
    );
}

export default ResultsPage;