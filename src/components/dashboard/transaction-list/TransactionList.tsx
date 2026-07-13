import TransactionItem from '@app-components/dashboard/transaction-item/TransactionItem.tsx';

import { ITransactionResponse } from '@/api/transactions-api/types.ts';

import './transaction-list.css';

interface ITransactionListProps {
    transactions: ITransactionResponse[],
    onEdit: (transaction: ITransactionResponse) => void,
    onDelete: (id: number) => void,
}

function TransactionList({
    transactions = [],
    onEdit,
    onDelete,
}: ITransactionListProps) {
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
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            ))}
        </ul>
    );
}

export default TransactionList;
