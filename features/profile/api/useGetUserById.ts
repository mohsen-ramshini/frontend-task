import { useQuery } from '@tanstack/react-query';
import { User } from '@/features/dashboard/types/user';

const fetchUserById = async (id: number): Promise<User> => {
  const response = await fetch(`https://reqres.in/api/users/${id}`, { headers: { "x-api-key": "reqres-free-v1" },});

  if (!response.ok) {
    throw new Error('Failed to fetch user');
  }

  const json = await response.json();

  console.log('API response:', json); // اضافه کردن لاگ برای دیدن داده

  return json.data as User; // دسترسی به data داخل پاسخ
};


export const useGetUserById = (id: number) => {
  return useQuery<User, Error>({
    queryKey: ['user', id],
    queryFn: () => fetchUserById(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });
};
