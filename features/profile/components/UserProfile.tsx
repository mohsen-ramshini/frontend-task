'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useGetUserById } from '@/features/profile/api/useGetUserById';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';

interface UserProfileProps {
  id: number;
}

export const UserProfile: React.FC<UserProfileProps> = ({ id }) => {
  const { data: user, isLoading, isError } = useGetUserById(id);
  const router = useRouter();

  if (isLoading) {
    return (
      <div className="space-y-4 max-w-md mx-auto mt-8">
        <Skeleton className="w-32 h-6" />
        <Skeleton className="w-full h-32 rounded-xl" />
        <Skeleton className="w-full h-6" />
        <Skeleton className="w-1/2 h-6" />
      </div>
    );
  }

  if (isError || !user) {
    return (
      <div className="text-red-500 font-medium text-center mt-10">
        Failed to load user data.
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto mt-10 space-y-6 px-4">
      {/* Back Button */}
      <Button
        variant="ghost"
        onClick={() => router.back()}
        className="flex items-center gap-2 text-gray-600 hover:text-black"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </Button>

      {/* Card */}
      <div className="bg-white rounded-2xl shadow-md p-6 flex items-center gap-6">
        {user.avatar ? (
        <Image
            src={user.avatar}
            alt="User avatar"
            width={80}
            height={80}
            className="rounded-full border object-cover"
        />
        ) : (
        <div className="w-20 h-20 rounded-full border bg-gray-200 flex items-center justify-center text-gray-500 text-sm">
            No image
        </div>
        )}

        <div className="space-y-2">
          <h2 className="text-2xl font-semibold text-gray-800">
            {user.first_name} {user.last_name}
          </h2>
          <p className="text-gray-600 text-sm">{user.email}</p>
        </div>
      </div>
    </div>
  );
};
