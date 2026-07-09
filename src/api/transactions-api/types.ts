import { ICategory } from '@app-api/category-api/types.ts';

export interface ITransactionFilter {
    fromDate?: string,
    toDate?: string,
}

export interface ITransactionBase {
    description?: string,
    amount: number,
    date: string,
}

export interface ITransactionResponse extends ITransactionBase {
    id: number,
    category: ICategory,
}

export interface ITransactionPayload extends ITransactionBase {
    categoryId: number,
}

export interface ISummaryResponse {
    income: number,
    expense: number,
    total: number,
}
