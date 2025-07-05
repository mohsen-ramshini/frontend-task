import { useMutation, useQueryClient } from '@tanstack/react-query';
import { User } from '@/features/dashboard/types/user';
import { toast } from 'sonner';
import axiosInstance from '@/api/axiosInstance';
import { CreateUserInput } from "../types/user"


const createUser = async (newUser: CreateUserInput): Promise<User> => {
  console.log('Sending create user request with data:', newUser);

  const response = await axiosInstance.post('/users', newUser);

  console.log('Response data:', response.data);

  return response.data;
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
