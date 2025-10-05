import { useState, useCallback } from 'react';

interface XPNotification {
  id: string;
  amount: number;
  reason: string;
  timestamp: number;
}

export const useXPNotifications = () => {
  const [notifications, setNotifications] = useState<XPNotification[]>([]);

  const showXPGain = useCallback((amount: number, reason: string) => {
    const id = Date.now().toString() + Math.random().toString(36).substr(2, 9);
    const notification: XPNotification = {
      id,
      amount,
      reason,
      timestamp: Date.now(),
    };

    setNotifications(prev => [...prev, notification]);
  }, []);

  const removeNotification = useCallback((id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  }, []);

  return {
    notifications,
    showXPGain,
    removeNotification,
  };
};

export type { XPNotification };
