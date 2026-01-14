"use client"

import { useEffect, useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import {  motion } from "framer-motion"
import { UpcomingEventsDialogSkeleton } from "./UpcomingDialogSkeleton"
import { getEvents } from "@/app/upcoming-events/page"

export const events: EventType[] = [{"title":"New A1 Batch Starting","date":"15 March 2026","description":"Beginner-friendly German language batch focusing on basic grammar, vocabulary, and speaking practice."},{"title":"Free Demo Class","date":"10 March 2026","description":"Join a free live demo session to understand the teaching style and course structure."},{"title":"A2 Grammar Revision Workshop","date":"22 March 2026","description":"Intensive revision session covering key A2 grammar topics with practical examples."}]
export type EventType = {title: string, date: string, description: string}

export default function UpcomingEventsDialog() {
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [events, setEvents] = useState<EventType[]>([])
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


  // Fetch events from server
  useEffect(() => {
    async function fetchEvents() {
      try {
        setIsLoading(true)
        const data: EventType[] = await getEvents() // call the func to fetch the events data 
        setEvents(data)
      } catch (err) {
        console.error("Failed to fetch events:", err)
        setEvents([])
      } finally {
        setIsLoading(false)
      }
    }

    if (open) fetchEvents()
  }, [open])

  return ( 
    <>
    { isLoading ?  <UpcomingEventsDialogSkeleton open={true} /> : (
      
    <Dialog open={open} onOpenChange={setOpen}>
    
        {open && (
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

          {events.slice(0,3).map((event, index) => (
            <motion.div
              initial={{opacity: 0}}
              animate={{opacity: 1}}
              transition={{duration: 0.6 * index}}
              key={`${event.title}-is-coming`}
              className="
                flex items-center justify-between
                rounded-lg border px-4 py-3
                hover:bg-muted/40 transition
              "
                onClick={() => router.push("/upcoming-events")}

            >
              <div>
                <p className="font-medium leading-tight">
                  {event.title}
                </p>
                <p className="text-sm text-muted-foreground">
                  {event.date}
                </p>
              </div>

             
            </motion.div>
          ))}
        </div>
      <DialogFooter>
         <Button
                size="sm"
                className="bg-blue-600 text-white"
                onClick={() => router.push("/upcoming-events")}
              >
                See more
              </Button>
      </DialogFooter>
      </DialogContent>
        )}

    </Dialog>
    )}
   </>
  )
}
