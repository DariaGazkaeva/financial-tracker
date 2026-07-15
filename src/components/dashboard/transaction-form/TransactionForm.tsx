import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import clsx from 'clsx';

import AppInput from '@app-ui/app-input/AppInput.tsx';
import AppSelect from '@app-ui/app-select/AppSelect.tsx';
import AppButton from '@app-ui/app-button/AppButton.tsx';

import { formatDate } from '@app-utils/date-utils.js';

import { CategoryType, ITransactionBase } from '@app-types/index.ts';

import { useTransaction } from '@app-hooks/useTransaction.ts';
import { useTransactionStore } from '@app-store/useTransactionStore.ts';

import './transaction-form.css';

interface ITransactionFormType extends ITransactionBase {
    categoryId: number | '',
};

function TransactionForm() {
    const { register, handleSubmit, reset, formState: { errors, isSubmitting }, setValue } = useForm<ITransactionFormType>({
        defaultValues: {
            categoryId: '',
            date: formatDate(new Date()),
        }
    });

    const [transactionType, setTransactionType] = useState<CategoryType>('expense');

    const handleTypeChange = (type: CategoryType) => {
        setTransactionType(type);
        setValue('categoryId', '');
    };

    const categories = useTransactionStore(state => state.categories);
    const filteredCategories = categories.filter(category => category.type === transactionType);

    const editableTransaction = useTransactionStore(state => state.editableTransaction);
    const { onSave } = useTransaction();

    const onFormSubmit = (data: ITransactionFormType) => {
        onSave({
            description: data.description || '',
            amount: Number(data.amount),
            categoryId: Number(data.categoryId),
            date: data.date,
            ...(editableTransaction && { id: editableTransaction.id }),
        });

        reset();
    };

    useEffect(() => {
        if (editableTransaction) {
            setTransactionType(editableTransaction.category.type);

            reset({
                description: editableTransaction.description,
                amount: editableTransaction.amount,
                categoryId: editableTransaction.category.id,
                date: editableTransaction.date,
            });
        } else {
            setTransactionType('expense');
            reset();
        }
    }, [editableTransaction]);

    return (
        <form
            onSubmit={handleSubmit(onFormSubmit)}
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

                <AppInput
                    label="Описание"
                    name="description"
                    placeholder="Например: Кофе"
                    register={register}
                    error={errors.description?.message}
                />
            </div>

            <div className="transaction-form__actions">
                <AppButton
                    text={isSubmitting ? 'Сохранение...' : 'Сохранить'}
                    type="submit"
                    theme="primary"
                    disabled={isSubmitting}
                />
            </div>
        </form>
    );
}

export default TransactionForm;
