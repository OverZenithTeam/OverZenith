import React, { createContext, useContext } from 'react';
import { useXPNotifications } from '../hooks/useXPNotifications';

interface XPContextType {
  showXPGain: (amount: number, reason: string) => void;
}

const XPContext = createContext<XPContextType | undefined>(undefined);

export const XPProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { notifications, showXPGain, removeNotification } = useXPNotifications();

  return (
    <XPContext.Provider value={{ showXPGain }}>
      {children}
      {/* Render notifications here - Bottom Left */}
      <div className="fixed bottom-4 left-4 z-50 space-y-2 pointer-events-none">
        {notifications.map((notification) => (
          <XPNotificationCard
            key={notification.id}
            notification={notification}
            onRemove={removeNotification}
          />
        ))}
      </div>
    </XPContext.Provider>
  );
};

interface XPNotificationCardProps {
  notification: any;
  onRemove: (id: string) => void;
}

const XPNotificationCard: React.FC<XPNotificationCardProps> = ({ notification, onRemove }) => {
  const [isVisible, setIsVisible] = React.useState(false);
  const [isLeaving, setIsLeaving] = React.useState(false);

  React.useEffect(() => {
    // Trigger animation after mount
    const timer = setTimeout(() => setIsVisible(true), 50);

    // Auto remove after duration
    const removeTimer = setTimeout(() => {
      setIsLeaving(true);
      setTimeout(() => onRemove(notification.id), 300);
    }, 5000); // 5 segundos antes de auto-cerrar

    return () => {
      clearTimeout(timer);
      clearTimeout(removeTimer);
    };
  }, [notification.id, onRemove]);

  const handleManualClose = () => {
    setIsLeaving(true);
    setTimeout(() => onRemove(notification.id), 300);
  };

  return (
    <div
      className={`transform transition-all duration-300 ease-out ${
        isVisible && !isLeaving
          ? 'translate-x-0 opacity-100 scale-100'
          : isLeaving
          ? '-translate-x-full opacity-0 scale-95'
          : '-translate-x-full opacity-0 scale-95'
      }`}
    >
      <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-lg shadow-lg border border-yellow-300 pointer-events-auto relative">
        <button
          onClick={handleManualClose}
          className="absolute top-1 right-1 w-5 h-5 flex items-center justify-center rounded-full bg-black bg-opacity-20 hover:bg-opacity-40 transition text-xs font-bold"
          aria-label="Cerrar notificación"
        >
          ✕
        </button>
        <div className="flex items-center gap-2 pr-6">
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

export const useXPContext = () => {
  const context = useContext(XPContext);
  if (context === undefined) {
    throw new Error('useXPContext must be used within an XPProvider');
  }
  return context;
};
