import { useState, useEffect } from 'react';

import BalanceSummary from './balance-summary/BalanceSummary.jsx';
import TransactionForm from './transaction-form/TransactionForm.jsx';
import TransactionList from './transaction-list/TransactionList.jsx';
import TransactionFilter from './transaction-filter/TransactionFilter.jsx';
import AppButton from '../../common/ui/app-button/AppButton.jsx';
import AppInput from '../../common/ui/app-input/AppInput.jsx';

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
    fromDate,
    toDate,
    onFromDateChange,
    onToDateChange,
}) {
    const [filterType, setFilterType] = useState('all');

    const filteredTransactions = filterType === 'all'
        ? transactions
        : transactions.filter(t => t.type === filterType);

    return (
        <div className="dashboard-page">
            <header className="dashboard-page__header">
                <h1 className="dashboard-page__title">Финансовый трекер</h1>
                <div className="dashboard-page__header-right">
                    <div className="dashboard-page__date-range">
                        <AppInput
                            label="С"
                            name="fromDate"
                            type="date"
                            value={ fromDate }
                            onChange={(e) => onFromDateChange(e.target.value)}
                            theme='horizontal'
                        />
                        <AppInput
                            label="По"
                            name="toDate"
                            type="date"
                            value={ toDate }
                            onChange={(e) => onToDateChange(e.target.value)}
                            theme='horizontal'
                        />
                    </div>
                    <AppButton
                        text="Выйти"
                        theme="secondary"
                        onClick={ onLogout }
                    />
                </div>
            </header>

            <div className="dashboard-page__main">
                <div className='dashboard-page__column'>
                    <h2 className="dashboard-page__subtitle">Обзор</h2>
                    <BalanceSummary
                        total={ total }
                        expense={ totalExpense }
                        income={ totalIncome }
                    />
                </div>
                
                <div className='dashboard-page__column'>
                    <h2 className="dashboard-page__subtitle">Добавить</h2>
                    <TransactionForm
                        categories={ categories }
                        onAddTransaction={ onAddTransaction }
                    />
                </div>

                <div className='dashboard-page__column'>
                    <h2 className="dashboard-page__subtitle">История транзакций</h2>
                    <TransactionFilter
                        typeValue={ filterType }
                        onChange={ setFilterType }
                    />
                    <TransactionList
                        transactions={ filteredTransactions }
                        onDelete={ onDeleteTransaction }
                    />
                </div>
            </div>
        </div>
    );
}
export default DashboardPage;
