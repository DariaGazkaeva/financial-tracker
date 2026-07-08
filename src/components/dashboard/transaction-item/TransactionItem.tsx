import clsx from 'clsx';

import { ITransactionResponse } from '@app-api/transactions-api/types.ts';

import './transaction-item.css';

interface TransactionItemProps {
    transaction: ITransactionResponse,
    onDelete: (id: number) => {},
}

function TransactionItem({
    transaction,
    onDelete,
}: TransactionItemProps) {
    const {
        id,
        description,
        amount,
        category,
        date,
    } = transaction;

    const isIncome = category.type === 'income';
    const formattedAmount = (isIncome ? '+' : '-') + amount;

    const amountClasses = clsx(
        'transaction-item__amount',
        isIncome ? 'transaction-item__amount--income' : 'transaction-item__amount--expense',
    );

    return (
        <li className="transaction-item">
            <div className="transaction-item__info transaction-item__info--col">
                <span className="transaction-item__category">{ category.label }</span>
                <span className="transaction-item__description">{ description }</span>
            </div>

            <div className="transaction-item__info transaction-item__info--row">
                <span className={amountClasses}>{ formattedAmount }</span>
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
