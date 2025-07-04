// hooks/useCreateUser.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '@/api/axiosInstance';
import { User } from '@/features/dashboard/types/user';
import { AxiosError } from 'axios';

type CreateUserInput = Omit<User, 'id'>;

const createUser = async (userData: CreateUserInput): Promise<User> => {
  const res = await axiosInstance.post<User>('/users', userData);
  return res.data;
};

export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation<User, AxiosError, CreateUserInput>({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });

    },
  });
};
