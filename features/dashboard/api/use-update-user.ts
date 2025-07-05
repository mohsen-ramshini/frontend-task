// hooks/useUpdateUser.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { User } from '@/features/dashboard/types/user';
import { toast } from 'sonner';

interface UpdateUserInput {
  name: string;
  job: string;
}

const updateUser = async (updatedUser: UpdateUserInput): Promise<User> => {
  const response = await fetch('/api/users', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedUser),
  });

  if (!response.ok) {
    throw new Error('Failed to update user');
  }

  return response.json();
};

export const useUpdateUser = ({
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
    mutationFn: updateUser,

    onSuccess: (_, data) => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast.success(`کاربر با شناسه با موفقیت بروزرسانی شد`);
      reset?.();
      setOpen?.(false);
    },

    onError: (error: any) => {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        'خطا در بروزرسانی کاربر. لطفاً دوباره تلاش کنید.';

      toast.error(message);
      console.error('خطا در بروزرسانی کاربر:', error);

      setError?.('api', { message });
    },
  });
};
