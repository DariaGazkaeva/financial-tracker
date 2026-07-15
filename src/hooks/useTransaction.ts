import { ITransactionPayload, ITransactionResponse } from '@app-types/index.ts';
import { useTransactionStore } from '@app-store/useTransactionStore.ts';

export const useTransaction = () => {
    const addTransaction = useTransactionStore(state => state.addTransaction);
    const editTransaction = useTransactionStore(state => state.editTransaction);
    const deleteTransaction = useTransactionStore(state => state.deleteTransaction);
    const setIsModalOpen = useTransactionStore(state => state.setIsModalOpen);
    const setEditableTransaction = useTransactionStore(state => state.setEditableTransaction);
    const setFilter = useTransactionStore(state => state.setFilter);

    return {
        onModalOpen: () => setIsModalOpen(true),
        onModalClose: () => {
            setIsModalOpen(false);
            setEditableTransaction(null);
        },

        onFromDateChange: (fromDate: string) => setFilter({ fromDate }),
        onToDateChange: (toDate: string) => setFilter({ toDate }),

        onDelete: (id: number) => deleteTransaction(id),
        onEdit: (transaction: ITransactionResponse) => {
            setIsModalOpen(true);
            setEditableTransaction(transaction);
        },
        onSave: (transaction: ITransactionPayload) => {
            if (!transaction.id) {
                addTransaction(transaction);
                return;
            }
            
            editTransaction({
                id: transaction.id,
                ...transaction,
            });

            setIsModalOpen(false);
            setEditableTransaction(null);
        },
    };
};
