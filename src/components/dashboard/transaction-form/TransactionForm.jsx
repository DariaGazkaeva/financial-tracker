import { useState } from 'react';
import { useForm } from 'react-hook-form';
import clsx from 'clsx';

import AppInput from '@app-ui/app-input/AppInput.jsx';
import AppSelect from '@app-ui/app-select/AppSelect.jsx';
import AppButton from '@app-ui/app-button/AppButton.jsx';

import { formatDate } from '@app-utils/date-utils.js';

import './transaction-form.css';

function TransactionForm({
    categories = [],
    onAddTransaction,
}) {
    const [transactionType, setTransactionType] = useState('expense');

    const { register, handleSubmit, reset, formState: { errors, isSubmitting }, setValue } = useForm({
        defaultValues: {
            categoryId: '',
            date: formatDate(new Date()),
        }
    });

    const filteredCategories = categories.filter(category => category.type === transactionType);

    const handleTypeChange = (type) => {
        setTransactionType(type);
        setValue('categoryId', '');
    };

    const onSubmit = (data) => {
        const newTransaction = {
            description: data.description || '',
            amount: parseFloat(data.amount),
            categoryId: data.categoryId,
            date: data.date || new Date().toISOString().split('T')[0],
        };

        onAddTransaction(newTransaction);
        reset();
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="transaction-form"
        >
            <div className="transaction-form__fields">
                <div className="transaction-form__type-toggle">
                    <button
                        type="button"
                        className={clsx(
                            'transaction-form__type-btn',
                            'transaction-form__type-btn--income',
                            transactionType === 'income' && 'transaction-form__type-btn--active'
                        )}
                        onClick={() => handleTypeChange('income')}
                    >
                        Доход
                    </button>
                    <button
                        type="button"
                        className={clsx(
                            'transaction-form__type-btn',
                            'transaction-form__type-btn--expense',
                            transactionType === 'expense' && 'transaction-form__type-btn--active'
                        )}
                        onClick={() => handleTypeChange('expense')}
                    >
                        Расход
                    </button>
                </div>

                <AppInput
                    label="Описание"
                    name="description"
                    placeholder="Например: Кофе"
                    register={register}
                    error={errors.description?.message}
                />

                <AppInput
                    label="Сумма"
                    name="amount"
                    placeholder="100"
                    type="number"
                    register={register}
                    error={errors.amount?.message}
                    rules={{
                        required: 'Заполните поле',
                        min: { value: 0.01, message: 'Минимум 0.01' },
                    }}
                />

                <AppSelect
                    label="Категория"
                    name="categoryId"
                    options={filteredCategories}
                    register={register}
                    error={errors.categoryId?.message}
                    rules={{
                        required: 'Заполните поле',
                    }}
                />

                <AppInput
                    label="Дата"
                    name="date"
                    type="date"
                    register={register}
                    error={errors.date?.message}
                    rules={{
                        required: 'Заполните поле',
                    }}
                />
            </div>

            <div className="transaction-form__actions">
                <AppButton
                    text={isSubmitting ? 'Добавление...' : 'Добавить'}
                    type="submit"
                    theme="primary"
                    disabled={isSubmitting}
                />
            </div>
        </form>
    );
}

export default TransactionForm;
