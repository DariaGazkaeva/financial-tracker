import AppButton from '@app-ui/app-button/AppButton.tsx';

import { FILTER_TYPE_OPTIONS } from '@app-consts/index.ts';
import type { FilterTypeValue } from '@app-types/transaction.ts';

import './transaction-filter.css';

interface ITransactionFilterProps {
    typeValue: FilterTypeValue,
    onChange: (value: FilterTypeValue) => void,
}

function TransactionFilter({ typeValue, onChange }: ITransactionFilterProps) {
    return (
        <div className="transaction-filter">
            {FILTER_TYPE_OPTIONS.map(option => (
                <AppButton
                    key={option.value}
                    text={option.label}
                    onClick={() => onChange(option.value)}
                    theme={typeValue === option.value ? 'primary' : 'secondary'}
                />
            ))}
        </div>
    );
}

export default TransactionFilter;
