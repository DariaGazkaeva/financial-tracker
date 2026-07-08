import { useState } from 'react';

import BalanceSummary from '@app-components/dashboard/balance-summary/BalanceSummary.tsx';
import TransactionForm from '@app-components/dashboard/transaction-form/TransactionForm.tsx';
import TransactionList from '@app-components/dashboard/transaction-list/TransactionList.tsx';
import TransactionFilter from '@app-components/dashboard/transaction-filter/TransactionFilter.tsx';
import AppButton from '@app-ui/app-button/AppButton.tsx';
import AppInput from '@app-ui/app-input/AppInput.tsx';

import { ITransactionPayload, ITransactionResponse } from '@app-api/transactions-api/types.ts';
import { ICategory } from '@app-api/category-api/types.ts';
import { FilterTypeValue } from '@app-components/dashboard/types.ts';

import './dashboard-page.css';

interface DashboardPageProps {
    onLogout: () => void,
    transactions: ITransactionResponse[],
    total: number,
    totalExpense: number,
    totalIncome: number,
    categories: ICategory[],
    onAddTransaction: (value: ITransactionPayload) => void,
    onDeleteTransaction: (id: number) => void,
    fromDate: string,
    toDate: string,
    onFromDateChange: (value: string) => void,
    onToDateChange: (value: string) => void,
}

function DashboardPage({
    onLogout,
    transactions = [],
    total,
    totalExpense,
    totalIncome,
    categories = [],
    onAddTransaction,
    onDeleteTransaction,
    fromDate,
    toDate,
    onFromDateChange,
    onToDateChange,
}: DashboardPageProps) {
    const [filterType, setFilterType] = useState<FilterTypeValue>('all');

    const filteredTransactions = filterType === 'all'
        ? transactions
        : transactions.filter(transaction => transaction.category.type === filterType);

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
                            value={fromDate}
                            onChange={(e) => onFromDateChange(e.target.value)}
                            theme='horizontal'
                        />
                        <AppInput
                            label="По"
                            name="toDate"
                            type="date"
                            value={toDate}
                            onChange={(e) => onToDateChange(e.target.value)}
                            theme='horizontal'
                        />
                    </div>
                    <AppButton
                        text="Выйти"
                        theme="secondary"
                        onClick={onLogout}
                    />
                </div>
            </header>

            <div className="dashboard-page__main">
                <div className='dashboard-page__column'>
                    <h2 className="dashboard-page__subtitle">Обзор</h2>
                    <BalanceSummary
                        total={total}
                        expense={totalExpense}
                        income={totalIncome}
                    />
                </div>
                
                <div className='dashboard-page__column'>
                    <h2 className="dashboard-page__subtitle">Добавить</h2>
                    <TransactionForm
                        categories={categories}
                        onAddTransaction={onAddTransaction}
                    />
                </div>

                <div className='dashboard-page__column'>
                    <h2 className="dashboard-page__subtitle">История транзакций</h2>
                    <TransactionFilter
                        typeValue={filterType}
                        onChange={setFilterType}
                    />
                    <TransactionList
                        transactions={filteredTransactions}
                        onDelete={onDeleteTransaction}
                    />
                </div>
            </div>
        </div>
    );
}
export default DashboardPage;
