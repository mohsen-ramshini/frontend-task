"use client"
import React from 'react';
import { DataTable } from './table/data-table';
import { userColumns } from './table/user-columns';
import { useUsers } from '../api/use-get-users';
import { useUpdateUser } from '../api/use-update-user';
import { useDeleteUser } from '../api/use-delete-user';
import { CreateUserModal } from '@/features/dashboard/components/modal/createUserModal';

const Dashboard = () => {
  const { data: userList, isLoading, error } = useUsers();
  const updateUser = useUpdateUser();
  const deleteUser = useDeleteUser();

  if (isLoading) return <p>Loading user list...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Users List</h1>
        <CreateUserModal />
      </div>

      <DataTable columns={userColumns} data={userList ?? []} />
    </div>
  );
};

export default Dashboard;
