import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import DefaultPic from "/default-pic.png";
import { ResProductT } from "@/types/products";
import { Link } from "react-router-dom";

const SearchProductCard = ({ result }: { result: ResProductT }) => {
  return (
    <Link key={result?._id} to={`/shop/products/${result?._id}`}>
      <Card className="overflow-hidden">
        <CardHeader className="p-0 h-[15rem]">
          <img
            src={result?.image || DefaultPic}
            alt={result?.title}
            className="w-full h-full object-cover"
          />
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
          hey
        </CardFooter>
      </Card>
    </Link>
  );
};

export default SearchProductCard;
