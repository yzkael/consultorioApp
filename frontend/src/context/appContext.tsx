import React, { createContext, useContext, useCallback, ReactNode } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface ToastContextType {
  notifySuccess: (message: string) => void;
  notifyError: (message: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

const ToastProvider = ({ children }: { children: ReactNode }) => {
  const notifySuccess = useCallback((message: string) => {
    toast.success(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }, []);

  const notifyError = useCallback((message: string) => {
    toast.error(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }, []);

  return (
    <ToastContext.Provider value={{ notifySuccess, notifyError }}>
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  );
};

export default ToastProvider;
