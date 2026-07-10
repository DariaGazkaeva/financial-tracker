type CategoryType = 'income' | 'expense';

export interface ICategory {
    id: number,
    label: string,
    type: CategoryType,
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

export interface IFilter {
    fromDate?: string,
    toDate?: string,
}
