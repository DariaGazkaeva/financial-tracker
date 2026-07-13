import { TRANSACTION_TYPES } from '@app-consts/transaction.ts';

export type TransactionType = typeof TRANSACTION_TYPES[keyof typeof TRANSACTION_TYPES];
