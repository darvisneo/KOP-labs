import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { SettingsContext } from '../context/SettingsContext';

// валідації через yup
const schema = yup.object({
    playerName: yup.string().required('Ім\'я обов\'язкове').min(3, 'Мінімум 3 символи'),
    difficulty: yup.string().required(),
}).required();

function StartPage({ onStart }) {
    const { settings, setSettings } = useContext(SettingsContext);

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            playerName: settings.playerName,
            difficulty: settings.difficulty,
        }
    });

    const onSubmit = (data) => {
        setSettings(data);
        onStart();
    };

    return (
        <div className="page start-page">
            <h1>Судоку 9×9</h1>
            <p>Введіть дані для початку гри:</p>

            <form onSubmit={handleSubmit(onSubmit)} className="settings-form">
                <div className="form-group">
                    <label>Ім'я гравця:</label>
                    <input {...register('playerName')} className="form-input" placeholder="Введіть ім'я" />
                    <p className="error-text">{errors.playerName?.message}</p>
                </div>

                <div className="form-group">
                    <label>Складність:</label>
                    <select {...register('difficulty')} className="form-input">
                        <option value="easy">Легко</option>
                        <option value="medium">Середньо</option>
                        <option value="hard">Складно</option>
                    </select>
                </div>

                <button type="submit" className="btn primary-btn">Почати гру</button>
            </form>
        </div>
    );
}

export default StartPage;