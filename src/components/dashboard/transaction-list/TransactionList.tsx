import TransactionItem from '@app-components/dashboard/transaction-item/TransactionItem.tsx';

import { ITransactionResponse } from '@app-types/index.ts';

import './transaction-list.css';

interface ITransactionListProps {
    transactions: ITransactionResponse[],
}

function TransactionList({ transactions = [] }: ITransactionListProps) {
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
                />
            ))}
        </ul>
    );
}

export default TransactionList;
