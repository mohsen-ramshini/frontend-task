// hooks/useUsers.ts
import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/api/axiosInstance';
import { User } from '@/features/dashboard/types/user';
import { AxiosError } from 'axios';

const fetchUsers = async (): Promise<User[]> => {
  const res = await axiosInstance.get<{ data: User[] }>('/users'); 
  return res.data.data;
};

export const useUsers = () => {
  return useQuery<User[], AxiosError>({
    queryKey: ['users'],
    queryFn: fetchUsers,
    staleTime: 1000 * 60 * 5,
  });
};
