import React from "react";
import { useNavigate } from "react-router-dom";
import { SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "../ui/button";
import { useAppSelector } from "@/store/hook";

import UserCartItems from "./UserCartItems";
import AuthorizeDialog from "./AuthorizeDialog";

type UserCartWrapperT = {
  type: "cart" | "wishlist";
  setOpenCartSheet?: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenWishListSheet?: React.Dispatch<React.SetStateAction<boolean>>;
};

const UserCartWrapper = ({
  type,
  setOpenCartSheet,
  setOpenWishListSheet,
}: UserCartWrapperT) => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);

  function handleCheckOut() {
    if (isAuthenticated && user) {
      navigate("/shop/checkout");
      setOpenCartSheet?.(false);
    }
  }

  function handleAddToCart() {
    setOpenWishListSheet?.(false);
  }
  return (
    <SheetContent side={"right"} className="w-full  space-y-4">
      <SheetHeader>
        <SheetTitle>Your {type === "cart" ? "Cart" : "WishList"}</SheetTitle>
      </SheetHeader>
      <div className="">
        <UserCartItems />
      </div>
      <div className="flex justify-between">
        <h6 className="font-medium">Total</h6>
        <p>$10</p>
      </div>
      {type === "cart" ? (
        <AuthorizeDialog
          actionButton={
            <Button className="w-full" onClick={handleCheckOut}>
              Check Out
            </Button>
          }
        />
      ) : (
        <AuthorizeDialog
          actionButton={
            <Button className="w-full" onClick={handleAddToCart}>
              Add To Cart
            </Button>
          }
        />
      )}
    </SheetContent>
  );
};

export default UserCartWrapper;
