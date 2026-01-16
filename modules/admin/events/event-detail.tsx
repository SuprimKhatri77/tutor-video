"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import Link from "next/link";
import { UpcomingEventsSelectType } from "@/db/schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editEvent } from "@/actions/upcoming-events/edit-event";
import {
  EditEventInput,
  EditEventResponse,
} from "@/utils/validators/event.validator";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";
import { DeleteEventAlertDialog } from "./delete-event-alert-dialog";
import { cn } from "@/lib/utils";
import { FieldError } from "@/components/ui/field";
import { useRouter } from "next/navigation";

type Props = {
  event: UpcomingEventsSelectType;
};
export default function EventDetailPage({ event }: Props) {
  const queryClient = useQueryClient();

  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [title, setTitle] = useState(event.title);
  const [body, setBody] = useState(event.body);
  const [eventDate, setEventDate] = useState(
    event.eventDate ? event.eventDate.toISOString().split("T")[0] : ""
  );
  const [errors, setErrors] = useState<EditEventResponse["errors"]>();
  const router = useRouter();

  const formatDate = (date: Date) => {
    if (!date) return "Date TBA";
    return new Intl.DateTimeFormat("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      // hour: "2-digit",
      // minute: "2-digit",
    }).format(new Date(date));
  };

  const formatTimestamp = (date: Date) => {
    if (!date) return "N/A";
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      // hour: "2-digit",
      // minute: "2-digit",
    }).format(new Date(date));
  };

  const handleCancel = () => {
    setTitle(event.title);
    setBody(event.body);
    setEventDate(
      event.eventDate ? event.eventDate.toISOString().slice(0, 16) : ""
    );
    setIsEditing(false);
  };

  const { mutate, isPending, reset } = useMutation({
    mutationFn: async (input: EditEventInput) => {
      const result = await editEvent(input);
      return result;
    },
    onSuccess: (result) => {
      if (!result.success) {
        if (result.errors) {
          setErrors(result.errors);
        }
        setIsEditing(false);
        toast.error(result.message);
        setErrors({});
        reset();
        return;
      }
      queryClient.invalidateQueries({ queryKey: ["all-events"] });
      router.refresh();
      setIsEditing(false);
      toast.success(result.message);
      reset();
    },
    onError: (error) => {
      toast.error(error.message || "Something went wrong.");
    },
  });

  const handleSave = () => {
    mutate({
      title,
      body,
      eventDate: eventDate ? new Date(eventDate) : undefined,
      id: event.id,
    });
  };

  return (
    <div inert={isPending} className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <Link
          href="/admin/events"
          className="inline-flex items-center text-black font-bold mb-8 hover:underline"
        >
          ← Back to Events
        </Link>

        {/* Event Card */}
        <div className="border-2 border-black p-8">
          {isEditing ? (
            <div className="space-y-6">
              {/* Edit Event Date */}
              <div>
                <label className="block text-sm font-bold text-black mb-2">
                  Event Date
                </label>
                <Input
                  type="date"
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  className="border-2 border-black focus:ring-2 focus:ring-black"
                />
                {errors?.properties?.eventDate && (
                  <FieldError>{errors.properties.eventDate[0]}</FieldError>
                )}
              </div>

              {/* Edit Title */}
              <div>
                <label className="block text-sm font-bold text-black mb-2">
                  Title
                </label>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="border-2 border-black text-xl font-bold focus:ring-2 focus:ring-black"
                />
                {errors?.properties?.title && (
                  <FieldError>{errors.properties.title[0]}</FieldError>
                )}
              </div>

              {/* Edit Body */}
              <div>
                <label className="block text-sm font-bold text-black mb-2">
                  Description
                </label>
                <Textarea
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  rows={8}
                  className="border-2 border-black text-lg focus:ring-2 focus:ring-black"
                />
                {errors?.properties?.body && (
                  <FieldError>{errors.properties.body[0]}</FieldError>
                )}
              </div>

              {/* Save/Cancel Buttons */}
              <div className="flex gap-3 pt-4">
                <Button
                  onClick={handleSave}
                  disabled={isPending}
                  className="bg-black text-white px-6 py-2 font-bold hover:bg-gray-800 border-2 border-black"
                >
                  {isPending ? <Spinner /> : "Save Changes"}
                </Button>
                <Button
                  onClick={handleCancel}
                  variant="outline"
                  className="bg-white text-black px-6 py-2 font-bold border-2 border-black hover:bg-gray-100"
                >
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <div>
              {/* Event Date Badge */}
              {event.eventDate && (
                <div className="inline-block bg-black text-white px-4 py-2 text-sm font-bold mb-4">
                  {formatDate(event.eventDate)}
                </div>
              )}

              {/* Title */}
              <h1 className="text-3xl font-bold text-black mb-4">{title}</h1>

              {/* Body */}
              <p className="text-gray-800 text-lg leading-relaxed mb-6 whitespace-pre-wrap">
                {body}
              </p>

              {/* Metadata */}
              <div className="flex items-center gap-6 text-sm text-gray-600 mb-6 pb-6 border-b border-gray-200">
                <div>
                  <span className="font-semibold text-black">Created:</span>{" "}
                  {formatTimestamp(event.createdAt)}
                </div>
                {event.updatedAt && (
                  <div>
                    <span className="font-semibold text-black">Updated:</span>{" "}
                    {formatTimestamp(event.updatedAt)}
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button
                  onClick={() => setIsEditing(true)}
                  className="bg-black text-white px-6 py-2 font-bold hover:bg-gray-800 border-2 border-black"
                >
                  Edit
                </Button>
                <Button
                  onClick={() => setShowDeleteDialog(true)}
                  variant="outline"
                  className="bg-white text-black px-6 py-2 font-bold border-2 border-black hover:bg-black hover:text-white"
                >
                  Delete
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className={cn(!showDeleteDialog && "hidden")}>
        <DeleteEventAlertDialog
          eventId={event.id}
          open={showDeleteDialog}
          onOpenChange={setShowDeleteDialog}
        />
      </div>
    </div>
  );
}
