import TransactionItem from '@app-components/dashboard/transaction-item/TransactionItem.tsx';

import { ITransactionResponse } from '@/api/transactions-api/types.ts';

import './transaction-list.css';

interface TransactionListProps {
    transactions: ITransactionResponse[],
    onDelete: (id: number) => {},
}

function TransactionList({
    transactions = [],
    onDelete,
}: TransactionListProps) {
    if (transactions.length === 0) {
        return (
            <div className="transaction-list">
                <div className="transaction-list__empty">Нет транзакций</div>
            </div>
        );
    }

    return (
        <ul className="transaction-list">
            {transactions.map(transaction => (
                <TransactionItem
                    key={transaction.id}
                    transaction={transaction}
                    onDelete={onDelete}
                />
            ))}
        </ul>
    );
}

export default TransactionList;
