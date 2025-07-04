// hooks/useDeleteUser.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '@/api/axiosInstance';
import { AxiosError } from 'axios';

const deleteUser = async (id: number): Promise<void> => {
  await axiosInstance.delete(`/users/${id}`);
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation<void, AxiosError, number>({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
};
