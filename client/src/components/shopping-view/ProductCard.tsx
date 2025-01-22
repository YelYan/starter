import React, { useState } from "react";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { useAppSelector } from "@/store/hook";
import DefaultproductImg from "/default-ecommerce.png";
import { ResProductT } from "@/types/products";

const ProductCard = ({ result }: { result: ResProductT }) => {
  const [wishList, setWishList] = useState(false);

  const { isAuthenticated } = useAppSelector((state) => state.auth);

  function handleWishList(e: React.MouseEvent, productId: string | undefined) {
    e.stopPropagation();
    e.preventDefault();
    setWishList((prev) => !prev);

    console.log(productId);
  }

  function handleaAddToCart(
    e: React.MouseEvent,
    productId: string | undefined
  ) {
    e.preventDefault();
    console.log(productId);
  }
  return (
    <Link key={result?._id} to={`/shop/products/${result?._id}`}>
      <Card className="overflow-hidden">
        <CardHeader className="p-0 h-[15rem] relative">
          <img
            src={result?.image || DefaultproductImg}
            alt={result?.title}
            className="w-full h-full object-cover"
          />
          {isAuthenticated && (
            <Button
              variant={"outline"}
              size={"icon"}
              className="absolute top-0 right-0 border-none"
              onClick={(e) => handleWishList(e, result?._id)}
            >
              {wishList ? (
                <FaHeart className="w-5 h-5 text-red-500" />
              ) : (
                <FaRegHeart className="w-5 h-5" />
              )}
            </Button>
          )}
        </CardHeader>

        <CardContent className="px-3 py-2">
          <h3 className="text-medium font-medium">Title - {result?.title}</h3>
          <h3 className="text-medium font-medium">
            Category - {result?.category}
          </h3>
          <div className="flex justify-between items-center mb-2">
            <span
              className={`${
                (result?.salePrice ?? 0) > 0 ? "line-through" : ""
              } text-lg font-semibold text-primary`}
            >
              ${result?.price}
            </span>
            {(result?.salePrice ?? 0) > 0 ? (
              <span className="text-lg font-bold">${result?.salePrice}</span>
            ) : null}
          </div>
        </CardContent>
        <CardFooter className="flex gap-2 items-center px-2 py-3">
          <Button
            className="w-full"
            onClick={(e) => handleaAddToCart(e, result?._id)}
          >
            Add To Cart
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default ProductCard;
