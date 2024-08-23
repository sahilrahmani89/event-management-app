// toastUtils.ts
import { useToast } from '@/app/utils/ToastContext';

export const useCustomToast = () => {
  const { addToast } = useToast();

  const showToast = (message: string, type: 'success' | 'error' | 'info') => {
    addToast(message, type);
  };

  return { showToast };
};
