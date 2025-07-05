'use client';

import { Button } from '@/components/ui/button';
import { Eye, Edit, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { EditUserModal } from '@/features/dashboard/components/modal/EditUserModal'; 
import { DeleteUserModal } from '../modal/DeleteUserModal';
import { useDeleteUser } from '../../api/use-delete-user';
import { useRouter } from 'next/navigation';
import { useUpdateUser } from '../../api/use-update-user';

interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  job?: string;
}

interface UserActionsProps {
  user: User;
}

export const UserActions: React.FC<UserActionsProps> = ({ user }) => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const deleteUserMutation = useDeleteUser();
  const updateUser = useUpdateUser({
    reset: () => {}, // اگر لازم دارید اینجا تعریف کنید
    setOpen: setIsEditOpen,
    setError: () => {},
  });
  
  const router = useRouter();

  const handleUpdate = (values: { name: string; job: string }) => {
    setIsUpdating(true);

    updateUser.mutate(
      { id: user.id, ...values }, // اضافه کردن id به داده‌ها
      {
        onSuccess: () => {
          setIsUpdating(false);
          setIsEditOpen(false);
          // مثلا رفرش داده‌ها یا هر کار دیگه
          router.refresh(); // اگر از next/navigation@app استفاده می‌کنید
        },
        onError: () => {
          setIsUpdating(false);
        },
      }
    );
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
            console.log('Deleted user', user.id);
            router.refresh();
          }}
        />
      </div>

      <EditUserModal
        userId={user.id}
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
