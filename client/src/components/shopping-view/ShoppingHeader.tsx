import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, UserCog, LogOut, ShoppingCart } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "../ui/toast";

import Logo from "/favicon.svg";
import DefaultPic from "/default-pic.png";
import { useAppSelector, useAppDispatch } from "@/store/hook";
import { logoutUser } from "@/store/authslice/authSlice";
import { shoppingHeaderMenuItems } from "@/config";
import UserCartWrapper from "./UserCartWrapper";

type MenuItemsT = Record<"id" | "label" | "path", string>;

const MenuItems = () => {
  function handleNavigate(menuItems: MenuItemsT) {
    console.log(menuItems);
  }
  return (
    <div className="flex flex-col lg:flex-row gap-4">
      {shoppingHeaderMenuItems.map((menuItems) => (
        <Label key={menuItems.id} onClick={() => handleNavigate(menuItems)}>
          {menuItems.label}
        </Label>
      ))}
    </div>
  );
};

const HeaderRightContent = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const [openCartSheet, setOpenCartSheet] = useState(false);

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
    <div className="flex items-center gap-4">
      <Sheet
        open={openCartSheet}
        onOpenChange={() => setOpenCartSheet(!openCartSheet)}
      >
        <SheetTrigger asChild>
          <Button
            variant={"outline"}
            size={"icon"}
            className="border-none bg-white relative"
          >
            <ShoppingCart className="cursor-pointer" />
            <span className="bg-red-500 absolute top-0 -right-1 text-white text-xs py-0 px-1 rounded">
              29
            </span>
            <span className="sr-only">User cart</span>
          </Button>
        </SheetTrigger>
        <UserCartWrapper setOpenCartSheet={setOpenCartSheet} />
      </Sheet>

      <DropdownMenu>
        <DropdownMenuTrigger asChild className="cursor-pointer">
          <Avatar>
            <AvatarImage src={DefaultPic || ""} alt="user's image" />
            <AvatarFallback className="bg-black text-white font-bold">
              U
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 ml-4 lg:mr-4">
          <DropdownMenuLabel>Logged in as Yel Yan</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => navigate("/shop/account")}
          >
            <UserCog />
            Account
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="cursor-pointer" onClick={handleLogOut}>
            <LogOut />
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

const AuthButtons = () => {
  const navigate = useNavigate();

  return (
    <div className="flex gap-2">
      <Button variant={"primary"} onClick={() => navigate("/auth/login")}>
        Login
      </Button>
      <Button variant={"outline"} onClick={() => navigate("/auth/register")}>
        Register
      </Button>
    </div>
  );
};

const ShoppingHeader = () => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  // const isAuthenticated = false;

  function checkAuthenticated(isAuthenticated: boolean) {
    return <>{isAuthenticated ? <HeaderRightContent /> : <AuthButtons />}</>;
  }
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background p-4 flex items-center justify-between">
      <Link to={"/shop/home"} className="flex items-center gap-1">
        <h4 className="font-extrabold">SnapBuy</h4>
        <img src={Logo} alt="" className="w-5 h-5" />
      </Link>

      <div className="hidden lg:block">
        <MenuItems />
      </div>

      {/* Mobile toggle menu */}
      <Sheet>
        <SheetTrigger asChild className="lg:hidden">
          <Button variant={"outline"} size={"icon"}>
            <Menu />
          </Button>
        </SheetTrigger>
        <SheetContent side={"left"} className="w-full  space-y-3">
          {checkAuthenticated(isAuthenticated)}
          <MenuItems />
        </SheetContent>
      </Sheet>

      <div className="hidden lg:block">
        {checkAuthenticated(isAuthenticated)}
      </div>
    </header>
  );
};

export default ShoppingHeader;
