import { useState } from 'react';

import AuthPage from '@app-components/auth/AuthPage.tsx';
import DashboardPage from '@app-components/dashboard/DashboardPage.tsx';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(Boolean(localStorage.getItem('token')));

    const handleLogin = () => {
        setIsAuthenticated(true);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
    };

    return (
        <div className="app">
            {isAuthenticated ? (
                <DashboardPage onLogout={handleLogout} />
            ) : (
                <AuthPage onLogin={handleLogin} />
            )}
        </div>
    );
}

export default App;
