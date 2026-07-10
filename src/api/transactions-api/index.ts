import { IApiResponse } from '@app-api/types.ts';
import {
    ISummaryResponse,
    ITransactionFilter,
    ITransactionPayload,
    ITransactionResponse,
} from '@app-api/transactions-api/types.ts';
import { withErrorHandling } from '@app-api/utils.ts';

export const getTransactions = (filters: ITransactionFilter = {}): Promise<IApiResponse<ITransactionResponse[]>> =>
    withErrorHandling(async () => {
        const url = new URL('/api/transactions', window.location.origin);

        if (filters.fromDate) {
            url.searchParams.append('fromDate', filters.fromDate)
        }

        if (filters.toDate) {
            url.searchParams.append('toDate', filters.toDate)
        }

        const response = await fetch(url.toString());

        if (!response.ok) {
            throw new Error(`Ошибка: ${response.status}`);
        }

        return await response.json();
    });

export const addTransaction = (transaction: ITransactionPayload): Promise<IApiResponse<ITransactionResponse>> =>
    withErrorHandling(async () => {
        const response = await fetch('/api/transactions', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(transaction),
        });

        if (!response.ok) {
            throw new Error(`Ошибка: ${response.status}`);
        }

        return await response.json();
    });

export const deleteTransaction = (id: number): Promise<IApiResponse<number>> =>
    withErrorHandling(async () => {
        const response = await fetch(`/api/transactions/${id}`, { method: 'DELETE' });
        
        if (!response.ok) {
            throw new Error(`Ошибка: ${response.status}`);
        }

        return await response.json();
    });

export const getSummary = (filters: ITransactionFilter = {}): Promise<IApiResponse<ISummaryResponse>> =>
    withErrorHandling(async () => {
        const url = new URL('/api/summary', window.location.origin);

        if (filters.fromDate) {
            url.searchParams.append('fromDate', filters.fromDate)
        }

        if (filters.toDate) {
            url.searchParams.append('toDate', filters.toDate)
        }

        const response = await fetch(url.toString());

        if (!response.ok) {
            throw new Error(`Ошибка: ${response.status}`);
        }

        return await response.json();
    });
