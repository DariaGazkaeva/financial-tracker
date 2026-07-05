import { useState, useEffect } from 'react';

import AuthPage from './components/auth/AuthPage.jsx';
import DashboardPage from './components/dashboard/DashboardPage.jsx';

import {
    getTransactions,
    addTransaction,
    deleteTransaction,
    getSummary,
} from './api/transactions-api.js';
import { getCategories } from './api/categories-api.js';

import { getFirstDayOfMonth, getLastDayOfMonth, formatDate } from './utils/date-utils.js';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(Boolean(localStorage.getItem('token')));
    const [transactions, setTransactions] = useState([]);
    const [summary, setSummary] = useState({ total: 0, income: 0, expense: 0 });
    const [categories, setCategories] = useState([]);
    const [fromDate, setFromDate] = useState(formatDate(getFirstDayOfMonth()));
    const [toDate, setToDate] = useState(formatDate(getLastDayOfMonth()));

    const loadData = async (filters = {}) => {
        const transactionsData = await getTransactions(filters);
        const summaryData = await getSummary(filters);
        const categoriesData = await getCategories();

        if (transactionsData.error || summaryData.error || categoriesData.error) {
            alert('Ошибка получения данных');
            return;
        }

        setTransactions(transactionsData.data);
        setSummary(summaryData.data);
        setCategories(categoriesData.data);
    };

    useEffect(() => {
        loadData();
    }, []);

    useEffect(() => {
        loadData({ fromDate, toDate });
    }, [fromDate, toDate]);

    const onAddTransaction = async (newTransaction) => {
        const { data, error } = await addTransaction(newTransaction);

        if (error) {
            alert('Ошибка добавления');
            return;
        }

        await loadData({ fromDate, toDate });
    };

    const onDeleteTransaction = async (id) => {
        const { error } = await deleteTransaction(id);

        if (error) {
            alert('Ошибка удаления');
            return;
        }

        await loadData({ fromDate, toDate });
    };

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
                <DashboardPage
                    onLogout={ handleLogout }
                    transactions={ transactions }
                    total={ summary.total }
                    totalIncome={ summary.income }
                    totalExpense={ summary.expense }
                    categories={ categories }
                    onAddTransaction={ onAddTransaction }
                    onDeleteTransaction={ onDeleteTransaction }
                    onFromDateChange={ setFromDate }
                    onToDateChange={ setToDate }
                    fromDate={ fromDate }
                    toDate={ toDate }
                />
            ) : (
                <AuthPage onLogin={handleLogin} />
            )}
        </div>
    );
}

export default App
