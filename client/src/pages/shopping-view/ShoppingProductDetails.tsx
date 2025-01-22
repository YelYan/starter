import React, { useEffect } from "react";
import { Separator } from "@/components/ui/separator";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

import { useAppDispatch, useAppSelector } from "@/store/hook";
import Default from "/default-pic.png";
import { getSingleProduct } from "@/store/adminSlice/productSlice/productSlice";
import LoadingSpinner from "@/components/ui/loadingSpinner";

const ShoppingProductDetails = () => {
  const dispatch = useAppDispatch();
  const { isLoading, singleProduct } = useAppSelector(
    (state) => state.adminProduct
  );
  const { id: productId } = useParams();

  useEffect(() => {
    dispatch(getSingleProduct(productId));
  }, [dispatch, productId]);

  return (
    <div>
      {isLoading && (
        <div>
          <LoadingSpinner />
        </div>
      )}

      <div className="min-h-[200px] flex flex-col lg:flex-row gap-4">
        <div className="h-96 flex flex-col lg:flex-row-reverse gap-4">
          <div className="h-[300px] w-[300px] lg:h-96 lg:w-96 bg-slate-100 p-2">
            <img
              src={singleProduct?.image ?? Default}
              alt=""
              className="h-full w-full object-cover"
            />
          </div>
          <div className="h-full">
            <div className="flex gap-2 lg:flex-col overflow-scroll no-scrollbar h-full">
              <div className="h-20 w-20 rounded p-1 bg-slate-100">
                <img
                  src={Default}
                  alt="product image"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="h-20 w-20 rounded p-1 bg-slate-100">
                <img
                  src={Default}
                  alt="product image"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 w-full">
          <h1 className="text-4xl font-bold">{singleProduct?.title}</h1>
          <p className="text-gray-600">
            Description : {singleProduct?.description}
          </p>
          <p>Review rating</p>
          <p className="font-medium">Price : {singleProduct?.price}</p>
          <div className="mr-auto">
            <Button>Add To Cart</Button>
          </div>
          <Separator className="my-2" />

          <div className="max-h-[300px] overflow-auto px-1">
            <h3 className="text-lg font-bold mb-4">Reviews</h3>
            <div className="">all the reviews</div>
            <div className="flex flex-col gap-2">
              <Label>Write a review for this product</Label>
              <div className="">Star rating component</div>
              <Textarea
                placeholder="Write a review...."
                className="h-36 resize-none"
              />
              <Button className="ml-auto">Submit</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingProductDetails;
