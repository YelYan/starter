import { Trash, Minus, Plus } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "@/components/ui/badge";

import AuthorizeDialog from "./AuthorizeDialog";
import { ResProductT } from "@/types/products";

type UserCartItemsT = {
  type: "wishList" | "cart";
  wishListData?: ResProductT[];
  cartData?: ResProductT[];
  handleAddToCart: () => void;
  handleCheckOut: () => void;
};

const UserCartItems = ({
  wishListData,
  cartData = [],
  type,
  handleAddToCart,
  handleCheckOut,
}: UserCartItemsT) => {
  function renderProducts(data: ResProductT[] | undefined) {
    return data?.map((d) => (
      <div key={d._id} className="flex flex-col gap-4">
        <div className="flex gap-2">
          <img
            src={
              d?.image ||
              "https://pteaaneqtnvllkttocns.supabase.co/storage/v1/object/public/e-commerce-img-upload/e-commerce/room-1.jpg?t=2025-01-23T11%3A49%3A04.775Z"
            }
            alt="product image"
            className="w-20 h-20 rounded-sm"
          />
          <div className="flex-1 space-y-3">
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-lg">{d?.title}</h3>
              <Badge
                variant={"destructive"}
                className="rounded-full text-[9px]  px-1"
              >
                Out of stock
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant={"outline"}
                size={"icon"}
                className="border-none shadow-none"
              >
                <Minus className="h-4 w-4" />
                <span className="sr-only">Decrease</span>
              </Button>
              <p className="font-medium">1</p>
              <Button
                variant={"outline"}
                size={"icon"}
                className="border-none shadow-none"
              >
                <Plus className="h-4 w-4" />
                <span className="sr-only">Increase</span>
              </Button>
            </div>
          </div>
          <div className="flex flex-col justify-between">
            <p className="font-medium">${d?.price}</p>
            <Trash
              className="cursor-pointer w-5 h-5"
              onClick={() => console.log("work")}
            />
          </div>
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
      </div>
    ));
  }
  return (
    <div className="space-y-4">
      {type === "wishList"
        ? renderProducts(wishListData)
        : renderProducts(cartData)}
    </div>
  );
};

export default UserCartItems;
