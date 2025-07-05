import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import axiosInstance from '@/api/axiosInstance';

const deleteUser = async (id: number): Promise<void> => {
  await axiosInstance.delete(`/users/${id}`);
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteUser,

    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast.success(`User with ID ${id} deleted successfully`);
    },

    onError: (error: any) => {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        'Error deleting user. Please try again.';

      toast.error(message);
      console.error('Error deleting user:', error);
    },
  });
};
