import { create } from 'zustand';

import {
    ICategory,
    ISummary,
    ITransactionFilter,
    ITransactionResponse,
} from '@app-types/index.ts';

import { DEFAULT_FILTER, DEFAULT_SUMMARY } from '@app-consts/index.ts';

interface ITransactionStore {
    transactions: ITransactionResponse[],
    categories: ICategory[],
    summary: ISummary,
    filter: ITransactionFilter,

    setTransactions: (transactions: ITransactionResponse[]) => void,
    setCategories: (categories: ICategory[]) => void,
    setSummary: (summary: ISummary) => void,
    setFilter: (filter: ITransactionFilter) => void,
}

export const useTransactionStore = create<ITransactionStore>((set) => ({
    transactions: [],
    categories: [],
    summary: DEFAULT_SUMMARY,
    filter: DEFAULT_FILTER,

    setTransactions: (transactions) => set({ transactions }),
    setCategories: (categories) => set({ categories }),
    setSummary: (summary) => set({ summary }),
    setFilter: (filter) => set({ filter }),
}));
