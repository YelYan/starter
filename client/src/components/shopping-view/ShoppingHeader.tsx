import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Store, Menu, UserCog, LogOut, ShoppingCart } from "lucide-react";
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
  const [openCartSheet, setOpenCartSheet] = useState(false);
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
            <AvatarImage
              src="https://plus.unsplash.com/premium_photo-1721169137223-4af7f08c7c6a?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="@shadcn"
            />
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
          <DropdownMenuItem className="cursor-pointer">
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
      <Button onClick={() => navigate("/auth/login")}>Login</Button>
      <Button onClick={() => navigate("/auth/register")}>Register</Button>
    </div>
  );
};
const ShoppingHeader = () => {
  const isAuthenticated = true;
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background p-4 flex items-center justify-between">
      <Link to={"/shop/home"} className="flex items-center gap-1">
        <Store className="w-5 h-5" />
        <h4 className="font-extrabold">E-commerce</h4>
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
          {isAuthenticated ? <AuthButtons /> : <HeaderRightContent />}
          <MenuItems />
        </SheetContent>
      </Sheet>

      {isAuthenticated ? (
        <div className="hidden lg:block">
          <AuthButtons />
        </div>
      ) : (
        <h5 className="hidden lg:block">
          <HeaderRightContent />
        </h5>
      )}
    </header>
  );
};

export default ShoppingHeader;
