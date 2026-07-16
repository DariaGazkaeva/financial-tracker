import { NotificationType } from '@app-types/index.ts';

import './app-notification.css';

interface INotificationProps {
    message: string,
    type: NotificationType,
}

function AppNotification({ message, type }: INotificationProps) {
    return (
        <div className={`notification notification--${type}`}>
            {message}
        </div>
    );
};

export default AppNotification;
