import { ColumnDef } from "@tanstack/react-table";
import { UserActions } from "./user-actions";
import type { User } from "../../types/user";

export const userColumns: ColumnDef<User, unknown>[] = [
  {
    id: "avatar",
    header: "Avatar",
    cell: ({ row }) => (
      <img
        src={row.original.avatar}
        alt={`${row.original.first_name} ${row.original.last_name}`}
        className="w-10 h-10 rounded-full object-cover border"
      />
    ),
  },
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "first_name",
    header: "First Name",
  },
  {
    accessorKey: "last_name",
    header: "Last Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <UserActions user={row.original} />,
  },
];
