// hooks/useUsers.ts
import { useQuery } from '@tanstack/react-query';
import { User } from '@/features/dashboard/types/user';

interface UsersResponse {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: User[];
}

const fetchUsers = async (page: number): Promise<UsersResponse> => {
  const response = await fetch(`https://reqres.in/api/users?page=${page}`, {
    headers: { "x-api-key": "reqres-free-v1" },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch users');
  }

  return response.json();
};

export const useUsers = (page: number) => {
  return useQuery<UsersResponse, Error>({
    queryKey: ['users', page],
    queryFn: () => fetchUsers(page),
    staleTime: 1000 * 60 * 5,
  });
};
