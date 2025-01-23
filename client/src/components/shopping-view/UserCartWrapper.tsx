import React from "react";
import { useNavigate } from "react-router-dom";
import { SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useAppSelector } from "@/store/hook";

import UserCartItems from "./UserCartItems";
import { ResProductT } from "@/types/products";

type UserCartWrapperT = {
  type: "cart" | "wishList";
  setOpenCartSheet?: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenWishListSheet?: React.Dispatch<React.SetStateAction<boolean>>;
  wishListData?: ResProductT[];
};

const UserCartWrapper = ({
  type,
  setOpenCartSheet,
  setOpenWishListSheet,
  wishListData,
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
        {(wishListData?.length ?? 0) > 0 && (
          <UserCartItems
            wishListData={wishListData}
            type={type}
            handleCheckOut={handleCheckOut}
            handleAddToCart={handleAddToCart}
          />
        )}
      </div>
      {type === "cart" && (
        <div className="flex justify-between">
          <h6 className="font-medium">Total</h6>
          <p>$10</p>
        </div>
      )}
    </SheetContent>
  );
};

export default UserCartWrapper;
