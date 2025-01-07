import {
  LayoutDashboard,
  Box,
  ClipboardList,
  ChartNoAxesCombined,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const sideItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    path: "/admin/dashboard",
    icon: <LayoutDashboard />,
  },
  {
    id: "products",
    label: "Products",
    path: "/admin/products",
    icon: <Box />,
  },
  {
    id: "orders",
    label: "Orders",
    path: "/admin/orders",
    icon: <ClipboardList />,
  },
];

const AdminSideBar = ({ openSidebar }: { openSidebar: boolean }) => {
  return (
    <div
      className={`w-[15rem] flex flex-col gap-2 lg:gap-4 py-3 shadow-lg border-r border-gray-200  transition-all duration-300 ease-in-out transform  ${
        openSidebar ? "w-[5rem]" : "w-[15rem]"
      }`}
    >
      <div
        className={`flex px-4 ${
          openSidebar ? "items-center" : "items-start gap-2"
        }`}
      >
        <ChartNoAxesCombined className={openSidebar ? "w-full" : ""} />
        {!openSidebar && (
          <h2 className="text-sm text-center lg:text-lg font-extrabold">
            Admin Panel
          </h2>
        )}
      </div>

      <div
        className={`flex flex-col w-full  py-2 ${
          openSidebar ? "items-center" : "items-start"
        }`}
      >
        {sideItems.map((item) => (
          <NavLink
            to={item.path}
            key={item.id}
            className={({ isActive }) =>
              `flex gap-2 cursor-pointer w-full py-3 px-4 ${
                isActive ? "bg-blue-400 text-white" : ""
              }`
            }
          >
            {item.icon}
            {!openSidebar && item.label}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default AdminSideBar;
