import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { ReactNode } from "react";

type DialogT = {
  triggerBtn: ReactNode;
  actionBtns?: ReactNode;
  closeBtns?: ReactNode;
};

const DeleteDialog = ({ triggerBtn, actionBtns, closeBtns }: DialogT) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{triggerBtn}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete from your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex flex-col md:flex-row gap-2">
          <DialogClose asChild>{closeBtns}</DialogClose>
          <DialogClose>{actionBtns}</DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteDialog;
