import React from "react";
import { SquareMenu } from "lucide-react";

type AdminHeaderT = {
  openSidebar: boolean;
  setOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>;
};

const AdminHeader = ({ openSidebar, setOpenSidebar }: AdminHeaderT) => {
  return (
    <div className="bg-white border-b border-gray-100 shadow-sm py-4 px-4">
      <SquareMenu
        className="cursor-pointer"
        onClick={() => setOpenSidebar(!openSidebar)}
      />
    </div>
  );
};

export default AdminHeader;
