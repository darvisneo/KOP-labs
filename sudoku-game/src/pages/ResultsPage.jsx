function ResultsPage({ stats, onRestart }) {
    return (
        <div className="page results-page">
            <h2>Гру завершено!</h2>

            <div className="stats-container">
                <p>Статус: <strong>{stats.status}</strong></p>
                <p>Час гри: <strong>{stats.time}</strong></p>
            </div>

            <button onClick={onRestart} className="btn primary-btn">На головну</button>
        </div>
    );
}

export default ResultsPage;