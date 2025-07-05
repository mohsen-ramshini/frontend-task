'use client';

import { Button } from '@/components/ui/button';
import { Eye, Edit, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { EditUserModal } from '@/features/dashboard/components/modal/EditUserModal'; 
import { DeleteUserModal } from '../modal/DeleteUserModal';
import { useDeleteUser } from '../../api/use-delete-user';
import { useRouter } from 'next/navigation';

interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  job?: string; // اگر job داری، اینجا اضافه کن
}

interface UserActionsProps {
  user: User;
}

export const UserActions: React.FC<UserActionsProps> = ({ user }) => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const deleteUserMutation = useDeleteUser();
  const router = useRouter();

  // فرضاً این تابع باید درخواست API برای آپدیت کاربر را اجرا کند
  const handleUpdate = async (data: { name: string; job: string }) => {
    setIsUpdating(true);

    try {
      // اینجا کد mutation آپدیت کاربر رو بنویس
      // مثلاً: await updateUser({ id: user.id, ...data });
      console.log('Updating user', { id: user.id, ...data });
      setIsEditOpen(false);
    } catch (error) {
      console.error(error);
      // مدیریت خطا
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <>
      <div className="flex gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={(e) => {
            e.stopPropagation();
            router.push(`/dashboard/user/${user.id}`);
          }}
          aria-label="View user"
        >
          <Eye className="w-4 h-4" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={(e) => {
            e.stopPropagation();
            setIsEditOpen(true);
          }}
          aria-label="Edit user"
        >
          <Edit className="w-4 h-4" />
        </Button>

        <DeleteUserModal
          userId={user.id}
          deleteUser={deleteUserMutation.mutateAsync}
          onDeleteSuccess={() => {
            // مثلا رفرش داده‌ها یا پاک کردن کاربر از لیست
            console.log('Deleted user', user.id);
          }}
        />
      </div>

      <EditUserModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        isLoading={isUpdating}
        initialData={{
          name: user.first_name + ' ' + user.last_name,
          job: user.job ?? '',
        }}
        onSubmit={handleUpdate}
      />
    </>
  );
};
