"use client";

import { deleteEvent } from "@/actions/upcoming-events/delete-event";
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
import { Spinner } from "@/components/ui/spinner";
import { DeleteEventInput } from "@/utils/validators/event.validator";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type Props = {
  open: boolean;
  onOpenChange: (bool: boolean) => void;
  eventId: string;
};
export function DeleteEventAlertDialog({ open, onOpenChange, eventId }: Props) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate, isPending, reset } = useMutation({
    mutationFn: async (input: DeleteEventInput) => {
      const result = await deleteEvent(input);
      return result;
    },
    onSuccess: (result) => {
      if (!result.success) {
        toast.error(result.message);
        reset();
        return;
      }
      queryClient.invalidateQueries({ queryKey: ["all-events"] });
      toast.success(result.message);
      router.replace("/admin/events");
      onOpenChange(false);
      reset();
    },
    onError: (error) => {
      toast.error(error.message || "Something went wrong.");
      reset();
    },
  });
  const handleDelete = () => {
    mutate({ eventId });
  };
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the event
            record from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isPending}
          >
            {isPending ? <Spinner /> : "continue"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
