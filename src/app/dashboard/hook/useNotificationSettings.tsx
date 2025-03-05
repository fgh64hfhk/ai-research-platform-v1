import {
  useState,
  useContext,
  createContext,
  ReactNode,
} from "react";

// 定義 Context 類型
interface NotificationSettingsContextType {
  isPushEnabled: boolean;
  togglePushNotifications: () => void;
}

// 創建 Context
const NotificationSettingsContext = createContext<
  NotificationSettingsContextType | undefined
>(undefined);

// Provider，管理推播通知開關狀態
export function NotificationSettingsProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [isPushEnabled, setIsPushEnabled] = useState<boolean>(() => {
    // 檢查 localStorage 是否有設定值
    if (typeof window !== "undefined") {
      return localStorage.getItem("isPushEnabled") === "true";
    }
    return true; // 預設開啟推播通知
  });

  // 切換推播通知的開關
  const togglePushNotifications = () => {
    setIsPushEnabled((prev) => {
      const newState = !prev;
      localStorage.setItem("isPushEnabled", String(newState));
      return newState;
    });
  };

  return (
    <NotificationSettingsContext.Provider
      value={{
        isPushEnabled,
        togglePushNotifications,
      }}
    >
      {children}
    </NotificationSettingsContext.Provider>
  );
}

// 自定義 Hook 讓組件使用 Context
export function useNotificationSettings() {
  const context = useContext(NotificationSettingsContext);
  if (!context) {
    throw new Error(
      "useNotificationSettings must be used within a NotificationSettingsProvider"
    );
  }
  return context;
}
