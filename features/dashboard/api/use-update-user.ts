import { useMutation, useQueryClient } from '@tanstack/react-query';
import { User } from '@/features/dashboard/types/user';
import { toast } from 'sonner';
import axiosInstance from '@/api/axiosInstance';
import { UpdateUserInput } from "../types/user"


const updateUser = async ({ id, ...updatedUser }: UpdateUserInput): Promise<User> => {
  const response = await axiosInstance.put(`/users/${id}`, updatedUser);
  return response.data;
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

    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast.success(`User with ID ${variables.id} updated successfully`);
      reset?.();
      setOpen?.(false);
    },

    onError: (error: any) => {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        'Error updating user. Please try again.';

      toast.error(message);
      console.error('Error updating user:', error);

      setError?.('api', { message });
    },
  });
};
