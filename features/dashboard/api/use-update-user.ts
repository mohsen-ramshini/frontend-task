// hooks/useUpdateUser.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '@/api/axiosInstance';
import { User } from '@/features/dashboard/types/user';
import { AxiosError } from 'axios';

type UpdateUserInput = {
  id: number;
  data: Partial<Omit<User, 'id'>>;
};

const updateUser = async ({ id, data }: UpdateUserInput): Promise<User> => {
  const res = await axiosInstance.put<User>(`/users/${id}`, data);
  return res.data;
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation<User, AxiosError, UpdateUserInput>({
    mutationFn: updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
};
