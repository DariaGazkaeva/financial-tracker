export const getFirstDayOfMonth = (): Date => {
    const d = new Date();
    return new Date(d.getFullYear(), d.getMonth(), 1);
};

export const getLastDayOfMonth = (): Date => {
    const d = new Date();
    return new Date(d.getFullYear(), d.getMonth() + 1, 0);
};

export const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};
