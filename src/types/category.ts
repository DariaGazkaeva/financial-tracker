import { CATEGORY_TYPES } from '@app-consts/index.ts';

export type CategoryType = typeof CATEGORY_TYPES[keyof typeof CATEGORY_TYPES];

export interface ICategory {
    id: number,
    label: string,
    type: CategoryType,
};
