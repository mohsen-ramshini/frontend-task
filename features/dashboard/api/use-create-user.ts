// hooks/useCreateUser.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { User } from '@/features/dashboard/types/user';
import { toast } from 'sonner';

interface CreateUserInput {
  email: string;
  first_name: string;
  last_name: string;
  avatar?: string;
}

const createUser = async (newUser: CreateUserInput): Promise<User> => {
  const response = await fetch('/api/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newUser),
  });

  if (!response.ok) {
    throw new Error('Failed to create user');
  }

  return response.json();
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
      toast.success('کاربر با موفقیت ایجاد شد');
      reset?.();
      setOpen?.(false);
    },

    onError: (error: any) => {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        'خطا در ایجاد کاربر. لطفاً دوباره تلاش کنید.';

      toast.error(message);
      console.error('خطا در ایجاد کاربر:', error);

      setError?.('api', { message });
    },
  });
};
