import {
  LayoutDashboard,
  Box,
  ClipboardList,
  ChartNoAxesCombined,
} from "lucide-react";

const sideItems = [
  {
    title: "Dashboard",
    icon: <LayoutDashboard />,
  },
  {
    title: "Products",
    icon: <Box />,
  },
  {
    title: "Orders",
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

      <ul
        className={`flex flex-col gap-6 w-full bg-green-300 px-4 py-2 ${
          openSidebar ? "items-center" : "items-start"
        }`}
      >
        {sideItems.map((item) => (
          <li key={item.title} className="flex gap-2 cursor-pointer">
            {item.icon}
            {!openSidebar && item.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminSideBar;
