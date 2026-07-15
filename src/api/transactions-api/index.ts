import { IApiResponse } from '@app-api/types.ts';
import {
    ISummary,
    ITransactionFilter,
    ITransactionPayload,
    ITransactionResponse,
} from '@app-types/index.ts';

import { getCategories } from '@app-api/category-api/index.ts';
import { withErrorHandling } from '@app-api/utils.ts';
import { DEFAULT_SUMMARY } from '@app-consts/index.ts';

// TODO убрать заглушки с localStorage после добавления бэка

const STORAGE_KEY = 'transactions';

const loadTransactions = (): ITransactionResponse[] => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
};

const saveTransactions = (transactions: ITransactionResponse[]): void => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
};

export const getTransactions = (filters: ITransactionFilter = {}): Promise<IApiResponse<ITransactionResponse[]>> =>
    withErrorHandling(async () => {
        const transactions = loadTransactions();

        return transactions.filter((t) => {
            const matchFrom = !filters.fromDate || t.date >= filters.fromDate;
            const matchTo = !filters.toDate || t.date <= filters.toDate;
            return matchFrom && matchTo;
        }).sort((a, b) => b.date.localeCompare(a.date));
    });

export const addTransaction = (transaction: ITransactionPayload): Promise<IApiResponse<ITransactionResponse>> =>
    withErrorHandling(async () => {
        const { categoryId, ...transactionDetails } = transaction;

        const categories = (await getCategories()).data;
        const category = categories?.find(c => c.id === Number(categoryId));

        if (!category) {
            throw new Error('Категория не найдена');
        }

        const newTransaction: ITransactionResponse = {
            id: Date.now(),
            category,
            ...transactionDetails,
        };

        const allTransactions = loadTransactions();
        saveTransactions([newTransaction, ...allTransactions]);

        return newTransaction;
    });

export const editTransaction = (transaction: ITransactionPayload): Promise<IApiResponse<ITransactionResponse>> =>
    withErrorHandling(async () => {
        const { id, categoryId, ...transactionDetails } = transaction;

        const allTransactions = loadTransactions();
        const oldTransaction = allTransactions.find(t => t.id === id);

        if (!oldTransaction) {
            throw new Error('Транзакция не найдена');
        }

        const categories = (await getCategories()).data;
        const category = categories?.find(c => c.id === Number(categoryId));

        if (!category) {
            throw new Error('Категория не найдена');
        }

        const updatedTransaction = {
            ...oldTransaction,
            category,
            ...transactionDetails,
        };

        const updatedAll = allTransactions.map(t => t.id === id ? updatedTransaction : t);
        saveTransactions(updatedAll);
        return updatedTransaction;
    });

export const deleteTransaction = (id: number): Promise<IApiResponse<number>> =>
    withErrorHandling(async () => {
        const transactions = loadTransactions();
        const updated = transactions.filter((t) => t.id !== id);
        saveTransactions(updated);
        return id;
    });

export const getSummary = (filters: ITransactionFilter = {}): Promise<IApiResponse<ISummary>> =>
    withErrorHandling(async () => {
        const transactions = (await getTransactions(filters)).data;

        if (!transactions) {
            return DEFAULT_SUMMARY;
        }

        const income = transactions
            .filter((t) => t.category.type === 'income')
            .reduce((sum, t) => sum + t.amount, 0);

        const expense = transactions
            .filter((t) => t.category.type === 'expense')
            .reduce((sum, t) => sum + t.amount, 0);

        return {
            income,
            expense,
            total: income - expense,
        };
    });
