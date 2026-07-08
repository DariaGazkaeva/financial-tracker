import AppButton from '@app-ui/app-button/AppButton.tsx';

import './transaction-filter.css';

const TYPE_OPTIONS = [
    { value: 'all', label: 'Все' },
    { value: 'income', label: 'Доходы' },
    { value: 'expense', label: 'Расходы' },
] as const;

type TypeValue = typeof TYPE_OPTIONS[number]['value'];

interface TransactionFilterProps {
    typeValue: TypeValue,
    onChange: (value: TypeValue) => {},
}

function TransactionFilter({ typeValue, onChange }: TransactionFilterProps) {
    return (
        <div className="transaction-filter">
            {TYPE_OPTIONS.map(option => (
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
