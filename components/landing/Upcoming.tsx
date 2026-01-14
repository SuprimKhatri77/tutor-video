"use client";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { getXEvents } from "@/helpers/events/get-x-events";

export default function UpcomingEventsDialog() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const shown = localStorage.getItem("popup_shown");

    if (!shown) {
      localStorage.setItem("popup_shown", "1");
      setTimeout(() => {
        setOpen(true);
      }, 1000);
    }
  }, []);

  const formatTime = (dateString: string | Date) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const { data: events, isPending } = useQuery({
    queryKey: ["latest-events"],
    queryFn: () => getXEvents(2).then((res) => res),
    staleTime: 1000 * 60 * 60,
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className="
          cursor-pointer
          max-w-2xl
          w-[95vw]
          max-h-[85vh]
          overflow-y-auto
          p-6
        "
      >
        {/* Actual Header */}
        <DialogHeader className="mb-4 text-center">
          <DialogTitle className="text-2xl font-bold">
            Upcoming Events
          </DialogTitle>
          <p className="text-sm text-muted-foreground">
            Upcoming German language classes & sessions
          </p>
        </DialogHeader>
        {isPending ? (
          <>
            {/* Skeleton Events */}
            <div className="space-y-3">
              {Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={index}
                  className="
                    flex items-center justify-between
                    rounded-lg border px-4 py-3
                  "
                >
                  <div className="space-y-2">
                    <div className="h-4 w-48 rounded bg-muted animate-pulse" />
                    <div className="h-3 w-32 rounded bg-muted animate-pulse" />
                  </div>
                  <div className="h-4 w-4 rounded-full bg-muted animate-pulse" />
                </div>
              ))}
            </div>

            {/* Skeleton Footer */}
            <DialogFooter className="pt-4">
              <div className="h-9 w-28 rounded bg-muted animate-pulse" />
            </DialogFooter>
          </>
        ) : (
          <>
            {/* Actual Event List */}
            <div className="space-y-3">
              {events && events.length === 0 && (
                <p className="text-center text-muted-foreground">
                  No upcoming events available.
                </p>
              )}
              {events &&
                events.length > 0 &&
                events.map((event, index) => (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6 * index }}
                    key={`${event.title}-is-coming`}
                    className="
                      flex items-center justify-between
                      rounded-lg border px-4 py-3
                      hover:bg-muted/40 transition
                    "
                    onClick={() => router.push("/upcoming-events")}
                  >
                    <div>
                      <p className="font-medium leading-tight">{event.title}</p>
                      {event.eventDate && (
                        <p className="text-sm text-muted-foreground">
                          {formatTime(event.eventDate)}
                        </p>
                      )}
                    </div>
                  </motion.div>
                ))}
            </div>

            {/* Actual Footer */}
            <DialogFooter>
              <Button
                size="sm"
                className="bg-blue-600 text-white hover:bg-blue-700 transition-all duration-300 ease-linear"
                onClick={() => router.push("/upcoming-events")}
              >
                See more
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
