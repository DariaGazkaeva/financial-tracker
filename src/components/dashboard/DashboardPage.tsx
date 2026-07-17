import { useState, useEffect } from 'react';

import { MdAdd } from 'react-icons/md';
import BalanceSummary from '@app-components/dashboard/balance-summary/BalanceSummary.tsx';
import TransactionForm from '@app-components/dashboard/transaction-form/TransactionForm.tsx';
import TransactionList from '@app-components/dashboard/transaction-list/TransactionList.tsx';
import TransactionFilter from '@app-components/dashboard/transaction-filter/TransactionFilter.tsx';
import AppButton from '@app-ui/app-button/AppButton.tsx';
import AppInput from '@app-ui/app-input/AppInput.tsx';
import AppModal from '@app-ui/app-modal/AppModal.tsx';

import type { FilterTypeValue } from '@app-types/index.ts';

import { useTransactionService } from '@app-hooks/useTransactionService.ts';
import { useModal } from '@app-hooks/useModal.ts';

import './dashboard-page.css';

interface IDashboardPageProps {
    onLogout: () => void,
}

function DashboardPage({ onLogout }: IDashboardPageProps) {
    const { isModalOpen, openModal, closeModal } = useModal();

    const {
        transactions,
        filter,
        loadData,
        onFromDateChange,
        onToDateChange,
    } = useTransactionService();

    useEffect(() => {
        loadData();
    }, []);

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
                            value={filter.fromDate}
                            onChange={(e) => onFromDateChange(e.target.value)}
                            theme='horizontal'
                        />
                        <AppInput
                            label="По"
                            name="toDate"
                            type="date"
                            value={filter.toDate}
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
                <div className='dashboard-page__column dashboard-page__column--left'>
                    <h2 className="dashboard-page__subtitle">Обзор</h2>
                    <BalanceSummary/>
                    <AppButton
                        className="dashboard-page__add-button"
                        theme='primary'
                        title="Добавить транзакцию"
                        onClick={() => openModal()}
                    >
                        <MdAdd size={24} />
                    </AppButton>
                </div>

                <div className='dashboard-page__column dashboard-page__column--right'>
                    <h2 className="dashboard-page__subtitle">История транзакций</h2>
                    <TransactionFilter
                        typeValue={filterType}
                        onChange={setFilterType}
                    />
                    <TransactionList
                        transactions={filteredTransactions}
                    />
                </div>
            </div>

            <AppModal
                isOpen={isModalOpen}
                onClose={() => closeModal()}
            >
                <TransactionForm />
            </AppModal>
        </div>
    );
}
export default DashboardPage;
