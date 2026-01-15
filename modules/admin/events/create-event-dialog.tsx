import { createEvent } from "@/actions/upcoming-events/create-event";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { UpcomingEventsSelectType } from "@/db/schema";
import {
  CreateEventInput,
  CreateEventResponse,
} from "@/utils/validators/event.validator";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

type Props = {
  onOpen: boolean;
  onOpenChange: (bool: boolean) => void;
};
export function CreateEventDialog({ onOpen, onOpenChange }: Props) {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    title: "",
    body: "",
    eventDate: "",
  });
  const [errors, setErrors] = useState<CreateEventResponse["errors"]>({});
  const { mutate, isPending, reset } = useMutation({
    mutationFn: async (input: CreateEventInput) => {
      const result = await createEvent(input);
      return result;
    },
    onMutate: async (data: CreateEventInput) => {
      await queryClient.cancelQueries({ queryKey: ["all-events"] });

      const previousEvents = queryClient.getQueryData(["all-events"]);

      const optimisticId = crypto.randomUUID();
      const optimisticEvent: UpcomingEventsSelectType = {
        id: optimisticId,
        title: data.title,
        body: data.body,
        eventDate: data.eventDate || null,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      queryClient.setQueryData<UpcomingEventsSelectType[]>(
        ["all-events"],
        (old) => (old ? [...old, optimisticEvent] : [optimisticEvent])
      );
      return { previousEvents, optimisticId };
    },
    onSuccess: (result, formData, context) => {
      if (!result.success) {
        if (result.errors) {
          queryClient.setQueryData(["all-events"], context.previousEvents);
          onOpenChange(true);
          setErrors(result.errors);
        }
        queryClient.setQueryData(
          ["all-events"],
          (old: UpcomingEventsSelectType[]) => {
            if (!old) return old;
            return old.map((event) =>
              event.id === context.optimisticId ? result.data : event
            );
          }
        );
        setFormData({ title: "", body: "", eventDate: "" });
        toast.success(result.message);
        reset();
        return;
      }
      toast.success(result.message);
      queryClient.invalidateQueries({ queryKey: ["all-events"] });
      reset();
    },
    onError: (error, formData, context) => {
      queryClient.setQueryData(["all-events"], context?.previousEvents);
      toast.error(error.message || "Something went wrong.");
      reset();
    },
  });

  const handleCreate = () => {
    mutate({
      ...formData,
      eventDate: formData.eventDate ? new Date(formData.eventDate) : undefined,
    });
    onOpenChange(false);
  };
  return (
    <Dialog open={onOpen} onOpenChange={onOpenChange}>
      <div>
        <DialogContent className="sm:max-w-106.25">
          <DialogHeader>
            <DialogTitle>Add a new event</DialogTitle>
            <DialogDescription>
              Write whats the event is about.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />
              {errors?.properties?.title && (
                <FieldError>{errors.properties.title[0]}</FieldError>
              )}
            </div>
            <div className="grid gap-3">
              <Label htmlFor="body">Body</Label>
              <Textarea
                id="body"
                name="body"
                value={formData.body}
                onChange={(e) =>
                  setFormData({ ...formData, body: e.target.value })
                }
              />
              {errors?.properties?.body && (
                <FieldError>{errors.properties.body[0]}</FieldError>
              )}
            </div>
            <div className="grid gap-3">
              <Label htmlFor="event-date">Event Date</Label>
              <Input
                type="date"
                name="date"
                id="date"
                value={formData.eventDate}
                onChange={(e) =>
                  setFormData({ ...formData, eventDate: e.target.value })
                }
              />
              {errors?.properties?.eventDate && (
                <FieldError>{errors.properties.eventDate[0]}</FieldError>
              )}
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" disabled={isPending}>
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" onClick={handleCreate} disabled={isPending}>
              Add event
            </Button>
          </DialogFooter>
        </DialogContent>
      </div>
    </Dialog>
  );
}
