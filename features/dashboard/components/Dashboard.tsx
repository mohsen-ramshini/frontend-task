"use client"
import React from 'react';
import Cookies from 'js-cookie';    
import { useRouter } from 'next/navigation';  

import { DataTable } from './table/data-table';
import { userColumns } from './table/user-columns';
import { useUsers } from '../api/use-get-users';
import { CreateUserModal } from '@/features/dashboard/components/modal/createUserModal';
import { toast } from 'sonner';

const Dashboard = () => {
  const { isLoading, error } = useUsers(1);
  const router = useRouter();

  if (error) return <p>Error: {error.message}</p>;

  const handleLogout = () => {
    Cookies.remove('token'); 
    router.push('/auth/sign-in'); 
    toast.success("Logout successfully")
  };

  return (
    <div className="p-4 relative h-screen">
      {isLoading && (
        <div className="absolute inset-0 bg-black/20 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Users List</h1>
        <div className="flex gap-4 items-center">
          <CreateUserModal />
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
          >
            Logout
          </button>
        </div>
      </div>

      <DataTable columns={userColumns}  />
    </div>
  );
};

export default Dashboard;
