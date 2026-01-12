"use client";

import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import { AllEvents } from "./all-events";
import { CreateEventDialog } from "./create-event-dialog";
import { cn } from "@/lib/utils";

export function EventsList() {
  const [showEventDialog, setShowEventDialog] = useState<boolean>(false);
  return (
    <div>
      <div className="px-4 py-2 flex items-center justify-between">
        <h1>All events.</h1>
        <Button onClick={() => setShowEventDialog(true)} variant="outline">
          <PlusIcon /> Add
        </Button>
        <div className={cn(!showEventDialog && "hidden")}>
          <CreateEventDialog
            onOpen={showEventDialog}
            onOpenChange={setShowEventDialog}
          />
        </div>
      </div>
      <Separator />
      <AllEvents />
    </div>
  );
}
