'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';

interface DeleteUserButtonProps {
  userId: number;
  onDeleteSuccess?: () => void;
  deleteUser: (id: number) => Promise<any>; 
}

export const DeleteUserModal: React.FC<DeleteUserButtonProps> = ({
  userId,
  onDeleteSuccess,
  deleteUser,
}) => {
  const [open, setOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteUser(userId);
      setOpen(false);
      onDeleteSuccess?.();
    } catch (error) {
      console.error(error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        onClick={(e) => {
          e.stopPropagation();
          setOpen(true);
        }}
        aria-label="Delete user"
      >
        <Trash2 className="w-4 h-4" />
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="rounded-2xl p-6 max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold text-red-600">
              Confirm Delete
            </DialogTitle>
          </DialogHeader>

          <p className="mb-4 text-sm text-gray-700">
            Are you sure you want to delete this user? This action cannot be undone.
          </p>

          <DialogFooter className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={isDeleting}
            >
              Cancel
            </Button>
            <Button
              className="bg-red-600 hover:bg-red-700 text-white"
              onClick={handleDelete}
              disabled={isDeleting}
            >
              {isDeleting ? 'Deleting...' : 'Delete'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
