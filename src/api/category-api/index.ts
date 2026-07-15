import { IApiResponse } from '@app-api/types.ts';
import { ICategory } from '@app-types/index.ts';

// TODO убрать заглушки после добавления бэка

export const getCategories = async (): Promise<IApiResponse<ICategory[]>> => {
    const categories: ICategory[] = [
        // Расходы
        { id: 1, label: 'Еда', type: 'expense' },
        { id: 2, label: 'Транспорт', type: 'expense' },
        { id: 3, label: 'Развлечения', type: 'expense' },
        { id: 4, label: 'Жильё', type: 'expense' },
        { id: 5, label: 'Здоровье', type: 'expense' },
        { id: 6, label: 'Образование', type: 'expense' },
        { id: 7, label: 'Одежда', type: 'expense' },
        { id: 8, label: 'Путешествия', type: 'expense' },
        { id: 9, label: 'Техника', type: 'expense' },
        { id: 10, label: 'Спорт', type: 'expense' },
        { id: 11, label: 'Красота', type: 'expense' },
        // Доходы
        { id: 12, label: 'Зарплата', type: 'income' },
        { id: 13, label: 'Фриланс', type: 'income' },
        { id: 14, label: 'Инвестиции', type: 'income' },
        { id: 15, label: 'Кэшбэк', type: 'income' },
        { id: 16, label: 'Проценты по вкладам', type: 'income' },
        { id: 17, label: 'Бонусы', type: 'income' },
        { id: 18, label: 'Прочее', type: 'expense' },
    ];

    return {
        data: categories,
        error: null,
    };
};
