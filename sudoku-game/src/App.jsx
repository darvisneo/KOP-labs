import { useState } from 'react';
import StartPage from './pages/StartPage';
import GamePage from './pages/GamePage';
import ResultsPage from './pages/ResultsPage';
import './styles/App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('start');

  return (
      <div className="app-container">
        {currentPage === 'start' && (
            <StartPage onStart={() => setCurrentPage('game')} />
        )}

        {currentPage === 'game' && (
            <GamePage onFinish={() => setCurrentPage('results')} />
        )}

        {currentPage === 'results' && (
            <ResultsPage onRestart={() => setCurrentPage('start')} />
        )}
      </div>
  );
}

export default App;