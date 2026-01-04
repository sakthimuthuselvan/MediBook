import React from "react";
import { AlertCircle, CheckCircle2 } from "lucide-react";

interface CustomAlertProps {
  open: boolean;
  status: "success" | "failure";
  message: string;
  onClose: () => void;
}

const statusStyles = {
  success: {
    icon: <CheckCircle2 className="w-6 h-6 text-green-600" />,
    bg: "bg-green-50 border-green-500 text-green-800",
    border: "border-green-500",
  },
  failure: {
    icon: <AlertCircle className="w-6 h-6 text-red-600" />,
    bg: "bg-red-50 border-red-500 text-red-800",
    border: "border-red-500",
  },
};

const CustomAlert: React.FC<CustomAlertProps> = ({ open, status, message, onClose }) => {
  if (!open) return null;
  const style = statusStyles[status];
  return (
    <div
      className={`fixed top-8 right-8 z-50 flex items-center gap-3 px-6 py-4 rounded-xl shadow-lg border ${style.bg} ${style.border} animate-fade-in-up`}
      role="alert"
    >
      {style.icon}
      <span className="font-semibold text-base">{message}</span>
      <button
        className="ml-4 text-lg font-bold text-gray-500 hover:text-gray-800 focus:outline-none"
        onClick={onClose}
        aria-label="Close alert"
      >
        ×
      </button>
    </div>
  );
};

export default CustomAlert;
