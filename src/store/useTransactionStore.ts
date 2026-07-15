import { create } from 'zustand';

import { ISummary, ITransactionFilter, ITransactionPayload, ITransactionResponse } from '@app-types/transaction.ts';
import { ICategory } from '@app-types/category.ts';

import { DEFAULT_FILTER, DEFAULT_SUMMARY } from '@app-consts/index.ts';

import { addTransaction, deleteTransaction, editTransaction, getSummary, getTransactions } from '@app-api/transactions-api/index.ts';
import { getCategories } from '@app-api/category-api/index.ts';

interface ITransactionStore {
    transactions: ITransactionResponse[],
    categories: ICategory[],
    summary: ISummary,
    filter: ITransactionFilter,
    isModalOpen: boolean,
    editableTransaction: ITransactionResponse | null,
    isLoading: boolean,

    loadData: (filter?: ITransactionFilter) => Promise<void>,
    addTransaction: (transaction: ITransactionPayload) => Promise<void>,
    editTransaction: (transaction: ITransactionPayload) => Promise<void>,
    deleteTransaction: (id: number) => Promise<void>,
    setFilter: (filter: ITransactionFilter) => Promise<void>,
    setIsModalOpen: (isModalOpen: boolean) => void,
    setEditableTransaction: (transaction: ITransactionResponse | null) => void,
}

export const useTransactionStore = create<ITransactionStore>((set, get) => ({
    transactions: [],
    categories: [],
    summary: DEFAULT_SUMMARY,
    filter: DEFAULT_FILTER,
    editableTransaction: null,
    isModalOpen: false,
    isLoading: false,

    loadData: async (filter = DEFAULT_FILTER) => {
        set({ isLoading: true });

        const [transactions, summary, categories] = await Promise.all([
            getTransactions(filter),
            getSummary(filter),
            getCategories(),
        ]);

        if (transactions.error || summary.error || categories.error) {
            alert('Ошибка получения данных');
            return;
        }

        set({
            transactions: transactions.data || [],
            summary: summary.data || DEFAULT_SUMMARY,
            categories: categories.data || [],
            isLoading: false,
        });
    },

    addTransaction: async (transaction) => {
        const { error } = await addTransaction(transaction);

        if (error) {
            alert('Ошибка добавления');
            return;
        }

        const { loadData, filter } = get();
        loadData(filter);
    },

    editTransaction: async (transaction) => {
        const { error } = await editTransaction(transaction);

        if (error) {
            alert('Ошибка редактирования');
            return;
        }

        const { loadData, filter } = get();
        loadData(filter);
    },

    deleteTransaction: async (id) => {
        const { error } = await deleteTransaction(id);
        
        if (error) {
            alert('Ошибка удаления');
            return;
        }

        const { loadData, filter } = get();
        loadData(filter);
    },

    setFilter: async (newFilter) => {
        const { filter, loadData } = get();
        
        const updated = {
            ...filter,
            ...newFilter,
        }

        set({ filter: updated });
        loadData(updated);
    },

    setIsModalOpen: (isModalOpen) => {
        set({ isModalOpen });
    },

    setEditableTransaction: (transaction) => {
        set({ editableTransaction: transaction });
    },
}));
