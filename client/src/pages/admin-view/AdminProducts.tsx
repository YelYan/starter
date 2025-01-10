import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import CardSkeleton from "@/components/ui/card-skeleton";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";

import { addProductFormElements } from "@/config";
import CommonForm from "@/components/common/Form";
import Imageuploader from "@/components/admin-view/Imageuploader";
import { ReqProductT } from "@/types/products";
import AdminProductList from "@/components/admin-view/AdminProductList";

import { useAppDispatch, useAppSelector } from "@/store/hook";

// api fetching
import {
  getAllProducts,
  addProduct,
  deleteProduct,
} from "@/store/adminSlice/productSlice/productSlice";

const AdminProducts = () => {
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const [openProductsDialog, setOpenProductsDialog] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageLoading, setImageLoading] = useState(false);
  const [uploadedImgRes, setuploadedImgRes] = useState({
    url: "",
    message: "",
  });

  const { isLoading, productList } = useAppSelector(
    (state) => state.adminProduct
  );

  function closeProductsDialog() {
    setOpenProductsDialog(!openProductsDialog);
  }

  // add product
  function handleSubmit(data: ReqProductT) {
    const formData = {
      image: uploadedImgRes.url ? uploadedImgRes?.url : null,
      ...data,
    };
    dispatch(addProduct(formData))
      .unwrap()
      .then((result) => {
        if (result.success) {
          toast({
            title: `Product added successfully ✅`,
          });
          setOpenProductsDialog(false);
          dispatch(getAllProducts());
        }
      })
      .catch((error) => {
        toast({
          title: error,
          variant: "destructive",
          action: (
            <ToastAction className="bg-white text-black" altText="Try again">
              Try again
            </ToastAction>
          ),
        });
      });
  }

  // delete product
  function handleDelete(productId: string | undefined) {
    dispatch(deleteProduct(productId))
      .unwrap()
      .then((result) => {
        if (result.success) {
          toast({
            title: `${result.message}✅`,
          });
          setOpenProductsDialog(false);
          dispatch(getAllProducts());
        }
      })
      .catch((error) => {
        toast({
          title: error,
          variant: "destructive",
          action: (
            <ToastAction className="bg-white text-black" altText="Try again">
              Try again
            </ToastAction>
          ),
        });
      });
  }

  // initial fetch all products when app loads
  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  if (isLoading) <CardSkeleton />;

  return (
    <div className=" space-y-4 py-4">
      <div className="flex justify-between items-center py-2">
        <h1 className="font-medium text-2xl">Products</h1>
        <Button variant={"primary"} onClick={closeProductsDialog}>
          Add New Product
        </Button>
      </div>

      {/* product list */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {productList &&
          productList?.length > 0 &&
          productList.map((product) => (
            <AdminProductList product={product} handleDelete={handleDelete} />
          ))}
      </div>

      <Sheet open={openProductsDialog} onOpenChange={closeProductsDialog}>
        <SheetContent className="overflow-auto">
          <SheetHeader>
            <SheetTitle>Add New Product</SheetTitle>
            <SheetDescription>
              Add details to create a complete and engaging product listing.
            </SheetDescription>
          </SheetHeader>

          <div className="mt-4 space-y-4">
            <Imageuploader
              imageFile={imageFile}
              setImageFile={setImageFile}
              imageLoading={imageLoading}
              setImageLoading={setImageLoading}
              uploadedImgRes={uploadedImgRes}
              setuploadedImgRes={setuploadedImgRes}
            />
            <CommonForm
              formControls={addProductFormElements}
              onSubmit={handleSubmit}
            />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default AdminProducts;
