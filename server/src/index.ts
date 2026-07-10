import express, { Request, Response } from 'express';
import cors from 'cors';
import {
    ITransactionResponse,
    ICategory,
    IFilter,
} from './types';

const app = express();

app.use(cors());
app.use(express.json());

const getDefaultCategories = (): ICategory[] => {
    return [
        { id: 1, label: 'Еда', type: 'expense' },
        { id: 2, label: 'Транспорт', type: 'expense' },
        { id: 3, label: 'Развлечения', type: 'expense' },
        { id: 4, label: 'Зарплата', type: 'income' },
        { id: 5, label: 'Фриланс', type: 'income' },
    ];
}

let transactions: ITransactionResponse[] = [];
let categories: ICategory[] = getDefaultCategories();
let nextId = 1;

const filterByFilter = (items: ITransactionResponse[], filter?: IFilter) => {
    if (!filter) {
        return items;
    }

    return items.filter(item => {
        if (filter.fromDate && item.date < filter.fromDate) return false;
        if (filter.toDate && item.date > filter.toDate) return false;
        return true;
    });
};

app.get('/api/categories', (req: Request, res: Response) => {
    res.json(categories);
});

app.get('/api/transactions', (req: Request, res: Response) => {
    const filter = req.query as IFilter;

    let result = transactions;
    if (filter.fromDate || filter.toDate) {
        result = filterByFilter(result, filter);
    }

    res.json(result);
});

app.post('/api/transactions', (req: Request, res: Response) => {
    const {
        description,
        amount,
        categoryId,
        date,
    } = req.body;

    if (!amount || !categoryId || !date) {
        return res.status(400).json({
            error: 'Пропущены обязательные поля',
        });
    }

    const category = categories.find(category => category.id === categoryId);

    if (!category) {
        return res.status(400).json({
            error: 'Категория не найдена',
        });
    }

    const newTransaction: ITransactionResponse = {
        id: nextId++,
        description,
        amount: parseFloat(amount),
        category,
        date,
    };

    transactions.push(newTransaction);
    res.status(200).json(newTransaction);
});

app.delete('/api/transactions/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id as string);
    const index = transactions.findIndex(t => t.id === id);

    if (index === -1) {
        return res.status(404).json({
            error: 'Транзакция не найдена',
        });
    }

    transactions.splice(index, 1);
    res.status(200).json({
        id,
    });
});

app.get('/api/summary', (req: Request, res: Response) => {
    const filter = req.query as IFilter;
    const filtered = filterByFilter(transactions, filter);

    const income = filtered
        .filter(t => t.category.type === 'income')
        .reduce((acc, t) => acc + t.amount, 0);
    const expense = filtered
        .filter(t => t.category.type === 'expense')
        .reduce((acc, t) => acc + Math.abs(t.amount), 0);
    res.json({
        income,
        expense,
        total: income - expense,
    });
});

const PORT = 5000;
app.listen(PORT);
