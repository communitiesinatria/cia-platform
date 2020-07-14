import React, { useEffect } from 'react';

interface NotificationsProps {}
const Notifications: React.FC<NotificationsProps> = () => {
  return (
    <div className="notifications">
      <header>
        <h3>Notifications</h3>
      </header>

      <div className="notification-list">
        <Notification />
        <Notification />
        <Notification />
        <Notification />
        <Notification />
        <Notification />
        <Notification />
        <Notification />
        <Notification />
        <Notification />
        <Notification />
        <Notification />
        <Notification />
        <Notification />
        <Notification />
        <Notification />
        <Notification />
      </div>
    </div>
  );
};

interface NotificationProps {}
const Notification: React.FC<NotificationProps> = () => {
  useEffect(() => {
    document.title = 'irenic | Notifications';
  }, []);
  return (
    <div className="notification">
      <h4>Title</h4>
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Placeat
        reprehenderit consequatur inventore aut voluptatum a.
      </p>
    </div>
  );
};

export default Notifications;
