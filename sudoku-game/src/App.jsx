import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import StartPage from './pages/StartPage';
import GamePage from './pages/GamePage';
import styles from './styles/App.module.css'; // Імпортуємо стилі як об'єкт

function App() {
    return (
        <BrowserRouter>
            <div className={styles.appContainer}>
                <Routes>
                    <Route path="/" element={<StartPage />} />

                    <Route path="/game/:userId" element={<GamePage />} />

                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;