"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { DeleteBlogDialog } from "./delete-blog-dialog";

export function DeleteBlog({ blogId }: { blogId: string }) {
  const [showDeleteDialog, setShowDeleteDialog] = useState<boolean>(false);
  return (
    <>
      <Button
        className="px-6 py-6"
        onClick={() => {
          setShowDeleteDialog(true);
        }}
        variant="destructive"
      >
        Delete Blog
      </Button>
      {showDeleteDialog && (
        <DeleteBlogDialog
          open={showDeleteDialog}
          onOpenChange={setShowDeleteDialog}
          blogId={blogId}
        />
      )}
    </>
  );
}
