"use client"

import { useEffect, useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export const events: {title: string, date: string, description: string}[] = [{"title":"New A1 Batch Starting","date":"15 March 2026","description":"Beginner-friendly German language batch focusing on basic grammar, vocabulary, and speaking practice."},{"title":"Free Demo Class","date":"10 March 2026","description":"Join a free live demo session to understand the teaching style and course structure."},{"title":"A2 Grammar Revision Workshop","date":"22 March 2026","description":"Intensive revision session covering key A2 grammar topics with practical examples."}]


export default function UpcomingEventsDialog() {
  const [open, setOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const shown = localStorage.getItem("popup_shown")

    if (!shown) {
      localStorage.setItem("popup_shown", "1")
      setTimeout(() => {
        setOpen(true)
      }, 0);
    }
  }, [])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className="
          max-w-2xl
          w-[95vw]
          max-h-[85vh]
          overflow-y-auto
          p-6
        "
      >
        <DialogHeader className="mb-4 text-center">
          <DialogTitle className="text-2xl font-bold">
            Upcoming Events
          </DialogTitle>
          <p className="text-sm text-muted-foreground">
            Upcoming German language classes & sessions
          </p>
        </DialogHeader>

        {/* Event List */}
        <div className="space-y-3">
          {events.length === 0 && (
            <p className="text-center text-muted-foreground">
              No upcoming events available.
            </p>
          )}

          {events.map((event, index) => (
            <div
              key={index}
              className="
                flex items-center justify-between
                rounded-lg border px-4 py-3
                hover:bg-muted/40 transition
              "
            >
              <div>
                <p className="font-medium leading-tight">
                  {event.title}
                </p>
                <p className="text-sm text-muted-foreground">
                  {event.date}
                </p>
              </div>

              <Button
                size="sm"
                variant="outline"
                onClick={() => router.push("/upcoming-events")}
              >
                See more
              </Button>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}
