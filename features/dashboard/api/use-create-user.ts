// hooks/useCreateUser.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { User } from '@/features/dashboard/types/user';
import { toast } from 'sonner';

interface CreateUserInput {
  name: string;
  job: string;
}

const createUser = async (newUser: CreateUserInput): Promise<User> => {
  console.log('Sending create user request with data:', newUser);

  const response = await fetch('https://reqres.in/api/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', "x-api-key": "reqres-free-v1" },
    body: JSON.stringify(newUser),
  });

  console.log('Response status:', response.status);

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Server response error:', errorText);
    throw new Error('Failed to create user');
  }

  const data = await response.json();
  console.log('Data received from server:', data);

  return data;
};

export const useCreateUser = ({
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
    mutationFn: createUser,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast.success('User created successfully');
      reset?.();
      setOpen?.(false);
    },

    onError: (error: any) => {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        'Error creating user. Please try again.';

      toast.error(message);
      console.error('Error creating user:', error);

      setError?.('api', { message });
    },
  });
};
