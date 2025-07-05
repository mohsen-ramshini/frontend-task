'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useGetUserById } from '@/features/profile/api/useGetUserById';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { UserProfileProps } from "../types/profile"
import Image from 'next/image';


export const UserProfile: React.FC<UserProfileProps> = ({ id }) => {
  const { data: user, isLoading, isError } = useGetUserById(id);
  const router = useRouter();

  return (
    <div className="max-w-xl mx-auto mt-10 space-y-6 px-4">
      {/* Back Button */}
      {isLoading && (
        <div className="absolute inset-0 bg-black/20 flex items-center justify-center z-50 backdrop-blur-sm h-screen">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>
      )}
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
        {user?.avatar ? (
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
            {user?.first_name} {user?.last_name}
          </h2>
          <p className="text-gray-600 text-sm">{user?.email}</p>
        </div>
      </div>
    </div>
  );
};
