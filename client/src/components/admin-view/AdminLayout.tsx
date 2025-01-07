import { useState } from "react";
import { Outlet } from "react-router-dom";
import AdminHeader from "./AdminHeader";
import AdminSideBar from "./AdminSideBar";

const AdminLayout = () => {
  const [openSidebar, setOpenSidebar] = useState(false);
  return (
    <div className="flex min-h-screen w-full h-auto">
      <AdminSideBar openSidebar={openSidebar} />

      <main className="flex flex-col gap-2 max-h-screen w-full overflow-y-hidden">
        <AdminHeader
          openSidebar={openSidebar}
          setOpenSidebar={setOpenSidebar}
        />
        <div className="px-4">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
