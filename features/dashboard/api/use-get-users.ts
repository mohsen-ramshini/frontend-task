import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/api/axiosInstance';
import { UsersResponse } from "../types/user"

const fetchUsers = async (page: number): Promise<UsersResponse> => {
  const response = await axiosInstance.get('/users', { params: { page } });
  return response.data;
};

export const useUsers = (page: number) => {
  return useQuery<UsersResponse, Error>({
    queryKey: ['users', page],
    queryFn: () => fetchUsers(page),
    staleTime: 1000 * 60 * 5,
  });
};
