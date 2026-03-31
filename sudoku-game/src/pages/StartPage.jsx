function StartPage({ onStart }) {
    return (
        <div className="page start-page">
            <h1>Судоку 9×9</h1>
            <p>Класична головоломка. Заповніть сітку так, щоб в кожному рядку, стовпці та підквадраті 3×3 цифри від 1 до 9 не повторювалися.</p>
            <button onClick={onStart} className="btn primary-btn">Почати гру</button>
        </div>
    );
}

export default StartPage;