import { useQuery } from '@tanstack/react-query';
import { User } from '@/features/dashboard/types/user';

const fetchUserById = async (id: number): Promise<User> => {
  const response = await fetch(`/api/users/${id}`, { cache: 'no-store' });

  if (!response.ok) {
    throw new Error('Failed to fetch user');
  }

  const data = await response.json();
  return data as User;
};

export const useGetUserById = (id: number) => {
  return useQuery<User, Error>({
    queryKey: ['user', id],
    queryFn: () => fetchUserById(id),
    enabled: !!id, // فقط وقتی id وجود داشته باشه
    staleTime: 1000 * 60 * 5,
  });
};
