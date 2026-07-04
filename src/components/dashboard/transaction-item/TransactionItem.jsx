import clsx from 'clsx';

import './transaction-item.css';

function TransactionItem({
    transaction,
    onDelete,
}) {
    const {
        id,
        description,
        amount,
        category,
        date,
        type,
    } = transaction;

    const isIncome = type === 'income';
    const formattedAmount = (isIncome ? '+' : '-') + amount;

    const amountClasses = clsx(
        'transaction-item__amount',
        isIncome ? 'transaction-item__amount--income' : 'transaction-item__amount--expense',
    );

    return (
        <li className="transaction-item">
            <div className="transaction-item__info transaction-item__info--col">
                <span className="transaction-item__category">{ category }</span>
                <span className="transaction-item__description">{ description }</span>
            </div>

            <div className="transaction-item__info transaction-item__info--row">
                <span className={ amountClasses }>{ formattedAmount }</span>
                <span className="transaction-item__date">{ date }</span>
                <button
                    className="transaction-item__delete-btn"
                    onClick={() => onDelete(id)}
                    aria-label="Удалить транзакцию"
                >
                    ✕
                </button>
            </div>
        </li>
    );
}
export default TransactionItem;
