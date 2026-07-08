export type CategoryType = 'income' | 'expense';

export interface ICategory {
    id: number,
    label: string,
    type: CategoryType,
};
