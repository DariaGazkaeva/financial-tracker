import { ICategory } from '@app-types/category.ts';

export interface ITransactionFilter {
    fromDate?: string,
    toDate?: string,
}

export interface ITransactionBase {
    description?: string,
    amount: number,
    date: string,
}

export interface ITransactionPayload extends ITransactionBase {
    id?: number,
    categoryId: number,
}

export interface ITransactionResponse extends ITransactionBase {
    id: number,
    category: ICategory,
}

export interface ISummary {
    income: number,
    expense: number,
    total: number,
}
