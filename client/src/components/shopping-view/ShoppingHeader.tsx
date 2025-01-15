import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, UserCog, LogOut, ShoppingCart, Search } from "lucide-react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "../ui/toast";
import debounce from "lodash/debounce";

import Logo from "/favicon.svg";
import DefaultPic from "/default-pic.png";
import { useAppSelector, useAppDispatch } from "@/store/hook";
import { logoutUser } from "@/store/authslice/authSlice";
import UserCartWrapper from "./UserCartWrapper";

const MenuItems = () => {
  const [limit, setLimit] = useState("10");
  const navigate = useNavigate();
  function handleDebounceFn(val: string) {
    if (val && limit) {
      navigate(`/shop/search?q=${val}&page=1&limit=${limit}`);
    } else {
      navigate("/shop/search");
    }
  }

  const debounceFn = debounce(handleDebounceFn, 500);
  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    debounceFn(e.target.value);
  }
  return (
    <div className="relative w-full flex items-center gap-1">
      <Select value={limit} onValueChange={(value) => setLimit(value)}>
        <SelectTrigger className="w-[130px] h-full border border-gray-300 focus:ring-blue-500 focus:border-blue-500">
          <SelectValue placeholder="Product limit" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="10">10 per page</SelectItem>
          <SelectItem value="15">15 per page</SelectItem>
          <SelectItem value="20">20 per page</SelectItem>
        </SelectContent>
      </Select>
      <div className="relative w-full">
        <Input
          onChange={handleSearch}
          type="search"
          className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
          placeholder="Search Product..."
        />
        <button
          type="submit"
          className="absolute top-0 end-0 grid place-content-center p-2.5 text-sm font-medium h-full text-white bg-blue-500 rounded-e-lg border border-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          <Search />
          <span className="sr-only">Search</span>
        </button>
      </div>
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

  function checkAuthenticated(isAuthenticated: boolean | null) {
    return <>{isAuthenticated ? <HeaderRightContent /> : <AuthButtons />}</>;
  }
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background p-4 flex items-center justify-between">
      <Link to={"/shop/home"} className="flex items-center gap-1">
        <h4 className="font-extrabold">SnapBuy</h4>
        <img src={Logo} alt="" className="w-5 h-5" />
      </Link>

      <div className="hidden lg:flex lg:basis-[40%]">
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
