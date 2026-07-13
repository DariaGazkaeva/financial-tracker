export const TRANSACTION_TYPES = {
    INCOME: 'income',
    EXPENSE: 'expense',
} as const;

export const DEFAULT_SUMMARY = {
    income: 0,
    expense: 0,
    total: 0,
} as const;
