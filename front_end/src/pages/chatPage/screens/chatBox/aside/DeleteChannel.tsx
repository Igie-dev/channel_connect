import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import BtnsLoaderSpinner from "@/components/loader/BtnLoader";
import DisplayAvatar from "@/components/shared/DisplayAvatar";
import { Trash } from "lucide-react";
import CustomTooltip from "@/components/shared/CustomTooltip";
import { useDeleteChannelMutation } from "@/service/slices/channel/channelApiSlice";
type Props = {
  channelId: string;
  channelAvatarId: string;
  channelName?: string;
  userId: string;
};

export default function DeleteChannel({
  channelId,
  channelName,
  userId,
  channelAvatarId,
}: Props) {
  const [open, setOpen] = useState(false);
  const [deleteChannel, { isLoading, error }] = useDeleteChannelMutation();
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const res: any = await deleteChannel({
        channelId,
        userId,
      });
      if (res?.data) {
        setOpen(false);
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any, no-empty
    } catch (error: any) {}
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="icon" variant="outline">
          <CustomTooltip title="Delete channel">
            <Trash size={20} />
          </CustomTooltip>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader className="items-center">
            <DialogTitle>Delete channel</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this channel
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col items-center justify-center gap-2 my-5">
            <div className="w-16 h-16 overflow-hidden border rounded-full">
              <DisplayAvatar id={channelAvatarId} />
            </div>
            <span className="w-full font-normal text-center truncate text-medium">
              {channelName}
            </span>
            <p className="text-sm text-destructive">{error?.data?.message}</p>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? <BtnsLoaderSpinner /> : "Delete"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
