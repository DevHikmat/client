import { createContext, useContext, type ReactNode } from "react";
import { useMessage } from "../hooks/useMessage";

interface MessageContextProps {
  showMessage: ReturnType<typeof useMessage>["showMessage"];
  destroyMessage: ReturnType<typeof useMessage>["destroyMessage"];
}

const MessageContext = createContext<MessageContextProps | null>(null);

export const MessageProvider = ({ children }: { children: ReactNode }) => {
  const { contextHolder, showMessage, destroyMessage } = useMessage();

  return (
    <MessageContext.Provider value={{ showMessage, destroyMessage }}>
      {children}
      {contextHolder}
    </MessageContext.Provider>
  );
};

export const useGlobalMessage = () => {
  const ctx = useContext(MessageContext);
  if (!ctx) {
    throw new Error("useGlobalMessage must be used within MessageProvider");
  }
  return ctx;
};
