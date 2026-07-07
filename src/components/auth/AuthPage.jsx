import { useState } from 'react';
import { useForm } from 'react-hook-form';

import AppButton from '@/common/ui/app-button/AppButton.jsx';
import AppInput from '@/common/ui/app-input/AppInput.jsx';

import './auth-page.css';

function AuthPage({ onLogin }) {
    const [isLogin, setIsLogin] = useState(true);
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();

    // TODO запрос на бэк
    const onSubmit = async () => {
        await new Promise(resolve => setTimeout(resolve, 1000));
        localStorage.setItem('token', 'fake-token');
        onLogin();
    };

    const toggleMode = () => setIsLogin(!isLogin);

    return (
        <div className="auth-page">
            <div className="auth-page__auth-container">
                <h1 className="auth-page__title">
                    { isLogin ? 'Вход' : 'Регистрация' }
                </h1>
                <form onSubmit={handleSubmit(onSubmit)} className="auth-page__form">
                    <AppInput
                        label="Логин"
                        name="login"
                        type="text"
                        placeholder="Ваш логин"
                        register={register}
                        error={errors.login?.message}
                        rules={{
                            required: 'Логин обязателен',
                        }}
                    />
                    <AppInput
                        label="Пароль"
                        name="password"
                        type="password"
                        placeholder="••••••"
                        register={register}
                        error={errors.password?.message}
                        rules={{
                            required: 'Пароль обязателен',
                            minLength: {
                                value: 6,
                                message: 'Пароль должен быть не менее 6 символов',
                            },
                        }}
                    />
                    <AppButton
                        text={isSubmitting ? 'Загрузка...' : (isLogin ? 'Войти' : 'Зарегистрироваться')}
                        type="submit"
                        theme="primary"
                        disabled={isSubmitting}
                        className="auth-page__button"
                    />
                    <p className="auth-page__toggle-text">
                        { isLogin ? 'Нет аккаунта?' : 'Уже есть аккаунт?' }
                        <button type="button" onClick={toggleMode} className="auth-page__toggle-link">
                            { isLogin ? 'Зарегистрироваться' : 'Войти' }
                        </button>
                    </p>
                </form>
            </div>
        </div>
    );
}
export default AuthPage;
