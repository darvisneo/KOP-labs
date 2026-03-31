import { useState } from 'react';
import StartPage from './pages/StartPage';
import GamePage from './pages/GamePage';
import ResultsPage from './pages/ResultsPage';
import './styles/App.css';

function App() {
    const [currentPage, setCurrentPage] = useState('start');
    const [gameStats, setGameStats] = useState({ time: '00:00', status: '' });

    const handleFinishGame = (time, status) => {
        setGameStats({ time, status });
        setCurrentPage('results');
    };

    return (
        <div className="app-container">
            {currentPage === 'start' && (
                <StartPage onStart={() => setCurrentPage('game')} />
            )}

            {currentPage === 'game' && (
                <GamePage onFinish={handleFinishGame} />
            )}

            {currentPage === 'results' && (
                <ResultsPage
                    stats={gameStats}
                    onRestart={() => setCurrentPage('start')}
                />
            )}
        </div>
    );
}

export default App;