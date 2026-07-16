import { useUIContext } from '@app-context/UIContext.tsx';
import AppNotification from '@app-ui/app-notification/AppNotification.tsx';

import './notification-container.css'

function NotificationContainer() {
    const { notifications } = useUIContext().state;

    if (notifications.length === 0) {
        return null;
    }

    return (
        <div className="notification-container">
            {notifications.map(({ id, message, type }) => (
                <AppNotification
                    key={id}
                    message={message}
                    type={type}
                />
            ))}
        </div>
    );
}

export default NotificationContainer;
