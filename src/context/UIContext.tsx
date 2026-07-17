import React from 'react';
import { ITransactionResponse, NotificationType } from '@app-types/index.ts';
import { MODAL_ACTIONS, NOTIFICATION_ACTIONS } from '@app-consts/index.ts';

interface INotification {
    id: number,
    message: string,
    type: NotificationType,
}

interface INotificationAction {
    type: typeof NOTIFICATION_ACTIONS.ADD | typeof NOTIFICATION_ACTIONS.REMOVE,
    payload: INotification,
}

interface IModalActionOpen {
    type: typeof MODAL_ACTIONS.OPEN,
    payload: ITransactionResponse | null,
}

interface IModalActionClose {
    type: typeof MODAL_ACTIONS.CLOSE,
}

type UIAction = INotificationAction | IModalActionOpen | IModalActionClose;

interface IStateUI {
    notifications: INotification[],
    isModalOpen: boolean,
    transactionFormState: ITransactionResponse | null,
}

const initialState: IStateUI = {
    notifications: [],
    isModalOpen: false,
    transactionFormState: null,
};

const reducer = (state: IStateUI, action: UIAction): IStateUI => {
    switch (action.type) {
        case NOTIFICATION_ACTIONS.ADD:
            return {
                ...state,
                notifications: [...state.notifications, action.payload],
            };
        case NOTIFICATION_ACTIONS.REMOVE:
            return {
                ...state,
                notifications: state.notifications.filter(n => n.id !== action.payload.id),
            };
        case MODAL_ACTIONS.OPEN:
            return {
                ...state,
                isModalOpen: true,
                transactionFormState: action.payload,
            };
        case MODAL_ACTIONS.CLOSE:
            return {
                ...state,
                isModalOpen: false,
                transactionFormState: null,
            };

        default:
            return state;
    }
};

const UIContext = React.createContext<{
    state: IStateUI,
    dispatch: React.Dispatch<UIAction>,
} | null>(null);

export const UIProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, dispatch] = React.useReducer(reducer, initialState);

    return (
        <UIContext.Provider value={{ state, dispatch }}>
            {children}
        </UIContext.Provider>
    );
};

export const useUIContext = () => {
    const context = React.useContext(UIContext);

    if (!context) {
        throw new Error();
    }

    return context;
};
