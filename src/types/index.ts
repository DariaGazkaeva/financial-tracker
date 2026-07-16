import { CATEGORY_TYPES, FILTER_TYPE_OPTIONS, NOTIFICATION_TYPE } from '@app-consts/index.ts';

export type CategoryType = typeof CATEGORY_TYPES[keyof typeof CATEGORY_TYPES];

export interface ICategory {
    id: number,
    label: string,
    type: CategoryType,
};

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

export type FilterTypeValue = typeof FILTER_TYPE_OPTIONS[number]['value'];

export type NotificationType = typeof NOTIFICATION_TYPE[keyof typeof NOTIFICATION_TYPE];
