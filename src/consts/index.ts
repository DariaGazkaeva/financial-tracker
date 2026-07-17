import { formatDate, getFirstDayOfMonth, getLastDayOfMonth } from '@app-utils/date-utils.ts';

export const CATEGORY_TYPES = {
    INCOME: 'income',
    EXPENSE: 'expense',
} as const;

export const DEFAULT_SUMMARY = {
    income: 0,
    expense: 0,
    total: 0,
} as const;

export const DEFAULT_FILTER = {
    fromDate: formatDate(getFirstDayOfMonth()),
    toDate: formatDate(getLastDayOfMonth()),
} as const;

export const FILTER_TYPE_OPTIONS = [
    { value: 'all', label: 'Все' },
    { value: 'income', label: 'Доходы' },
    { value: 'expense', label: 'Расходы' },
] as const;

export const NOTIFICATION_ACTIONS = {
    ADD: 'ADD_NOTIFICATION',
    REMOVE: 'REMOVE_NOTIFICATION',
} as const;

export const NOTIFICATION_TYPE = {
    SUCCESS: 'success',
    ERROR: 'error',
    INFO: 'info',
} as const;

export const MODAL_ACTIONS = {
    OPEN: 'OPEN_MODAL',
    CLOSE: 'CLOSE_MODAL',
} as const;
