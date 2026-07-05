import TransactionItem from '../transaction-item/TransactionItem.jsx';

import './transaction-list.css';

function TransactionList({
    transactions = [],
    onDelete,
}) {
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
