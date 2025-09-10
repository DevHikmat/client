import { message } from "antd";
import type { ReactNode } from "react";
import {
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Info,
  Loader2,
} from "lucide-react";

type MessageType = "success" | "error" | "warning" | "info" | "loading";

interface UseMessage {
  contextHolder: React.ReactElement;
  showMessage: (
    type: MessageType,
    content: ReactNode,
    options?: { duration?: number; key?: string }
  ) => void;
  destroyMessage: (key?: string) => void;
}

const typeStyles: Record<
  MessageType,
  { icon: ReactNode; bg: string; text: string; border: string }
> = {
  success: {
    icon: <CheckCircle2 className="w-5 h-5 text-green-600" />,
    bg: "bg-green-50",
    text: "text-green-800",
    border: "border-green-200",
  },
  error: {
    icon: <XCircle className="w-5 h-5 text-red-600" />,
    bg: "bg-red-50",
    text: "text-red-800",
    border: "border-red-200",
  },
  warning: {
    icon: <AlertTriangle className="w-5 h-5 text-yellow-600" />,
    bg: "bg-yellow-50",
    text: "text-yellow-800",
    border: "border-yellow-200",
  },
  info: {
    icon: <Info className="w-5 h-5 text-blue-600" />,
    bg: "bg-blue-50",
    text: "text-blue-800",
    border: "border-blue-200",
  },
  loading: {
    icon: <Loader2 className="w-5 h-5 text-gray-600 animate-spin" />,
    bg: "bg-gray-50",
    text: "text-gray-800",
    border: "border-gray-200",
  },
};

export const useMessage = (): UseMessage => {
  const [api, contextHolder] = message.useMessage();

  const showMessage = (
    type: MessageType,
    content: ReactNode,
    options?: { duration?: number; key?: string }
  ) => {
    const { icon, bg, text, border } = typeStyles[type];

    api.open({
      type,
      duration: options?.duration ?? (type === "loading" ? 0 : 3), // loading default -> infinite
      key: options?.key,
      content: (
        <div
          className={`flex items-center gap-3 px-5 py-3 rounded-xl shadow-md 
                      ${bg} ${text} border ${border} 
                      animate-fade-in`}
        >
          {icon}
          <span className="font-medium">{content}</span>
        </div>
      ),
      className: "custom-ant-message",
    });
  };

  const destroyMessage = (key?: string) => {
    api.destroy(key);
  };

  return { contextHolder, showMessage, destroyMessage };
};
