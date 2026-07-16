import { useState } from 'react';

import AuthPage from '@app-components/auth/AuthPage.tsx';
import DashboardPage from '@app-components/dashboard/DashboardPage.tsx';
import NotificationContainer from '@app-components/notification/NotificationContainer.tsx';

import { UIProvider } from '@app-context/UIContext.tsx';

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
        <UIProvider>
            <div className="app">
                {isAuthenticated ? (
                    <DashboardPage onLogout={handleLogout} />
                ) : (
                    <AuthPage onLogin={handleLogin} />
                )}
                <NotificationContainer />
            </div>
        </UIProvider>
    );
}

export default App;
