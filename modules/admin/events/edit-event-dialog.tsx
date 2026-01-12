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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type Props = {
  open: boolean;
  onOpenChange: (bool: boolean) => void;
};
export function EditEventDialog({ open, onOpenChange }: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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
              <Input id="title" name="title" />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="body">Body</Label>
              <Textarea id="body" name="body" cols={7} rows={10} />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Add event</Button>
          </DialogFooter>
        </DialogContent>
      </div>
    </Dialog>
  );
}
