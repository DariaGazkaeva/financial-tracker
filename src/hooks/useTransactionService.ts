import { useTransactionStore } from '@app-store/useTransactionStore.ts';

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
    ITransactionResponse,
    ITransactionFilter,
} from '@app-types/index.ts';

import { DEFAULT_FILTER, DEFAULT_SUMMARY } from '@app-consts/index.ts';

export const useTransactionService = () => {
    const store = useTransactionStore();

    const loadData = async (filter: ITransactionFilter = DEFAULT_FILTER) => {
        const [transactions, summary, categories] = await Promise.all([
            getTransactions(filter),
            getSummary(filter),
            getCategories(),
        ]);

        if (transactions.error || summary.error || categories.error) {
            alert('Ошибка получения данных');
            return;
        }

        store.setTransactions(transactions.data || []);
        store.setSummary(summary.data || DEFAULT_SUMMARY);
        store.setCategories(categories.data || []);
    };

    const addTransaction = async (transaction: ITransactionPayload) => {
        const { error } = await apiAdd(transaction);

        if (error) {
            alert('Ошибка добавления');
            return;
        }

        await loadData(store.filter);
    };

    const editTransaction = async (transaction: ITransactionPayload) => {
        const { error } = await apiEdit(transaction);

        if (error) {
            alert('Ошибка редактирования');
            return;
        }

        await loadData(store.filter);
    };

    const deleteTransaction = async (id: number) => {
        const { error } = await apiDelete(id);

        if (error) {
            alert('Ошибка удаления');
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

    const openModal = (transaction?: ITransactionResponse) => {
        store.setEditableTransaction(transaction || null);
        store.setIsModalOpen(true);
    };

    const closeModal = () => {
        store.setIsModalOpen(false);
        store.setEditableTransaction(null);
    };

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
        isModalOpen: store.isModalOpen,
        editableTransaction: store.editableTransaction,

        loadData,
        onSave: saveTransaction,
        onDelete: deleteTransaction,
        onEdit: openModal,
        onFromDateChange,
        onToDateChange,
        openModal,
        closeModal,
    };
};
