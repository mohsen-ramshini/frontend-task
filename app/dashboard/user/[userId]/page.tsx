import { UserProfile } from "@/features/profile/components/UserProfile";
import { use } from "react";


export const dynamic = "force-dynamic";

interface Params {
  userId: string;
}

export default function UserPage({ params }: { params: Promise<Params> }) {
  const { userId } = use(params);
  if (isNaN(Number(userId))) {
    throw new Error("Invalid userId");
  }

  return (
      <div className="p-4 min-h-screen overflow-auto">
        <h1 className="text-2xl font-bold mb-4">User Profile</h1>
        <UserProfile id={Number(userId)} />
      </div>
  );

}
