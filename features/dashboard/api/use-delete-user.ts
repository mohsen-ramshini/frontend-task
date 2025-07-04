import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

const deleteUser = async (id: number): Promise<{ message: string }> => {
  const response = await fetch(`/api/users?id=${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to delete user');
  }

  return response.json();
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteUser,

    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast.success(`کاربر با شناسه ${id} با موفقیت حذف شد`);
    },

    onError: (error: any) => {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        'خطا در حذف کاربر. لطفاً دوباره تلاش کنید.';

      toast.error(message);
      console.error('خطا در حذف کاربر:', error);
    },
  });
};
