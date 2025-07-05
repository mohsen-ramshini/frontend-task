export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

export interface UsersResponse {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: User[];
}

export interface CreateUserInput {
  name: string;
  job: string;
}

export interface UpdateUserInput {
  id: number; 
  name: string;
  job: string;
}