import { TransactionType } from '@app-types/transaction.ts';

export interface ICategory {
    id: number,
    label: string,
    type: TransactionType,
};
