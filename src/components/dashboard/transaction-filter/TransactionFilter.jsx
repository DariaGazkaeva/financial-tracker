import AppButton from '@/common/ui/app-button/AppButton.jsx';

import './transaction-filter.css';

const TYPE_OPTIONS = [
    { value: 'all', label: 'Все' },
    { value: 'income', label: 'Доходы' },
    { value: 'expense', label: 'Расходы' },
];

function TransactionFilter({ typeValue, onChange }) {
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
