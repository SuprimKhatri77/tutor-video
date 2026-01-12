"use client";

import { deleteBlog } from "@/actions/blogs/delete-blog";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

type Props = {
  open: boolean;
  onOpenChange: (bool: boolean) => void;
  blogId: string;
};

export function DeleteBlogDialog({ open, onOpenChange, blogId }: Props) {
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const router = useRouter();
  const handleDelete = async () => {
    if (!blogId) return;
    setIsDeleting(true);
    try {
      const result = await deleteBlog({ blogId });
      if (!result.success) {
        toast.error(result.message);
        return;
      }
      toast.success(result.message);
      router.replace("/admin/blogs");
    } finally {
      setIsDeleting(false);
    }
  };
  return (
    <AlertDialog onOpenChange={onOpenChange} open={open}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? "deleting...." : "Delete"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
