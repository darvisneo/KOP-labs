import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { SettingsContext } from '../context/SettingsContext';
import styles from '../styles/App.module.css';

const schema = yup.object({
    playerName: yup.string().required('Ім\'я обов\'язкове').min(3, 'Мінімум 3 символи'),
    difficulty: yup.string().required(),
}).required();

function StartPage() {
    const { settings, setSettings } = useContext(SettingsContext);
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            playerName: settings.playerName,
            difficulty: settings.difficulty,
        }
    });

    const onSubmit = (data) => {
        setSettings(data);

        const uniqueId = `${data.playerName.toLowerCase().replace(/\s+/g, '-')}-${Math.floor(Math.random() * 10000)}`;

        navigate(`/game/${uniqueId}`);
    };

    return (
        <div className={styles.page}>
            <h1>Судоку 9×9</h1>
            <p>Введіть дані для початку гри:</p>

            <form onSubmit={handleSubmit(onSubmit)} className={styles.settingsForm}>
                <div className={styles.formGroup}>
                    <label>Ім'я гравця:</label>
                    <input {...register('playerName')} className={styles.formInput} placeholder="Введіть ім'я" />
                    <p className={styles.errorText}>{errors.playerName?.message}</p>
                </div>

                <div className={styles.formGroup}>
                    <label>Складність:</label>
                    <select {...register('difficulty')} className={styles.formInput}>
                        <option value="easy">Легко</option>
                        <option value="medium">Середньо</option>
                        <option value="hard">Складно</option>
                    </select>
                </div>

                <button type="submit" className={`${styles.btn} ${styles.primaryBtn}`}>Почати гру</button>
            </form>
        </div>
    );
}

export default StartPage;