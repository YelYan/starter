import { Outlet } from "react-router-dom";
import ShoppingHeader from "./ShoppingHeader";

const ShoppingLayout = () => {
  return (
    <div className="flex flex-col">
      <ShoppingHeader />
      <div className="p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default ShoppingLayout;
