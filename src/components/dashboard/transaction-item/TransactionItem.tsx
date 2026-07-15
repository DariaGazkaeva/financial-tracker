import clsx from 'clsx';
import { MdEdit, MdClose } from 'react-icons/md';
import { ITransactionResponse } from '@app-types/index.ts';
import { useTransaction } from '@app-hooks/useTransaction.ts';
import './transaction-item.css';

interface ITransactionItemProps {
    transaction: ITransactionResponse,
}

function TransactionItem({ transaction }: ITransactionItemProps) {
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

    const { onEdit, onDelete } = useTransaction();

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
                    className="transaction-item__button transaction-item__button--edit"
                    onClick={() => onEdit(transaction)}
                >
                    <MdEdit size={16} />
                </button>

                <button
                    className="transaction-item__button transaction-item__button--delete"
                    onClick={() => onDelete(id)}
                >
                    <MdClose size={16} />
                </button>
            </div>
        </li>
    );
}
export default TransactionItem;
