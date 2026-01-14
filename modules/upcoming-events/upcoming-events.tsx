"use client";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock } from "lucide-react";
import { LocalTypewriter } from "@/components/TypingComponent";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { getAllEvents } from "@/dal/events/get-all-events";
import { toast } from "sonner";
import { UpcomingEventsSelectType } from "@/db/schema";
import EventSkeleton from "./event-skeleton";

export const EventsPage = () => {
  const { data: events, isPending } = useQuery({
    queryKey: ["all-events"],
    queryFn: () => getAllEvents().then((res) => res),
    staleTime: 1000 * 60 * 60,
  });
  const formatTime = (dateString: string | Date) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const addToCalendar = (event: UpcomingEventsSelectType) => {
    if (!event.eventDate) {
      toast.info("Cannot add this event.");
      toast.info("The event's Date is yet to be set.");
      return;
    }
    //  we can check click but don't know about user has added or not to calendar so, put as it is
    const eventDate = new Date(event.eventDate);
    const endDate = new Date(eventDate.getTime() + 60 * 60 * 1000);

    const formatCalendarDate = (date: Date) => {
      return date.toISOString().replace(/-|:|\.\d\d\d/g, "");
    };
    // google calendar url to navigate the user
    const calendarUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      event.title
    )}&dates=${formatCalendarDate(eventDate)}/${formatCalendarDate(
      endDate
    )}&details=${encodeURIComponent(event.body || "")}&sf=true&output=xml`;

    window.open(calendarUrl, "_blank");
  };

  return (
    <div className="min-h-screen bg-background px-6 py-16 md:py-24">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 max-w-2xl pt-10 md:pt-0">
          <Badge className=" mb-3">Upcoming Events</Badge>

          <p className="text-muted-foreground text-lg leading-relaxed">
            Discover and register for upcoming events for students applying to{" "}
            <LocalTypewriter
              text="Germany"
              className="font-medium text-red-500"
            />
          </p>
        </div>
        {isPending && <EventSkeleton />}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {!isPending && events && events.length === 0 && (
            /* show when no event are added in db  */

            <div className="text-center py-12">
              <Clock className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">No upcoming events</h3>
              <p className="text-muted-foreground">
                Check back later for new events
              </p>
            </div>
          )}
          {!isPending &&
            events &&
            events.length > 0 &&
            events.map((event, index) => (
              <Card
                key={index}
                className="flex flex-col h-full hover:shadow-lg transition-shadow"
              >
                <CardHeader>
                  {event.eventDate && (
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                        <Calendar className="h-4 w-4" />
                        <span>{formatTime(event.eventDate)}</span>
                      </div>
                    </div>
                  )}
                  <CardTitle className="text-xl">{event.title}</CardTitle>
                  {event.body && (
                    <CardDescription className="mt-2 line-clamp-3">
                      {event.body}
                    </CardDescription>
                  )}
                </CardHeader>

                <CardFooter className="mt-auto pt-6 flex flex-col gap-3">
                  {/* the following btn navigate the user to google calendar events addition with dynamic date, title, optional description */}
                  <Button
                    onClick={() => addToCalendar(event)}
                    className="w-full bg-blue-600  text-white"
                    variant="outline"
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    Add to Calendar
                  </Button>
                </CardFooter>
              </Card>
            ))}
        </div>
      </div>
    </div>
  );
};
