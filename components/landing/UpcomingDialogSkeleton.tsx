import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export const UpcomingEventsDialogSkeleton = ({ open }: { open: boolean }) => {
  return (
    <Dialog open={open}>
      <DialogContent
        className="
          max-w-2xl
          w-[95vw]
          max-h-[85vh]
          overflow-y-auto
          p-6
        "
      >
        {/* Header */}
        <DialogHeader className="mb-6 text-center space-y-3">
          <DialogTitle className="text-2xl font-bold animate-pulse rounded-md">
            <div className="h-7 w-56 mx-auto rounded bg-muted animate-pulse" />
          </DialogTitle>
          <div className="h-4 w-72 mx-auto rounded bg-muted animate-pulse" />
        </DialogHeader>

        {/* Event */}
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

        {/* Footer */}
        <DialogFooter className="pt-4">
          <div className="h-9 w-28 rounded bg-muted animate-pulse" />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
