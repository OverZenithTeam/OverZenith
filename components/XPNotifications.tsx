import { useEffect, useState } from 'react';

interface XPNotification {
  id: string;
  amount: number;
  reason: string;
  timestamp: number;
}

interface Props {
  notifications: XPNotification[];
  onRemove: (id: string) => void;
}

export const XPNotifications: React.FC<Props> = ({ notifications, onRemove }) => {
  return (
    <div className="fixed top-20 right-4 z-50 space-y-2 pointer-events-none">
      {notifications.map((notification) => (
        <XPNotificationItem
          key={notification.id}
          notification={notification}
          onRemove={onRemove}
        />
      ))}
    </div>
  );
};

interface NotificationItemProps {
  notification: XPNotification;
  onRemove: (id: string) => void;
}

const XPNotificationItem: React.FC<NotificationItemProps> = ({ notification, onRemove }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    // Trigger animation after mount
    const timer = setTimeout(() => setIsVisible(true), 50);

    // Auto remove after duration
    const removeTimer = setTimeout(() => {
      setIsLeaving(true);
      setTimeout(() => onRemove(notification.id), 300);
    }, 3000);

    return () => {
      clearTimeout(timer);
      clearTimeout(removeTimer);
    };
  }, [notification.id, onRemove]);

  return (
    <div
      className={`transform transition-all duration-300 ease-out ${
        isVisible && !isLeaving
          ? 'translate-x-0 opacity-100 scale-100'
          : isLeaving
          ? 'translate-x-full opacity-0 scale-95'
          : 'translate-x-full opacity-0 scale-95'
      }`}
    >
      <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-lg shadow-lg border border-yellow-300 pointer-events-auto">
        <div className="flex items-center gap-2">
          <span className="text-lg">⭐</span>
          <div className="flex flex-col">
            <span className="font-bold text-sm">+{notification.amount} XP</span>
            <span className="text-xs opacity-90">{notification.reason}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
