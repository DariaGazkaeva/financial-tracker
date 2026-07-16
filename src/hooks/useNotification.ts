import { useUIContext } from '@app-context/UIContext.tsx';
import { NotificationType } from '@app-types/index.ts';
import { NOTIFICATION_ACTIONS } from '@app-consts/index.ts';

let idCounter = 0;

export const useNotification = () => {
    const { dispatch } = useUIContext();

    const showNotification = (message: string, type: NotificationType) => {
        const payload = {
            id: idCounter,
            message,
            type,
        };

        dispatch({
            type: NOTIFICATION_ACTIONS.ADD,
            payload,
        });

        setTimeout(() => {
            dispatch({
            type: NOTIFICATION_ACTIONS.REMOVE,
            payload,
        });
        }, 3000);

        idCounter++;
    };

    return {
        showNotification,
    };
};
