import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

const deleteUser = async (id: number): Promise<void> => {
  const response = await fetch(`https://reqres.in/api/users/${id}`, {
    method: 'DELETE',
    headers: { "x-api-key": "reqres-free-v1" },
  });

  if (!response.ok) {
    throw new Error('Failed to delete user');
  }

  // No response body to parse, just return
  return;
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
