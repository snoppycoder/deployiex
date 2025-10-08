"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Edit, Eye, MoreHorizontal, Trash2 } from "lucide-react";
import { ExpenseRow } from "./types";

export function getExpenseColumns(handlers: {
  onEdit: (id: string) => void;

  onDelete: (id: string) => void;
}): ColumnDef<ExpenseRow>[] {
  const { onEdit, onDelete } = handlers;
  return [
    {
      id: "description",
      header: "Description",
      cell: ({ row }) => {
        return (
          <div className="flex p-2">
            <span className="font-medium">
              {row.original.description ?? "Some description"}
            </span>
          </div>
        );
      },
    },
    {
      id: "categoryName",
      header: "Category",
      cell: ({ row }) => {
        return (
          <div className="flex p-2">
            <span className="font-medium">
              {row.original.categoryName ?? "Some Category"}
            </span>
          </div>
        );
      },
    },
    {
      id: "amount",
      header: "Amount",
      cell: ({ row }) => {
        return (
          <div className="flex p-2">
            <span className="font-medium">${row.original.amount}</span>
          </div>
        );
      },
    },
    {
      id: "date",
      header: "Date",
      cell: ({ row }) => {
        const date = new Date(row.original.date);
        return (
          <div className="flex p-2">
            <span className="font-medium">{date.toLocaleDateString()}</span>
          </div>
        );
      },
    },
    {
      id: "status",
      header: "Status",
      cell: ({ row }) => {
        return (
          <div className="flex p-2">
            <span>{row.original.status}</span>
          </div>
        );
      },
    },
    {
      id: "actions",
      header: () => <div className="text-right">Actions</div>,
      cell: ({ row }) => {
        return (
          <div className="flex justify-between items-center w-full">
            {/* <Button variant="link" onClick={() => onEdit(row.original.id)}>
              <Eye className="h-4 w-4" />
            </Button> */}
            <Button
              variant="link"
              className="cursor-pointer"
              onClick={() => onEdit(row.original.id)}
            >
              <Edit className="h-4 w-4 " />
            </Button>
            <Button
              variant="link"
              className="cursor-pointer"
              onClick={() => onDelete(row.original.id)}
            >
              <Trash2 className="h-4 w-4 text-red-600" />
            </Button>
          </div>
        );
      },
    },
  ];
}
