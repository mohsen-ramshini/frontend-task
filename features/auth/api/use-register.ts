// hooks/useRegister.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

interface RegisterInput {
  email: string;
  password: string;
}

interface RegisterResponse {
  id: number;
  token: string;
}

const register = async (credentials: RegisterInput): Promise<RegisterResponse> => {
  console.log('Sending registration request with data:', credentials);

  const response = await fetch('https://reqres.in/api/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': 'reqres-free-v1',
    },
    body: JSON.stringify(credentials),
  });

  console.log('Response status:', response.status);

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Server error response:', errorText);
    throw new Error('Registration failed');
  }

  const data = await response.json();
  console.log('Received data from server:', data);

  return data;
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
      // You can store the token here if needed
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
