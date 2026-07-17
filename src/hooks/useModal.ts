import { MODAL_ACTIONS } from '@app-consts/index.ts';
import { ITransactionResponse } from '@app-types/index.ts';
import { useUIContext } from '@app-context/UIContext.tsx';

export const useModal = () => {
    const { state, dispatch } = useUIContext();

    const openModal = (transaction: ITransactionResponse | null = null) => {      
        dispatch({
            type: MODAL_ACTIONS.OPEN,
            payload: transaction,
        });
    };

    const closeModal = () => {
        dispatch({
            type: MODAL_ACTIONS.CLOSE,
        });
    };

    return {
        isModalOpen: state.isModalOpen,
        transactionFormState: state.transactionFormState,

        openModal,
        closeModal,
    }
}
