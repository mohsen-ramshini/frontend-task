// hooks/useLogin.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import Cookies from 'js-cookie';

interface LoginInput {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
}

const login = async (credentials: LoginInput): Promise<LoginResponse> => {
  console.log('Sending login request with data:', credentials);

  const response = await fetch('https://reqres.in/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      "x-api-key": "reqres-free-v1"
    },
    body: JSON.stringify(credentials),
  });

  console.log('Response status:', response.status);

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Server response error:', errorText);
    throw new Error('Login failed');
  }

  const data = await response.json();
  console.log('Received data from server:', data);

  return data;
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
      // Save token in cookie, expire in 7 days (you can adjust)
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
