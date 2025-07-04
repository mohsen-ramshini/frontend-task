// hooks/useUsers.ts
import { useQuery } from '@tanstack/react-query';
import { User } from '@/features/dashboard/types/user';

const fetchUsers = async (): Promise<User[]> => {
  const response = await fetch('/api/users', { cache: 'no-store' });

  if (!response.ok) {
    throw new Error('Failed to fetch users');
  }

  const data = await response.json();
  return data as User[];
};

export const useUsers = () => {
  return useQuery<User[], Error>({
    queryKey: ['users'],
    queryFn: fetchUsers,
    staleTime: 1000 * 60 * 5,
  });
};
    