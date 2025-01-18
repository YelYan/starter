import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import DefaultPic from "/default-pic.png";

import { ResProductT } from "@/types/products";

type ShoppingProductsT = {
  product: ResProductT;
  handleAddToCart?: (productId: string | undefined) => void;
};

const ShoppingProducts = ({ handleAddToCart, product }: ShoppingProductsT) => {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-0 h-[15rem]">
        <img
          src={product?.image || DefaultPic}
          alt={product?.title}
          className="w-full h-full object-cover"
        />
      </CardHeader>

      <CardContent className="px-3 py-2">
        <h3 className="text-medium font-medium">Title - {product?.title}</h3>
        <h3 className="text-medium font-medium">
          Category - {product?.category}
        </h3>
        <div className="flex justify-between items-center mb-2">
          <span
            className={`${
              (product?.salePrice ?? 0) > 0 ? "line-through" : ""
            } text-lg font-semibold text-primary`}
          >
            ${product?.price}
          </span>
          {(product?.salePrice ?? 0) > 0 ? (
            <span className="text-lg font-bold">${product?.salePrice}</span>
          ) : null}
        </div>
      </CardContent>
      <CardFooter className="flex gap-2 items-center px-2 py-3">
        <Button
          size={"sm"}
          variant={"primary"}
          onClick={() => handleAddToCart?.(product?._id)}
        >
          Add To Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ShoppingProducts;
