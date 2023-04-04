import { createContext, useState, useEffect, useCallback } from "react";

const ToastContext = createContext<(toast: string) => void>((message) => {});

export default ToastContext;

export function ToastContextProvider({ children }) {
  const [message, setMessage] = useState<string | null>(null);

  const showToast = useCallback(
    function (toast: string) {
      setMessage(toast);
      setTimeout(() => setMessage(null), 3000);
    },
    [setMessage]
  );

  return (
    <ToastContext.Provider value={showToast}>
      {message && (
        <div className="fixed flex justify-center items-center w-full h-fit top-24">
          <div className="w-1/3 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md">
            <span className="font-medium">Failed! </span>
            <span className="">{message}</span>
          </div>
        </div>
      )}
      {children}
    </ToastContext.Provider>
  );
}
