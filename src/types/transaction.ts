import { TRANSACTION_TYPES } from '@app-consts/index.ts';

export type TransactionType = typeof TRANSACTION_TYPES[keyof typeof TRANSACTION_TYPES];
