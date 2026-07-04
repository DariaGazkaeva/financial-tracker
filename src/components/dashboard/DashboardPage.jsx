import { useState, useEffect } from 'react';

import BalanceSummary from './balance-summary/BalanceSummary.jsx';
import TransactionForm from './transaction-form/TransactionForm.jsx';
import TransactionList from './transaction-list/TransactionList.jsx';
import AppButton from '../../common/ui/app-button/AppButton.jsx';

import './dashboard-page.css';

function DashboardPage({
    onLogout,
    transactions = [],
    total,
    totalExpense,
    totalIncome,
    categories,
    onAddTransaction,
    onDeleteTransaction,
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
                        onAddTransaction={ onAddTransaction }
                    />
                </div>

                <div>
                    <h2 className="dashboard-page__subtitle">История транзакций</h2>
                    <TransactionList
                        transactions={ transactions }
                        onDelete={ onDeleteTransaction }
                    />
                </div>
            </div>
        </div>
    );
}
export default DashboardPage;
