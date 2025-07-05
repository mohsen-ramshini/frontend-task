'use client';

import React, { useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const formSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  job: z.string().min(1, 'Job title is required'),
});

type FormValues = z.infer<typeof formSchema>;

interface EditUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: FormValues) => void;
  isLoading?: boolean;
  initialData: {
    name: string;
    job: string;
  };
}

export const EditUserModal: React.FC<EditUserModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  isLoading,
  initialData,
}) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });

  useEffect(() => {
    if (isOpen) {
      form.reset(initialData);
    }
  }, [isOpen, initialData]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="rounded-2xl shadow-xl p-6 space-y-4 max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-gray-800">Edit User</DialogTitle>
        </DialogHeader>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4"
          onClick={e => e.stopPropagation()}
        >
          <div>
            <Input
              placeholder="Full name"
              {...form.register('name')}
              className="text-base"
            />
            {form.formState.errors.name && (
              <p className="text-sm text-red-500 mt-1">{form.formState.errors.name.message}</p>
            )}
          </div>

          <div>
            <Input
              placeholder="Job title"
              {...form.register('job')}
              className="text-base"
            />
            {form.formState.errors.job && (
              <p className="text-sm text-red-500 mt-1">{form.formState.errors.job.message}</p>
            )}
          </div>

          <DialogFooter className="pt-2">
            <Button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white text-base py-2 rounded-xl transition"
              disabled={isLoading}
            >
              {isLoading ? 'Updating...' : 'Update'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
