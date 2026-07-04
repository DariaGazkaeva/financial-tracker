// TODO убрать заглушки после добавления бэка

export const getCategories = async () => {
    const categories = [
        { id: 1, label: 'Еда', type: 'expense' },
        { id: 2, label: 'Транспорт', type: 'expense' },
        { id: 3, label: 'Развлечения', type: 'expense' },
        { id: 4, label: 'Зарплата', type: 'income' },
        { id: 5, label: 'Фриланс', type: 'income' },
    ];

    return {
        data: categories,
        error: null,
    };
};
