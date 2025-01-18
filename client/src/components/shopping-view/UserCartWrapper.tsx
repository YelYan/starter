import React from "react";
import { useNavigate } from "react-router-dom";
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import { Button } from "../ui/button";

import UserCartItems from "./UserCartItems";

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
        <Button
          className="w-full"
          onClick={() => {
            navigate("/shop/checkout");
            setOpenCartSheet?.(false);
          }}
        >
          Check Out
        </Button>
      ) : (
        <Button
          className="w-full"
          onClick={() => {
            setOpenWishListSheet?.(false);
          }}
        >
          Add To Cart
        </Button>
      )}
    </SheetContent>
  );
};

export default UserCartWrapper;
