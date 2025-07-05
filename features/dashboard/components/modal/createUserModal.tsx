'use client';

import React from 'react';
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
import { useCreateUser } from '@/features/dashboard/api/use-create-user';

const formSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  job: z.string().min(1, 'Job title is required'),
});

type FormValues = z.infer<typeof formSchema>;

export const CreateUserModal = () => {
  const [open, setOpen] = React.useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: '', job: '' },
  });

  const createUser = useCreateUser();

  const onSubmit = (values: FormValues) => {
    createUser.mutate(values, {
      onSuccess: () => {
        form.reset();
        setOpen(false);
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setOpen(true)} className="rounded-xl px-4 py-2 text-sm font-medium">
          Create User
        </Button>
      </DialogTrigger>

      <DialogContent className="rounded-2xl shadow-xl p-6 space-y-4 max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-gray-800">
            Create New User
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Input
              placeholder="Full name"
              {...form.register('name')}
              className="text-base"
            />
            {form.formState.errors.name && (
              <p className="text-sm text-red-500 mt-1">
                {form.formState.errors.name.message}
              </p>
            )}
          </div>

          <div>
            <Input
              placeholder="Job title"
              {...form.register('job')}
              className="text-base"
            />
            {form.formState.errors.job && (
              <p className="text-sm text-red-500 mt-1">
                {form.formState.errors.job.message}
              </p>
            )}
          </div>

          <DialogFooter className="pt-2">
            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white text-base py-2 rounded-xl transition"
              disabled={createUser.isPending}
            >
              {createUser.isPending ? 'Creating...' : 'Create'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
