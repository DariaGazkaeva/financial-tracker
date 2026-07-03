import { useState, useEffect } from 'react';

import BalanceSummary from './BalanceSummary.jsx';
import TransactionForm from './TransactionForm.jsx';
import TransactionList from './TransactionList.jsx';
import AppButton from '../../common/ui/app-button/AppButton.jsx';

import './dashboard-page.css';

function DashboardPage({
    onLogout,
    transactions = [],
    total,
    totalExpense,
    totalIncome,
    categories,
}) {
    return (
        <div className="dashboard-page">
            <header className="dashboard-page__header">
                <h1 className="dashboard-page__title">Финансовый трекер</h1>
                <AppButton
                    text="Выйти"
                    theme="secondary"
                    onClick={ onLogout }
                />
            </header>

            <div className="dashboard-page__main">
                <div>
                    <h2 className="dashboard-page__subtitle">Обзор</h2>
                    <BalanceSummary
                        total={ total }
                        expense={ totalExpense }
                        income={ totalIncome }
                    />
                </div>
                
                <div>
                    <h2 className="dashboard-page__subtitle">Добавить</h2>
                    <TransactionForm
                        categories={ categories }
                    />
                </div>

                <div>
                    <h2 className="dashboard-page__subtitle">История транзакций</h2>
                    <TransactionList
                        transactions={ transactions }
                    />
                </div>
            </div>
        </div>
    );
}
export default DashboardPage;