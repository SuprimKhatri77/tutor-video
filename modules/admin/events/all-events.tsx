"use client";
import { Spinner } from "@/components/ui/spinner";
import { getAllEvents } from "@/dal/events/get-all-events";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

export function AllEvents() {
  const { data: events, isPending } = useQuery({
    queryKey: ["all-events"],
    queryFn: () => getAllEvents().then((res) => res),
    staleTime: 1000 * 60 * 1,
  });

  const formatDate = (date: Date | string | null | undefined) => {
    if (!date) return "Date TBA";

    const d = date instanceof Date ? date : new Date(date);

    if (Number.isNaN(d.getTime())) {
      return "Date TBA";
    }

    return new Intl.DateTimeFormat("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(d);
  };

  return isPending ? (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <Spinner />
    </div>
  ) : (
    <div className="min-h-screen bg-white">
      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-black mb-2">
            Upcoming Events
          </h1>
          <div className="h-1 w-20 bg-black"></div>
        </div>

        {events && events.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {events.map((event) => (
              <div
                key={event.id}
                className="border-2 border-black p-6 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all duration-200"
              >
                {/* Event Date */}
                {event.eventDate && (
                  <div className="text-sm font-bold text-gray-600 mb-2">
                    {formatDate(event.eventDate)}
                  </div>
                )}

                {/* Title */}
                <h2 className="text-xl font-bold text-black mb-4">
                  {event.title}
                </h2>

                {/* See More Link */}
                <Link
                  href={`/admin/events/${event.id}`}
                  className="inline-block bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 text-sm font-bold  transition-colors"
                >
                  See More →
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="inline-block border-2 border-black p-12">
              <p className="text-2xl font-bold text-black mb-2">
                NO EVENTS FOUND
              </p>
              <p className="text-gray-600">
                There are currently no upcoming events.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
