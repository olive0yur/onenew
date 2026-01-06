import { ref } from 'vue';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface Toast {
  id: number;
  type: ToastType;
  message: string;
}

const toasts = ref<Toast[]>([]);
let id = 0;

export const useToast = () => {
  const add = (type: ToastType, message: string, duration = 3000) => {
    const toast: Toast = { id: ++id, type, message };
    toasts.value.push(toast);
    
    setTimeout(() => {
      remove(toast.id);
    }, duration);
  };

  const remove = (id: number) => {
    const index = toasts.value.findIndex(t => t.id === id);
    if (index > -1) {
      toasts.value.splice(index, 1);
    }
  };

  return {
    toasts,
    success: (msg: string) => add('success', msg),
    error: (msg: string) => add('error', msg),
    warning: (msg: string) => add('warning', msg),
    info: (msg: string) => add('info', msg),
    remove,
  };
};

