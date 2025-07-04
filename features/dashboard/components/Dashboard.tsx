"use client"
import React, { useState } from 'react';
import { DataTable } from './table/data-table';
import { userColumns } from './table/user-columns';
import { useUsers } from '../api/use-get-users';
import { useCreateUser } from '../api/use-create-user';
import { useUpdateUser } from '../api/use-update-user';
import { useDeleteUser } from '../api/use-delete-user';


const Dashboard = () => {

  const { data: userList, isLoading, error } = useUsers();
  const createUser = useCreateUser();
  const updateUser = useUpdateUser();
  const deleteUser = useDeleteUser();

  if (isLoading) return <p>Loading patient list...</p>;
  if (error) return <p>Error: {error.message}</p>;



  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Users List</h1>
      <DataTable columns={userColumns} data={userList ?? []} />
    </div>
  );
};

export default Dashboard;
