// TODO убрать заглушки с localStorage после добавления бэка

const STORAGE_KEY = 'transactions';

export const getTransactions = async (filters = {}) => {
    const result = {
        data: null,
        error: null,
    };

    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        const transactions = stored ? JSON.parse(stored) : [];

        result.data = transactions.filter(t => {
            const matchFrom = !filters.fromDate || t.date >= filters.fromDate;
            const matchTo = !filters.toDate || t.date <= filters.toDate;
            return matchFrom && matchTo;
        });
    } catch (error) {
        result.error = error;
    }

    return result;
};

export const addTransaction = async (transaction) => {
    const result = {
        data: null,
        error: null,
    };

    try {
        const newTransaction = {
            id: Date.now(),
            ...transaction,
        };

        const allTransactions = (await getTransactions()).data;
        localStorage.setItem(STORAGE_KEY, JSON.stringify([newTransaction, ...allTransactions]));
        
        result.data = newTransaction;
    } catch (error) {
        result.error = error;
    }
    
    return result;
};

export const deleteTransaction = async (id) => {
    const result = {
        data: null,
        error: null,
    };

    try {
        const transactions = (await getTransactions()).data;
        const updated = transactions.filter(t => t.id !== id);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        result.data = id;
    } catch (error) {
        result.error = error;
    }

    return result;
};

export const calculateSummary = (transactions) => {
    const income = transactions
            .filter(t => t.type === 'income')
            .reduce((acc, t) => acc + t.amount, 0);

    const expense = transactions
        .filter(t => t.type === 'expense')
        .reduce((acc, t) => acc + t.amount, 0);

    return {
        income,
        expense,
        total: income - expense,
    };
};

export const getSummary = async (filters = {}) => {
    const result = {
        data: null,
        error: null,
    };

    try {
        const transactions = (await getTransactions(filters)).data;
        result.data = calculateSummary(transactions);
    } catch (error) {
        result.error = error;
    }
    
    return result;
};
