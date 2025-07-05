// hooks/useLogin.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import Cookies from 'js-cookie';
import axiosInstance from '@/api/axiosInstance';
import { LoginInput, LoginResponse} from "../types/auth"



const login = async (credentials: LoginInput): Promise<LoginResponse> => {
  console.log('Sending login request with data:', credentials);

  const response = await axiosInstance.post('/login', credentials);

  console.log('Received data from server:', response.data);

  return response.data;
};

export const useLogin = ({
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
    mutationFn: login,

    onSuccess: (data) => {
      Cookies.set('token', data.token, { expires: 7 });

      queryClient.invalidateQueries({ queryKey: ['auth'] });
      toast.success('Login successful');
      reset?.();
      setOpen?.(false);
    },

    onError: (error: any) => {
      const message =
        error?.response?.data?.error ||
        error?.message ||
        'Login failed. Please try again.';

      toast.error(message);
      console.error('Login error:', error);

      setError?.('api', { message });
    },
  });
};
