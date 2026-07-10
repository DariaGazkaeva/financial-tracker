import { IApiResponse } from '@app-api/types.ts';
import { ICategory } from '@app-api/category-api/types.ts';
import { withErrorHandling } from '@app-api/utils.ts';

export const getCategories = async (): Promise<IApiResponse<ICategory[]>> =>
    withErrorHandling(async () => {
        const response = await fetch('/api/categories');

        if (!response.ok) {
            throw new Error(`Ошибка: ${response.status}`);
        }
        
        return await response.json();
    });
