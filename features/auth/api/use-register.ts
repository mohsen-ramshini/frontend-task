// hooks/useRegister.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import axiosInstance from '@/api/axiosInstance';
import { RegisterInput,RegisterResponse} from "../types/auth"


const register = async (credentials: RegisterInput): Promise<RegisterResponse> => {
  console.log('Sending registration request with data:', credentials);

  const response = await axiosInstance.post('/register', credentials);

  console.log('Received data from server:', response.data);

  return response.data;
};

export const useRegister = ({
  reset,
  setOpen,
  setError,
}: {
  reset?: () => void;
  setOpen?: (val: boolean) => void;
  setError?: (name: string, error: { message: string }) => void;
} = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: register,

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['auth'] });
      toast.success('Registration successful');
      reset?.();
      setOpen?.(false);
    },

    onError: (error: any) => {
      const message =
        error?.response?.data?.error ||
        error?.message ||
        'Registration failed. Please try again.';

      toast.error(message);
      console.error('Registration error:', error);

      setError?.('api', { message });
    },
  });
};
