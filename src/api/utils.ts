import { ApiResponse } from '@app-api/types.ts';

const getErrorMessage = (error: unknown): string => {
    if (error instanceof Error) {
        return error.message;
    }

    if (typeof error === 'string') {
        return error;
    }
    
    try {
        return JSON.stringify(error);
    } catch {
        return 'Неизвестная ошибка';
    }
};

export const withErrorHandling = async <T>(operation: () => Promise<T>): Promise<ApiResponse<T>> => {
    try {
        return {
            data: await operation(),
            error: null,
        };
    } catch (error) {
        return {
            data: null,
            error: getErrorMessage(error),
        };
    }
};
