import React from "react";
import { SquareMenu } from "lucide-react";
import { LogOut } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { ToastAction } from "@/components/ui/toast";
import { useNavigate } from "react-router-dom";

import { useAppDispatch } from "@/store/hook";
import { logoutUser } from "@/store/authslice/authSlice";

type AdminHeaderT = {
  openSidebar: boolean;
  setOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>;
};

const AdminHeader = ({ openSidebar, setOpenSidebar }: AdminHeaderT) => {
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const navigate = useNavigate();

  function handleLogOut() {
    dispatch(logoutUser())
      .unwrap()
      .then((result) => {
        if (result.success) {
          toast({
            title: result.message,
            description: "You have successfully logged out✅",
          });
          navigate("/auth/login");
        }
      })
      .catch((error) => {
        toast({
          title: error,
          description: "You cannot logg out! some error occured",
          variant: "destructive",
          action: (
            <ToastAction className="bg-white text-black" altText="Try again">
              Try again
            </ToastAction>
          ),
        });
      });
  }
  return (
    <div className="bg-white border-b border-gray-100 shadow-sm py-4 px-4 flex items-center justify-between sticky top-0">
      <SquareMenu
        className="cursor-pointer"
        onClick={() => setOpenSidebar(!openSidebar)}
      />
      <Button
        className="cursor-pointer flex items-center gap-2 h-8 px-2 bg-blue-500 hover:bg-blue-400"
        onClick={handleLogOut}
      >
        <LogOut className="w-5 h-5" />
        Log out
      </Button>
    </div>
  );
};

export default AdminHeader;
