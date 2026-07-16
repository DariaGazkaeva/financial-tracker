import React from 'react';
import { NotificationType } from '@app-types/index.ts';
import { NOTIFICATION_ACTIONS } from '@app-consts/index.ts';

interface INotification {
    id: number,
    message: string,
    type: NotificationType,
}

interface IStateUI {
    notifications: INotification[],
}

interface INotificationAction {
    type: typeof NOTIFICATION_ACTIONS.ADD | typeof NOTIFICATION_ACTIONS.REMOVE,
    payload: INotification,
}

type UIAction = INotificationAction;

const initialState: IStateUI = {
    notifications: [],
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
