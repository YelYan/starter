import React from "react";
import { Button } from "../ui/button";
import { Trash, Minus, Plus } from "lucide-react";

const UserCartItems = () => {
  return (
    <div className="flex gap-2">
      <img
        src="https://plus.unsplash.com/premium_photo-1721169137223-4af7f08c7c6a?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="cart item image"
        className="w-20 h-20 rounded-sm"
      />
      <div className="flex-1 space-y-3">
        <h3>Cart item tile</h3>
        <div className="flex items-center gap-2">
          <Button
            variant={"outline"}
            size={"icon"}
            className="border-none shadow-none"
          >
            <Minus className="h-4 w-4" />
            <span className="sr-only">Decrease</span>
          </Button>
          <p className="font-medium">$39</p>
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
        <p className="font-medium">$39</p>
        <Trash
          className="cursor-pointer w-5 h-5"
          onClick={() => console.log("work")}
        />
      </div>
    </div>
  );
};

export default UserCartItems;
