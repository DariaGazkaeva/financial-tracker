import { useTransactionStore } from '@app-store/useTransactionStore.ts';
import { useNotification } from '@app-hooks/useNotification.ts';
import { useModal } from '@app-hooks/useModal.ts';

import { getCategories } from '@app-api/category-api/index.ts';
import {
    addTransaction as apiAdd,
    deleteTransaction as apiDelete,
    editTransaction as apiEdit,
    getSummary,
    getTransactions,
} from '@app-api/transactions-api/index.ts';

import {
    ITransactionPayload,
    ITransactionFilter,
} from '@app-types/index.ts';

import { DEFAULT_FILTER, DEFAULT_SUMMARY, NOTIFICATION_TYPE } from '@app-consts/index.ts';

export const useTransactionService = () => {
    const store = useTransactionStore();
    const { showNotification } = useNotification();
    const { transactionFormState, openModal, closeModal } = useModal();

    const loadData = async (filter: ITransactionFilter = DEFAULT_FILTER) => {
        const [transactions, summary, categories] = await Promise.all([
            getTransactions(filter),
            getSummary(filter),
            getCategories(),
        ]);

        if (transactions.error || summary.error || categories.error) {
            showNotification('Ошибка получения данных', NOTIFICATION_TYPE.ERROR);
            return;
        }

        store.setTransactions(transactions.data || []);
        store.setSummary(summary.data || DEFAULT_SUMMARY);
        store.setCategories(categories.data || []);
    };

    const addTransaction = async (transaction: ITransactionPayload) => {
        const { error } = await apiAdd(transaction);

        if (error) {
            showNotification('Ошибка добавления', NOTIFICATION_TYPE.ERROR);
            return;
        }

        await loadData(store.filter);
    };

    const editTransaction = async (transaction: ITransactionPayload) => {
        const { error } = await apiEdit(transaction);

        if (error) {
            showNotification('Ошибка редактирования', NOTIFICATION_TYPE.ERROR);
            return;
        }

        await loadData(store.filter);
    };

    const deleteTransaction = async (id: number) => {
        const { error } = await apiDelete(id);

        if (error) {
            showNotification('Ошибка удаления', NOTIFICATION_TYPE.ERROR);
            return;
        }

        await loadData(store.filter);
    };

    const setFilter = (newFilter: Partial<ITransactionFilter>) => {
        const updated = {
            ...store.filter,
            ...newFilter,
        };

        store.setFilter(updated);
        loadData(updated);
    };

    const onFromDateChange = (fromDate: string) => setFilter({ fromDate });
    const onToDateChange = (toDate: string) => setFilter({ toDate });

    const saveTransaction = async (payload: ITransactionPayload) => {
        if (payload.id) {
            await editTransaction(payload);
            closeModal();
        } else {
            await addTransaction(payload);
        }
    };

    return {
        transactions: store.transactions,
        categories: store.categories,
        summary: store.summary,
        filter: store.filter,
        transactionFormState,

        loadData,
        onSave: saveTransaction,
        onDelete: deleteTransaction,
        onEdit: openModal,
        onFromDateChange,
        onToDateChange,
    };
};
