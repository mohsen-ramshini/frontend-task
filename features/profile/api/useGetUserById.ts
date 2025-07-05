import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/api/axiosInstance';
import { User } from '@/features/dashboard/types/user';

const fetchUserById = async (id: number): Promise<User> => {
  const response = await axiosInstance.get(`/users/${id}`);

  console.log('API response:', response.data);

  return response.data.data as User; 
};

export const useGetUserById = (id: number) => {
  return useQuery<User, Error>({
    queryKey: ['user', id],
    queryFn: () => fetchUserById(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });
};
