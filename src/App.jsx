import { useState } from 'react';

import AuthPage from './components/auth/AuthPage';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(Boolean(localStorage.getItem('token')));

    const handleLogin = () => {
        setIsAuthenticated(true);
    };

    return (
        <div className="app">
            {isAuthenticated ? (
                <div>Главная страница (будет позже)</div>
            ) : (
                <AuthPage onLogin={handleLogin} />
            )}
        </div>
    );
}

export default App